import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { getCookie } from 'utils';

const useStyles = makeStyles((theme) => ({
	chatSeft: {
		backgroundColor: theme.palette.primary.main,
	},
}));

function MessageList(props) {
	const { messages } = props;
	const userId = getCookie('c_user');

	const classes = useStyles();

	return (
		<Box style={{ width: '100%' }}>
			{messages.map((message, index) =>
				message.from._id === userId ? (
					<Grid key={index} container style={{ padding: '0.75rem' }}>
						<Grid item xs={4} md={4} lg={4}></Grid>
						<Grid item xs={8} md={8} lg={8}>
							<Paper
								style={{ padding: '0.5rem', wordBreak: 'break-word' }}
								className={classes.chatSeft}
								key={index}
							>
								<Typography variant='body2' style={{ color: 'white' }}>
									{message.content}
								</Typography>
							</Paper>
						</Grid>
					</Grid>
				) : (
					<Grid key={index} container style={{ padding: '0.5rem' }}>
						<Grid item xs={8} md={8} lg={8}>
							<Paper
								style={{ padding: '0.5rem', wordBreak: 'break-word' }}
								key={index}
							>
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
