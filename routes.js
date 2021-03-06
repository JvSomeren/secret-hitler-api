const express = require( 'express' );
const router = express.Router();

const Lobby = require( './lobby' );

function onlyLocalhost( req, res, next ) {
  const { hostname } = req;

  if( hostname === '127.0.0.1' || hostname === 'localhost' ) return next();
  res.status( 401 ).send( 'Unauthorized' );
}

/**
 * method: GET
 * path: ``
 * returns: Lobby[]
 */
router.get( '/', onlyLocalhost, function( req, res ) {
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
 * method: POST
 * path: `/removeOldLobbies`
 * returns: success || failure
 */
router.delete( '/removeOldLobbies', onlyLocalhost, function( req, res ) {
  res.json( Lobby.removeOldLobbies() );
} );

/**
 * method: GET
 * path: `/:id`
 * returns: lobby
 */
router.get( '/:id', function( req, res ) {
  const lobby = Lobby.get( req.params.id );

  if( !lobby ) return res.json( {
    status: 404,
    message: 'Lobby not found',
  } );

  res.json( lobby );
} );

/**
 * method: DELETE
 * path: `/:id`
 * returns: success || failure
 */
router.delete( '/:id', onlyLocalhost, function( req, res ) {
  if( Lobby.remove( req.params.id ) ) return res.status( 200 ).send( 'Lobby removed' );

  return res.json( {
    status: 404,
    message: 'Lobby not found',
  } );
} );

/**
 * method: POST
 * path: `/:id/addpeer/:peerid`
 * returns: lobby || failure
 */
router.post( '/:id/addpeer/:peerid', function( req, res ) {
  const lobby = Lobby.get( req.params.id );

  if( !lobby ) return res.json( {
    status: 404,
    message: 'Lobby not found',
  } );

  lobby.addPeer( req.params.peerid );
  res.json( lobby );
} );

/**
 * method: POST
 * path: `/:id/removepeer/:peerid`
 * returns: lobby || failure
 */
router.post( '/:id/removepeer/:peerid', function( req, res ) {
  const lobby = Lobby.get( req.params.id );

  if( !lobby ) return res.json( {
    status: 404,
    message: 'Lobby not found',
  } );

  lobby.removePeer( req.params.peerid );
  res.json( lobby );
} );

/**
 * method: POST
 * path: `/:id/sethost/:peerid`
 * returns: lobby || failure
 */
router.post( '/:id/sethost/:peerid', function( req, res ) {
  const lobby = Lobby.get( req.params.id );

  if( !lobby ) return res.json( {
    status: 404,
    message: 'Lobby not found',
  } );

  lobby.setHost( req.params.peerid );
  res.json( lobby );
});

module.exports = router;
