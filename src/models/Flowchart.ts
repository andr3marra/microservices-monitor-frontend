export type TStatusType =  "healthy" | "unhealthy" | "degrated" | null

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