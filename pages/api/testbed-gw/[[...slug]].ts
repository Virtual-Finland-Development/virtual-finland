import { getForwardableHeaders } from '@/lib/backend/framework-helpers';
import type { NextApiRequest, NextApiResponse } from 'next';

const DataProductRouter: any = {
    gatewayEndpoint: 'https://gateway.testbed.fi',
    dataProducts: {
        'draft/Weather/Current/Metric': {
            defaultDataSource: 'openweather',
        }
    },
    
    async execute(dataProduct: string, dataSource: string, req: NextApiRequest, res: NextApiResponse) {
        const endpointUrl = this.getDataProductEndpoint(dataProduct, dataSource);
        if (!endpointUrl) {
            res.status(400).json({ message: 'Bad request' })
            return;
        }

        try {
            const response = await fetch(endpointUrl, {
                method: req.method,
                headers: getForwardableHeaders(req.headers, { 'Content-Type': 'application/json' }),
                body: JSON.stringify(req.body),
            });
            const data = await response.json();
            res.status(200).json(data);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ message: error.message, stack: error.stack })
        }
    },

    getDataProductEndpoint(dataProduct: string, dataSource?: string) {
        const dataProductConfig = this.dataProducts[dataProduct];
        if (dataProductConfig) {
            const { defaultDataSource } = dataProductConfig;
            if (!dataSource) dataSource = defaultDataSource;

            return `${this.gatewayEndpoint}/${dataProduct}?source=${dataSource}`;
        }
        return null;
    },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { slug, source } = req.query;
        if (slug instanceof Array && slug.length > 0) {
            const dataProduct = slug.join('/');
            return await DataProductRouter.execute(dataProduct, source, req, res);
        }
    }
    res.status(400).json({ message: 'Bad request' })
}