const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const db = require('./db.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

server.get('/lists', (req, res) => {
  db.lists.forEach((list) => {
    list.total = db.list.filter(item => item.listId === list.id).length;
    list.completed = db.list.filter(item => item.listId === list.id && item.completed).length;
  });

  res.jsonp(db.lists);
});

server.use(jsonServer.bodyParser);
server.post('/lists', (req, res, next) => {
  req.body.total = 0;
  req.body.completed = 0;

  next();
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
// server.use(jsonServer.bodyParser);
// server.use((req, res, next) => {
//   if (req.method === 'POST' && req.url === '/lists') {
//     req.body.total = 0;
//     req.body.completed = 0;
//   }
//
//   next()
// });

// Use default router
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running')
});
