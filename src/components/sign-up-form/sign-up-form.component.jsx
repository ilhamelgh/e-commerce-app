import { useState, useContext } from "react";

import { 
  createAuthUserWithEmailAndPassword, 
  createUserDocumentFromAuth 
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-up-form.styles.scss'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(password !== confirmPassword) {
      alert('passwords do not match');
      return;
    };

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, {displayName});
      
      resetFormFields();
    } catch(error) {
      if(error.code === 'auth/email-already-in-use') {
        alert('Connot create user, email already in use');
      } else {
        console.log('User creation encountered an error', error);
      }
    }
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({...formFields, [name]: value})
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput 
          label='Display Name'
          inputOptions={{
            type: "text",
            name: "displayName",
            value: displayName,
            required: true,
            onChange: handleChange,
          }}   
        />
        <FormInput 
          label='Email' 
          inputOptions={{
            type: "email",
            name: "email",
            value: email,
            required: true,
            onChange: handleChange,
          }} 
        />
        <FormInput 
          label='Password' 
          inputOptions={{
            type: "password",
            name: "password",
            minLength: 6,
            value: password,
            required: true,
            onChange: handleChange,
          }}   
        />
        <FormInput 
          label='Confirm Password' 
          inputOptions={{
            type: "password",
            name: "confirmPassword",
            minLength: 6,
            value: confirmPassword,
            required: true,
            onChange: handleChange,
          }}      
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}

export default SignUpForm;
