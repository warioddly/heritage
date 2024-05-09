"use client";
// @ts-ignore
import cola from 'cytoscape-cola';
// @ts-ignore
import dagre from 'cytoscape-dagre';
import cytoscape from "cytoscape";
import {TreeNodeDataDefinition, TreeNodeDefinition} from "@/core/types/tree-definition";
import CytoscapeComponent from 'react-cytoscapejs';
import {useEffect, useState} from "react";
import {TreePersonInfoDrawer} from "@/components/tree/TreePersonInfoDrawer";
import Preloader from "@/components/other/Preloader";
import {cytoscapeLayouts, ECytoscapeLayouts} from "@/core/data/cytoscape-layouts";
import {useTreeStore} from "@/core/stores/tree";

const styleSheet = [
  {
    selector: 'node',
    style: {
      backgroundColor: '#1d4ed8',
      width: 30,
      height: 30,
      label: 'data(name)',
      'z-index': '10',
      color: 'white',
      fontSize: 12,
    },
  },
  {
    selector: 'node:selected',
    style: {
      'border-width': '2px',
      'border-color': '#AAD8FF',
      'border-opacity': '0.5',
      'background-color': '#77828C',
      width: 30,
      height: 30,
      'text-outline-color': '#77828C',
      'text-outline-width': 8,
    },
  },
  {
    selector: "node[type='parent']",
    style: {
      shape: 'ellipse',
    },
  },
  {
    selector: 'edge',
    style: {
      width: 2,
      "line-color": "#2a3e79",
      'target-arrow-color': '#2a3e79',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
    },
  },
];


export function TreeInteractiveViewer() {

  cytoscape.use(cola);
  cytoscape.use(dagre);

  const treeStore = useTreeStore();

  let cyRef: any;
  const [graph, setGraph] = useState<TreeNodeDefinition[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [layout, setLayout] = useState(cytoscapeLayouts[treeStore.layout]);

  useEffect(() => {

    fetch('/api/get-nodes', {
      method: 'POST',
      body: JSON.stringify({ limit: 500 }),
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


  const handleNodeClick = (evt: any) => {

     if (evt.target === cyRef) {
       treeStore.setSelected(null);
       return;
     }

    const node = evt.target;
    cyRef.center(node);

    treeStore.setSelected(node.data());

  }


  return (
      <div className="flex">

          {!loading && (
              <CytoscapeComponent
                  elements={graph}
                  stylesheet={styleSheet as any}
                  layout={layout}
                  zoomingEnabled={true}
                  maxZoom={1}
                  minZoom={0.1}
                  autounselectify={false}
                  boxSelectionEnabled={false}
                  style={{ width: '100vw', height: '100vh' }}
                  cy={(cy) => {
                      cyRef = cy;
                      cy.on('tap', 'node', handleNodeClick);
                      cy.on('tap', handleNodeClick);
                  }}
              />
          )}

        <TreePersonInfoDrawer />

        {loading && <Preloader />}

      </div>
  );

}


