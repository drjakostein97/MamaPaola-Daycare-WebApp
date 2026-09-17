import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { siteConfig } from '../data/siteConfig';
import { LanguageToggle } from '../components/common/LanguageToggle';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const { t } = useTranslation();

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 260, pt: 2 }} role="presentation" onClick={onClose}>
        <List>
          {siteConfig.nav.map((item) => (
            <ListItemButton key={item.to} component={NavLink} to={item.to}>
              <ListItemText primary={t(`nav.${item.id}`)} />
            </ListItemButton>
          ))}
        </List>
        <Box sx={{ px: 2, pt: 1 }}>
          <LanguageToggle fullWidth />
          <Box sx={{ mt: 1 }}>
            <Button
              component={NavLink}
              to="/enrollment"
              variant="contained"
              color="primary"
              fullWidth
            >
              {t('common.enrollNow')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
