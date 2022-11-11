import React from "react";

export default function Profile(props) {
  const red = () => {
    alert("Red Function Called");
  };
  return (
    <div>
      <h1 onClick={red}> {props.text}</h1>
    </div>
  );
}
