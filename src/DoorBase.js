const gpio = require('pigpio').Gpio;
const fs = require('fs');


/**
 * Base door object. 
 * 
 * @param object doorInput object describing a door
 * 
 * @returns object Door
 */
class DoorBase{
  
  constructor(doorInput){
    this.settings = JSON.parse(fs.readFileSync(`${__dirname}/../settings.json`));
    this.door = doorInput;
    this.state = this.getState(); // 0=unknown, 1=down, 2=up, 3=moving
    this.pinUp = new gpio(this.door.pinUp);
    this.pinDown = new gpio(this.door.pinDown);
    this.pinNeutral = new gpio(this.door.pinNeutral);
    this.pinTrigger = new gpio(this.door.pinTrigger);
  }

  /**
   * Moves door regardless of current state
   */
  async public move(){
    let oldState = this.state;

    // code to initiate door move //
    this.triggerDoor();
    
    // Pause for 3 seconds to let the door start moving
    await this.sleep(3000);
    
    this.state = 3;
    
    // Polls the door every half second to see if it has stopped moving. Continues until
    // the door stops or the timeout expires.
    let canxToken = {};

    await this.sleep((this.settings.door_move_timeout - 3000), canxToken, () => {
      let pollInterval = setInterval(() => {
        if(this.getState() !== 3) {
          clearInterval(pollInterval);
          canxToken.cancel();
        }
      }, this.settings.door_poll_interval);
    });

    return new Promise((res, rej) => {
      let status = this.state - oldState;
      this.state = status;

      if(3 > status > 0){
        res(true);
      } else {
        rej(new Error(`Door state is "${status === 3 ? 'moving' : 'unknown'}" after move operation`));
      }
    });

  }

  async public triggerDoor(){
    // Trigger the door
  }

  /**
   * Checks pins to determine state
   * 
   * @returns integer 
   */
  public getState(){
    // Poll pins to get state
  }

  /**
   * Timeout helper function
   * 
   * @param number time - sleep time in milliseconds **Required**
   * @param object canxToken - any object (may even be empty), which allows a cancel method to be called, which in turn causes the promise to be reject. 
   *                           will cause an error, which should be caught
   * @param function callback - function to call before setting the timeout
   * @param array args - array of arguments to the callback. The array is spread into the callback.
   * 
   * @returns Promise, which resolves when the timeout is complete.
   */
  private async function sleep(time, canxToken, callback, args){

    return new Promise((res, rej) => {
      if(typeof canxToken !== 'undefined') canxToken.cancel = () => rej(new Error('canceled'));

      if(typeof callback === 'function') callback(Array.isArray(args) ? ...args : null);

      setTimeout(resolve, time);
    });

  }

}

module.exports = DoorBase;