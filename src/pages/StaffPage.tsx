import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { PageHeader } from '../layout/PageHeader';
import { SectionContainer } from '../components/common/SectionContainer';
import { staff } from '../data/staff';

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('');
}

export function StaffPage() {
  return (
    <>
      <PageHeader title="Meet Our Staff" subtitle="Experienced, caring educators dedicated to your child's growth." />

      <SectionContainer>
        <Grid container spacing={3}>
          {staff.map((member) => (
            <Grid key={member.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: 'brand.mediumBlue',
                      fontFamily: "'Aloha Chunky', cursive",
                      fontSize: '1.5rem',
                    }}
                  >
                    {initials(member.name)}
                  </Avatar>
                  <Typography variant="h6">{member.name}</Typography>
                  <Typography variant="body2" color="primary.dark" sx={{ fontWeight: 700, mb: 1.5 }}>
                    {member.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {member.bio}
                  </Typography>
                  <Stack spacing={0.5} sx={{ alignItems: 'center' }}>
                    {member.certifications.map((c) => (
                      <Chip key={c} label={c} size="small" variant="outlined" />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </SectionContainer>

      <SectionContainer bgColor="brand.lavender">
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom>
            Join Our Team
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            We're always looking for passionate early childhood educators to join our family.
          </Typography>
          <Button component={NavLink} to="/contact" variant="contained" color="primary" size="large">
            Get in Touch
          </Button>
        </Box>
      </SectionContainer>
    </>
  );
}
