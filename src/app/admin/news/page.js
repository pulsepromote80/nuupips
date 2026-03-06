"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import {
  RiSearchLine,
  RiAddLine,
  RiEditLine,
  RiDeleteBinLine,
  RiEyeLine,
  RiImageLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiArticleLine,
  RiStarLine,
  RiVideoLine,
  RiCloseLine,
  RiLoader4Line,
  RiLayoutGridLine,
  RiListCheck,
} from "react-icons/ri";
import { useState } from "react";
import { fetchNews } from "@/app/services/news.service";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/navigation";

const News = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [deletePopup, setDeletePopup] = useState({ show: false, id: null });
  const [currentPage, setCurrentPage] = useState(1);
  const categoryData = useSelector((state) => state.courseCategory?.data || []);
  const [editModal, setEditModal] = useState({ show: false, course: null });
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: news,
    isLoading: loadingNews,
    error: newsError,
    refetch: newsRefetch,
  } = useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDeleteClick = (courseId) => {
    setDeletePopup({ show: true, id: courseId });
  };

  const handleEditClick = (course) => {
    router.push(`/admin/news/${course?.newsId}`);
  };
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const tableContainer = document.getElementById("course-table-container");
      if (tableContainer) {
        tableContainer.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleUpdateCourse = async (updatedData) => {
    try {
      setIsEditing(true);
      const result = await dispatch(updateCourse(updatedData)).unwrap();
      if (result.statusCode === 200) {
        toast.success(result.message || "Course updated successfully!");
        setEditModal({ show: false, course: null });
        dispatch(getActiveCourses());
      } else {
        toast.error(result.message || "Failed to update course");
      }
    } catch (error) {
      console?.error("Error updating course:", error);
      toast.error(error?.message || "Failed to update course");
    } finally {
      setIsEditing(false);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categoryData.find(
      (cat) => cat.courseCategoryId === categoryId,
    );
    return category?.courseCategoryName || "N/A";
  };

  const filteredNews = news?.filter(
    (course) =>
      course?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course?.categoryName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNews = filteredNews?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredNews?.length / itemsPerPage);

  return (
    <div>
      <div className="space-y-4 md:space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4">
          <div className="md:mb-2 mb-4">
            <h1 className="text-xl md:text-2xl font-bold text-[#2E4A5B] dark:text-white">
              News Management
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-0.5 md:mt-1">
              Manage your news and content
            </p>
          </div>
        </div>

        {/* Add Course Button */}
        <Link
          href="/admin/news/add"
          className="inline-flex items-center text-white justify-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 mb-3 md:py-2.5 bg-gradient-to-r from-[#D16655] to-[#BD7579] bg-[#29d2cc] font-medium rounded-lg md:rounded-xl text-sm hover:shadow-lg hover:shadow-[#D16655]/20 transition-all duration-300"
        >
          <RiAddLine className="text-base md:text-lg" />
          <span className="hidden sm:inline">Add New Course</span>
          <span className="">Add New News</span>
        </Link>

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-3 md:p-4 mb-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 md:pl-14 pr-4 py-2 md:py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg md:rounded-xl text-sm md:text-base text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#D16655] focus:ring-2 focus:ring-[#D16655]/20 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              {/* View Toggle - Desktop */}
              <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "table"
                      ? "bg-white dark:bg-gray-600 text-[#D16655] shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                  title="Table View"
                >
                  <RiListCheck className="text-lg" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-white dark:bg-gray-600 text-[#D16655] shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
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
                {showMobileFilters ? (
                  <RiCloseLine className="text-lg" />
                ) : (
                  <RiSearchLine className="text-lg" />
                )}
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
                  onClick={() => setViewMode("table")}
                  className={`flex-1 p-2 rounded-md text-sm transition-colors ${
                    viewMode === "table"
                      ? "bg-white dark:bg-gray-600 text-[#D16655] shadow-sm"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  <RiListCheck className="inline mr-1" /> Table
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex-1 p-2 rounded-md text-sm transition-colors ${
                    viewMode === "grid"
                      ? "bg-white dark:bg-gray-600 text-[#D16655] shadow-sm"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  <RiLayoutGridLine className="inline mr-1" /> Grid
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Content Section - Table or Grid View */}
        <div
          id="course-table-container"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
        >
          {/* Table View */}
          {viewMode === "table" ? (
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-4 py-3 text-[10px] md:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">
                      Actions
                    </th>
                    <th className="px-4 py-3 text-[10px] md:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-16">
                      Images
                    </th>
                    <th className="px-4 py-3 text-[10px] md:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-16">
                      Name
                    </th>
                    <th className="px-4 py-3 text-[10px] md:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-16">
                      Title
                    </th>
                    <th className="px-4 py-3 text-[10px] md:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-4 py-3 text-[10px] md:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {currentNews?.length > 0 ? (
                    currentNews?.map((course, index) => {
                      // Handle different possible field names from API
                      const courseData = {
                        id: index,
                        name: course.name || "-",
                        title:
                          course.title || course.Title || course.tittle || "-",
                        description:
                          course.description || course.Description || "-",
                        image: course.image || "",
                        video:
                          course.courseVideo ||
                          course.video ||
                          course.CourseVideo ||
                          course.Video ||
                          "",
                        CourseCategoryId:
                          course.categoryId ||
                          course.CategoryId ||
                          course.courseCategoryId ||
                          "",
                        categoryName:
                          course.categoryName ||
                          course.CategoryName ||
                          course.courseCategoryName ||
                          getCategoryName(course.categoryId) ||
                          "-",
                        rating: course.rating || course.Rating || 0,
                        noOfRating:
                          course.noOfRating ||
                          course.NoOfRating ||
                          course.noOfRatings ||
                          0,
                        status: course.status !== undefined ? course.status : 1,
                      };

                      return (
                        <tr
                          key={courseData.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                        >
                          <td
                            className="px-3 md:px-4 py-3 md:py-4 text-right"
                            data-label="Actions"
                          >
                            <div className="flex items-center justify-center gap-1 md:gap-2">
                              <button
                                onClick={() => handleEditClick(course)}
                                className="p-1.5 md:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-[#D16655] transition-colors"
                                title="Edit"
                              >
                                <RiEditLine className="text-sm md:text-base" />
                              </button>
                            </div>
                          </td>

                          <td
                            className="px-3 md:px-4 py-3 md:py-4"
                            data-label="Thumbnail"
                          >
                            <div className="max-w-[200px]">
                              {courseData.image ? (
                                <img
                                  src={courseData.image}
                                  alt="Course Thumbnail"
                                  className="w-full h-16 object-cover rounded"
                                />
                              ) : (
                                <div className="w-full h-16 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                                  <RiImageLine className="text-gray-400 text-xl" />
                                </div>
                              )}
                            </div>
                          </td>
                          <td
                            className="px-3 md:px-4 py-3 md:py-4"
                            data-label="Title"
                          >
                            <span
                              className="text-xs md:text-sm text-gray-600 dark:text-gray-300 truncate block max-w-[200px]"
                              title={courseData.title}
                            >
                              {courseData.name}
                            </span>
                          </td>
                          <td
                            className="px-3 md:px-4 py-3 md:py-4"
                            data-label="Title"
                          >
                            <span
                              className="text-xs md:text-sm text-gray-600 dark:text-gray-300 truncate block max-w-[200px]"
                              title={courseData.title}
                            >
                              {courseData.title}
                            </span>
                          </td>
                          <td
                            className="px-3 md:px-4 py-3 md:py-4"
                            data-label="Description"
                          >
                            <span
                              className="text-xs md:text-sm text-gray-600 dark:text-gray-300 truncate block max-w-[200px]"
                              title={courseData.description}
                            >
                              {courseData.description}
                            </span>
                          </td>

                          <td
                            className="px-3 md:px-4 py-3 md:py-4"
                            data-label="Status"
                          >
                            <span
                              className={`inline-flex px-2 py-1 rounded-full text-xs justify-center font-medium ${
                                courseData.status === 1 ||
                                courseData.status === "Active"
                                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                              }`}
                            >
                              {courseData.status === 1 ||
                              courseData.status === "Active"
                                ? "Active"
                                : "Inactive"}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-8 md:py-12 text-center"
                      >
                        <div className="flex flex-col items-center">
                          <RiArticleLine className="text-3xl md:text-4xl text-gray-300 dark:text-gray-600 mb-2" />
                          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
                            No courses found
                          </p>
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
                {currentNews.length > 0 ? (
                  currentNews.map((course, index) => {
                    // Handle different possible field names from API
                    const courseData = {
                      id: index,
                      name: course.name || "-",
                      title:
                        course.title || course.Title || course.tittle || "-",
                      description:
                        course.description || course.Description || "-",
                      image:
                        course.image || "/assets/img/blog/blog-img-1-1.jpg",
                      video:
                        course.courseVideo ||
                        course.video ||
                        course.CourseVideo ||
                        course.Video ||
                        "",
                      CourseCategoryId:
                        course.categoryId ||
                        course.CategoryId ||
                        course.courseCategoryId ||
                        "",
                      categoryName:
                        course.categoryName ||
                        course.CategoryName ||
                        course.courseCategoryName ||
                        getCategoryName(course.categoryId) ||
                        "-",
                      rating: course.rating || course.Rating || 0,
                      noOfRating:
                        course.noOfRating ||
                        course.NoOfRating ||
                        course.noOfRatings ||
                        0,
                      status: course.status !== undefined ? course.status : 1,
                    };

                    return (
                      <div
                        key={courseData.id}
                        className="bg-gray-50 dark:bg-gray-700/30 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="relative h-32 md:h-40">
                          <Image
                            src={courseData.image}
                            alt={courseData.image}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "/assets/img/blog/blog-img-1-1.jpg";
                            }}
                          />
                          <div className="absolute top-2 left-2">
                            <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-100 text-blue-700">
                              {courseData.categoryName}
                            </span>
                          </div>
                          <div className="absolute top-2 right-2">
                            <span
                              className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${
                                courseData.status === 1 ||
                                courseData.status === "published"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {courseData.status === 1 ? "Published" : "Draft"}
                            </span>
                          </div>
                        </div>
                        <div className="p-3">
                          <h3 className="text-sm font-medium text-gray-800 dark:text-white line-clamp-2 mb-2">
                            {courseData.title}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                            {courseData.description}
                          </p>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleEditClick(course)}
                              className="flex-1 p-1.5 text-center text-xs bg-[#29d2cc] text-white rounded hover:bg-[#c05545] transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteClick(courseData.courseId)
                              }
                              className="flex-1 p-1.5 text-center text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-full py-8 md:py-12 text-center">
                    <RiArticleLine className="text-4xl text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                    <p className="text-gray-500 dark:text-gray-400">
                      No courses found
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Pagination */}
          {filteredNews?.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 md:p-4 border-t border-gray-100 dark:border-gray-700">
              <div className="text-xs md:text-sm text-gray--400 text-center500 dark:text-gray sm:text-left order-2 sm:order-1">
                Showing{" "}
                <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredNews.length)}
                </span>{" "}
                of <span className="font-medium">{filteredNews.length}</span>{" "}
                entries
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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`min-w-[32px] md:min-w-[36px] h-8 md:h-9 px-1 md:px-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
                            currentPage === page
                              ? "bg-[#29d2cc] text-white"
                              : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    }
                    if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <span
                          key={page}
                          className="px-0.5 text-gray-400 text-xs"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  },
                )}

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

        {/* Delete Confirmation Modal */}
        {deletePopup.show && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  Confirm Delete
                </h3>
                <button
                  onClick={() => setDeletePopup({ show: false, id: null })}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"
                >
                  <RiCloseLine className="text-xl" />
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Are you sure you want to delete this course? This action cannot
                be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeletePopup({ show: false, id: null })}
                  className="flex-1 px-4 py-2.5 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 px-4 py-2.5 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Edit Course Modal */}
        {editModal.show && (
          <EditNewsModal
            course={editModal.course}
            onClose={() => setEditModal({ show: false, course: null })}
            onUpdate={handleUpdateCourse}
            isEditing={isEditing}
            categoryData={categoryData}
          />
        )}
      </div>
    </div>
  );
};

