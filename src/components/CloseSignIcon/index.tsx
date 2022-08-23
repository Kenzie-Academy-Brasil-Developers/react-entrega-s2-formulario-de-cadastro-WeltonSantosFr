import React from "react";
import { AiOutlineClose } from "react-icons/ai";

interface IOnClick {
  onClick: Function;
}

const CloseSignIcon = ({ onClick }: IOnClick) => {
  return <AiOutlineClose onClick={() => onClick} />;
};

export default CloseSignIcon;
