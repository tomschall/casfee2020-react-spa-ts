import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    overflowY: 'scroll',
    height: '75vh',
    marginTop: theme.spacing(5),
  },
  messageContainer: {
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(10),
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(0),
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(3),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(0),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0),
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(0),
    },
  },
}));
