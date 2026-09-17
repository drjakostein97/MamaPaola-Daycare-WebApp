import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import VerifiedIcon from '@mui/icons-material/Verified';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Hero } from '../components/home/Hero';
import { SectionContainer } from '../components/common/SectionContainer';
import { IconFeatureCard } from '../components/common/IconFeatureCard';
import { PlaceholderBlock } from '../components/common/PlaceholderBlock';
import { programs } from '../data/programs';

const values = [
  { id: 'nurturingCare', icon: FavoriteIcon },
  { id: 'playBased', icon: SchoolIcon },
  { id: 'smallClass', icon: GroupsIcon },
  { id: 'licensed', icon: VerifiedIcon },
];

const testimonials = ['jasmineR', 'davidT', 'priyaS'];

const galleryImages = ['classroom', 'outdoorPlay', 'artTime', 'storyCircle'];

export function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <Hero />

      <SectionContainer>
        <Grid container spacing={4}>
          {values.map((v) => (
            <Grid key={v.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <IconFeatureCard
                icon={v.icon}
                title={t(`pages.home.values.${v.id}.title`)}
                description={t(`pages.home.values.${v.id}.description`)}
              />
            </Grid>
          ))}
        </Grid>
      </SectionContainer>

      <SectionContainer bgColor="brand.lavender">
        <Typography variant="h2" align="center" sx={{ mb: 1 }}>
          {t('pages.home.programsTitle')}
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 5 }}>
          {t('pages.home.programsSubtitle')}
        </Typography>
        <Grid container spacing={3}>
          {programs.map((p) => (
            <Grid key={p.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {t(`data.programs.${p.id}.name`)}
                  </Typography>
                  <Typography variant="body2" color="primary.dark" sx={{ fontWeight: 700, mb: 1 }}>
                    {t(`data.programs.${p.id}.ageRange`)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t(`data.programs.${p.id}.description`)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button component={NavLink} to="/programs" variant="contained" color="secondary">
            {t('pages.home.seeAllPrograms')}
          </Button>
        </Box>
      </SectionContainer>

      <SectionContainer>
        <Typography variant="h2" align="center" sx={{ mb: 5 }}>
          {t('pages.home.testimonialsTitle')}
        </Typography>
        <Grid container spacing={3}>
          {testimonials.map((id) => (
            <Grid key={id} size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2 }}>
                    "{t(`pages.home.testimonials.${id}.quote`)}"
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {t(`pages.home.testimonials.${id}.author`)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </SectionContainer>

      <SectionContainer bgColor="brand.lightBlue">
        <Typography variant="h2" align="center" sx={{ mb: 4 }}>
          {t('pages.home.galleryTitle')}
        </Typography>
        <Grid container spacing={2}>
          {galleryImages.map((id) => (
            <Grid key={id} size={{ xs: 6, md: 3 }}>
              <PlaceholderBlock label={t(`pages.home.galleryLabels.${id}`)} bgColor="rgba(255,255,255,0.6)" height={160} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button component={NavLink} to="/gallery" variant="outlined" color="secondary">
            {t('pages.home.viewFullGallery')}
          </Button>
        </Box>
      </SectionContainer>

      <SectionContainer bgColor="brand.purple">
        <Stack spacing={3} sx={{ alignItems: 'center', textAlign: 'center' }}>
          <Typography variant="h2" sx={{ color: '#fff' }}>
            {t('pages.home.ctaTitle')}
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.85)', maxWidth: 500 }}>
            {t('pages.home.ctaBody')}
          </Typography>
          <Button component={NavLink} to="/enrollment" variant="contained" color="primary" size="large">
            {t('pages.home.startEnrollment')}
          </Button>
        </Stack>
      </SectionContainer>
    </>
  );
}
