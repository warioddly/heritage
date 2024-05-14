
type CytoscapeTheme = {
    selector: string,
    style: any
}

export const cytoscapeThemes: CytoscapeTheme[] = [
    {
        selector: 'node',
        style: {
            backgroundColor: '#1d4ed8',
            width: 30,
            height: 30,
            label: 'data(name)',
            color: 'white',
            fontSize: 10,
        },
    },
    {
        selector: 'node:selected',
        style: {
            width: 30,
            height: 30,
            'text-outline-color': '#77828C',
            'text-outline-width': 8,
        },
    },
    {
        selector: "node[type='parent']",
        style: {
            shape: 'ellipse',
        },
    },
    {
        selector: 'edge',
        style: {
            width: 1,
            "line-color": "#2a3e79",
            'target-arrow-color': '#2a3e79',
            'target-arrow-shape': 'triangle',
            'curve-style': 'haystack',
        },
    },
    {
        selector: 'edge.highlighted',
        style: {
            'line-color': '#d30000',
            'target-arrow-color': '#d30000',
        }
    }
];
