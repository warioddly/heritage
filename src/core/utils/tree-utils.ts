import {TreeNodeDefinition} from "@/core/types/tree-definition";

export function createTreeEdges(nodes: TreeNodeDefinition[]): TreeNodeDefinition[] {

    const edges: TreeNodeDefinition[] = [];

    nodes.forEach((node: TreeNodeDefinition) => {

        if (!node.data || node.data.id === '1') {
            return;
        }

        edges.push({
            data: {
                id: `${node.data.source}-${node.data.id}`,
                source: node.data.source,
                target: node.data.id,
            }
        });

    });

    return nodes.concat(edges);
}
