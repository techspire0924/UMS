import { useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post('/api/register', { username, password, email });
      setSuccess('Registration successful! You can now log in.');
      setTimeout(() => navigate('/login'), 1200);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'background.default' }}>
      <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'primary.main' }}>Register</Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoFocus
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              sx={{ mb: 2 }}
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              sx={{ mb: 3 }}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth size="large" sx={{ fontWeight: 700 }}>
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
