"use client";
// @ts-ignore
import cola from 'cytoscape-cola';
// @ts-ignore
import dagre from 'cytoscape-dagre';
import cytoscape from "cytoscape";
import {treeData} from "@/core/data/tree";
import {createTreeEdge} from "@/core/utils/utils";
import {TreeNodeDataDefinition, TreeNodeDefinition} from "@/core/types/tree-definition";
import CytoscapeComponent from 'react-cytoscapejs';
import {useState} from "react";


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
  cytoscape.use(dagre);


  const [selectedNode, setSelectedNode] = useState<TreeNodeDataDefinition | null>(null);


  return (
      <div className="flex">

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

        <InformationDrawer
            node={selectedNode}
            setSelectedNode={setSelectedNode}
        />

      </div>
  );
}




export function InformationDrawer(props: { node: TreeNodeDataDefinition | null, setSelectedNode: (node: TreeNodeDataDefinition | null) => void }) {

  const { node } = props;

  console.log(node);

  const findParentNode = (node: TreeNodeDataDefinition | null): TreeNodeDataDefinition | undefined => {
    if (node && node.source) {
      return treeData.nodes.map((n) => n.data).find((n) => n.id === node?.source) as TreeNodeDataDefinition | undefined;
    }
    return undefined;
  }

  return (
      <div className="w-auto" >

        <div id="drawer-info"
             className={`
                fixed top-20 z-40 p-4 h-5/6
                ${node ? 'transform translate-x-0 left-5' : 'transform -translate-x-full left-0'}
                overflow-y-auto transition-transform
                border-neutral-800
                border
                backdrop-filter 
                backdrop-blur-md
                w-3/4
                md:w-80
                bg-gray-800
                bg-opacity-10
                rounded-xl
               duration-200 ease-in-out`}
             tabIndex={-1}
             aria-labelledby="drawer-info-label"
        >


          <h5 id="drawer-label" className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
            <svg className="w-5 h-5 me-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
            Информация
          </h5>


          <button type="button"
                  onClick={() => props.setSelectedNode(null)}
                  data-drawer-hide="drawer-info"
                  aria-controls="drawer-info"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
          >

            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span className="sr-only">Close menu</span>
          </button>


            <div className="mb-6">
              <div className="mb-4">
                <div className="block text-sm font-medium text-gray-500">Имя</div>
                <div className="text-lg text-gray-300">{node?.label}</div>
              </div>

              <div className="mb-4">
                <div className="block text-sm font-medium text-gray-500">Имя отца</div>
                <div className="text-lg text-gray-300">
                  { findParentNode(node)?.label || '-' }
                </div>
              </div>

              <div className="mb-4">
                <div className="block text-sm font-medium text-gray-500">Родословная</div>
                <div className="text-lg text-gray-300">Сары-Булак</div>
              </div>

              <div className="mb-4">
                <div className="block text-sm font-medium text-gray-500">Подробнее</div>
                <div className="text-lg text-gray-300">-</div>
              </div>
            </div>



        </div>

      </div>
  );

}