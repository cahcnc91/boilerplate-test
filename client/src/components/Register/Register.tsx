import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { RegisterInput } from "../../generated/types";
import { useForm } from "../../hooks/useForm";

const CREATE_USER = gql`
  mutation register($data: RegisterInput!) {
    register(data: $data) {
      firstName
      lastName
      email
    }
  }
`;

export default function Register() {
  const [formData, setFormData] = useForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [registerUser, { error, data }] = useMutation(CREATE_USER, {
    variables: {
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      },
    },
  });

  const submitForm = (e: React.FormEvent) => {
      console.log("submitted")
      e.preventDefault()
      registerUser()
  }
  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={(e) => submitForm(e)}>
        <div className="form-group">
          <label htmlFor="firstName">First name</label>
          <input
            className="form-control"
            name="firstName"
            value={formData.firstName}
            onChange={setFormData}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            className="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={setFormData}
          />
        </div>
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
          Submit
        </button>
      </form>
    </div>
  );
}
