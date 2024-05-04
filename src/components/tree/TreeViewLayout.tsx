"use client";
import {TreeInteractiveViewer} from "@/components/tree/InteractiveViewer";
import {TreeViewToolbar} from "@/components/tree/TreeViewToolbar";


export function TreeViewLayout() {

  return (
      <>
          <TreeInteractiveViewer />
          <TreeViewToolbar />
      </>
  );
}




