import express from "express";
import cors from "cors";
import { injectControllers } from "./controllers";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerOptions from "./swagger-options";
import swaggerUi from "swagger-ui-express";

const port = process.env.port;

const app = express();

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());
app.use(express.json());

injectControllers(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
