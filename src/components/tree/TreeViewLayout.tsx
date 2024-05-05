"use client";
import {TreeInteractiveViewer} from "@/components/tree/TreeInteractiveViewer";
import {TreeViewToolbar} from "@/components/tree/TreeViewToolbar";


export function TreeViewLayout() {

  return (
      <>
          <TreeInteractiveViewer />
          <TreeViewToolbar />
      </>
  );
}




