"use strict";
// @author Lauri Pirilä
// Ohjelman avulla voidaan tallentaa ja muokata MySQL-tietokannan tietoja
// REST-rajapinnan avulla. Tietokanta on google cloudissa, instanssin nimi
// on "sqlinstance" ja se sisaltaa tietokannan nimelta "test" joka sisaltaa
// taulun "Persons", jota tama ohjelma kasittelee
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const personRoutes_1 = require("./routes/personRoutes");
const app = (0, express_1.default)();
dotenv.config();
app.use(bodyParser.json());
app.use("/persons", personRoutes_1.personRouter);
app.listen(process.env.PORT, () => {
    console.log("Node server started running");
});