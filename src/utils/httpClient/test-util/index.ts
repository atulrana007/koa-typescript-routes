import { AxiosResponse } from "axios";
import { IHttpClient } from "../../../interface/IHttpClient";

export class MockHttpClient implements IHttpClient {
  private response: AxiosResponse<any> = {
    data: {},
    status: 200,
    statusText: "",
    headers: {},
    config: {},
  };
  constructor(data: any = {}) {
    this.response = {
      ...this.response,
      data,
    };
  }
  setResponse<T>(data: T, status: number) {
    this.response = {
      ...this.response,
      data,
      status,
    };
  }

  get = <T>(_url: string, _config: {}): Promise<AxiosResponse<T>> => {
    return Promise.resolve(this.response);
  };
  post = <T>(
    _url: string,
    _data: any,
    _config: {}
  ): Promise<AxiosResponse<T>> => {
    return Promise.resolve(this.response);
  };
  put = <T>(
    _url: string,
    _data: any,
    _config: {}
  ): Promise<AxiosResponse<T>> => {
    return Promise.resolve(this.response);
  };
  delete = <T>(_url: string, _config: {}): Promise<AxiosResponse<T>> => {
    return Promise.resolve(this.response);
  };
}
