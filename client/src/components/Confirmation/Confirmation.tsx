import React from "react";

const Confirmation: React.FC = () => {
  return (
    <div className="container">
      <div className="jumbotron">
        <h1 className="display-4">Confirm email</h1>
        <p className="lead">
          An email was sent to you, please verify!
        </p>
      </div>
    </div>
  );
};

export default Confirmation;
