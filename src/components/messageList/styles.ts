import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  [theme.breakpoints.down('md')]: {
    text: {
      fontSize: 10,
    },
  },
  vspace: {
    marginBottom: theme.spacing(1),
  },
}));
