import { create } from 'zustand'
import {ECytoscapeLayouts} from "@/core/data/cytoscape-layouts";
import {TreeNodeDataDefinition} from "@/core/types/tree-definition";


type TTreeStore = {
    selected: TreeNodeDataDefinition | null;
    layout: ECytoscapeLayouts;
    setLayout: (layout: ECytoscapeLayouts) => void;
    setSelected: (selected: TreeNodeDataDefinition | null) => void;
}

export const useTreeStore = create<TTreeStore>((set) => ({
    selected: null,
    layout: ECytoscapeLayouts.Dagre,
    setLayout: (layout) => set(() => ({ layout })),
    setSelected: (selected: TreeNodeDataDefinition | null) => set(() => ({ selected })),
}))
