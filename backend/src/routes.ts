import express from 'express';

const routes = express.Router();

routes.post('/classes', (req, res)=>{
    res.json({name: "ok"});
} )


export default routes;