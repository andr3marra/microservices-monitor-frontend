import {ReactNode} from 'react'

export type TStatusType =  "healthy" | "unhealthy" | "degrated" | null
type TNodeType = "input" | "default" | "output"
type IEdgeType = "bezier" | "step" | "smoothstep"
type IPositionType = "right" | "left" | "bottom" | "top"

interface IPosition {
    x: number,
    y: number
}

export interface IEdgeResponse {
    target: string,
    status: TStatusType
}

export interface IStatusResponse {
    edges: IEdgeResponse[],
    id: string,
    name: string
    status: TStatusType
    link?: string
}

export interface INodeElement{
    id: string,
    type: TNodeType,
    sourcePosition: IPositionType,
    targetPosition: IPositionType,
    data: { 
        label: string,
        link?: string
     },
    position: IPosition,
}

export interface IEdgeElement {
    id: string,
    source: string,
    type: IEdgeType,
    target: string,
    animated: boolean,
    label: string
}


