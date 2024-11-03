import dotenv from "dotenv";

// Load environment variables at the earliest possible point
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ["JWT_SECRET"];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`${envVar} environment variable is not set`);
    }
}

export default {
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT || 3000,
};
