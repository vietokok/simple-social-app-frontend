import React from 'react';
import PropTypes from 'prop-types';
import {
	Avatar,
	Box,
	CircularProgress,
	Grid,
	makeStyles,
	Paper,
} from '@material-ui/core';
import MoreActionMenu from '../MoreActionMenu';

PostList.propTypes = {};

const getLocalStorage = () => {
	return JSON.parse(localStorage.getItem('userData'));
};

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
}));

function PostList(props) {
	const classes = useStyles();

	const local = getLocalStorage();

	const userId = local.userId;
	const { postData, postLoading, handleEditPost, handleDeletePost } = props;

	return !postLoading && postData.length > 0 ? (
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
					</Grid>
				</Paper>
			</Grid>
		))
	) : (
		<Grid container justify='center' item xs={12} md={12} lg={12}>
			<CircularProgress />
		</Grid>
	);
}

export default PostList;
