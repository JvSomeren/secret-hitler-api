const express = require( 'express' );
const router = express.Router();

const Lobby = require( './lobby' );

/**
 * method: GET
 * path: ``
 * returns: Lobby[]
 */
router.get( '/', function( req, res ) {
  // @TODO only allow origin localhost
  res.json( Lobby.getAll() );
} );

/**
 * method: GET
 * path: `/new`
 * returns: lobbyId
 */
router.get( '/new', function( req, res ) {
  const lobby = new Lobby();

  res.json( { id: lobby.id } );
} );

/**
 * method: GET
 * path: `/:id`
 * returns: lobbyDetails
 */
router.get( '/:id', function( req, res ) {
  const lobby = Lobby.get( req.params.id );

  if( !lobby ) return res.status( 404 ).send( 'Lobby not found' );

  res.json( lobby );
} );

/**
 * method: DELETE
 * path: `/:id`
 * returns: success || failure
 */
router.delete( '/:id', function( req, res ) { // @TODO only allow origin localhost
  if( Lobby.remove( req.params.id ) ) return res.status( 200 ).send( 'Lobby removed' );

  return res.status( 404 ).send( 'Lobby not found' );
} );

/**
 * method: POST
 * path: `/:id/addpeer/:peerid`
 * returns: success || failure
 */
router.post( '/:id/addpeer/:peerid', function( req, res ) {
  const lobby = Lobby.get( req.params.id );

  if( !lobby ) return res.status( 404 ).send( 'Lobby not found' );

  lobby.addPeer( req.params.peerid );
  res.json( lobby );
} );

/**
 * method: POST
 * path: `/:id/removepeer/:peerid`
 * returns: success || failure
 */
router.post( '/:id/removepeer/:peerid', function( req, res ) {
  const lobby = Lobby.get( req.params.id );

  if( !lobby ) return res.status( 404 ).send( 'Lobby not found' );

  lobby.removePeer( req.params.peerid );
  res.json( lobby );
} );

module.exports = router;
