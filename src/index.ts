import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import routes from "./routes";
import { createConnection } from 'typeorm';
import {pagination} from 'typeorm-pagination'
var cors = require('cors')

createConnection();
const app = express();

app.use(pagination)
app.use(cors());

app.use(bodyParser.json());
app.use(routes);
app.listen(3333);
