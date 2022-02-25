import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons'
import axios from 'axios'
import {useNavigate} from 'react-router';


const LoginForm = () => {
    const [email, setEmail] = useState("")
	const [password, setPassword] = useState("");
	const [error, setError] = useState({type:false, message:""})
	const navigate = useNavigate();

	// const params = useParams();
	// // const tokenCode = new URLSearchParams(search).get('/');
	// console.log(params)
	// console.log("hello")

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

	const handleLogin = async (e) => {
		e.preventDefault();
		const obj = {email, password}
		try {
			const res = await axios.post("http://localhost:8000/api/login", obj);
			if (res.data) {
				navigate('/okay')
			}
		} catch (err) {
			console.log(err.response)
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
						Login
					</span>

					<div className="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
						<span className="label-input100">Email</span>
						<input className="input100" type="text" name="username" autoComplete="off" placeholder="Type your username" onChange={handleEmail}/>
						<span className="focus-input100" data-symbol="&#xf206;"></span>
					</div>

					<div className="wrap-input100 validate-input" data-validate="Password is required">
						<span className="label-input100">Password</span>
							  <input className="input100" type="password" name="pass" placeholder="Type your password" onChange={handlePassword} />
							  
						<span className="focus-input100" data-symbol="&#xf190;"></span>
					</div>
					
					<div className="text-right p-t-8 p-b-31">
						<a href="/#">
							Forgot password?
						</a>
					</div>
					
					<div className="container-login100-form-btn">
						<div className="wrap-login100-form-btn">
							<div className="login100-form-bgbtn"></div>
							<button className="login100-form-btn" onClick={handleLogin}>
								Login
							</button>
						</div>
					</div>

					<div className="txt1 text-center p-t-54 p-b-20">
						<span>
							Or Sign Up Using
						</span>
					</div>

					<div className="flex-c-m">
						<a href="/#"  className="login100-social-item bg1">
							<FontAwesomeIcon icon={faFacebookF} />
						</a>

						<a href="/#" className="login100-social-item bg2">
							<FontAwesomeIcon icon={faTwitter} />
						</a>

						<a href="/#" className="login100-social-item bg3">
							<FontAwesomeIcon icon={faGoogle} />
						</a>
					</div>

					<div className="flex-col-c p-t-155 signup-mt">

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

export default LoginForm