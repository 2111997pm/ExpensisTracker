import React from 'react'
import { Button, Form } from "react-bootstrap";
import classes from "./SignUpForm.module.css";


const SignUpForm = () => {
    return (
        <>
            {forgetVisisble ? <ForgotPassForm onReset={() => setForgetVisible(false)} onBack={onBack} /> : (<div className={classes.signup}>
                <h1>{!isLogin ? "SignUp" : "LogIn"}</h1>
                <Form ref={formRef} onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            ref={emailInputRef}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            ref={passInputRef}
                            required
                        />
                    </Form.Group>
                    {!isLogin && <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            ref={conPassInputRef}
                            required
                        />
                    </Form.Group>}
                    {isLogin && <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Link onClick={linkClickHandler}>Forgot Password?</Link>
                    </Form.Group>}
                    {!isLoading ? <Button variant="primary" type="submit">
                        {isLogin ? "LogIn" : "SignUp"}
                    </Button> : <Button variant="primary">Sending Request...</Button>}
                    {varifyMail && (
                        <p style={{ margin: "1rem", color: "green" }}>
                            Please varify email. Verfication mail already sent.
                        </p>
                    )}
                </Form>
                {!isLogin && <span>Already have an account?<button
                    className={classes.toggle}
                    onClick={switchAuthModeHandler}>LogIn</button></span>}
                {isLogin && <span>Don't have an account?<button
                    className={classes.toggle}
                    onClick={switchAuthModeHandler}>SignUp</button></span>}
            </div>)}

        </>
    )
}

export default SignUpForm