import express from "express";
// @ts-ignore
import cors from "cors";
import {
  injectAuthController,
  injectCategoriesController,
} from "./controllers";
const port = process.env.port;

const app = express();
app.use(cors());
app.use(express.json());

injectAuthController(app);
injectCategoriesController(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
