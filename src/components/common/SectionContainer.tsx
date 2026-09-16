import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import type { ReactNode } from 'react';

interface SectionContainerProps {
  children: ReactNode;
  bgColor?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export function SectionContainer({ children, bgColor, maxWidth = 'lg' }: SectionContainerProps) {
  return (
    <Box sx={{ bgcolor: bgColor, py: { xs: 6, md: 8 } }}>
      <Container maxWidth={maxWidth}>{children}</Container>
    </Box>
  );
}
