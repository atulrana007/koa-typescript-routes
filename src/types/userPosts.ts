import { KoaContext } from "./types";

export interface IUserPost {
  getAllPosts(): Promise<any>;
  getAllPostsByUserId(ctx: KoaContext): Promise<any>;
  addPost(ctx: KoaContext): Promise<any>;
  updatePost(ctx: KoaContext): Promise<any>;
  deletePost(ctx: KoaContext): Promise<any>;
}

export interface IUserResponse<T> {
  response: T;
}
