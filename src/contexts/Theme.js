import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#35BAF6',
    },
  },

  overrides: {
    MuiTypography: {
      root: {
        marginBottom: 20,
      },
    },

    MuiButton: {
      root: {
        borderRadius: 50,
        minWidth: 160,
        height: 40,
        margin: 10,
        fontWeight: 'bold',
      },
    },

    MuiTextField: {
      root: {
        padding: 7,
        height: 50,
        margin: 5,
        minWidth: 300,
      },
    },
  },

  props: {
    MuiButton: {
      variant: 'contained',
      color: 'primary',
    },
    MuiTextField: {
      variant: 'outlined',
    },
  },
});

export default theme;
