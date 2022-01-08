export type TStatusType =  "healthy" | "unhealthy" | "degrated" | null


export interface IEdgeResponse {
    id: string
    targetId: string,
    status: TStatusType
}

export interface IStatusResponse {
    edges: IEdgeResponse[],
    id: string,
    name: string
    status: TStatusType
    link?: string
}