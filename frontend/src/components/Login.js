import Authentication from "./Authentication";

function Login(props) {

  return (
    <Authentication
      name="login"
      onSubmit={props.onLogin}
      title="Вход"
      buttonText="Войти"
    >
    </Authentication>
  );
}

export default Login;