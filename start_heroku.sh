echo "*** deploying latest git push to heroku ***";
git push heroku master;
echo "*** starting 1 app instance on heroku ***";
heroku ps:scale web=1;
heroku open;
# heroku logs --tail;
exit 1;