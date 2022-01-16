import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Dashboard from './components/Dashboard';
import SideBar from './components/SideBar';
import AddExpenses from './components/AddExpenses';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      <Routes>
        <Route exact path="/dashboard" element={<SideBar />} />
        <Route exact path="/add-expenses" element={<SideBar />} />
        <Route exact path="/list-expenses" element={<SideBar />} />
        <Route exact path="/add-expenses" element={<SideBar />} />
      </Routes>

    </BrowserRouter >
  );
}

export default App;