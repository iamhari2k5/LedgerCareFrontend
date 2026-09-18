import app from './app.js';
import config from './config/env.js';

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`  CHARITY BACKEND SERVICE ACTIVE ON PORT ${PORT}`);
  console.log(`  Healthcheck: http://localhost:${PORT}/api/health`);
  console.log(`  Environment: ${config.nodeEnv}`);
  console.log(`=================================================`);
});
