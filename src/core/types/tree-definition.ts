

type Position = {
    x: number;
    y: number;
}

export interface TreeDefinition {
    nodes: TreeNodeDefinition[];
    edges: TreeNodeDefinition[];
}

export interface TreeNodeDefinition {
    group?: "nodes" | "edges" | undefined;
    data: TreeNodeDataDefinition;
    /**
     * Scratchpad data (usually temp or nonserialisable data)
     */
    scratch?: any;
    /**
     * The model position of the node (optional on init, mandatory after)
     */
    position?: Position | undefined;
    /**
     * can alternatively specify position in rendered on-screen pixels
     */
    renderedPosition?: Position | undefined;
    /**
     * Whether the element is selected (default false)
     */
    selected?: boolean | undefined;
    /**
     * Whether the selection state is mutable (default true)
     */
    selectable?: boolean | undefined;
    /**
     * When locked a node's position is immutable (default false)
     */
    locked?: boolean | undefined;
    /**
     * Wether the node can be grabbed and moved by the user
     */
    grabbable?: boolean | undefined;
    /**
     * Whether the element has passthrough panning enabled.
     */
    pannable?: boolean | undefined;
    /**
     * a space separated list of class names that the element has
     */
    classes?: string[] | string | undefined;
    /**
     *  CssStyleDeclaration;
     */
    style?: any | undefined;
    /**
     * you should only use `style`/`css` for very special cases; use classes instead
     */
}

export interface _TreeNodeDataDefinition {
    id: string;
    position?: Position | undefined;
}

export interface TreeEdgeDataDefinition extends _TreeNodeDataDefinition {
    id: string;
    source: string;
    target: string;
    [key: string]: any;
}

export interface TreeNodeDataDefinition extends _TreeNodeDataDefinition {
    id: string;
    source: string;
    [key: string]: any;
}
