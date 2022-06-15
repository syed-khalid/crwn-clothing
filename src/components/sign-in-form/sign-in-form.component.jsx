import { useState } from "react";
import {
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase";

import FormInput from "../form-input/form-input.component";
import Button from "../buttons/button.component";
import "./sign-in-form.style.scss";

const defaultFormFields = {
	email: "",
	password: "",
};

const SigninForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const signInWithGoogle = async () => {
		await signInWithGooglePopup();
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			// eslint-disable-next-line
			const { user } = await signInAuthUserWithEmailAndPassword(
				email,
				password
			);
			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case "auth/wrong-password":
					alert("Incorrect password for email");
					break;
				case "auth/user-not-found":
					alert("No user associated which this email");
					break;
				default:
					console.log(error);
					break;
			}
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		// Spreading the object formFields and then modifying only one value.
		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className='sign-up-container'>
			<h2>Already have an account?</h2>
			<span>Sign-in with your email and Password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Email'
					type='email'
					required
					name='email'
					onChange={handleChange}
					value={email}
				/>

				<FormInput
					label='Password'
					type='password'
					required
					name='password'
					onChange={handleChange}
					value={password}
				/>

				<div className='buttons-container'>
					<Button type='submit'>Sign-in</Button>
					<Button type='button' buttonType='google' onClick={signInWithGoogle}>
						Google Sign-in
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SigninForm;
