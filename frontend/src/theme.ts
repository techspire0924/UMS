import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1e293b', // Slate blue-gray
      contrastText: '#f1f5f9',
    },
    secondary: {
      main: '#38bdf8', // Soft blue
      contrastText: '#f1f5f9',
    },
    background: {
      default: '#111827', // Very dark blue-gray
      paper: '#1e293b', // Card/paper dark
    },
    error: {
      main: '#f87171', // Soft red
    },
    warning: {
      main: '#fbbf24', // Amber
    },
    info: {
      main: '#60a5fa', // Light blue
    },
    success: {
      main: '#34d399', // Green
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
    },
    divider: '#334155',
  },
  typography: {
    fontFamily: 'Inter, Segoe UI, Helvetica Neue, Arial, sans-serif',
    h1: { fontWeight: 900, fontSize: '2.7rem', color: '#38bdf8' },
    h2: { fontWeight: 800, color: '#38bdf8' },
    h3: { fontWeight: 700, color: '#38bdf8' },
    h4: { fontWeight: 600, color: '#38bdf8' },
    h5: { fontWeight: 600, color: '#38bdf8' },
    h6: { fontWeight: 600, color: '#38bdf8' },
    button: { fontWeight: 700, textTransform: 'none' },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          fontWeight: 700,
          background: 'linear-gradient(90deg, #38bdf8 0%, #1e293b 100%)',
          color: '#f1f5f9',
          boxShadow: '0 2px 10px rgba(56,189,248,0.08)',
          transition: 'background 0.3s, box-shadow 0.3s',
          '&:hover': {
            background: 'linear-gradient(90deg, #1e293b 0%, #38bdf8 100%)',
            boxShadow: '0 4px 18px rgba(30,41,59,0.13)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          background: '#1e293b',
          color: '#f1f5f9',
          boxShadow: '0 8px 32px rgba(30,41,59,0.15)',
          border: '1px solid #334155',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #1e293b 0%, #38bdf8 100%)',
          boxShadow: '0 4px 18px rgba(56,189,248,0.10)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#38bdf8',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#94a3b8',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#38bdf8',
          },
        },
        input: {
          color: '#f1f5f9',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          borderRadius: 10,
          transition: 'background 0.2s',
          '&.Mui-selected, &.Mui-selected:hover': {
            background: '#334155',
            color: '#38bdf8',
          },
          '&:hover': {
            background: '#1e293b',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: '#111827',
          color: '#f1f5f9',
          borderRight: '1px solid #334155',
        },
      },
    },
  },
});

export default theme;
