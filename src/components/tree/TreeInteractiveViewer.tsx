"use client";
// @ts-ignore
import cola from 'cytoscape-cola';
// @ts-ignore
import dagre from 'cytoscape-dagre';
import cytoscape from "cytoscape";
import {treeData} from "@/core/data/tree";
import {TreeNodeDataDefinition, TreeNodeDefinition} from "@/core/types/tree-definition";
import CytoscapeComponent from 'react-cytoscapejs';
import {useEffect, useState} from "react";
import {TreePersonInfoDrawer} from "@/components/tree/TreePersonInfoDrawer";
import Preloader from "@/components/other/Preloader";


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


const layout = {
  name: 'dagre',
  infinite: false,
  animate: false,
  directed: false,
  avoidOverlap: true,
  fit: false,
  padding: 30,
  nodeDimensionsIncludeLabels: false,
  randomize: false,
  handleDisconnected: false,
  convergenceThreshold: 0.01,
};


export function TreeInteractiveViewer() {

  // cytoscape.use(cola);
  cytoscape.use(dagre);

  const [selectedNode, setSelectedNode] = useState<TreeNodeDataDefinition | null>(null);
  const [graph, setGraph] = useState<TreeNodeDefinition[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        const worker = new Worker(new URL('../../core/workers/tree-worker.ts', import.meta.url));

        worker.postMessage({ type: 'GET_TREE', payload: treeData });

        worker.onmessage = (e: MessageEvent<WorkerBridge>) => {
          setGraph(e.data.payload);
          worker.terminate();
          setLoading(false);
        };

        return () => {
            worker.terminate();
        }

    }, []);

  return (
      <div className="flex">

          {!loading && (
              <CytoscapeComponent
                  elements={graph}
                  stylesheet={styleSheet as any}
                  style={{ width: '100vw', height: '100vh' }}
                  zoomingEnabled={true}
                  layout={layout}
                  maxZoom={1}
                  minZoom={0.1}
                  autounselectify={false}
                  boxSelectionEnabled={false}
                  cy={(cy) => {

                      cy.on('tap', 'node', (evt) => {
                          const node = evt.target;
                          setSelectedNode(node.data());
                          cy.center(node);
                      });

                      cy.on('tap', (evt) => {
                          if (evt.target === cy) {
                              setSelectedNode(null);
                          }
                      });

                  }}
              />
          )}

        <TreePersonInfoDrawer
            node={selectedNode}
            setSelectedNode={setSelectedNode}
        />

        {loading && <Preloader />}

      </div>
  );
}
