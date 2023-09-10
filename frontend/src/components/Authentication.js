import useFormAndValidation from "../hooks/useFormAndValidation";
import Form from "./Form";
import Input from "./Input";
export default function Authentication(props) {
  const { values, errors, isValid, handleChange } = useFormAndValidation({
    email: "",
    password: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      props.onSubmit(values.email, values.password);
    }
  }

  return (
    <>
    <Form name={props.name} title={props.title} isValid={isValid} buttonText={props.buttonText}
      onSubmit={handleSubmit}>
        <Input type="email" id="login-input" name="email" value={values.email || ""} onChange={handleChange}
          minLength="2" maxLength="30" errorMessage={errors.email} placeholder="Email"/>
        <Input type="password" id="password" name="password" value={values.password || ""} onChange={handleChange}
          minLength="6" errorMessage={errors.password} placeholder="Пароль"/>
    </Form>
    {props.children}
    </>
  )
}