const dbConnectionMgr = require('./src/dbConnectionMgr/DatabaseConnectionMgr');
const spotifyMgr = require('./src/spotifyConnectionMgr/spotifyMgr')
const appFactory = require('./src/appFactor');

const app = appFactory(dbConnectionMgr,spotifyMgr);

app.listen(3000, ()=>{
    console.log('music app listening on port 3000!');
})