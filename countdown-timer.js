/*
	@author Alex King
	@date 08/12/2016
*/

/**
* CountDownTimer is a timing object which can be used to call
* events for the given length of a time period. Events can also
* be assigned to trigger once the CountDownTimer has elapsed.
* @constructor
* @param {int} mills - Duration of the timer (in milliseconds)
* @param {requestCallback} tickCallback - Callback function to trigger on every tick interval
* @param {requestCallback} elapsedCallback - Callback function to trigger after timer has elapsed
*/
function CountDownTimer(mills, tickCallback, elapsedCallback){

  //Validate parameters
  _validateNonNegativeInt(mills, "mills");

  _validateCallback(tickCallback, true, "tickCallback");
  _validateCallback(elapsedCallback, true, "elapsedCallback");

  //Private Fields
  var _initialTime = mills; // intiatiate initial time with validated int
  var _currentTime = mills; // intiatiate current time with validated int
  var _tickDuration = 1000; // set default tick duration

  this._tickInterval = null;
  this._tickCallback = null;
  this._elapsedCallback = null;

  //Assign callbacks if they are passed as parameters
  if(tickCallback){
    this._tickCallback = tickCallback;
  }
  if(elapsedCallback){
    this._elapsedCallback = elapsedCallback;
  }

  /*** Functions ***/

  /** Start the CountDownTimer */
  this.start = function(){
    this.tick();
  };

  /**
  * Stop the CountDownTimer. Duration remaining will be paused until
  * start()ed again
  */
  this.stop = function(){
    if(this._tickInterval){
      clearInterval(this._tickInterval); // clear interval, if exists
    }
  };

  /**
  * Tick the timer for every time interval until timer has elapsed
  */
  this.tick = function(){
    var thisRef = this; // store reference to 'this'
    var currentTime = thisRef.getCurrentTime();
    var tickDuration = _tickDuration;

    // set next interval of tick function
    thisRef._tickInterval = setInterval(function(){
      var curTime = thisRef.getCurrentTime();
      if( curTime > 0){ // if timer still has remaining time, update time
        thisRef.setCurrentTime(Math.max((curTime - tickDuration), 0));

        // if callback exists, trigger event
        if(thisRef._tickCallback){
          thisRef._tickCallback();
        }

      }else{ // if timer has elapsed, clear interval and trigger elapsed callback
        clearInterval(thisRef._tickInterval);

        // if callback exists, trigger event
        if(thisRef._elapsedCallback){
          thisRef._elapsedCallback();
        }
      }
    }, this.getTickDuration()); // set interval using tickDuration
  };

  /**
  * Reset the timer to its initial state.
  */
  this.reset = function(){
    _currentTime = _initialTime; // reset current time to initial time
    this.stop(); // stop tick() events
    this._tickInterval = null;
  };

  /**
  * Get the initial time of the timer
  * @return {int} _initialTime - Initial time set for the timer (in milliseconds)
  */
  this.getInitialTime = function(){
    return _initialTime;
  };

  /**
  * Get the current time of the timer
  * @return {int} _currentTime - Current time to set for the timer (in milliseconds)
  */
  this.getCurrentTime = function(){
    return _currentTime;
  };

  /**
  * Set the current time of the timer
  * @param {int} mills - Positive, non-zero time (in milliseconds) to set the current time
  */
  this.setCurrentTime = function(mills){
    _validateNonNegativeInt(mills, "mills");
    _currentTime = mills; // set time
  };

  /**
  * Get the tick duration of the timer
  * @return {int} _tickDuration - Tick duration to set for the timer (in milliseconds)
  */
  this.getTickDuration = function(){
    return _tickDuration;
  };

  /**
  * Set the tick duration of the timer
  * @param {int} mills - Positive, non-zero time (in milliseconds) to set the tick duration
  */
  this.setTickDuration = function(mills){
    _validateNonNegativeInt(mills, "mills");
    _tickDuration = mills; // set time
  };
}

/*** Helper Functions ***/

/**
* Validate integers as positive and non-zero
* @param {int} num - Integer to validate
* @param {string} name - Name of the integer
* @throws Invalidated integer exception
* @return {int} num - Validated integer
*/
function _validateNonNegativeInt(num, name){
  if(!name){
    name = "variable";
  }
  if( typeof num !== 'number' ){
    throw "ERROR: " + name + " must be defined as an integer.";
  }

  if( num < 0 ){
    throw "ERROR: " + name + " must be a positive integer.";
  }

  return num;
};

/**
* Validate functions as callback functions
* @param {requestCallback} callback - Callback function
* @param {bool} isOptional - Whether or not the callback function is optional
* @param {string} name - Name of the callback function
* @throws Invalidated callback exception
* @return {requestCallback} callback - Validated callback function
*/
function _validateCallback(callback, isOptional, name){
  if(isOptional){
    if( (typeof callback !== 'undefined' || callback === null)
        && typeof callback !== 'function') {
        throw "ERROR: " + name + " is optional, but must be a function, if defined.";
    }
  }else{
    if( typeof callback !== 'function') {
        throw "ERROR: " + name + " must be a function.";
    }
  }

  return callback;
};
