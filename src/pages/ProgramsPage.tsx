import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../layout/PageHeader';
import { SectionContainer } from '../components/common/SectionContainer';
import { programs, curriculumPillars, dailySchedule } from '../data/programs';

export function ProgramsPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader
        title={t('pages.programs.title')}
        subtitle={t('pages.programs.subtitle')}
      />

      <SectionContainer>
        <Grid container spacing={3}>
          {programs.map((p) => (
            <Grid key={p.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%' }}>
                <Box sx={{ bgcolor: `brand.${p.colorKey}`, height: 12 }} />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {t(`data.programs.${p.id}.name`)}
                  </Typography>
                  <Chip label={t(`data.programs.${p.id}.ageRange`)} size="small" color="primary" sx={{ mb: 1.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    {t(`data.programs.${p.id}.description`)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </SectionContainer>

      <SectionContainer bgColor="brand.lavender">
        <Typography variant="h2" align="center" sx={{ mb: 5 }}>
          {t('pages.programs.curriculumPillarsTitle')}
        </Typography>
        <Grid container spacing={3}>
          {curriculumPillars.map((c) => (
            <Grid key={c.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {t(`data.programs.curriculumPillars.${c.id}.title`)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t(`data.programs.curriculumPillars.${c.id}.description`)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </SectionContainer>

      <SectionContainer maxWidth="sm">
        <Typography variant="h2" align="center" sx={{ mb: 4 }}>
          {t('pages.programs.sampleDayTitle')}
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableBody>
              {dailySchedule.map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ fontWeight: 700, width: 120 }}>{row.time}</TableCell>
                  <TableCell>{t(`data.programs.dailySchedule.${row.id}.activity`)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </SectionContainer>
    </>
  );
}
