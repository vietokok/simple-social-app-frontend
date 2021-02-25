import { FormControl, FormHelperText, TextField } from '@material-ui/core';
import { ErrorMessage } from 'formik';
import React from 'react';

InputField.propTypes = {};

function InputField(props) {
	const { field, form, type, label, required, fullWidth, autoFocus } = props;

	const { name } = field;
	const { errors, touched } = form;
	const showError = errors[name] && touched[name];
	// inputProps={{ maxLength: 100 }}

	return (
		<FormControl fullWidth error={showError}>
			<TextField
				id={name}
				{...field}
				label={label}
				type={type}
				variant='outlined'
				margin='normal'
				required={required}
				fullWidth={fullWidth}
				autoFocus={autoFocus}
				error={showError}
			/>
			<ErrorMessage name={name} component={FormHelperText} />
		</FormControl>
	);
}

export default InputField;
