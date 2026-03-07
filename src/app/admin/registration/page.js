"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRegistration, addorUpdateCategory } from '@/app/redux/slices/authSlice';
import Table from '@/app/common/datatable';
import { Columns } from '@/app/constants/registration-constant';


const Registration = () => {
  const dispatch = useDispatch();
  const { UserData, loading } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Calculate pagination values
  const totalItems = UserData?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = UserData?.slice(startIndex, endIndex) || [];

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
    if (UserData && UserData.length > 0) {
      const maxPage = Math.ceil(UserData.length / itemsPerPage);
      if (currentPage > maxPage) {
        setCurrentPage(1);
      }
    }
  }, [UserData, itemsPerPage]);

  useEffect(() => {
    dispatch(getAllRegistration());
  }, [dispatch]);
   
  return (
    <div className="max-w-fullo bg-white px-4 rounded-lg">
        <>
          <Table
            columns={Columns}
            data={UserData}
            pagination={{
              currentPage,
              itemsPerPage,
              totalItems
            }}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            loading={loading}
            title={' All User Registration'}
          />
        </>
    </div>
  );
};

export default React.memo(Registration);