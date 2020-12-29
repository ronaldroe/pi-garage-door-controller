const StaticLocalStore = require('./StaticLocalStore');
const fetch = require('node-fetch');

class StaticRemoteStore extends StaticLocalStore{

  constructor(remote){
    super();

    this.remote = remote;
  }

  async retrieveState(key){
    
    return await fetch(this.remote.stateUrl, {
      method: 'GET',
      headers: {...this.remote.headers},
      body: typeof this.remote.body !== 'undefined' ? JSON.stringify(this.remote.body) : null
    })
    .then(res => res.json())
    .then(data => {
      return super.updateState(data[key]);
    })
    .catch(err => {
      console.log(err.stack);
      this.addLog(`An error occurred: ${err.message}`)
    });

  }

  async sendState(state = super.state){

    return await fetch(this.remote.stateUrl, {
      method: 'POST',
      headers: {...this.remote.headers},
      body: JSON.stringify(state)
    })
    .then(res => res.json())
    .catch(err => {
      console.log(err.stack);
      this.addLog(`An error occurred: ${err.message}`)
    });

  }

  async retrieveLog(){
    
    return await fetch(this.remote.logUrl, {
      method: 'GET',
      headers: {...this.remote.headers},
      body: typeof this.remote.body !== 'undefined' ? JSON.stringify(this.remote.body) : null
    })
    .then(res => res.json())
    .then(data => {
      return this.addLog(data);
    })
    .catch(err => {
      console.log(err.stack);
      this.addLog(`An error occurred: ${err.message}`)
    });

  }

  async sendLog(log = super.log){

    return await fetch(this.remote.logUrl, {
      method: 'POST',
      headers: {...this.remote.headers},
      body: JSON.stringify(log)
    })
    .then(res => res.json())
    .catch(err => {
      console.log(err.stack);
      this.addLog(`An error occurred: ${err.message}`)
    });

  }

}

module.exports = StaticRemoteStore;