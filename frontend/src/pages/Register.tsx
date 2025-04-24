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
  Email as EmailIcon,
  Lock as LockIcon,
  VpnKey as VpnKeyIcon,
} from '@mui/icons-material';
import axios from 'axios';
import theme from '../theme';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // Use the proxy endpoint
      await axios.post('/api/register', {
        username,
        email,
        password,
      });

      // Navigate to login page after successful registration
      navigate('/login');
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError('Registration failed. Please try again.');
      }
      console.error('Registration error:', err);
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
          background: 'linear-gradient(135deg, #1a237e 0%, #00bcd4 100%)',
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
              background: 'linear-gradient(135deg, #23263a 0%, #181c2f 100%)',
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
              <Avatar sx={{ bgcolor: 'secondary.main', width: 64, height: 64, mb: 2, boxShadow: '0 4px 16px rgba(0,188,212,0.18)' }}>
                <LockOutlinedIcon fontSize="large" />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 800, color: 'secondary.main', mb: 1, letterSpacing: 1 }}>
                Create Account
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 3 }}>
                Register to get started
              </Typography>
              <form noValidate style={{ width: '100%' }}>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', bgcolor: 'rgba(33,41,92,0.12)', borderRadius: 2, px: 2 }}>
                  <PersonIcon sx={{ color: 'secondary.main', mr: 1 }} />
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
                          borderColor: 'secondary.main',
                        },
                      },
                    }}
                    InputLabelProps={{ sx: { color: 'text.secondary' } }}
                  />
                </Box>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', bgcolor: 'rgba(33,41,92,0.12)', borderRadius: 2, px: 2 }}>
                  <EmailIcon sx={{ color: 'secondary.main', mr: 1 }} />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                      sx: {
                        color: '#f5f6fa',
                        background: 'transparent',
                        borderRadius: 2,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'secondary.main',
                        },
                      },
                    }}
                    InputLabelProps={{ sx: { color: 'text.secondary' } }}
                  />
                </Box>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', bgcolor: 'rgba(33,41,92,0.12)', borderRadius: 2, px: 2 }}>
                  <LockIcon sx={{ color: 'secondary.main', mr: 1 }} />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      sx: {
                        color: '#f5f6fa',
                        background: 'transparent',
                        borderRadius: 2,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'secondary.main',
                        },
                      },
                    }}
                    InputLabelProps={{ sx: { color: 'text.secondary' } }}
                  />
                </Box>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', bgcolor: 'rgba(33,41,92,0.12)', borderRadius: 2, px: 2 }}>
                  <VpnKeyIcon sx={{ color: 'secondary.main', mr: 1 }} />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    InputProps={{
                      sx: {
                        color: '#f5f6fa',
                        background: 'transparent',
                        borderRadius: 2,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'secondary.main',
                        },
                      },
                    }}
                    InputLabelProps={{ sx: { color: 'text.secondary' } }}
                  />
                </Box>
                {error && (
                  <Alert severity="error" sx={{ mt: 2, borderRadius: 2, bgcolor: 'error.dark', color: '#fff' }}>{error}</Alert>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  sx={{
                    mt: 3,
                    mb: 2,
                    borderRadius: 3,
                    fontWeight: 700,
                    boxShadow: '0 4px 16px rgba(0,188,212,0.10)',
                    fontSize: '1.1rem',
                    letterSpacing: 1,
                    background: 'linear-gradient(90deg, #23263a 0%, #00bcd4 100%)',
                    transition: 'background 0.3s',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #181c2f 0%, #00bcd4 100%)',
                    },
                  }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
                </Button>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Link component={RouterLink} to="/login" variant="body2" sx={{ color: 'primary.light' }}>
                    Already have an account? Sign in
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

export default Register;
