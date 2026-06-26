import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NavBar from "./components/NavBar";
import "./css/App.css";
import Home from "./pages/Home";
import Movies from "./pages/Movies"
import TV from "./pages/TVShow";
import CinemaDetails from "./pages/CinemaDetails";

//Create client session
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //Keeps data cache permanently during session but revalidates data in background on page load
      staleTime: 0,
      gcTime: Infinity,
      refetchOnWindowFocus: false,
    }
  }
})

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie" element={<Movies />} />
            <Route path="/tv" element={<TV />} />
            <Route path="/:mediaType/:mediaIdent" element={<CinemaDetails />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
