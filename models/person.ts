import {Person} from "../types/person";
import {db} from "../db";
import {OkPacket, RowDataPacket} from "mysql2";

// Maaritellaan tietokantaoperaatiot. Kaytetaan query()-funktiota
// SQL-injektiohyokakysten varalta. Kaytetaan kyselyita varten tanne importattua
// db.oliota. Palautetaan tietoa operaatioista callbackissa.


// Kun viiteavaimia ei muihin tauluihin ole, <OkPacket> ei olisi valttamaton
export const create = (person: Person, callback: Function) => {
    const queryString = "INSERT INTO Persons (ID, FirstName, LastName, Age) VALUES (?, ?, ?, ?)"

    db.query(
        queryString,
        [person.id, person.firstname, person.lastname, person.age],
        (err, result) => {
            if (err) {callback(err)}

            const insertId = (<OkPacket> result).insertId;
            callback(null, insertId);
        }
    );
};

export const findOne = (id: number, callback: Function) => {
    const queryString = "SELECT * FROM Persons WHERE ID=?"

    db.query(queryString, id, (err,result) => {
        if (err) {callback(err)}

        const row = (<RowDataPacket> result)[0];
        const person: Person = {
            id: row.id,
            firstname: row.firstname,
            lastname: row.lastname,
            age: row.age
        }
        callback(null, person);
    });
}

export const findAll = (callback: Function) => {
    const queryString = "SELECT * FROM Persons"

    db.query(queryString, (err,result) => {
        if (err) {callback(err)}

        const rows = <RowDataPacket[]> result;
        const persons: Person[] = [];

        rows.forEach(row => {
            const person: Person = {
                id: row.id,
                firstname: row.firstname,
                lastname: row.lastname,
                age: row.age
            }
            persons.push(person);
        });
        callback(null, persons);
    });
}

export const update = (person: Person, callback: Function) => {
    const queryString = `UPDATE Persons SET ID=?, FirstName=?, LastName=?, Age=?`;

    db.query(
        queryString,
        [person.id, person.firstname, person.lastname, person.age],
        (err, result) => {
            if (err) {callback(err)}
            callback(null);
        }
        );
}

export const del = (person: Person, callback: Function) => {
    const queryString = `DELETE FROM Persons WHERE ID=?`;

    db.query(queryString,person.id, (err, result) => {
        if(err) {callback(err)}
        callback("done");
    }
    );
}




