import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { RegisterInput } from "../../generated/types";
import { useForm } from "../../hooks/useForm";

const LOGIN_USER = gql`
  mutation register($email: string, $password: string) {
    register(email: $email, password: $password) {
      firstName
      lastName
      email
    }
  }
`;

export default function Login() {
  const [formData, setFormData] = useForm({
    email: "",
    password: "",
  });
  const [loginUser, { error, data }] = useMutation(LOGIN_USER, {
    variables: {
        email: formData.email,
        password: formData.password
    },
  });

  const submitForm = (e: React.FormEvent) => {
      console.log("submitted")
      e.preventDefault()
      loginUser()
  }
  return (
    <div className="container">
      <h2>Login</h2>
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
