import { alpha, createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1877f2'
    },
    secondary: {
      main: '#e1306c'
    },
    background: {
      default: '#f2f5f9',
      paper: '#ffffff'
    },
    text: {
      primary: '#1c1e21',
      secondary: '#65676b'
    },
    success: {
      main: '#31a24c'
    },
    error: {
      main: '#d93025'
    },
    warning: {
      main: '#f7b928'
    }
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h4: {
      fontWeight: 800,
      letterSpacing: '-0.03em'
    },
    h6: {
      fontWeight: 700,
      letterSpacing: '-0.02em'
    },
    button: {
      fontWeight: 700,
      textTransform: 'none'
    }
  },
  shape: {
    borderRadius: 20
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#ffffff',
          border: `1px solid ${alpha('#1c1e21', 0.08)}`,
          boxShadow: '0 10px 30px rgba(28, 30, 33, 0.08)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 44,
          paddingInline: 18,
          borderRadius: 14,
          boxShadow: 'none'
        },
        contained: {
          boxShadow: 'none'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          backgroundColor: '#f7f8fa'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 700
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: '#65676b',
          fontWeight: 700
        },
        root: {
          borderColor: alpha('#1c1e21', 0.08)
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 24
        }
      }
    }
  }
});
