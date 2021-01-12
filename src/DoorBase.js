const gpio = require('pigpio').Gpio;
const fs = require('fs');

const settings = JSON.parse(fs.readFileSync(`${__dirname}/../settings.json`));

const Store = require(`./${!settings.remote_data_url ? 'StaticLocalStore' : 'StaticRemoteStore'}`);
const { sleep } = require('./helpers');

/**
 * Base door object. 
 * 
 * @param object doorInput object describing a door
 * 
 * @returns object Door
 */
class DoorBase{
  
  constructor(store, id){
    this.store = store;
    this.door = this.store.getDoorById(id || 0);
    
    this.pinUp = new gpio(this.door.pinUp, {mode: gpio.INPUT, pullUpDown: gpio.PUD_UP});
    this.pinDown = new gpio(this.door.pinDown, {mode: gpio.INPUT, pullUpDown: gpio.PUD_UP});
    this.pinTrigger = new gpio(this.door.pinTrigger, {mode: gpio.OUTPUT});
    
    this.status = this.getStatus();
    this.statuses = ['unknown', 'down', 'up', 'moving'];
  }

  /**
   * Moves door regardless of current state
   * 
   * @returns Promise resolves to true if door moved successfully, rejects if not
   */
  async move(){
    let oldStatus = this.status;

    // code to initiate door move //
    await this.triggerDoor();
    
    // Pause for 2 seconds to let the door start moving
    await sleep(2000);
    
    this.status = 3;
    
    // Polls the door every half second to see if it has stopped moving. Continues until
    // the door stops or the timeout expires.
    // This will fail, because we're using the reject to stop polling the door,
    // so in the catch, we're just going to do nothing
    let canxToken = {};
    try{
      await sleep((settings.door_move_timeout - 2000), canxToken, () => {
        let pollInterval = setInterval(() => {
          if(this.getStatus() !== 3) {
            clearInterval(pollInterval);
            this.status = this.getStatus();
            canxToken.cancel();
          }
        }, settings.door_poll_interval);
      });
    } catch(e){
      // This is actually not a failure state
    }

    return new Promise((res, rej) => {

      if(3 > this.status > 0 && this.status !== oldStatus){
        this.store.updateState(this.door.id, {status: this.status});
        this.store.addLog(`Door [${this.door.name}] successfully moved ${this.statuses[this.status]}`);
        res(true);
      } else {
        this.store.addLog(`Door [${this.door.name}] is in an ${this.status === 3 ? 'moving' : this.status === oldStatus ? 'unchanged' : 'unknown'} state`);
        rej(new Error(`Door state is "${this.status === 3 ? 'moving' : this.status === oldStatus ? 'unchanged' : 'unknown'}" after move operation`));
      }
    });

  }

  /**
   * Starts door movement
   */
  async triggerDoor(){
    // Trigger the door
    this.pinTrigger.digitalWrite(0);

    await sleep(1000);

    this.pinTrigger.digitalWrite(1);
    
    this.store.addLog(`Door [${this.door.name}] initiated movement`);

    return this;
  }

  /**
   * Checks pins to determine status
   * 
   * @returns integer 
   */
  getStatus(){
    let currentStatus = 3;

    if(this.pinDown.digitalRead() === 0) currentStatus = 1;
    if(this.pinUp.digitalRead() === 0) currentStatus = 2;

    return currentStatus;
  }

  /**
   * Returns array of all configured doors
   * 
   * @returns array
   */
  static getAllDoors(store){
    let doors = store.getState().doors;

    doors.forEach((door, it) => {
      doors[it] = new DoorBase(store, door.id);
    });

    return doors;
  }

}

module.exports = DoorBase;