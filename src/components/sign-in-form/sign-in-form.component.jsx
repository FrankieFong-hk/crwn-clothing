import { useState } from 'react';

import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

import FromInput from '../../components/form-input/form-input.component';

import Button, { BUTTON_TYPES_CLASSES } from '../button/button.componet';

import { UserContext } from '../../contexts/user.context'

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    // console.log(formFields)

    const resetFromFields = () => {
        setFormFields(defaultFormFields);
    }


    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
        // setCurrentUser(user);

    }


    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password)
            // setCurrentUser(user);
            resetFromFields();
        } catch (error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email')
                    break
                case 'auth/user-not-found':
                    alert('no user associated with this email')
                    break
                default:
                    console.log(error);
            }   
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }
    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with you email and password</span>
            <form onSubmit={handleSubmit}>
                <FromInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

                <FromInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />

                <div className='buttons-container'>
                    <Button type="submit">Sign In</Button>
                    <Button buttonType={BUTTON_TYPES_CLASSES.google} type="button" onClick={signInWithGoogle}>Google Sign In</Button>
                </div>

            </form>
        </div>
    )
}

export default SignInForm;