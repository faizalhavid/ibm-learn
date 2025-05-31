import { testString } from "./functions";

const name = <h1>John</h1>;

console.log(`Hello, ${name.props.children}!`);

// Read env variables
const database = {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
}


console.info(database);
// to run env production,we need to set the environment variable NODE_ENV to production
/*
set NODE_ENV=production
bun --env-file .env.production index.tsx
*/


//  bun watch mode
//  bun --watch index.tsx
// then make changes to the file and see the changes in the console

// bun package manager
//  bun add react
//  bun remove react
//  bun install
//  bun install --prod
//  bun install --dev
//  bun install --peer
// cache
//  bun cache clean
//  bun cache list
//  bun cache remove


// bun test
//  bun test
//  bun test --watch
//  bun test --coverage
//  bun test --update-snapshot

// package runner
// bunx --module

// workspace


// bunfig

