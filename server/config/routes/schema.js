import express from 'express';
import getSchema from '../routes/getSchema.js';

/**
 * @swagger
 * /schema:
 *   get:
 *     summary: Get database schema (tables, columns, relationships)
 *     tags:
 *       - Schema
 *     responses:
 *       200:
 *         description: List of tables with their columns and foreign key relationships
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   table:
 *                     type: string
 *                     example: users
 *                   columns:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: id
 *                         type:
 *                           type: string
 *                           example: int
 *                         nullable:
 *                           type: boolean
 *                           example: false
 *                         key:
 *                           type: string
 *                           example: PRI
 *                         default:
 *                           type: string
 *                           nullable: true
 *                           example: null
 *                   relationships:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         column:
 *                           type: string
 *                           example: role_id
 *                         referencedTable:
 *                           type: string
 *                           example: roles
 *                         referencedColumn:
 *                           type: string
 *                           example: id
 *       500:
 *         description: Server error while retrieving schema
 */

const router= express.Router();

router.get('/',async(req,res)=>{
    try {
        const schema= await getSchema();
        res.json(schema);
    } catch (error) {
        console.error('Error fetching schema:',error);
        res.status(500).json({error:'Failed to fetch schema'});
    }
})

export default router;