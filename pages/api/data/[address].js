import axios from "axios";

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const LAMPORTS_PER_SOL = 1000000000

const fetchAndParseTransactions = async (url, lastSignature) => {
  let i = 0;
  let total_transactions = [];
  while (true) {
    if (lastSignature) {
      url += `&before=${lastSignature}`;
    }
    i++;
    console.log("Fetching transactions from: ", url);
    console.log("Iteration: ", i);
    if (i > 10) {
      return total_transactions;
    }

    if (i == 6) {
      await sleep(500);
    }
    if (i == 11) {
      await sleep(500);
    }
    if (i == 16) {
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
};

const getDataFromTransaction = (transactions, address, balance) => {

  let total_gas_spent = 0;
  let total_sol_sent = 0;
  let total_sol_received = 0;
  let diff_wallet_address = 0
  let balance_a_year_ago = 0;
  for(let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i];
      // get total gas spent
      if(transaction?.feePayer?.toLowerCase() === address) {
          total_gas_spent += transaction.fee
      }

      // get total sol sent
      if(transaction.nativeTransfers?.length > 0) {
          for(let j = 0; j < transaction.nativeTransfers.length; j++) {
              const transfer = transaction.nativeTransfers[j];
              if(transfer?.fromUserAccount?.toLowerCase() === address) {
                  total_sol_sent += transfer.amount
                  diff_wallet_address += 1
              }

              if (transfer?.toUserAccount?.toLowerCase() === address) {
                  total_sol_received += transfer.amount
                  diff_wallet_address += 1
              }

          }
      }

      // calculate balance a year ago
      let diff = total_sol_received - total_sol_sent
      if(diff > 0 && balance_a_year_ago === 0) {
          balance_a_year_ago = balance - diff
      }

  }

  return {
      total_gas_spent: total_gas_spent/LAMPORTS_PER_SOL,
      total_sol_sent: total_sol_sent/LAMPORTS_PER_SOL,
      total_sol_received: total_sol_received/LAMPORTS_PER_SOL,
      diff_wallet_address: diff_wallet_address,
      balance_a_year_ago: balance_a_year_ago/LAMPORTS_PER_SOL
  }
}

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
        let balance = 0;

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
          console.log("Balance req: ", getBalanceReq.data);
          balance = getBalanceReq.data.result.value;
        } catch(err) {
          console.log("Error: ", err.message);
        }
        console.log("Balance: ", balance / LAMPORTS_PER_SOL);

        // GET NFT STATS FIRST
        const nftStatsRequest = await axios.post(
          "https://rest-api.hellomoon.io/v0/nft/magiceden/wallet-all-time-stats",
          {
            ownerAccount: address,
          },
          {
            headers: {
              authorization: `Bearer ${process.env.HELLOMOON_API_KEY}`,
            },
          }
        );

        const nftData = nftStatsRequest.data?.data;

        // Now let's get the transactions from helius
        let url = `https://api.helius.xyz/v0/addresses/${address}/transactions?api-key=2678fd86-929f-4d82-b9f8-eff7dc4d04b9`;
        let lastSignature = null;
        const transactions = await fetchAndParseTransactions(
          url,
          lastSignature
        );

        const txn_data = getDataFromTransaction(transactions, address?.toLowerCase(), balance)

        res.status(200).json({ success: true, nft_data: nftData, balance: balance/LAMPORTS_PER_SOL, txn_data });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
