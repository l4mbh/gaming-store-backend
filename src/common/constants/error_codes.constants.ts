import { HttpStatus } from '@nestjs/common'; // 👈 Import HttpStatus

export const AppError = {
  // Lỗi chung của hệ thống
  UNKNOWN_ERROR: {
    errorCode: 1000,
    message: 'Lỗi không xác định đã xảy ra. Vui lòng thử lại sau.',
    httpStatus: HttpStatus.INTERNAL_SERVER_ERROR, // 👈 Thêm HTTP Status
  },
  // Lỗi xác thực (Validation errors) - thường được xử lý bởi ValidationPipe
  VALIDATION_ERROR: {
    errorCode: 1001,
    message: 'Dữ liệu đầu vào không hợp lệ.',
    httpStatus: HttpStatus.BAD_REQUEST, // 👈 Thêm HTTP Status
  },
  // Lỗi liên quan đến tài nguyên (Resource errors)
  PRODUCT_NOT_FOUND: {
    errorCode: 2001,
    message: 'Sản phẩm không tìm thấy.',
    httpStatus: HttpStatus.NOT_FOUND, // 👈 Thêm HTTP Status
  },
  PRODUCT_ALREADY_EXISTS: {
    errorCode: 2002,
    message: 'Sản phẩm với tên này đã tồn tại.',
    httpStatus: HttpStatus.CONFLICT, // 👈 Thêm HTTP Status
  },
  // Lỗi xác thực (Authentication/Authorization)
  UNAUTHORIZED: {
    errorCode: 3001,
    message: 'Bạn không có quyền truy cập tài nguyên này.',
    httpStatus: HttpStatus.UNAUTHORIZED, // 👈 Thêm HTTP Status
  },
  FORBIDDEN: {
    errorCode: 3002,
    message: 'Truy cập bị từ chối.',
    httpStatus: HttpStatus.FORBIDDEN, // 👈 Thêm HTTP Status
  },
  // ... Thêm các mã lỗi khác theo từng module/tính năng
};
