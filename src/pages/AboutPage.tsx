import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { PageHeader } from '../layout/PageHeader';
import { SectionContainer } from '../components/common/SectionContainer';
import { PlaceholderBlock } from '../components/common/PlaceholderBlock';

const values = [
  { title: 'Respect', description: 'We honor each child’s individuality, pace, and personality.' },
  { title: 'Safety', description: 'A secure, clean, and carefully supervised environment at all times.' },
  { title: 'Growth', description: 'Encouraging curiosity and confidence through everyday discovery.' },
  { title: 'Community', description: 'Building genuine partnerships between families, teachers, and children.' },
];

export function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Mama Paola Daycare"
        subtitle="Loving, licensed care rooted in our community since day one."
      />

      <SectionContainer>
        <Grid container spacing={6} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h3" gutterBottom>
              Our Story
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Mama Paola Daycare was founded with a simple idea: every child deserves a caregiver
              who treats them like family. What started as a small home-based program has grown
              into a full early-learning center, but our commitment to warmth and individual
              attention hasn't changed.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Today, our team of licensed educators welcomes children from six weeks through
              pre-K, guiding them through their first, most important years of learning.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <PlaceholderBlock label="Photo of the daycare facility" height={320} />
          </Grid>
        </Grid>
      </SectionContainer>

      <SectionContainer bgColor="brand.lavender">
        <Typography variant="h2" align="center" sx={{ mb: 5 }}>
          Our Mission &amp; Values
        </Typography>
        <Grid container spacing={3}>
          {values.map((v) => (
            <Grid key={v.title} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {v.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {v.description}
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
            <PlaceholderBlock label="Photo of the outdoor play area" height={320} bgColor="brand.yellow" />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 1, md: 2 } }}>
            <Typography variant="h3" gutterBottom>
              Our Facility
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Our center features bright, age-appropriate classrooms, a secure fenced outdoor
              play area, a dedicated infant nursery, and a full kitchen preparing fresh daily
              meals and snacks.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Every space is designed and childproofed with safety and sensory-rich learning in
              mind, and monitored throughout the day by our caring staff.
            </Typography>
          </Grid>
        </Grid>
      </SectionContainer>
    </>
  );
}
