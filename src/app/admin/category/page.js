"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, addorUpdateCategory } from '@/app/redux/slices/categorySlice';
import Table from '@/app/common/datatable';
import { Columns } from '@/app/constants/category-constant';
import { toast } from 'react-hot-toast';
import { categoryData, categoryLoading } from "./category-selectors";
import DeletePopup from '@/app/common/utils/delete-popup';
import { limitToCharacters, validateRequiredField } from '@/app/common/utils/validationHelpers';

const Category = () => {
  const dispatch = useDispatch();
  const loading = useSelector(categoryLoading);
  const data = useSelector(categoryData);
  const [name, setName] = useState('');
  const [active, setActive] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [currentCategoryStatus, setCurrentCategoryStatus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Calculate pagination values
  const totalItems = data?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data?.slice(startIndex, endIndex) || [];

  // Pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (count) => {
    setItemsPerPage(count);
    setCurrentPage(1); 
  };

  // Reset pagination when data changes
  useEffect(() => {
    if (data && data.length > 0) {
      const maxPage = Math.ceil(data.length / itemsPerPage);
      if (currentPage > maxPage) {
        setCurrentPage(1);
      }
    }
  }, [data, itemsPerPage]);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const resetForm = useCallback(() => {
    setName('');
    setActive(false);
    setEditMode(false);
    setEditCategoryId(null);
    setShowForm(false);
    setErrors({});
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const limitedName = limitToCharacters(name);
    const nameError = validateRequiredField(limitedName, "Category Name");
    if (nameError) newErrors.name = nameError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const categoryData = {
      id: editMode ? editCategoryId : 0,  
      categoryName: name,
      status: active ? 1 : 0,  
      createdBy: "5ac7b226-6e37-4aa0-92af-4b9985b0a3b0"
    };

   

    try {
      const response = await dispatch(addorUpdateCategory(categoryData)).unwrap();

      if (response.statusCode === 200) toast.success(response.message);
      else if (response.statusCode === 417) toast.warn(response.message);
      else toast.error(response.message);

      resetForm();
      dispatch(getCategory());
    } catch (error) {
      console.error("Error during category submit:", error);
      toast.error(error?.message || "Failed to process request.");
    }
  };

  const handleEdit = (category, index) => {
    setEditCategoryId(category.id || index + 1); 
    setName(category.categoryName || '');
    setActive(category.status === "Active" || category.status === 1);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = (category, index) => {
    setCategoryToDelete(category.categoryName);
    setEditCategoryId(category.id || index + 1);
    setCurrentCategoryStatus(category.status === "Active" ? 0 : 1);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    const categoryData = {
      id: editCategoryId,
      categoryName: categoryToDelete,
      status: currentCategoryStatus,
      createdBy: "5ac7b226-6e37-4aa0-92af-4b9985b0a3b0"
    };

    try {
      const res = await dispatch(addorUpdateCategory(categoryData)).unwrap();
      if (res.statusCode === 200) toast.success(res.message);
      else toast.error(res.message);
      dispatch(getCategory());
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Failed to delete category");
    } finally {
      setShowDeletePopup(false);
      setCategoryToDelete(null);
    }
  };

  const formTitle = editMode ? "Edit Category" : "Add Category";
  const submitButtonText = loading ? (editMode ? "Updating..." : "Adding...") : (editMode ? "Update" : "Submit");

  return (
    <div className="max-w-fullo bg-white px-4 rounded-lg">
      {/* Add Category Button */}
      <div className="rounded-md pb-4">
        {!showForm && (
          <button
            onClick={() => {
              setShowForm(true);
              setEditMode(false);
              setName('');
              setActive(false);
            }}
            className="px-4 py-2 mx-auto mt-3 text-white rounded-md bg-add-btn md:mx-0"
          >
            + Add Category
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="mb-4 font-bold text-left text-black">{formTitle}</h2>
          <label className="block font-medium">Category Name</label>
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => {
              const newName = limitToCharacters(e.target.value); 
              setName(newName);
              if (errors.name) {
                setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
              }
            }}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          
          {editMode && (
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                className="w-5 h-5 mr-2"
              />
              <label className="text-sm font-medium text-gray-700 m-0">
                {active ? 'Active' : 'Deactivated'}
              </label>
            </div>
          )}



          <div className="flex gap-2" style={{marginTop:"18px"}}>
            <button
              type="submit"
              className="px-4 py-2 text-white rounded-md bg-submit-btn hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              disabled={loading}
            >
              {submitButtonText}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 text-white rounded-md bg-cancel-btn hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Category Table */}
      {!showForm && (
        <>
          <Table
            columns={Columns}
            data={data}
            pagination={{
              currentPage,
              itemsPerPage,
              totalItems
            }}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loading}
            title={'Category'}
          />
        </>
      )}

      <DeletePopup
        show={showDeletePopup}
        type="category"
        name={categoryToDelete}
        onCancel={() => setShowDeletePopup(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default React.memo(Category);