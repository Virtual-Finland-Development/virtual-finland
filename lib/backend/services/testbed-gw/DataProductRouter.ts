// DataProductRouter
import axios from 'axios';

import { NextApiRequest, NextApiResponse } from "next";
import { getForwardableHeaders } from "../../framework-helpers";

const TestbedGWConfiguration = {
    gatewayEndpoint: 'https://gateway.testbed.fi',
    dataProducts: {
        'draft/Weather/Current/Metric': {
            defaultDataSource: 'openweather',
        }
    },
}

export type DataProduct = keyof typeof TestbedGWConfiguration.dataProducts;

const DataProductRouter = {
    
    async execute(dataProduct: DataProduct, dataSource: string | undefined, req: NextApiRequest, res: NextApiResponse) {

        const endpointUrl = this.getDataProductEndpoint(dataProduct, dataSource);
        if (!endpointUrl) {
            res.status(400).json({ message: 'Bad request: data product' })
            return;
        }

        try {
            const response = await axios.post(endpointUrl, req.body, {
                headers: getForwardableHeaders(req.headers, { 'Content-Type': 'application/json' }),
            });
            res.status(response.status).json(response.data);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ message: error.message, stack: error.stack })
        }
    },

    getDataProductEndpoint(dataProduct: DataProduct, dataSource?: string) {
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