# CountUpTimerJS
CountUpTimerJS - RealTime CountUp Timer JavaScript Library

### これは何？
カウントアップタイマー、JavaScriptライブラリです。

### demo
[デモページ](https://webcyou.github.io/countup_timer/)

###  Quick start

**Clone the repo:**
```
git clone git@github.com:webcyou/countup-timer-js.git
```

**Install with [Bower](http://bower.io):**
```
bower install countup-timer.js
```

**Install with [npm](https://www.npmjs.com):**

```
npm install countup-timer-js
```


### Basic Usage

```
<script src="countup_timer.js"></script>
```

### Basic Format
```
"hh:mm:ss"
```


### Start DataSet

```
new CountUpTimer("hh:mm:ss", callBack);
```


**example**

```
new CountUpTimer("12:11:2", function(times, parameters) {
    console.log(times);
});
```

**subscribe**

```
var timer = new CountUpTimer("hh:mm:ss");

timer.subscribe(function(times, parameters) {
  ...
});

```


### CallBack


```
new CountUpTimer(Times, function(times, parameters) {
  ...
});
```

**time**

times: string
```
"hh:mm:ss"
```

prams: Time

### CallBack Parameters Reference

| ParametersName | value         | Detail                | 
| --------------- |:---------------:| -------------------- |
| id | number | created date Id |
| splitTimes | string[] | [hours, minute, second] |
| H | number | hours |
| M | number | minute |
| S | number | minute |
| times | string | "hh:mm:ss" |
| isNextDay | boolean | To become true is the one time of 24:00 . |
| createdAt | string | Time that was created |

### Start develop
```
npm install
gulp 
```

### Start Test

**mocha**
```
gulp mocha
```

**mocha watch**
```
gulp mocha.watch
```


### Author
Daisuke Takayama
[Web帳](http://www.webcyou.com/)


### License
MIT
