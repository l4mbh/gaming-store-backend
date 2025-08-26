export interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  errorCode: number;
  message: string;
  data: T | T[] | null;
  pagination?: Pagination;
}
