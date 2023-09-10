function Form(props) {
    return (
      <form className="authentication" name={props.name}
       onSubmit={props.onSubmit} noValidate>
        <h3 className="authentication__title">{props.title}</h3>
        {props.children}
        <button type="submit" className={`authentication__submit-button
        ${!props.isValid && `authentication__submit-button_disabled`}`} disabled={!props.isValid}>
            {props.buttonText}
        </button>
      </form>
    );
  }
  
  export default Form;