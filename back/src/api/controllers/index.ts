import { injectAuthController } from "./Auth";
import { injectCategoriesController } from "./Categories";
import { Express } from "express";

export const injectControllers = (app: Express) => {
    injectAuthController(app);
    injectCategoriesController(app);
};
