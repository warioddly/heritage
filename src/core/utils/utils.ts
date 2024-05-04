import {TreeNodeDefinition} from "@/core/types/tree-definition";


export function createTreeEdge(source: string, target: string): TreeNodeDefinition {
    return {
        data: {
            id: `${source}-${target}`,
            source,
            target,
        }
    };
}
