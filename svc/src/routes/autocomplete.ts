import express = require('express');
import {Request, Response} from 'express';
import { Subjects } from '../models/subjects';

interface IAutocompleteSvcData {
    status: string;
    msg: string;
    results: string[];
}
  
export class AutocompleteRoutes {

    private subjects: Subjects = new Subjects();

    public routes(app: express.Application): void { // received the express instance from app.ts file

        app.route('/autocomplete/subjects')
        .get((req: Request, res: Response) => {
            const q = (String)(req.query['q'] || '');
            const results: string[] = this.subjects.search(q);
            const data: IAutocompleteSvcData = {
                status: 'success',
                msg: '',
                results: results
            };
            res.status(200).send(data);
        })

    }
}
