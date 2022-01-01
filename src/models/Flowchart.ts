export type TStatusType =  "healthy" | "unhealthy" | "degrated" | null


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