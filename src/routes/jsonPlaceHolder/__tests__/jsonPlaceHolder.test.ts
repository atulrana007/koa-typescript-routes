import { AppContext } from "../../../interface/app";

import { MockHttpClient } from "../../../utils/httpClient/test-util/index";
import { UserPost } from "../jsonPlaceHolder";

beforeAll(() => {
  console.log = () => {};
});

describe("User Post", () => {
  const mockHttpClient = new MockHttpClient();
  const userPostInstance = new UserPost(mockHttpClient);
  test("should check if get all posts method works fine", async () => {
    const data = { message: "Data Received" };
    mockHttpClient.setResponse(data, 200);
    const resp = await userPostInstance.getAllPosts();
    expect(resp.message).toBe("Data Received");
  });
  test("should throw an error if get all posts method does not gets the posts", async () => {
    const error = {
      name: "Not Found",
      message: "Cannot Find the posts",
      config: {},
      isAxiosError: true,
      toJSON: () => {
        return {};
      },
    };
    mockHttpClient.setError(error, 404);
    const resp = await userPostInstance.getAllPosts();
    expect(resp.message).toBe("Cannot Find the posts");
  });
  test("should check if get all posts by user id method works fine", async () => {
    const data = { message: "Data Received By UserID" };
    mockHttpClient.setResponse(data, 200);
    const resp = await userPostInstance.getAllPostsByUserId({
      params: { userId: 123 },
    } as unknown as AppContext);
    expect(resp.message).toBe("Data Received By UserID");
  });
  test("should throw an error if get all posts by user id method does not gets the posts", async () => {
    const error = {
      name: "Not Found",
      message: "Cannot Find the posts By User Id",
      config: {},
      isAxiosError: true,
      toJSON: () => {
        return {};
      },
    };
    mockHttpClient.setError(error, 404);
    const resp = await userPostInstance.getAllPostsByUserId({
      params: { userId: 123 },
    } as unknown as AppContext);
    expect(resp.message).toBe("Cannot Find the posts By User Id");
  });
  test("should check if add new posts method works fine", async () => {
    const data = { message: "Added Post" };
    mockHttpClient.setResponse(data, 200);
    const resp = await userPostInstance.addPost({
      body: {
        title: "foo",
        body: "bar",
        userId: 1,
      },
    } as unknown as AppContext);
    expect(resp.message).toBe("Added Post");
  });
  test("should throw an error if add new posts method cannot add new post", async () => {
    const error = {
      name: "Internal Server Error",
      message: "Cannot Add a new posts",
      config: {},
      isAxiosError: true,
      toJSON: () => {
        return {};
      },
    };
    mockHttpClient.setError(error, 500);
    const resp = await userPostInstance.addPost({
      body: {
        title: "foo",
        body: "bar",
        userId: 1,
      },
    } as unknown as AppContext);
    expect(resp.message).toBe("Cannot Add a new posts");
  });
  test("should check if update posts method works fine", async () => {
    const data = { message: "Updated Post" };
    mockHttpClient.setResponse(data, 200);
    const resp = await userPostInstance.updatePost({
      params: { postId: 101 },
      body: {
        title: "foo",
        body: "bar",
        userId: 1,
      },
    } as unknown as AppContext);
    expect(resp.message).toBe("Updated Post");
  });
  test("should throw an error if update posts method cannot update post", async () => {
    const error = {
      name: "Internal Server Error",
      message: "Cannot update posts",
      config: {},
      isAxiosError: true,
      toJSON: () => {
        return {};
      },
    };
    mockHttpClient.setError(error, 500);
    const resp = await userPostInstance.addPost({
      body: {
        title: "foo",
        body: "bar",
        userId: 1,
      },
    } as unknown as AppContext);
    expect(resp.message).toBe("Cannot update posts");
  });
  test("should check if delete posts method works fine", async () => {
    const data = { message: "Delete Post" };
    mockHttpClient.setResponse(data, 200);
    const resp = await userPostInstance.deletePost({
      params: { postId: 101 },
    } as unknown as AppContext);
    expect(resp.message).toBe("Delete Post");
  });
  test("should throw an error if delete posts method cannot delete post", async () => {
    const error = {
      name: "Internal Server Error",
      message: "Cannot delete posts",
      config: {},
      isAxiosError: true,
      toJSON: () => {
        return {};
      },
    };
    mockHttpClient.setError(error, 500);
    const resp = await userPostInstance.addPost({
      body: {
        title: "foo",
        body: "bar",
        userId: 1,
      },
    } as unknown as AppContext);
    expect(resp.message).toBe("Cannot delete posts");
  });
});
