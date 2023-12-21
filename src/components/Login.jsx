import "animate.css";
import React, { useEffect, useState } from "react";
import TopNav from "./TopNav";
import { useRouter } from "next/router";
import Image from "next/image";
import { app, database } from "@/constants/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

function Login() {
  const [walletID, setWalletID] = useState("");
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [totalWallets, setTotalWallets] = useState(0);

  const [wallets, setWallets] = useState([]);

  const getWallets = async () => {
    const querySnapshot = await getDocs(collection(database, "wallets"));
    const wallets = [];
    querySnapshot.forEach((doc) => {
      wallets.push(doc.data().wallet);
    });
    setTotalWallets(wallets.length+50);
  }

  const handleNavigation = (e) => {
    e.preventDefault();
    if (walletID.trim() === "") {
      setErrorMessage("Address field cannot be empty");
    } else {
      setErrorMessage("");
      if (wallets?.length > 1) {
        router.push(`/stats/${wallets[0]}+${wallets[1]}`);
      } else {
        router.push(`/stats/${walletID}`);
      }
    }
  };

  const handleAddWallet = () => {
    const walletExists = wallets?.find(
      (wallet) => wallet?.toLowerCase() === walletID?.toLowerCase()
    );
    if (walletExists) {
      setErrorMessage("Wallet already exists");
      return;
    } else {
      if (wallets?.length >= 2) {
        setErrorMessage("You can only add 2 wallets");
      } else {
        if (walletID.trim() === "") {
          setErrorMessage("Address field cannot be empty");
        } else {
          setErrorMessage("");
          setWallets([...wallets, walletID]);
          setWalletID("");
        }
      }
    }
  };

  useEffect(() => {
    getWallets();
  }, [])

  return (
    <>
      <div className="flex flex-col items-center">
        <TopNav />

        <div className="flex">
          <div>
            <div className="flex justify-center">
              <Image
                width={40}
                height={24}
                className="w-10 h-6 mr-3"
                src="/wallet-images.png"
                alt="wallet-images"
              />

              <p className="text-center text-xs font-dm md:text-sm mb-7 text-gray-400">
                <span className="text-white">{totalWallets}+ wallets</span> checked and
                wrapped in last 1hr
              </p>
            </div>

            <div className="flex font-dm flex-col justify-center items-center lg:overflow-hidden">
              <p className=" font-bold text-4xl md:text-7xl">
                Solana Wrapped,
                <br />
              </p>
              <span className="text-green-400 text-4xl font-bold md:text-7xl ">
                2023
              </span>
            </div>
          </div>
        </div>
        {/* <div className="flex text-dm lg:flex-row flex-col w-full justify-center lg:items-start items-center"> */}
        {wallets?.length > 0 && (
          <div className="flex items-center justify-center flex-col mt-4 mb-2">
            {wallets?.map((wallet, i) => {
              return wallet?.includes(".sol") ? (
                <p className="bg-[#1E1E1E] px-4 py-2 rounded-full" key={i}>
                  {wallet}
                </p>
              ) : (
                <p className="bg-[#1E1E1E] px-4 py-2 rounded-full" key={i}>
                  {wallet?.substr(0, 4)}...
                  {wallet?.substr(wallet?.length - 5, wallet.length - 1)}
                </p>
              );
            })}
          </div>
        )}
        <form
          style={{ backgroundColor: "#1E1E1E" }}
          className="flex bg-grey mt-4 md:w-[376px] h-16 rounded-full lg:p-3 p-1 w-5/6 items-center"
          onSubmit={(e) => handleNavigation(e)}
        >
          <input
            type="text"
            className="text-white text-sm focus:outline-none pl-2 flex-grow rounded-3xl"
            placeholder="  Enter your SOL address"
            value={walletID}
            style={{ backgroundColor: "#1E1E1E" }}
            onChange={(e) => setWalletID(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleNavigation(event);
              }
            }}
          />
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              className="mr-4"
            >
              <path
                d="M6 12.8359L10 8.83594L6 4.83594"
                stroke="white"
                strokeWidth="1.375"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
        {errorMessage && (
          <p className="mt-1 text-xs md:text-base text-red-300">
            {errorMessage}
          </p>
        )}

        {console.log("wallet id", walletID)}

        {/* </div> */}
        <div className="flex flex-col items-center justify-center">
          <p className="font-heading text-green-400 mt-3">
            Have more than 1 wallet ?
          </p>
          <div className="w-8 h-8 rounded-full flex justify-center items-center bg-gray">
            <button onClick={handleAddWallet}>+</button>
          </div>
        </div>
      </div>
      {/* <div className="fixed bottom-16 lg:left-1/2 md:bottom-0 transform flex  justify-between items-center w-full"> */}
      <div className="hidden md:fixed bottom-[50px] md:right-3 md:flex justify-between items-center w-full">
        <button className="bg-white font-dm text-black text-sm px-5 py-2.5 mr-2 rounded-3xl ml-auto">
          Share Solana Wrapped
        </button>
      </div>
    </>
  );
}

export default Login;
