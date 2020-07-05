import React from "react";
import { useLoginMutation } from "../../generated/types.d";
import { useForm } from "../../hooks/useForm";
import { useHistory } from "react-router-dom";

export default function Login() {

  const history = useHistory();
  const [formData, setFormData] = useForm({
    email: "",
    password: "",
  });
  const [login, { error }] = useLoginMutation();

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await login({
        variables: {
          email: formData.email,
          password: formData.password,
        }
      });

      if (response.data?.login) {
        history.push("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container">
      <h2>Login</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          A simple danger alert—check it out!
        </div>
      )}
      <form onSubmit={(e) => submitForm(e)}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            aria-describedby="emailHelp"
            value={formData.email}
            onChange={setFormData}
          />
          {/* <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small> */}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={setFormData}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          LOGIN
        </button>
      </form>
    </div>
  );
}
