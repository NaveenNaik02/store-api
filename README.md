express setup with typescript

npm init -y
npm install express,dotenv
add app.js and do basic express setup
run the app

npm i -D typescript @types/express @types/node
generate tsconfig.json --> npx tsc --init
change outDir compiler option in tsconfig file to /dist
rename app.js to app.ts and do changes required
npm install -D concurrently nodemon

add the commands to package.json
"build": "npx tsc",
"start": "node dist/app.js",
"dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/app.js\""

connection_string = "mongodb+srv://naveen:HMQXzpdmkSIM3PnC@nodeexpressprojects.vcj52ag.mongodb.net/store-api?retryWrites=true&w=majority"

npm run dev
