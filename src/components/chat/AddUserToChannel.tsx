import React from 'react';
import { theme } from '../../theme/theme';
import { Container, Grid } from '@material-ui/core/';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    flexGrow: 1,
    height: '100vh',
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },
  container: {
    margin: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    overflowX: 'hidden',
    overflowY: 'hidden',
  },
  sidebar: {
    height: '100vh',
    maxHeight: '200vh',
    display: 'flex',
    alignItems: 'flex-start',
    paddingTop: theme.spacing(5),
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderRightColor: theme.palette.primary.dark,
  },
}));

const AddUserToChannelContainer: React.FC = () => {
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <>
      <main className={classes.root}>
        <Container maxWidth="lg" disableGutters className={classes.container}>
          {matches === true && (
            <Grid item xs={5} className={classes.sidebar}>
              SIDEBAR
            </Grid>
          )}
          <Grid item xs={12}>
            <h1>ADD USER TO CHANNEL</h1>
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default AddUserToChannelContainer;
