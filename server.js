const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();

const db = router.db;

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

server.get('/lists', (req, res) => {
  const listsCollection = db.get('lists').value();
  const listCollection = db.get('list').value();

  listsCollection.forEach((list) => {
    list.total = listCollection.filter(item => item.listId === list.id).length;
    list.completed = listCollection.filter(item => item.listId === list.id && item.completed).length;
  });

  res.jsonp(listsCollection);
});

server.use(jsonServer.bodyParser);
server.post('/lists', (req, res, next) => {
  req.body.total = 0;
  req.body.completed = 0;

  next();
});

server.use(jsonServer.bodyParser);
server.put('/lists/:id', (req, res, next) => {
  const list = db.get('lists').value().find(item => +item.id === +req.params.id);

  req.body.total = list && list.total;
  req.body.completed = list && list.completed;

  next();
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
// server.use(jsonServer.bodyParser);
// server.use((req, res, next) => {
//   if (req.method === 'PUT' && req.url.indexOf('/lists/') !== -1) {
//
//   }
//
//   next()
// });

// Use default router
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running')
});
