"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.update = exports.findAll = exports.findOne = exports.create = void 0;
const db_1 = require("../db");
// Maaritellaan tietokantaoperaatiot. Kaytetaan query()-funktiota
// SQL-injektiohyokakysten varalta. Kaytetaan kyselyita varten tanne importattua
// db.oliota. Palautetaan tietoa operaatioista callbackissa.
// Kun viiteavaimia ei muihin tauluihin ole, <OkPacket> ei olisi valttamaton
const create = (person, callback) => {
    const queryString = "INSERT INTO Persons (ID, FirstName, LastName, Age) VALUES (?, ?, ?, ?)";
    // console.log("adfg");
    db_1.db.query(queryString, [person.id, person.firstname, person.lastname, person.age], (err, result) => {
        if (err) {
            callback(err);
        }
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
const findOne = (id, callback) => {
    const queryString = `SELECT * FROM Persons WHERE ID=?`;
    db_1.db.query(queryString, id, (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        const person = {
            id: row.id,
            firstname: row.firstname,
            lastname: row.lastname,
            age: row.age
        };
        callback(null, person);
    });
};
exports.findOne = findOne;
const findAll = (callback) => {
    const queryString = "SELECT * FROM Persons";
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const persons = [];
        rows.forEach(row => {
            const person = {
                id: row.id,
                firstname: row.firstname,
                lastname: row.lastname,
                age: row.age
            };
            persons.push(person);
        });
        callback(null, persons);
    });
};
exports.findAll = findAll;
const update = (person, callback) => {
    const queryString = `UPDATE Persons SET ID=?, FirstName=?, LastName=?, Age=?`;
    db_1.db.query(queryString, [person.id, person.firstname, person.lastname, person.age], (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null);
    });
};
exports.update = update;
const del = (person, callback) => {
    const queryString = `DELETE FROM Persons WHERE ID=?`;
    db_1.db.query(queryString, person.id, (err, result) => {
        if (err) {
            callback(err);
        }
        callback("done");
    });
};
exports.del = del;
