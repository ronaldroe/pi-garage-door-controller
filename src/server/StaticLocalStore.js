const fs = require('fs');
const isAbsPath = require(`${require.main.path}/src/helpers`).isAbsolutePath;

/**
 * Uses static files to maintain app state and logs. 
 */
class StaticLocalStore{
  
  constructor(){
    this.settings = JSON.parse(fs.readFileSync(`${require.main.path}/settings.json`));

    this.statePath = isAbsPath(this.settings.state_path) ? this.settings.state_path : `${require.main.path}/${this.settings.state_path}`;
    this.logPath = isAbsPath(this.settings.log_path) ? this.settings.log_path : `${require.main.path}/${this.settings.log_path}`;

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
    return this.state.doors.filter(door => door.id === id)[0];
  }

  /**
   * Retrieves door by name
   * 
   * @param string name 
   * 
   * @returns door state
   */
  getDoorByName(name){
    return this.state.doors.filter(door => door.name === name)[0];
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
  async writeState(){
    await fs.writeFileSync(this.statePath, JSON.stringify(this.state, null, 2));
  }

  /**
   * 
   */
  async readState(){
    await JSON.parse(fs.readFileSync(this.statePath));
  }

  /**
   * 
   *  
   */
  async writeLog(){
    await fs.writeFileSync(this.logPath, JSON.stringify(this.log, null, 2));
  }

  /**
   * 
   */
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

  setState(newState){
    this.state = newState;

    this.writeState();

    this.addLog(`State overwritten: ${newState}`);

    return this.state;
  }

  /**
   * @param int id of door
   * 
   * @param object stateUpdate 
   */
  updateState(id, stateUpdate){
    let doorIndex = this.state.doors.map(door => door.id).indexOf(id);
    
    this.state.doors[doorIndex] = {
      ...this.state.doors[doorIndex],
      ...stateUpdate
    };

    this.addLog(`${this.state.doors[doorIndex].name} state updated: ${JSON.stringify(stateUpdate)}`);

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