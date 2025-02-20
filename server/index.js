import express, { json } from "express";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml'
import pg from "pg";
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import configuration from './configuration.json' with { type: "json" };
import { updateConfig } from './updateConfig.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const swaggerDocument = YAML.parse(fs.readFileSync(path.join(__dirname, 'openapi.yaml'), 'utf8'));

const app = express();
const port = configuration.port || 8000;

const swaggerOptions = {
  definition: swaggerDocument,
  apis: ['./*.js'],
};

// Database connection
const pool = new pg.Pool({
  user: "your_user",
  host: "postgres",
  database: "your_database",
  password: "your_password",
  port: 5432,
});

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.post("/change-welcome-message", (req, res) => {
  const { message } = req.body;
  if(!message) {
    return res.status(400).json({ error: "Message is required"});
  }
  updateConfig(message)
  res.json({ message: "Welcome message changed" });
});
app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({
      status: "OK",
      message: "Server and database connection are healthy",
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error", message: "Database connection failed" });
  }
});

//#region Users CRUD
app.get("/users", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    if (rows.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const { rows } = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email],
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const { rows } = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id],
    );
    if (rows.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the user" });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query("DELETE FROM users WHERE id = $1", [
      id,
    ]);
    if (rowCount === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user" });
  }
});
//#endregion

//#region Products CRUD
app.post("/products", async (req, res) => {
  const { name, price, inventory } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO products (name, price, inventory) VALUES ($1, $2, $3) RETURNING *",
      [name, price, inventory],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
});

app.get("/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ error: "Failed to get products" });
  }
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({ error: "Failed to get product" });
  }
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, inventory } = req.body;
  try {
    const result = await pool.query(
      "UPDATE products SET name = $1, price = $2, inventory = $3 WHERE id = $4 RETURNING *",
      [name, price, inventory, id],
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM products WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(204).send(); // No content
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
});
//#endregion

//#region Buys CRUD
app.get("/buys", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM buys");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching buys" });
  }
});

app.get("/buys/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM buys WHERE id = $1", [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: "Buy not found" });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the buy" });
  }
});

app.post("/buys", async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;
    const { rows } = await pool.query(
      "INSERT INTO buys (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
      [user_id, product_id, quantity],
    );

    // Call the stored procedure to update inventory
    await pool.query("CALL update_inventory($1, $2)", [product_id, quantity]);

    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating the buy" });
  }
});

app.put("/buys/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, product_id, quantity } = req.body;
    const { rows } = await pool.query(
      "UPDATE buys SET user_id = $1, product_id = $2, quantity = $3 WHERE id = $4 RETURNING *",
      [user_id, product_id, quantity, id],
    );
    if (rows.length === 0) {
      res.status(404).json({ error: "Buy not found" });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the buy" });
  }
});

app.delete("/buys/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query("DELETE FROM buys WHERE id = $1", [
      id,
    ]);
    if (rowCount === 0) {
      res.status(404).json({ error: "Buy not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting the buy" });
  }
});
//#endregion

app.use((err) => {
  throw new Error(JSON.stringify(err))
});

app.listen(port, () => {
  console.log(`${configuration.welcomeMessage}. Server is running on port ${port}`);
});
