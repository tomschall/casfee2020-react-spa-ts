import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    height: '75vh',
    overflowY: 'scroll',
    padding: theme.spacing(2),
    paddingTop: theme.spacing(5),
  },
  [theme.breakpoints.down('md')]: {
    text: {
      fontSize: 13,
    },
  },
}));
