# THIS IS A KNIGHT PROJECT

1. I tried to configure as easy as I could but my time was running short

- First: run ```docker-compose up -d``` This will help you set up the DB
- After everything finishes list all docker containers running: ```docker ps```
- Get the ID of the mongo container and run ```docker exec -it <id do container> bash```
- Then inside the container run ```mongo -u 'mongod' -p '123456789'```
- Then ```  db.createUser({user: "mongod",pwd: "123456789",roles: [ "readWrite"]})```

## After DB CONFIG
run ``` npm install ``` 
run ```npm start```

The app is running

