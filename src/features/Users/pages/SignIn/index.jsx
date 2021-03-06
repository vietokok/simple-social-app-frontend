import { Box } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FacebookIcon from 'assets/icons/Facebook';
import GoogleIcon from 'assets/icons/Google';
import axios from 'axios';
import InputField from 'custom-fields/InputField';
import { FastField, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { login } from 'utils';
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

	const openGoogleLogin = () => {
		window.open('http://localhost:4000/auth/google', '_self');
	};

	const openFacebookLogin = () => {
		window.open('http://localhost:4000/auth/facebook', '_self');
	};

	useEffect(() => {
		fetch('http://localhost:4000/auth/login/success', {
			method: 'GET',
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				}
				throw new Error('failed to authenticate user');
			})
			.then((responseJson) => {
				const data = JSON.stringify({
					userId: responseJson.user._id,
					token: responseJson.token,
				});
				login(data);
				history.push('/');
			})
			.catch((error) => {});
	});

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
					const response = await axios.post(
						'http://localhost:4000/auth/login',
						values,
						{
							withCredentials: true,
						}
					);
					if (response.status === 201) {
						location.reload();
					}
				};
				login();
			}}
		>
			{(formikProps) => {
				return (
					<Container component='main' maxWidth='xs'>
						<CssBaseline />
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
