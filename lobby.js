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
    this.host = null;

    Lobby.addLobby( this );
  }

  addPeer( peerId ) {
    if( this.peers.lastIndexOf( peerId ) !== -1 ) return;
    this.peers.push( peerId );
  }

  removePeer( peerId ) {
    const index = this.peers.lastIndexOf( peerId );
    if( index !== -1 ) this.peers.splice( index, 1 );
  }

  setHost( peerId ) {
    this.host = peerId;
  }

  static get lobbies() {
    return this.hasOwnProperty( '_lobbies' ) ? this._lobbies : [];
  }

  static set lobbies( lobbies ) {
    this._lobbies = lobbies;
  }

  static addLobby( lobby ) {
    this._lobbies.push( lobby );
  }

  static removeLobby( index ) {
    if( index === -1 ) return false;
    return !!this._lobbies.splice( index, 1 );
  }

  static get( id ) {
    return ( this.lobbies.filter( function( lobby ) {
      return id === lobby.id;
    } ) || [] )[0];
  }

  static getAll() {
    return this.lobbies;
  }

  static remove( id ) {
    const index = this.lobbyIndex( id );

    if( index === -1 ) return false;
    return this.removeLobby( index );
  }

  static lobbyIndex( id ) {
    return this.lobbies.findIndex( function( lobby ) {
      return id === lobby.id;
    } );
  }

  static removeOldLobbies() {
    const now = Date.now();
    const day = 60 * 60 * 24 * 1000; // full day in milliseconds

    return this.lobbies = this.lobbies.reduceRight( function( lobbies, lobby ) {
      if( now - lobby.started > day ) return lobbies;

      return lobbies.concat( lobby );
    }, [] );
  }
}
Lobby.lobbies = [];

module.exports = Lobby;
