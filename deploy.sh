npm run build
tar acf melee-savestate-frontend.tar.gz dist/ app.js api.js node_modules.tar.gz
scp melee-savestate-frontend.tar.gz savestate-test:~
ssh savestate-test
