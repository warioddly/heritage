"use client";

import {ChangeEvent, useState} from "react";
import {TreeNodeDefinition} from "@/core/types/tree-definition";
import {debounce} from "@/core/utils/utils";
import IconButton from "@/components/other/IconButton";
import {useTreeStore} from "@/core/stores/tree";
import {theme} from "@/core/styles/theme";
import {ECytoscapeLayouts, ETreeHighlight} from "@/core/types/tree";

export function TreeViewToolbar() {

  const treeStore = useTreeStore();

  return (
      <>
          <SearchField/>
          <div className="flex flex-col gap-2 z-30 fixed top-1/2 px-4 right-0" role="group">
              <TreeViewVariant/>
              {treeStore.selected && <EdgeHighlightVariant/>}
          </div>
      </>
  );
}


function SearchField() {

    const [inputValue, setInputValue] = useState("");
    const [filteredData, setFilteredData] = useState<TreeNodeDefinition[]>([]);
    const [loading, setLoading] = useState(false);
    const debounceFilter = debounce(handleChange, 1500);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
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
        <div className="z-20 fixed top-20 px-4 right-auto w-full md:w-auto md:right-0 md:px-4">
            <div className="w-full md:w-80 relative">
                <div className="flex justify-between">
                    <label htmlFor="search" className="mb-2 text-sm font-medium sr-only text-white">Поиск</label>
                    <input type="search"
                           id="search"
                           placeholder="Фамилия, имя, родословня..."
                           className={`
                      block
                      w-full
                      p-3 
                      text-sm
                      rounded-l-lg
                      outline-none
                      text-${theme.typography.primary}
                      focus:border-blue-700
                      bg-black
                      ${theme.backgroundBlur}
                      border-${theme.colors.border}
                      border`}
                        onChange={debounceFilter}
                     />

                       <button type="submit"  className={`flex justify-center items-center text-${theme.typography.primary} end-1.5 bottom-2 bg-${theme.button.primary} hover:bg-${theme.button.primaryHover} outline-none rounded-r-lg text-sm px-4 py-2 border-${theme.colors.border} ${theme.backgroundBlur} border bg-black hover:border-blue-700 `}>
                           <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                           </svg>
                       </button>
               </div>


                {
                    inputValue.length > 0 && filteredData.length === 0 && !loading && (
                        <div className={`max-h-60 w-full overflow-hidden overflow-y-scroll pt-2 bg-gray-500 ${theme.backgroundBlur} ${theme.border.radius} p-2 mt-2`}>
                            <p className="text-white text-sm">Ничего не найдено</p>
                        </div>
                    )
                }

                {
                    loading && (<div className={`max-h-60 w-full overflow-hidden overflow-y-scroll pt-2 bg-gray-500 ${theme.backgroundBlur} ${theme.border.radius} p-2 mt-2`}>
                        <p className={`text-${theme.typography.primary} text-sm`}>Загрузка...</p>
                    </div>)
                }

                {
                    inputValue.length > 0 && filteredData.length > 0 && !loading && (<div className="">
                        <div className={`max-h-60 w-full overflow-hidden overflow-y-scroll pt-2 bg-gray-500 ${theme.backgroundBlur} ${theme.border.radius} p-2 mt-2`}>
                            <ul className="">
                                {
                                    filteredData.map((node, index) => (
                                        <li key={index} className={`text-${theme.typography.primary} text-sm p-2 hover:bg-blue-800 cursor-pointer rounded-md`}>
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
        <div className="flex flex-col gap-1" >

            <IconButton
                onClick={() => treeStore.layout !== ECytoscapeLayouts.Cola && treeStore.setLayout(ECytoscapeLayouts.Cola)}
                className={treeStore.layout === ECytoscapeLayouts.Cola ? `bg-${theme.button.primary}` : ''}
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
                className={treeStore.layout === ECytoscapeLayouts.Dagre ? `bg-${theme.button.primary}` : ''}
                icon={(
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"/>
                    </svg>
                )}/>

        </div>
    )
}


function EdgeHighlightVariant() {

    const treeStore = useTreeStore();

    return (
        <div className="">
            {
                treeStore.highlightType !== ETreeHighlight.Predecessors
                    ? (<IconButton
                        onClick={() => treeStore.setHighlightType(ETreeHighlight.Predecessors)}
                        icon={
                            (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5"/>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5"/>
                                </svg>
                            )
                        }/>)
                    : (<IconButton
                        onClick={() => treeStore.setHighlightType(ETreeHighlight.Successors)}
                        icon={(
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"/>
                            </svg>
                        )}/>)
            }
        </div>
    )
}