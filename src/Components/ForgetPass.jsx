import React, { useState } from 'react'

const ForgetPass = () => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState({ type: false, message: "" })
    
    const handleResetPass = () => {
        //something goes here
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
								Reset Password
							</span>
							<div className="wrap-input100 validate-input m-b-23" data-validate="Email is reauired">
								<span className="label-input100">Email</span>
								<input className="input100" type="text" name="email" autoComplete='off' placeholder="Type your email" onChange={(e) => setEmail(e.target.value)} />
								<span className="focus-input100 at-lf" data-symbol="&#x40;"></span>
							</div>
							<div className="container-login100-form-btn reg-btn">
								<div className="wrap-login100-form-btn">
									<div className="login100-form-bgbtn"></div>
									<button className="login100-form-btn" onClick={handleResetPass}>
										Reset My Password
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
}

export default ForgetPass