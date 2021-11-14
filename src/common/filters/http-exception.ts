import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter  {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const { getRequest, getResponse } = host.switchToHttp();

    const request = getRequest();
    const response = getResponse();

    let status: number;
    let message: any;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception;
    }

    this.logger.error(`Http Status: ${status} Error Message: ${JSON.stringify(message)}`);

    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      error: message
    });

  }
}
