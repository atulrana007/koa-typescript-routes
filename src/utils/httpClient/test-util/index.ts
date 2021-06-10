import { AxiosError, AxiosResponse } from "axios";
import { IHttpClient } from "../../../interface/IHttpClient";

export class MockHttpClient implements IHttpClient {
  private response: AxiosResponse<any> = {
    data: {},
    status: 200,
    statusText: "",
    headers: {},
    config: {},
  };
  private isError: Boolean;
  private error: AxiosError<any> = {
    name: "",
    message: "",
    config: {},
    isAxiosError: true,
    toJSON: () => {
      return {};
    },
  };
  constructor(data: any = {}) {
    this.response = {
      ...this.response,
      data,
    };
    this.isError = false;
  }
  setResponse<T>(data: T, status: number) {
    this.isError = false;
    this.response = {
      ...this.response,
      data,
      status,
    };
  }
  setError<T>(error: T, status: number) {
    this.isError = true;
    this.error = { ...this.error, ...error, status };
  }

  get = <T>(_url: string, _config: {}) => {
    console.log("check error", this.error);
    return !this.isError
      ? Promise.resolve(this.response)
      : Promise.reject(this.error);
  };
  post = <T>(_url: string, _data: any, _config: {}) => {
    return !this.isError
      ? Promise.resolve(this.response)
      : Promise.reject(this.error);
  };
  put = <T>(_url: string, _data: any, _config: {}) => {
    return !this.isError
      ? Promise.resolve(this.response)
      : Promise.reject(this.error);
  };
  delete = <T>(_url: string, _config: {}) => {
    return !this.isError
      ? Promise.resolve(this.response)
      : Promise.reject(this.error);
  };
}
