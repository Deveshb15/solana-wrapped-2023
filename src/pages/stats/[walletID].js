import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Card1 from "@/components/cards/Card1";
import Card2 from "@/components/cards/Card2";
import Card3 from "@/components/cards/Card3";
import Card4 from "@/components/cards/Card4";
import Card5 from "@/components/cards/Card5";
import Card6 from "@/components/cards/Card6";
import Card7 from "@/components/cards/Card7";
import Card8 from "@/components/cards/Card8";
import { mergeData } from "@/constants/functions";

import TopNav from "@/components/TopNav";
import Loading from "@/components/loading";
import Head from "next/head";
import ShareModal from "@/components/ShareModal";

const Carousel = ({ address }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { walletID } = router.query;
  console.log("wallet id is", walletID);
  const [wallets, setWallets] = useState([]);
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    if (walletID?.includes("+")) {
      const wallets = walletID.split("+");
      setWallets(wallets);
    } else {
      setWallets([walletID]);
    }
  }, [walletID]);

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  const goToPrevSlide = () => {
    setActiveSlide(activeSlide - 1 >= 0 ? activeSlide - 1 : slides.length - 1);
  };

  const goToNextSlide = () => {
    setActiveSlide(activeSlide + 1 < slides.length ? activeSlide + 1 : 0);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
        if (event.key === 'ArrowRight') {
            goToNextSlide();
        }
        else if (event.key === 'ArrowLeft' && activeSlide > 0) {
            goToPrevSlide();
        }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    }
}, [activeSlide]); //

  useEffect(() => {
    setLoading(true);
    if (wallets.length > 0) {
      console.log("inside data");
      try {
        if (wallets.length > 1) {
          fetch(`/api/data/${wallets[0]}`)
            .then((response) => response.json())
            .then((fetchedData) => {
              setData(fetchedData);
            });

          fetch(`/api/data/${wallets[1]}`)
            .then((response) => response.json())
            .then((fetchedData) => {
              setData((prevData) => {
                return mergeData(prevData, fetchedData);
              });
              setLoading(false);
            });
        } else {
          fetch(`/api/data/${wallets[0]}`)
            .then((response) => response.json())
            .then((fetchedData) => {
              setData(fetchedData);
              setLoading(false);
            });
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  }, [wallets]);

  console.log("data is", activeSlide);

  const slides = [
    <Card1 key={1} />,
    <Card2 total_transactions={data?.total_transactions} key={2} />,
    <Card3 transactions={data?.txn_data} key={3} />,
    <Card4 transactions={data?.txn_data} key={4} />,
    <Card5 airdrop={data?.airdrop_data} key={5} />,
    <Card6 nft={data?.nft_data} key={6} />,
    <Card7 transactions={data?.txn_data} key={7} />,
    <Card8 data={data} key={8} />,
  ];
  console.log("slide len is", slides.length);

  //  console.log('txs', data.txn_data)
  const Loading = () => {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  };
  return (
    <div className="min-h-screen p-8 bg-black relative">
      <Head>
        <title>Your Solana Wallet Wrapped - 2023</title>
        <meta
          name="description"
          content="Where Solana wallet users get a deep dive into their top transactional moments of the year."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Watch Something Wonderful" />
        <meta
          property="og:description"
          content="Where Solana wallet users get a deep dive into their top transactional moments of the year."
        />
        <meta
          property="og:image"
          content="https://i.ibb.co/X5SwdM7/Solana-Wrapped-Preview.png"
        />
        <meta
          property="og:url"
          content="https://www.solanawrapped.xyz/"
        />
        <meta name="twitter:title" content="Watch Something Wonderful" />
        <meta
          name="twitter:description"
          content="Where Solana wallet users get a deep dive into their top transactional moments of the year."
        />
        <meta
          name="twitter:image"
          content="https://i.ibb.co/X5SwdM7/Solana-Wrapped-Preview.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <TopNav />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
      ) : (
        <div>
          <div className="w-[312px] md:w-[520px] mx-auto flex justify-center mt-20 md:mt-20 mb-4">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-2 w-5 rounded-full md:w-16 mx-1 ${
                  index <= activeSlide ? "bg-green-500" : "bg-dark-blue"
                }`}
              ></div>
            ))}
          </div>
          <div className="flex justify-around">
            <div
              className="w-full sm:w-auto flex justify-between bottom-2 mx-auto"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {
  activeSlide !== 0 && (

              <button
                onClick={goToPrevSlide}
                style={{marginLeft:'35%'}}
                className={`flex sm:hidden cursor-pointer bg-gray md:mt-64 md:mr-[320px] rounded-full shadow-md z-[2] p-1 m-0 absolute bottom-[10%] left-2 ${
                  activeSlide === 0 ? "opacity-0" : "opacity-100"
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-800"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
)}
              {/* {
    activeSlide !== 0 && ( */}
              <button
                onClick={goToPrevSlide}
                className={`hidden sm:flex cursor-pointer bg-gray md:mt-64 md:mr-[320px] rounded-full shadow-md z-[2] p-1 m-0 ${
                  activeSlide === 0 ? "opacity-0" : "opacity-100"
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-800"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15 19l-7-7 7-7"></path>
                </svg>
              </button> 
              <div className="md:w-96">
                {slides.map((Slide, index) => (
                  <div
                    key={index}
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                      index === activeSlide
                        ? "opacity-100 z-10"
                        : "opacity-0 z-1"
                    }`}
                  >
                    {Slide}
                  </div>
                ))}
              </div>
              {activeSlide < slides.length - 1 && (
                <div>
                  <button
                    onClick={goToNextSlide}
                    style={{marginRight:'40%'}}
                  className="flex sm:hidden cursor-pointer bg-gray rounded-full md:mt-64 z-1 shadow-md p-1 m-0 absolute bottom-[10%] right-2"
                  >
                    <svg
                      className="w-6 h-6 text-gray-800"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                  <button
                    onClick={goToNextSlide}
                    className="hidden sm:flex cursor-pointer bg-gray rounded-full md:mt-64 z-1 shadow-md p-1 m-0"
                  >
                    <svg
                      className="w-6 h-6 text-gray-800"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              )}
            </div>
            {isOpen && <ShareModal handleClose={handleClose} />}

            {activeSlide < slides.length - 1 && (
            <div className="hidden md:fixed bottom-[50px] md:right-3 md:flex justify-between items-center w-full">
          <button onClick={()=>setIsOpen(true)} className="bg-[#1E1E1E] font-dm text-white text-sm px-5 py-2.5 mr-2 rounded-3xl ml-auto">
            Share Solana Wrapped
          </button>
          </div>
            )}
          </div>
        </div> 
      )}
    </div>
  );
};

export default Carousel;
