import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar"
import "./components/Navbar.css";
import IsAnon from "./components/IsAnon";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function App() {
  console.clear();

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />{" "}
      </Routes>
    </div>
  );
}

export default App;
