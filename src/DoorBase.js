const pigpio = require('pigpio');
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
  }

  /**
   * Moves door regardless of current state
   */
  async public move(){
    let oldState = this.state;

    // code to initiate door move //


    // code to verify the door started moving - if neither switch is closed, presume moving //

    this.state = 3;

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

  public getState(){

  }

  private async function timeout(time){

    

  }

}

module.exports = DoorBase;