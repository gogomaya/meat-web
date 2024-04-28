export interface ResponseApi {
  data?: any
  error?: any
}

export interface SearchParams {
  rowsPerPage: string & number
  page: string & number
  orderColumn: string
  orderDirection: string
  query: string
}
