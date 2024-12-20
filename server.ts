import config from "./config";
import app from "./app";
import logger from "./utils/logger";

const PORT = config.PORT;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
