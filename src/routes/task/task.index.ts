import { createRouter } from "../../app.js";
import * as handler from "./task.handlers.js";
import * as routes from "./task.routes.js";

const task = createRouter()
  .openapi(routes.allTasks, handler.getAll)
  .openapi(routes.getSingle, handler.getOne)
  .openapi(routes.create, handler.create)
  .openapi(routes.update, handler.update)
  .openapi(routes.remove, handler.remove);

export default task;
