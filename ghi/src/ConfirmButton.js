import React, { useContext } from "react";

export default function ConfirmButton(props) {
  const display = async () => {
    const result = await window.confirm(
      "Are you sure you want to remove this dog?"
    );
    if (result) {
      props.delete();
    }
  };
  return (
    <div className="btn btn-danger square-border" onClick={display}>
      Delete
    </div>
  );
}
