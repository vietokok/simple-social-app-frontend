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
	TextField,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState } from 'react';

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
}));

function CreatePostModal(props) {
	const { userData, handleCreatePost } = props;
	const [value, setValue] = useState('');

	const handleChange = (e) => {
		setValue(e.target.value);
	};

	const classes = useStyles();

	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const createPost = () => {
		if (handleCreatePost) {
			handleCreatePost(value);
			setValue('');
		}
	};

	return (
		<Box>
			<Button
				variant='contained'
				style={{
					borderRadius: '20px',
				}}
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
						<Grid container alignItems='center' spacing={1}>
							<Grid item xs={10} md={10} lg={10} container justify='center'>
								<Box
									style={{
										marginLeft: '57px',
										fontSize: '1.25rem',
										fontWeight: 'bold',
									}}
								>
									Create Post
								</Box>
							</Grid>
							<Grid item xs={2} md={2} lg={2} container justify='flex-end'>
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
							<Grid item xs={11} md={11} lg={11}>
								<Box style={{ marginLeft: '10px' }}>{userData.displayName}</Box>
							</Grid>
							<Grid item xs={12} md={12} lg={12}>
								<TextField
									value={value}
									onChange={handleChange}
									label={"What's on your mind, Việt?"}
									variant='outlined'
									rows={6}
									multiline
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} md={12} lg={12}>
								<Box onClick={handleClose}>
									<Button
										onClick={createPost}
										variant='contained'
										color='primary'
										fullWidth
									>
										Post
									</Button>
								</Box>
							</Grid>
						</Grid>
					</Paper>
				}
			</Modal>
		</Box>
	);
}

export default CreatePostModal;
