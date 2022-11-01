import { logger } from './log'
import productsData from '../../src/constants/products.json';

/**
 * @swagger
 * /api/recommended:
 *   get:
 *     description: Returns recommended products
 *     parameters:
 *     - in: query
 *       name: userName
 *       required: false
 *       description:  Name of the signed in user. If the user name is set to fav_user , the response returns the first 5 products marked as favorite.
 *     responses:
 *       200:
 *         description: List of products
 */
export default (req, res) => {
  const userName = req.query['userName'];
  logger.info(`getting recommendations for ${userName}`);
  try {
    const products = productsData.recommendations;
    products.map(product => product.isFav = false);
    res.statusCode = 200;
    res.json(productsData);
  } catch (error) {
    logger.error("failed to get recommendations", error)
    res.statusCode = 500;
    res.json({});
  }
};
