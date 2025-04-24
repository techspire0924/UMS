import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#21295c', // Soft Navy
      contrastText: '#fff',
    },
    secondary: {
      main: '#00bcd4', // Gentle Cyan
      contrastText: '#fff',
    },
    background: {
      default: '#181c2f', // Deep blue-black
      paper: '#23263a', // Slightly lighter for cards/paper
    },
    success: {
      main: '#43a047',
    },
    error: {
      main: '#e53935',
    },
    warning: {
      main: '#ffa000',
    },
    info: {
      main: '#00bcd4',
    },
    text: {
      primary: '#f5f6fa', // Gentle off-white
      secondary: '#b0b8d1', // Muted blue-gray
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
    h1: {
      fontWeight: 800,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          fontWeight: 700,
          background: 'linear-gradient(90deg, #23263a 0%, #21295c 100%)',
          color: '#fff',
          boxShadow: '0 2px 8px rgba(33,41,92,0.12)',
          transition: 'background 0.3s, box-shadow 0.3s',
          '&:hover': {
            background: 'linear-gradient(90deg, #23263a 0%, #00bcd4 100%)',
            boxShadow: '0 4px 16px rgba(0,188,212,0.15)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          background: 'linear-gradient(135deg, #23263a 0%, #181c2f 100%)',
          boxShadow: '0 8px 32px rgba(33,41,92,0.18)',
          backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.04)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #181c2f 0%, #23263a 100%)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 64,
          background: 'transparent',
          boxShadow: 'none',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          background: 'none',
          padding: 0,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          background: 'linear-gradient(135deg, #23263a 0%, #181c2f 100%)',
          boxShadow: '0 4px 32px rgba(33,41,92,0.12)',
        },
      },
    },
  },
});

export default theme;
