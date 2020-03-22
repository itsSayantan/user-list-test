import React from "react";
import ReactDOM from "react-dom";

import "./Modal.css";

const Modal = props => {
  const container = document.createElement("div");
  const modalRoot = document.getElementById("modal-root");

  container.setAttribute("class", "modal-wrapper");

  React.useEffect(() => {
    modalRoot.append(container);

    return () => {
      modalRoot.removeChild(container);
    };
  }, [container, modalRoot]);

  return ReactDOM.createPortal(props.children, container);
};

export default Modal;
