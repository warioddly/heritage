"use client";

import {ChangeEvent, useState} from "react";
import {TreeNodeDefinition} from "@/core/types/tree-definition";
import {debounce} from "@/core/utils/utils";
import IconButton from "@/components/other/IconButton";
import {useTreeStore} from "@/core/stores/tree";
import {ECytoscapeLayouts} from "@/core/data/cytoscape-layouts";

export function TreeViewToolbar() {
  return (
      <>
          <SearchField />
          <TreeViewVariant />
      </>
  );
}


function SearchField() {

    const [inputValue, setInputValue] = useState("");
    const [filteredData, setFilteredData] = useState<TreeNodeDefinition[]>([]);
    const [loading, setLoading] = useState(false);
    const debounceFilter = debounce(handleChange, 1500);

    function handleChange (e: ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value);
        filter();
    }

    function filter() {

        setLoading(true);

        fetch('/api/search-node', {
            method: 'POST',
            body: JSON.stringify({value: inputValue}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((data: TreeNodeDefinition[]) => {
                setFilteredData(data);
            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => setLoading(false));
    }

    return (
        <div className="z-30 absolute top-20 px-4 right-auto w-full md:w-auto md:right-0 md:px-4">
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
                      onChange={debounceFilter}
               />

               <button type="submit"  className="flex justify-center items-center text-white end-1.5 bottom-2 bg-blue-800 hover:bg-blue-700 focus:bg-blue-800 outline-none font-medium rounded-r-lg text-sm px-4 py-2">
                   <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                       <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                   </svg>
               </button>
           </div>


            {
                inputValue.length > 0 && filteredData.length === 0 && !loading && (
                    <div className="max-h-60 w-full overflow-hidden overflow-y-scroll pt-2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-md rounded-lg p-2 mt-2">
                        <p className="text-white text-sm">Ничего не найдено</p>
                    </div>
                )
            }

            {
                loading && (<div className="max-h-60 w-full overflow-hidden overflow-y-scroll pt-2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-md rounded-lg p-2 mt-2">
                    <p className="text-white text-sm">Загрузка...</p>
                </div>)
            }

            {
                inputValue.length > 0 && filteredData.length > 0 && !loading && (<div className="">
                    <div className="max-h-60 w-full overflow-hidden overflow-y-scroll pt-2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-md rounded-lg p-2 mt-2">
                        <ul className="">
                            {
                                filteredData.map((node, index) => (
                                    <li key={index} className="text-white text-sm p-2 hover:bg-blue-800 cursor-pointer rounded-md">
                                        {node.data.name}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>)
            }


        </div>
        </div>
    )
}


function TreeViewVariant() {

    const treeStore = useTreeStore();

    return (
        <div className="z-30 absolute top-1/2 px-4 right-0">
            <div className="flex flex-col gap-1 rounded-md shadow-sm" role="group">

                <IconButton
                    onClick={() => treeStore.layout !== ECytoscapeLayouts.Cola && treeStore.setLayout(ECytoscapeLayouts.Cola)}
                    className={treeStore.layout === ECytoscapeLayouts.Cola ? 'bg-blue-700 bg-opacity-100' : ''}
                    icon={
                    (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"/>
                        </svg>
                    )
                } />

                <IconButton
                    onClick={() => treeStore.layout !== ECytoscapeLayouts.Dagre && treeStore.setLayout(ECytoscapeLayouts.Dagre)}
                    className={treeStore.layout === ECytoscapeLayouts.Dagre ? 'bg-blue-700 bg-opacity-100' : ''}
                    icon={
                    (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"/>
                        </svg>
                    )
                }/>

            </div>
        </div>
    )
}