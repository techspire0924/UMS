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
} from '@mui/material';
import {
  LockOutlined as LockOutlinedIcon,
  Person as PersonIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import axios from 'axios';

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
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          width: '100vw',
          position: 'fixed',
          top: 0,
          left: 0,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
            elevation={6}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 2,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              width: '100%',
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar
                sx={{
                  m: 1,
                  bgcolor: 'primary.main',
                  width: 56,
                  height: 56,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              >
                <LockOutlinedIcon fontSize="large" />
              </Avatar>
              <Typography
                component="h1"
                variant="h4"
                sx={{
                  fontWeight: 600,
                  mb: 1,
                  background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Welcome Back
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
                Sign in to your account
              </Typography>
              {error && (
                <Alert
                  severity="error"
                  sx={{
                    width: '100%',
                    mb: 3,
                    borderRadius: 1,
                  }}
                >
                  {error}
                </Alert>
              )}
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ width: '100%' }}
              >
                <Box sx={{ position: 'relative', mb: 2 }}>
                  <PersonIcon
                    color="action"
                    sx={{
                      position: 'absolute',
                      left: 12,
                      top: 22,
                      zIndex: 1
                    }}
                  />
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
                    sx={{
                      '& .MuiInputBase-root': {
                        pl: 5
                      }
                    }}
                  />
                </Box>
                <Box sx={{ position: 'relative', mb: 3 }}>
                  <LockIcon
                    color="action"
                    sx={{
                      position: 'absolute',
                      left: 12,
                      top: 22,
                      zIndex: 1
                    }}
                  />
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
                    sx={{
                      '& .MuiInputBase-root': {
                        pl: 5
                      }
                    }}
                  />
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 1,
                    mb: 3,
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: '1rem',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                    '&:hover': {
                      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
                <Box sx={{ textAlign: 'center' }}>
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="body1"
                    sx={{
                      textDecoration: 'none',
                      fontWeight: 500,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default Login;
