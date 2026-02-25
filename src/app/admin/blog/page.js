"use client";

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import {
  RiSearchLine,
  RiAddLine,
  RiEditLine,
  RiDeleteBinLine,
  RiEyeLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiArticleLine,
  RiCalendarLine,
  RiThumbUpLine,
  RiMessage3Line,
  RiListCheck,
  RiLayoutGridLine,
  RiCloseLine,
  RiUserLine,
  RiTimeLine,
  RiLoader4Line
} from 'react-icons/ri';
import { getBlogs, updateUserBlog } from '@/app/redux/slices/blogSlice';
import { toast } from 'react-hot-toast';
import QuillEditor from '@/app/common/rich-text-editor';
import { getCategory } from '@/app/redux/slices/categorySlice';

// Category color mapping
const categoryColors = {
  primary: { bg: 'bg-blue-100', text: 'text-blue-700', darkBg: 'dark:bg-blue-900/30', darkText: 'dark:text-blue-400' },
  success: { bg: 'bg-green-100', text: 'text-green-700', darkBg: 'dark:bg-green-900/30', darkText: 'dark:text-green-400' },
  info: { bg: 'bg-cyan-100', text: 'text-cyan-700', darkBg: 'dark:bg-cyan-900/30', darkText: 'dark:text-cyan-400' },
  warning: { bg: 'bg-amber-100', text: 'text-amber-700', darkBg: 'dark:bg-amber-900/30', darkText: 'dark:text-amber-400' },
  danger: { bg: 'bg-red-100', text: 'text-red-700', darkBg: 'dark:bg-red-900/30', darkText: 'dark:text-red-400' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-700', darkBg: 'dark:bg-purple-900/30', darkText: 'dark:text-purple-400' }
};

export default function BlogAdminPage() {
  const dispatch = useDispatch();
  const { data: blogPosts, loading } = useSelector((state) => state.blog);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [deletePopup, setDeletePopup] = useState({ show: false, id: null });
  const [editModal, setEditModal] = useState({ show: false, blog: null });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch blogs on mount
  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter posts based on search
  const filteredPosts = blogPosts.filter(post =>
    post?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post?.createdBy?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post?.metaTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post?.metaDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post?.createdDate?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of table on page change
      const tableContainer = document.getElementById('blog-table-container');
      if (tableContainer) {
        tableContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPosts(currentPosts.map(post => post.id));
    } else {
      setSelectedPosts([]);
    }
  };

  const handleSelectPost = (id) => {
    setSelectedPosts(prev =>
      prev.includes(id)
        ? prev.filter(postId => postId !== id)
        : [...prev, id]
    );
  };


  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Handle edit click
  const handleEditClick = (blog) => {
    setEditModal({ show: true, blog: blog });
  };

  const handleUpdateBlog = async (updatedData) => {
    try {
      setIsEditing(true);

      const result = await dispatch(updateUserBlog(updatedData)).unwrap();

      if (result.statusCode === 200) {
        toast.success(result.message || 'Blog updated successfully!');
        setEditModal({ show: false, blog: null });
        dispatch(getBlogs());
      } else {
        toast.error(result.message || 'Failed to update blog');
      }
    } catch (error) {
      console?.error('Error updating blog:', error);
      toast.error(error?.message || 'Failed to update blog');
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4">
        <div className='md:mb-2 mb-4'>
          <h1 className="text-xl md:text-2xl font-bold text-[#2E4A5B] dark:text-white">Blog Management</h1>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-0.5 md:mt-1">Manage your blog posts and articles</p>
        </div>


      </div>

      <Link
        href="/admin/blog/add"
        className="inline-flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 mb-3 md:py-2.5 bg-gradient-to-r from-[#D16655] to-[#BD7579] font-medium rounded-lg md:rounded-xl text-sm hover:shadow-lg hover:shadow-[#D16655]/20 transition-all duration-300"
      >
        <RiAddLine className="text-base md:text-lg" />
        <span className="hidden sm:inline">Add New Blog</span>
        <span className="bg-black text-white p-2">Add Blog</span>
      </Link>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 md:gap-4 mb-4">

        {/* Total Posts */}
        <div className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl p-3 md:p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <RiArticleLine className="text-base md:text-lg text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0">
              <p className="text-lg md:text-xl font-bold text-[#2E4A5B] dark:text-white truncate">
                {blogPosts.length}
              </p>
              <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                Total Posts
              </p>
            </div>
          </div>
        </div>

        {/* Read Time */}
        <div className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl p-3 md:p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
              <RiTimeLine className="text-base md:text-lg text-green-600 dark:text-green-400" />
            </div>
            <div className="min-w-0">
              <p className="text-lg md:text-xl font-bold text-[#2E4A5B] dark:text-white truncate">
                {blogPosts.reduce((acc, post) => acc + (post?.readTime || 0), 0)}
              </p>
              <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                Total Read Time
              </p>
            </div>
          </div>
        </div>

        {/* Published */}
        <div className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl p-3 md:p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <RiThumbUpLine className="text-base md:text-lg text-purple-600 dark:text-purple-400" />
            </div>
            <div className="min-w-0">
              <p className="text-lg md:text-xl font-bold text-[#2E4A5B] dark:text-white truncate">
                {blogPosts?.filter(post => post?.status === 1)?.length}
              </p>
              <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                Published
              </p>
            </div>
          </div>
        </div>

        {/* Draft */}
        <div className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl p-3 md:p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
              <RiMessage3Line className="text-base md:text-lg text-amber-600 dark:text-amber-400" />
            </div>
            <div className="min-w-0">
              <p className="text-lg md:text-xl font-bold text-[#2E4A5B] dark:text-white truncate">
                {blogPosts?.filter(post => post?.status === 0).length}
              </p>
              <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                Draft
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-3 md:p-4 mb-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 md:pl-10 pr-4 py-2 md:py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg md:rounded-xl text-sm md:text-base text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#D16655] focus:ring-2 focus:ring-[#D16655]/20 transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* View Toggle - Desktop */}
            <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'table'
                  ? 'bg-white dark:bg-gray-600 text-[#D16655] shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                title="Table View"
              >
                <RiListCheck className="text-lg" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid'
                  ? 'bg-white dark:bg-gray-600 text-[#D16655] shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                title="Grid View"
              >
                <RiLayoutGridLine className="text-lg" />
              </button>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="md:hidden p-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400"
            >
              {showMobileFilters ? <RiCloseLine className="text-lg" /> : <RiSearchLine className="text-lg" />}
            </button>

            {/* Items Per Page */}
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="px-3 md:px-4 py-2 md:py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm md:text-base text-gray-800 dark:text-white focus:outline-none focus:border-[#D16655] transition-all"
            >
              <option value={5}>5/page</option>
              <option value={10}>10/page</option>
              <option value={25}>25/page</option>
              <option value={50}>50/page</option>
            </select>
          </div>
        </div>

        {/* Mobile Filter Dropdown */}
        {showMobileFilters && (
          <div className="md:hidden mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`flex-1 p-2 rounded-md text-sm transition-colors ${viewMode === 'table'
                  ? 'bg-white dark:bg-gray-600 text-[#D16655] shadow-sm'
                  : 'text-gray-500 dark:text-gray-400'
                  }`}
              >
                <RiListCheck className="inline mr-1" /> Table
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 p-2 rounded-md text-sm transition-colors ${viewMode === 'grid'
                  ? 'bg-white dark:bg-gray-600 text-[#D16655] shadow-sm'
                  : 'text-gray-500 dark:text-gray-400'
                  }`}
              >
                <RiLayoutGridLine className="inline mr-1" /> Grid
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Content Section - Table or Grid View */}
      <div id="blog-table-container" className="bg-white dark:bg-gray-800  rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Table View */}
        {viewMode === 'table' ? (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  {/* <th className="px-3 md:px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedPosts.length === currentPosts.length && currentPosts.length > 0}
                      className="w-4 h-4 rounded border-gray-300 text-[#D16655] focus:ring-[#D16655]"status
                    />
                  </th> */}
                  <th className="px-4 py-3 text-[10px] md:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">  Action</th>
                  <th className="px-4 py-3 text-[10px] md:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-16">Post</th>
                  <th className="px-4 py-3 text-[10px] md:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"> Read Time</th>
                  <th className="px-4 py-3 text-[10px] md:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Created Date</th>
                  <th className="px-4 py-3 text-[10px] md:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Created By</th>
                  {/* <th className="px-4 py-3 text-[10px] md:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th> */}
                  <th className="px-4 py-3 text-[10px] md:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">  Meta Title</th>
                  <th className="px-4 py-3 text-[10px] md:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">  Meta Keyword</th>
                  <th className="px-4 py-3 text-[10px] md:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">  Canonical</th>
                  <th className="px-4 py-3 text-[10px] md:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">  Meta Desc</th>
                  <th className="px-4 py-3 text-[10px] md:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">  Total View</th>

                  <th className="px-4 py-3 text-[10px] md:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">  Status</th>

                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {currentPosts.length > 0 ? (
                  currentPosts.map((post, index) => {
                    const blogData = {
                      id: index,
                      blogId: post.blogId || post.id,
                      title: post.title || post.tittle || '-',
                      image: post.image || '',
                      date: post.createdDate || post.date || '-',
                      readTime: post.readTime || 0,
                      createdDate: post.createdDate || '-',
                      createdBy: post.createdBy || '-',
                      status: post.status !== undefined ? post.status : 1,
                      metaTitle: post.metaTitle || '-',
                      canonical: post.canonical || '-',
                      metaKeyWord: post.metaKeyWord || '-',
                      metaDescription: post.metaDescription || '-',
                      views: post.totalView || 0,
                      likes: post.likes || 0,
                      comments: post.comments || 0,
                      category: post.metaKeyWord || '-',
                      author: post.createdBy || '-'
                    };

                    return (
                      <tr key={blogData.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                        {/* <td className="px-3 md:px-4 py-3 md:py-4" data-label="Select">
                          <input
                            type="checkbox"
                            checked={selectedPosts.includes(blogData.id)}
                            onChange={() => handleSelectPost(blogData.id)}
                            className="w-4 h-4 rounded border-gray-300 text-[#D16655] focus:ring-[#D16655]"
                          />
                        </td> */}
                        <td className="px-3 md:px-4 py-3 md:py-4 text-right" data-label="Actions">
                          <div className="flex items-center justify-end gap-2 md:gap-1 ">
                            <Link
                              href={`/pages/blog/${blogData.blogId}`}
                              target="_blank"
                              className="p-1.5 md:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-[#D16655] transition-colors"
                              title="View"
                            >
                              <RiEyeLine className="text-sm md:text-base" />
                            </Link>
                            <button
                              onClick={() => handleEditClick(post)}
                              className="p-1.5 md:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-[#D16655] transition-colors"
                              title="Edit"
                            >
                              <RiEditLine className="text-sm md:text-base" />
                            </button>
                            {/* <button
                              className="p-1.5 md:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
                              title="Delete"
                            >
                              <RiDeleteBinLine className="text-sm md:text-base" />
                            </button> */}
                          </div>
                        </td>
                        <td className="px-3 md:px-4 py-3 md:py-4" data-label="Post">
                          <div className="flex items-center gap-2 md:gap-3">
                            <div className="w-12 md:w-16 h-10 md:h-12 relative rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-700">
                              {blogData.image ? (
                                <Image
                                  src={blogData.image}
                                  alt={blogData.title || 'Blog image'}
                                  fill
                                  className="object-cover"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/fallback-image.jpg';
                                  }}
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <RiArticleLine className="text-gray-400 text-xl" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs md:text-sm font-medium text-gray-800 dark:text-white truncate max-w-[120px] md:max-w-[200px] lg:max-w-[300px]">
                                {blogData.title}
                              </p>
                              <div className="flex items-center gap-1 mt-0.5">
                                <span className="flex items-center gap-0.5 text-[10px] md:text-xs text-gray-500 dark:text-gray-400">
                                  <RiCalendarLine className="text-[8px] md:text-xs" />
                                  {blogData.date}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 md:px-4 py-3 md:py-4 " data-label="Read Time">
                          <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                            {blogData.readTime ? `${blogData.readTime} min` : '-'}
                          </span>
                        </td>
                        <td className="px-3 md:px-4 py-3 md:py-4" data-label="Created Date">
                          <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                            {blogData.createdDate}
                          </span>
                        </td>
                        <td className="px-3 md:px-4 py-3 md:py-4" data-label="Created By">
                          <div className="flex items-center gap-2">
                            <div className="w-6 md:w-7 h-6 md:h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-[10px] md:text-xs font-medium text-white">
                              {blogData.createdBy ? blogData.createdBy.charAt(0) : 'U'}
                            </div>
                            <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300 ">
                              {blogData.createdBy}
                            </span>
                          </div>
                        </td>
                        {/* <td className="px-3 md:px-4 py-3 md:py-4 hidden sm:table-cell" data-label="Status">
                          <span className={`inline-flex px-2 md:px-2.5 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium ${blogData.status === 1 || blogData.status === 'published' || blogData.status === 1
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                            }`}>
                            {blogData.status === 1 ? 'Published' : blogData.status === 0 ? 'Draft' : blogData.status || 'N/A'}
                          </span>
                        </td> */}
                        <td className="px-3 md:px-4 py-3 md:py-4 " data-label="Meta Title">
                          <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300 truncate block max-w-[150px]" title={blogData.metaTitle}>
                            {blogData.metaTitle}
                          </span>
                        </td>
                        <td className="px-3 md:px-4 py-3 md:py-4 " data-label="Meta Title">
                          <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300 truncate block max-w-[150px]" title={blogData.metaTitle}>
                            {blogData.metaKeyWord}
                          </span>
                        </td>
                        <td className="px-3 md:px-4 py-3 md:py-4 " data-label="Meta Title">
                          <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300 truncate block max-w-[150px]" title={blogData.metaTitle}>
                            {blogData.canonical}
                          </span>
                        </td>
                        <td className="px-3 md:px-4 py-3 md:py-4 " data-label="Meta Description">
                          <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300 truncate block max-w-[150px]" title={blogData.metaDescription}>
                            {blogData.metaDescription}
                          </span>
                        </td>

                        <td className="px-3 md:px-4 py-3 md:py-4 " data-label="Meta Description">
                          <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300 truncate block max-w-[150px]" title={blogData.metaDescription}>
                            {blogData.views}
                          </span>
                        </td>





                        <td className="px-3 md:px-4 py-3 md:py-4" data-label="Status">
                          <span
                            className={`text-xs md:text-sm font-medium truncate block max-w-[150px] ${blogData.status === "Publish"
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                              }`}
                            title={blogData.status}
                          >
                            {blogData.status}
                          </span>
                        </td>

                      </tr>

                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={10} className="px-4 py-8 md:py-12 text-center">
                      <div className="flex flex-col items-center">
                        <RiArticleLine className="text-3xl md:text-4xl text-gray-300 dark:text-gray-600 mb-2" />
                        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">No blog posts found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        ) : (
          /* Grid View (Card Layout) */
          <div className="p-3 md:p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
              {currentPosts.length > 0 ? (
                currentPosts.map((post, index) => {
                  // Map API fields to table fields
                  const blogData = {
                    id: index,
                    blogId: post.blogId || post.id,
                    title: post.title || post.tittle || '-',
                    image: post.image || '/assets/img/blog/blog-img-1-1.jpg',
                    date: post.createdDate || post.date || '-',
                    readTime: post.readTime || 0,
                    createdDate: post.createdDate || '-',
                    createdBy: post.createdBy || '-',
                    status: post.status !== undefined ? post.status : 1,
                    metaTitle: post.metaTitle || '-',
                    metaDescription: post.metaDescription || '-',
                    views: post.views || 0,
                    likes: post.likes || 0,
                    comments: post.comments || 0,
                    category: post.metaKeyWord || '-',
                    author: post.createdBy || '-'
                  };

                  const colors = categoryColors[post.categoryColor] || categoryColors.primary;
                  return (
                    <div key={blogData.id} className="bg-gray-50 dark:bg-gray-700/30 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative h-32 md:h-40">
                        <Image
                          src={blogData.image}
                          alt={blogData.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${colors.bg} ${colors.text}`}>
                            {blogData.category}
                          </span>
                        </div>
                        <div className="absolute top-2 right-2">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${blogData.status === 1 || blogData.status === 'published'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                            }`}>
                            {blogData.status === 1 ? 'Published' : 'Draft'}
                          </span>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="text-sm font-medium text-gray-800 dark:text-white line-clamp-2 mb-2">
                          {blogData.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-[10px] font-medium text-white">
                            {blogData.author.charAt(0)}
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{blogData.author}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                          <span className="flex items-center gap-1">
                            <RiEyeLine /> {blogData.views.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <RiThumbUpLine /> {blogData.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <RiMessage3Line /> {blogData.comments}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Link
                            href={`/pages/blog/${blogData.blogId}`}
                            target="_blank"
                            className="flex-1 p-1.5 text-center text-xs bg-gray-200 dark:bg-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => handleEditClick(post)}
                            className="flex-1 p-1.5 text-center text-xs bg-[#D16655] text-white rounded hover:bg-[#c05545] transition-colors"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full py-8 md:py-12 text-center">
                  <RiArticleLine className="text-4xl text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                  <p className="text-gray-500 dark:text-gray-400">No blog posts found</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Pagination */}
        {filteredPosts.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 md:p-4 border-t border-gray-100 dark:border-gray-700">
            <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left order-2 sm:order-1">
              Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to <span className="font-medium">{Math.min(indexOfLastItem, filteredPosts.length)}</span> of <span className="font-medium">{filteredPosts.length}</span> entries
            </div>
            <div className="flex items-center gap-1 order-1 sm:order-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1.5 md:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <RiArrowLeftSLine className="text-lg md:text-xl" />
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`min-w-[32px] md:min-w-[36px] h-8 md:h-9 px-1 md:px-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${currentPage === page
                        ? 'bg-[#D16655] text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}
                    >
                      {page}
                    </button>
                  );
                }
                if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <span key={page} className="px-0.5 text-gray-400 text-xs">
                      ...
                    </span>
                  );
                }
                return null;
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1.5 md:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <RiArrowRightSLine className="text-lg md:text-xl" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Blog Modal */}
      {editModal.show && (
        <EditBlogModal
          blog={editModal.blog}
          onClose={() => setEditModal({ show: false, blog: null })}
          onUpdate={handleUpdateBlog}
          isEditing={isEditing}
        />
      )}
    </div>
  );
}

function EditBlogModal({ blog, onClose, onUpdate, isEditing }) {

  const dispatch = useDispatch();
  const categoryData = useSelector((state) => state.category?.data || []);

  const [formData, setFormData] = useState({
    blogId: blog.blogId || blog.id,
    categoryId: blog.categoryId || '',
    title: blog.title || blog.tittle || '',
    description: blog.description || '',
    readTime: blog.readTime || '',
    status: blog.status === 1 || blog.status === '1' ? 1 : 0,
    metaKeyWord: blog.metaKeyWord || '',
    metaDescription: blog.metaDescription || '',
    metaTitle: blog.metaTitle || '',
    canonical: blog.canonical || '',
    updatedBy: '5ac7b226-6e37-4aa0-92af-4b9985b0a3b0',
    image: blog.image || null, // Existing image URL
    categoryName: blog.categoryName,
    imageFile: null, // New image file
    isImageChanged: false // 👈 NEW FLAG - initially false
  });

  console.log("Form Data:", formData);

  const [imagePreview, setImagePreview] = useState(blog.image || null);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  // Handle input changes
  const handleChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;

      // Special handling for status to convert to number
      if (name === 'status') {
        setFormData(prev => ({
          ...prev,
          [name]: parseInt(value) // "1" → 1, "0" → 0
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else {
      // Quill editor change
      setFormData(prev => ({ ...prev, description: e }));
    }
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setFormData(prev => ({
        ...prev,
        imageFile: file,
        image: previewUrl, // Preview for display
        isImageChanged: true // 👈 Image changed
      }));
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData(prev => ({
      ...prev,
      imageFile: null,
      image: null,
      isImageChanged: true
    }));
    const fileInput = document.getElementById('blog-image-input');
    if (fileInput) fileInput.value = '';
  };

  // HTML to plain text converter
  const stripHtml = (html) => {
    if (!html) return '';
    if (typeof window !== 'undefined') {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || "";
    }
    return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();
  };

  // Handle form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Create FormData for API
  //   const formDataToSend = new FormData();

  //   // Convert HTML to plain text for API
  //   const plainTextDescription = stripHtml(formData.description);

  //   // Append all fields
  //   formDataToSend.append('BlogId', formData.blogId);
  //   formDataToSend.append('CategoryId', formData.categoryId);
  //   formDataToSend.append('Tittle', formData.title);
  //   formDataToSend.append('Description', plainTextDescription);
  //   formDataToSend.append('ReadTime', formData.readTime);
  //   formDataToSend.append('UpdatedBy', formData.updatedBy);
  //   formDataToSend.append('Status', formData.status);
  //   formDataToSend.append('MetaKeyWord', formData.metaKeyWord);
  //   formDataToSend.append('MetaDescription', formData.metaDescription);
  //   formDataToSend.append('MetaTitle', formData.metaTitle);
  //   formDataToSend.append('Canonical', formData.canonical);

  //   // 👇 FIXED IMAGE HANDLING
  //   if (formData.isImageChanged) {
  //     // User changed the image
  //     if (formData.imageFile) {
  //       // New image selected - send the file
  //       formDataToSend.append('Image', formData.imageFile);
  //       console.log('Sending new image file');
  //     } else {
  //       // Image was removed - send empty string
  //       formDataToSend.append('Image', '');
  //       console.log('Image removed');
  //     }
  //   } else {
  //     // User did NOT change the image - send ORIGINAL blog.image
  //     if (blog.image) {
  //       formDataToSend.append('Image', blog.image); // 👈 Original URL
  //       console.log('Keeping original image:', blog.image);
  //     } else {
  //       formDataToSend.append('Image', '');
  //       console.log('No original image');
  //     }
  //   }

  //   console.log('isImageChanged:', formData.isImageChanged);
  //   console.log('Sending plain text description:', plainTextDescription);
  //   console.log('Status value:', formData.status);

  //   onUpdate(formDataToSend);
  // };
  // EditBlogModal में handleSubmit फंक्शन
  // handleSubmit function में
  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // सभी fields ऐड करो
    formDataToSend.append('BlogId', formData.blogId);
    formDataToSend.append('CategoryId', formData.categoryId);
    formDataToSend.append('Tittle', formData.title);
    formDataToSend.append('Description', stripHtml(formData.description));
    formDataToSend.append('ReadTime', formData.readTime);
    formDataToSend.append('UpdatedBy', formData.updatedBy);
    formDataToSend.append('Status', formData.status);
    formDataToSend.append('MetaKeyWord', formData.metaKeyWord);
    formDataToSend.append('MetaDescription', formData.metaDescription);
    formDataToSend.append('MetaTitle', formData.metaTitle);
    formDataToSend.append('Canonical', formData.canonical);

    // Image handling
    if (formData.isImageChanged) {
      if (formData.imageFile) {
        // नई image file
        formDataToSend.append('Image', formData.imageFile);
      } else {
        // Image removed
        formDataToSend.append('Image', '');
      }
    } else {
      // पुरानी image URL
      if (blog.image) {
        formDataToSend.append('Image', blog.image);
      }
    }

    onUpdate(formDataToSend);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 md:p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#2E4A5B] dark:text-white">Edit Blog</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
          >
            <RiCloseLine className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 md:p-6">
          {/* Image Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Blog Image
            </label>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="w-full sm:w-48 h-32 relative rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
                {imagePreview ? (
                  <>
                    <Image
                      src={imagePreview}
                      alt="Blog preview"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      title="Remove image"
                    >
                      <RiCloseLine className="text-sm" />
                    </button>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <RiArticleLine className="text-3xl text-gray-400" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  id="blog-image-input"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="blog-image-input"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <RiAddLine />
                  {imagePreview ? 'Change Image' : 'Upload Image'}
                </label>
                {formData.keepExistingImage && formData.image && !formData.imageFile && (
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                    ✓ Current image will be preserved
                  </p>
                )}
                {formData.imageFile && (
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                    New image selected
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Two column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Title - Full width */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-white focus:outline-none focus:border-[#29d2cc]"
              />
            </div>

            {/* Category Dropdown */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-white focus:outline-none focus:border-[#29d2cc]"
              >
                <option value="">Select Category</option>
                {categoryData.map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            </div>

            {/* Read Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Read Time <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="readTime"
                value={formData.readTime}
                onChange={handleChange}
                required
                placeholder="e.g., 5"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-white focus:outline-none focus:border-[#29d2cc]"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status.toString()}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-white focus:outline-none focus:border-[#29d2cc]"
              >
                <option value="1">Published</option>
                <option value="0">Unpublished</option>
              </select>
            </div>

            {/* Meta Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Meta Title
              </label>
              <input
                type="text"
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-white focus:outline-none focus:border-[#29d2cc]"
              />
            </div>

            {/* Meta Keywords */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Meta Keywords
              </label>
              <input
                type="text"
                name="metaKeyWord"
                value={formData.metaKeyWord}
                onChange={handleChange}
                placeholder="keyword1, keyword2, keyword3"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-white focus:outline-none focus:border-[#29d2cc]"
              />
            </div>

            {/* Canonical URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Canonical URL
              </label>
              <input
                type="text"
                name="canonical"
                value={formData.canonical}
                onChange={handleChange}
                placeholder="https://example.com/canonical-url"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-white focus:outline-none focus:border-[#29d2cc]"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
              <QuillEditor
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                height={250}
              />
            </div>
          </div>

          {/* Meta Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Meta Description
            </label>
            <textarea
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-white focus:outline-none focus:border-[#29d2cc] resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isEditing}
              className="flex-1 px-4 py-3 bg-[#D16655] text-white font-medium rounded-lg hover:bg-[#c05545] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isEditing ? (
                <>
                  <RiLoader4Line className="animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Blog'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}