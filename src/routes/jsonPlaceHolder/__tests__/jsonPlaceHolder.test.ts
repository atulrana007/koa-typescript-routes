import { KoaContext } from "../../../types/types";
import { MockHttpClient } from "../../../utils/httpClient/test-util/index";
import { UserPost } from "../jsonPlaceHolder";

describe("User Post", () => {
  const mockHttpClient = new MockHttpClient();
  const userPostInstance = new UserPost(mockHttpClient);
  test("should check if get all posts method works fine", async () => {
    const data = { message: "Data Received" };
    mockHttpClient.setResponse(data, 200);
    const resp = await userPostInstance.getAllPosts();
    expect(resp.data.message).toBe("Data Received");
  });
  test("should check if get all posts by user id method works fine", async () => {
    const data = { message: "Data Received By UserID" };
    mockHttpClient.setResponse(data, 200);
    const resp = await userPostInstance.getAllPostsByUserId({
      params: { userId: 123 },
    } as unknown as KoaContext);
    expect(resp.data.message).toBe("Data Received By UserID");
  });
  test("should check if add new posts method works fine", async () => {
    const data = { message: "Added Post" };
    mockHttpClient.setResponse(data, 200);
    const resp = await userPostInstance.addPost({
      request: {
        body: {
          title: "foo",
          body: "bar",
          userId: 1,
        },
      },
    } as unknown as KoaContext);
    expect(resp.message).toBe("Added Post");
  });
  test("should check if update posts method works fine", async () => {
    const data = { message: "Updated Post" };
    mockHttpClient.setResponse(data, 200);
    const resp = await userPostInstance.updatePost({
      request: {
        body: {
          title: "foo",
          body: "bar",
          userId: 1,
        },
      },
      params: { postId: 101 },
    } as unknown as KoaContext);
    expect(resp.message).toBe("Updated Post");
  });
  test("should check if delete posts method works fine", async () => {
    const data = { message: "Delete Post" };
    mockHttpClient.setResponse(data, 200);
    const resp = await userPostInstance.deletePost({
      params: { postId: 101 },
    } as unknown as KoaContext);
    expect(resp.message).toBe("Delete Post");
  });
});
