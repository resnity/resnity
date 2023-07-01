const CODE_SEARCH_PARAM_REGEX = /[?&]code=[^&]+/;
const STATE_SEARCH_PARAM_REGEX = /[?&]state=[^&]+/;
const ERROR_SEARCH_PARAM_REGEX = /[?&]error=[^&]+/;

export const hasAuthParams = (searchParams = window.location.search) =>
  CODE_SEARCH_PARAM_REGEX.test(searchParams) ||
  STATE_SEARCH_PARAM_REGEX.test(searchParams) ||
  ERROR_SEARCH_PARAM_REGEX.test(searchParams);
