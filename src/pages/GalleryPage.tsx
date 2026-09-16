import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { PageHeader } from '../layout/PageHeader';
import { SectionContainer } from '../components/common/SectionContainer';
import { PlaceholderBlock } from '../components/common/PlaceholderBlock';

const categories = ['All', 'Classrooms', 'Outdoor Play', 'Events', 'Art & Crafts'];

const images = [
  { label: 'Infant Nursery', category: 'Classrooms' },
  { label: 'Toddler Classroom', category: 'Classrooms' },
  { label: 'Preschool Reading Corner', category: 'Classrooms' },
  { label: 'Playground', category: 'Outdoor Play' },
  { label: 'Garden Exploration', category: 'Outdoor Play' },
  { label: 'Water Play Day', category: 'Outdoor Play' },
  { label: 'Fall Festival', category: 'Events' },
  { label: 'Graduation Day', category: 'Events' },
  { label: 'Painting Time', category: 'Art & Crafts' },
  { label: 'Craft Table', category: 'Art & Crafts' },
];

export function GalleryPage() {
  const [tab, setTab] = useState('All');
  const filtered = tab === 'All' ? images : images.filter((i) => i.category === tab);

  return (
    <>
      <PageHeader title="Gallery" subtitle="A glimpse into everyday life at Mama Paola Daycare." />

      <SectionContainer>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
          <Tabs
            value={tab}
            onChange={(_, value) => setTab(value)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {categories.map((c) => (
              <Tab key={c} label={c} value={c} />
            ))}
          </Tabs>
        </Box>
        <Grid container spacing={2}>
          {filtered.map((img) => (
            <Grid key={img.label} size={{ xs: 6, sm: 4, md: 3 }}>
              <PlaceholderBlock label={img.label} height={180} />
            </Grid>
          ))}
        </Grid>
      </SectionContainer>
    </>
  );
}
