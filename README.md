# :strawberry: terminal-x
IO-SOCKET NODEJS TERMINAL STYLE CHAT APPLICATION
![terminal-x screenshot](https://github.com/navidmostafiz/terminal-x/blob/master/screenshot2.png)

# CLONE: 
```
git clone https://github.com/navidmostafiz/terminal-x.git
```

# INSTALL: 
```
npm install
```

# RUN IN PRODUCTION
```
npm run start
```

# RUN IN DEV WITH NODEMON
```
npm run dev
```

# RUN CLIENT
http://localhost:3000/

# RUN IT ON HEROKU
* CREATE HEORKU APP IF NOT CREATED ALREADY
```
heroku create
Creating app... done, ⬢ HEROKU_APP_NAME
```
* Deploy your project to heroku
```
git push heroku master
```
* START AN INSTANCE OF THE APP ON HEROKU
```
heroku ps:scale web=1
```
* OPEN THE WEB APP ON BROWSER:
```
heroku open
```
* STOP APP INSTANCE ON HEROKU
```
heroku ps:scale web=0
```
* CHECK LOGS ON HEROKU
```
heroku logs --tail
```
* DEPLOY CHANGES, commit and push app to git and then push to heroku
```
git add .
git commit -a -m "changes"
git push heroku master
heroku ps:scale web=1
```