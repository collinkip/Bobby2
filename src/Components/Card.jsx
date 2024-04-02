import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

const Card = ({ user }) => {
  const [isStolen, setIsStolen] = useState(false);

  const handleStolen = () => {
    setIsStolen(!isStolen);
  };

  return (
    <article className={`card ${isStolen ? 'stolen' : ''}`} key={user.id}>
      <div>
        <h2>Brand: {user.Brand}</h2>
        <p>Sim 1 Imei: {user.imei1}</p>
        <p>Sim 2 Imei: {user.imei2}</p>
        <p>Serial Number: 1234567890</p>
        <p>Processor: {user.Processor}</p>
        <p>Phones Model Number: {user.PhoneModel}</p>
        <div>
          <button type="button" onClick={handleStolen} style={{ marginRight: '10px' }}>Stolen</button>
          <button
            type="button"
            className="delete"
            style={{
              background: "red",
              boxShadow: "rgba(205, 70, 63, 0.5) 0 1px 30px",
            }}
          >
            <FaTrash /> Delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default Card;
