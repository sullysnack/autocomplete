import express = require('express');
import {Request, Response} from 'express';

export class IndexRoutes {
    
    public routes(app:  express.Application): void { //received the express instance from app.ts file

        app.route('*')
        .get((req: Request, res: Response) => {
            res.status(200).send([]);
        })

    }
}
