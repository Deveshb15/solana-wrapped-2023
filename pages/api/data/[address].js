import axios from "axios";

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

        res.status(200).json({ success: true, nft_data: nftData });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
