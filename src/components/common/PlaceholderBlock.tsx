import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageIcon from '@mui/icons-material/Image';

interface PlaceholderBlockProps {
  label: string;
  bgColor?: string;
  height?: number | string;
}

/** Stand-in for a real photo. Swap for an <img> once real media is available. */
export function PlaceholderBlock({ label, bgColor = 'brand.lightBlue', height = 200 }: PlaceholderBlockProps) {
  return (
    <Box
      sx={{
        bgcolor: bgColor,
        height,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        color: 'rgba(46, 42, 34, 0.55)',
      }}
    >
      <ImageIcon fontSize="large" />
      <Typography variant="body2" sx={{ fontWeight: 700 }}>
        {label}
      </Typography>
    </Box>
  );
}
