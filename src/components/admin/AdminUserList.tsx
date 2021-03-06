import React from 'react';
import {
  Avatar,
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useGetUserListQuery } from '../../api/generated/graphql';
import { makeStyles } from '@material-ui/core/styles';
import { logToConsole } from '../../helpers/helpers';

const useStyles = makeStyles((theme) => ({
  root: { overflowY: 'scroll', height: '100vh' },
}));

const AdminUserList: React.FC = () => {
  const classes = useStyles();
  const { data, loading, error } = useGetUserListQuery({
    variables: {},
  });

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    logToConsole('Users could not be loaded.', error);
    return <Alert severity="error">Users could not be loaded.</Alert>;
  }

  return (
    <Box className={classes.root}>
      <h2>Userlist</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, quos
        sunt magni natus suscipit nesciunt. Nostrum voluptatum suscipit
        assumenda officia in! Incidunt similique a adipisci facere neque, cum
        nesciunt reprehenderit.
      </p>
      {data && (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>Username</TableCell>
                <TableCell align="right">UserId</TableCell>
                <TableCell align="left">Auth0</TableCell>
                <TableCell align="left">Last seen</TableCell>
              </TableRow>
            </TableHead>
            {data.users.map((user) => (
              <TableBody>
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar
                      alt={user.username}
                      src="https://api.adorable.io/avatars/173/abott@adorable.png"
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography variant="body2">{user.username}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="caption">{user.id}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body2">
                      {user.auth0_user_id}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    {user.last_seen ? user.last_seen : 'Has not logged in yet.'}
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AdminUserList;
