let lobbies = [];

function uidGenerator() {
  const uid = (((1+Math.random())*0x10000)|0).toString(16).substring(1).toUpperCase();

  if( Lobby.lobbyIndex( uid ) !== -1 ) return uidGenerator();
  return uid;
}

class Lobby {
  constructor() {
    this.id = uidGenerator();
    this.started = Date.now();
    this.peers = [];

    lobbies.push( this );
  }

  addPeer( peerId ) {
    if( this.peers.lastIndexOf( peerId ) !== -1 ) return;
    this.peers.push( peerId );
  }

  removePeer( peerId ) {
    const index = this.peers.lastIndexOf( peerId );
    if( index !== -1 ) this.peers.splice( index, 1 );
  }

  static get( id ) {
    return ( lobbies.filter( function( lobby ) {
      return id === lobby.id;
    } ) || [] )[0];
  }

  static getAll() {
    return lobbies;
  }

  static remove( id ) {

  }

  static lobbyIndex( id ) {
    return lobbies.findIndex( function( lobby ) {
      return id === lobby.id;
    } );
  }
}

module.exports = Lobby;
