import { AppKoaRouterContext, IServer } from "../../interface";
import { methods } from "../../types";

export class MockServer implements IServer {
  protected response: {
    getResponse: any;
    postResponse: any;
    putResponse: any;
    deleteResponse: any;
  };
  constructor() {
    this.response = {
      getResponse: {},
      postResponse: {},
      putResponse: {},
      deleteResponse: {},
    };
  }
  setResponse = <T>(data: T, method: methods) => {
    switch (method) {
      case "GET":
        this.response = {
          getResponse: data,
          postResponse: {},
          putResponse: {},
          deleteResponse: {},
        };
        break;
      case "POST":
        this.response = {
          getResponse: {},
          postResponse: data,
          putResponse: {},
          deleteResponse: {},
        };
        break;
      case "PUT":
        this.response = {
          getResponse: {},
          postResponse: {},
          putResponse: data,
          deleteResponse: {},
        };
        break;
      case "DELETE":
        this.response = {
          getResponse: {},
          postResponse: {},
          putResponse: {},
          deleteResponse: data,
        };
        break;
      default:
        this.response = {
          getResponse: {},
          postResponse: {},
          putResponse: {},
          deleteResponse: {},
        };
    }
  };
  get = async (url: string) => {
    return Promise.resolve(this.response.getResponse);
  };
  post = (url: string) => {
    const newOne = new MockSend(this.response.postResponse);
    return newOne;
  };
  put = async (url: string) => {
    return Promise.resolve(this.response.putResponse);
  };
  delete = async (url: string) => {
    return Promise.resolve(this.response.deleteResponse);
  };
}
export class MockSend extends MockServer {
  private currentResponse: any;
  constructor(response: any) {
    super();
    this.currentResponse = response;
  }
  send = async (data: any) => {
    return Promise.resolve(this.currentResponse);
  };
}
