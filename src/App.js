import "antd/dist/antd.min.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate";
import Navbar from "./components/Navbar";
import AppointmentListPage from "./pages/AppointmentListPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PatientDetailsPage from "./pages/PatientDetailsPage";
import PatientListPage from "./pages/PatientListPage";
import EditPatientPage from "./pages/EditPatientPage";

function App() {
  console.clear();

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />}></Route>

        <Route
          path="/patients"
          element={
            <IsPrivate>
              <PatientListPage />
            </IsPrivate>
          }
        />

        <Route
          path="/patients/:patientId"
          element={
            <IsPrivate>
              <PatientDetailsPage />
            </IsPrivate>
          }
        />

        <Route
          path="/patient/edit/:patientId"
          element={
            <IsPrivate>
              <EditPatientPage />
            </IsPrivate>}
        />

        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
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
