import {TreeNodeDataDefinition, TreeNodeDefinition} from "@/core/types/tree-definition";
import {createTreeEdge} from "@/core/utils/utils";


export function binaryTreeSearch(tree: TreeNodeDefinition[], id?: string): TreeNodeDefinition | undefined {

    let start = 0;
    let end = tree.length - 1;

    const target = parseInt(id || "");

    if (tree.length === 0 || isNaN(target)) {
        return undefined;
    }

    while (start <= end) {
        const mid = Math.floor((start + end) / 2);

        if (parseInt(tree[mid].data.id) === target) {
            return tree[mid];
        }
        if (parseInt(tree[mid].data.id) < target) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return undefined;
}


export function searchChildNodes(tree: TreeNodeDefinition[], id?: string): TreeNodeDataDefinition[] | undefined {
    if (!id) {
        return undefined;
    }

    const children: TreeNodeDataDefinition[] = [];

    for (const node of tree) {
        if (node.data.source === id) {
            children.push(node.data);
        }
    }

    return children;
}


export function createTreeEdges(nodes: TreeNodeDefinition[]): TreeNodeDefinition[] {

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