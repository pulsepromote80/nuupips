import { createSelector } from 'reselect';

const categoryState = (state) => state.category;

export const commentsData = createSelector(
    [categoryState],
    (category) => category.commentsData || []
);
console.log("testt",commentsData)

export const categoryLoading = createSelector(
    [categoryState],
    (category) => category.loading
);
