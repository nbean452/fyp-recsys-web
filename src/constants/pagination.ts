const pageSizeOptions = [5, 20, 50, 75, 100];

const DEFAULT_PAGINATION_CONFIG = {
  defaultCurrent: 1,
  defaultPageSize: pageSizeOptions[1],
  pageSizeOptions,
};

export default DEFAULT_PAGINATION_CONFIG;
