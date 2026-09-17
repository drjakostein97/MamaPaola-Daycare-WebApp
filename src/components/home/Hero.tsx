import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PlaceholderBlock } from '../common/PlaceholderBlock';
import { siteConfig } from '../../data/siteConfig';

export function Hero() {
  const { t } = useTranslation();

  return (
    <Box sx={{ bgcolor: 'brand.yellow', pt: { xs: 6, md: 10 }, pb: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h1" sx={{ fontSize: { xs: '2.75rem', md: '4rem' }, mb: 2 }}>
              {t('data.siteConfig.tagline')}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 400, color: 'text.secondary', mb: 4 }}>
              {t('hero.intro', { name: siteConfig.name })}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button component={NavLink} to="/enrollment" variant="contained" color="primary" size="large">
                {t('common.enrollNow')}
              </Button>
              <Button component={NavLink} to="/programs" variant="outlined" color="secondary" size="large">
                {t('hero.explorePrograms')}
              </Button>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <PlaceholderBlock label={t('hero.photoAlt')} bgColor="brand.lightBlue" height={360} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
