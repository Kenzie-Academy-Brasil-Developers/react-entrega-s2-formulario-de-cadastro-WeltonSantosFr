import React, { ReactNode, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { createContext } from "react";

export interface IChildren {
  children: ReactNode;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  bio: string;
  contact: string;
  course_module: string;
}

export interface IUser {
  name: string;
  course_module: string;
}

export interface IUserContext {
  handleLogin: Function;
  handleRegister: Function;
  user: IUser;
  setUser: Function;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

const UserProvider = ({ children }: IChildren) => {
  const [user, setUser] = useState<IUser>({ name: "", course_module: "" });
  function handleLogin(data: ILoginData) {
    axios
      .post("https://kenziehub.herokuapp.com/sessions", data)
      .then((res) => {
        if (res) {
          toast.success("Sucesso", {
            className: "success-toast",
            draggable: true,
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            progress: undefined,
          });

          window.localStorage.clear();
          window.localStorage.setItem("userToken", res.data.token);
          window.localStorage.setItem("userId", res.data.user.id);
          setUser({
            name: res.data.user.name,
            course_module: res.data.user.course_module,
          });
        }
      })
      .catch((err) => {
        if (err) {
          toast.error(err.response.data.message, {
            className: "success-toast",
            draggable: true,
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            progress: undefined,
          });
        }
      });
  }

  function handleRegister(data: IRegisterData) {
    axios
      .post("https://kenziehub.herokuapp.com/users", data)
      .then((res) => {
        if (res) {
          toast.success("Sucesso", {
            className: "success-toast",
            draggable: true,
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            progress: undefined,
          });

          setUser({
            name: res.data.user.name,
            course_module: res.data.user.course_module,
          });
        }
      })
      .catch((err) => {
        if (err) {
          toast.error(err.response.data.message, {
            className: "error-toast",
            draggable: true,
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            progress: undefined,
          });
        }
      });
  }

  return (
    <UserContext.Provider
      value={{ handleLogin, handleRegister, user, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
