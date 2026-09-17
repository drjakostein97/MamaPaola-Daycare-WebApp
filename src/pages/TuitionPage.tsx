import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../layout/PageHeader';
import { SectionContainer } from '../components/common/SectionContainer';
import { tuitionTiers, closures, tuitionFaqs } from '../data/tuition';
import { siteConfig } from '../data/siteConfig';

export function TuitionPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader title={t('pages.tuition.title')} subtitle={t('pages.tuition.subtitle')} />

      <SectionContainer>
        <Typography variant="h3" align="center" gutterBottom>
          {t('pages.tuition.weeklyTuitionTitle')}
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4 }}>
          {t('pages.tuition.weeklyTuitionCaveat')}
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 800 }}>{t('pages.tuition.tableProgram')}</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>{t('pages.tuition.tableFullTime')}</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>{t('pages.tuition.tablePartTime')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tuitionTiers.map((tier) => (
                <TableRow key={tier.id}>
                  <TableCell>{t(`data.tuition.tiers.${tier.id}.program`)}</TableCell>
                  <TableCell>{t(`data.tuition.tiers.${tier.id}.fullTime`)}</TableCell>
                  <TableCell>{t(`data.tuition.tiers.${tier.id}.partTime`)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </SectionContainer>

      <SectionContainer bgColor="brand.lavender">
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h3" gutterBottom>
              {t('pages.tuition.hoursOfOperationTitle')}
            </Typography>
            <Card>
              <CardContent>
                {siteConfig.hours.map((h) => (
                  <Typography key={h.id} variant="body1" sx={{ mb: 1 }}>
                    <strong>{t(`data.siteConfig.hours.${h.id}.days`)}:</strong> {t(`data.siteConfig.hours.${h.id}.time`)}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h3" gutterBottom>
              {t('pages.tuition.holidayClosuresTitle')}
            </Typography>
            <Card>
              <CardContent>
                {closures.map((c) => (
                  <Typography key={c.id} variant="body1" sx={{ mb: 1 }}>
                    <strong>{t(`data.tuition.closures.${c.id}.date`)}:</strong> {t(`data.tuition.closures.${c.id}.holiday`)}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </SectionContainer>

      <SectionContainer maxWidth="md">
        <Typography variant="h2" align="center" sx={{ mb: 4 }}>
          {t('pages.tuition.faqTitle')}
        </Typography>
        {tuitionFaqs.map((faq) => (
          <Accordion key={faq.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 700 }}>{t(`data.tuition.faqs.${faq.id}.question`)}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">{t(`data.tuition.faqs.${faq.id}.answer`)}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </SectionContainer>
    </>
  );
}
