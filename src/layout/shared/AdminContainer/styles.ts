import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    flexGrow: 1,
    height: '100vh',
    marginTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },
  container: {
    marginLeft: theme.spacing(5),
    marginTop: theme.spacing(5),
  },
  sidebar: {
    height: '100vh',
    maxHeight: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: theme.spacing(0),
    paddingTop: theme.spacing(5),
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderRightColor: theme.palette.primary.dark,
  },
}));
