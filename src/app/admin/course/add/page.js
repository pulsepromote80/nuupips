"use client";

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import {
  RiArrowLeftSLine,
  RiImageLine,
  RiVideoLine,
  RiCloseLine,
  RiAddLine,
  RiStarLine
} from 'react-icons/ri';
import { toast } from 'react-hot-toast';
import { getCourseCategory } from '@/app/redux/slices/courseCategorySlice';
import { addCourse, getActiveCourses } from '@/app/redux/slices/courseSlice';

// Validation schema with Formik
const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  categoryId: Yup.string().required('Category is required'),
  description: Yup.string().required('Description is required'),
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

const AddCoursePage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const categoryData = useSelector((state) => state.courseCategory?.data || []);
  const courseLoading = useSelector((state) => state.course?.loading || false);

  // Get user ID from localStorage
  const userData = useMemo(() => getUserData(), []);
  const userId = userData?.adminUserId || '';

  // Image and Video state
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  // Fetch categories on mount
  useEffect(() => {
    dispatch(getCourseCategory());
  }, [dispatch]);

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      title: '',
      categoryId: '',
      description: '',
      rating: '',
      noOfRating: '',
      status: '1',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Validate thumbnail
      if (!thumbnail && !thumbnailPreview) {
        toast.error('Please upload a thumbnail image');
        return;
      }

      try {
        // Convert status to number (1 for published, 0 for draft)
        const statusValue = values.status === 'published' ? 1 : 0;

        // Create FormData
        const formData = new FormData();
        formData.append('Title', values.title);
        formData.append('Description', values.description);
        formData.append('CourseCategoryId', values.categoryId);
        formData.append('Rating', values.rating || '0');
        formData.append('NoOfRating', values.noOfRating || '0');
        formData.append('Status', statusValue);
        formData.append('CreatedBy', userId);

        // Append thumbnail if exists
        if (thumbnail) {
          formData.append('ThumbnailImage', thumbnail);
        }

        // Append video if exists
        if (video) {
          formData.append('CourseVideo', video);
        }

        const result = await dispatch(addCourse(formData)).unwrap();

        if (result.statusCode === 200) {
          toast.success(result.message || 'Course added successfully!');
          dispatch(getActiveCourses());
          router.push('/admin/course');
        } else {
          toast.error(result.message || 'Failed to add course');
        }
      } catch (error) {
        console.error('Error adding course:', error);
        toast.error(error?.message || 'Failed to add course');
      }
    },
  });

  // Handle thumbnail change
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  // Remove thumbnail
  const removeThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview(null);
  };

  // Handle video change
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  // Remove video
  const removeVideo = () => {
    setVideo(null);
    setVideoPreview(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/course"
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
          >
            <RiArrowLeftSLine className="text-xl" />
          </Link>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-[#2E4A5B] dark:text-white">
              Add New Course
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Create a new course
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
                Course Information
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
                    placeholder="Enter course title"
                    className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border ${formik.touched.title && formik.errors.title ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'} rounded-lg text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#29d2cc] focus:ring-2 focus:ring-[#29d2cc]/20 transition-all`}
                  />
                  {formik.touched.title && formik.errors.title && (
                    <p className="text-xs text-red-500 mt-1">{formik.errors.title}</p>
                  )}
                </div>

                {/* Category */}
                <div className='pt-2'>
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
                      <option key={cat.courseCategoryId} value={cat.courseCategoryId}>
                        {cat.courseCategoryName}
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
                    placeholder="Enter course description"
                    rows={5}
                    className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border ${formik.touched.description && formik.errors.description ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'} rounded-lg text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#29d2cc] focus:ring-2 focus:ring-[#29d2cc]/20 transition-all resize-none`}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <p className="text-xs text-red-500 mt-1">{formik.errors.description}</p>
                  )}
                </div>

                {/* Rating and No. of Ratings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Rating
                    </label>
                    <div className="relative">
                      <RiStarLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 text-lg" />
                      <input
                        type="number"
                        name="rating"
                        value={formik.values.rating}
                        onChange={formik.handleChange}
                        placeholder="e.g., 4.5"
                        step="0.1"
                        min="0"
                        max="5"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#29d2cc] focus:ring-2 focus:ring-[#29d2cc]/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* No. of Ratings */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      No. of Ratings
                    </label>
                    <input
                      type="number"
                      name="noOfRating"
                      value={formik.values.noOfRating}
                      onChange={formik.handleChange}
                      placeholder="e.g., 100"
                      min="0"
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#29d2cc] focus:ring-2 focus:ring-[#29d2cc]/20 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Thumbnail Upload Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Thumbnail Image <span className="text-red-500">*</span>
              </h2>
              
              {!thumbnailPreview ? (
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-[#29d2cc] transition-colors">
                  <RiImageLine className="text-4xl text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Click to upload thumbnail
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="hidden"
                    id="course-thumbnail-upload"
                  />
                  <label
                    htmlFor="course-thumbnail-upload"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#D16655] text-white text-sm font-medium rounded-lg hover:bg-[#c05545] transition-colors cursor-pointer"
                  >
                    <RiAddLine className="text-lg" />
                    Choose Image
                  </label>
                  {!thumbnail && !thumbnailPreview && (
                    <p className="text-xs text-red-500 mt-2">Thumbnail is required</p>
                  )}
                </div>
              ) : (
                <div className="relative">
                  <Image
                    src={thumbnailPreview}
                    alt="Course thumbnail"
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeThumbnail}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <RiCloseLine className="text-lg" />
                  </button>
                </div>
              )}
            </div>

            {/* Video Upload Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Course Video
              </h2>
              
              {!videoPreview ? (
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-[#29d2cc] transition-colors">
                  <RiVideoLine className="text-4xl text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Click to upload video
                  </p>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="hidden"
                    id="course-video-upload"
                  />
                  <label
                    htmlFor="course-video-upload"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#29d2cc] text-white text-sm font-medium rounded-lg hover:bg-[#23bdb8] transition-colors cursor-pointer"
                  >
                    <RiAddLine className="text-lg" />
                    Choose Video
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <video
                    src={videoPreview}
                    className="w-full h-48 object-cover rounded-lg"
                    controls
                  />
                  <button
                    type="button"
                    onClick={removeVideo}
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
                    <option value="1">Published</option>
                    <option value="0">Unpublished</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={formik.isSubmitting || courseLoading}
                className="w-full px-4 py-3 bg-[#D16655] text-white font-medium rounded-lg hover:bg-[#c05545] hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {formik.isSubmitting || courseLoading ? (
                  <>
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <RiAddLine className="text-lg" />
                    <span>Publish Course</span>
                  </>
                )}
              </button>
              
              <Link
                href="/admin/course"
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

export default AddCoursePage;

