"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("./route");
class IndexRoute extends route_1.BaseRoute {
    static create(router) {
        console.log("[IndexRoute::create] Creating index route.");
        router.get("/", (req, res, next) => {
            new IndexRoute().index(req, res, next);
        });
    }
    constructor() {
        super();
    }
    index(req, res, next) {
        this.title = "Home | Tunkku Boilerplate";
        let options = {
            "message": "Welcome to the Tunkku Boilerplate"
        };
        this.render(req, res, "index", options);
    }
}
exports.IndexRoute = IndexRoute;
