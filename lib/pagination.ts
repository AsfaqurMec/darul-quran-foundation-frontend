import { PaginationInfo } from '../types/pagination';

export const ensurePagination = (
  pagination: PaginationInfo | undefined,
  dataLength: number,
  page?: number,
  limit?: number
): PaginationInfo => {
  const fallbackLimit = limit && limit > 0 ? limit : dataLength || 10;
  const fallbackTotalItems = dataLength;
  const fallbackTotalPages = Math.max(1, Math.ceil(Math.max(fallbackTotalItems, 1) / fallbackLimit));
  const fallbackPage = page ?? 1;

  if (pagination) {
    return {
      currentPage: pagination.currentPage ?? fallbackPage,
      totalPages: Math.max(1, pagination.totalPages ?? fallbackTotalPages),
      totalItems: pagination.totalItems ?? fallbackTotalItems,
      itemsPerPage: pagination.itemsPerPage ?? fallbackLimit,
    };
  }

  return {
    currentPage: fallbackPage,
    totalPages: fallbackTotalPages,
    totalItems: fallbackTotalItems,
    itemsPerPage: fallbackLimit,
  };
};


