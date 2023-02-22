import { runMiddleware } from '@/lib/backend/framework-helpers';
import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';

const cors = Cors({
    origin: "*",
    methods: ['POST', 'GET'],
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await runMiddleware(req, res, cors);
    res.status(500).json({ message: 'Not implemented' })
}