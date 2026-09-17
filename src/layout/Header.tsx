import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { siteConfig } from '../data/siteConfig';
import { MobileDrawer } from './MobileDrawer';
import { LanguageToggle } from '../components/common/LanguageToggle';

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <AppBar position="sticky" color="inherit" sx={{ bgcolor: 'background.paper' }}>
      <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', py: 1 }}>
        <Typography
          component={NavLink}
          to="/"
          variant="h5"
          sx={{
            flexGrow: 1,
            fontFamily: "'Aloha Chunky', cursive",
            color: 'primary.main',
            textDecoration: 'none',
          }}
        >
          {siteConfig.name}
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
          {siteConfig.nav.map((item) => (
            <Button
              key={item.to}
              component={NavLink}
              to={item.to}
              sx={{
                color: location.pathname === item.to ? 'primary.main' : 'text.primary',
                fontWeight: location.pathname === item.to ? 800 : 600,
                bgcolor: 'grey.100',
              }}
            >
              {t(`nav.${item.id}`)}
            </Button>
          ))}
          <LanguageToggle />
          <Button component={NavLink} to="/enrollment" variant="contained" color="primary">
            {t('common.enrollNow')}
          </Button>
        </Box>

        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
          <LanguageToggle size="small" />
          <IconButton
            aria-label={t('common.openMenu')}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </AppBar>
  );
}
