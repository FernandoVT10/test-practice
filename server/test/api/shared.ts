import { Response, Request } from "supertest";
import { authFactory } from "../factories";

type ApiCaller = () => Promise<Response>;

export const testAuthorizationMiddleware = (apiCaller: ApiCaller) => {
  it("should response an error when there's no auth cookie", async () => {
    const res = await apiCaller();

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("You need to be authenticated");
  });
};

export const testNotAuthenticatedMiddleware = (request: Request) => {
  it("should response an error when the user is authenticated", async () => {
    const authCookie = await authFactory.generateAuthCookie();

    const res = await request.set("Cookie", authCookie);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("You can't access if you're authenticated");
  });
}
