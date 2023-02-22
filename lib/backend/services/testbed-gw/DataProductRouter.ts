// DataProductRouter

import { NextApiRequest, NextApiResponse } from "next";
import { getForwardableHeaders } from "../../framework-helpers";

export const TestbedGWConfiguration: { gatewayEndpoint: string, dataProducts: Record<string, any>} = {
    gatewayEndpoint: 'https://gateway.testbed.fi',
    dataProducts: {
        'draft/Weather/Current/Metric': {
            defaultDataSource: 'openweather',
        }
    },
}

const DataProductRouter = {
    
    async execute(dataProduct: string, dataSource: string | undefined, req: NextApiRequest, res: NextApiResponse) {

        if (req.method !== 'POST') {
            res.status(400).json({ message: 'Bad request' })
            return;
        }

        const endpointUrl = this.getDataProductEndpoint(dataProduct, dataSource);
        if (!endpointUrl) {
            res.status(400).json({ message: 'Bad request: data product' })
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
        const dataProductConfig = TestbedGWConfiguration.dataProducts[dataProduct];
        if (dataProductConfig) {
            const { defaultDataSource } = dataProductConfig;
            if (!dataSource) dataSource = defaultDataSource;

            return `${TestbedGWConfiguration.gatewayEndpoint}/${dataProduct}?source=${dataSource}`;
        }
        return null;
    },
}

export default DataProductRouter;