"use client";
import {treeData} from "@/core/data/tree";
import {TreeNodeDataDefinition, TreeNodeDefinition} from "@/core/types/tree-definition";
import {binaryTreeSearch, searchChildNodes} from "@/core/utils/tree-utils";
import {useEffect, useState} from "react";


export function TreePersonInfoDrawer(props: { node: TreeNodeDataDefinition | null, setSelectedNode: (node: TreeNodeDataDefinition | null) => void }) {

  const { node, setSelectedNode } = props;

  return (
      <div className="w-auto" >
        <div id="drawer-info"
             className={`
                fixed z-40 
                p-4
                w-full
                bottom-0 
                left-0
                top-auto
                ${node 
                 ? 'transform translate-y-0 md:translate-x-0 md:left-5' 
                 : 'transform translate-y-full md:-translate-x-full md:left-0'
                }
                md:translate-y-0
                md:h-5/6
                md:top-20
                md:w-80
                md:bottom-auto
                border-neutral-800
                border
                backdrop-filter 
                backdrop-blur-md
                bg-gray-800
                bg-opacity-10
                rounded-t-xl
                md:rounded-xl
                transition-transform
                duration-200 
                ease-in-out`}
             tabIndex={-1}
             aria-labelledby="drawer-info-label"
        >
          <DrawerContent node={node} handleClose={() => setSelectedNode(null)} />
        </div>
      </div>
  );

}


function DrawerContent({ node, handleClose }: { node: TreeNodeDataDefinition | null, handleClose: () => void }) {

  const [childrenNodes, setChildrenNodes] = useState<TreeNodeDataDefinition[]>([]);

  const findParentNode = (node: TreeNodeDataDefinition | null): TreeNodeDefinition | undefined => {
    return binaryTreeSearch(treeData.nodes, node?.source);
  }

  useEffect(() => {

    if (node) {
      setChildrenNodes(searchChildNodes(treeData.nodes, node.id) || []);
    }

    return () => {
        setChildrenNodes([]);
    }
  }, [node]);

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
        <div className="text-sm md:text-base text-gray-300">{node?.name}</div>
      </div>

      <div className="mb-4">
        <div className="block text-sm font-normal text-gray-500">Имя отца</div>
        <div className="text-sm md:text-base text-gray-300">
          { findParentNode(node)?.data.name || '-' }
        </div>
      </div>

      {/*<div className="mb-4">*/}
      {/*  <div className="block text-sm font-normal text-gray-500">Родословная</div>*/}
      {/*  <div className="text-sm md:text-base text-gray-300">-</div>*/}
      {/*</div>*/}

      <div className="mb-4">
        <div className="block text-sm font-normal text-gray-500">Биография</div>
        <div className="text-sm md:text-base text-gray-300">-</div>
      </div>

      <div className="mb-4">
        <div className="block text-sm font-normal text-gray-500 mb-1">Дети</div>
        <div className="text-gray-300 flex flex-wrap gap-1.5">
          {childrenNodes.length === 0 && <div className="text-sm md:text-base text-gray-300">-</div>}
          {childrenNodes?.map((n, index) => (
              <p
                 key={index}
                 className="hover:bg-blue-800 text-gray-200
                  text-sm px-2.5 py-0.5 rounded
                  cursor-pointer
                  border border-neutral-500 inline-flex items-center justify-center"
              >{n.name}</p>
            ))}
        </div>
      </div>

    </div>
  </>
}