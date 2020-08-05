import express from 'express';
import ClassesController from '../src/controllers/ClassesController'
import ConnectionsController from './controllers/ConnectionsController';

const classesController = new ClassesController()
const connectionsControllers = new ConnectionsController();

const routes = express.Router();


routes.post('/classes', classesController.create)
routes.get('/classes', classesController.index)
routes.post('/connections',connectionsControllers.create)
routes.get('/connections',connectionsControllers.index)

export default routes;