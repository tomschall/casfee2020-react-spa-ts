import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {},
  nested: {
    paddingLeft: theme.spacing(0),
  },
  form: {
    flexGrow: 1,
    margin: theme.spacing(2),
  },
  submit: {
    marginTop: theme.spacing(2),
    // flex: 1,
  },
  badge: {
    backgroundColor: '#0f0',
  },
  itemText: {
    color: theme.palette.primary.light,
    fontWeight: 700,
  },
  link: {
    color: '#f9cd8b',
  },
}));
