import {
	Avatar,
	Box,
	Button,
	Divider,
	Grid,
	IconButton,
	makeStyles,
	Modal,
	Paper,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ImageIcon from '@material-ui/icons/Image';
import InputField from 'custom-fields/InputField';
import { FastField, Form, Formik } from 'formik';
import React, { useContext, useRef, useState } from 'react';
import { WebSocketContext } from 'utils/socketConfig';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
	modal: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%,-50%)',
		padding: theme.spacing(1.5),
		width: 500,
		outline: 0,
	},
	createButton: {
		borderRadius: '20px',
	},
	createPostTitle: {
		marginLeft: '57px',
		fontSize: '1.25rem',
		fontWeight: 'bold',
	},
	userName: {
		marginLeft: '10px',
	},
	browserImageButton: {
		cursor: 'pointer',
	},
	image: {
		width: '100%',
		height: 'auto',
	},
	closeImageButton: {
		position: 'absolute',
		top: '10px',
		right: '10px',
		backgroundColor: '#fff',
	},
	postPanel: {
		marginTop: '1rem',
	},
}));

function CreatePostModal(props) {
	const { userData, handleCreatePost } = props;
	const socket = useContext(WebSocketContext);
	const classes = useStyles();

	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const [image, setImage] = useState('');

	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();

		reader.onload = (c) => {
			setImage(c.target.result);
		};

		reader.readAsDataURL(file);
	};

	const handleRemoveImageUpload = () => {
		imageREF.current.value = '';
		setImage('');
	};

	const imageREF = useRef(null);

	const initialValues = {
		content: '',
		image: null,
	};

	const validationShema = Yup.object().shape({
		content: Yup.string().required('Required'),
	});

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationShema}
			onSubmit={(values, { resetForm }) => {
				let formData = new FormData();
				if (values.image !== null) {
					formData.append('image', values.image);
				}
				formData.append('content', values.content);

				if (handleCreatePost) {
					handleCreatePost(formData);
					resetForm({
						content: '',
						image: null,
					});
					handleRemoveImageUpload();
				}

				const notiObject = {
					type: 'create',
				};
				socket.emit('notification', notiObject);
				handleClose();
			}}
		>
			{(formikProps) => {
				return (
					<Box>
						<Button
							variant='contained'
							className={classes.createButton}
							size='large'
							fullWidth
							disableFocusRipple
							disableTouchRipple
							disableElevation
							onClick={handleOpen}
						>
							What is on your mind, {userData.displayName}?
						</Button>
						<Modal open={open} onClose={handleClose}>
							{
								<Paper className={classes.modal}>
									<Form encType='multipart/form-data'>
										<Grid container alignItems='center' spacing={1}>
											<Grid
												item
												xs={10}
												md={10}
												lg={10}
												container
												justify='center'
											>
												<Box className={classes.createPostTitle}>
													Create Post
												</Box>
											</Grid>
											<Grid
												item
												xs={2}
												md={2}
												lg={2}
												container
												justify='flex-end'
											>
												<IconButton onClick={handleClose}>
													<CloseIcon />
												</IconButton>
											</Grid>
											<Grid item xs={12} md={12} lg={12}>
												<Divider />
											</Grid>

											<Grid item xs={1} md={1} lg={1}>
												<Avatar>V</Avatar>
											</Grid>
											<Grid item xs={9} md={9} lg={9}>
												<Box className={classes.userName}>
													{userData.displayName}
												</Box>
											</Grid>
											<Grid
												item
												xs={2}
												md={2}
												lg={2}
												container
												justify='flex-end'
											>
												<label
													className={classes.browserImageButton}
													htmlFor='image'
												>
													<ImageIcon color='primary' fontSize='large' />
												</label>
												<input
													ref={imageREF}
													id='image'
													style={{ display: 'none' }}
													type='file'
													onChange={(e) => {
														handleImageUpload(e);
														formikProps.setFieldValue(
															'image',
															e.currentTarget.files[0]
														);
													}}
												/>
											</Grid>
											<Grid item xs={12} md={12} lg={12}>
												<FastField
													name='content'
													component={InputField}
													label={"What's on your mind, Việt?"}
													autoFocus={true}
													fullWidth={true}
													required={true}
												/>
											</Grid>
											{image !== '' && (
												<Grid
													item
													xs={12}
													md={12}
													lg={12}
													style={{
														position: 'relative',
													}}
												>
													<img
														className={classes.image}
														src={image}
														alt='aaa'
													/>
													<IconButton
														onClick={() => {
															formikProps.setFieldValue('image', null);
															imageREF.current.value = '';
															setImage('');
														}}
														size='small'
														className={classes.closeImageButton}
													>
														<CloseIcon />
													</IconButton>
												</Grid>
											)}
											<Grid
												item
												xs={12}
												md={12}
												lg={12}
												className={classes.postPanel}
											>
												<Box>
													<Button
														type='submit'
														variant='contained'
														color='primary'
														fullWidth
													>
														Post
													</Button>
												</Box>
											</Grid>
										</Grid>
									</Form>
								</Paper>
							}
						</Modal>
					</Box>
				);
			}}
		</Formik>
	);
}

export default CreatePostModal;
