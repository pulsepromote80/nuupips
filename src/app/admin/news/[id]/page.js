"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import Link from "next/link";
import {
  RiArrowLeftSLine,
  RiImageLine,
  RiCloseLine,
  RiAddLine,
} from "react-icons/ri";
import { toast } from "react-hot-toast";
import { getNewsById, updateNews } from "@/app/redux/slices/blogSlice";
import QuillEditor from "@/app/common/rich-text-editor";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});
const getUserData = () => {
  if (typeof window === "undefined") return null;
  const userData = localStorage.getItem("currentUser");
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  }
  return null;
};
const EditNews = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { editNewsData, newsEditLoading, newsEditerror } = useSelector(
    (state) => state?.blog || [],
  );
  const params = useParams();

  const newsId = params.id;

  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);
  const userData = useMemo(() => getUserData(), []);
  const userId = userData?.adminUserId || "";
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      status: "1",
    },
    validationSchema,
    enableReinitialize: true,

    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        formData.append("NewsId", newsId);
        formData.append("Tittle", values.title);
        formData.append("Description", values.description);
        formData.append("CreatedBy", userId); // hardcoded
        formData.append("Status", Number(values.status));

        if (thumbnail) {
          formData.append("image", thumbnail);
        }

        const result = await dispatch(updateNews(formData)).unwrap();

        toast.success(result.message || "News Updated Successfully");

        router.push("/admin/news");
      } catch (error) {
        toast.error(error?.message || "Update failed");
      }
    },
  });

  // Fetch news by id
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await dispatch(getNewsById(newsId)).unwrap();

        const data = res?.data?.[0];
        formik.setValues({
          title: data?.tittle || "",
          description: data?.description || "",
          status: String(data?.statusCode ?? 1),
        });

        setPreview(data?.image);
      } catch {
        toast.error("Failed to load news");
      }
    };

    if (newsId) fetchNews();
  }, [newsId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setThumbnail(null);
    setPreview(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/admin/news" className="p-2 rounded-lg hover:bg-gray-100">
          <RiArrowLeftSLine className="text-xl" />
        </Link>

        <div>
          <h1 className="text-xl font-bold text-[#2E4A5B]">Edit News</h1>
          <p className="text-sm text-gray-500">Update existing news</p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Left */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border">
          {/* Title */}
          <div className="mb-4">
            <label className="text-sm font-medium">Title *</label>

            <input
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              className="w-full mt-2 px-4 py-2 border rounded-lg"
            />

            {formik.errors.title && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Description *</label>

            <QuillEditor
              name="description"
              value={formik.values.description}
              // onChange={formik.handleChange}
              onChange={(content) => {
                formik.setFieldValue("description", content);
              }}
              required
              height={250}
            />

            {formik.errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.description}
              </p>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          {/* Image */}
          <div className="bg-white rounded-xl p-6 border">
            <h2 className="font-semibold mb-4">News Image</h2>

            {!preview ? (
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <RiImageLine className="text-4xl text-gray-400 mx-auto mb-3" />

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="upload"
                />

                <label
                  htmlFor="upload"
                  className="cursor-pointer inline-flex items-center gap-2 bg-[#29d2cc] text-white px-4 py-2 rounded-lg"
                >
                  <RiAddLine />
                  Upload Image
                </label>
              </div>
            ) : (
              <div className="relative">
                <Image
                  src={preview}
                  alt="preview"
                  width={400}
                  height={200}
                  className="rounded-lg object-cover"
                />

                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                >
                  <RiCloseLine />
                </button>
              </div>
            )}
          </div>

          {/* Status Checkbox */}
          {/* <div className="bg-white rounded-xl p-6 border"> */}
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={formik.values.status === "1"}
                onChange={(e) =>
                  formik.setFieldValue("status", e.target.checked ? "1" : "0")
                }
                className="w-5 h-5"
              />

              <span className="text-sm font-medium">
                {formik.values.status === "1" ? "Published" : "Unpublished"}
              </span>
            </label>
          {/* </div> */}

          {/* Buttons */}
          <div className="space-y-3">
            <button
              type="submit"
              className="w-full bg-[#29d2cc] text-white py-3 rounded-lg"
            >
              Update News
            </button>

            <Link
              href="/admin/news"
              className="block text-center bg-gray-500 text-white py-3 rounded-lg"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditNews;
