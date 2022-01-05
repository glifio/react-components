export default abstract class Logger {
  public static debug(...args: any[]): void {
    console.debug.apply(console, args)
  }

  public static log(...args: any[]): void {
    console.log.apply(console, args)
  }

  public static info(...args: any[]): void {
    console.info.apply(console, args)
  }

  public static warn(...args: any[]): void {
    console.warn.apply(console, args)
  }

  public static error(...args: any[]): void {
    console.error.apply(console, args)
  }
}
