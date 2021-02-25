import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Link, makeStyles, Paper } from '@material-ui/core';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import GitHubIcon from '@material-ui/icons/GitHub';

UserInfo.propTypes = {};

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
}));

function UserInfo(props) {
	const { me } = props;
	const classes = useStyles();

	return (
		<Grid item xs={12} md={12} lg={12}>
			<Paper className={classes.paper}>
				<Grid container spacing={2}>
					<Grid item xs={12} md={12} lg={12}>
						<Box style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
							Introduction
						</Box>
					</Grid>
					<Grid item xs={1} md={1} lg={1}>
						<PermIdentityIcon />
					</Grid>
					<Grid item xs={11} md={11} lg={11}>
						<Box>{me.displayName}</Box>
					</Grid>
					<Grid item xs={1} md={1} lg={1}>
						<MailOutlineIcon />
					</Grid>
					<Grid item xs={11} md={11} lg={11}>
						<Box>
							<Link href='#'>{me.email}</Link>
						</Box>
					</Grid>
					<Grid item xs={1} md={1} lg={1}>
						<GitHubIcon />
					</Grid>
					<Grid item xs={11} md={11} lg={11}>
						<Link href='#'>vietokok</Link>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
}

export default UserInfo;
