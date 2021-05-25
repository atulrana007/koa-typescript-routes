import { IHttpClient } from "../../types/httpClient";
import { KoaContext, routesType } from "../../types/types";
import { IUserPost } from "../../types/userPosts";
import { HttpClient } from "../../utils/httpClient/httpClient";

export class UserPost implements IUserPost {
  private static instance: UserPost | undefined = undefined;

  public static getInstance(httpClient: IHttpClient) {
    if (this.instance !== undefined) return this.instance;
    this.instance = new UserPost(httpClient);
    return this.instance;
  }
  constructor(private readonly httpClient: IHttpClient) {}
  getAllPosts = async () => {
    const resp = await this.httpClient.get<any>(
      `https://jsonplaceholder.typicode.com/posts`,
      {}
    );
    return Promise.resolve(resp);
  };
  getAllPostsByUserId = async (ctx: KoaContext) => {
    const userId = ctx.params.userId;
    const resp = await this.httpClient.get<any>(
      `https://jsonplaceholder.typicode.com/users/${userId}/posts`,
      {}
    );
    return Promise.resolve(resp);
  };
  addPost = async (ctx: KoaContext) => {
    const body = ctx.request.body;

    const resp = await this.httpClient.post<any>(
      "https://jsonplaceholder.typicode.com/posts",
      body,
      {}
    );
    return Promise.resolve(resp);
  };
  updatePost = async (ctx: KoaContext) => {
    const body = ctx.request.body;
    const postId = ctx.params.postId;
    const resp = await this.httpClient.put<any>(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      body,
      {}
    );
    return Promise.resolve(resp);
  };
  deletePost = async (ctx: KoaContext) => {
    const postId = ctx.params.postId;
    const resp = await this.httpClient.delete<any>(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      {}
    );
    return Promise.resolve(resp);
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
