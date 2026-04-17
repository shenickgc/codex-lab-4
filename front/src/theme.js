import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000080'
    },
    secondary: {
      main: '#008080'
    },
    background: {
      default: '#008080',
      paper: '#c0c0c0'
    },
    text: {
      primary: '#000000',
      secondary: '#303030'
    },
    success: {
      main: '#008000'
    },
    error: {
      main: '#a80000'
    },
    warning: {
      main: '#c28c00'
    }
  },
  typography: {
    fontFamily: '"IBM Plex Sans", sans-serif',
    h4: {
      fontWeight: 700
    },
    h6: {
      fontWeight: 700
    },
    button: {
      fontWeight: 600,
      textTransform: 'none'
    }
  },
  shape: {
    borderRadius: 0
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#c0c0c0',
          borderTop: '2px solid #ffffff',
          borderLeft: '2px solid #ffffff',
          borderRight: '2px solid #404040',
          borderBottom: '2px solid #404040',
          boxShadow: 'none'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 34,
          paddingInline: 14,
          borderRadius: 0,
          color: '#000000',
          backgroundColor: '#c0c0c0',
          borderTop: '2px solid #ffffff',
          borderLeft: '2px solid #ffffff',
          borderRight: '2px solid #404040',
          borderBottom: '2px solid #404040',
          boxShadow: 'none'
        },
        contained: {
          backgroundColor: '#c0c0c0',
          boxShadow: 'none'
        },
        outlined: {
          border: 'none'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          backgroundColor: '#ffffff'
        },
        notchedOutline: {
          borderColor: '#7f7f7f',
          borderWidth: '2px'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          backgroundColor: '#d4d0c8',
          border: '1px solid #7f7f7f',
          fontWeight: 600
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#d4d0c8',
          color: '#000000',
          fontWeight: 700,
          borderBottom: '2px solid #7f7f7f'
        },
        root: {
          borderBottom: '1px solid #9d9d9d'
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 0
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 0
        }
      }
    }
  }
});
