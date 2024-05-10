import { create } from 'zustand'
import {TreeNodeDataDefinition} from "@/core/types/tree-definition";
import {ECytoscapeLayouts, ETreeHighlight} from "@/core/types/tree";


type TTreeStore = {
    event: MouseEvent | null;
    selected: TreeNodeDataDefinition | null;
    layout: ECytoscapeLayouts;
    highlightType: ETreeHighlight;
    setLayout: (layout: ECytoscapeLayouts) => void;
    setSelected: (selected: TreeNodeDataDefinition | null) => void;
    setHighlightType: (highlightType: ETreeHighlight) => void;
    setEvent: (event: any) => void;
}

export const useTreeStore = create<TTreeStore>((set) => ({
    event: null,
    selected: null,
    layout: ECytoscapeLayouts.Dagre,
    highlightType: ETreeHighlight.Predecessors,
    setLayout: (layout) => set(() => ({ layout })),
    setSelected: (selected: TreeNodeDataDefinition | null) => set(() => ({ selected })),
    setHighlightType: (highlightType) => set(() => ({ highlightType })),
    setEvent: (event) => set(() => ({ event })),
}))
