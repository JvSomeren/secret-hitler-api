const express = require( 'express' );
const app = express();
const cors = require( 'cors' );
require( 'dotenv' ).config();
const routes = require( './routes' );

const port = process.env.PORT || 3000;

/**
 * Configure CORS
 */
const whitelist = process.env.NODE_END === 'development' ?
  [
    /http:\/\/localhost:*/,
    /\.someren\.dev$/,
  ] :
  [
    /\.someren\.dev$/,
  ];
const corsOptions = {
  origin: whitelist,
  optionsSuccessStatus: 200,
};
app.use( cors( corsOptions ) );

/**
 * Define routes
 */
app.use( '/', routes );

app.listen( port );
console.log( `Listening on ${port}` );
