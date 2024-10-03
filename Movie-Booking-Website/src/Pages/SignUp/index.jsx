import 'ldrs/trefoil'
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/SignUp.scss";
import useAPIRequest from "../../useAPIRequest"

function SignUp() {

    // === Use State ===
    const [showNavBar, setShowNavBar] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isDisable, setIsDisable] = useState(true);
    const [isPasswordMatching, setIsPasswordMatching] = useState(false)
    let navigate = useNavigate();

    // === API Call ===

    const {
        data: signUpData
    } = useAPIRequest("http://localhost:3000/accounts")

    // === Functions ===

    const handleEmail = ((e) => {
        setEmail(e.target.value)
        // let temp = e.target.value
        // let found = false
        let temp = true
        signUpData.map((index) => {
            if (e.target.value === index.email) {
                temp = false
            }
        })
        if (!temp) {
            alert("Email Already Exist..!")
            document.getElementById('refreshEmail').value = null;
        }
    })

    const handlePassword = ((e) => {
        setPassword(e.target.value)
    })

    const handleConfirmPassword = ((e) => {
        setConfirmPassword(e.target.value)
    })

    const handleFormSubmit = ((e) => {
        e.preventDefault();
        if (signUpData) {
            if (!isDisable) {
                fetch("http://localhost:3000/accounts", {
                    headers: {
                        "content-type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({
                        email,
                        password
                    }),
                })
                navigate("/", { state: true })
            }
        }
        else {
            alert("Server is Down")
        }
    })

    // === Use Effect ===

    useEffect(() => {
        if (email && password && confirmPassword && password === confirmPassword) {
            setIsDisable(false)
        }
        else {
            if (password && confirmPassword && password === confirmPassword) {
                setIsPasswordMatching(false)
            }
            else {
                setIsPasswordMatching(true)
            }
            setIsDisable(true)
        }
    }, [email, password, confirmPassword])

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNavBar(true); 4
        }, 2500);
        return () => clearTimeout(timer);
    }, [])

    return (
        <>
            {
                showNavBar ? <div className="formContainer">
                    <div className="leftSide">
                        <div className="logo">
                            <img src="/src/assets/Images/logo2.png" alt="" />
                        </div>
                        <div className="welcomeInfo">
                            <h1>
                                Welcome.<br />
                                Begin your cinematic adventure now with our ticketing platform !
                            </h1>
                        </div>
                    </div>
                    <div className="rightSide">
                        <div className="formContainer">
                            <h2>Create an account</h2>
                            <div className="formWrapper">
                                <form action="">
                                    <div className="inputWrapper">
                                        <label htmlFor="email">Email </label>
                                        <input
                                            type="email"
                                            required
                                            name="email"
                                            placeholder="Enter Your Email"
                                            onChange={handleEmail}
                                            id="refreshEmail"
                                        />
                                    </div>
                                    <div className="inputWrapper">
                                        <label htmlFor="password">Password </label>
                                        <input
                                            type="password"
                                            maxLength={10}
                                            name="password"
                                            placeholder="Enter Your Password"
                                            onChange={handlePassword}
                                        />
                                        <input
                                            type="password"
                                            maxLength={10}
                                            name="confirmPassword"
                                            className="confirmPassword"
                                            placeholder="Confirm Your Password"
                                            onChange={handleConfirmPassword}
                                        />
                                    </div>
                                    {confirmPassword && isPasswordMatching && <span className="alertMessage">Password Not Matched</span>}
                                    <div className="inputWrapper">
                                        <button className="SignUpBtn" autoFocus={true} disabled={isDisable} onClick={handleFormSubmit}>Create Account</button>
                                    </div>
                                </form>
                                <div className="noteWrapper">
                                    <span>
                                        Already Have An Account ?
                                        <Link to="/sign-in">
                                            Log In
                                        </Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div > :
                    <div className='loader'>
                        <l-trefoil
                            size="100"
                            stroke="8"
                            stroke-length="0.29"
                            bg-opacity="0.1"
                            speed="1.4"
                            color="#ffff"
                        ></l-trefoil>
                    </div>
            }
        </>
    );
};
export default SignUp