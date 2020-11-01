export default class HttpException extends Error {
  public code: number;
  public message: string;
  public level: string;
  public type: string;

  constructor(message: string, code: number = 404, level: string = "error", type: string = "Http") {
    super(message);
    this.code = code;
    this.message = message;
    this.level = level;
    this.type = type;
  }
}
