import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar"
import "./components/Navbar.css";
import PatientListPage from "./pages/PatientListPage";
import LoginPage from "./pages/LoginPage";
import IsAnon from "./components/IsAnon";

function App() {
  console.clear();

  return (
    <div className="App">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        
        <Route path="/patients" element={<PatientListPage />} />
        
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
      
      </Routes>
    </div>
  );
}

export default App;
