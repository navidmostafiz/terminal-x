echo "*** stopping all app instances on heroku ***";
heroku ps:scale web=0 -a gutibaji
exit 1;