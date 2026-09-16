import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import VerifiedIcon from '@mui/icons-material/Verified';
import { NavLink } from 'react-router-dom';
import { Hero } from '../components/home/Hero';
import { SectionContainer } from '../components/common/SectionContainer';
import { IconFeatureCard } from '../components/common/IconFeatureCard';
import { PlaceholderBlock } from '../components/common/PlaceholderBlock';
import { programs } from '../data/programs';

const values = [
  { icon: FavoriteIcon, title: 'Nurturing Care', description: 'Every child is treated with warmth, patience, and respect.' },
  { icon: SchoolIcon, title: 'Play-Based Curriculum', description: 'Learning through hands-on exploration and discovery.' },
  { icon: GroupsIcon, title: 'Small Class Sizes', description: 'Low teacher-to-child ratios for individualized attention.' },
  { icon: VerifiedIcon, title: 'Licensed & Certified', description: 'Fully licensed staff trained in early childhood education.' },
];

const testimonials = [
  { quote: 'Mama Paola feels like a second home for our daughter. The teachers genuinely care.', author: 'Jasmine R., Parent' },
  { quote: 'The curriculum is thoughtful and my son has grown so much since starting here.', author: 'David T., Parent' },
  { quote: 'Communication with the staff is wonderful — we always know how our child’s day went.', author: 'Priya S., Parent' },
];

export function HomePage() {
  return (
    <>
      <Hero />

      <SectionContainer>
        <Grid container spacing={4}>
          {values.map((v) => (
            <Grid key={v.title} size={{ xs: 12, sm: 6, md: 3 }}>
              <IconFeatureCard {...v} />
            </Grid>
          ))}
        </Grid>
      </SectionContainer>

      <SectionContainer bgColor="brand.lavender">
        <Typography variant="h2" align="center" sx={{ mb: 1 }}>
          Our Programs
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 5 }}>
          Age-appropriate care and curriculum from infancy through pre-K.
        </Typography>
        <Grid container spacing={3}>
          {programs.map((p) => (
            <Grid key={p.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {p.name}
                  </Typography>
                  <Typography variant="body2" color="primary.dark" sx={{ fontWeight: 700, mb: 1 }}>
                    {p.ageRange}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {p.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button component={NavLink} to="/programs" variant="contained" color="secondary">
            See All Programs
          </Button>
        </Box>
      </SectionContainer>

      <SectionContainer>
        <Typography variant="h2" align="center" sx={{ mb: 5 }}>
          What Families Say
        </Typography>
        <Grid container spacing={3}>
          {testimonials.map((t) => (
            <Grid key={t.author} size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2 }}>
                    "{t.quote}"
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {t.author}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </SectionContainer>

      <SectionContainer bgColor="brand.lightBlue">
        <Typography variant="h2" align="center" sx={{ mb: 4 }}>
          A Peek Inside
        </Typography>
        <Grid container spacing={2}>
          {['Classroom', 'Outdoor Play', 'Art Time', 'Story Circle'].map((label) => (
            <Grid key={label} size={{ xs: 6, md: 3 }}>
              <PlaceholderBlock label={label} bgColor="rgba(255,255,255,0.6)" height={160} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button component={NavLink} to="/gallery" variant="outlined" color="secondary">
            View Full Gallery
          </Button>
        </Box>
      </SectionContainer>

      <SectionContainer bgColor="brand.purple">
        <Stack spacing={3} sx={{ alignItems: 'center', textAlign: 'center' }}>
          <Typography variant="h2" sx={{ color: '#fff' }}>
            Ready to join our family?
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.85)', maxWidth: 500 }}>
            Schedule a tour or start your enrollment inquiry today — we'd love to meet you.
          </Typography>
          <Button component={NavLink} to="/enrollment" variant="contained" color="primary" size="large">
            Start Enrollment
          </Button>
        </Stack>
      </SectionContainer>
    </>
  );
}
