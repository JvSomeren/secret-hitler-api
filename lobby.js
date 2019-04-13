let lobbies = [];

function lobbyIndex( id ) {
  return lobbies.findIndex( function( lobby ) {
    return id === lobby.id;
  } );
}

function uidGenerator() {
  const uid = (((1+Math.random())*0x10000)|0).toString(16).substring(1);

  if( lobbyIndex( uid ) !== -1 ) return uidGenerator();
  return uid;
}

function Lobby() {
  this.id = uidGenerator();
  this.started = Date.now();
  this.peers = [];
}

Lobby.prototype.toJSON = function() {
  return { ...this };
};

Lobby.prototype.addPeer = function( peerId ) {
  if( this.peers.lastIndexOf( peerId ) !== -1 ) return;
  this.peers.push( peerId );
};

Lobby.prototype.removePeer = function( peerId ) {
  const index = this.peers.lastIndexOf( peerId );
  if( index !== -1 ) this.peers.splice( index, 1 );
};

Lobby.create = function() {
  const lobby = new Lobby();

  lobbies.push( lobby );

  return lobby;
};

Lobby.get = function( id ) {
  return ( lobbies.filter( function( lobby ) {
    return id === lobby.id;
  } ) || [] )[0];
};

Lobby.getAll = function() {
  return lobbies;
};

Lobby.remove = function( id ) {
  const index = lobbyIndex( id );

  if( index === -1 ) return false;
  return !!lobbies.splice( index, 1 );
};

module.exports = Lobby;
