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
              p: { xs: 3, sm: 5 },
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(26,35,126,0.10)',
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(10px)',
              width: '100%',
              maxWidth: '480px',
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
                  width: 64,
                  height: 64,
                  boxShadow: '0 4px 16px rgba(26,35,126,0.10)'
                }}
              >
                <LockOutlinedIcon fontSize="large" />
              </Avatar>
              <Typography
                component="h1"
                variant="h4"
                sx={{
                  fontWeight: 800,
                  mb: 1,
                  letterSpacing: '0.01em',
                  color: 'primary.main',
                }}
              >
                Create Account
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
                Sign up to get started
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
                    sx={{
                      position: 'absolute',
                      left: 16,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 1,
                      color: 'primary.main',
                      fontSize: 22,
                      opacity: 0.8,
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
                        pl: 5,
                        borderRadius: 2,
                        transition: 'all 0.2s',
                        '&:hover': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'primary.main',
                          },
                        },
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: 1.5,
                      },
                      '& .MuiInputLabel-root': {
                        ml: 4,
                      },
                      '& .MuiInputLabel-shrink': {
                        ml: 0,
                        transformOrigin: 'top left',
                      },
                    }}
                  />
                </Box>
                <Box sx={{ position: 'relative', mb: 2 }}>
                  <EmailIcon
                    sx={{
                      position: 'absolute',
                      left: 16,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 1,
                      color: 'primary.main',
                      fontSize: 22,
                      opacity: 0.8,
                    }}
                  />
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
                    sx={{
                      '& .MuiInputBase-root': {
                        pl: 5,
                        borderRadius: 2,
                        transition: 'all 0.2s',
                        '&:hover': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'primary.main',
                          },
                        },
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: 1.5,
                      },
                      '& .MuiInputLabel-root': {
                        ml: 4,
                      },
                      '& .MuiInputLabel-shrink': {
                        ml: 0,
                        transformOrigin: 'top left',
                      },
                    }}
                  />
                </Box>
                <Box sx={{ position: 'relative', mb: 2 }}>
                  <LockIcon
                    sx={{
                      position: 'absolute',
                      left: 16,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 1,
                      color: 'primary.main',
                      fontSize: 22,
                      opacity: 0.8,
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
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                      '& .MuiInputBase-root': {
                        pl: 5,
                        borderRadius: 2,
                        transition: 'all 0.2s',
                        '&:hover': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'primary.main',
                          },
                        },
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: 1.5,
                      },
                      '& .MuiInputLabel-root': {
                        ml: 4,
                      },
                      '& .MuiInputLabel-shrink': {
                        ml: 0,
                        transformOrigin: 'top left',
                      },
                    }}
                  />
                </Box>
                <Box sx={{ position: 'relative', mb: 3 }}>
                  <VpnKeyIcon
                    sx={{
                      position: 'absolute',
                      left: 16,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 1,
                      color: 'primary.main',
                      fontSize: 22,
                      opacity: 0.8,
                    }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    sx={{
                      '& .MuiInputBase-root': {
                        pl: 5,
                        borderRadius: 2,
                        transition: 'all 0.2s',
                        '&:hover': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'primary.main',
                          },
                        },
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: 1.5,
                      },
                      '& .MuiInputLabel-root': {
                        ml: 4,
                      },
                      '& .MuiInputLabel-shrink': {
                        ml: 0,
                        transformOrigin: 'top left',
                      },
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
                    fontWeight: 700,
                    boxShadow: '0 4px 12px rgba(26,35,126,0.12)',
                    background: 'linear-gradient(90deg, #1a237e 0%, #00bcd4 100%)',
                    '&:hover': {
                      boxShadow: '0 6px 16px rgba(26,35,126,0.18)',
                    },
                  }}
                  disabled={loading}
                >
                  {loading ? 'Signing up...' : 'Sign Up'}
                </Button>
                <Box sx={{ textAlign: 'center' }}>
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="body1"
                    sx={{
                      textDecoration: 'none',
                      fontWeight: 600,
                      color: 'secondary.main',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {"Already have an account? Sign In"}
                  </Link>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Register;
