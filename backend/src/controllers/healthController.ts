import { Request ,Response} from "express";
import { checkHealthDatabase, checkHealthS3 } from "../services/healthService";

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Check the health of the application
 *     description: Verifies the health of the S3 service and the database.
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: All services are healthy.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *       503:
 *         description: One or more services are unhealthy.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: unhealthy
 *                 details:
 *                   type: object
 *                   properties:
 *                     s3:
 *                       type: boolean
 *                       description: Health status of the S3 service.
 *                     database:
 *                       type: boolean
 *                       description: Health status of the database service.
 */
export const healtContoller = async (_req:Request, res:Response) => {
  const s3Health = checkHealthS3();
  const dbHealth = checkHealthDatabase();
  
  const allHealthy = await Promise.all([s3Health, dbHealth]);
  
  if (allHealthy.every(healthy => healthy)) {
    return res.status(200).json({ status: 'ok' });
  }

 return res.status(503).json({ status: 'unhealthy', details: {
    s3: allHealthy[0],
    database: allHealthy[1]
  } });


  
}