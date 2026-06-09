import { GalleryHero } from '@/components/sections/gallery-hero';
import { GalleryGrid } from '@/components/sections/gallery-grid';

export const metadata = {
  title: 'Gallery | Dagoretti High School',
  description: 'Explore photos and videos of Dagoretti High School campus, events, and activities.',
};

export default function GalleryPage() {
  return (
    <>
      <GalleryHero />
      <GalleryGrid />
    </>
  );
}
