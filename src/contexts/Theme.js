import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
/* 
Using the unstable StrictMode Theme to avoid the warning accompanied with Navbar SwipeableDrawer that conflicts with React StrictMode in development env. that states the below :
"Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance 
of 
Transition which is inside StrictMode. Instead, add a ref directly to the element you 
want to reference. Learn more about using refs safely .... "
*/

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#35BAF6',
    },
  },

  overrides: {
    MuiTypography: {
      root: {
        marginBottom: 5,
      },
    },

    MuiButton: {
      root: {
        borderRadius: 50,
        minWidth: 160,
        height: 40,
        margin: 5,
        fontWeight: 'bold',
      },
    },

    MuiTextField: {
      root: {
        padding: 7,
        height: 35,
        margin: 5,
        minWidth: 300,
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 35,
      },
    },
    MuiDialog: {
      paper: {
        borderRadius: 20,
        opacity: '80%',
        padding: '8%',
        paddingTop: '5%',
        paddingBottom: '5%',
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
      size: 'small',
    },
  },
});

export default theme;
