import express = require('express');
import * as bodyParser from 'body-parser'; //used to parse the form data that you pass in the request
var cors = require('cors');
import { AutocompleteRoutes } from './routes/autocomplete';
import { IndexRoutes } from './routes/index';

class App {

    public app: express.Application;
    public autocompleteRoutes: AutocompleteRoutes = new AutocompleteRoutes();
    public indexRoutes: IndexRoutes = new IndexRoutes();

    constructor() {
        this.app = express(); // run the express instance and store in app
        this.app.use(cors());
        this.config();
        this.autocompleteRoutes.routes(this.app);
        this.indexRoutes.routes(this.app);
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({
            extended: false
        }));
    }

}

export default new App().app;
