const app = require('../app');
const { serverConfig } = require('../config')

app.listen(serverConfig.PORT, () => {
  console.log('Server running at port :', serverConfig.PORT);
});
