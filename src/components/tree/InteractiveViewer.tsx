"use client";
// @ts-ignore
import cola from 'cytoscape-cola';
// @ts-ignore
import dagre from 'cytoscape-dagre';
import cytoscape from "cytoscape";
import {treeData} from "@/core/data/tree";
import {createTreeEdge} from "@/core/utils/utils";
import { TreeNodeDefinition } from "@/core/types/tree-definition";
import CytoscapeComponent from 'react-cytoscapejs';


const styleSheet = [
  {
    selector: 'node',
    style: {
      backgroundColor: '#1d4ed8',
      width: 30,
      height: 30,
      label: 'data(label)',
      'z-index': '10',
      color: 'white',
      fontSize: 20,
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
      'target-arrow-shape': 'chevron',
      'curve-style': 'bezier',
    },
  },
];


const layout = {
  name: 'cola',
  infinite: true,
  animate: true,
  directed: false,
  animationDuration: 1000,
  avoidOverlap: true,
  refresh: 1, // number of ticks per frame; higher is faster but more jerky
  maxSimulationTime: 4000, // max length in ms to run the layout
  ungrabifyWhileSimulating: false, // so you can't drag nodes during layout
  fit: false, // on every layout reposition of nodes, fit the viewport
  padding: 30, // padding around the simulation
  boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  nodeDimensionsIncludeLabels: false, // whether labels should be included in determining the space used by a node
  // layout event callbacks
  ready: function () {}, // on layoutready
  stop: function () {}, // on layoutstop

  // positioning options
  randomize: false, // use random node positions at beginning of layout
  handleDisconnected: true, // if true, avoids disconnected components from overlapping
  convergenceThreshold: 0.01, // when the alpha value (system energy) falls below this value, the layout stops
  nodeSpacing: function () {
    return 5;
  }, // extra spacing around nodes
  flow: undefined, // use DAG/tree.ts flow layout if specified, e.g. { axis: 'y', minSeparation: 30 }
  alignment: undefined, // relative alignment constraints on nodes, e.g. {vertical: [[{node: node1, offset: 0}, {node: node2, offset: 5}]], horizontal: [[{node: node3}, {node: node4}], [{node: node5}, {node: node6}]]}
  gapInequalities: undefined, // list of inequality constraints for the gap between the nodes, e.g. [{"axis":"y", "left":node1, "right":node2, "gap":25}]
  centerGraph: true, // adjusts the node positions initially to center the graph (pass false if you want to start the layout from the current position)

  // different methods of specifying edge length
  // each can be a constant numerical value or a function like `function( edge ){ return 2; }`
  edgeLength: undefined, // sets edge length directly in simulation
  edgeSymDiffLength: undefined, // symmetric diff edge length in simulation
  edgeJaccardLength: undefined, // jaccard edge length in simulation

  // iterations of cola algorithm; uses default values on undefined
  unconstrIter: undefined, // unconstrained initial layout iterations
  userConstIter: undefined, // initial layout iterations with user-specified constraints
  allConstIter: undefined, // initial layout iterations with all constraints including non-overlap
};


function createTreeEdges(nodes: TreeNodeDefinition[]): TreeNodeDefinition[] {

    const edges: TreeNodeDefinition[] = [];

    nodes.forEach((node: TreeNodeDefinition) => {

        if (node.data) {

          if (node.data.id === '1') {
            return;
          }

          edges.push(createTreeEdge(node.data.id, node.data.source));

        }
    });

    return edges;
}


export function TreeInteractiveViewer() {

  cytoscape.use(cola);

  return (
      <CytoscapeComponent
          elements={treeData.nodes.concat(createTreeEdges(treeData.nodes))}
          stylesheet={styleSheet as any}
          layout={layout}
          style={{ width: '100vw', height: '100vh' }}
          zoomingEnabled={true}
          maxZoom={6}
          minZoom={0.3}
          autounselectify={false}
          boxSelectionEnabled={true}
          cy={(cy) => {
            console.log('EVT', cy);
            cy.on('tap', 'node', (evt) => {
              const node = evt.target;
              console.log('EVT', evt);
              console.log('TARGET', node.data());
              console.log('TARGET TYPE', typeof node[0]);
            });
          }}
      />
  );
}




