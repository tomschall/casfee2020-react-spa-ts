import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    paddingTop: theme.spacing(5),
  },
}));
