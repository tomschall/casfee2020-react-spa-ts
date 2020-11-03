import React from 'react';
import { theme } from '../../../theme/theme';
import { Container, Grid } from '@material-ui/core/';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from './styles';

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
