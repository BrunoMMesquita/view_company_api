import { getRepository } from 'typeorm';
import { Company } from '@entity/Company';
import { Request, Response } from 'express';

export const getCompanys = async (request: Request, response: Response) => {
    const companys = await getRepository(Company).createQueryBuilder('company').paginate()
    return response.json(companys);
};

export const getCompany = async (request: Request, response: Response) => {
    const { id } = request.params;
    const companys = await getRepository(Company).findOne(id);
    return response.json(companys);
};

export const getCompanyByQuery = async (request: Request, response: Response) => {
    const query = request.query;
    const companys = await getRepository(Company).find({ where: query });
    return response.json(companys);
};

export const saveCompany = async (request: Request, response: Response) => {
    const company = await getRepository(Company).save(request.body);
    return response.json(company);
}

export const updateCompany = async (request: Request, response: Response) => {
    const { id } = request.params;
    const company = await getRepository(Company).update(id, request.body);

    if (company.affected === 1){
        const companyUptaded = await getRepository(Company).findOne(id);

        return response.json(companyUptaded);
    }
    return response.status(404).json({
        message: "company not found!"
    })
}

export const removeCompany = async (request: Request, response: Response) => {
    const { id } = request.params;
    const company = await getRepository(Company).delete(id);

    if (company.affected === 1){
        return response.json({
            message: 'company removed'
        });
    }
    return response.status(404).json({
        message: "company not found!"
    })
}