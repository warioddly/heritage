"use client";

import {ChangeEvent, useState} from "react";
import {TreeNodeDefinition} from "@/core/types/tree-definition";
import {useTreeStore} from "@/core/stores/tree";
import {theme} from "@/core/styles/theme";
import {TreeViewActions} from "@/components/tree/TreeViewActions";
import {ETreeHighlight} from "@/core/types/tree";

export function TreeViewToolbar() {

  const treeStore = useTreeStore();

  return (
      <>
          <SearchField/>
          <div className={`flex flex-col gap-2 z-30 fixed ${treeStore.selected ? "top-1/3" : "top-1/2"} px-4 right-0`} role="group">
              <TreeViewActions />
          </div>
      </>
  );
}


let abortController: AbortController | null = null;

function SearchField() {

    const treeStore = useTreeStore();

    const [inputValue, setInputValue] = useState("");
    const [filteredData, setFilteredData] = useState<TreeNodeDefinition[]>([]);
    const [onFocus, setOnFocus] = useState(false);
    const [loading, setLoading] = useState(false);


    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.value.length < 2) {
            setFilteredData([]);
            return;
        }

        setLoading(true);
        setInputValue(e.target.value);
        filter();
    }


    function filter() {

        if (abortController) {
            abortController.abort();
        }

        abortController = new AbortController();

        fetch('/api/search-node', {
            method: 'POST',
            body: JSON.stringify({value: inputValue}),
            signal: abortController.signal
        })
            .then(response => response.json())
            .then((data: TreeNodeDefinition[]) => setFilteredData(data))
            .catch(error => console.error('Error:', error))
            .finally(() => setLoading(false));
    }


    const handleClick = (node: TreeNodeDefinition) => {

        if (!node.data.id) {
            return;
        }

        setInputValue("");
        treeStore.setSelected(node.data)
        treeStore.setHighlightType(null, ETreeHighlight.Predecessors);
    }


    return (
        <div className="z-20 fixed top-20 px-4 right-auto w-full md:w-auto md:right-0 md:px-4">
            <div className="w-full md:w-80 relative">
                <div className="flex justify-between">
                    <label htmlFor="search" className="mb-2 text-sm font-medium sr-only text-white">Поиск</label>
                    <input
                        type="search"
                        id="search"
                        placeholder="Фамилия, имя, родословня..."
                        className={`block w-full p-3 text-sm outline-none focus:border-blue-700 bg-black text-${theme.typography.primary} ${theme.backgroundBlur} ${theme.border.color} ${theme.border.radius} border`}
                        onChange={handleChange}
                        onFocus={() => setOnFocus(true)}
                        onBlur={() => setOnFocus(false)}
                     />
                       {/*<button type="submit"  className={`flex justify-center items-center ${theme.typography.primary} end-1.5 bottom-2 ${theme.button.primary} hover:bg-${theme.button.primaryHover} outline-none rounded-r-lg text-sm px-4 py-2 ${theme.border.color} ${theme.backgroundBlur} border bg-black hover:border-blue-700 `}>*/}
                       {/*    <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">*/}
                       {/*        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>*/}
                       {/*    </svg>*/}
                       {/*</button>*/}
               </div>


                {
                    inputValue.length > 2 && filteredData.length === 0 && !loading && onFocus && (
                        <div className={`max-h-60 w-full overflow-hidden pt-2 bg-gray-500 ${theme.backgroundBlur} ${theme.border.radius} p-2 mt-2`}>
                            <p className="text-white text-sm">Ничего не найдено</p>
                        </div>
                    )
                }

                {
                    loading && onFocus && (<div className={`max-h-60 w-full overflow-hidden pt-2 bg-gray-500 ${theme.backgroundBlur} ${theme.border.radius} p-2 mt-2`}>
                        <p className={`${theme.typography.primary} text-sm`}>Загрузка...</p>
                    </div>)
                }

                {
                    inputValue.length > 0 && filteredData.length > 0 && !loading && (<div className="">
                        <div className={`max-h-60 w-full overflow-hidden overflow-y-scroll pt-2 bg-gray-500 ${theme.backgroundBlur} ${theme.border.radius} p-2 mt-2`}>
                            <ul className="">
                                {
                                    filteredData.map((node, index) => (
                                        <li key={index}
                                            className={`${theme.typography.primary} text-sm p-2 hover:bg-blue-800 cursor-pointer rounded-md`}
                                            onClick={() => handleClick(node)}
                                        >
                                            {node.data.fullName || node.data.name}
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
