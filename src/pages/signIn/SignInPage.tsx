import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

interface ISignInPageProps {} 
type Props = ISignInPageProps & RouteComponentProps<{}>
export const SignInPage:React.FC<Props> = (props:Props) => {
    return (
        <div>
            <h1>登陆页面</h1>
        </div>
    )
}
