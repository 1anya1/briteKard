
import axios from "axios";
export default function VerifyEmail(props) {
    const{email} = props
    console.log(props)
    function handleClick(e) {
        console.log('in here')
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_URL}/passwordReset/verify-email`,
            { email }
          )
          .then((response) => {
            if (response) {
              console.log(response)
            }
          })
          .catch((error) => {
           console.log(error)
          });
      }
  return (
    <div className="px-4 pt-14 flex-1">
      <div className="w-full max-w-2xl md:mx-auto md:px-10 py-10 px-4  bg-gray-50 rounded-xl mb-10 ">
        <p className="text-2xl font-extrabold  text-left  tracking-tight text-gray-900  mb-5 ">
          Please Verify Your Email
        </p>

        <>
          <p className="text-lg  text-left  tracking-tight text-gray-900  mb-5 ">
            An email was sent to you. Please very your email.
            Dont see an email? Check spam folder.
            <span className='text-blue-500 hover:text-blue-700' onClick={handleClick}> Click here to resend the link.</span>
          </p>
        </>
      </div>
    </div>
  );
}
