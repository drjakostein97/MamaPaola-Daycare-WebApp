import type { ReactNode } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PlaceIcon from '@mui/icons-material/Place';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { PageHeader } from '../layout/PageHeader';
import { SectionContainer } from '../components/common/SectionContainer';
import { PlaceholderBlock } from '../components/common/PlaceholderBlock';
import { ContactForm } from '../components/contact/ContactForm';
import { siteConfig } from '../data/siteConfig';

function InfoRow({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
      <Box sx={{ color: 'primary.main', mt: 0.3 }}>{icon}</Box>
      <Typography variant="body1" color="text.secondary">
        {children}
      </Typography>
    </Stack>
  );
}

export function ContactPage() {
  return (
    <>
      <PageHeader title="Contact Us" subtitle="We'd love to hear from you — reach out anytime." />

      <SectionContainer>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={3}>
              <InfoRow icon={<PlaceIcon />}>
                {siteConfig.address.line1}, {siteConfig.address.city}, {siteConfig.address.state}{' '}
                {siteConfig.address.zip}
              </InfoRow>
              <InfoRow icon={<PhoneIcon />}>{siteConfig.phone}</InfoRow>
              <InfoRow icon={<EmailIcon />}>{siteConfig.email}</InfoRow>
              <InfoRow icon={<ScheduleIcon />}>
                {siteConfig.hours.map((h) => `${h.days}: ${h.time}`).join(' · ')}
              </InfoRow>
              <PlaceholderBlock label="Map placeholder" height={240} bgColor="brand.lightBlue" />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper sx={{ p: { xs: 3, md: 4 } }} variant="outlined">
              <Typography variant="h4" gutterBottom>
                Send Us a Message
              </Typography>
              <ContactForm />
            </Paper>
          </Grid>
        </Grid>
      </SectionContainer>
    </>
  );
}
