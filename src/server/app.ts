import * as express from 'express';
import * as http from 'http';
const app: express.Express = express();

app.use(express.static('public'));

const port = process.env.PORT || "3000";
app.set('port', port);

const server = http.createServer(app);
server.listen(port);