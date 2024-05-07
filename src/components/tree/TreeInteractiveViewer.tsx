"use client";
// @ts-ignore
import cola from 'cytoscape-cola';
// @ts-ignore
import dagre from 'cytoscape-dagre';
import cytoscape from "cytoscape";
import {treeData} from "@/core/data/tree";
import {TreeNodeDataDefinition} from "@/core/types/tree-definition";
import CytoscapeComponent from 'react-cytoscapejs';
import {useState} from "react";
import {TreePersonInfoDrawer} from "@/components/tree/TreePersonInfoDrawer";
import {createTreeEdges} from "@/core/utils/tree-utils";


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
      fontSize: 16,
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
  animationDuration: 1000,
  avoidOverlap: true,
  refresh: 1, // number of ticks per frame; higher is faster but more jerky
  maxSimulationTime: 4000, // max length in ms to run the layout
  ungrabifyWhileSimulating: false, // so you can't drag nodes during layout
  fit: false,
  padding: 30,
  boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  nodeDimensionsIncludeLabels: false, // whether labels should be included in determining the space used by a node
  randomize: false, // use random node positions at beginning of layout
  handleDisconnected: true, // if true, avoids disconnected components from overlapping
  convergenceThreshold: 0.01, // when the alpha value (system energy) falls below this value, the layout stops
};


export function TreeInteractiveViewer() {

  // cytoscape.use(cola);
  cytoscape.use(dagre);

  const [selectedNode, setSelectedNode] = useState<TreeNodeDataDefinition | null>(null);

  return (
      <div className="flex">

        <CytoscapeComponent
            elements={treeData.nodes.concat(createTreeEdges(treeData.nodes))}
            stylesheet={styleSheet as any}
            style={{ width: '100vw', height: '100vh' }}
            zoomingEnabled={true}
            layout={layout}
            maxZoom={1}
            minZoom={0.2}
            autounselectify={false}
            boxSelectionEnabled={true}
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

        <TreePersonInfoDrawer
            node={selectedNode}
            setSelectedNode={setSelectedNode}
        />

      </div>
  );
}
