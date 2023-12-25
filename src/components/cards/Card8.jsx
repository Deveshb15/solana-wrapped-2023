import React, { useRef, useState } from 'react';
import Image from "next/image";
import html2canvas from 'html2canvas';
import ShareModal from "@/components/ShareModal";


const Card8 = ({ data, activeSlide, slideLen }) => {
  // console.log('transactions are', transactions)
  const [isOpen, setIsOpen] = useState(false);

  let total_airdrop = data?.airdrop_data?.length > 0
    ? data?.airdrop_data
        .map((item) => item.usdc)
        .reduce((prev, next) => prev + next)
        ?.toFixed(4)
    : 0;

    const divRef = useRef(null);

const captureDivAsImage = () => {
  const divToCapture = divRef.current;

  html2canvas(divToCapture).then((canvas) => {
    // Create an anchor element to download the image
    const a = document.createElement('a');
    a.href = canvas.toDataURL();
    a.download = 'div-image.png';
    a.click();
  });
};

const shareAsImage = () => {
  const divToCapture = divRef.current;

  html2canvas(divToCapture).then((canvas) => {
    canvas.toBlob(blob => {
      if (navigator.share) {
        const file = new File([blob], 'share.png', { type: 'image/png' });
        navigator.share({
          title: 'Solana Wrapped',
          text: 'Just got my Solana Wrapped 🎉 \nget yours here👉 https://www.solanawrapped.xyz',
          files: [file],
        })
        .then(() => console.log('Share was successful.'))
        .catch((error) => console.log('Sharing failed', error));
      } else {
        setIsOpen(true);
      }
    });
  });
};

const handleClose = () => {
  setIsOpen(false);
};

  return (
    <div className="relative h-full">
      <div
      ref={divRef}
      className="flex items-center h-full justify-center m-1 rounded-3xl relative overflow-hidden" 
        style={{
          backgroundColor: "#181818",
          position: "relative",
        }}
      >
        <div
          className="rounded-full absolute z-1 w-full h-full"
          style={{
            top: "-60%",
            left: "10%",
            transform: "translateX(-50%)",
            zIndex: 0,
            background:
              "linear-gradient(45deg, #9945FF 10.43%, #8752F3 30.84%, #5497D5 49.4%, #43B4CA 58.68%, #28E0B9 69.81%, #19FB9B 93.01%), linear-gradient(151deg, #1D9D5A 0%, #11553A 82.01%)",
            filter: "blur(75px)",
            flexShrink: 0,
          }}
        ></div>

        <div className="md:ml-12 md:mt-[72px] md:flex font-dm absolute z-10 w-[312px] h-[484px] md:w-[670px] md:h-[391px]]">
          <div>
            <div className="flex justify-evenly">
              <div className="flex flex-col">
                <div
                  className="mt-4 md:mt-12 rounded-lg w-28 md:w-36 md:h-16 justify-center text-center"
                  style={{
                    background: "rgba(37, 43, 53, 0.30)",
                  }}
                >
                  <p className="text-white mt-1 md:mt-3 flex justify-center md:text-lg leading-[38.40px]">
                    {data?.total_transactions}
                  </p>
                  <p className="text-fade text-[8px] pb-2 md:pb-0">Transactions</p>
                </div>
                <div
                  className="mt-2 rounded-lg w-28 md:w-36 md:h-[4.4rem] justify-center text-center"
                  style={{
                    background: "rgba(37, 43, 53, 0.30)",
                  }}
                >
                  <p className="text-white mt-1 md:mt-3 flex justify-center md:text-lg leading-[38.40px]">
                    {data?.txn_data ? data?.txn_data.total_gas_spent : 0}
                  </p>
                  <p className="text-fade text-[8px] pb-2 md:pb-0">Total txn fees paid</p>
                </div>
              </div>
              <div
                className="mt-4 md:mt-12 ml-2 rounded-lg w-28 md:w-36 md:h-36 justify-center text-center"
                style={{
                  background: "rgba(37, 43, 53, 0.30)",
                }}
              >
                <p className="text-white pt-3 md:pt-6 flex justify-center md:text-lg leading-[38.40px]">
                  {data?.txn_data
                    ? data?.txn_data.total_sol_sent?.toFixed(4)
                    : 0}
                </p>
                <p className="text-fade text-[8px]">SOL Sent</p>
                <p className="text-white mt-3 flex justify-center md:text-lg">
                  {data?.txn_data
                    ? data?.txn_data.total_sol_received?.toFixed(4)
                    : 0}
                </p>
                <p className="text-fade text-[8px]">SOL Received</p>
              </div>
            </div>
            <div className="flex justify-center">
            <div
              className="mt-2 ml-1 rounded-lg w-64 md:w-72 md:h-36 justify-center text-center"
              style={{
                background: "rgba(37, 43, 53, 0.30)",
              }}
            >
              {total_airdrop > 0 ? (
                <div>
                  <p className="text-white pt-6 flex justify-center md:text-lg leading-[38.40px]">
                    {total_airdrop}
                  </p>
                  <p className="text-fade text-[8px]">Worth Airdrop Recevied</p>
                </div>
              ) : (
                <div>
                  <p className="text-white md:mt-8 text-sm text-center leading-[38.40px]">
                    You haven&apos;t received any airdrops
                  </p>
                </div>
              )}
              <div className="md:mt-3 pb-3 md:pb-0 flex justify-center">
                <Image
                  className="mr-2"
                  src="/airdrop1.png"
                  height={24}
                  width={24}
                  alt="airdrop1"
                />
                <Image
                  className="mr-2"
                  src="/airdrop2.png"
                  height={24}
                  width={24}
                  alt="airdrop2"
                />
                <Image
                  src="/airdrop3.png"
                  height={24}
                  width={24}
                  alt="airdrop3"
                />
              </div>
            </div>
            </div>
          </div>
          <div>
            <div className="flex justify-center">
            <div
              className="mt-4 md:mt-12 md:ml-5 rounded-lg w-64 md:w-72 md:h-36 flex flex-col justify-center text-center"
              style={{
                background: "rgba(37, 43, 53, 0.30)",
              }}
            >
              <p className="text-white mt-3 flex justify-center  font-dm md:text-[32px]">
                {data?.nft_data?.purchased + data?.nft_data?.minted} NFTs
              </p>
              <p className="text-fade text-[8px] pb-4 md:pb-0">Collected in 2023</p>
            </div></div>
            <div>
              <div className="flex ml-0 md:ml-5 justify-center flex-row">
                <div
                  className="mt-2 rounded-lg w-28 md:w-[8.7rem] md:h-16 justify-center text-center"
                  style={{
                    background: "rgba(37, 43, 53, 0.30)",
                  }}
                >
                  <p className="text-white mt-3 flex justify-center md:text-lg leading-[38.40px]">
                    {data?.nft_data?.profitAndLossPercentage ? (
                      data?.nft_data?.profitAndLossPercentage >= 0 ? (
                        <div className="flex items-center justify-center flex-row pt-3">
                          <p>{data?.nft_data?.profitAndLossPercentage}</p>
                          <p className="text-white flex justify-center md:text-lg leading-[38.40px]">
                            {data?.nft_data?.profitAndLossPercentage ? data?.nft_data?.profitAndLossPercentage?.toFixed(2)
                              : 0}
                            %
                          </p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                          >
                            <path
                              d="M12 19V5"
                              stroke="#14F195"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5 12L12 5L19 12"
                              stroke="#14F195"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center flex-row">
                          <p className="text-white flex justify-center md:text-lg leading-[38.40px]">
                            {data?.nft_data?.profitAndLossPercentage ? data?.nft_data?.profitAndLossPercentage?.toFixed(2)
                              : 0}
                            %
                          </p>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 5L12 19"
                              stroke="#F2688A"
                              stroke-width="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M19 12L12 19L5 12"
                              stroke="#F2688A"
                              stroke-width="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      )
                    ) : (
                      <div>
                        <p>0</p>
                      </div>
                    )}
                  </p>
                  <p className="text-fade text-[8px]">NFT W of 2023</p>
                </div>
                <div
                  className="mt-2 ml-2 flex rounded-lg w-28 md:w-36 md:h-16 justify-center text-center"
                  style={{
                    background: "rgba(37, 43, 53, 0.30)",
                  }}
                >
                  {data?.txn_data?.most_transacted_wallet?.length > 0 ? (
                    <div>
                      <p className="text-white mt-3 md:mt-1 justify-center text-xs leading-[38.40px]">
                        {data?.txn_data?.most_transacted_wallet?.substr(0, 4)}
                        ...
                        {data?.txn_data?.most_transacted_wallet?.substr(
                          data?.txn_data?.most_transacted_wallet?.length - 4,
                          4
                        )}
                      </p>
                      <p className="text-fade text-[8px]">
                        Wallet you most interacted with
                      </p>
                    </div>  
                  ) : (
                    <div className='flex text-center items-center'>
                      <p className="text-fade text-[8px]">
                        You haven&apos;t interacted with any wallet
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-center ">
              <div
                className="md:ml-5 mt-3 rounded-lg w-64 md:w-72 md:h-16 justify-center text-center"
                style={{
                  background: "rgba(37, 43, 53, 0.30)",
                }}
              >
                {data?.txn_data?.portfolio_profit_loss_percentage >= 0 ? (
                  <div className="flex items-center justify-center flex-row pt-3">
                    <p className="text-white flex justify-center md:text-lg leading-[38.40px]">
                      {data?.txn_data
                        ? data?.txn_data?.portfolio_profit_loss_percentage?.toFixed(
                            4
                          )
                        : 0}
                      %
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                    >
                      <path
                        d="M12 19V5"
                        stroke="#14F195"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5 12L12 5L19 12"
                        stroke="#14F195"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="flex items-center justify-center flex-row pt-1 md:pt-3">
                    <p className="text-white flex justify-center md:text-lg leading-[38.40px]">
                      {data?.txn_data
                        ? data?.txn_data?.portfolio_profit_loss_percentage?.toFixed(
                            4
                          )
                        : 0}
                      %
                    </p>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 5L12 19"
                        stroke="#F2688A"
                        stroke-width="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19 12L12 19L5 12"
                        stroke="#F2688A"
                        stroke-width="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
                <p className="text-fade text-[8px] pb-2 md:pb-0">
                  Increase in Wallet Balance
                </p>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-end justify-end mb-10 h-full mt-35 left-1/2 ">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
        <path d="M21.1333 15.4804L17.6262 19.2408C17.5504 19.3225 17.4585 19.3877 17.3563 19.4323C17.2542 19.4769 17.1439 19.5 17.0325 19.5001H0.407478C0.328187 19.5 0.250627 19.4769 0.184298 19.4334C0.11797 19.39 0.0657515 19.3281 0.0340354 19.2555C0.00231925 19.1828 -0.00751721 19.1024 0.00573133 19.0243C0.0189799 18.9461 0.0547355 18.8735 0.108624 18.8153L3.61175 15.0549C3.68761 14.9732 3.77946 14.908 3.88163 14.8634C3.98377 14.8188 4.09403 14.7957 4.2055 14.7956H20.8305C20.9105 14.794 20.9892 14.816 21.0567 14.859C21.1242 14.902 21.1776 14.964 21.2099 15.0372C21.2424 15.1104 21.2523 15.1915 21.2386 15.2704C21.2249 15.3492 21.1883 15.4223 21.1333 15.4804ZM17.6262 7.90612C17.5501 7.82481 17.4582 7.7599 17.3561 7.71531C17.254 7.67074 17.1439 7.64744 17.0325 7.64687H0.407478C0.328187 7.64691 0.250627 7.67006 0.184298 7.71353C0.11797 7.75697 0.0657515 7.81882 0.0340354 7.89149C0.00231925 7.96417 -0.00751721 8.0445 0.00573133 8.12268C0.0189799 8.20086 0.0547355 8.27349 0.108624 8.33166L3.61175 12.0941C3.68789 12.1754 3.77982 12.2403 3.88191 12.2849C3.98399 12.3294 4.09411 12.3527 4.2055 12.3533H20.8305C20.9097 12.3529 20.9869 12.3294 21.053 12.2859C21.1191 12.2423 21.1709 12.1804 21.2024 12.1078C21.2339 12.0352 21.2436 11.955 21.2301 11.877C21.2168 11.799 21.1812 11.7266 21.1274 11.6685L17.6262 7.90612ZM0.407478 5.20456H17.0325C17.1439 5.20446 17.2542 5.18136 17.3563 5.13675C17.4585 5.09216 17.5504 5.02697 17.6262 4.94529L21.1333 1.18488C21.1883 1.12679 21.2249 1.05372 21.2386 0.974853C21.2523 0.895985 21.2424 0.814846 21.2099 0.741644C21.1776 0.668443 21.1242 0.606451 21.0567 0.563469C20.9892 0.520486 20.9105 0.498434 20.8305 0.500087H4.2055C4.09403 0.500204 3.98377 0.523286 3.88163 0.567894C3.77946 0.612501 3.68761 0.677677 3.61175 0.759358L0.108624 4.51976C0.0547355 4.57793 0.0189799 4.65057 0.00573133 4.72874C-0.00751721 4.80692 0.00231925 4.88726 0.0340354 4.95993C0.0657515 5.03261 0.11797 5.09446 0.184298 5.1379C0.250627 5.18136 0.328187 5.20452 0.407478 5.20456Z" fill="white"/>
        </svg>
        <img className='w-40 h-5 ml-2' src="/wrap.png"/>
        </div>
        {/*     
        <div className='flex w-[530px] justify-end mr-14 mb-10'>
        <svg xmlns="http://www.w3.org/2000/svg" width="214" height="191" viewBox="0 0 214 191" fill="none">
          <path d="M212.445 150.592L177.189 188.394C176.427 189.215 175.503 189.87 174.476 190.318C173.449 190.767 172.341 190.999 171.221 191H4.09621C3.29913 191 2.51945 190.767 1.85267 190.33C1.1859 189.893 0.660973 189.271 0.342144 188.541C0.0233145 187.81 -0.0755674 187.003 0.0576147 186.217C0.190797 185.431 0.550233 184.701 1.09195 184.116L36.3074 146.314C37.07 145.493 37.9934 144.838 39.0204 144.389C40.0472 143.941 41.1556 143.709 42.2762 143.708H209.4C210.204 143.691 210.996 143.913 211.675 144.345C212.353 144.777 212.89 145.4 213.214 146.136C213.541 146.872 213.64 147.688 213.503 148.481C213.366 149.273 212.998 150.008 212.445 150.592ZM177.189 74.4507C176.424 73.6334 175.5 72.9808 174.473 72.5325C173.447 72.0845 172.34 71.8503 171.221 71.8445H4.09621C3.29913 71.8449 2.51945 72.0777 1.85267 72.5146C1.1859 72.9513 0.660973 73.5731 0.342144 74.3036C0.0233145 75.0342 -0.0755674 75.8418 0.0576147 76.6277C0.190797 77.4136 0.550233 78.1437 1.09195 78.7285L36.3074 116.55C37.0728 117.368 37.997 118.02 39.0232 118.468C40.0494 118.916 41.1564 119.151 42.2762 119.156H209.4C210.196 119.152 210.972 118.916 211.637 118.478C212.301 118.04 212.823 117.418 213.139 116.688C213.455 115.959 213.553 115.152 213.417 114.368C213.284 113.584 212.926 112.856 212.385 112.273L177.189 74.4507ZM4.09621 47.293H171.221C172.341 47.292 173.449 47.0598 174.476 46.6113C175.503 46.1631 176.427 45.5077 177.189 44.6866L212.445 6.8848C212.998 6.3009 213.366 5.56633 213.503 4.77351C213.64 3.98068 213.541 3.16501 213.214 2.42915C212.89 1.69329 212.353 1.07011 211.675 0.638023C210.996 0.20594 210.204 -0.0157433 209.4 0.000869847H42.2762C41.1556 0.00204935 40.0472 0.234084 39.0204 0.682506C37.9934 1.13093 37.07 1.78612 36.3074 2.60722L1.09195 40.409C0.550233 40.9938 0.190797 41.724 0.0576147 42.5098C-0.0755674 43.2957 0.0233145 44.1033 0.342144 44.8339C0.660973 45.5644 1.1859 46.1862 1.85267 46.6229C2.51945 47.0598 3.29913 47.2926 4.09621 47.293Z" fill="white" fill-opacity="0.05"/>
        </svg>
        </div> */}
                {isOpen && <ShareModal handleClose={handleClose} />}

      </div>
      <div className="sm:flex md:flex-col justify-center mt-8">
        <div className='flex justify-center'>
        <button
          className={`justify-center md:w-[242px] font-dm items-center md:gap-2.5 py-4 px-4 md:py-4 md:px-8 rounded-full border border-white ${activeSlide === slideLen-1 ? 'flex' : 'hidden'}`}
          onClick={captureDivAsImage}
        >
          Download
        </button>
        <button
          className={`flex ml-2 justify-center md:w-[242px] font-dm bg-white text-black items-center md:gap-2.5 py-4 px-4 md:py-4 md:px-8 rounded-full ${activeSlide === slideLen-1 ? 'flex' : 'hidden'}`}
          onClick={shareAsImage}
        >
          <p>Share on</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="1 0 20 21" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.8333 18H4.16667C3.24625 18 2.5 17.2537 2.5 16.3333V4.66667C2.5 3.74625 3.24625 3 4.16667 3H15.8333C16.7537 3 17.5 3.74625 17.5 4.66667V16.3333C17.5 17.2537 16.7537 18 15.8333 18Z" fill="#212121"/>
          <path d="M14.2714 14.6673H11.5893L5.75977 6.33398H8.44185L14.2714 14.6673ZM11.9089 13.9607H12.9768L8.12227 7.04065H7.05435L11.9089 13.9607Z" fill="white"/>
          <path d="M6.60906 14.667L9.61031 11.1903L9.21781 10.6699L5.75781 14.667H6.60906Z" fill="white"/>
          <path d="M10.1895 9.55107L10.5665 10.0882L13.8086 6.33398H12.9753L10.1895 9.55107Z" fill="white"/>
          </svg>
        </button>
        </div>
        {/* <div className='flex justify-center'>
   
      <button
          className="mt-8 flex items-center"
          // style={{ width: "242px" }}
          // onClick={shareAsImage}
        >
               <svg xmlns="http://www.w3.org/2000/svg" className='mr-2' width="17" height="17" viewBox="0 0 17 17" fill="none">
        <g clip-path="url(#clip0_1529_2109)">
          <path d="M11.834 1.16602L14.5007 3.83268L11.834 6.49935" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2.5 7.83398V6.50065C2.5 5.79341 2.78095 5.11513 3.28105 4.61503C3.78115 4.11494 4.45942 3.83398 5.16667 3.83398H14.5" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5.16667 15.8333L2.5 13.1667L5.16667 10.5" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14.5 9.16602V10.4993C14.5 11.2066 14.219 11.8849 13.719 12.385C13.2189 12.8851 12.5406 13.166 11.8333 13.166H2.5" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
          <clipPath id="clip0_1529_2109">
            <rect width="16" height="16" fill="white" transform="translate(0.5 0.5)"/>
          </clipPath>
        </defs>
      </svg>
         <p className='pl-2 pb-4 contents '>Replay the wrap</p> 
        </button>
        </div> */}
     
      </div>
    </div>
  );
};

export default Card8;
