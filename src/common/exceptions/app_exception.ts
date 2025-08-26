import { HttpException, HttpStatus } from '@nestjs/common';
import { AppError } from '../constants/error_codes.constants';

/**
 * Hàm tiện ích để ném lỗi chuẩn hóa theo AppError.
 *
 * @param appError Định nghĩa lỗi từ AppError constants (ví dụ: AppError.PRODUCT_NOT_FOUND).
 * Đối tượng này phải bao gồm errorCode, message, và httpStatus.
 * @param customMessage (Tùy chọn) Một thông báo tùy chỉnh để ghi đè thông báo mặc định trong AppError.
 * @param customHttpStatus (Tùy chọn) Một mã trạng thái HTTP cụ thể để sử dụng, sẽ ghi đè httpStatus đã định nghĩa trong AppError.
 */
export function throwAppException(
  appError: (typeof AppError)[keyof typeof AppError],
  customMessage?: string,
  customHttpStatus?: HttpStatus,
): never {
  // 'never' báo hiệu hàm này luôn ném lỗi
  const finalHttpStatus =
    customHttpStatus || appError.httpStatus || HttpStatus.INTERNAL_SERVER_ERROR;

  throw new HttpException(
    {
      errorCode: appError.errorCode,
      message: customMessage || appError.message,
    },
    finalHttpStatus,
  );
}
