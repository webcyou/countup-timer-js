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
bower install countup_timer_js
```

**Install with [npm](https://www.npmjs.com):**

```
npm install countup_timer_js
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
timer.subscribe(function(times, isNextDay) {
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

isNextDay: boolean
```
true
```
To become true is the one time of 24:00 .

### Author
Daisuke Takayama
[Web帳](http://www.webcyou.com/)


### License
MIT
