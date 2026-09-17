import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../layout/PageHeader';
import { SectionContainer } from '../components/common/SectionContainer';
import { PlaceholderBlock } from '../components/common/PlaceholderBlock';

const categories = ['all', 'classrooms', 'outdoorPlay', 'events', 'artCrafts'];

const images = [
  { id: 'infantNursery', category: 'classrooms' },
  { id: 'toddlerClassroom', category: 'classrooms' },
  { id: 'preschoolReading', category: 'classrooms' },
  { id: 'playground', category: 'outdoorPlay' },
  { id: 'gardenExploration', category: 'outdoorPlay' },
  { id: 'waterPlay', category: 'outdoorPlay' },
  { id: 'fallFestival', category: 'events' },
  { id: 'graduationDay', category: 'events' },
  { id: 'paintingTime', category: 'artCrafts' },
  { id: 'craftTable', category: 'artCrafts' },
];

export function GalleryPage() {
  const { t } = useTranslation();
  const [tab, setTab] = useState('all');
  const filtered = tab === 'all' ? images : images.filter((i) => i.category === tab);

  return (
    <>
      <PageHeader title={t('pages.gallery.title')} subtitle={t('pages.gallery.subtitle')} />

      <SectionContainer>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
          <Tabs
            value={tab}
            onChange={(_, value) => setTab(value)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {categories.map((c) => (
              <Tab key={c} label={t(`pages.gallery.categories.${c}`)} value={c} />
            ))}
          </Tabs>
        </Box>
        <Grid container spacing={2}>
          {filtered.map((img) => (
            <Grid key={img.id} size={{ xs: 6, sm: 4, md: 3 }}>
              <PlaceholderBlock label={t(`pages.gallery.images.${img.id}`)} height={180} />
            </Grid>
          ))}
        </Grid>
      </SectionContainer>
    </>
  );
}
