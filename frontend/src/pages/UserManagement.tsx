import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControlLabel,
  Switch,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    isAdmin: false,
  });
  const [editUser, setEditUser] = useState({
    username: '',
    email: '',
    isAdmin: false,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // In a real application, you would fetch this data from your API
        // For now, we'll simulate it with a timeout
        setTimeout(() => {
          const mockUsers: User[] = [
            {
              id: 1,
              username: 'admin',
              email: 'admin@example.com',
              isAdmin: true,
              createdAt: '2023-01-01T00:00:00Z',
            },
            {
              id: 2,
              username: 'user1',
              email: 'user1@example.com',
              isAdmin: false,
              createdAt: '2023-01-02T00:00:00Z',
            },
            {
              id: 3,
              username: 'user2',
              email: 'user2@example.com',
              isAdmin: false,
              createdAt: '2023-01-03T00:00:00Z',
            },
          ];
          setUsers(mockUsers);
          setLoading(false);
        }, 1000);
        
        // Example of how you would fetch from a real API:
        // const response = await axios.get('http://localhost:8080/api/users');
        // setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setOpenDeleteDialog(true);
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setEditUser({
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
    setOpenEditDialog(true);
  };

  const handleAddClick = () => {
    setOpenAddDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedUser) return;

    try {
      // In a real application, you would delete the user via your API
      // await axios.delete(`http://localhost:8080/api/users/${selectedUser.id}`);
      
      // Update the local state
      setUsers(users.filter(user => user.id !== selectedUser.id));
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditSubmit = async () => {
    if (!selectedUser) return;

    try {
      // In a real application, you would update the user via your API
      // await axios.put(`http://localhost:8080/api/users/${selectedUser.id}`, editUser);
      
      // Update the local state
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, ...editUser } 
          : user
      ));
      setOpenEditDialog(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleAddSubmit = async () => {
    try {
      // In a real application, you would create the user via your API
      // const response = await axios.post('http://localhost:8080/api/users', newUser);
      
      // Update the local state with a mock response
      const mockNewUser: User = {
        id: users.length + 1,
        username: newUser.username,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        createdAt: new Date().toISOString(),
      };
      
      setUsers([...users, mockNewUser]);
      setOpenAddDialog(false);
      setNewUser({
        username: '',
        email: '',
        password: '',
        isAdmin: false,
      });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 1100, mx: 'auto', mt: 6 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: 'primary.main' }}>User Management</Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddClick}
        sx={{ mb: 2 }}
      >
        Add User
      </Button>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 180 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Username</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Role</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.isAdmin ? 'Admin' : 'User'}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEditClick(user)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteClick(user)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Delete Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete user "{selectedUser?.username}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
      >
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Username"
            fullWidth
            value={editUser.username}
            onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={editUser.email}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
          />
          <FormControlLabel
            control={
              <Switch
                checked={editUser.isAdmin}
                onChange={(e) => setEditUser({ ...editUser, isAdmin: e.target.checked })}
              />
            }
            label="Admin"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Dialog */}
      <Dialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
      >
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Username"
            fullWidth
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
          <FormControlLabel
            control={
              <Switch
                checked={newUser.isAdmin}
                onChange={(e) => setNewUser({ ...newUser, isAdmin: e.target.checked })}
              />
            }
            label="Admin"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button onClick={handleAddSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;
