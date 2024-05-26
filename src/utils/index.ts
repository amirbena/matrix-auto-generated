export class Utils {
  static toString<T>(item: T): string {
    return JSON.stringify(item, null, 2);
  }
}