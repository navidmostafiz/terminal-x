# :strawberry: terminal-x

```
Now that we have the GitHub Arctic Code Vault, hence we can now focaus on post-apocalyptic world.
We will need just the right tools to survive. Security is very crucial.
Thus we need a communication tool that will be immune from server interference.
Something tells me webRTC is not the answer for the future.
client side encryption?
questions remain...
```

IO-SOCKET NODEJS TERMINAL STYLE CHAT APPLICATION
![terminal-x screenshot](https://github.com/navidmostafiz/terminal-x/blob/master/screenshot2.png)

# DEPS

```
npm install terser -g
npm install clean-css-cli -g
OR
npm install uglifycss -g
```

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

http://localhost:9000/

# RUN IT ON HEROKU

```
// CREATE HEORKU APP IF NOT CREATED ALREADY
Creating app... done, ⬢ HEROKU_APP_NAME
// Deploy your project to heroku
git push heroku master
// START AN INSTANCE OF THE APP ON HEROKU
heroku ps:scale web=1
// OPEN THE WEB APP ON BROWSER:
heroku open
// STOP APP INSTANCE ON HEROKU
heroku ps:scale web=0
// CHECK LOGS ON HEROKU
heroku logs --tail
// DEPLOY CHANGES, commit and push app to git and then push to heroku
git add .
git commit -a -m "changes"
git push heroku master
heroku ps:scale web=1
// RENAME HOERKU APP:
heroku apps:rename NEW_NAME
```
