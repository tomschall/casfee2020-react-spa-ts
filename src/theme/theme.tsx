import { createMuiTheme } from '@material-ui/core/styles';
import typography from './typography';
import overrides from './overrides';

export const theme = createMuiTheme({
  palette: {
    common: {
      black: '#000000',
      white: '#f9cd8b',
    },
    type: 'dark',
    background: {
      paper: '#0f1448',
      default: '#0c103b',
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
      light: '#E91E63',
      main: '#AD1457',
      dark: '#880E4F',
    },
    success: {
      light: '#0f5',
      main: '#0f0',
      dark: '#222',
    },
  },

  shape: {
    borderRadius: 2,
  },
  mixins: {
    toolbar: {
      // backgroundColor: '#151c66',
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
      },
    },
    MuiList: {
      style: {
        padding: 0,
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
      style: {
        overflow: 'hidden',
      },
    },
    MuiAppBar: {
      style: {
        top: 'auto',
        bottom: 0,
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
  typography,
  overrides,
});
