"use client";

import {ChangeEvent, useState} from "react";
import {TreeNodeDataDefinition} from "@/core/types/tree-definition";
import {treeData} from "@/core/data/tree";

export function TreeViewToolbar() {

  return (
      <div className="z-30 fixed top-20 px-4 right-auto w-full md:w-auto md:right-0 md:px-4">
          <SearchField />
      </div>
  );
}


function SearchField() {

    const [inputValue, setInputValue] = useState("");
    const [filteredData, setFilteredData] = useState<TreeNodeDataDefinition[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setFilteredData(treeData.nodes.map(n => n.data).filter(node => (node.fullname || "").toLowerCase().includes((e.target.value || "").toLowerCase())) || []);
    }

    return (
        <div className="w-full md:w-80 relative">

           <div className="flex justify-between">
               <label htmlFor="search" className="mb-2 text-sm font-medium sr-only text-white">Поиск</label>
               <input type="search"
                      id="search"
                      placeholder="Фамилия, имя, родословня..."
                      className="block w-full p-3 text-sm
              rounded-l-lg
              outline-none
              text-white
              focus:border-blue-700
              bg-black
              bg-opacity-40
              backdrop-filter
              backdrop-blur-md
              border-neutral-800 border"
                      value={inputValue}
                      onChange={handleChange}
               />

               <button type="submit"  className="flex justify-center items-center text-white end-1.5 bottom-2 bg-blue-800 hover:bg-blue-700 focus:bg-blue-800 outline-none font-medium rounded-r-lg text-sm px-4 py-2">
                   <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                       <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                   </svg>
               </button>
           </div>

            {
                inputValue.length > 0 && filteredData.length > 0 && (<div className="">
                    <div className="max-h-60 w-full overflow-hidden overflow-y-scroll pt-2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-md rounded-lg p-2 mt-2">
                        <ul className="">
                            {
                                filteredData.map((node, index) => (
                                    <li key={index} className="text-white text-sm p-2 hover:bg-blue-800 cursor-pointer rounded-md">
                                        {node.name}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>)
            }


        </div>
    )
}
