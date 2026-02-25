"use client";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from '@/app/redux/slices/categorySlice';
import Table from '@/app/common/datatable';
import { Columns } from '@/app/constants/comment-constant';
import { commentsData as commentsDataSelector, categoryLoading } from "./comment-selectors";

const Comment = () => {
  const dispatch = useDispatch();
  const loading = useSelector(categoryLoading);
  const commentsData = useSelector(commentsDataSelector);

  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);

  return (
    
    <div className="max-w-fullo bg-white px-4 rounded-lg">
        <div className="flex flex-col gap-1 mb-4 ">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mt-2">
          Comment
        </h1>
        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
          Manage and respond to your website Comment.
        </p>
      </div>
      {/* Comments Table */}
      <Table
        columns={Columns}
        data={commentsData}
        loading={loading}
        title={'Comments'}
      />
    </div>
  );
};

export default React.memo(Comment);