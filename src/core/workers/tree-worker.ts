import {createTreeEdges} from "@/core/utils/tree-utils";
import {TreeNodeDataDefinition} from "@/core/types/tree-definition";


onmessage = function (e: MessageEvent<WorkerBridge>) {

    const { data } = e;
    const { type, payload } = data;

    switch (type) {
        case 'GET_TREE':
            const edges = createTreeEdges(payload);
            let data: TreeNodeDataDefinition[] = payload.concat(edges);
            postMessage({ type , payload: data });
            break;
        default:
            break;
    }
}

