import "animate.css";
import React,{useState} from "react";
import TopNav from "./TopNav";
import { useRouter } from 'next/router';
import Image from 'next/image'

function Login() {
  const [walletID, setWalletID] = useState('');
  const router = useRouter();

  const handleNavigation = () => {
    router.push(`/stats/${walletID}`);
  };

  return (
    <>
<div className="flex flex-col items-center">
<TopNav/>

  <div className="flex">
    <div>
    <div className="flex justify-center">  
    <Image width={40} height={24} className="w-10 h-6 mr-3" src="/wallet-images.png"/>

      <p className="text-center text-xs font-dm md:text-sm mb-7 text-gray-400">
        <span className="text-white">50+ wallets</span> checked and wrapped in
        last 1hr
      </p>
      </div> 

      <div className="flex font-dm flex-col justify-center items-center lg:overflow-hidden">
        <p className=" font-bold text-4xl md:text-7xl animate__animated animate__bounceInDown">
        Solana Wrapped,
          <br />
        </p>
        <span className="text-green-400 animate__animated animate__slideInLeft text-4xl font-bold md:text-7xl ">
          2023
        </span>
        </div>
        </div>
      </div>
      {/* <div className="flex text-dm lg:flex-row flex-col w-full justify-center lg:items-start items-center"> */}
      <div style={{backgroundColor:'#1E1E1E'}} className="flex bg-grey mt-4 w-[376px] h-16 rounded-full lg:p-3 p-1 w-5/6 items-center">
  <input
    type="text"
    className="text-white text-sm focus:outline-none pl-2 flex-grow rounded-3xl"
    placeholder="  Enter your SOL address"
    value={walletID}
    style={{backgroundColor:'#1E1E1E'}}
    onChange={(e) => setWalletID(e.target.value)}
  />
  <button             onClick={handleNavigation}
>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none" className="mr-4">
    <path d="M6 12.8359L10 8.83594L6 4.83594" stroke="white" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  </button>
</div>

{console.log('wallet id', walletID)}

      {/* </div> */}
      <div className="flex flex-col items-center justify-center">
        <p className="font-heading text-green-400 mt-3">
        Have more than 1 wallet ? 
        </p>
        <div className="w-8 h-8 rounded-full flex justify-center items-center bg-gray">
        +
        </div>
      </div>
      </div>
      <div className="lg:fixed lg:bottom-6 lg:left-1/2 lg:transform lg:-translate-x-1/2 flex  justify-between items-center w-full">
        <button className="bg-white font-dm text-black text-sm px-5 py-2.5 mr-2 rounded-3xl ml-auto">
          Share Solana Wrapped
        </button>
      </div>

    </>
  );
}

export default Login;
