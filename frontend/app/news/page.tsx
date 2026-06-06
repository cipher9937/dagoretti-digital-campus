import { NewsHero } from '@/components/sections/news-hero';
import { NewsGrid } from '@/components/sections/news-grid';
import { FeaturedNews } from '@/components/sections/featured-news';

export const metadata = {
  title: 'News & Updates | Dagoretti High School',
  description: 'Latest news and updates from Dagoretti High School.',
};

export default function NewsPage() {
  return (
    <>
      <NewsHero />
      <FeaturedNews />
      <NewsGrid />
    </>
  );
}
