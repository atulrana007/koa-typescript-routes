import { IHttpClient } from "../../types/httpClient";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export class HttpClient implements IHttpClient {
  private static instance: HttpClient | undefined = undefined;

  public static getInstance() {
    if (this.instance !== undefined) return this.instance;
    this.instance = new HttpClient(axios.create());
    return this.instance;
  }
  constructor(private readonly axios: AxiosInstance) {}
  get = async <T>(url: string, config: {}): Promise<AxiosResponse<T>> => {
    const resp: AxiosResponse<T> = await this.axios.get<any, AxiosResponse<T>>(
      url,
      { ...config }
    );
    return resp;
  };
  post = async <T>(url: string, data: any, config: {}): Promise<T> => {
    const resp = await this.axios.post<any, T>(url, data, config);
    return resp;
  };
  put = async <T>(url: string, data: any, config: {}): Promise<T> => {
    const resp = await this.axios.put<any, T>(url, data, config);
    return resp;
  };
  delete = async <T>(url: string, config: {}): Promise<T> => {
    const resp = await this.axios.delete<any, T>(url, config);
    return resp;
  };
}
