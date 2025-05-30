def create_prompt(nlq, schema):
    try:
        # Validate schema
        if not isinstance(schema, list):
            raise ValueError(f"Schema must be a list, got {type(schema)}: {schema}")
        for table in schema:
            if not isinstance(table, dict) or 'table' not in table or 'columns' not in table:
                raise ValueError(f"Invalid table format: {table}")
            if not isinstance(table['columns'], list):
                raise ValueError(f"Columns must be a list, got {type(table['columns'])}")
            for col in table['columns']:
                if not isinstance(col, dict) or 'name' not in col or 'type' not in col:
                    raise ValueError(f"Invalid column format: {col}")

        schema_str = "\n".join(
            [
                f"Table: {table['table']}\nColumns: {', '.join([f'{col['name']} ({col['type']})' for col in table['columns']])}"
                for table in schema
            ]
        )

        relationships = """
Relationships:
- Table 'customers' is linked to table 'orders' via customers.id = orders.customer_id
- Table 'orders' is linked to table 'order_items' via orders.id = order_items.order_id
- Table 'orders' is linked to table 'payments' via orders.id = payments.order_id
- Table 'orders' is linked to table 'shipping' via orders.id = shipping.order_id
- Table 'products' is linked to table 'order_items' via products.id = order_items.product_id
"""

        prompt = f"""
Given the following database schema:
{schema_str}

{relationships}

Given the following natural language query:
{nlq}

Generate a valid SQL query to answer the request. Ensure the query:
- Includes appropriate table names and aliases (e.g., 'customers c', 'orders o').
- Uses JOINs to link tables based on the relationships provided.
- Includes a GROUP BY clause if aggregation (e.g., SUM, COUNT) is used.
- Returns only the SQL query, without any additional text or explanations.

Example:
For "Show customer names and their total spent":
SELECT c.first_name, c.last_name, SUM(o.amount) AS total_spent
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.first_name, c.last_name;
"""
        return prompt
    except Exception as e:
        raise ValueError(f"Failed to create prompt: {str(e)}")