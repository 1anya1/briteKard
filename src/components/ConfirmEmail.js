import axios from "axios";
import { useEffect } from "react";
export default function ConfirmEmail (){
    const queryParameters = new URLSearchParams(window.location.search)
    const token = queryParameters.get("token")
    console.log({token})
    useEffect(()=>{
        console.log('in here')
        axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/passwordReset/confirm-email?token=${token}`
        )
        .then((response) => {
          if (response) {
            console.log(response)
          }
        })
        .catch((error) => {
         console.log(error)
        },[]);

    })
 
      return <div>In confirmation email</div>

}