// @author Lauri Pirilä
// Ohjelman avulla voidaan tallentaa ja muokata MySQL-tietokannan tietoja
// REST-rajapinnan avulla. Tietokanta on google cloudissa, instanssin nimi
// on "sqlinstance" ja se sisaltaa tietokannan nimelta "test" joka sisaltaa
// taulun "Persons", jota tama ohjelma kasittelee

import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import {personRouter} from "./routes/personRoutes";


const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use("/", personRouter);

app.listen(3306, "127.0.0.1",  () => {
    console.log("Node server started running");
});