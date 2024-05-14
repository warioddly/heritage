"use client";
import IconButton from "@/components/other/IconButton";
import {useTreeStore} from "@/core/stores/tree";
import {theme} from "@/core/styles/theme";
import {ECytoscapeLayouts, ETreeHighlight} from "@/core/types/tree";
import {isDebug} from "@/core/utils/utils";

export function TreeViewActions() {

  const treeStore = useTreeStore();

  const handleDownload = () => {

        if (!treeStore.cy) {
            return;
        }

        const json = treeStore.cy?.json();

        const blob = new Blob([JSON.stringify(json)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'graph.json';
        a.click();

        // fetch('/api/get-cy-json', {
        //     method: 'POST',
        //     body: JSON.stringify(json),
        // }).then((res) => res.json()).then((data) => {
        //
        //
        // });

    }

  return (
      <div className={`flex flex-col gap-2 z-30 fixed ${treeStore.selected ? "sm:top-1/3" : "top-1/2"} md:top-1/2 px-4 right-0`} role="group">

          {treeStore.selected && <EdgeHighlightVariant/>}
          {
              isDebug && (<TreeViewVariant/>)
          }
          {
              isDebug && (
                  <IconButton
                      onClick={handleDownload}
                      icon={
                          (
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                   stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                              </svg>
                          )}
                  />
              )
          }

      </div>
  );
}

function TreeViewVariant() {

    const treeStore = useTreeStore();

    return (
        <div className="flex flex-col gap-1">

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
                className={treeStore.layout === ECytoscapeLayouts.Dagre ? theme.button.primary : ''}
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
                        onClick={() => treeStore.setHighlightType(null, ETreeHighlight.Predecessors)}
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
                        onClick={() => treeStore.setHighlightType(null, ETreeHighlight.Successors)}
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