CREATE DATABASE your_database;
-- Create user and grant privileges
CREATE USER your_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE your_database TO your_user;

-- Create stored procedure for updating inventory
CREATE OR REPLACE PROCEDURE decrease_inventory(product_id INTEGER, quantity INTEGER)
AS $$
BEGIN
  UPDATE products
  SET inventory = inventory - quantity
  WHERE id = product_id;
END;
$$ LANGUAGE plpgsql;
