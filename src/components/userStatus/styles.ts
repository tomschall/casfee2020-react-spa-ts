import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // flexDirection: 'row',
  },
  label: {
    padding: '10px 15px',
  },
  badge: {
    backgroundColor: '#0f0',
  },
  itemText: {
    color: theme.palette.primary.light,
    fontWeight: 700,
  },
}));
