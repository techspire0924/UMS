import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Photo as PhotoIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'User Management', icon: <PeopleIcon />, path: '/users' },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
  ];

  const drawer = (
    <div>
      <Toolbar sx={{ justifyContent: 'center', bgcolor: 'primary.main', color: '#fff', minHeight: 72 }}>
        <PhotoIcon sx={{ fontSize: 38, color: '#fff', mr: 1 }} />
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 800, letterSpacing: 1 }}>
          User Management System
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ mt: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              sx={{
                borderRadius: 6,
                mx: 1,
                my: 0.5,
                '&.Mui-selected, &.Mui-selected:hover': {
                  bgcolor: 'primary.light',
                  color: 'primary.main',
                },
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
              selected={window.location.pathname === item.path}
            >
              <ListItemIcon sx={{ color: 'primary.main', minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ sx: { fontWeight: 600, color: 'primary.main' } }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 1 }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 6,
              mx: 1,
              my: 0.5,
              color: 'error.main',
              '&:hover': { bgcolor: 'error.light', color: 'error.dark' },
            }}
          >
            <ListItemIcon sx={{ color: 'error.main', minWidth: 36 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" primaryTypographyProps={{ sx: { fontWeight: 600, color: 'error.main' } }} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', background: 'background.default' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: '#1565C0', // Changed to a modern blue color
          color: '#fff',
          boxShadow: '0 4px 18px rgba(21,101,192,0.08)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'center', minHeight: 72 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PhotoIcon sx={{ fontSize: 38, color: '#fff', mr: 1 }} />
            <Typography variant="h6" noWrap sx={{ fontWeight: 900, letterSpacing: 1, color: '#fff' }}>
              User Management System
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background: '#fff', borderRight: '1px solid #e3eafc' },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background: '#fff', borderRight: '1px solid #e3eafc' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: `calc(100vh - 64px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: { sm: `${drawerWidth}px` },
          boxSizing: 'border-box',
          background: 'background.default',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
