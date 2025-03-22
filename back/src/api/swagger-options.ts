import { Options } from "swagger-jsdoc";
import {
    OpenAPIRegistry,
    OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import { injectAuthControllerInSwagger } from "./controllers/Auth/swagger";
import { injectProductsControllerInSwagger } from "./controllers/Products/swagger";
import { injectCategoriesControllerInSwagger } from "./controllers/Categories/swagger";
import { injectRolesControllerInSwagger } from "./controllers/Roles/swagger";
import { injectOrdersControllerInSwagger } from "./controllers/Orders/swagger";

const openAPIRegistry = new OpenAPIRegistry();

injectAuthControllerInSwagger(openAPIRegistry);
injectProductsControllerInSwagger(openAPIRegistry);
injectCategoriesControllerInSwagger(openAPIRegistry);
injectRolesControllerInSwagger(openAPIRegistry);
injectOrdersControllerInSwagger(openAPIRegistry);

const generator = new OpenApiGeneratorV3(openAPIRegistry.definitions);

const swaggerDefinition = generator.generateDocument({
    openapi: "3.0.0",
    info: {
        title: "Malltique API",
        version: "1.0.0",
    },

    servers: [
        {
            url: "http://localhost:3001",
        },
    ],
});

const options: Options = {
    swaggerDefinition,
    apis: [],
};

export default options;
export { openAPIRegistry };
