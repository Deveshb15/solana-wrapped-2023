import Image from "next/image";
import { Inter } from "next/font/google";
import Login from "@/components/Login";
import Head from "next/head";
import { useEffect } from "react";
import { app } from "@/constants/firebase";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  return (
    <>
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
<div className='flex flex-col h-screen justify-between'>
    <main
      className={`flex flex-col bg-black h-screen items-center justify-center ${inter.className}`}
    >
      <div className='rounded-full' style={{
        position: 'absolute',
        top: '-20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '50vw',
        height: '50vh',
        // borderRadius: '1067px',
        background: 'linear-gradient(45deg, #9945FF 10.43%, #8752F3 30.84%, #5497D5 49.4%, #43B4CA 58.68%, #28E0B9 69.81%, #19FB9B 93.01%), linear-gradient(151deg, #1D9D5A 0%, #11553A 82.01%)',
        filter: 'blur(75px)',
        flexShrink: 0,
      }}/>
        <Login />
        <div className="fixed bottom-0 w-full flex justify-center text-center border-grey p-4 bg-gray-200">
          <p className="mr-2 text-[#969696]">Built by Team 7 under</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="19"
            viewBox="0 0 25 19"
            fill="none"
          >
            <path
              d="M19.4086 2.94776H24.5947V4.951C24.5947 7.66741 22.3996 9.86293 19.6828 9.86293H19.4083V2.94776H19.4086ZM12.0273 0.0390625H19.4086V18.9451H18.5307C13.1798 18.9451 12.1099 15.2131 12.1099 11.893L12.0273 0.0390625ZM0.0361328 4.31971C0.0361328 7.69489 2.45081 8.9296 5.14003 9.34137H0.0361328V19.0001H4.94807C9.8872 19.0001 10.4634 16.8049 10.4634 14.7195C10.4634 12.1675 8.70717 10.3841 5.9908 9.6978H10.4634V0.0390625H5.55147C0.612367 0.0390625 0.0361328 2.23426 0.0361328 4.31971Z"
              fill="#D9D9D9"
            />
          </svg>
        </div>
      </main>
    </div>
    </>
  );
}
