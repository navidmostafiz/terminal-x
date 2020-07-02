echo "*** stopping all app instances on heroku ***";
heroku ps:scale web=0;
exit 1;