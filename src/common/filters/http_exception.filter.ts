import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse } from '../interfaces/api_response.interface';
import { AppError } from '../constants/error_codes.constants'; // 👈 Import AppError

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Lấy status code HTTP từ exception được throw
    const httpStatus = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    // Lấy đối tượng phản hồi từ HttpException
    const exceptionResponse = exception.getResponse();

    let customErrorCode: number = AppError.UNKNOWN_ERROR.errorCode;
    let customMessage: string = AppError.UNKNOWN_ERROR.message;

    if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      // Nếu exceptionResponse có chứa errorCode và message tùy chỉnh
      if (
        'errorCode' in exceptionResponse &&
        typeof exceptionResponse.errorCode === 'number'
      ) {
        customErrorCode = exceptionResponse.errorCode;
      }
      if ('message' in exceptionResponse) {
        if (Array.isArray(exceptionResponse.message)) {
          customMessage = exceptionResponse.message.join(', '); // Lỗi validation từ class-validator
        } else if (typeof exceptionResponse.message === 'string') {
          customMessage = exceptionResponse.message;
        }
      }
    } else if (typeof exceptionResponse === 'string') {
      // Trường hợp HttpException chỉ được ném với một chuỗi message
      customMessage = exceptionResponse;
    }

    // Ở đây, vì `throwAppException` đã chủ động xác định `httpStatus` và `errorCode`,
    // phần ánh xạ mặc định này sẽ ít khi được kích hoạt nếu luôn dùng `throwAppException`.
    // Tuy nhiên, nó vẫn hữu ích để bắt các lỗi HttpException khác không dùng `throwAppException`.
    if (
      customErrorCode === AppError.UNKNOWN_ERROR.errorCode &&
      httpStatus !== HttpStatus.INTERNAL_SERVER_ERROR
    ) {
      // Cố gắng tìm một mã lỗi trong AppError có cùng HTTP status
      const mappedError = Object.values(AppError).find(
        (err) => err.httpStatus === httpStatus,
      );
      if (mappedError) {
        customErrorCode = mappedError.errorCode;
        customMessage = mappedError.message;
      }
    }

    const errorResponse: ApiResponse<null> = {
      errorCode: customErrorCode,
      message: customMessage,
      data: null,
    };

    response
      .status(httpStatus) // Giữ nguyên HTTP status code chuẩn được throw
      .json(errorResponse);
  }
}
