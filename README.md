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
new CountUpTimer(Times, callBack);
```

**subscribe**

```
var timer = new CountUpTimer(Times);

timer.subscribe(function(times, prams) {
  ...
});

```


### CallBack


```
new CountUpTimer(Times, function(times, isNextDay) {
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


### Author
Daisuke Takayama
[Web帳](http://www.webcyou.com/)


### License
MIT
