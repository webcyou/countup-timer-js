'use strict';
var e = eval, global = e('this');
var CountUpTimer;
(function (CountUpTimer) {
    var CountUpTimerModel = (function () {
        function CountUpTimerModel(times, fn) {
            this.COUNT_UP_MSEC = 1000;
            this.isNextDay = false;
            this.callBackFunction = function () { };
            this.H = 0;
            this.M = 0;
            this.S = 0;
            var that = this;
            this.setTimesNumber(times.split(/:|：/g));
            this.setTimes();
            var countFunc = function () {
                that.countUp(function () {
                    that.setTimes();
                    if (fn) {
                        fn(that.times, that.isNextDay);
                    }
                    that.subscribe(that.callBackFunction);
                    countFunc();
                });
            };
            countFunc();
        }
        CountUpTimerModel.prototype.countUp = function (callBack) {
            var that = this;
            return setTimeout(function () {
                that.countUpSecond();
                callBack();
            }, that.COUNT_UP_MSEC);
        };
        CountUpTimerModel.prototype.setTimesNumber = function (splitTimes) {
            this.H = parseInt(splitTimes[0], 10);
            this.M = parseInt(splitTimes[1], 10);
            this.S = parseInt(splitTimes[2], 10);
        };
        CountUpTimerModel.prototype.countUpHour = function () {
            this.H++;
            if (this.H >= 24) {
                this.H = 0;
                this.isNextDay = true;
            }
        };
        CountUpTimerModel.prototype.countUpMinute = function () {
            this.M++;
            if (this.M >= 60) {
                this.M = 0;
                this.countUpHour();
            }
        };
        CountUpTimerModel.prototype.countUpSecond = function () {
            this.S++;
            if (this.S >= 60) {
                this.S = 0;
                this.countUpMinute();
            }
            if (this.isNextDay && this.S !== 0) {
                this.isNextDay = false;
            }
        };
        CountUpTimerModel.prototype.numberToString = function (time) {
            var strTime = String(time);
            if (time < 10) {
                strTime = '0' + strTime;
            }
            return strTime;
        };
        CountUpTimerModel.prototype.setTimes = function () {
            var setStr = this.numberToString;
            this.times = setStr(this.H) + ':' + setStr(this.M) + ':' + setStr(this.S);
        };
        CountUpTimerModel.prototype.getTimes = function () {
            return this.times;
        };
        CountUpTimerModel.prototype.getIsNextDay = function () {
            return this.isNextDay;
        };
        CountUpTimerModel.prototype.subscribe = function (fn) {
            this.callBackFunction = fn;
            fn(this.times, this.isNextDay);
        };
        return CountUpTimerModel;
    }());
    CountUpTimer.CountUpTimerModel = CountUpTimerModel;
})(CountUpTimer || (CountUpTimer = {}));
if (typeof (module) !== 'undefined') {
    if (typeof (module).exports.CountUpTimer === 'undefined') {
        (module).exports.CountUpTimer = {};
    }
    (module).exports.CountUpTimer = CountUpTimer.CountUpTimerModel;
}
if (typeof (global) !== 'undefined') {
    if (typeof global['CountUpTimer'] === 'undefined') {
        global['CountUpTimer'] = {};
    }
    global['CountUpTimer'] = CountUpTimer.CountUpTimerModel;
}
