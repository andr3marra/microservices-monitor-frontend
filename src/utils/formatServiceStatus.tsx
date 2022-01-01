import { Label } from "components/Flowchart/Label"
import { IStatusResponse, IEdgeResponse } from "models/Flowchart"
import { FlowElement, Node, Edge } from 'react-flow-renderer'

export function formatServiceStatus(data: IStatusResponse[]) {

    const formattedData = [] as FlowElement[];

    const targetNodeIds = new Set<string>();

    // Getting target Nodes
    data.map((element) => {
        element.edges.map(edge => {
            targetNodeIds.add(edge.target)
        })
    })

    // Constructing FlowElements
    data.map((element) => {
        constructNodes(element, formattedData, targetNodeIds);

        constructEdges(element, formattedData)
    })

    return formattedData;
}

function getNodeType(element: IStatusResponse, targetNodes: Set<string>) {
    if (!targetNodes.has(element.id)) return "input"
    else if (element.edges.length) return "default"
    else return "output"
}

function constructNodes(element: IStatusResponse, formattedData: FlowElement[], targetNodeIds: Set<string>) {
    let node: Node = formattedData.find(arrayelement => arrayelement.id === element.id) as Node

    if (node) {    // Remove element from Array
        formattedData.splice(formattedData.indexOf(node), 1);
    } else {                // create new element
        node = {} as Node;
        node.id = element.id;
    }

    node.data = {
        label: <Label title={element.name} status={element.status} />,
        link: element.link
    };
    node.type = getNodeType(element, targetNodeIds);

    formattedData.push(node)
}

function constructEdges(element: IStatusResponse, formattedData: FlowElement[]) {
    element.edges.map(edge => {
        let edgeElement = {} as Edge;

        edgeElement.id = element.id + edge.target;
        edgeElement.source = element.id;
        edgeElement.target = edge.target;
        edgeElement.label = edge.status;
        edgeElement.type = "bezier";
        edgeElement.animated = edge.status !== "healthy";
        edgeElement.labelStyle = { fill: '#f6ab6c', fontWeight: 700 };
        edgeElement.style = { stroke: '#f6ab6c' };

        formattedData.push(edgeElement);

        let edgeExists = formattedData.find(element => element.id === edge.target)

        // Construct Node if it does not exists
        if (!edgeExists) {
            let newNode = {} as Node;

            newNode.id = edge.target;
            newNode.data = {
                label: <Label title={edge.target} />
            };
            newNode.type = "output"

            formattedData.push(newNode);
        }
    })
}

