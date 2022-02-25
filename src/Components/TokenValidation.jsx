import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';

const TokenValidation = () => {
    const navigate = useNavigate();
    const [error, setError] = useState({ type: false, message: "" })
    const params = useParams();
    
    const getTokenVarify = async () => {
        try {
            const res = await axios.post("http://localhost:8000/api/validation/", params)
            if (res.data) {
                navigate('/?verified=success')
            }
        } catch (err) {
            console.log(err.message)
            setError({ type: true, message: err.response.data })
        }
    }
   
    useEffect(() => {
        getTokenVarify();
    }, [])
   
    return (
        <div className="limiter">
            <div className="container-login100">
                {error.type && (
                    <div className="wrap-login100 alert-box">
                        <label>{error.message}</label>
                    </div>
                )}
                <div className="wrap-login100 p-l-55 p-r-55 p-t-30 p-b-20 center">
                    <img className='varify-Img' src="/images/warning.jpg" alt='verify-error' />
                    <p>Opps! Something went wrong</p>
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

export default TokenValidation