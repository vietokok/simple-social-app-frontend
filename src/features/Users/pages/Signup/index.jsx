import { Snackbar } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import InputField from 'custom-fields/InputField';
import { FastField, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
			<Link color='inherit' href='https://material-ui.com/'>
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignUp() {
	const classes = useStyles();
	let history = useHistory();

	const [snackbar, setSnackbar] = useState(() => {
		return {
			open: false,
			message: '',
		};
	});

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setSnackbar({
			open: false,
			message: '',
		});
	};

	const handleOpenSnackBar = (message) => {
		setSnackbar({
			open: true,
			message,
		});
	};

	const initialValues = {
		displayName: '',
		email: '',
		password: '',
	};

	const validationSchema = Yup.object().shape({
		displayName: Yup.string().required('Required'),
		email: Yup.string().email('Invalid Email').required('Required'),
		password: Yup.string().required('Required'),
	});

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values) => {
				const signup = async () => {
					try {
						const response = await axios.post(
							`${process.env.REACT_APP_API_URL}/auth/register`,
							values
						);
						if (response.status === 201) {
							handleOpenSnackBar(response.data.message);
							setTimeout(() => {
								history.push('/signin');
							}, 2000);
						}
					} catch (err) {
						const error = err.response;
						handleOpenSnackBar(error.data.message);
					}
				};
				signup();
			}}
		>
			{(formikProps) => {
				return (
					<Container component='main' maxWidth='xs'>
						<CssBaseline />
						<Snackbar
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={snackbar.open}
							onClose={handleClose}
							autoHideDuration={3500}
							message={snackbar.message}
						/>
						<div className={classes.paper}>
							<Avatar className={classes.avatar}>
								<LockOutlinedIcon />
							</Avatar>
							<Typography component='h1' variant='h5'>
								Sign up
							</Typography>
							<Form className={classes.form}>
								<FastField
									name='displayName'
									component={InputField}
									label='Display Name'
									autoFocus={true}
									fullWidth={true}
									require={true}
								/>
								<FastField
									name='email'
									component={InputField}
									label='Email'
									autoFocus={false}
									fullWidth={true}
									require={true}
								/>
								<FastField
									name='password'
									component={InputField}
									label='Password'
									type='password'
									autoFocus={false}
									fullWidth={true}
									require={true}
								/>
								<Button
									type='submit'
									fullWidth
									variant='contained'
									color='primary'
									className={classes.submit}
								>
									Sign Up
								</Button>
								<Grid container justify='flex-end'>
									<Grid item>
										<Link to='/signin' variant='body2'>
											{'Already have an account? Sign in'}
										</Link>
									</Grid>
								</Grid>
							</Form>
						</div>
						<Box mt={5}>
							<Copyright />
						</Box>
					</Container>
				);
			}}
		</Formik>
	);
}
