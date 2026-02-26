
import { fetchBlogs, fetchBlogById } from "@/app/services/blog.service";
import BlogDetail from "./BlogDetail";

export async function generateMetadata({ params }) {
    
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  try {
    if (!slug) {
      console.log("❌ No slug provided!");
      return {
        title: "Blog Not Found | nupips",
      };
    }
    
    const blogs = await fetchBlogs();
    
    const blog = blogs?.find(
      (b) => b.canonical?.toLowerCase() === slug?.toLowerCase()
    );
    
    if (!blog) {
      console.log("❌ Blog NOT FOUND for slug:", slug);
      return {
        title: "Blog Not Found | nupips",
      };
    }
    
    const blogData = await fetchBlogById(blog.blogId);
    
    // return {
    //   title: blogData?.metaTitle || blogData?.tittle + " | nupips",
    //   description: blogData?.metaDescription || blogData?.description?.substring(0, 160),
    //   keywords: blogData?.metaKeyWord || "",
    //   alternates: {
    //     canonical: `https://yourdomain.com/blog/${slug}`,
    //   },
    //   robots: {
    //     index: true,
    //     follow: true,
    //   },
    //   openGraph: {
    //     title: blogData?.metaTitle || blogData?.tittle,
    //     description: blogData?.metaDescription || blogData?.description?.substring(0, 160),
    //     images: [blogData?.image || "/assets/img/default-blog.jpg"],
    //     type: "article",
    //   },
    //   twitter: {
    //     card: "summary_large_image",
    //     title: blogData?.metaTitle || blogData?.tittle,
    //     description: blogData?.metaDescription || blogData?.description?.substring(0, 160),
    //     images: [blogData?.image || "/assets/img/default-blog.jpg"],
    //   },
    // };
  return {
  title: blogData?.metaTitle || blogData?.tittle + " | nupips",
  description: blogData?.metaDescription || blogData?.description?.substring(0, 160),
  keywords: blogData?.metaKeyWord || "",
  

   other: {
    "robots": "index, follow, all",    
    "author": "Nupips",
    "copyright": "Nupips"
  },
  
  alternates: {
    canonical: `https://yourdomain.com/blog/${slug}`,
  },
  
  
  openGraph: {
    title: blogData?.metaTitle || blogData?.tittle,
    description: blogData?.metaDescription || blogData?.description?.substring(0, 160),
    images: [blogData?.image || "/assets/img/default-blog.jpg"],
    type: "article",
  },
  
  twitter: {
    card: "summary_large_image",
    title: blogData?.metaTitle || blogData?.tittle,
    description: blogData?.metaDescription || blogData?.description?.substring(0, 160),
    images: [blogData?.image || "/assets/img/default-blog.jpg"],
  },
};

  } catch (error) {
    console.log("❌ Error:", error.message);
    return {
      title: "Blog | nupips",
    };
  }
}

export default async function BlogDetailPage({ params }) {
  const resolvedParams = await params;
  return <BlogDetail params={resolvedParams} />;
}