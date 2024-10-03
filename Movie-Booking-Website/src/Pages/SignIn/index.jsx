import { useEffect, useState } from "react";
import 'ldrs/waveform'
import { Link, useNavigate } from "react-router-dom";
import useAPIRequest from "../../useAPIRequest"
import './styles/SignIn.scss'


function SignIn() {

    // === Use State ===
    const [showNavBar, setShowNavBar] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isDisable, setIsDisable] = useState(true);
    let navigate = useNavigate();

    // == API Calls ===

    const {
        data: signInData
    } = useAPIRequest("http://localhost:3000/accounts")

    // === Functions ===

    const updateEmail = ((e) => {
        setEmail(e.target.value)
        let temp = true
        signInData.map((index) => {
            if (e.target.value === index.email) {
                temp = false
            }
        })
        if (temp) {
            alert("Don't Have an Account ..!")
            document.getElementById('refreshEmail').value = '';
        }
    })

    const updatePassword = ((e) => {
        setPassword(e.target.value)
    })

    const handleFormSubmit = ((e) => {
        e.preventDefault();
        if (signInData) {
            if (!isDisable) {
                fetch("http://localhost:3000/accounts")
                    .then((res) => { return res.json() })
                    .then((data) => {
                        let temp = false;
                        for (let i = 0; i < data.length; i++) {
                            const user = data[i]
                            if (user.email === email && user.password === password) {
                                temp = true
                                break;
                            }
                        }
                        if (!temp) {
                            alert("Invalid Details")
                        }
                        else {
                            navigate("/", { state: true })
                        }
                    })
            }
        }
        else {
            alert("Server is Down")
        }
    })

    // === Use Effect ===

    useEffect(() => {
        if (email && password) {
            setIsDisable(false)
        }
        else {
            setIsDisable(true)
        }
    }, [email, password])

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNavBar(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, [])

    return (
        <>
            {
                showNavBar ?
                    <div className="signInFormContainer">
                        <div className="formWrapper">
                            <h2>Login to your account</h2>
                            <form action="">
                                <div className="inputWrapper">
                                    <label htmlFor="email">Email </label>
                                    <input
                                        type="email"
                                        required
                                        name="email"
                                        placeholder="Enter Your Email"
                                        onBlur={updateEmail}
                                        id="refreshEmail"
                                    />
                                </div>
                                <div className="inputWrapper">
                                    <label htmlFor="password">Password </label>
                                    <input
                                        type="password"
                                        required
                                        minLength={4}
                                        maxLength={10}
                                        name="password"
                                        placeholder="Enter Your Password"
                                        onChange={updatePassword}
                                        id="refreshPasswword"
                                    />
                                </div>
                                <div className="inputWrapper">
                                    <button className="SignUpBtn" autoFocus={true} disabled={isDisable} onClick={handleFormSubmit}>Create Account</button>
                                </div>
                            </form>
                            <div className="noteWrapper">
                                <span>
                                    Don’t have an account ?
                                    <Link to="/sign-up">
                                        Register Here
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </div> :
                    <div className='loader'>
                        <l-waveform
                            size="80"
                            stroke="4.5"
                            speed="1"
                            color="#ffff"
                        >
                        </l-waveform>
                    </div>
            }
        </>
    );
};
export default SignIn;