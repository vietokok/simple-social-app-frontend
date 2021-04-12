import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { getCookie } from 'utils';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	seftPanel: {
		padding: '0.75rem',
	},
	notSeftPanel: {
		padding: '0.5rem',
	},
	chatSeft: {
		backgroundColor: theme.palette.primary.main,
		padding: '0.5rem',
		wordBreak: 'break-word',
	},
	chatNotSeft: {
		padding: '0.5rem',
		wordBreak: 'break-word',
	},
}));

function MessageList(props) {
	const { messages } = props;
	const userId = getCookie('c_user');

	const classes = useStyles();

	return (
		<Box className={classes.root}>
			{messages.map((message, index) =>
				message.from._id === userId ? (
					<Grid key={index} container className={classes.seftPanel}>
						<Grid item xs={4} md={4} lg={4}></Grid>
						<Grid item xs={8} md={8} lg={8}>
							<Paper className={classes.chatSeft} key={index}>
								<Typography variant='body2' style={{ color: 'white' }}>
									{message.content}
								</Typography>
							</Paper>
						</Grid>
					</Grid>
				) : (
					<Grid key={index} container className={classes.notSeftPanel}>
						<Grid item xs={8} md={8} lg={8}>
							<Paper className={classes.chatNotSeft} key={index}>
								<Typography variant='body2' color='inherit'>
									{message.content}
								</Typography>
							</Paper>
						</Grid>
						<Grid item xs={4} md={4} lg={4}></Grid>
					</Grid>
				)
			)}
		</Box>
	);
}

export default MessageList;
