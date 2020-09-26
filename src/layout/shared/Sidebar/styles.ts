import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(5),
      marginLeft: theme.spacing(5),
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(5),
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2),
      margin: theme.spacing(0),
      paddingTop: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0),
      margin: theme.spacing(0),
      paddingTop: theme.spacing(2),
    },
  },
  treeView: {
    overflowY: 'scroll',
    maxHeight: '300vh',
    marginRight: theme.spacing(0),
    marginLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
  },
  label: {
    padding: '10px 15px',
  },
  branding: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
