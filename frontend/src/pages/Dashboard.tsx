import { useState, useEffect } from 'react';
import {
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Box,
  CircularProgress,
} from '@mui/material';
import {
  PeopleOutline as PeopleIcon,
  AdminPanelSettings as AdminIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import axios from 'axios';

interface DashboardStats {
  totalUsers: number;
  adminUsers: number;
  regularUsers: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    adminUsers: 0,
    regularUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // In a real application, you would fetch this data from your API
        // For now, we'll simulate it with a timeout
        setTimeout(() => {
          setStats({
            totalUsers: 15,
            adminUsers: 3,
            regularUsers: 12,
          });
          setLoading(false);
        }, 1000);
        
        // Example of how you would fetch from a real API:
        // const response = await axios.get('http://localhost:8080/api/dashboard/stats');
        // setStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="subtitle1" paragraph>
          Welcome to the User Management System dashboard.
        </Typography>
      </Box>
      <Grid container direction="row" spacing={3} justifyContent="center" alignItems="center" sx={{ width: '100%', margin: 0 }}>
        <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <PeopleIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h5" component="div">
                {stats.totalUsers}
              </Typography>
              <Typography color="textSecondary">Total Users</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <AdminIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
              <Typography variant="h5" component="div">
                {stats.adminUsers}
              </Typography>
              <Typography color="textSecondary">Admin Users</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <PersonIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h5" component="div">
                {stats.regularUsers}
              </Typography>
              <Typography color="textSecondary">Regular Users</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Recent Activity
        </Typography>
        <Typography variant="body2" color="textSecondary">
          No recent activity to display.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Dashboard;
