import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  treeView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    padding: '10px 15px',
  },
  badge: {
    backgroundColor: '#0f0',
  },
}));