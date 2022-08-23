import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PlusSignIcon from "../PlusSignIcon";
import { HomeMainStyled } from "./styles";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { TechContext } from "../../contexts/TechContexts";

interface ITechs {
  techs: Array<ITech>;
  setTechs: Function;
}

interface ITech {
  id?: string;
  title?: string;
  status?: string;
}

const HomeMain = ({ techs, setTechs }: ITechs) => {
  const userId = window.localStorage.getItem("userId");
  const { setAtual } = useContext(TechContext);

  useEffect(() => {
    axios
      .get(`https://kenziehub.herokuapp.com/users/${userId}`)
      .then((res) => {
        setTechs(res.data.techs);
      })
      .catch((err) => {
        if (err) {
          toast.error(err.res.data.message, {
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
  }, [userId, setTechs]);

  function openModal() {
    navigate("tech");
  }

  function openModalEdit() {
    navigate("techEdit");
  }

  let navigate = useNavigate();

  const [token] = useState(window.localStorage.getItem("userToken"));

  useEffect(() => {
    token === null && navigate("/login");
  }, [token, navigate]);

  return (
    <HomeMainStyled>
      <ToastContainer />
      <Outlet />
      <div className="main">
        <div className="header--main">
          <h3>Tecnologias</h3>
          <button onClick={openModal}>
            <PlusSignIcon />
          </button>
        </div>
        <div className="main--list">
          <ul>
            {techs?.map((tech) => (
              <li
                key={tech.id}
                onClick={() => {
                  setAtual(tech.id);
                  openModalEdit();
                }}
              >
                <h3>{tech.title}</h3>
                <p>{tech.status}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </HomeMainStyled>
  );
};

export default HomeMain;
