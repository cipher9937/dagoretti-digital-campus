import { notFound } from 'next/navigation';
import { NewsArticle } from '@/components/sections/news-article';
import { RelatedNews } from '@/components/sections/related-news';

async function getNews(slug: string) {
  // In production, fetch from API
  return {
    title: 'News Article',
    slug,
    content: 'Content...',
  };
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const news = await getNews(params.slug);
  if (!news) return { title: 'Not Found' };
  return {
    title: `${news.title} | Dagoretti High School News`,
  };
}

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const news = await getNews(params.slug);
  if (!news) notFound();

  return (
    <>
      <NewsArticle news={news} />
      <RelatedNews currentSlug={params.slug} />
    </>
  );
}
