var CountUpTimerClass;
(function (CountUpTimerClass) {
    var Time = (function () {
        function Time(id, splitTimes, H, M, S, times, isNextDay, createdAt) {
            this.id = id;
            this.splitTimes = splitTimes;
            this.H = H;
            this.M = M;
            this.S = S;
            this.times = times;
            this.isNextDay = isNextDay;
            this.createdAt = createdAt;
            var setStr = this.numberToString;
            this.id = this.createId();
            this.H = this.setTimesNumber(this.splitTimes, 0);
            this.M = this.setTimesNumber(this.splitTimes, 1);
            this.S = this.setTimesNumber(this.splitTimes, 2);
            this.times = setStr(this.H) + ':' + setStr(this.M) + ':' + setStr(this.S);
            this.isNextDay = this.nextDayCheck();
        }
        Time.fromData = function (data) {
            return new Time(null, data, 0, 0, 0, '00:00:00', false, String(new Date()));
        };
        Time.prototype.createId = function () {
            var date = new Date();
            return parseInt(String(date.getFullYear()) + String(date.getHours()) + String(date.getMinutes()) + String(date.getSeconds()), 10);
        };
        Time.prototype.setTimesNumber = function (splitTimes, index) {
            return parseInt(splitTimes[index], 10);
        };
        Time.prototype.numberToString = function (time) {
            var strTime = String(time);
            if (time < 10) {
                strTime = '0' + strTime;
            }
            return strTime;
        };
        Time.prototype.nextDayCheck = function () {
            return Boolean(this.H == 0 && this.M == 0 && this.S == 0);
        };
        Time.prototype.setTimes = function () {
            var setStr = this.numberToString;
            this.times = setStr(this.H) + ':' + setStr(this.M) + ':' + setStr(this.S);
        };
        return Time;
    }());
    CountUpTimerClass.Time = Time;
})(CountUpTimerClass || (CountUpTimerClass = {}));
'use strict';
var e = eval, global = e('this');
var CountUpTimer;
(function (CountUpTimer) {
    var Time = CountUpTimerClass.Time;
    var CountUpTimerModel = (function () {
        function CountUpTimerModel(times, fn) {
            this.COUNT_UP_MSEC = 1000;
            this.callBackFunction = function () { };
            var that = this;
            this.times = Time.fromData(times.split(/:|：/g));
            var countFunc = function () {
                that.countUp(function () {
                    that.times.setTimes();
                    if (fn) {
                        fn(that.times.times, that.times);
                    }
                    that.subscribe(that.callBackFunction);
                    countFunc();
                });
            };
            countFunc();
        }
        CountUpTimerModel.prototype.countUp = function (fn) {
            var that = this;
            return setTimeout(function () {
                that.countUpSecond();
                fn();
            }, that.COUNT_UP_MSEC);
        };
        CountUpTimerModel.prototype.countUpHour = function () {
            this.times.H++;
            if (this.times.H >= 24) {
                this.times.H = 0;
                this.times.isNextDay = true;
            }
        };
        CountUpTimerModel.prototype.countUpMinute = function () {
            this.times.M++;
            if (this.times.M >= 60) {
                this.times.M = 0;
                this.countUpHour();
            }
        };
        CountUpTimerModel.prototype.countUpSecond = function () {
            this.times.S++;
            if (this.times.S >= 60) {
                this.times.S = 0;
                this.countUpMinute();
            }
            if (this.times.isNextDay && this.times.S !== 0) {
                this.times.isNextDay = false;
            }
        };
        CountUpTimerModel.prototype.getTimes = function () {
            return this.times;
        };
        CountUpTimerModel.prototype.getTimesStr = function () {
            return this.times.times;
        };
        CountUpTimerModel.prototype.getIsNextDay = function () {
            return this.times.isNextDay;
        };
        CountUpTimerModel.prototype.subscribe = function (fn) {
            this.callBackFunction = fn;
            fn(this.times.times, this.times);
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
