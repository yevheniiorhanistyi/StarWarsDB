import { http, HttpResponse } from "msw";
import { char, charList } from "./data";

export const handlers = [
  http.get("https://swapi.dev/api/people/1", () =>
    HttpResponse.json(char, { status: 200 }),
  ),
  http.get("https://swapi.dev/api/people/*", () => HttpResponse.json(charList)),
];

export default handlers;
