import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import FilmShowcase from './Pages/FilmShowCase';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FilmShowcase />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/my-ticket" element={<h1 className='ticket'>Tickets Currently Not Available..!</h1>} />
          <Route path="*" element={<h1 className='error'>404 : Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App