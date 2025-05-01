'use client'

import React, { useState } from 'react';
import axios from 'axios';


export default function Home() {

  const [search, setSearch] = useState<string>("Find me a cheap sushi restaurant in downtown Los Angeles that's open now and has at least a 4-star rating."); 
  const [result, setResult] = useState<any[]>([]); 

  const onSearchClicked = async(e: React.MouseEvent<HTMLButtonElement>) => {
    if (search && search?.length > 0) {
      const res = await axios.get(`${process.env.API_URL}/api/location/search?search=${result}`);
      const {data} = res;
    }
  };

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e?.target?.value);
  };

  return (
    <div 
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main 
        className="flex w-full flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <input 
            className="flex w-full bg-white text-black px-[20px] py-[20px]"
            value={search}
            onChange={onTextChange}
          />
          <button 
            className="flex w-full text-white border border-white justify-center items-center"
            onClick={onSearchClicked}
          >
            Search
          </button>

          {
            result?.map((data: any, index: number) => {
              return (
                <div className='flex flex-col'>
                
                </div>
              )
            })
          }
      </main>
    </div>
  );
}
