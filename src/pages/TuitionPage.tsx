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
import { PageHeader } from '../layout/PageHeader';
import { SectionContainer } from '../components/common/SectionContainer';
import { tuitionTiers, closures, tuitionFaqs } from '../data/tuition';
import { siteConfig } from '../data/siteConfig';

export function TuitionPage() {
  return (
    <>
      <PageHeader title="Tuition & Schedule" subtitle="Transparent pricing and hours for every family." />

      <SectionContainer>
        <Typography variant="h3" align="center" gutterBottom>
          Weekly Tuition
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Placeholder rates — final pricing confirmed at enrollment.
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 800 }}>Program</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Full-Time</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Part-Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tuitionTiers.map((tier) => (
                <TableRow key={tier.id}>
                  <TableCell>{tier.program}</TableCell>
                  <TableCell>{tier.fullTime}</TableCell>
                  <TableCell>{tier.partTime}</TableCell>
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
              Hours of Operation
            </Typography>
            <Card>
              <CardContent>
                {siteConfig.hours.map((h) => (
                  <Typography key={h.days} variant="body1" sx={{ mb: 1 }}>
                    <strong>{h.days}:</strong> {h.time}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h3" gutterBottom>
              Holiday Closures
            </Typography>
            <Card>
              <CardContent>
                {closures.map((c) => (
                  <Typography key={c.holiday} variant="body1" sx={{ mb: 1 }}>
                    <strong>{c.date}:</strong> {c.holiday}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </SectionContainer>

      <SectionContainer maxWidth="md">
        <Typography variant="h2" align="center" sx={{ mb: 4 }}>
          Frequently Asked Questions
        </Typography>
        {tuitionFaqs.map((faq) => (
          <Accordion key={faq.question}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 700 }}>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </SectionContainer>
    </>
  );
}
