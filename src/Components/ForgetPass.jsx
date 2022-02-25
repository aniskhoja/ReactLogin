import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

const ForgetPass = () => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState({ type: false, message: "" })
    const [reset, setReset] = useState(false);
    const [userId, setUserId] = useState(null)
    const [newPassword,  setNewPassword] = useState("")
    const navigate = useNavigate();
    const params = useParams();
    
    const getResetTokenVarify = async () => {
        if (params.token) {
            try {
                const res = await axios.post("http://localhost:8000/api/login/reset/", params)
                if (res.data) {
                    setUserId(res.data._id)
                    setReset(true)
                }
            } catch (err) {
                console.log(err.message)
                setError({ type: true, message: err.response.data })
                
            };
        };
    };
    
    const handleChangePass = async (e) => {
        e.preventDefault();
         try {
            const res = await axios.post("http://localhost:8000/api/login/reset", { newPassword, userId })
            if (res.data) {
                navigate('/?reset=successfully')
            }
        } catch (err) {
            console.log(err.message)
            setError({ type: true, message: err.response.data})
        }
    }
    
    const handleResetPass = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/api/login/reset", { email })
            if (res.data) {
                navigate('/validation')
            }
        } catch (err) {
            console.log(err.message)
            setError({ type: true, message: err.response.data})
        }
    };

    useEffect(() => {
        getResetTokenVarify()
    },[])
  return (
		<div>
			<div className="limiter">
				<div className="container-login100">
					{error.type && (
				  <div className="wrap-login100 alert-box">
					<label>{error.message}</label>
				  </div>
				  )}
					<div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
						<form className="login100-form validate-form">
							<span className="login100-form-title p-b-49">
								Reset Password
                          </span>
                          {reset ? (
                              <div className="wrap-input100 validate-input m-b-23" data-validate="Email is reauired">
								<span className="label-input100">New Password</span>
								<input className="input100" type="password" name="password" autoComplete='off' placeholder="Enter new password" onChange={(e) => setNewPassword(e.target.value)} />
								<span className="focus-input100 at-lf" data-symbol="&#x40;"></span>
							</div>
                          ) : (
                                <div className="wrap-input100 validate-input m-b-23" data-validate="Email is reauired">
								<span className="label-input100">Email</span>
								<input className="input100" type="text" name="email" autoComplete='off' placeholder="Type your email" onChange={(e) => setEmail(e.target.value)} />
								<span className="focus-input100 at-lf" data-symbol="&#x40;"></span>
                          </div>  
                          )
                        }
							
                          
							<div className="container-login100-form-btn reg-btn">
								<div className="wrap-login100-form-btn">
                                  <div className="login100-form-bgbtn"></div>
                                  {reset ? (
                                      <button className="login100-form-btn" onClick={handleChangePass}>
										Change My Password
									</button>
                                  ) : (
                                         <button className="login100-form-btn" onClick={handleResetPass}>
										Reset
									</button> 
                                  )}
									
								</div>
							</div>

							<div className="txt1 text-center p-t-54 p-b-20">
								<span>
									Already user:&nbsp;
								</span>
								<a href="/" className="txt2" >
									Login
								</a>
                          </div>
                          <div className="txt1 text-center p-t-0 p-b-20">
								<span>
									Create new account:&nbsp;
								</span>
								<a href="/register" className="txt2" >
									Sign Up
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ForgetPass