import React from "react";

export default function Modal(props) {
  console.log(props);
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button onClick={() => props.closeModal(false)}>X</button>
        <div className="title">
          <h1>Are you sure you want to continue?</h1>
        </div>
        <div className="body">
          <p>
            The next page is awesome! You should move foward, you will enjoy it.
          </p>
        </div>
        <div className="footer">
          <button onClick={() => props.closeModal(false)}>Cancel</button>
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
}
