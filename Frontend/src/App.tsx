import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./css/App.css";
import Home from "./pages/Home";
import Movies from "./pages/Movies"
import TV from "./pages/TVShow";
import CinemaDetails from "./pages/CinemaDetails";


function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<Movies />} />
          <Route path="/tv" element={<TV />} />
          <Route path="/:mediaType/:mediaIdent" element={<CinemaDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
