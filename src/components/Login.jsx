import "animate.css";
import React, { useEffect, useState } from "react";
import TopNav from "./TopNav";
import { useRouter } from "next/router";
import Image from "next/image";
import { app, database } from "@/constants/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import ShareModal from "@/components/ShareModal";

function Login() {
  const [walletID, setWalletID] = useState("");
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [totalWallets, setTotalWallets] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const [wallets, setWallets] = useState([]);

  const getWallets = async () => {
    const querySnapshot = await getDocs(collection(database, "wallets"));
    const wallets = [];
    querySnapshot.forEach((doc) => {
      wallets.push(doc.data().wallet);
    });
    setTotalWallets(wallets.length + 50);
  };

  const handleNavigation = (e) => {
    e.preventDefault();
    if (walletID?.includes(".sol") || walletID?.trim()?.length > 40) {
      if (walletID.trim() === "") {
        setErrorMessage("Address field cannot be empty");
      } else {
        setErrorMessage("");
        console.log("wallets", wallets);
        console.log("walletID", walletID);
        if (wallets?.length == 2) {
          router.push(`/stats/${wallets[0]}+${wallets[1]}`);
        } else if (wallets?.length == 1) {
          router.push(`/stats/${wallets[0]}+${walletID}`);
        } else {
          router.push(`/stats/${walletID}`);
        }
      }
    } else {
      setErrorMessage("Invalid wallet address");
      return;
    }
  };

  const handleAddWallet = () => {
    console.log("walletID IN ADD", walletID);
    if (walletID?.includes(".sol") || walletID?.trim()?.length > 40) {
      const walletExists = wallets?.find(
        (wallet) => wallet?.toLowerCase() === walletID?.toLowerCase()
      );
      console.log("walletExists", walletExists);
      if (walletExists) {
        setErrorMessage("You've already added this wallet");
        return;
      } else {
        if (wallets?.length >= 2) {
          setErrorMessage("You can only add 2 wallets");
          setWalletID(wallets[1]);
        } else {
          if (walletID.trim() === "") {
            setErrorMessage("Address field cannot be empty");
          } else {
            console.log("wallets 2", wallets);
            console.log("walletID 2", walletID);
            setErrorMessage("");
            setWallets([...wallets, walletID]);
            setWalletID("");
          }
        }
      }
    } else {
      console.log("INVALID ");
      setErrorMessage("Invalid wallet address");
      return;
    }
  };

  useEffect(() => {
    getWallets();
  }, []);
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleRemoveWallet = (wallet) => {
    const newWallets = wallets?.filter((w) => w !== wallet);
    setWallets(newWallets);
  };

  console.log(totalWallets)
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
                className="w-10 z-[1] h-6 mr-3"
                src="/wallet-images.png"
                alt="wallet-images"
              />

              <p className="text-center text-xs z-[1] font-dm md:text-sm mb-7 text-white">
                {/* <span className="text-white">{totalWallets}+ wallets</span>{" "} */}
                <span className="text-white"> 362+ wallets</span>{" "}
                checked and wrapped in last 1hr
              </p>
            </div>

            <div className="flex font-dm flex-col justify-center items-center lg:overflow-hidden">
              <p className=" font-bold text-white text-4xl z-[1] md:text-7xl">
                Solana Wrapped,
                <br />
              </p>
              <span className="text-green-400 text-white text-4xl z-[1] font-bold md:text-7xl ">
                2023
              </span>
            </div>
          </div>
        </div>
        {/* <div className="flex text-dm lg:flex-row flex-col w-full justify-center lg:items-start items-center"> */}
        {wallets?.length > 0 && (
          <div className="flex items-center justify-center flex-row mt-4 mb-2">
            {wallets?.map((wallet, i) => {
              return wallet?.includes(".sol") ? (
                <p
                  className="bg-[#1E1E1E] px-4 py-2 mr-2 rounded-full flex justify-center items-center"
                  key={i}
                >
                  {wallet}{" "}
                  <button
                    onClick={() => handleRemoveWallet(wallet)}
                    className="text-white ml-4"
                  >
                    <svg
                      className="w-4 h-4 feather feather-x"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </p>
              ) : (
                <p
                  className="bg-[#1E1E1E] px-4 py-2 mr-2 rounded-full flex justify-center items-center"
                  key={i}
                >
                  {wallet?.substr(0, 4)}...
                  {wallet?.substr(wallet?.length - 5, wallet.length - 1)}
                  <button
                    onClick={() => handleRemoveWallet(wallet)}
                    className="text-white ml-4"
                  >
                    <svg
                      className="w-4 h-4 feather feather-x"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
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
            placeholder={
              wallets?.length == 0
                ? "Enter your wallet address"
                : "Enter your second wallet address"
            }
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

        {(wallets?.length == 0 && walletID?.length > 0) && (
          <div className="flex flex-col items-center justify-center">
            <p className="font-heading text-green-400 mt-3">
              Have more than 1 wallet ?
            </p>
            <div className="w-8 h-8 rounded-full flex justify-center items-center bg-gray">
              <button onClick={handleAddWallet}>+</button>
            </div>
          </div>
        )}
      </div>
      {isOpen && <ShareModal handleClose={handleClose} />}
      {/* <div className="fixed bottom-16 lg:left-1/2 md:bottom-0 transform flex  justify-between items-center w-full"> */}
      <div className="hidden md:fixed bottom-[50px] md:right-3 md:flex justify-between items-center">
        <div className="relative inline-flex rounded-full group">
          <div className="absolute transition-all duration-500 opacity-0 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-full blur-lg group-hover:opacity-40 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
          <a
            href="#"
            onClick={() => setIsOpen(true)}
            className="relative bg-gray inline-flex items-center justify-center text-sm px-8 py-4 text-white transition-all duration-200 bg-gray-900 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 group-hover:bg-white group-hover:text-black"
            role="button"
          >
            Share Solana Wrapped
          </a>
        </div>
      </div>
    </>
  );
}

export default Login;
