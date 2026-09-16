import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

export function AdminLayout() {
  const { displayName, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/admin/login', { replace: true });
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="inherit" sx={{ bgcolor: 'brand.purple' }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontFamily: "'Aloha Chunky', cursive", color: '#fff' }}
          >
            Mama Paola Admin
          </Typography>
          {isAuthenticated && (
            <>
              <Typography variant="body2" sx={{ color: '#fff', opacity: 0.85, mr: 2 }}>
                {displayName}
              </Typography>
              <Button onClick={handleLogout} variant="outlined" sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }}>
                Log out
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}
