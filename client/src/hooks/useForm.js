import { useState } from "react";

export const useForm = initialstate => {
  const [inputs, setInputs] = useState(initialstate);

  return [inputs, (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }];
};
