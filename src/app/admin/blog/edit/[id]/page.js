"use client";

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import {
  RiArrowLeftSLine,
  RiImageLine,
  RiCloseLine,
  RiAddLine,
  RiLoader4Line
} from 'react-icons/ri';
import { toast } from 'react-hot-toast';
import { getCategory } from '@/app/redux/slices/categorySlice';
import { updateUserBlog } from '@/app/redux/slices/blogSlice';


// Validation schema with Formik
const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  categoryId: Yup.string().required('Category is required'),
  description: Yup.string().required('Description is required'),
  readTime: Yup.string().required('Read time is required'),
});

// Helper function to get user data from localStorage
const getUserData = () => {
  if (typeof window === 'undefined') return null;
  const userData = localStorage.getItem('currentUser');
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  }
  return null;
};

const EditBlogPage = () => {
  const router = useRouter();
  const params = useParams();
  const blogId = params.id;
  
  const dispatch = useDispatch();
  const categoryData = useSelector((state) => state.category?.data || []);
  const { loading, currentBlog } = useSelector((state) => state.blog);
  
  // Get user ID from localStorage
  const userData = useMemo(() => getUserData(), []);
  const userId = userData?.adminUserId || '';

  // Image state
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch categories on mount
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  // Fetch blog data by ID
  useEffect(() => {
    const fetchBlogData = async () => {
      if (blogId) {
        try {
          const result = await dispatch(getBlogByI(blogId)).unwrap();
          if (result.data) {
            const blog = result.data;
            // Set existing image
            if (blog.image) {
              setExistingImage(blog.image);
              setImagePreview(blog.image);
            }
            // Set form values
            formik.setValues({
              title: blog.title || blog.tittle || '',
              categoryId: blog.categoryId || '',
              description: blog.description || '',
              readTime: blog.readTime || '',
              status: blog.status === 1 || blog.status === 'published' ? 'published' : 'draft',
              metaTitle: blog.metaTitle || '',
              metaDescription: blog.metaDescription || '',
              metaKeyword: blog.metaKeyWord || '',
              canonical: blog.canonical || '',
            });
          }
        } catch (error) {
          console.error('Error fetching blog:', error);
          toast.error('Failed to load blog data');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchBlogData();
  }, [blogId, dispatch]);

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      title: '',
      categoryId: '',
      description: '',
      readTime: '',
      status: 'draft',
      metaTitle: '',
      metaDescription: '',
      metaKeyword: '',
      canonical: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Convert status to number (1 for published, 0 for draft)
        const statusValue = values.status === 'published' ? 1 : 0;

        const blogData = {
          BlogId: blogId,
          Tittle: values.title,
          Description: values.description,
          ReadTime: values.readTime,
          Status: statusValue,
          MetaKeyWord: values.metaKeyword,
          MetaDescription: values.metaDescription,
          MetaTitle: values.metaTitle,
          Canonical: values.canonical,
          categoryId: values.categoryId,
          UpdatedBy: userId,
          Image: image // Only send new image if uploaded
        };

        const result = await dispatch(updateUserBlog(blogData)).unwrap();

        if (result.statusCode === 200) {
          toast.success(result.message || 'Blog updated successfully!');
          router.push('/admin/blog');
        } else {
          toast.error(result.message || 'Failed to update blog');
        }
      } catch (error) {
        console.error('Error updating blog:', error);
        toast.error(error?.message || 'Failed to update blog');
      }
    },
  });

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Remove image
  const removeImage = () => {
    setImage(null);
    setImagePreview(existingImage);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <RiLoader4Line className="text-4xl text-[#D16655] animate-spin" />
          <p className="text-gray-500 dark:text-gray-400">Loading blog data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog"
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
          >
            <RiArrowLeftSLine className="text-xl" />
          </Link>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-[#2E4A5B] dark:text-white">
              Edit Blog
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Update your blog post
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Basic Information
                </h2>
                
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter blog title"
                      className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border ${formik.touched.title && formik.errors.title ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'} rounded-lg text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#29d2cc] focus:ring-2 focus:ring-[#29d2cc]/20 transition-all`}
                    />
                    {formik.touched.title && formik.errors.title && (
                      <p className="text-xs text-red-500 mt-1">{formik.errors.title}</p>
                    )}
                  </div>

                  {/* Category */}
                  <div className='pt-4'>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="categoryId"
                      value={formik.values.categoryId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border ${formik.touched.categoryId && formik.errors.categoryId ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'} rounded-lg text-sm text-gray-800 dark:text-white focus:outline-none focus:border-[#29d2cc] focus:ring-2 focus:ring-[#29d2cc]/20 transition-all`}
                    >
                      <option value="">Select Category</option>
                      {categoryData.map((cat) => (
                        <option key={cat.categoryId} value={cat.categoryId}>
                          {cat.categoryName}
                        </option>
                      ))}
                    </select>
                    {formik.touched.categoryId && formik.errors.categoryId && (
                      <p className="text-xs text-red-500 mt-1">{formik.errors.categoryId}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div className='pt-4'>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Write your blog description here..."
                      rows={8}
                      className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border ${formik.touched.description && formik.errors.description ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'} rounded-lg text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#29d2cc] focus:ring-2 focus:ring-[#29d2cc]/20 transition-all resize-none`}
                    />
                    {formik.touched.description && formik.errors.description && (
                      <p className="text-xs text-red-500 mt-1">{formik.errors.description}</p>
                    )}
                  </div>

                  {/* Read Time */}
                  <div className='pt-4'>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Read Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="readTime"
                      value={formik.values.readTime}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="e.g., 5 min read"
                      className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border ${formik.touched.readTime && formik.errors.readTime ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'} rounded-lg text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#29d2cc] focus:ring-2 focus:ring-[#29d2cc]/20 transition-all`}
                    />
                    {formik.touched.readTime && formik.errors.readTime && (
                      <p className="text-xs text-red-500 mt-1">{formik.errors.readTime}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Meta Information Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  SEO Meta Information
                </h2>
                
                <div className="space-y-4">
                  {/* Meta Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      name="metaTitle"
                      value={formik.values.metaTitle}
                      onChange={formik.handleChange}
                      placeholder="SEO title for search engines"
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#29d2cc] focus:ring-2 focus:ring-[#29d2cc]/20 transition-all"
                    />
                    <p className="text-xs text-gray-400 mt-1">{formik.values.metaTitle.length}/60 characters</p>
                  </div>

                  {/* Meta Description */}
                  <div className='pt-2'>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Meta Description
                    </label>
                    <textarea
                      name="metaDescription"
                      value={formik.values.metaDescription}
                      onChange={formik.handleChange}
                      placeholder="SEO description for search engines"
                      rows={3}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#29d2cc] focus:ring-2 focus:ring-[#29d2cc]/20 transition-all resize-none"
                    />
                    <p className="text-xs text-gray-400 mt-1">{formik.values.metaDescription.length}/160 characters</p>
                  </div>

                  {/* Meta Keywords */}
                  <div className='pt-2'>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Meta Keywords
                    </label>
                    <input
                      type="text"
                      name="metaKeyword"
                      value={formik.values.metaKeyword}
                      onChange={formik.handleChange}
                      placeholder="keyword1, keyword2, keyword3"
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#29d2cc] focus:ring-2 focus:ring-[#29d2cc]/20 transition-all"
                    />
                    <p className="text-xs text-gray-400 mt-1">Separate keywords with commas</p>
                  </div>

                  {/* Canonical URL */}
                  <div className='pt-2'>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Canonical 
                    </label>
                    <input
                      type="text"
                      name="canonical"
                      value={formik.values.canonical}
                      onChange={formik.handleChange}
                      placeholder="Canonical"
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#29d2cc] focus:ring-2 focus:ring-[#29d2cc]/20 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Image Upload Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Featured Image
                </h2>
                
                {!imagePreview ? (
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-[#29d2cc] transition-colors">
                    <RiImageLine className="text-4xl text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      Click to upload image
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="blog-image-upload"
                    />
                    <label
                      htmlFor="blog-image-upload"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#D16655] text-white text-sm font-medium rounded-lg hover:bg-[#c05545] transition-colors cursor-pointer"
                    >
                      <RiAddLine className="text-lg" />
                      Choose Image
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <Image
                      src={imagePreview}
                      alt="Blog featured image"
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <RiCloseLine className="text-lg" />
                    </button>
                  </div>
                )}
              </div>

              {/* Status Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Publish Settings
                </h2>
                
                <div className="space-y-4">
                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formik.values.status}
                      onChange={formik.handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-white focus:outline-none focus:border-[#29d2cc] focus:ring-2 focus:ring-[#29d2cc]/20 transition-all"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Moved outside sidebar to ensure visibility */}
              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={formik.isSubmitting || loading}
                  className="w-full px-4 py-3 bg-[#D16655] text-white font-medium rounded-lg hover:bg-[#c05545] hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {formik.isSubmitting || loading ? (
                    <>
                      <RiLoader4Line className="text-lg animate-spin" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <RiAddLine className="text-lg" />
                      <span>Update Blog</span>
                    </>
                  )}
                </button>
                
                <Link
                  href="/admin/blog"
                  className="w-full px-4 py-3 bg-[#6B7280] text-white font-medium rounded-lg hover:bg-[#4B5563] transition-colors text-center"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </form>
    </div>
  );
};

export default EditBlogPage;