import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../layout/PageHeader';
import { SectionContainer } from '../components/common/SectionContainer';
import { siteConfig } from '../data/siteConfig';

const sections = ['use', 'cookies', 'children', 'sharing', 'retention', 'security', 'rights', 'changes'] as const;

interface PolicySectionProps {
  heading: string;
  children: ReactNode;
}

function PolicySection({ heading, children }: PolicySectionProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        {heading}
      </Typography>
      {children}
    </Box>
  );
}

export function PrivacyPolicyPage() {
  const { t } = useTranslation();
  const collectItems = t('pages.privacyPolicy.collect.items', { returnObjects: true }) as string[];

  return (
    <>
      <PageHeader title={t('pages.privacyPolicy.title')} subtitle={t('pages.privacyPolicy.subtitle')} />

      <SectionContainer maxWidth="md">
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {t('pages.privacyPolicy.intro')}
        </Typography>

        <PolicySection heading={t('pages.privacyPolicy.collect.heading')}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {t('pages.privacyPolicy.collect.intro')}
          </Typography>
          <Box component="ul" sx={{ color: 'text.secondary', pl: 3, mb: 2 }}>
            {collectItems.map((item) => (
              <Typography key={item} component="li" variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                {item}
              </Typography>
            ))}
          </Box>
          <Typography variant="body1" color="text.secondary">
            {t('pages.privacyPolicy.collect.outro')}
          </Typography>
        </PolicySection>

        {sections.map((id) => (
          <PolicySection key={id} heading={t(`pages.privacyPolicy.${id}.heading`)}>
            <Typography variant="body1" color="text.secondary">
              {t(`pages.privacyPolicy.${id}.body`)}
            </Typography>
          </PolicySection>
        ))}

        <PolicySection heading={t('pages.privacyPolicy.contact.heading')}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {t('pages.privacyPolicy.contact.body')}
          </Typography>
          <Stack spacing={0.5}>
            <Typography variant="body1" color="text.secondary">
              {siteConfig.address.line1}, {siteConfig.address.city}, {siteConfig.address.state}{' '}
              {siteConfig.address.zip}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {siteConfig.phone}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {siteConfig.email}
            </Typography>
          </Stack>
        </PolicySection>

        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mt: 6 }}>
          {t('pages.privacyPolicy.disclaimer')}
        </Typography>
      </SectionContainer>
    </>
  );
}
