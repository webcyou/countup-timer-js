/*
 * Author: Daisuke Takayama
 */
/// <reference path='_all.ts' />

'use strict';
var e = eval, global: NodeJS.Global = e('this');

module CountUpTimer {
  import Time = CountUpTimerClass.Time;

  export class CountUpTimerModel {
    private COUNT_UP_MSEC: number = 1000;
    private callBackFunction: Function = () => {};
    private times: Time;

    constructor(
      times: any,
      fn?: Function
      ) {
      var that = this;
      this.times = Time.fromData(times.split(/:|：/g));

      var countFunc: Function = () => {
        that.countUp(() => {
          that.times.setTimes();
          if(fn) {
            fn(that.times.times, that.times);
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

    private countUpHour(): void {
      this.times.H++;
      if(this.times.H >= 24) {
        this.times.H = 0;
        this.times.isNextDay = true;
      }
    }

    private countUpMinute(): void {
      this.times.M++;
      if(this.times.M >= 60) {
        this.times.M = 0;
        this.countUpHour();
      }
    }

    private countUpSecond(): void {
      this.times.S++;
      if(this.times.S >= 60) {
        this.times.S = 0;
        this.countUpMinute();
      }
      if(this.times.isNextDay && this.times.S !== 0) {
        this.times.isNextDay = false;
      }
    }

    public getTimes(): Time {
      return this.times;
    }

    public getTimesStr(): string {
      return this.times.times;
    }

    public getIsNextDay(): boolean {
      return this.times.isNextDay;
    }

    public subscribe(fn): void {
      this.callBackFunction = fn;
      fn(this.times.times, this.times);
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
