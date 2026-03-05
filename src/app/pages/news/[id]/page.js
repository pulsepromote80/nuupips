import { fetchNews, getNewsById } from "@/app/services/news.service";
import NewsDetail from "../NewsDetail ";
// SEO metadata
export async function generateMetadata({ params }) {
   const { id } = await params;
  const blog = await getNewsById(id);

  return {
    title: blog?.tittle,
    description: blog?.description,
    openGraph: {
      title: blog?.tittle,
      description: blog?.description,
      images: [blog?.image],
    },
  };
}

export default async function Page({ params }) {
  const { id } = await params;
  const news = await getNewsById(id);
  if (!news) {
    notFound(); // 👈 404 page
  }
  // all news 
  const newsData = await fetchNews();
  
  return <NewsDetail article={news[0]} news= {newsData} />;
}
