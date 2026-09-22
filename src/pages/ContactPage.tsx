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
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../layout/PageHeader';
import { SectionContainer } from '../components/common/SectionContainer';
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
  const { t } = useTranslation();
  const fullAddress = `${siteConfig.address.line1}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}`;

  return (
    <>
      <PageHeader title={t('pages.contact.title')} subtitle={t('pages.contact.subtitle')} />

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
                {siteConfig.hours
                  .map((h) => `${t(`data.siteConfig.hours.${h.id}.days`)}: ${t(`data.siteConfig.hours.${h.id}.time`)}`)
                  .join(' · ')}
              </InfoRow>
              <Box
                component="iframe"
                title={t('pages.contact.mapTitle')}
                src={`https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                sx={{ border: 0, borderRadius: 5, width: '100%', height: 240 }}
              />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper sx={{ p: { xs: 3, md: 4 } }} variant="outlined">
              <Typography variant="h4" gutterBottom>
                {t('pages.contact.sendMessage')}
              </Typography>
              <ContactForm />
            </Paper>
          </Grid>
        </Grid>
      </SectionContainer>
    </>
  );
}
