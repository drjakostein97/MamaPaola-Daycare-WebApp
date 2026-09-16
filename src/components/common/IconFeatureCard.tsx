import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SvgIconComponent } from '@mui/icons-material';

interface IconFeatureCardProps {
  icon: SvgIconComponent;
  title: string;
  description: string;
  iconBg?: string;
}

export function IconFeatureCard({ icon: Icon, title, description, iconBg = 'brand.yellow' }: IconFeatureCardProps) {
  return (
    <Box sx={{ textAlign: 'center', px: 2 }}>
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          bgcolor: iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 2,
        }}
      >
        <Icon sx={{ color: 'text.primary' }} />
      </Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
  );
}
