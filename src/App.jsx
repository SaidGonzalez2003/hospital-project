import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Login from "./auth/Login";
import Dashboard from "./Dashboard";
import "./App.css";

function App() {
  const { autenticado, loading } = useAuth();

  if (loading) return <p>Cargando...</p>; 
  return (
    <Routes>
      <Route
        path="/login"
        element={!autenticado ? <Login /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/dashboard"
        element={autenticado ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/"
        element={<Navigate to={autenticado ? "/dashboard" : "/login"} />}
      />
      <Route
        path="*"
        element={<Navigate to={autenticado ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
}

export default App;
