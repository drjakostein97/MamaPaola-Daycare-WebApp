import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { NavLink } from 'react-router-dom';
import { PlaceholderBlock } from '../common/PlaceholderBlock';
import { siteConfig } from '../../data/siteConfig';

export function Hero() {
  return (
    <Box sx={{ bgcolor: 'brand.yellow', pt: { xs: 6, md: 10 }, pb: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h1" sx={{ fontSize: { xs: '2.75rem', md: '4rem' }, mb: 2 }}>
              {siteConfig.tagline}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 400, color: 'text.secondary', mb: 4 }}>
              {siteConfig.name} offers loving, play-based care for infants through pre-K, with
              experienced teachers and a curriculum designed to help every child thrive.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button component={NavLink} to="/enrollment" variant="contained" color="primary" size="large">
                Enroll Now
              </Button>
              <Button component={NavLink} to="/programs" variant="outlined" color="secondary" size="large">
                Explore Programs
              </Button>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <PlaceholderBlock label="Photo of children playing" bgColor="brand.lightBlue" height={360} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
