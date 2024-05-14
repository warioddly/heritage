import {create} from 'zustand'
import {TreeNodeDataDefinition} from "@/core/types/tree-definition";
import {ECytoscapeLayouts, ETreeHighlight} from "@/core/types/tree";
import cytoscape, {CollectionReturnValue} from "cytoscape";


type TTreeStore = {
    cy: cytoscape.Core | null;
    event: MouseEvent | null;
    selected: TreeNodeDataDefinition | null;
    layout: ECytoscapeLayouts;
    highlightType: ETreeHighlight;
    highlightedNodes: CollectionReturnValue | null;
    setLayout: (layout: ECytoscapeLayouts) => void;
    setSelected: (selected: TreeNodeDataDefinition | null) => void;
    setHighlightType: (event?: any, highlightType?: ETreeHighlight) => void;
    setEvent: (event: any) => void;
}

export const useTreeStore = create<TTreeStore>((set, get) => ({
    cy: null,
    event: null,
    selected: null,
    layout: ECytoscapeLayouts.Dagre,
    highlightType: ETreeHighlight.Predecessors,
    highlightedNodes: null,
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
    setHighlightType: (event, highlightType) => {

        const _event = event || get().event;

        get().highlightedNodes?.removeClass('highlighted');

        if (!_event.target || (_event.target === get().cy || _event.target.group() == "edges")) {
            return;
        }

        const highlightedNodes = highlightType ? _event.target.successors() : _event.target.predecessors();

        highlightedNodes
            .removeClass('highlighted')
            .addClass('highlighted')

        set(() => ({ highlightType: highlightType || ETreeHighlight.Predecessors, event: _event, highlightedNodes }));
    },
    setEvent: (event) => set(() => ({ event })),
}))
