import { AppContext } from "../interface/app";
import { KoaContext, Response } from "../types/types";
import { userPostResponse } from "../types/responses/userPostResponse";

export interface IUserPost {
  getAllPosts(): Promise<Response<userPostResponse>>;
  getAllPostsByUserId(ctx: AppContext): Promise<userPostResponse>;
  addPost(ctx: AppContext): Promise<any>;
  updatePost(ctx: AppContext): Promise<any>;
  deletePost(ctx: AppContext): Promise<any>;
}

export interface IUserResponse<T> {
  response: T;
}
