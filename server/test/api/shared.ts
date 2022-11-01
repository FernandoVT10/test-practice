import { Response } from "supertest";

type ApiCaller = () => Promise<Response>;

export const testAuthorizationMiddleware = (apiCaller: ApiCaller) => {
  it("should response an error when there's no auth cookie", async () => {
    const res = await apiCaller();

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("You need to be authenticated");
  });
};
