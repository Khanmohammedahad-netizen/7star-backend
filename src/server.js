import app from './app.js';
import { env } from './config/env.js';

app.listen(env.port || 4000, () => {
  console.log(`Backend running`);
});
