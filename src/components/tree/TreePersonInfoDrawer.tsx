"use client";
import {TreeNodeDefinition} from "@/core/types/tree-definition";
import {useEffect, useState} from "react";
import {useTreeStore} from "@/core/stores/tree";
import {theme} from "@/core/styles/theme";


export function TreePersonInfoDrawer() {

  const treeStore = useTreeStore();

  return (
      <div className="w-auto" >
        <div id="drawer-info"
             className={`
                fixed 
                z-40 
                p-4
                w-full
                bottom-0 
                left-0
                top-auto
                ${treeStore.selected 
                 ? 'transform translate-y-0 md:translate-x-0 md:left-5' 
                 : 'transform translate-y-full md:-translate-x-full md:left-0'
                }
                md:translate-y-0
                md:h-5/6
                md:top-20
                md:w-80
                md:bottom-auto
                border
                ${theme.border.color}
                ${theme.backgroundBlur}
                rounded-t-xl
                md:rounded-lg
                transition-transform
                duration-200 
                ease-in-out`}
             tabIndex={-1}
             aria-labelledby="drawer-info-label"
        >
          <DrawerContent handleClose={() => {
            treeStore.setSelected(null);
          }}/>
        </div>
      </div>
  );

}


function DrawerContent({ handleClose }: {  handleClose: () => void }) {

  const [childrenNodes, setChildrenNodes] = useState<TreeNodeDefinition[]>([]);
  const treeStore = useTreeStore();

  useEffect(() => {

    if (!treeStore.selected) {
      return;
    }

    fetch('/api/get-node-children', {
        method: 'POST',
        body: JSON.stringify({id: treeStore.selected?.id}),
    })
        .then(response => response.json())
        .then((data: TreeNodeDefinition[]) => setChildrenNodes(data || []))
        .catch(error => console.error('Error:', error));

    return () => {
        setChildrenNodes([]);
    }
  }, [treeStore.selected]);


  return <>

    <div>
      <h5 id="drawer-label" className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
        <svg className="w-5 h-5 me-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
        Информация
      </h5>
      <button type="button"
              onClick={handleClose}
              data-drawer-hide="drawer-info"
              aria-controls="drawer-info"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
      >

        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
        <span className="sr-only">Close menu</span>
      </button>
    </div>

    <div className="mb-6">
      <div className="mb-4">
        <div className="block text-sm font-normal text-gray-500">Имя</div>
        <div className={`text-sm md:text-base ${theme.typography.primary}`}>{treeStore.selected?.name}</div>
      </div>

      <div className="mb-4">
        <div className="block text-sm font-normal text-gray-500">Имя отца</div>
        <div className={`text-sm md:text-base ${theme.typography.primary}`}>
          {treeStore.selected?.fullName || '-'}
        </div>
      </div>

      <div className="mb-4">
        <div className="block text-sm font-normal text-gray-500">Биография</div>
        <div className={`text-sm md:text-base ${theme.typography.primary}`}>-</div>
      </div>

      <div className="mb-4">
        <div className="block text-sm font-normal text-gray-500">Подробнее</div>
        <a
            href={`${treeStore.selected?.url ? treeStore.selected!.url : '#'}`}
            target="_blank"
            className={`text-sm md:text-base ${theme.typography.primary} flex items-center hover:text-${theme.typography.hover}`}>
          Посмотреть
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
               stroke="currentColor" className="ms-2 w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"/>
          </svg>
        </a>
      </div>

      <div className="mb-4">
        <div className="block text-sm font-normal text-gray-500 mb-1">Дети</div>
        <div className="text-gray-300 flex flex-wrap gap-1.5">
          {childrenNodes.length === 0 && <div className="text-sm md:text-base text-gray-300">-</div>}
          {Array.isArray(childrenNodes) && childrenNodes.map((n, index) => (
              <p
                  key={index}
                  className={`hover:${theme.button.primaryHover} ${theme.typography.primary}
                  text-sm px-2.5 py-0.5 rounded
                  cursor-pointer
                  border ${theme.border.color}
                  inline-flex items-center justify-center
                  `}
              >{n.data.name}</p>
          ))}
        </div>
      </div>

    </div>
  </>
}