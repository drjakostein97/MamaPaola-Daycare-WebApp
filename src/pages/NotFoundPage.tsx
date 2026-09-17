import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <Box sx={{ textAlign: 'center', py: 12, px: 2 }}>
      <Typography variant="h1" sx={{ fontSize: '5rem', color: 'primary.main', mb: 2 }}>
        {t('pages.notFound.code')}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {t('pages.notFound.message')}
      </Typography>
      <Button component={NavLink} to="/" variant="contained" color="primary" sx={{ mt: 3 }}>
        {t('pages.notFound.backHome')}
      </Button>
    </Box>
  );
}
