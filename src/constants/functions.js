export const mergeData = (prevData, fetchedData) => {
  return {
    balance: prevData?.balance + fetchedData?.balance,
    nft_data: {
      realizedProfits:
        prevData?.nft_data?.realizedProfits +
        fetchedData?.nft_data?.realizedProfits,
      volume: prevData?.nft_data?.volume + fetchedData?.nft_data?.volume,
      minted: prevData?.nft_data?.minted + fetchedData?.nft_data?.minted,
      sold: prevData?.nft_data?.sold + fetchedData?.nft_data?.sold,
      purchased:
        prevData?.nft_data?.purchased + fetchedData?.nft_data?.purchased,
      profitAndLossPercentage:
        prevData?.nft_data?.profitAndLossPercentage +
        fetchedData?.nft_data?.profitAndLossPercentage,
      nftVolumeTraded:
        prevData?.nft_data?.nftVolumeTraded +
        fetchedData?.nft_data?.nftVolumeTraded,
      nftSoldVolume:
        prevData?.nft_data?.nftSoldVolume +
        fetchedData?.nft_data?.nftSoldVolume,
    },
    txn_data: {
      total_gas_spent:
        prevData?.txn_data?.total_gas_spent +
        fetchedData?.txn_data?.total_gas_spent,
      total_sol_sent:
        prevData?.txn_data?.total_sol_sent +
        fetchedData?.txn_data?.total_sol_sent,
      total_sol_received:
        prevData?.txn_data?.total_sol_received +
        fetchedData?.txn_data?.total_sol_received,
      total_nft_mints:
        prevData?.txn_data?.total_nft_mints +
        fetchedData?.txn_data?.total_nft_mints,
      total_nft_sold:
        prevData?.txn_data?.total_nft_sold +
        fetchedData?.txn_data?.total_nft_sold,
      total_nft_purchased:
        prevData?.txn_data?.total_nft_purchased +
        fetchedData?.txn_data?.total_nft_purchased,
      diff_wallet_address:
        prevData?.txn_data?.diff_wallet_address +
        fetchedData?.txn_data?.diff_wallet_address,
      balance_a_year_ago:
        prevData?.txn_data?.balance_a_year_ago +
        fetchedData?.txn_data?.balance_a_year_ago,
      highest_sold_nft: {
        sol:
          prevData?.txn_data?.highest_sold_nft?.sol >
          fetchedData?.txn_data?.highest_sold_nft?.sol
            ? prevData?.txn_data?.highest_sold_nft?.sol
            : fetchedData?.txn_data?.highest_sold_nft?.sol,
        nft:
          prevData?.txn_data?.highest_sold_nft?.sol >
          fetchedData?.txn_data?.highest_sold_nft?.sol
            ? prevData?.txn_data?.highest_sold_nft?.nft
            : fetchedData?.txn_data?.highest_sold_nft?.nft,
      },
      highest_purchased_nft: {
        sol:
          prevData?.txn_data?.highest_purchased_nft?.sol >
          fetchedData?.txn_data?.highest_purchased_nft?.sol
            ? prevData?.txn_data?.highest_purchased_nft?.sol
            : fetchedData?.txn_data?.highest_purchased_nft?.sol,
        nft:
          prevData?.txn_data?.highest_purchased_nft?.sol >
          fetchedData?.txn_data?.highest_purchased_nft?.sol
            ? prevData?.txn_data?.highest_purchased_nft?.nft
            : fetchedData?.txn_data?.highest_purchased_nft?.nft,
      },
      portfolio_profit_loss_percentage:
        prevData?.txn_data?.portfolio_profit_loss_percentage +
        fetchedData?.txn_data?.portfolio_profit_loss_percentage,
      most_transacted_wallet: prevData?.txn_data?.most_transacted_wallet,
    },
    airdrop_data: fetchedData?.length > 0 ? [...prevData?.airdrop_data, ...fetchedData?.airdrop_data] : prevData?.airdrop_data,
    total_transactions:
      prevData?.total_transactions + fetchedData?.total_transactions,
  };
};
