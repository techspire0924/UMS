import { useState, useEffect } from 'react';
import {
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  Avatar,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import axios from 'axios';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    username: '',
    email: '',
  });
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // In a real application, you would fetch this data from your API
        // For now, we'll simulate it with a timeout
        setTimeout(() => {
          const mockProfile: UserProfile = {
            id: '1',
            username: 'admin',
            email: 'admin@example.com',
            isAdmin: true,
            createdAt: '2023-01-01T00:00:00Z',
          };
          setProfile(mockProfile);
          setEditedProfile({
            username: mockProfile.username,
            email: mockProfile.email,
          });
          setLoading(false);
        }, 1000);
        
        // Example of how you would fetch from a real API:
        // const response = await axios.get('http://localhost:8080/api/profile');
        // setProfile(response.data);
        // setEditedProfile({
        //   username: response.data.username,
        //   email: response.data.email,
        // });
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditToggle = () => {
    if (editing && profile) {
      // Reset form when canceling edit
      setEditedProfile({
        username: profile.username,
        email: profile.email,
      });
    }
    setEditing(!editing);
  };

  const handleProfileUpdate = async () => {
    try {
      // In a real application, you would update the profile via your API
      // await axios.put('http://localhost:8080/api/profile', editedProfile);
      
      // Update the local state
      if (profile) {
        setProfile({
          ...profile,
          username: editedProfile.username,
          email: editedProfile.email,
        });
      }
      
      setEditing(false);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: 'Failed to update profile.' });
    }
  };

  const handlePasswordChange = async () => {
    // Validate passwords
    if (password.new !== password.confirm) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    try {
      // Actually update the password via your API
      await axios.put('/api/profile/password', {
        currentPassword: password.current,
        newPassword: password.new,
      });

      // Clear password fields
      setPassword({
        current: '',
        new: '',
        confirm: '',
      });
      
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 3000);
    } catch (error: any) {
      console.error('Error changing password:', error);
      setMessage({ type: 'error', text: error.response?.data || 'Failed to change password.' });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <CircularProgress size={56} thickness={4.5} color="primary" />
      </Box>
    );
  }

  if (!profile && message.type !== 'error') {
    return null;
  }

  if (!profile && message.type === 'error') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <Typography color="error" variant="h6">
          Error loading profile. Please try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', mb: 4 }}>
        <Typography variant="h4" gutterBottom>My Profile</Typography>
      </Box>
      {message.text && (
        <Alert severity={message.type as 'success' | 'error'} sx={{ mb: 3, width: '100%' }}>
          {message.text}
        </Alert>
      )}
      <Grid container direction="row" spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mr: 2 }}>
                <PersonIcon fontSize="large" />
              </Avatar>
              <Box>
                <Typography variant="h6">{profile.username}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {profile.isAdmin ? 'Administrator' : 'Regular User'}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="textSecondary">
                Member since: {new Date(profile.createdAt).toLocaleDateString()}
              </Typography>
            </Box>

            <Box sx={{ mt: 3 }}>
              {editing ? (
                <>
                  <TextField
                    fullWidth
                    label="Username"
                    margin="normal"
                    value={editedProfile.username}
                    onChange={(e) => setEditedProfile({ ...editedProfile, username: e.target.value })}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                  />
                  <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                    <Button variant="contained" onClick={handleProfileUpdate}>
                      Save Changes
                    </Button>
                    <Button variant="outlined" onClick={handleEditToggle}>
                      Cancel
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2">Username</Typography>
                    <Typography variant="body1">{profile.username}</Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2">Email</Typography>
                    <Typography variant="body1">{profile.email}</Typography>
                  </Box>
                  <Button variant="outlined" onClick={handleEditToggle}>
                    Edit Profile
                  </Button>
                </>
              )}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Change Password
            </Typography>
            <TextField
              fullWidth
              label="Current Password"
              margin="normal"
              type="password"
              value={password.current}
              onChange={(e) => setPassword({ ...password, current: e.target.value })}
            />
            <TextField
              fullWidth
              label="New Password"
              margin="normal"
              type="password"
              value={password.new}
              onChange={(e) => setPassword({ ...password, new: e.target.value })}
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              margin="normal"
              type="password"
              value={password.confirm}
              onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
            />
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handlePasswordChange}
              disabled={!password.current || !password.new || !password.confirm}
            >
              Change Password
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
