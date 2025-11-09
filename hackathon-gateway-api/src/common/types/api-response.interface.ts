export interface ApiResponse {
  code: string;
  message: {
    title: string;
    description: string;
  };
  request_id?: string;
  data?: unknown;
}
