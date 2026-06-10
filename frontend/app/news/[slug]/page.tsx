import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 md:p-10">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">News Article</h1>
              <p className="text-gray-500">Article: {slug}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}