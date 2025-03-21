import { Options } from "swagger-jsdoc";
import {
    OpenAPIRegistry,
    OpenApiGeneratorV3,
    extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { injectAuthControllerInSwagger } from "./controllers/Auth/swagger";

const openAPIRegistry = new OpenAPIRegistry();

injectAuthControllerInSwagger(openAPIRegistry);

const generator = new OpenApiGeneratorV3(openAPIRegistry.definitions);

const swaggerDefinition = generator.generateDocument({
    openapi: "3.0.0",
    info: {
        title: "My API",
        version: "1.0.0",
        description: "API description",
    },

    servers: [
        {
            url: "http://localhost:3001",
        },
    ],
});

const options: Options = {
    swaggerDefinition,
    apis: ["./src/api/controllers/Auth/index.ts"], // Укажите путь к вашим файлам с комментариями API
};

export default options;
export { openAPIRegistry };
