import {
	Avatar,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	Grid,
	IconButton,
	ListItemIcon,
	ListItemText,
	makeStyles,
	Menu,
	MenuItem,
	Modal,
	Paper,
	TextField,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
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

function MoreActionMenu(props) {
	const classes = useStyles();
	const { postContent, postId, handleDeletePost, handleEditPost } = props;

	const [inputValue, setInputValue] = useState(() => {
		return postContent;
	});

	const handleChange = (e) => {
		setInputValue(e.target.value);
	};

	const editPost = (e) => {
		if (handleEditPost && postContent && postId) {
			handleEditPost({
				id: postId,
				data: {
					content: inputValue,
				},
			});
			handleCloseEdit(e);
		}
	};

	const deletePost = (e) => {
		if (handleDeletePost && postId) {
			handleDeletePost(postId);
			handleCloseDelete(e);
		}
	};

	const [openEdit, setOpenEdit] = useState(false);

	const handleOpenEdit = () => {
		setOpenEdit(true);
	};

	const handleCloseEdit = (e) => {
		e.stopPropagation();
		setOpenEdit(false);
	};

	const [openDelete, setOpenDelete] = useState(false);

	const handleOpenDelete = () => {
		setOpenDelete(true);
	};

	const handleCloseDelete = (e) => {
		e.stopPropagation();
		setOpenDelete(false);
	};

	const [anchorEl, setAnchorEl] = useState(false);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<IconButton onClick={handleClick}>
				<MoreHorizIcon />
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleCloseMenu}
			>
				<Box onClick={handleOpenEdit}>
					<MenuItem onClick={handleCloseMenu}>
						<ListItemIcon>
							<EditIcon fontSize='small' />
						</ListItemIcon>
						<ListItemText primary='Edit Post' />
						<Modal open={openEdit} onClose={handleCloseEdit}>
							{
								<Paper className={classes.modal}>
									<Grid container alignItems='center' spacing={1}>
										<Grid
											item
											xs={10}
											md={10}
											lg={10}
											container
											justify='center'
										>
											<Box
												style={{
													marginLeft: '57px',
													fontSize: '1.25rem',
													fontWeight: 'bold',
												}}
											>
												Edit Post
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
											<IconButton onClick={handleCloseEdit}>
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
											<Box style={{ marginLeft: '10px' }}>Khắc Việt</Box>
										</Grid>
										<Grid item xs={12} md={12} lg={12}>
											<TextField
												value={inputValue}
												onChange={handleChange}
												label={"What's on your mind, Việt?"}
												variant='outlined'
												rows={6}
												multiline
												fullWidth
											/>
										</Grid>
										<Grid item xs={12} md={12} lg={12}>
											<Button
												onClick={editPost}
												variant='contained'
												color='primary'
												fullWidth
											>
												Edit
											</Button>
										</Grid>
									</Grid>
								</Paper>
							}
						</Modal>
					</MenuItem>
				</Box>
				<Box onClick={handleOpenDelete}>
					<MenuItem onClick={handleCloseMenu}>
						<ListItemIcon>
							<DeleteIcon fontSize='small' />
						</ListItemIcon>
						<ListItemText primary='Delete Post' />
						<Dialog open={openDelete} onClose={handleCloseDelete}>
							<Grid container>
								<Grid item xs={8} md={8} lg={8}>
									<DialogTitle>{'Delete Post?'}</DialogTitle>
								</Grid>
								<Grid item container justify='flex-end' xs={4} md={4} lg={4}>
									<IconButton onClick={handleCloseDelete}>
										<CloseIcon />
									</IconButton>
								</Grid>
							</Grid>
							<Divider />
							<DialogContent>
								<DialogContentText>
									Are you sure you want to delete this post?
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleCloseDelete} color='primary'>
									Cancel
								</Button>
								<Button onClick={deletePost} color='primary' autoFocus>
									Delete
								</Button>
							</DialogActions>
						</Dialog>
					</MenuItem>
				</Box>
			</Menu>
		</>
	);
}

export default MoreActionMenu;
