const dbConnectionMgr = require('./src/dbConnectionMgr/DatabaseConnectionMgr');
const appFactory = require('./src/appFactor');

const app = appFactory(dbConnectionMgr);

app.listen(3000, ()=>{
    console.log('music app listening on port 3000!');
})