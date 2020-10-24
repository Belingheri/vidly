import React from "react";

function Like(props) {
  const { liked, onClick } = props;

  const getClass = () => {
    let className = "fa fa-heart";
    className += liked ? "" : "-o";
    return className;
  };

  return <i className={getClass()} onClick={onClick}></i>;
}

export default Like;
