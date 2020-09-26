import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {},
  large: {
    left: '-20px',
    backgroundSize: 'cover',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));
