import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Button,
  TextField,
  Link,
  Box,
  Typography,
  Container,
  Paper,
  Alert,
  CssBaseline,
  ThemeProvider,
  CircularProgress,
} from '@mui/material';
import {
  LockOutlined as LockOutlinedIcon,
  Person as PersonIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import axios from 'axios';
import theme from '../theme';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Use the proxy endpoint
      const response = await axios.post('/api/login', {
        username,
        password,
      });

      // Save token to localStorage
      localStorage.setItem('token', response.data.token);

      // Navigate to dashboard
      navigate('/');
    } catch (err) {
      setError('Invalid username or password');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          width: '100vw',
          position: 'fixed',
          top: 0,
          left: 0,
          background: '#181c2f',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          margin: 0,
          overflow: 'auto',
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            maxWidth: '1200px',
            mx: 'auto',
            py: 4,
            px: { xs: 2, sm: 4 },
          }}
        >
          <Paper
            elevation={8}
            sx={{
              p: 5,
              borderRadius: 6,
              background: '#23263a',
              boxShadow: '0 8px 32px rgba(33,41,92,0.22)',
              border: '1.5px solid rgba(0,188,212,0.10)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: 420,
              width: '100%',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <Avatar sx={{ bgcolor: '#fff', width: 64, height: 64, mb: 2, boxShadow: '0 4px 16px rgba(0,188,212,0.18)' }}>
                <LockOutlinedIcon fontSize="large" sx={{ color: '#23263a' }} />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#fff', mb: 1, letterSpacing: 1 }}>
                Welcome Back
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#fff', mb: 3 }}>
                Sign in to your account
              </Typography>
              <form noValidate style={{ width: '100%' }}>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', bgcolor: 'rgba(33,41,92,0.12)', borderRadius: 2, px: 2 }}>
                  <PersonIcon sx={{ color: '#fff', mr: 1 }} />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    InputProps={{
                      sx: {
                        color: '#f5f6fa',
                        background: 'transparent',
                        borderRadius: 2,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#fff',
                        },
                      },
                    }}
                    InputLabelProps={{ sx: { color: '#fff' } }}
                  />
                </Box>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', bgcolor: 'rgba(33,41,92,0.12)', borderRadius: 2, px: 2 }}>
                  <LockIcon sx={{ color: '#fff', mr: 1 }} />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      sx: {
                        color: '#f5f6fa',
                        background: 'transparent',
                        borderRadius: 2,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#fff',
                        },
                      },
                    }}
                    InputLabelProps={{ sx: { color: '#fff' } }}
                  />
                </Box>
                {error && (
                  <Alert severity="error" sx={{ mt: 2, borderRadius: 2, bgcolor: 'error.dark', color: '#fff' }}>{error}</Alert>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{
                    mt: 3,
                    mb: 2,
                    borderRadius: 3,
                    fontWeight: 700,
                    boxShadow: '0 4px 16px rgba(0,188,212,0.10)',
                    fontSize: '1.1rem',
                    letterSpacing: 1,
                    background: '#fff',
                    color: '#23263a',
                    transition: 'background 0.3s',
                    '&:hover': {
                      background: '#f5f6fa',
                      color: '#21295c',
                    },
                  }}
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                </Button>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Link component={RouterLink} to="/register" variant="body2" sx={{ color: '#fff' }}>
                    Don't have an account? Register
                  </Link>
                </Box>
              </form>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
