/*!
 * FileInput Vietnamese Translations
 *
 * This file must be loaded after 'fileinput.js'. Patterns in braces '{}', or
 * any HTML markup tags in the messages must not be converted or translated.
 *
 * @see http://github.com/kartik-v/bootstrap-fileinput
 *
 * NOTE: this file must be saved in UTF-8 encoding.
 */
 
(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        factory(require('jquery'));
    } else {
        factory(window.jQuery);
    }
}(function ($) {
    "use strict";

    $.fn.fileinputLocales['vi'] = {
        sizeUnits: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], 
        bitRateUnits: ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s', 'PB/s', 'EB/s', 'ZB/s', 'YB/s'],
        fileSingle: 'tập tin',
        filePlural: 'các tập tin',
        browseLabel: 'Duyệt &hellip;',
        removeLabel: 'Gỡ bỏ',
        removeTitle: 'Bỏ tập tin đã chọn',
        cancelLabel: 'Hủy',
        cancelTitle: 'Hủy tải lên',
        pauseLabel: 'Tạm dừng',
        pauseTitle: 'Tạm dừng tải lên hiện tại',
        uploadLabel: 'Tải lên',
        uploadTitle: 'Tải lên tập tin đã chọn',
        msgNo: 'Không',
        msgNoFilesSelected: 'Không tập tin nào được chọn',
        msgPaused: 'Đã tạm dừng',
        msgCancelled: 'Đã hủy',
        msgPlaceholder: 'Chọn {files} ...',
        msgZoomModalHeading: 'Chi tiết xem trước',
        msgFileRequired: 'Bạn cần chọn tập tin để tải lên.',
        msgSizeTooSmall: 'Kích thước tập tin "{name}" (<b>{size}</b>) quá nhỏ, yêu cầu lớn hơn <b>{minSize}</b>.',
        msgSizeTooLarge: 'Kích thước tập tin "{name}" (<b>{size}</b>) vượt quá giới hạn cho phép <b>{maxSize}</b>.',
        msgMultipleSizeTooLarge: 'Kích thước tập tin "{name}" (<b>{size}</b>) vượt quá giới hạn cho phép <b>{maxSize}</b>.',
        msgFilesTooLess: 'Bạn phải chọn ít nhất <b>{n}</b> {files} để tải lên.',
        msgFilesTooMany: 'Số lượng tập tin tải lên <b>({n})</b> vượt quá giới hạn cho phép là <b>{m}</b>.',
        msgTotalFilesTooMany: 'Bạn chỉ có thể tải lên tối đa <b>{m}</b> tập tin (Phát hiện <b>{n}</b> tập tin).',
        msgFileNotFound: 'Không tìm thấy tập tin "{name}"!',
        msgFileSecured: 'Các hạn chế về bảo mật không cho phép đọc tập tin "{name}".',
        msgFileNotReadable: 'Không đọc được tập tin "{name}".',
        msgFilePreviewAborted: 'Đã dừng xem trước tập tin "{name}".',
        msgFilePreviewError: 'Đã xảy ra lỗi khi đọc tập tin "{name}".',
        msgInvalidFileName: 'Tồn tại ký tự không hợp lệ trong tên tập tin "{name}".',
        msgInvalidFileType: 'Tập tin "{name}" không hợp lệ. Chỉ hỗ trợ loại tập tin "{types}".',
        msgInvalidFileExtension: 'Phần mở rộng của tập tin "{name}" không hợp lệ. Chỉ hỗ trợ phần mở rộng "{extensions}".',
        msgFileTypes: {
            'image': 'Ảnh',
            'html': 'HTML',
            'text': 'Văn bản',
            'video': 'video',
            'audio': 'Âm thanh',
            'flash': 'flash',
            'pdf': 'PDF',
            'object': 'Đối tượng'
        },
        msgUploadAborted: 'Đã dừng tải lên',
        msgUploadThreshold: 'Đang xử lý &hellip;',
        msgUploadBegin: 'Đang thiết lập &hellip;',
        msgUploadEnd: 'Hoàn tất',
        msgUploadResume: 'Đang tiếp tục tải lên &hellip;',
        msgUploadEmpty: 'Dữ liệu không hợp lệ để tải lên.',
        msgUploadError: 'Lỗi tải lên',
        msgDeleteError: 'Lỗi xoá',
        msgProgressError: 'Lỗi',
        msgValidationError: 'Lỗi xác nhận',
        msgLoading: 'Đang xử lí {index} tập tin trong số {files} &hellip;',
        msgProgress: 'Đang xử lí {index} tập tin trong số {files} - {name} - {percent}% hoàn thành.',
        msgSelected: '{n} {files} được chọn',
        msgFoldersNotAllowed: 'Chỉ kéo thả tập tin! Đã bỏ qua {n} thư mục.',
        msgImageWidthSmall: 'Chiều rộng của hình ảnh "{name}" không được thấp hơn <b>{size} px</b> (phát hiện <b>{dimension} px</b>).',
        msgImageHeightSmall: 'Chiều cao của hình ảnh "{name}" không được thấp hơn <b>{size} px</b> (phát hiện <b>{dimension} px</b>).',
        msgImageWidthLarge: 'Chiều rộng của hình ảnh "{name}" không được vượt quá <b>{size} px</b> (phát hiện <b>{dimension} px</b>).',
        msgImageHeightLarge: 'Chiều cao của hình ảnh "{name}" không được vượt quá <b>{size} px</b> (phát hiện <b>{dimension} px</b>).',
        msgImageResizeError: 'Không thể kiểm tra kích thước hình ảnh khi thay đổi kích thước.',
        msgImageResizeException: 'Lỗi khi thay đổi kích thước hình ảnh. <pre>{errors}</pre>',
        msgAjaxError: 'Lỗi khi thực hiện {operation}. Vui lòng thử lại sau!',
        msgAjaxProgressError: '{operation} thất bại',
        msgDuplicateFile: 'Tập tin "{name}" cùng kích thước "{size}" đã được chọn. Sẽ bỏ qua những tập tin trùng lặp.',
        msgResumableUploadRetriesExceeded:  'Huỷ tải lên do đã vượt quá <b>{max}</b> lần thử đối với tập tin <b>{file}</b>! Thông tin lỗi: <pre>{error}</pre>',
        msgPendingTime: '{time} còn lại',
        msgCalculatingTime: 'đang tính thời gian còn lại',
        ajaxOperations: {
            deleteThumb: 'xoá tập tin',
            uploadThumb: 'tải lên tập tin',
            uploadBatch: 'tải lên nhiều tập tin',
            uploadExtra: 'tải lên dữ liệu biểu mẫu'
        },
        dropZoneTitle: 'Kéo thả tập tin vào đây &hellip;',
        dropZoneClickTitle: '<br>(hoặc nhấp chuột để chọn {files})',
        fileActionSettings: {
            removeTitle: 'Gỡ bỏ',
            uploadTitle: 'Tải lên tập tin',
            uploadRetryTitle: 'Thử lại tải lên',
            downloadTitle: 'Tải về tập tin',
            rotateTitle: 'Xoay 90 độ theo chiều kim đồng hồ',
            zoomTitle: 'Phóng to',
            dragTitle: 'Di chuyển / Sắp xếp lại',
            indicatorNewTitle: 'Chưa được tải lên',
            indicatorSuccessTitle: 'Đã tải lên',
            indicatorErrorTitle: 'Tải lên bị lỗi',
            indicatorPausedTitle: 'Tải lên bị tạm dừng',
            indicatorLoadingTitle:  'Đang tải lên &hellip;'
        },
        previewZoomButtonTitles: {
            prev: 'Xem tập tin trước',
            next: 'Xem tập tin tiếp theo',
            rotate: 'Xoay 90 độ theo chiều kim đồng hồ',
            toggleheader: 'Ẩn/hiện tiêu đề',
            fullscreen: 'Bật/tắt toàn màn hình',
            borderless: 'Bật/tắt viền',
            close: 'Đóng'
        }
    };
}));
