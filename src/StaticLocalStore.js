const fs = require('fs');
const isAbsPath = require(`${__dirname}/helpers`).isAbsolutePath;

class StaticLocalStore{
  
  constructor(){
    this.settings = JSON.parse(fs.readFileSync(`${__dirname}/../settings.json`));

    this.statePath = isAbsPath(this.settings.state_path) ? this.settings.state_path : `${__dirname}/../${this.settings.state_path}`;
    this.logPath = isAbsPath(this.settings.log_path) ? this.settings.log_path : `${__dirname}/../${this.settings.log_path}`;

    this.state = JSON.parse(fs.readFileSync(this.statePath));
    this.log = JSON.parse(fs.readFileSync(this.logPath));
  }

  getState(){
    return this.state;
  }

  getLog(){
    return this.log;
  }

  writeState(){
    fs.writeFileSync(this.statePath, JSON.stringify(this.state, null, 2));
  }

  writeLog(){
    fs.writeFileSync(this.logPath, JSON.stringify(this.log, null, 2));
  }

  addLog(logLine){
    this.log.push(`[${new Date().toString()}] - ${logLine}`);

    this.writeLog();
    
    return this.log;
  }

  updateState(stateUpdate){
    this.state = {
      ...this.state,
      ...stateUpdate
    };

    this.addLog(`State updated: ${JSON.stringify(stateUpdate)}`);

    this.writeState();

    return this.state;
  }

  clearLog(){
    this.log = [];

    this.writeLog();
  }

}

module.exports = StaticLocalStore;