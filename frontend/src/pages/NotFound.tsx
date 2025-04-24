import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <Typography variant="h2" color="primary" sx={{ mb: 2, fontWeight: 800 }}>404</Typography>
      <Typography variant="h5" sx={{ mb: 2, color: 'text.secondary' }}>Page Not Found</Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>Go Home</Button>
    </Box>
  );
};

export default NotFound;
