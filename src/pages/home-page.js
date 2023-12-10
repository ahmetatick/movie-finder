import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/movies");
    // eslint-disable-next-line
  }, []);

  return <div></div>;
};

export default HomePage;
