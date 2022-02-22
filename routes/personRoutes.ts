import express, {Request, Response} from "express";
import * as personModel from "../models/person";
import {Person} from "../types/person";
const personRouter = express.Router();

// Datanhankintalogiikka hoidetaan models-puolella, taalla ei tarvitse
// muutakuin passata data funktioilla clientsidelle.

personRouter.get("/", async (req: Request, res: Response) => {
    personModel.findAll((err: Error, persons: Person[]) => {
        if (err) {
            return res.status(500).json({"errorMessage": err.message});
        }
        res.status(200).json({"data": persons});
    });
});

personRouter.post("/", async (req: Request, res: Response) => {
    const newPerson: Person = req.body;
    personModel.create(newPerson, (err: Error, ID: number) => {
        if (err) {
            return res.status(500).json({"message": err.message});
        }

        res.status(200).json({"orderId": ID});
    });
});

personRouter.get("/:id", async (req: Request, res: Response) => {
    const personId: number = Number(req.params.id);
    personModel.findOne(personId, (err: Error, person: Person) => {
        if(err) {
            return res.status(500).json({"message": err.message});
        }
        res.status(200).json({"data": person});
    })
});

personRouter.put("/:id", async (req: Request, res: Response) => {
    const person: Person = req.body;
    personModel.update(person, (err: Error) => {
        if (err) {
            return res.status(500).json({"message": err.message});
        }
        res.status(200).send();
    })
});

personRouter.delete("/:id", async (req: Request, res:Response) => {
    const person: Person = req.body;
    personModel.del(person,(err: Error) => {
        if (err) {
            return res.status(500).json({"message": err.message});
        }
        res.status(200).send();
    })
})

export {personRouter};