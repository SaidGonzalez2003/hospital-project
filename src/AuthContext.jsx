import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { API } from "./js/consultas";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [autenticado, setAutenticado] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const verificarToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setAutenticado(false);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(API+"/users/validate", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.valido) {
          setAutenticado(true);
        } else {
          localStorage.removeItem("token");
          setAutenticado(false);
        }
      } catch (error) {
        localStorage.removeItem("token");
        setAutenticado(false);
        console.log(error);
        
      }

      setLoading(false);
    };

    verificarToken();
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setAutenticado(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAutenticado(false);
  };

  return (
    <AuthContext.Provider value={{ autenticado, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


