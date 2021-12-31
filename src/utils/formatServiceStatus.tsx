import { Label } from 'components/Flowchart/Label'
import { IStatusResponse, INodeElement, IEdgeElement } from 'models/Flowchart'

export function formatServiceStatus(data: IStatusResponse[]) {

    const formattedData = [];

    const targetNodes = new Set();

    data.map((element) => {
        element.edges.map(edge => {
            targetNodes.add(edge.target)
        })
    })

    console.log(targetNodes)
    
    data.map((element) => {
        const { edges, id, name, status, link } = element;
        
        let elementExists: any = formattedData.find(element => element.id === id)

        if(elementExists) {
            formattedData.splice(formattedData.indexOf(elementExists), 1);

            let type;

            if(!targetNodes.has(id)) type = "input"
            else if (edges.length) type = "default"
            else type = "output"

            elementExists = {
                ...elementExists,
                sourcePosition: 'right',
                targetPosition: "left",
                data: {
                    label: <Label title={name} status={status} /> ,
                    link: link
                },
                position: { x: 250, y: 0 },
                type
            }

            formattedData.push(elementExists)

        } else {
            let type;

            if(!targetNodes.has(id)) type = "input"
            else if (edges.length) type = "default"
            else type = "output"
            

            formattedData.push({
                id,
                sourcePosition: 'right',
                targetPosition: "left",
                data: {
                    label: <Label title={name} status={status} /> ,
                    link: link
                },
                position: { x: 250, y: 0 },
                type
            })
        }
      
        edges.map(edge => {
            formattedData.push(
                {
                    id: id + edge.target,
                    source: id,
                    target: edge.target,
                    label: edge.status,
                    type: "bezier",
                    animated:  edge.status !== 'healthy',
                }
            )

           let edgeExists = formattedData.find(element => element.id === edge.target)

           if(!edgeExists) {
               formattedData.push({
                id: edge.target,
                sourcePosition: 'right',
                targetPosition: "left",
                data: {
                    label: <Label title={edge.target} /> ,
                },
                position: { x: 250, y: 0 },
                type: "output"
               })
           }
        })

    })



    return formattedData;


}