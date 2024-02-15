import { useState } from "react";
import Home from "./Router/Home/Home";
import Login from "./Router/Login/Login";
import { toast } from "react-toastify";

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (token) => {
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    toast.error("LogOut")
  };

  return (
    <>
      {token ? <Home token={token} onLogout={handleLogout} /> : <Login onLogin={handleLogin} />}
    </>
  );
}

export default App;
