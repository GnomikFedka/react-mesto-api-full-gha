import { Link } from "react-router-dom";
import Authentication from "./Authentication";

function Register(props) {

  return (
    <Authentication
    name="register"
    onSubmit={props.onRegister}
    title="Регистрация"
    buttonText="Зарегистрироваться"
    >
    <Link to="/sign-in" className="authentication__entrance">{"Уже зарегистрированы? Войти"}</Link>
    </Authentication>
  );
}

export default Register;