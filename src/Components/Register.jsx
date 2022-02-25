import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate } from 'react-router'

const Register = () => {
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState({type:false, message:""})
	const navigate = useNavigate();
   

	const handleRegister = async (e) => {
		e.preventDefault();
		const obj = { username, email, password }
		try {
			const res = await axios.post("http://localhost:8000/api/register", obj);
			if (res.data) {
				navigate('/validation')
			}
		} catch (err) {
			console.log(err.message)
			setError({type:true, message:err.response.data})
		}
	}
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
								Register
							</span>

							<div className="wrap-input100 validate-input m-b-23" data-validate="Username is reauired">
								<span className="label-input100">Username</span>
								<input className="input100" type="text" name="username" autoComplete='off' placeholder="Type your username" onChange={(e) => setUsername(e.target.value)} />
								<span className="focus-input100" data-symbol="&#xf206;"></span>
							</div>
                          
							<div className="wrap-input100 validate-input m-b-23" data-validate="Email is reauired">
								<span className="label-input100">Email</span>
								<input className="input100" type="text" name="email" autoComplete='off' placeholder="Type your email" onChange={(e) => setEmail(e.target.value)} />
								<span className="focus-input100 at-lf" data-symbol="&#x40;"></span>
							</div>

							<div className="wrap-input100 validate-input" data-validate="Password is required">
								<span className="label-input100">Password</span>
								<input className="input100" type="password" name="pass" autoComplete='off' placeholder="Type your password" onChange={(e) => setPassword(e.target.value)} />
								<span className="focus-input100" data-symbol="&#xf190;"></span>
							</div>
					
							<div className="container-login100-form-btn reg-btn">
								<div className="wrap-login100-form-btn">
									<div className="login100-form-bgbtn"></div>
									<button className="login100-form-btn" onClick={handleRegister}>
										Sign Up
									</button>
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
						</form>
					</div>
				</div>
			</div>
		</div>
	)
};

export default Register