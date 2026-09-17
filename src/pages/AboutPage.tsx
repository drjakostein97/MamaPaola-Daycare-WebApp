import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../layout/PageHeader';
import { SectionContainer } from '../components/common/SectionContainer';
import { PlaceholderBlock } from '../components/common/PlaceholderBlock';

const values = ['respect', 'safety', 'growth', 'community'];

export function AboutPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader
        title={t('pages.about.title')}
        subtitle={t('pages.about.subtitle')}
      />

      <SectionContainer>
        <Grid container spacing={6} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h3" gutterBottom>
              {t('pages.about.ourStoryTitle')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {t('pages.about.ourStoryP1')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('pages.about.ourStoryP2')}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <PlaceholderBlock label={t('pages.about.facilityPhotoAlt')} height={320} />
          </Grid>
        </Grid>
      </SectionContainer>

      <SectionContainer bgColor="brand.lavender">
        <Typography variant="h2" align="center" sx={{ mb: 5 }}>
          {t('pages.about.missionTitle')}
        </Typography>
        <Grid container spacing={3}>
          {values.map((id) => (
            <Grid key={id} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {t(`pages.about.values.${id}.title`)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t(`pages.about.values.${id}.description`)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </SectionContainer>

      <SectionContainer>
        <Grid container spacing={6} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 2, md: 1 } }}>
            <PlaceholderBlock label={t('pages.about.outdoorPhotoAlt')} height={320} bgColor="brand.yellow" />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 1, md: 2 } }}>
            <Typography variant="h3" gutterBottom>
              {t('pages.about.facilityTitle')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {t('pages.about.facilityP1')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('pages.about.facilityP2')}
            </Typography>
          </Grid>
        </Grid>
      </SectionContainer>
    </>
  );
}
