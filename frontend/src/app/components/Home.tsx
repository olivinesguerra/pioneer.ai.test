'use client'

import axios from "axios";
import { useState } from "react";

export const HomeTemplate = () => {
    const [isRequesting, setIsRequesting] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("Find me a cheap sushi restaurant in downtown Los Angeles that's open now and has at least a 4-star rating."); 
    const [result, setResult] = useState<any[]>([]); 

    const onSearchClicked = async(e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(`http://localhost:3000/api/location/search?search=${search}`);
        if (search && search?.length > 0 && !isRequesting) {
        setIsRequesting(true);
        try {
           fetch(`http://localhost:3000/api/location/search?search=${search}`)
            .then(response=>response.json())
            .then(res=>{ 
                console.log(result);
                const { data } = res;
                console.log(data);
                console.log(data?.results);
                if (data?.results?.length > 0) {
                    setResult(data?.results);
                } else {
                    setResult([]);
                }
                setIsRequesting(false);
            })
            

          }catch(err) {
              setIsRequesting(false);
          }
        }
    };

    const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e?.target?.value);
    };

    console.log(result);

    return (
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
                    <div className="flex w-full text-white">
                        {data?.name}
                    </div>

                    <div className="flex w-full text-white">
                        {data?.distance}
                    </div>
                </div>
              )
            })
          }
      </main>
    );
};