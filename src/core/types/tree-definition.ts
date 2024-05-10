

type Position = {
    x: number;
    y: number;
}

export interface TreeNodeDefinition {
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

export interface TreeNodeDataDefinition {
    id: string;
    source: string;
    position?: Position | undefined;
    [key: string]: any;
}
