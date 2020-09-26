import { createMuiTheme } from '@material-ui/core/styles';
import typography from './typography';
import overrides from './overrides';

export const theme = createMuiTheme({
  palette: {
    common: {
      black: '#212121',
      white: '#f9cd8b',
    },
    type: 'dark',
    background: {
      paper: '#141c6b',
      default: '#1A237E',
    },
    primary: {
      light: '#81D4FA',
      main: '#0288D1',
      dark: 'rgba(255, 255, 255, 0.1)',
      contrastText: '#EF6C00',
    },
    secondary: {
      light: '#FFA726',
      main: '#F57C00',
      dark: '#EF6C00',
      contrastText: '#ffffff',
    },
    error: {
      light: '#0f5',
      main: '#0f0',
      dark: '#222',
    },
  },
  shape: {
    borderRadius: 0,
  },
  mixins: {
    toolbar: {
      // minHeight: 100,
    },
  },
  spacing: 0,
  props: {
    MuiCheckbox: {
      style: {
        fontSize: 10,
      },
    },
    MuiChip: {
      style: {
        padding: 3,
        marginRight: 8,
      },
    },
    MuiList: {
      style: {
        // padding: 0,
      },
    },
    MuiListItemIcon: {
      style: {
        color: '#5C6BC0',
      },
    },
    MuiPaper: {
      draggable: false,
      elevation: 0,
    },
    MuiAppBar: {
      style: {
        top: 'auto',
        bottom: 0,
        backgroundColor: '#1A237E',
      },
    },
    MuiButton: {
      disableElevation: false,
      color: 'secondary',
      variant: 'outlined',
      size: 'small',
      disableFocusRipple: false,
      disableTouchRipple: false,
    },
  },
  // typography,
  // overrides,
});
