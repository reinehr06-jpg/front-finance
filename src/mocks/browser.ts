import { setupWorker } from "msw/browser";
import { authHandlers } from "./handlers/auth";
import { membrosHandlers } from "./handlers/membros";

export const worker = setupWorker(...authHandlers, ...membrosHandlers);
