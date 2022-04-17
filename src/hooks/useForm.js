import { useState } from "react";

export default function useForm(callback, initialState = {}, validate) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    let value = e.target.value;
    const name = e.target.name;
    if (name !== "password") value = value.toLowerCase();
    setValues({ ...values, [name]: value });
  };

  function onSubmit() {
    let errors;
    let isEmpty = true;
    if (validate) errors = validate(values);
    if (errors)
      isEmpty = !Object.values(errors).some(
        (error) => error !== null && error !== "",
      );

    if (isEmpty) {
      callback();
      setErrors({});
    } else {
      setErrors(validate(values));
    }
  }

  return {
    onChange,
    onSubmit,
    errors,
    values,
    setValues,
  };
}
