import { alpha, createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7cff6b'
    },
    secondary: {
      main: '#ffd84d'
    },
    background: {
      default: '#120f23',
      paper: '#20173b'
    },
    text: {
      primary: '#f7f3ff',
      secondary: '#b8afcf'
    },
    success: {
      main: '#7cff6b'
    },
    error: {
      main: '#ff6b6b'
    },
    warning: {
      main: '#ffb347'
    }
  },
  typography: {
    fontFamily: '"VT323", monospace',
    h2: {
      fontFamily: '"Press Start 2P", cursive',
      fontSize: '2rem',
      lineHeight: 1.35
    },
    h4: {
      fontFamily: '"Press Start 2P", cursive',
      fontSize: '1.35rem',
      lineHeight: 1.5
    },
    h6: {
      fontFamily: '"Press Start 2P", cursive',
      fontSize: '1rem',
      lineHeight: 1.4
    },
    body1: {
      fontSize: '1.7rem',
      lineHeight: 1.2
    },
    body2: {
      fontSize: '1.35rem',
      lineHeight: 1.2
    },
    button: {
      fontFamily: '"Press Start 2P", cursive',
      fontSize: '0.72rem',
      textTransform: 'uppercase'
    }
  },
  shape: {
    borderRadius: 0
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          imageRendering: 'pixelated'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#20173b',
          border: '4px solid #0f0b1f',
          boxShadow: '8px 8px 0 #0f0b1f'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 52,
          paddingInline: 18,
          borderRadius: 0,
          border: '3px solid #0f0b1f',
          boxShadow: '4px 4px 0 #0f0b1f'
        },
        containedPrimary: {
          backgroundColor: '#7cff6b',
          color: '#120f23'
        },
        outlined: {
          borderWidth: '3px'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          backgroundColor: alpha('#120f23', 0.58)
        },
        notchedOutline: {
          borderWidth: '3px'
        },
        input: {
          fontSize: '1.55rem'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '1.1rem',
          letterSpacing: '0.04em'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: '3px solid #0f0b1f',
          fontFamily: '"Press Start 2P", cursive',
          fontSize: '0.62rem'
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '3px solid rgba(255,255,255,0.08)'
        },
        head: {
          fontFamily: '"Press Start 2P", cursive',
          fontSize: '0.62rem',
          color: '#ffd84d'
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: '3px solid #0f0b1f'
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
