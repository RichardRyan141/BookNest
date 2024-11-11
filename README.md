1) Frontend --> npm start
2) Backend --> node index.js
3) redis --> cd C:\Program Files\Redis --> redis-server.exe

Cek redis
1) cd C:\Program Files\Redis
2) redis-cli
3) KEYS *
4) DEL session:3

Database
1) npx sequelize-cli db:migrate:undo
2) npx sequelize-cli db:migrate
3) npx sequelize-cli db:seed:all
4) npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string