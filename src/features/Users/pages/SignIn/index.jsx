import { Box, Snackbar } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FacebookIcon from 'assets/icons/Facebook';
import GoogleIcon from 'assets/icons/Google';
import axios from 'axios';
import InputField from 'custom-fields/InputField';
import { FastField, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

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
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignIn() {
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

	const openGoogleLogin = () => {
		window.open('http://localhost:4000/auth/google', '_self');
	};

	const openFacebookLogin = () => {
		window.open('http://localhost:4000/auth/facebook', '_self');
	};

	const initialValues = {
		email: '',
		password: '',
	};

	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Invalid Email').required('Required'),
		password: Yup.string().required('Required'),
	});

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values) => {
				const login = async () => {
					try {
						const response = await axios.post(
							'http://localhost:4000/auth/login',
							values,
							{
								withCredentials: true,
							}
						);
						if (response.status === 200) {
							history.push('/');
						}
					} catch (error) {
						handleOpenSnackBar(error.response.data.message);
					}
				};
				login();
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
						<Box className={classes.paper}>
							<Avatar className={classes.avatar}>
								<LockOutlinedIcon />
							</Avatar>
							<Typography component='h1' variant='h5'>
								Sign in
							</Typography>
							<Form className={classes.form}>
								<FastField
									name='email'
									component={InputField}
									label='Email Address'
									autoFocus={true}
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
									Sign In
								</Button>
								<Grid container>
									<Grid item xs>
										<Link to='/signup' variant='body2'>
											Forgot password?
										</Link>
									</Grid>
									<Grid item>
										<Link to='/signup' variant='body2'>
											{"Don't have an account? Sign Up"}
										</Link>
									</Grid>
								</Grid>
							</Form>
						</Box>
						<Grid style={{ marginTop: '1rem' }} container>
							<Grid item container justify='center'>
								<Typography variant='h6'>OR</Typography>
							</Grid>
							<Grid style={{ marginTop: '0.5rem' }} item container spacing={3}>
								<Grid item xs={6} md={6} lg={6}>
									<Button
										onClick={openFacebookLogin}
										color='primary'
										fullWidth
										startIcon={<FacebookIcon />}
										size='large'
										variant='contained'
									>
										Facebook
									</Button>
								</Grid>
								<Grid item xs={6} md={6} lg={6}>
									<Button
										onClick={openGoogleLogin}
										fullWidth
										startIcon={<GoogleIcon />}
										variant='contained'
										size='large'
									>
										Google
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</Container>
				);
			}}
		</Formik>
	);
}
