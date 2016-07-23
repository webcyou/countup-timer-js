/*
 * Author: Daisuke Takayama
 */
/// <reference path='_all.ts' />

'use strict';
var e = eval, global: NodeJS.Global = e('this');

module CountUpTimer {
  export class CountUpTimerModel {
    private COUNT_UP_MSEC: number = 1000;
    private isNextDay: boolean = false;
    private callBackFunction: Function = () => {};

    private H: number = 0;
    private M: number = 0;
    private S: number = 0;

    private times: string;

    constructor(
      times: any,
      fn?: Function
      ) {
      var that = this;
      this.setTimesNumber(times.split(/:|：/g));
      this.setTimes();

      var countFunc: Function = () => {
        that.countUp(() => {
          that.setTimes();
          if(fn) {
            fn(that.times, that.isNextDay);
          }
          that.subscribe(that.callBackFunction);
          countFunc();
        });
      };
      countFunc();
    }

    private countUp(fn: Function) {
      var that = this;
      return setTimeout(() => {
        that.countUpSecond();
        fn();
      }, that.COUNT_UP_MSEC);
    }

    private setTimesNumber(splitTimes: string[]): void {
      this.H = parseInt(splitTimes[0], 10);
      this.M = parseInt(splitTimes[1], 10);
      this.S = parseInt(splitTimes[2], 10);
    }

    private countUpHour(): void {
      this.H++;
      if(this.H >= 24) {
        this.H = 0;
        this.isNextDay = true;
      }
    }

    private countUpMinute(): void {
      this.M++;
      if(this.M >= 60) {
        this.M = 0;
        this.countUpHour();
      }
    }

    private countUpSecond(): void {
      this.S++;
      if(this.S >= 60) {
        this.S = 0;
        this.countUpMinute();
      }
      if(this.isNextDay && this.S !== 0) {
        this.isNextDay = false;
      }
    }

    private numberToString(time: number): string {
      var strTime: string = String(time);
      if(time < 10) {
        strTime = '0' + strTime;
      }
      return strTime;
    }

    private setTimes() {
      var setStr = this.numberToString;
      this.times = setStr(this.H) + ':' + setStr(this.M) + ':' + setStr(this.S);
    }

    public getTimes(): string {
      return this.times;
    }

    public getIsNextDay(): boolean {
      return this.isNextDay;
    }

    public subscribe(fn): void {
      this.callBackFunction = fn;
      fn(this.times, this.isNextDay);
    }
  }
}


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
