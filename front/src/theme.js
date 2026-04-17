import { alpha, createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#e53935'
    },
    secondary: {
      main: '#1e88e5'
    },
    background: {
      default: '#f8f4e7',
      paper: '#fffdf7'
    },
    text: {
      primary: '#213547',
      secondary: '#556273'
    },
    success: {
      main: '#43a047'
    },
    error: {
      main: '#d32f2f'
    },
    warning: {
      main: '#f9a825'
    }
  },
  typography: {
    fontFamily: '"Fredoka", sans-serif',
    h2: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 800,
      letterSpacing: '0.03em'
    },
    h4: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 800,
      letterSpacing: '0.03em'
    },
    h6: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 700,
      letterSpacing: '0.03em'
    },
    button: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 700,
      textTransform: 'none',
      letterSpacing: '0.04em'
    }
  },
  shape: {
    borderRadius: 18
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#fffdf7',
          border: '3px solid #263238',
          boxShadow: '0 8px 0 rgba(38, 50, 56, 0.18)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 46,
          paddingInline: 18,
          borderRadius: 999,
          border: '2px solid rgba(38, 50, 56, 0.8)',
          boxShadow: '0 4px 0 rgba(38, 50, 56, 0.14)'
        },
        containedPrimary: {
          color: '#ffffff'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: alpha('#ffffff', 0.92)
        },
        notchedOutline: {
          borderWidth: '2px'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          border: '2px solid rgba(38, 50, 56, 0.22)',
          fontFamily: '"Orbitron", sans-serif',
          fontWeight: 700
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: alpha('#263238', 0.14)
        },
        head: {
          fontFamily: '"Orbitron", sans-serif',
          color: '#1e88e5',
          fontWeight: 700
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          border: '2px solid rgba(38, 50, 56, 0.18)'
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 22
        }
      }
    }
  }
});
