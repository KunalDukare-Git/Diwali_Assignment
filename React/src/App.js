import logo from "./logo.svg";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import ProtectedOutlet from "./protect-routes/ProtectedOutlet";
import Auth_Guard from "./protect-routes/Auth_Guard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route element={<Auth_Guard />}>
          <Route path="/" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route element={<ProtectedOutlet />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
