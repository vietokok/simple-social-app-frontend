import {
	Avatar,
	Box,
	CircularProgress,
	Grid,
	IconButton,
	makeStyles,
	Paper,
	Typography,
} from '@material-ui/core';
import React from 'react';
import { getCookie } from 'utils';
import MoreActionMenu from '../MoreActionMenu';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
}));

function PostList(props) {
	const { postData, postLoading, handleEditPost, handleDeletePost } = props;
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
									src={post.image.path}
									alt='eee'
									style={{ width: '100%', height: 'auto' }}
								/>
							</Grid>
						)}
						<Grid item xs={12} md={12} lg={12}>
							<Grid container alignItems='center'>
								<Grid item xs={1} lg={1} md={1}>
									<IconButton>
										<FavoriteIcon color='error' />
									</IconButton>
								</Grid>
								<Grid item xs={1} lg={1} md={1}>
									<Typography variant='subtitle1'>1.2k</Typography>
								</Grid>
								<Grid item xs={1} lg={1} md={1}>
									<IconButton>
										<ChatBubbleOutlineIcon />
									</IconButton>
								</Grid>
								<Grid item xs={1} lg={1} md={1}>
									<Typography variant='subtitle1'>5</Typography>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		))
	) : (
		<Grid item xs={12} md={12} lg={12} style={{ textAlign: 'center' }}>
			<Typography variant='h6'>No post found</Typography>
		</Grid>
	);
}

export default PostList;
