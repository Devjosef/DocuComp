import type { NextApiRequest, NextApiResponse } from 'next';
import { checkCompliance } from '../../../services/complianceService';
import { handleError, AppError, catchAsync } from '../../../services/errorHandlingService';

const handler = catchAsync(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { documentContent } = req.body;

    try {
      const complianceStatus = await checkCompliance(documentContent);
      res.status(200).json({ complianceStatus });
    } catch (error) {
      throw new AppError('Failed to check compliance', 500);
    }
  } else {
    throw new AppError('Method not allowed', 405);
  }
});
export default async function complianceHandler(req: NextApiRequest, res: NextApiResponse, next: Function) {
  try {
    await handler(req, res, next);
  } catch (err) {
    handleError(err, res);
  }
};
