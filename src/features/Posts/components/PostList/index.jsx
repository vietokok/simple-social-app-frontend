import {
	Avatar,
	Box,
	CircularProgress,
	Grid,
	IconButton,
	makeStyles,
	Paper,
	TextField,
	Typography,
} from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import React, { useContext, useEffect, useState } from 'react';
import { getCookie } from 'utils';
import { WebSocketContext } from 'utils/socketConfig';
import MoreActionMenu from '../MoreActionMenu';

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	image: {
		width: '100%',
		height: 'auto',
	},
	comment: {
		marginTop: '1rem',
	},
	commentPanel: {
		padding: '0.5rem',
		backgroundColor: '#F0F2F5',
		width: 'fit-content',
	},
	displayName: {
		fontWeight: 'bold',
	},
	expandButton: {
		padding: '0',
	},
	postNotFound: {
		textAlign: 'center',
	},
}));

function PostList(props) {
	const socket = useContext(WebSocketContext);
	const {
		postData,
		postLoading,
		handleEditPost,
		handleDeletePost,
		handleLikePost,
		handleCommentPost,
	} = props;

	const [value, setValue] = useState({});

	const handleValue = (e, postId) => {
		setValue((prevState) => ({
			...prevState,
			[postId]: e.target.value,
		}));
	};

	const onHandleLikePost = (post) => {
		if (handleLikePost) {
			handleLikePost(post._id);

			const notiObject = {
				type: 'interactive',
				to: post.createdBy._id,
			};
			socket.emit('notification', notiObject);
		}
	};

	const handleKeyUp = (e, post) => {
		if (e.key === 'Enter' || e.keyCode === 13) {
			if (handleCommentPost) {
				const commentObject = {
					id: post._id,
					data: {
						text: value[post._id],
					},
				};
				handleCommentPost(commentObject);

				setValue((prevState) => ({
					...prevState,
					[post._id]: '',
				}));

				const notiObject = {
					type: 'interactive',
					to: post.createdBy._id,
				};

				socket.emit('notification', notiObject);
				console.log(notiObject);
			}
		}
	};

	const isLike = (post) => {
		if (post.like.findIndex((item) => item === userId) === -1) {
			return false;
		}
		return true;
	};

	const [openComment, setOpenComment] = useState({});

	useEffect(() => {
		if (postData.length > 0) {
			let objectComment = {};
			let objectValue = {};
			for (let i = 0; i < postData.length; i++) {
				objectComment[postData[i]._id] = false;
				objectValue[postData[i]._id] = '';
			}

			setOpenComment(objectComment);
			setValue(objectValue);
		}
	}, [postData.length]);

	const handleOpenComment = (postId) => {
		setOpenComment((prevState) => ({
			...prevState,
			[postId]: !openComment[postId],
		}));
	};

	const userId = getCookie('c_user');

	const classes = useStyles();

	return postLoading ? (
		<Grid container justify='center' item xs={12} md={12} lg={12}>
			<CircularProgress />
		</Grid>
	) : postData.length > 0 ? (
		postData.map((post, index) => (
			<Grid key={index} item xs={12} md={12} lg={12}>
				<Paper className={classes.paper}>
					<Grid container spacing={3}>
						<Grid item xs={1} md={1} lg={1}>
							<Avatar>V</Avatar>
						</Grid>
						<Grid item xs={9} md={9} lg={9}>
							<Grid container direction='column'>
								<Box>{post.createdBy.displayName}</Box>
								<Box>{post.createdTime}</Box>
							</Grid>
						</Grid>
						{post.createdBy._id === userId && (
							<Grid item xs={2} md={2} lg={2} container justify='flex-end'>
								<MoreActionMenu
									handleDeletePost={handleDeletePost}
									handleEditPost={handleEditPost}
									postId={post._id}
									user={post.createdBy.displayName}
									postContent={post.content}
								/>
							</Grid>
						)}
						<Grid item xs={12} md={12} lg={12}>
							<Box>{post.content}</Box>
						</Grid>
						{post.image.path !== '' && (
							<Grid item xs={12} md={12} lg={12}>
								<img
									loading='lazy'
									src={post.image.path}
									alt='eee'
									className={classes.image}
								/>
							</Grid>
						)}
						<Grid item xs={12} md={12} lg={12}>
							<Grid container alignItems='center'>
								<Grid item xs={1} lg={1} md={1}>
									<IconButton onClick={() => onHandleLikePost(post)}>
										{isLike(post) ? (
											<FavoriteIcon color='error' />
										) : (
											<FavoriteBorderIcon />
										)}
									</IconButton>
								</Grid>
								<Grid item xs={1} lg={1} md={1}>
									<Typography variant='subtitle1'>
										{post.like.length}
									</Typography>
								</Grid>
								<Grid item xs={1} lg={1} md={1}>
									<IconButton onClick={() => handleOpenComment(post._id)}>
										<ChatBubbleOutlineIcon />
									</IconButton>
								</Grid>
								<Grid item xs={1} lg={1} md={1}>
									<Typography variant='subtitle1'>
										{post.comment.length}
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						{openComment[post._id] && (
							<Grid item xs={12} md={12} lg={12}>
								<Grid container alignItems='center'>
									<Grid item xs={1} md={1} lg={1}>
										<Avatar>V</Avatar>
									</Grid>
									<Grid item xs={11} md={11} lg={11}>
										<TextField
											label='Write a comment...'
											variant='standard'
											fullWidth
											multiline
											value={value[post._id]}
											onChange={(e) => handleValue(e, post._id)}
											onKeyUp={(e) => handleKeyUp(e, post)}
										/>
									</Grid>
									{post.comment.map((item, index) => (
										<Grid
											key={index}
											item
											xs={12}
											md={12}
											lg={12}
											className={classes.comment}
										>
											<Grid container>
												<Grid item xs={1} md={1} lg={1}>
													<Avatar>V</Avatar>
												</Grid>
												<Grid item xs={11} md={11} lg={11}>
													<Paper elevation={0} className={classes.commentPanel}>
														<Typography
															variant='body2'
															className={classes.displayName}
														>
															{item.user.displayName}
														</Typography>
														<Typography>{item.text}</Typography>
													</Paper>
												</Grid>
											</Grid>
										</Grid>
									))}
									{post.comment.length > 2 && (
										<Grid
											item
											xs={12}
											md={12}
											lg={12}
											container
											justify='center'
										>
											<IconButton
												onClick={() => handleOpenComment(post._id)}
												className={classes.expandButton}
											>
												<ExpandLessIcon fontSize='large' />
											</IconButton>
										</Grid>
									)}
								</Grid>
							</Grid>
						)}
					</Grid>
				</Paper>
			</Grid>
		))
	) : (
		<Grid item xs={12} md={12} lg={12} className={classes.postNotFound}>
			<Typography variant='h6'>No post found</Typography>
		</Grid>
	);
}

export default PostList;
