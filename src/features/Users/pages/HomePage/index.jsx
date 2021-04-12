import { Avatar } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import MyAppBar from 'components/MyAppBar';
import CreatePostModal from 'features/Posts/components/CreatePostModal';
import PostList from 'features/Posts/components/PostList';
import {
	commentPost,
	createPost,
	deletePost,
	getAllPost,
	likePost,
	updatePost,
} from 'features/Posts/postSlice';
import FriendList from 'features/Users/components/FriendList';
import { getUserById } from 'features/Users/userSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WebSocketProvider from 'utils/socketConfig';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: '100vh',
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	postTitle: {
		fontSize: '1.25rem',
		fontWeight: 'bold',
	},
}));

export default function Homepage() {
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.posts);
	const users = useSelector((state) => state.users);

	const handleCreatePost = (data) => {
		const createData = async () => {
			try {
				await dispatch(createPost(data));
			} catch (error) {}
		};
		createData();
	};

	const handleEditPost = (data) => {
		const updateData = async () => {
			try {
				await dispatch(updatePost(data));
			} catch (error) {}
		};
		updateData();
	};

	const handleDeletePost = (id) => {
		const deleteData = async () => {
			try {
				await dispatch(deletePost(id));
			} catch (error) {}
		};
		deleteData();
	};

	const handleLikePost = (id) => {
		const like = async () => {
			try {
				await dispatch(likePost(id));
			} catch (error) {}
		};
		like();
	};

	const handleCommentPost = (data) => {
		const comment = async () => {
			try {
				await dispatch(commentPost(data));
			} catch (error) {}
		};
		comment();
	};

	useEffect(() => {
		const getMe = async () => {
			try {
				await dispatch(getUserById());
			} catch (error) {}
		};
		getMe();
	}, []);

	useEffect(() => {
		const getPosts = async () => {
			try {
				await dispatch(getAllPost());
			} catch (error) {}
		};
		getPosts();
	}, []);

	const classes = useStyles();

	return (
		<WebSocketProvider>
			<Box className={classes.root}>
				<CssBaseline />
				{/* header */}
				<MyAppBar me={users.me} />
				{/* main */}
				<main className={classes.content}>
					<Box className={classes.appBarSpacer} />
					<Container maxWidth='lg' className={classes.container}>
						<Grid container spacing={2}>
							{/* left panel */}
							<Grid item xs={4} md={4} lg={4}>
								<Grid container direction='column' spacing={2}>
									{/* friend list */}
									<FriendList />
								</Grid>
							</Grid>
							{/* right panel */}
							<Grid item xs={8} md={8} lg={8}>
								<Paper className={classes.paper}>
									<Grid container spacing={3}>
										{/* avatar */}
										<Grid item xs={1} md={1} lg={1}>
											<Avatar>V</Avatar>
										</Grid>
										<Grid item xs={8} md={8} lg={8}>
											{/* create post */}
											<CreatePostModal
												userData={users.me}
												handleCreatePost={handleCreatePost}
											/>
										</Grid>
										<Grid item xs={3} md={3} lg={3}></Grid>
										<Grid item xs={12} md={12} lg={12}>
											<Box className={classes.postTitle}>Posts</Box>
										</Grid>
										{/* post list */}
										<PostList
											postData={posts.postList}
											postLoading={posts.loading}
											handleEditPost={handleEditPost}
											handleDeletePost={handleDeletePost}
											handleLikePost={handleLikePost}
											handleCommentPost={handleCommentPost}
										/>
									</Grid>
								</Paper>
							</Grid>
						</Grid>
					</Container>
				</main>
			</Box>
		</WebSocketProvider>
	);
}
