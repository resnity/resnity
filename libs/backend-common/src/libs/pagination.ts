export class Pagination {
  readonly limit: number;
  readonly offset: number;
  readonly page: number;

  static create(payload: CreatePaginationPayload) {
    return new Pagination(payload);
  }

  constructor(payload: CreatePaginationPayload) {
    this.limit = payload.limit ?? 20;
    this.offset = payload.page ? (payload.page - 1) * this.limit : 0;
    this.page = payload.page ?? 1;
  }
}

type CreatePaginationPayload = {
  limit?: number;
  page?: number;
};

export class PaginationResult<T> {
  readonly pagination: Pagination;
  readonly data: T[];

  static create<T>(payload: CreatePaginationResultPayload<T>) {
    return new PaginationResult(payload);
  }

  constructor(payload: CreatePaginationResultPayload<T>) {
    this.pagination = payload.pagination;
    this.data = payload.data;
  }
}

type CreatePaginationResultPayload<T> = {
  pagination: Pagination;
  data: T[];
};
