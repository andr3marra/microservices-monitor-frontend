import {TStatusType} from 'models/Flowchart'

type TProps = {
    title: string,
    status: TStatusType
}

export function Label({ title, status }: TProps) {
    return (
        <div className='node'>
            <span>{title}</span>
            <div className={`badge ${status || 'unknown'}`} />
        </div>
    )
}