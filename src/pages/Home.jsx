import React, { useEffect } from "react";
import Login from "../screens/root/Login";
import Register from "../screens/root/Register";
import { useState } from "react";
const Home = () => {
  const [register, setRegister] = useState(false);
  const [loginInfo, setLoginInfo] = useState({});
  const [registerInfo, setRegisterInfo] = useState({});
  const [btnLoading, setBtnLoading] = useState(false);

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      <div
        className={`${
          register ? "-translate-x-[100vw] " : "-translate-x-[0vw]"
        } flex duration-700 md:duration-700`}
      >
        <Login setRegister={() => setRegister(!register)} />
        <Register setRegister={() => setRegister(!register)} />
      </div>
    </div>
  );
};

export default Home;
