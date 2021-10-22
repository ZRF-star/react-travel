import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { UserLayout } from '../../layouts/userLayout'

interface ISignInPageProps {} 
type Props = ISignInPageProps & RouteComponentProps<{}>
export const SignInPage:React.FC<Props> = (props:Props) => {
    return (
    <>
       <UserLayout>
          <div>
            <h1>登陆页面</h1>
          </div>
       </UserLayout>
    </>
    )
        
        
}
