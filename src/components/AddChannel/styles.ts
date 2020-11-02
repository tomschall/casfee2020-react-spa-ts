import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {},
  nested: {
    paddingLeft: theme.spacing(0),
  },
  form: {
    flexGrow: 1,
    margin: theme.spacing(2),
    marginTop: theme.spacing(0),
  },
  checkbox: {
    color: theme.palette.primary.dark,
  },
  submit: {
    marginTop: theme.spacing(2),
  },
}));
