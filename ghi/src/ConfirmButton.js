import React, { useState } from "react";
import { confirm } from "react-bootstrap-confirmation";

export default function ConfirmButton() {
  const display = async () => {
    const result = await alert("Are you sure you want to remove this dog?");
    console.log("True if confirmed, false otherwise:", result);
  };
  return (
    <button type="button" className="btn btn-danger" onClick={display}>
      Delete
    </button>
  );
}
