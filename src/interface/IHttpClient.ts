import axios, { AxiosError, AxiosResponse } from "axios";
import { errorResponse } from "../types";

export interface IHttpClient {
  get<T>(url: string, config: {}): Promise<AxiosResponse<T>> | AxiosError<T>;
  post<T>(
    url: string,
    data: any,
    config: {}
  ): Promise<AxiosResponse<T>> | AxiosError<T>;
  put<T>(
    url: string,
    data: any,
    config: {}
  ): Promise<AxiosResponse<T>> | AxiosError<T>;
  delete<T>(url: string, config: {}): Promise<AxiosResponse<T>> | AxiosError<T>;
}
