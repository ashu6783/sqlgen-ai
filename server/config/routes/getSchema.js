import pool from '../mysql.js';

async function getSchema() {
  try {
    // Get table and column details
    const [tables] = await pool.query('SHOW TABLES');
    const schemaArray = []; // Changed from object to array

    for (const table of tables) {
      const tableName = Object.values(table)[0];
      const [columns] = await pool.query(`DESCRIBE ${tableName}`);
      
      const tableSchema = {
        table: tableName,
        columns: columns.map(col => ({
          name: col.Field,
          type: col.Type,
          nullable: col.Null === 'YES',
          key: col.Key,
          default: col.Default,
        })),
        relationships: [],
      };
      
      schemaArray.push(tableSchema); // Push to array instead of assigning to object
    }

    const [foreignKeys] = await pool.query(`
      SELECT 
        TABLE_NAME, 
        COLUMN_NAME, 
        REFERENCED_TABLE_NAME, 
        REFERENCED_COLUMN_NAME 
      FROM 
        INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
      WHERE 
        TABLE_SCHEMA = DATABASE() 
        AND REFERENCED_TABLE_NAME IS NOT NULL
    `);

    // Add relationships to the correct table in the array
    for (const fk of foreignKeys) {
      const tableSchema = schemaArray.find(t => t.table === fk.TABLE_NAME);
      if (tableSchema) {
        tableSchema.relationships.push({
          column: fk.COLUMN_NAME,
          referencedTable: fk.REFERENCED_TABLE_NAME,
          referencedColumn: fk.REFERENCED_COLUMN_NAME,
        });
      }
    }

    return schemaArray; // Return array instead of object
  } catch (error) {
    console.error('Error fetching schema:', error);
    throw error;
  }
}

export default getSchema;