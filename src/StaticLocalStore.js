const fs = require('fs');
const isAbsPath = require(`${__dirname}/helpers`).isAbsolutePath;

/**
 * Uses static files to maintain app state and logs. 
 */
class StaticLocalStore{
  
  constructor(){
    this.settings = JSON.parse(fs.readFileSync(`${__dirname}/../settings.json`));

    this.statePath = isAbsPath(this.settings.state_path) ? this.settings.state_path : `${__dirname}/../${this.settings.state_path}`;
    this.logPath = isAbsPath(this.settings.log_path) ? this.settings.log_path : `${__dirname}/../${this.settings.log_path}`;

    this.state = JSON.parse(fs.readFileSync(this.statePath));
    this.log = JSON.parse(fs.readFileSync(this.logPath));

    this.logWritable = true;
    this.stateWritable = true;
  }

  /**
   * Retrieves door by id
   * 
   * @param int id 
   * 
   * @returns door state
   */
  getDoorById(id = 0){
    return this.state.filter(door => door.id === id)[0];
  }

  /**
   * 
   *  
   */
  getState(){
    return this.state;
  }

  /**
   * 
   *  
   */
  getLog(){
    return this.log;
  }

  /**
   * 
   *  
   */
  writeState(){
    fs.writeFileSync(this.statePath, JSON.stringify(this.state, null, 2));
  }

  /**
   * 
   *  
   */
  async writeLog(){
    await fs.writeFileSync(this.logPath, JSON.stringify(this.log, null, 2));
  }

  async readLog(){
    await JSON.parse(fs.readFileSync(this.logPath));
  }

  /**
   * 
   * @param string logLine 
   */
  async addLog(logLine){

    this.log.push({timestamp: new Date().getTime(), message: logLine});

    await this.writeLog();

    return this.log;
  }

  /**
   * 
   * @param object stateUpdate 
   */
  updateState(stateUpdate){
    this.state = {
      ...this.state,
      ...stateUpdate
    };

    this.addLog(`State updated: ${JSON.stringify(stateUpdate)}`);

    this.writeState();

    return this.state;
  }

  /**
   * 
   *  
   */
  clearLog(){
    this.log = [];

    this.writeLog();
  }

}

module.exports = StaticLocalStore;