const axios = require('axios');
const logger = require('../config/logger.js');
const { connectToDatabase, closeDatabaseConnection } = require('../config/database.js');
const sql = require('mssql');
require('dotenv').config();




/**
 * Obtenemos Pedidos en estado de exportacion false
 * @returns 
 */
async function obtenerEntidades(req , res){
    try {
        
        logger.info(`Iniciamos la funcion obtenerEntidades`);
      
        await connectToDatabase('BdQMakita');
        
        const consulta = `select  Empresa, tipoEntidad , Entidad, Nombre , RazonSocial, Direccion
                          from BdQMakita.dbo.Entidad 
                          where tipoEntidad = 'Cliente' 
                          and Vigencia = 'S' 
                          and Categoria = 'Servicio Tecnico' 
                          and Empresa = 'Makita'
`;
        result = await sql.query(consulta);
        console.log("result: " , result);
        logger.info(`Fin de la funcion obtenerEntidades`);
       
        if (!result || !result.recordsets || !result.recordsets[0] || result.recordsets[0].length === 0) {
            return res.status(200).json({ mensaje: 'No existen clientes' });
        } else {
            res.status(200).json(result.recordsets[0]);
        }
        
        
    } catch (error) {
        
        // Manejamos cualquier error ocurrido durante el proceso
        logger.error(`Error en obtenerEntidades: ${error.message}`);
        res.status(500).json({ error: `Error en el servidor [obtener-entidades-ms] :  ${error.message}`  });
        
    }finally{
        await closeDatabaseConnection();
    }
}


module.exports = {
    obtenerEntidades
};
