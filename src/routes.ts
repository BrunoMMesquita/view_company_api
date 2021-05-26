import { Router, Request, Response } from 'express';
import { getCompanys, saveCompany, getCompany, updateCompany, removeCompany, getCompanyByQuery } from '@controller/CompanysController';
import { getUser, saveUser } from '@controller/UseController';
import { Authenticate } from '@controller/AuthController';
import authMiddleware from './middlewares/authMiddleware';

const routes = Router();

routes.get('/', (request: Request, response: Response) => { 
    return response.json({
        message: 'Hello'
    });
});

routes.post('/auth', Authenticate)

routes.post('/user', saveUser)

routes.get('/company', authMiddleware, getCompanys)
routes.get('/company/:id', authMiddleware, getCompany)
routes.get('/companySearch', authMiddleware, getCompanyByQuery)
routes.post('/company', authMiddleware, saveCompany)
routes.put('/company/:id', authMiddleware, updateCompany)
routes.delete('/company/:id', authMiddleware, removeCompany)

export default routes;