import { useState } from 'react'

const errorMessages = {
  PASSWORD: "Password must be at least 8 characters",
  PASSWORD_CONFIRM: "Password and Password Confirmation must match",
  EMAIL: "Email must have exactly 1 @ symbol",
  MISSING_FIELD: "All fields must be filled in"
};

export default function FormValidator () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [submitSuccessful, setSubmitSuccessful] = useState(false);
  const [errors, setErrors] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const validatePassword = () => {
    return password.length >= 8;
  };

  const validatePasswordConfirm = () => {
    return password === passwordConfirm;
  };

  const validateEmail = () => {
    return [...email].filter(char => char === '@').length === 1;
  };

  const validateAndSetError = (func, field) => {
    if (!func()) {
      errors.push(errorMessages[field]);
      return false;
    }
    return true;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitSuccessful(true);
    } else {
      setErrorMessage(errors.join(", "));
      setSubmitSuccessful(false);
    }
  }

  const validateForm = () => {
    setErrors([]); setErrorMessage('');
    if (!email?.trim() || !password?.trim() || !passwordConfirm.trim()) { // check not null or undefined, and no whitespace
      errors.push(errorMessages["MISSING_FIELD"]);
      return false;
    }
    validateAndSetError(validateEmail, "EMAIL", email);
    validateAndSetError(validatePassword, "PASSWORD", password);
    validateAndSetError(validatePasswordConfirm, "PASSWORD_CONFIRM", passwordConfirm);
    return errors.length < 1;
  }

  return (
    <form onSubmit={onSubmit}>
      <h2>Sign Up!</h2>
      <label htmlFor='email'>Email</label>
      <input
        type='text' name='email'
        onChange={e => {setEmail(e.target.value)}}
      />
      <label htmlFor='password'>Password</label>
      <input
        type='password' name='password'
        onChange={e => setPassword(e.target.value)}
      />
      <label htmlFor='password-confirm'>Confirm Password </label>
      <input
        type='password' name='password-confirm'
        onChange={e => setPasswordConfirm(e.target.value)}
      />
      { submitSuccessful && <h3>User created</h3> }
      { errorMessage && <h3>{errorMessage}</h3> }
      <input type='submit' value='Submit' />
    </form>
  )
}
