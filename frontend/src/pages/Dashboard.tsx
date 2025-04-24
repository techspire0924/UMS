import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState<{ totalUsers: number; adminUsers: number; regularUsers: number }>({
    totalUsers: 0,
    adminUsers: 0,
    regularUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/dashboard/stats');
        setStats(response.data);
      } catch (error) {
        setStats({ totalUsers: 0, adminUsers: 0, regularUsers: 0 });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <Box sx={{ width: '100%', maxWidth: 900, mx: 'auto', mt: 6 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: 'primary.main' }}>Dashboard</Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 180 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>Total Users</Typography>
                <Typography variant="h3" fontWeight={800}>{stats.totalUsers}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>Admin Users</Typography>
                <Typography variant="h3" fontWeight={800}>{stats.adminUsers}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>Regular Users</Typography>
                <Typography variant="h3" fontWeight={800}>{stats.regularUsers}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
