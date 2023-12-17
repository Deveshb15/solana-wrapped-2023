import React from 'react';

const Card4 = ({transactions}) => {
  // console.log('transactions are', transactions)

    return (
      <div className="relative">
      <div 
        className="flex items-center w-[312px] h-[484px] md:w-[530px] md:h=[500px] justify-center m-1 rounded-3xl relative overflow-hidden" 
        style={{
          // width: '530px',
          // height: '500px',
          backgroundColor: '#181818',
          position: 'relative'
        }}
      >
        <div 
          className='rounded-full absolute z-0 w-full h-full'
          style={{
            top: '-60%',
            left: '10%',
            transform: 'translateX(-50%)',
            zIndex:0,
            background: 'linear-gradient(45deg, #9945FF 10.43%, #8752F3 30.84%, #5497D5 49.4%, #43B4CA 58.68%, #28E0B9 69.81%, #19FB9B 93.01%), linear-gradient(151deg, #1D9D5A 0%, #11553A 82.01%)',
            filter: 'blur(75px)',
            flexShrink: 0,
          }}
        ></div>
         
        <div className="ml-12 md:mt-[72px] font-dm absolute z-10 w-[312px] h-[484px] md:w-[530px] md:h=[500px]">
          <div className='flex'>
          <div className='mr-8 md:mr-12'>
          <p className="text-white flex mt-8 text-4xl md:text-[42px] leading-[38.40px]">
          100
          </p>
          <p className='text-fade'>SOL Spent</p>
          </div>
          <div>
          <p className="text-white flex mt-8 text-4xl md:text-[42px] leading-[38.40px]">
          0.7
          </p>
          <p className='text-fade'>SOL Received</p>
          </div>
          </div>
          <div>
          <div>
          <p className="text-white flex mt-8 text-4xl md:text-[42px] leading-[38.40px]">
          50
          </p>
          <p className='text-fade'>GAS Spent</p>
          </div>
          </div>
          <div className='mt-44 md:mt-32'>
          <p className='text-ash text-lg md:text-2xl'>You seem to love transacting</p>
          <p className='text-ash text-lg md:text-2xl'>on  <span className='text-white'>Solana.</span></p>
        </div>
        </div>
    
        <div className='flex w-[530px] justify-end mr-14 mb-10'>
        <svg xmlns="http://www.w3.org/2000/svg" width="214" height="191" viewBox="0 0 214 191" fill="none">
          <path d="M212.445 150.592L177.189 188.394C176.427 189.215 175.503 189.87 174.476 190.318C173.449 190.767 172.341 190.999 171.221 191H4.09621C3.29913 191 2.51945 190.767 1.85267 190.33C1.1859 189.893 0.660973 189.271 0.342144 188.541C0.0233145 187.81 -0.0755674 187.003 0.0576147 186.217C0.190797 185.431 0.550233 184.701 1.09195 184.116L36.3074 146.314C37.07 145.493 37.9934 144.838 39.0204 144.389C40.0472 143.941 41.1556 143.709 42.2762 143.708H209.4C210.204 143.691 210.996 143.913 211.675 144.345C212.353 144.777 212.89 145.4 213.214 146.136C213.541 146.872 213.64 147.688 213.503 148.481C213.366 149.273 212.998 150.008 212.445 150.592ZM177.189 74.4507C176.424 73.6334 175.5 72.9808 174.473 72.5325C173.447 72.0845 172.34 71.8503 171.221 71.8445H4.09621C3.29913 71.8449 2.51945 72.0777 1.85267 72.5146C1.1859 72.9513 0.660973 73.5731 0.342144 74.3036C0.0233145 75.0342 -0.0755674 75.8418 0.0576147 76.6277C0.190797 77.4136 0.550233 78.1437 1.09195 78.7285L36.3074 116.55C37.0728 117.368 37.997 118.02 39.0232 118.468C40.0494 118.916 41.1564 119.151 42.2762 119.156H209.4C210.196 119.152 210.972 118.916 211.637 118.478C212.301 118.04 212.823 117.418 213.139 116.688C213.455 115.959 213.553 115.152 213.417 114.368C213.284 113.584 212.926 112.856 212.385 112.273L177.189 74.4507ZM4.09621 47.293H171.221C172.341 47.292 173.449 47.0598 174.476 46.6113C175.503 46.1631 176.427 45.5077 177.189 44.6866L212.445 6.8848C212.998 6.3009 213.366 5.56633 213.503 4.77351C213.64 3.98068 213.541 3.16501 213.214 2.42915C212.89 1.69329 212.353 1.07011 211.675 0.638023C210.996 0.20594 210.204 -0.0157433 209.4 0.000869847H42.2762C41.1556 0.00204935 40.0472 0.234084 39.0204 0.682506C37.9934 1.13093 37.07 1.78612 36.3074 2.60722L1.09195 40.409C0.550233 40.9938 0.190797 41.724 0.0576147 42.5098C-0.0755674 43.2957 0.0233145 44.1033 0.342144 44.8339C0.660973 45.5644 1.1859 46.1862 1.85267 46.6229C2.51945 47.0598 3.29913 47.2926 4.09621 47.293Z" fill="white" fill-opacity="0.05"/>
        </svg>
        </div>
      </div>
    </div>
    );
};

export default Card4;
