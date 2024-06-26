import { useState } from 'react';

import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import { 
  signInWithGooglePopup, 
  signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(
        email, 
        password
      );
      
      resetFormFields();
    } catch(error) {
      if(error.code === 'auth/invalid-credential') {
        alert('incorrect password or email');
      } else {
        console.log(error);
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
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with you emaul and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label='Email' 
          inputOptions={{
            type: "email",
            name: "email",
            value: email,
            required: true,
            onChange: handleChange,
          }}
        />
        <FormInput label='Password' 
          inputOptions={{
            type: "password",
            name: "password",
            value: password,
            required: true,
            onChange: handleChange,
          }}
        />
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button 
            type='button' 
            buttonType='google' 
            onClick={signInWithGoogle} 
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm;
