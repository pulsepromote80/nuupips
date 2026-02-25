import { createSelector } from 'reselect';

const categoryState = (state) => state.category;

export const categoryData = createSelector(
    [categoryState],
    (category) => category.data || []
);

export const categoryLoading = createSelector(
    [categoryState],
    (category) => category.loading
);

export const categoryPagination = createSelector(
    [categoryState],
    (category) => category.pagination || { currentPage: 1, itemsPerPage: 10, totalItems: 0, totalPages: 0 }
);
