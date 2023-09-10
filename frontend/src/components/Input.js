function Input(props) {
    return (
      <>
      <input type={props.type} id={props.id} className="authentication__input" name={props.name} placeholder={props.placeholder}
        required minLength={props.minLength} maxLength={props.maxLength} value={props.value} onChange={props.onChange} />
      <span className="authentication__input  authentication__input_type_error  fotoName-input-error">{props.errorMessage}</span>
      </>
    );
  }
  
  export default Input;