import { theme } from './theme';
export default {
  MuiCssBaseline: {
    '@global': {
      '*': {
        'scrollbar-width': '1rem',
      },
      '*::-webkit-scrollbar': {
        width: '.5rem',
        height: '1rem',
      },
      '*::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgb(245 124 0)',
        borderRadius: 0,
      },
      a: {
        textDecoration: 'none',
      },
    },
  },
  MuiToolbar: {
    root: {
      overflow: 'hidden',
    },
  },
  MuiPopover: {
    root: {
      background: 'rgba(245, 122, 0, .7)',
    },
  },
  MuiBackdrop: {
    root: {
      backgroundColor: 'rgba(0, 0, 0, .95)',
    },
  },
  MuiFab: {
    root: {
      borderRadius: 0,
    },
    primary: {
      color: '#fff',
      // backgroundColor: 'rgba(255, 255, 255, .1)',
      boxShadow: 'none',
    },
    label: {},
  },
  MuiSpeedDial: {
    direction: 'left',
    directionUp: { marginBottom: 0 },
    actions: {
      display: 'unset',
      backgroundColor: 'transparent',
    },
  },
  MuiSpeedDialAction: {
    fab: {
      backgroundColor: 'transparent',
      '&:hover': {
        borderRadius: 3,
        padding: 10,
      },
    },
    staticTooltip: {
      // opacity: 1,
    },
    tooltipOpen: true,
    tooltipPlacement: 'top-end',
    tooltipPlacementLeft: {},
    staticTooltipLabel: {
      right: '100%',
      whiteSpace: 'nowrap',
    },
  },
  MuiTableCell: {
    root: {
      borderBottom: 'none',
    },
  },
  MuiInputBase: {
    root: {},
  },
  MuiList: {
    root: {
      '&:hover': {
        // backgroundColor: 'red',
      },
    },
  },
  MuiListItemIcon: {
    root: {
      '& :hover': {
        color: '#F57C00',
      },
    },
  },
  MuiContainer: {
    root: {
      padding: 0,
      margin: 0,
    },
  },
  MuiListItemText: {
    root: {
      padding: 0,
      margin: 0,
      '& span': {
        padding: 0,
        fontSize: '.875rem',
      },
      '& h6': {
        fontSize: '.857rem',
      },
      '& a': {
        color: '#fff',
      },
      '& a:hover': {
        color: 'yellow',
      },
    },
  },
  MuiDivider: {
    root: {
      margin: 10,
      opacity: 0.5,
    },
  },
  MuiTypography: {},
  MuiButton: {
    contained: {
      boxShadow: 'none',
    },
  },
  MuiIconButton: {
    root: {
      padding: '3px',
    },
  },
};
