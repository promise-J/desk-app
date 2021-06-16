import React from 'react'
import './login.css'
import deskImg from '../images/deskLogo.jpg'
import { auth, provider } from '../firebase'
import { useStateValue } from '../StateProvider'
import { actionTypes } from '../reducer'


export default function Login() {

    const [{}, dispatch] = useStateValue()

    const signIn = () => {
      auth.signInWithPopup(provider)
      .then((result)=> {
          dispatch({
              type: actionTypes.SET_USER,
              user: result.user
          })
      })
      .catch(err=> console.log(err))
    }
    return (
        <div className='login'>
            <div className="login_container">
                <img src={deskImg} alt="deskApp" />
                <h4>Login to DeskAPP</h4>
                <button onClick={signIn}>Sign in with Google</button>
            </div>
        </div>
    )
}
// digitaltrade.ltd1.1@gmail.com
// Password:*#digital

{/* <script type="text/javascript">window.$crisp=[];window.CRISP_WEBSITE_ID="af7fdeca-3348-4fdd-a293-8fd3de11dc5f";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();</script> */}