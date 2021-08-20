import { rest } from "msw";

interface FormBody {
  data: string;
}
interface HandlerResponse {
  status: "ok" | "error";
  message: string;
}

export const handlers = [
  rest.post<FormBody, HandlerResponse>("/form", (req, res, ctx) => {
    let json: HandlerResponse;
    if (Math.random() > 0.5) {
      json = { status: "ok", message: "Thank you. You are now subscribed" };
      return res(ctx.json(json));
    } else {
      json = { status: "error", message: "Invalid subscription request" };
      return res(ctx.status(400), ctx.json(json));
    }
  }),
];
