import express from "express";
import cors from "cors";
import { injectControllers } from "./controllers";
const port = process.env.port;

const app = express();

app.use(cors());
app.use(express.json());

injectControllers(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
