import { create } from 'zustand'
import {TreeNodeDataDefinition} from "@/core/types/tree-definition";
import {ECytoscapeLayouts, ETreeHighlight} from "@/core/types/tree";
import cytoscape from "cytoscape";


type TTreeStore = {
    cy: cytoscape.Core | null;
    event: MouseEvent | null;
    selected: TreeNodeDataDefinition | null;
    layout: ECytoscapeLayouts;
    highlightType: ETreeHighlight;
    setLayout: (layout: ECytoscapeLayouts) => void;
    setSelected: (selected: TreeNodeDataDefinition | null) => void;
    setHighlightType: (highlightType: ETreeHighlight) => void;
    setEvent: (event: any) => void;
}

export const useTreeStore = create<TTreeStore>((set, get) => ({
    cy: null,
    event: null,
    selected: null,
    layout: ECytoscapeLayouts.Dagre,
    highlightType: ETreeHighlight.Predecessors,
    setLayout: (layout) => set(() => ({ layout })),
    setSelected: (node: TreeNodeDataDefinition | null) => {

        const cy = get().cy;
        cy?.elements().unselect();

        if (node) {
            const _node = cy?.elements(`#${node?.id}`);
            cy?.center(_node);
            _node?.select();
        }

        set(() => ({ selected: node }));
    },
    setHighlightType: (highlightType) => set(() => ({ highlightType })),
    setEvent: (event) => set(() => ({ event })),
}))
