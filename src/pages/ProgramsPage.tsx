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
import { PageHeader } from '../layout/PageHeader';
import { SectionContainer } from '../components/common/SectionContainer';
import { programs, curriculumPillars, dailySchedule } from '../data/programs';

export function ProgramsPage() {
  return (
    <>
      <PageHeader
        title="Our Programs"
        subtitle="Age-appropriate classrooms and curriculum from infancy through pre-K."
      />

      <SectionContainer>
        <Grid container spacing={3}>
          {programs.map((p) => (
            <Grid key={p.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%' }}>
                <Box sx={{ bgcolor: `brand.${p.colorKey}`, height: 12 }} />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {p.name}
                  </Typography>
                  <Chip label={p.ageRange} size="small" color="primary" sx={{ mb: 1.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    {p.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </SectionContainer>

      <SectionContainer bgColor="brand.lavender">
        <Typography variant="h2" align="center" sx={{ mb: 5 }}>
          Curriculum Pillars
        </Typography>
        <Grid container spacing={3}>
          {curriculumPillars.map((c) => (
            <Grid key={c.title} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {c.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {c.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </SectionContainer>

      <SectionContainer maxWidth="sm">
        <Typography variant="h2" align="center" sx={{ mb: 4 }}>
          A Sample Day
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableBody>
              {dailySchedule.map((row) => (
                <TableRow key={row.time}>
                  <TableCell sx={{ fontWeight: 700, width: 120 }}>{row.time}</TableCell>
                  <TableCell>{row.activity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </SectionContainer>
    </>
  );
}
