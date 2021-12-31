import React, { useState, useEffect } from 'react';
import ReactFlow, { removeElements, addEdge,  isNode } from 'react-flow-renderer';
import {AxiosResponse} from 'axios'
import dagre from 'dagre'

import initialElements from 'initial-elements';

import {api} from 'config/api'
import {IStatusResponse} from 'models/Flowchart'
import {formatServiceStatus} from 'utils/formatServiceStatus'


const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const onNodeMouseEnter = (event, node) => console.log('mouse enter:', node);
const onNodeMouseMove = (event, node) => console.log('mouse move:', node);
const onNodeMouseLeave = (event, node) => console.log('mouse leave:', node);
const onNodeContextMenu = (event, node) => {
    event.preventDefault();
    console.log('context menu:', node);
};


const Flowchart = () => {
    const [isFetching, setIsFetching] = useState<boolean>(true)
    const [elements, setElements] = useState<any>(initialElements);
    const [instance, setInstance] = useState();

    useEffect(() => {
        async function getData() {
            const {data} = await api.get<IStatusResponse[]>("/status"); 
            const formattedData = formatServiceStatus(data);
            console.log(formattedData)

            setIsFetching(false);
            setElements(getLayoutedElements(formattedData))
        }

        getData()
    }, [])


    const onLoad = (reactFlowInstance) => {
      setInstance(reactFlowInstance)
      reactFlowInstance.fitView()
    };

    const onElementsRemove = (elementsToRemove) =>
        setElements((els) => removeElements(elementsToRemove, els));

    const onConnect = (params) => setElements((els) => addEdge(params, els));

    const changeClassName = () => {
        setElements((elms) =>
            elms.map((el) => {
                if (el.type === 'input') {
                    el.className = el.className ? '' : 'dark-node';
                }

                return { ...el };
            })
        );
    };

    const onClick = (event, node) => {
        if (node.data.link) {
            window.location.href = node.data.link;
        }
    }

    const redraw = (reactFlowInstance) => {
      
        // if (initialElements2) {
        //     setElements(initialElements2 || []);
        //     instance.fitView();
        // }
    };

    const handleHealthCheck = async () => {
        const {data} = await api.get<IStatusResponse[]>("/status"); 
        const formattedData = formatServiceStatus(data);
        console.log(formattedData)

        setIsFetching(false);
        setElements(getLayoutedElements(formattedData))
    }


    const getLayoutedElements = (elements, direction = 'LR') => {
        const isHorizontal = direction === 'LR';
        dagreGraph.setGraph({ rankdir: direction });
      
        elements.forEach((el) => {
          if (isNode(el)) {
            dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
          } else {
            dagreGraph.setEdge(el.source, el.target);
          }
        });
      
        dagre.layout(dagreGraph);
      
        return elements.map((el) => {
          if (isNode(el)) {
            const nodeWithPosition = dagreGraph.node(el.id);
            el.targetPosition = isHorizontal ? 'left' : 'top';
            el.sourcePosition = isHorizontal ? 'right' : 'bottom';
      
            // unfortunately we need this little hack to pass a slightly different position
            // to notify react flow about the change. Moreover we are shifting the dagre node position
            // (anchor=center center) to the top left so it matches the react flow node anchor point (top left).
            el.position = {
              x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
              y: nodeWithPosition.y - nodeHeight / 2,
            };
          }
      
          return el;
        });
      };
      
      
    
    return (
        !isFetching && <ReactFlow
            elements={elements}
            onElementsRemove={onElementsRemove}
            onConnect={onConnect}
            onLoad={onLoad}
            selectNodesOnDrag={false}
            //onNodeMouseEnter={onNodeMouseEnter}
            //onNodeMouseMove={onNodeMouseMove}
            //onNodeMouseLeave={onNodeMouseLeave}
            onNodeContextMenu={onNodeContextMenu}
            onElementClick={onClick}
        >
            <button
                onClick={changeClassName}
                style={{ position: 'absolute', right: 10, top: 30, zIndex: 4 }}
            >
                change class name
            </button>
            <button
                onClick={redraw}
                style={{ position: 'absolute', right: 10, top: 60, zIndex: 4 }}
            >
                Redraw itens
            </button>
            <button
                onClick={handleHealthCheck}
                style={{ position: 'absolute', right: 10, top: 90, zIndex: 4 }}
            >
               Refresh
            </button>
        </ReactFlow>
    );
};

export default Flowchart;