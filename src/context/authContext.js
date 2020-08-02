import React, { createContext, useState, useEffect } from "react";

import authService from "../services/authService";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import * as legoData from "../pops.json";
export const AuthContext = createContext();

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: legoData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    authService.isAuthenticated().then((data) => {
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoaded(true);
    });
  }, []);

  return (
    <div>
      {!isLoaded ? (
        <div style={{ marginTop: "10rem" }}>
          <FadeIn>
            <div
              style={{
                display: "grid",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Lottie options={defaultOptions} height={300} width={300} />
              <h2 style={{ position: "center" }}>Loading...</h2>
            </div>
          </FadeIn>
        </div>
      ) : (
        <AuthContext.Provider
          value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
        >
          {children}{" "}
        </AuthContext.Provider>
      )}
    </div>
  );
};
