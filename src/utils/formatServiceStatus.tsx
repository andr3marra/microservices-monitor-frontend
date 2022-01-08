import { Label } from "components/Flowchart/Label"
import { IStatusResponse, IEdgeResponse } from "models/Flowchart"
import { FlowElement, Node, Edge } from 'react-flow-renderer'
import { v4 as uuidv4 } from 'uuid';

export function formatServiceStatus(data: IStatusResponse[]) {

    const formattedData = [] as FlowElement[];

    const targetNodeIds = new Set<string>();

    // Getting target Nodes
    data.map((element) => {
        if(element.edges){
            element.edges.map(edge => {
                if(edge.targetId){
                    targetNodeIds.add(edge.targetId)
                }else{
                    edge.targetId = uuidv4()
                    targetNodeIds.add(edge.targetId)
                }
            })
        }
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
    if(element.edges){
        element.edges.map(edge => {
            let edgeElement = {} as Edge;
    
            edgeElement.id = edge.id;
            edgeElement.source = element.id;
            console.log(edge.targetId);
            edgeElement.target = edge.targetId;
            edgeElement.label = edge.status;
            edgeElement.type = "bezier";
            edgeElement.animated = edge.status !== "healthy";
            edgeElement.labelStyle = { fill: '#f6ab6c', fontWeight: 700 };
            edgeElement.style = { stroke: '#f6ab6c' };
    
            formattedData.push(edgeElement);
    
            let nodeExists = formattedData.find(element => element.className === "Node" && element.id === edge.id)
    
            // Construct Node if it does not exists
            if (!nodeExists) {
                let newNode = {} as Node;
    
                newNode.id = edge.targetId;
                newNode.data = {
                    label: <Label title={edge.targetId} />
                };
                newNode.type = "output"
    
                formattedData.push(newNode);
            }
        })
    }
}

