import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    height: '70vh',
    overflowY: 'scroll',
    padding: theme.spacing(2),
  },
  [theme.breakpoints.down('md')]: {
    text: {
      fontSize: 13,
    },
  },
}));
