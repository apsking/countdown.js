# CountDownTimer
CountDownTimer is a JavaScript timing object which can be used to call events for the given length of a time period. Events can also be assigned to trigger once the CountDownTimer has elapsed. CountDownTimers are fully enclosed JS objects with a object-oriented design.

##Example Use
### Create emtpy timer.
This use case is a little silly - because no callbacks are passed to the CountDownTimer, it doesn't do anything other than operate all on its own.
```js
var timer = new CountDownTimer(5000); // time in milliseconds
console.log(timer.getInitialTime()); // prints '5000'
console.log(timer.getCurrentTime()); // prints '5000'
timer.start();
//...wait a 2 seconds
timer.stop();
console.log(timer.getInitialTime()); // prints '5000'
console.log(timer.getCurrentTime()); // prints '3000'
```
### Create timer with tick and elapsed callbacks.
This is the primary use case for a CountDownTimer. Pass callback functions to trigger on tick() and timeElapsed(). Default tick duration is set to 1 second (1000 milliseconds).
```js
var timer = new CountDownTimer( 3000, // time in milliseconds
                                function() { // tick callback
                                  console.log("ticking...");
                                },
                                function() { // elapsed callback
                                  console.log("timer elapsed!");
                                });
timer.start();
//...wait a 1 second
// prints 'ticking...'
//...wait a 1 second
// prints 'ticking...'
//...wait a 1 seconds
// prints 'timer elapsed!'
console.log(timer.getInitialTime()); // prints '3000'
console.log(timer.getCurrentTime()); // prints '0'
```

### Reuse a timer
CountDownTimers can be used over and over by utilizing the reset() function.
```js
var timer = new CountDownTimer(3000, // time in milliseconds
                  function() { // tick callback
                  },
                  function() { // elapsed callback
                    console.log("timer elapsed!");
                  });
timer.start();
//...wait a 3 seconds
// prints 'timer elapsed!'
console.log(timer.getCurrentTime()); // prints '0'
timer.reset();
console.log(timer.getCurrentTime()); // prints '3000'
timer.start();
//...wait a 3 seconds
// prints 'timer elapsed!'
console.log(timer.getCurrentTime()); // prints '0'
