import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { PageHeader } from '../layout/PageHeader';
import { SectionContainer } from '../components/common/SectionContainer';
import { EnrollmentForm } from '../components/enrollment/EnrollmentForm';
import { siteConfig } from '../data/siteConfig';

const steps = [
  { step: '1', title: 'Inquire', description: 'Submit the form below or call us to start the conversation.' },
  { step: '2', title: 'Tour', description: 'Visit our center and meet the teachers who will care for your child.' },
  { step: '3', title: 'Apply', description: 'Complete enrollment paperwork and pay the registration fee.' },
  { step: '4', title: 'Enroll', description: 'Welcome to the family! We’ll schedule your child’s first day.' },
];

export function EnrollmentPage() {
  return (
    <>
      <PageHeader title="Enrollment" subtitle="Four simple steps to join the Mama Paola family." />

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
                  {s.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {s.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </SectionContainer>

      <SectionContainer bgColor="brand.lavender" maxWidth="md">
        <Paper sx={{ p: { xs: 3, md: 5 } }}>
          <Typography variant="h3" gutterBottom>
            Enrollment Inquiry
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Prefer to talk it through? Call us at {siteConfig.phone} or email{' '}
            {siteConfig.email}.
          </Typography>
          <EnrollmentForm />
        </Paper>
      </SectionContainer>
    </>
  );
}
