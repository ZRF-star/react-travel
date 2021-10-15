import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

interface IDetailPageProps {}

type Props = IDetailPageProps & RouteComponentProps<{touristRouteId:string}>;

export const DetailPage:React.FC<Props> = (props:Props) => {
    return (
        <div>
            <h1>路游路线详情页面,路线id:{props.match.params.touristRouteId}</h1>
        </div>
    )
}