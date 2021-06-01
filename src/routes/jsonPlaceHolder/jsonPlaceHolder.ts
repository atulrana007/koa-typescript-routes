import { AppContext, IUserPost, IHttpClient } from "../../interface/index";
import { routesType } from "../../types";
import {} from "../../interface/IHttpClient";
import {} from "../../interface/IUserPosts";
import { HttpClient } from "../../utils/httpClient/httpClient";
import { AxiosResponse } from "axios";

export class UserPost implements IUserPost {
  private static instance: UserPost | undefined = undefined;

  public static getInstance(httpClient: IHttpClient) {
    if (this.instance !== undefined) return this.instance;
    this.instance = new UserPost(httpClient);
    return this.instance;
  }
  constructor(private readonly httpClient: IHttpClient) {}
  getAllPosts = async () => {
    try {
      const resp = (await this.httpClient.get<any>(
        `https://jsonplaceholder.typicode.com/posts`,
        {}
      )) as AxiosResponse<any>;
      return Promise.resolve(resp.data);
    } catch (err) {
      return err;
    }
  };
  getAllPostsByUserId = async (ctx: AppContext) => {
    const userId = ctx.params.userId;
    try {
      const resp = (await this.httpClient.get<any>(
        `https://jsonplaceholder.typicode.com/users/${userId}/posts`,
        {}
      )) as AxiosResponse<any>;
      return Promise.resolve(resp.data);
    } catch (err) {
      return err;
    }
  };
  addPost = async (ctx: AppContext) => {
    const body = ctx.body;
    try {
      const resp = (await this.httpClient.post<any>(
        "https://jsonplaceholder.typicode.com/posts",
        body,
        {}
      )) as AxiosResponse<any>;
      return Promise.resolve(resp.data);
    } catch (err) {
      return err;
    }
  };
  updatePost = async (ctx: AppContext) => {
    const body = ctx.body;
    const postId = ctx.params.postId;
    try {
      const resp = (await this.httpClient.put<any>(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        body,
        {}
      )) as AxiosResponse<any>;
      return Promise.resolve(resp.data);
    } catch (err) {
      return err;
    }
  };
  deletePost = async (ctx: AppContext) => {
    const postId = ctx.params.postId;
    try {
      const resp = (await this.httpClient.delete<any>(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        {}
      )) as AxiosResponse<any>;
      return Promise.resolve(resp.data);
    } catch (err) {
      return err;
    }
  };
}

const getUserPostsInstance = (
  httpClient: IHttpClient = HttpClient.getInstance()
) => UserPost.getInstance(httpClient);

export const userPostRoutes: routesType = [
  {
    url: "/api/v1/posts/user/:userId",
    methods: ["GET"],
    route: getUserPostsInstance().getAllPostsByUserId,
  },
  {
    url: "/api/v1/posts",
    methods: ["GET"],
    route: getUserPostsInstance().getAllPosts,
  },
  {
    url: "/api/v1/posts",
    methods: ["POST"],
    route: getUserPostsInstance().addPost,
  },
  {
    url: "/api/v1/posts/:postId",
    methods: ["PUT"],
    route: getUserPostsInstance().updatePost,
  },
  {
    url: "/api/v1/posts/:postId",
    methods: ["DELETE"],
    route: getUserPostsInstance().deletePost,
  },
];
