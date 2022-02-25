import React from 'react'


const EmailValidation = () => {
    console.log("email validation")
    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 p-l-55 p-r-55 p-t-30 p-b-20 center">
                    <img className='varify-Img' src="/images/varify.png" alt='verify-success' />
                    {/* //chnage text based on redux */}
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