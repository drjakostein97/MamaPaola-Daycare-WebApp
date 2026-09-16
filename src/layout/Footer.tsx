import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { siteConfig } from '../data/siteConfig';

export function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'brand.purple', color: '#fff', pt: 6, pb: 3, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" sx={{ fontFamily: "'Aloha Chunky', cursive", mb: 1 }}>
              {siteConfig.name}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85, mb: 2 }}>
              {siteConfig.tagline}
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="Facebook"
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener"
                sx={{ color: '#fff' }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                aria-label="Instagram"
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener"
                sx={{ color: '#fff' }}
              >
                <InstagramIcon />
              </IconButton>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
              Quick Links
            </Typography>
            <Stack spacing={0.5}>
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.to}
                  component={NavLink}
                  to={item.to}
                  underline="hover"
                  sx={{ color: '#fff', opacity: 0.85 }}
                >
                  {item.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
              Hours
            </Typography>
            <Stack spacing={0.5}>
              {siteConfig.hours.map((h) => (
                <Typography key={h.days} variant="body2" sx={{ opacity: 0.85 }}>
                  {h.days}: {h.time}
                </Typography>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
              Contact
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>
              {siteConfig.address.line1}
              <br />
              {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85, mt: 1 }}>
              {siteConfig.phone}
              <br />
              {siteConfig.email}
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.2)', mt: 4, pt: 2 }}>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
