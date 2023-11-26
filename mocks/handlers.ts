import { http, HttpResponse } from "msw";
import { item, itemList } from "./data";

export const handlers = [
  http.get("https://swapi.dev/api/people/1", () =>
    HttpResponse.json(item, { status: 200 }),
  ),
  http.get("https://swapi.dev/api/people/*", () => HttpResponse.json(itemList)),
];

export default handlers;
