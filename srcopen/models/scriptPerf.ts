//--Copyright (c) 2023-2026 Robert A. Howell

interface ScriptRuntime {
  name: string | null;
  startMark: PerformanceMark | null;
  endMark: PerformanceMark | null;
}

/** Create this object to record performance start and end marks. */
export default class RwbPerf {
  /**Counts the number of objects instantiated */
  public static count: number = 0;
  private scriptRuntimeMarks: ScriptRuntime = {
    name: null,
    startMark: null,
    endMark: null,
  };

  /** Instantiating a ScriptPerf records the performance start mark. */
  constructor(scriptName: string) {
    this.scriptRuntimeMarks.name = scriptName;
    this.scriptRuntimeMarks.startMark = performance.mark(`${this.scriptRuntimeMarks.name}-start`);
    RwbPerf.count++;
  };

  /** Call end() to set the end time stamp. */
  public end() {
    this.scriptRuntimeMarks.endMark = performance.mark(`${this.scriptRuntimeMarks.name}-end`);
    this.measure();
  };

  /** A console output of this object's performance measurement. */
  private measure() {
    let measure = performance.measure(
      this.scriptRuntimeMarks.name as string,
      this.scriptRuntimeMarks.startMark!.name,
      this.scriptRuntimeMarks.endMark!.name
    );
    return console.debug(`${this.scriptRuntimeMarks.name} execution time is: ${measure.duration}`);
  };
};
