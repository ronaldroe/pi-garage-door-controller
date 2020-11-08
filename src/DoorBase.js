const gpio = require('pigpio').Gpio;
const settings = require('./settings.json');

/**
 * Base door object. 
 * 
 * @param object doorInput object describing a door
 * 
 * @returns object Door
 */
class DoorBase{

  constructor(doorInput){
    this.door = doorInput;
    this.state = this.getState(); // 0=unknown, 1=down, 2=up, 3=moving
    this.input = new gpio(this.door.input);
    this.output = new gpio(this.door.output);
  }

  /**
   * Moves door regardless of current state
   */
  async public move(){
    let oldState = this.state;

    // code to initiate door move //


    // code to verify the door started moving - if neither switch is closed, presume moving //

    this.state = 3;

    this.timeout(() => {
      let pollInterval = setInterval(this.getState(), 500);
    }, settings.timeout)

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

  /**
   * Checks pins to determine state
   * 
   * @returns door object after updating state
   */
  public getState(){
    // Poll pins to get state
  }

  /**
   * Timeout helper function
   */
  private async function timeout(method, time, args){

    return new Promise((res, rej) => {
      method(Array.isArray(args) ? ...args : null);
      setTimeout(() => res(true), time);
    });

  }

}

module.exports = DoorBase;