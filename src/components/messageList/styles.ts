import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: theme.spacing(2),
  },
  [theme.breakpoints.up('md')]: {
    messageText: {
      paddingBottom: '1rem',
    },
  },
  [theme.breakpoints.down('md')]: {
    messageText: {
      fontSize: 14,
      paddingBottom: '1rem',
    },
  },
  [theme.breakpoints.down('sm')]: {
    messageText: {
      fontSize: 12,
      paddingBottom: '1rem',
    },
  },
  vspace: {
    marginBottom: theme.spacing(1),
  },
}));