export default News;

function EditNewsModal({ course, onClose, onUpdate, isEditing, categoryData }) {
  // Handle different possible field names from API
  const getCourseField = (field, fallback = "") => {
    if (field === "title")
      return course.title || course.Title || course.tittle || "";
    if (field === "thumbnail")
      return (
        course.thumbnailImage ||
        course.thumbnail ||
        course.ThumbnailImage ||
        course.Thumbnail ||
        null
      );
    if (field === "video")
      return (
        course.courseVideo ||
        course.video ||
        course.CourseVideo ||
        course.Video ||
        null
      );
    if (field === "courseId")
      return course.courseId || course.id || course.CourseId || "";
    if (field === "categoryId")
      return (
        course.categoryId || course.CategoryId || course.courseCategoryId || ""
      );
    return course[field] || fallback;
  };

  const [formData, setFormData] = useState(() => {
    const thumb = getCourseField("thumbnail");
    const vid = getCourseField("video");
    return {
      courseId: getCourseField("courseId"),
      categoryId: getCourseField("categoryId"),
      title: getCourseField("title"),
      description: getCourseField("description", ""),
      rating: getCourseField("rating", ""),
      noOfRating: getCourseField("noOfRating", ""),
      status: course.status === 1 || course.status === "1" ? 1 : 0,
      thumbnail: thumb && thumb.startsWith("http") ? thumb : null,
      video: vid && vid.startsWith("http") ? vid : null,
      thumbnailFile: null,
      videoFile: null,
      isThumbnailChanged: false,
      isVideoChanged: false,
    };
  });

  const [thumbnailPreview, setThumbnailPreview] = useState(() => {
    const thumb = getCourseField("thumbnail");
    return thumb && thumb.startsWith("http") ? thumb : null;
  });

  const [videoPreview, setVideoPreview] = useState(() => {
    const vid = getCourseField("video");
    return vid && vid.startsWith("http") ? vid : null;
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "status") {
      setFormData((prev) => ({
        ...prev,
        [name]: parseInt(value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle thumbnail selection
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setThumbnailPreview(previewUrl);
      setFormData((prev) => ({
        ...prev,
        thumbnailFile: file,
        thumbnail: previewUrl,
        isThumbnailChanged: true,
      }));
    }
  };

  // Handle video selection
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setVideoPreview(previewUrl);
      setFormData((prev) => ({
        ...prev,
        videoFile: file,
        video: previewUrl,
        isVideoChanged: true,
      }));
    }
  };

  // Remove thumbnail
  const handleRemoveThumbnail = () => {
    setThumbnailPreview(null);
    setFormData((prev) => ({
      ...prev,
      thumbnailFile: null,
      thumbnail: null,
      isThumbnailChanged: true,
    }));
  };

  // Remove video
  const handleRemoveVideo = () => {
    setVideoPreview(null);
    setFormData((prev) => ({
      ...prev,
      videoFile: null,
      video: null,
      isVideoChanged: true,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Get current thumbnail and video from course using helper function
    const currentThumbnail = getCourseField("thumbnail");
    const currentVideo = getCourseField("video");
    formDataToSend.append("CourseId", formData.courseId);
    formDataToSend.append("CourseCategoryId", formData.categoryId);
    formDataToSend.append("Tittle", formData.title);
    formDataToSend.append("Description", formData.description);
    formDataToSend.append("Rating", formData.rating);
    formDataToSend.append("NoOfRating", formData.noOfRating);
    formDataToSend.append("UpdatedBy", course.createdBy);
    formDataToSend.append("Status", formData.status);

    // Thumbnail handling
    if (formData.isThumbnailChanged) {
      if (formData.thumbnailFile) {
        formDataToSend.append("ThumbnailImage", formData.thumbnailFile);
      } else {
        formDataToSend.append("ThumbnailImage", "");
      }
    } else {
      if (currentThumbnail) {
        formDataToSend.append("Thumbnail", currentThumbnail);
      }
    }

    // Video handling
    if (formData.isVideoChanged) {
      if (formData.videoFile) {
        formDataToSend.append("Video", formData.videoFile);
      } else {
        formDataToSend.append("CourseVideo", "");
      }
    } else {
      if (currentVideo) {
        formDataToSend.append("CourseVideo", currentVideo);
      }
    }

    onUpdate(formDataToSend);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 md:p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#2E4A5B] dark:text-white">
            Edit Course
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
          >
            <RiCloseLine className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 md:p-6">
          {/* Image and Video Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Thumbnail */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                News Image
              </label>
              <div className="flex flex-col items-start gap-3">
                <div className="w-full h-40 relative rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
                  {thumbnailPreview ? (
                    <>
                      <Image
                        src={thumbnailPreview}
                        alt="Course thumbnail"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveThumbnail}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        title="Remove thumbnail"
                      >
                        <RiCloseLine className="text-sm" />
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <RiImageLine className="text-3xl text-gray-400" />
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="course-thumbnail-input"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="hidden"
                />
                <label
                  htmlFor="course-thumbnail-input"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <RiAddLine />
                  {thumbnailPreview ? "Change Image" : "Upload Image"}
                </label>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Title */}
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
                  <option
                    key={cat.courseCategoryId}
                    value={cat.courseCategoryId}
                  >
                    {cat.courseCategoryName}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-white focus:outline-none focus:border-[#29d2cc] resize-none"
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
              className="flex-1 px-4 py-3 bg-[#29d2cc]  text-white font-medium rounded-lg hover:bg-[#c05545] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isEditing ? (
                <>
                  <RiLoader4Line className="animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Course"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
