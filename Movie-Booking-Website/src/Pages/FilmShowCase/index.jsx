import { useEffect, useState } from "react";
import 'ldrs/quantum'
import { useNavigate } from "react-router-dom";
import './styles/FilmShowCase.scss'
import { useLocation } from "react-router-dom";

function FilmShowCase() {

    // === Use State ===
    const location = useLocation();
    const value = location.state;
    const [showNavBar, setShowNavBar] = useState(false);
    const [movies, setMovies] = useState([
        {
            id: 1,
            img: <><img src="/src/assets/Images/image1.png" alt="" /></>,
            title: "Movie Title"
        },
        {
            id: 2,
            img: <><img src="/src/assets/Images/image2.png" alt="" /></>,
            title: "Movie Title"
        },
        {
            id: 3,
            img: <><img src="/src/assets/Images/image3.png" alt="" /></>,
            title: "Movie Title"
        },
        {
            id: 4,
            img: <><img src="/src/assets/Images/image4.png" alt="" /></>,
            title: "Movie Title"
        },
        {
            id: 5,
            img: <><img src="/src/assets/Images/image5.png" alt="" /></>,
            title: "Movie Title"
        },
        {
            id: 6,
            img: <><img src="/src/assets/Images/image6.png" alt="" /></>,
            title: "Movie Title"
        }
    ])

    // === Variable ===

    let navigate1 = useNavigate();
    let navigate2 = useNavigate();
    let navigate3 = useNavigate();

    // === Functions ===

    const goToSignInPage = () => {
        let path1 = "/sign-in";
        navigate1(path1)
    }

    const goToSignUpPage = () => {
        let path2 = "/sign-up";
        navigate2(path2)
    }
    const goToNewInPage = () => {
        navigate3("/my-ticket")
    }


    // === Use Effect ===

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNavBar(true);
        }, 2500);
        return () => clearTimeout(timer);
    }, [])

    return (
        <>{
            showNavBar ? <div className="moviesContainer">
                <div className="navigationBar">
                    <div className='image'>
                        <img src="/src/assets/Images/logo2.png" alt="Logo" />
                    </div>
                    <div className='navButton'>
                        <div>
                            {value ? <></> :
                                <button className="greenBtn" onClick={goToSignInPage} >
                                    <span>
                                        Login
                                    </span>
                                </button>
                            }
                        </div>
                        <div>
                            {value ? <></> :
                                <button className="transparentBtn" onClick={goToSignUpPage}>
                                    <span>
                                        Register
                                    </span>
                                </button>
                            }
                        </div>
                        <div>
                            {value ?
                                <button className="transparentBtnn" onClick={goToNewInPage}>
                                    <span>
                                        My Ticket
                                    </span>
                                </button> : <></>
                            }
                        </div>
                        <div>
                            {value ?
                                <button className="redBtn" onClick={goToSignUpPage}>
                                    <span>
                                        Logout
                                    </span>
                                </button> : <></>
                            }
                        </div>
                    </div>
                </div>
                <div className='heading'>
                    <h1>Now Showing</h1>
                </div>
                <div className="filmShowcase">
                    {
                        movies.map((movie) => {
                            return (
                                <div key={movie.id} className="moviesWrapper">
                                    <div className="moviesImage">
                                        {movie.img}
                                        <div className="moviesTitle">
                                            <span>
                                                {movie.title}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div > :
                <div className='loader'>
                    <l-quantum
                        size="120"
                        speed="1.8"
                        color="#ffff"
                    ></l-quantum>
                </div>
        }
        </>
    );
};

export default FilmShowCase