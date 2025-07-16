export type ApiResponse<
  T extends Record<string, unknown> = Record<string, unknown>,
> = {
  status: string;
  message: string;
} & T;
