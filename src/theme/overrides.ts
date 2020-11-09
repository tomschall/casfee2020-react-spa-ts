export default {
  MuiCssBaseline: {
    '@global': {
      '*': {
        'scrollbar-width': '1.5rem',
      },
      '*::-webkit-scrollbar': {
        width: '1rem',
        height: '1rem',
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.5)',
        borderRadius: 20,
      },
      a: {
        textDecoration: 'none',
      },
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
      margin: 0,
    },
  },
  MuiTypography: {},
  MuiButton: {
    contained: {
      boxShadow: 'none',
    },
  },
};
