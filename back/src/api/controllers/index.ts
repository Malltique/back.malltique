import { Express } from "express";
import { injectAuthController } from "./Auth";
import { injectCategoriesController } from "./Categories";
import { injectRolesController } from "./Roles";
import { injectProductsController } from "./Products";

export const injectControllers = (app: Express) => {
    injectAuthController(app);
    injectCategoriesController(app);
    injectRolesController(app);
    injectProductsController(app);
};
