// import axios from 'axios';
import React from 'react'
// import { useParams } from 'react-router';
// import { useNavigate } from 'react-router';

const EmailValidation = () => {
    // const navigate = useNavigate();
    // const [error, setError] = useState({ type: false, message: "" })
    // const [validate, setValidate] = useState(false)
    // const params = useParams();


    // if (params.token) {
    //     const getTokenVarify = async () => {
    //         try {
    //             const res = await axios.post("http://localhost:8000/api/validation/", params)
    //             console.log(res.data)
    //             if (res.data) {
    //                 setValidate(true)
    //             }
    //         } catch (err) {
    //             setError({ type: true, message: err.response.data })
    //         }
    //     }
    //     getTokenVarify();
    // }
    // useEffect(() => {
    //         if (validate) {
    //             navigate('/?verified=success')
    //         }
    // }, [validate])
       
    console.log("email validation")
    return (
        <div className="limiter">
            <div className="container-login100">
                {/* {error.type && (
                    <div className="wrap-login100 alert-box">
                        <label>{error.message}</label>
                    </div>
                )} */}
                <div className="wrap-login100 p-l-55 p-r-55 p-t-30 p-b-20 center">
                    <img className='varify-Img' src="/images/varify.png" alt='verify-success' />
                    <p>Varification email send. Please check your email</p>
                    <div className="txt1 text-center p-t-20 p-b-20">
								<span>
									Did not receive email yet:&nbsp;
								</span>
								<a href="/register" className="txt2" >
									Sign Up
								</a>
							</div>
                </div>
            </div>
        </div>
    )
};

export default EmailValidation