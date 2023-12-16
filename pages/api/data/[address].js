import axios from "axios";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getDomainKey, NameRegistryState } from "@bonfida/spl-name-service";

const QUICKNODE_RPC =
  "https://winter-evocative-frog.solana-mainnet.quiknode.pro/0f7008df95d494ee7291e39fe4023cd18e08a71a/";
const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC);

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

async function getPublicKeyFromSolDomain(domain) {
  const { pubkey } = await getDomainKey(domain);
  const owner = (
    await NameRegistryState.retrieve(SOLANA_CONNECTION, pubkey)
  ).registry.owner.toBase58();
  console.log(`The owner of SNS Domain: ${domain} is: `, owner);
  return owner;
}

const cleanIpfsUrl = (url) => {
  if (url?.includes("https://nftstorage.link/ipfs/")) {
    return url.replace(
      "https://nftstorage.link/ipfs/",
      "https://cf-ipfs.com/ipfs/"
    );
  } else if (url?.includes("ipfs://")) {
    return url.replace("ipfs://", "https://cf-ipfs.com/ipfs/");
  }
  return url;
};

const getNFTMetadata = async (addresses) => {
  const url =
    "https://api.helius.xyz/v0/token-metadata?api-key=2678fd86-929f-4d82-b9f8-eff7dc4d04b9";
  const nftAddresses = addresses;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mintAccounts: nftAddresses,
        includeOffChain: true,
        disableCache: false,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const fetchAndParseTransactions = async (url, lastSignature) => {
  try {
    let i = 0;
    let total_transactions = [];
    while (true) {
      if (lastSignature) {
        url += `&before=${lastSignature}`;
      }
      i++;
      // console.log("Fetching transactions from: ", url);
      console.log("Iteration: ", i);
      if (i > 10) {
        return total_transactions;
      }

      if (i == 6) {
        await sleep(500);
      }

      const response = await fetch(url);
      const transactions = await response.json();

      if (transactions && transactions.length > 0) {
        // run a loop and check if any transaction is before 1st Jan 2023, if it is then break the loop and only return the transactions after 1st Jan 2023 and also break from while loop
        let breakLoop = false;
        for (let i = 0; i < transactions.length; i++) {
          const transaction = transactions[i];
          if (transaction.timestamp < 1672531200) {
            breakLoop = true;
            break;
          }
        }
        if (breakLoop) {
          console.log("Breaking loop");
          let filteredTransactions = transactions.filter(
            (transaction) => transaction.timestamp >= 1672531200
          );
          total_transactions = total_transactions.concat(filteredTransactions);
          return total_transactions;
        }
        total_transactions = total_transactions.concat(transactions);
        // console.log("Fetched transactions: ", transactions);
        lastSignature = transactions[transactions.length - 1].signature;
      } else {
        console.log("No more transactions available.");
        return total_transactions;
      }
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getDataFromTransaction = async (transactions, address, balance) => {
  let total_gas_spent = 0;
  let total_sol_sent = 0;
  let total_sol_received = 0;
  let diff_wallet_address = 0;
  let balance_a_year_ago = 0;

  let highest_sold_nft = {
    sol: 0,
    nft: null,
  };

  let highest_purchased_nft = {
    sol: 0,
    nft: null,
  };

  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    // get total gas spent
    if (transaction?.feePayer?.toLowerCase() === address) {
      total_gas_spent += transaction.fee;
    }

    // get total sol sent
    if (transaction.nativeTransfers?.length > 0) {
      for (let j = 0; j < transaction.nativeTransfers.length; j++) {
        const transfer = transaction.nativeTransfers[j];
        if (transfer?.fromUserAccount?.toLowerCase() === address) {
          total_sol_sent += transfer.amount;
          diff_wallet_address += 1;
        }

        if (transfer?.toUserAccount?.toLowerCase() === address) {
          total_sol_received += transfer.amount;
          diff_wallet_address += 1;
        }
      }
    }

    if (transaction?.events?.nft) {
      if (transaction?.events?.nft?.type === "NFT_SALE") {
        if (
          transaction?.events?.nft?.seller?.toLowerCase() ===
          address?.toLowerCase()
        ) {
          if (transaction?.events?.nft?.amount > highest_sold_nft.sol) {
            highest_sold_nft.sol = transaction?.events?.nft?.amount;
            highest_sold_nft.nft = transaction?.events?.nft?.nfts[0]?.mint;
          }
        } else if (
          transaction?.events?.nft?.buyer?.toLowerCase() ===
          address?.toLowerCase()
        ) {
          if (transaction?.events?.nft?.amount > highest_purchased_nft.sol) {
            highest_purchased_nft.sol = transaction?.events?.nft?.amount;
            highest_purchased_nft.nft = transaction?.events?.nft?.nfts[0]?.mint;
          }
        }
      }
    }

    // calculate balance a year ago
    let diff = total_sol_received - total_sol_sent;
    if (diff > 0 && balance_a_year_ago === 0) {
      balance_a_year_ago = balance - diff;
    }
  }

  let nft_metadata_array = [];
  if (highest_sold_nft?.nft) {
    nft_metadata_array.push(highest_sold_nft?.nft);
  }
  if (highest_purchased_nft?.nft) {
    nft_metadata_array.push(highest_purchased_nft?.nft);
  }

  const nft_metadata = await getNFTMetadata(nft_metadata_array);
  // console.log("NFT Metadata: ", nft_metadata);

  for (let i = 0; i < nft_metadata.length; i++) {
    const nft = nft_metadata[i];
    if (nft?.account === highest_sold_nft?.nft) {
      let nft_data = {
        nft_image: nft?.offChainMetadata?.metadata?.image
          ? cleanIpfsUrl(nft?.offChainMetadata?.metadata?.image)
          : null,
        nft_name: nft?.offChainMetadata?.metadata?.name,
      };
      highest_sold_nft.nft = nft_data;
      highest_sold_nft.sol = highest_sold_nft.sol / LAMPORTS_PER_SOL;
    }

    if (nft?.account === highest_purchased_nft?.nft) {
      let nft_data = {
        nft_image: nft?.offChainMetadata?.metadata?.image
          ? cleanIpfsUrl(nft?.offChainMetadata?.metadata?.image)
          : null,
        nft_name: nft?.offChainMetadata?.metadata?.name,
      };
      highest_purchased_nft.nft = nft_data;
      highest_purchased_nft.sol = highest_purchased_nft.sol / LAMPORTS_PER_SOL;
    }
  }

  return {
    total_gas_spent: total_gas_spent / LAMPORTS_PER_SOL,
    total_sol_sent: total_sol_sent / LAMPORTS_PER_SOL,
    total_sol_received: total_sol_received / LAMPORTS_PER_SOL,
    diff_wallet_address: diff_wallet_address,
    balance_a_year_ago: balance_a_year_ago / LAMPORTS_PER_SOL,
    highest_sold_nft,
    highest_purchased_nft,
  };
};

async function getAllAirdrops(address) {
  try {
    const url = `https://sac-api.solworks.dev/addresses?addresses=${address}`;
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "X-Api-Key": "c1Vei4Ghu8yN7UULlezCVl4Wt8xfFfkQ",
      },
    });
    let airdropData = [];
    const { data } = response;
    if (data?.length > 0) {
      let eligibility = data[0]?.eligibility;
      if (eligibility?.length > 0) {
        for (let i = 0; i < eligibility.length; i++) {
          const element = eligibility[i];
          if (element?.eligible) {
            airdropData.push({
              protocol: element?.protocol,
              token: element?.token,
              ticker: element?.ticker,
              eligible: element?.eligible,
              amount: element?.amount,
              usdc: element?.potentialValueUsdc,
            });
          }
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
    return airdropData;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const getBalance = async (address) => {
  // get total balance
  try {
    const getBalanceReq = await axios.post(
      "https://winter-evocative-frog.solana-mainnet.quiknode.pro/0f7008df95d494ee7291e39fe4023cd18e08a71a/",
      {
        jsonrpc: "2.0",
        id: 1,
        method: "getBalance",
        params: [address],
      }
    );
    let balance = await getBalanceReq.data.result.value;
    console.log("Balance req: ", getBalanceReq.data);
    return balance;
  } catch (err) {
    console.log("Error: ", err);
    return 0;
  }
};

const getNftStats = async (address) => {
  try {
    const nftStatsRequest = await axios(
      `https://nft-database.vercel.app/api/sol/${address}`
    );

    const nftData = await nftStatsRequest.data?.nftData;
    return nftData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default async function handler(req, res) {
  const {
    query: { address },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        if (!address) {
          return res.status(400).json({ success: false });
        }

        let account = address;
        if (address.includes(".sol")) {
          account = await getPublicKeyFromSolDomain(address);
        }

        let balance = await getBalance(account);

        console.log("Balance: ", balance / LAMPORTS_PER_SOL);

        // GET NFT STATS FIRST
        const nftData = await getNftStats(account);

        // Now let's get the transactions from helius
        let url = `https://api.helius.xyz/v0/addresses/${account}/transactions?api-key=2678fd86-929f-4d82-b9f8-eff7dc4d04b9`;
        let lastSignature = null;
        const transactions = await fetchAndParseTransactions(
          url,
          lastSignature
        );

        const txn_data = await getDataFromTransaction(
          transactions,
          account?.toLowerCase(),
          balance
        );

        const airdropData = await getAllAirdrops(account);

        res.status(200).json({
          success: true,
          nft_data: nftData,
          balance: balance / LAMPORTS_PER_SOL,
          txn_data,
          airdrop_data: airdropData,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
