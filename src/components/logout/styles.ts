import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
    marginTop: theme.spacing(3),
  },
}));
