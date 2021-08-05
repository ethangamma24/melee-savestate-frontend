npm run build
tar acf melee-savestate-frontend.tar.gz dist/ app.js api.js node_modules.tar.gz
scp -i ~/.ssh/elementary.pem melee-savestate-frontend.tar.gz ec2-user@34.234.165.23:~
ssh ec2-user@34.234.165.23 -i ~/.ssh/elementary.pem
