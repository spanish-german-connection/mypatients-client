import "./App.css";
import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate";
import Navbar from "./components/Navbar";
import "./components/Navbar.css";
import AppointmentListPage from "./pages/AppointmentListPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function App() {
  // console.clear();

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
        <Route
          path="/appointments"
          element={
            <IsPrivate>
              <AppointmentListPage></AppointmentListPage>
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
