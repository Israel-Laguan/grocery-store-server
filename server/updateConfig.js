import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the configuration file in the same directory
const filePath = path.join(__dirname, 'configuration.json');

export const updateConfig = (message) => {
    try {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                throw new Error(`Error reading the file: ${err.message}`);
            }
            try {
                const config = JSON.parse(data);
                config.welcomeMessage = message; // Modify the welcome message

                fs.writeFile(filePath, JSON.stringify(config, null, 2), (err) => {
                    if (err) {
                        throw new Error(`Error writing to the file: ${err.message}`);
                    } else {
                        fs.readFile(filePath, 'utf8', (readErr) => {
                            if (readErr) {
                                throw new Error(`Error reading updated file: ${readErr.message}`);
                            }
                        });
                    }
                });
            } catch (parseErr) {
                throw new Error(`Error parsing JSON: ${parseErr.message}`);
            }
        });
    } catch (error) {
        throw error; // Rethrow the error for higher-level handling
    }
};
