import { Application } from "express";
import { create } from "./controller";
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";


export function routesConfig(app: Application) {
    app.post('/users',
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'] }),
        create
    );
    // lists all users
    app.get('/users', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'] }),
    ]);
    // get :id user
    app.get('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }),
    ]);
    // updates :id user
    app.patch('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }),
    ]);
    // deletes :id user
    app.delete('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'] }),
    ]);

}