import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaTo?: string;
  bgColor?: string;
}

export function PageHeader({ title, subtitle, ctaLabel, ctaTo, bgColor = 'brand.lavender' }: PageHeaderProps) {
  return (
    <Box sx={{ bgcolor: bgColor, py: { xs: 6, md: 8 } }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="h2" sx={{ mb: subtitle ? 2 : 0 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="h6" sx={{ fontWeight: 400, color: 'text.secondary', mb: ctaLabel ? 3 : 0 }}>
            {subtitle}
          </Typography>
        )}
        {ctaLabel && ctaTo && (
          <Button component={NavLink} to={ctaTo} variant="contained" color="primary" size="large">
            {ctaLabel}
          </Button>
        )}
      </Container>
    </Box>
  );
}
