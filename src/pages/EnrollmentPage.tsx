import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../layout/PageHeader';
import { SectionContainer } from '../components/common/SectionContainer';
import { EnrollmentForm } from '../components/enrollment/EnrollmentForm';
import { siteConfig } from '../data/siteConfig';

const steps = [
  { step: '1', id: 'inquire' },
  { step: '2', id: 'tour' },
  { step: '3', id: 'apply' },
  { step: '4', id: 'enroll' },
];

export function EnrollmentPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader title={t('pages.enrollment.title')} subtitle={t('pages.enrollment.subtitle')} />

      <SectionContainer>
        <Grid container spacing={3} sx={{ mb: 2 }}>
          {steps.map((s) => (
            <Grid key={s.step} size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 1.5,
                    fontFamily: "'Aloha Chunky', cursive",
                    fontSize: '1.25rem',
                  }}
                >
                  {s.step}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {t(`pages.enrollment.steps.${s.id}.title`)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t(`pages.enrollment.steps.${s.id}.description`)}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </SectionContainer>

      <SectionContainer bgColor="brand.lavender" maxWidth="md">
        <Paper sx={{ p: { xs: 3, md: 5 } }}>
          <Typography variant="h3" gutterBottom>
            {t('pages.enrollment.inquiryTitle')}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {t('pages.enrollment.callOrEmail', { phone: siteConfig.phone, email: siteConfig.email })}
          </Typography>
          <EnrollmentForm />
        </Paper>
      </SectionContainer>
    </>
  );
}
