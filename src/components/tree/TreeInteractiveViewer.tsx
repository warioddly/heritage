"use client";
// @ts-ignore
import cola from 'cytoscape-cola';
// @ts-ignore
import dagre from 'cytoscape-dagre';
import cytoscape, {CollectionReturnValue} from "cytoscape";
import {TreeNodeDefinition} from "@/core/types/tree-definition";
import CytoscapeComponent from 'react-cytoscapejs';
import {useEffect, useState} from "react";
import {TreePersonInfoDrawer} from "@/components/tree/TreePersonInfoDrawer";
import Preloader from "@/components/other/Preloader";
import {cytoscapeLayouts} from "@/core/data/cytoscape-layouts";
import {useTreeStore} from "@/core/stores/tree";
import {cytoscapeThemes} from "@/core/styles/cytoscape-theme";
import {ETreeHighlight} from "@/core/types/tree";


export function TreeInteractiveViewer() {

  cytoscape.use(cola);
  cytoscape.use(dagre);

  const treeStore = useTreeStore();

  let cyRef: any;
  const [graph, setGraph] = useState<TreeNodeDefinition[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [layout, setLayout] = useState(cytoscapeLayouts[treeStore.layout]);
  const [highlighter, setHighlighter] = useState<CollectionReturnValue | null>(null)


  useEffect(() => {

    fetch('/api/get-nodes', {
      method: 'POST',
      body: JSON.stringify({ limit: 800 }),
    }).then((res) => res.json()).then((data: TreeNodeDefinition[]) => {
      setGraph(data);
      setLoading(false);
    });

  }, []);


  useEffect(() => {

    if (!cyRef) {
      return;
    }

    setLayout(cytoscapeLayouts[treeStore.layout]);

  }, [treeStore.layout]);


  useEffect(() => {

    const evt = treeStore.event;

    if (!evt) return;

    handleHighlight(evt);

  }, [treeStore.highlightType]);


  const handleNodeClick = (evt: any) => {

    handleHighlight(evt);

    if (evt.target !== cyRef && !evt.target.isNode()) {
      return;
    }

    const node = evt.target;
    cyRef.center(node);
    treeStore.setSelected(node.data());

  }


  const handleHighlight = (evt: any) => {

    if (evt.target === cyRef || evt.target.group() == "edges") {
      highlighter?.removeClass('highlighted');
      return;
    }

    if (highlighter) {
      highlighter?.removeClass('highlighted');
    }

    if (treeStore.highlightType == ETreeHighlight.Successors) {

      setHighlighter(evt.target.successors());

      evt.target.successors().addClass('highlighted')
    }
    else {

      setHighlighter(evt.target.predecessors());

      evt.target.predecessors().addClass('highlighted')
    }

    treeStore.setEvent(evt);

  }


  return (
      <div className="flex">

          {!loading && (
              <CytoscapeComponent
                  elements={graph}
                  stylesheet={cytoscapeThemes as any}
                  layout={layout}
                  zoomingEnabled={true}
                  maxZoom={1}
                  minZoom={0.1}
                  autounselectify={false}
                  boxSelectionEnabled={false}
                  style={{ width: '100vw', height: '100vh' }}
                  cy={(cy) => {
                      cyRef = cy;
                      cy.on('tap', handleNodeClick);
                      cy.on('unselect', 'node', () => {
                        treeStore.setSelected(null);
                      });
                  }}
              />
          )}

        <TreePersonInfoDrawer />

        {loading && <Preloader />}

      </div>
  );

}


