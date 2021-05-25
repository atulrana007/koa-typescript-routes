import axios, { AxiosResponse } from "axios";

export interface IHttpClient {
  get<T>(url: string, config: {}): Promise<AxiosResponse<T>>;
  post<T>(url: string, data: any, config: {}): Promise<T>;
  put<T>(url: string, data: any, config: {}): Promise<T>;
  delete<T>(url: string, config: {}): Promise<T>;
}
