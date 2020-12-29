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
async function sleep(time, canxToken, callback, args = []){

  return new Promise((res, rej) => {
    if(typeof callback === 'function'){
      callback(...args);
    }

    let sleepTimeout = setTimeout(res, time);

    if(typeof canxToken !== 'undefined') {
      canxToken.cancel = function(){
        clearTimeout(sleepTimeout);
        rej(new Error('canceled'));
      }
    }
  });

}

module.exports = sleep;