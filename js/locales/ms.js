/*!
 * FileInput <_LANG_> Translations
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

    $.fn.fileinputLocales['ms'] = {
        sizeUnits: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], 
        bitRateUnits: ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s', 'PB/s', 'EB/s', 'ZB/s', 'YB/s'],
        fileSingle: 'fail',
        filePlural: 'fail-fail',
        browseLabel: 'Semak imbas &hellip;',
        removeLabel: 'Alih keluar',
        removeTitle: 'Kosongkan fail yang dipilih',
        cancelLabel: 'Batal',
        cancelTitle: 'Hentikan muat naik yang sedang berjalan',
        pauseLabel: 'Jeda',
        pauseTitle: 'Jeda muat naik yang sedang berjalan',
        uploadLabel: 'Muat naik',
        uploadTitle: 'Muat naik fail yang dipilih',
        msgNo: 'Tidak',
        msgNoFilesSelected: 'Tiada fail yang dipilih',
        msgPaused: 'Jeda',
        msgCancelled: 'Telah dibatalkan',
        msgPlaceholder: 'Pilih {files} ...',
        msgZoomModalHeading: 'Pratonton Terperinci',
        msgFileRequired: 'Anda mesti memilih fail untuk dimuat naik.',
        msgSizeTooSmall: 'Fail "{name}" (<b>{size}</b>) terlalu kecil dan mesti besar daripada <b>{minSize}</b>.',
        msgSizeTooLarge: 'Fail "{name}" (<b>{size}</b>) melebihi saiz muat naik maksimum yang dibenarkan sebanyak <b>{maxSize}</b>.',
        msgMultipleSizeTooLarge: 'Fail-fail "{name}" (<b>{size}</b>) melebihi saiz muat naik maksimum yang dibenarkan sebanyak <b>{maxSize}</b>.',
        msgFilesTooLess: 'Anda mesti memilih sekurang-kurangnya <b>{n}</b> {files} untuk memuat naik.',
        msgFilesTooMany: 'Bilangan fail yang dipilih untuk dimuat naik <b>({n})</b> melebihi had maksimum yang dibenarkan sebanyak <b>{m}</b>.',
        msgTotalFilesTooMany: 'Anda boleh memuat naik maksimum <b>{m}</b> fail (<b>{n}</b> fail dikesan).',
        msgFileNotFound: 'Fail "{name}" tidak ditemui!',
        msgFileSecured: 'Sekatan keselamatan menghalang membaca fail "{name}".',
        msgFileNotReadable: 'Fail "{name}" tidak boleh dibaca.',
        msgFilePreviewAborted: 'Pratonton fail digugurkan untuk "{name}".',
        msgFilePreviewError: 'Ralat berlaku semasa membaca fail "{name}".',
        msgInvalidFileName: 'Aksara tidak sah atau tidak disokong dalam nama fail "{name}".',
        msgInvalidFileType: 'Jenis tidak sah untuk fail "{name}". Hanya "{types}" fail disokong.',
        msgInvalidFileExtension: 'Sambungan tidak sah untuk fail "{name}". Hanya "{extensions}" fail disokong.',
        msgFileTypes: {
            'image': 'gambar',
            'html': 'HTML',
            'text': 'teks',
            'video': 'video',
            'audio': 'audio',
            'flash': 'flash',
            'pdf': 'PDF',
            'object': 'objek'
        },
        msgUploadAborted: 'Muat naik fail telah dibatalkan',
        msgUploadThreshold: 'Memproses &hellip;',
        msgUploadBegin: 'Memulakan &hellip;',
        msgUploadEnd: 'Selesai',
        msgUploadResume: 'Menyambung muat naik &hellip;',
        msgUploadEmpty: 'Tiada data yang sah tersedia untuk dimuat naik.',
        msgUploadError: 'Ralat Muat Naik',
        msgDeleteError: 'Padam Ralat',
        msgProgressError: 'Ralat',
        msgValidationError: 'Ralat Pengesahan',
        msgLoading: 'Memuatkan fail {index} dari {files} &hellip;',
        msgProgress: 'Memuatkan fail {index} dari {files} - {name} - {percent}% selesai.',
        msgSelected: '{n} {files} dipilih',
        msgProcessing: 'Memproses ...',
        msgFoldersNotAllowed: 'Seret & jatuhkan sahaja fail! Dilangkau {n} folder tercicir(s).',
        msgImageWidthSmall: 'Lebar fail imej "{name}" mesti sekurang-kurangnya <b>{size} px</b> (dikesan <b>{dimension} px</b>).',
        msgImageHeightSmall: 'Ketinggian fail imej "{name}" mesti sekurang-kurangnya <b>{size} px</b> (dikesan <b>{dimension} px</b>).',
        msgImageWidthLarge: 'Lebar fail imej "{name}" tidak boleh melebihi <b>{size} px</b> (dikesan <b>{dimension} px</b>).',
        msgImageHeightLarge: 'Height of image file "{name}" tidak boleh melebihi <b>{size} px</b> (dikesan <b>{dimension} px</b>).',
        msgImageResizeError: 'Tidak dapat mengubah saiz imej.',
        msgImageResizeException: 'Ralat semasa mengubah saiz imej.<pre>{errors}</pre>',
        msgAjaxError: 'Sesuatu telah berlaku dengan {operation} operasi. Sila cuba sebentar lagi!',
        msgAjaxProgressError: '{operation} gagal',
        msgDuplicateFile: 'Fail "{name}" sama saiz "{size}" telah pun dipilih lebih awal. Melangkau pilihan pendua.',
        msgResumableUploadRetriesExceeded:  'Muat naik dihentikan selepas itu <b>{max}</b> cuba semula untuk fail <b>{file}</b>! Butiran Ralat: <pre>{error}</pre>',
        msgPendingTime: '{time} yang tinggal',
        msgCalculatingTime: 'mengira masa yang tinggal',
        ajaxOperations: {
            deleteThumb: 'padam fail',
            uploadThumb: 'file upload',
            uploadBatch: 'muat naik fail kelompok',
            uploadExtra: 'muat naik data borang'
        },
        dropZoneTitle: 'Seret & lepas fail di sini &hellip;',
        dropZoneClickTitle: '<br>(atau klik untuk memilih {files})',
        fileActionSettings: {
            removeTitle: 'Alih keluar fail',
            uploadTitle: 'Muat naik fail',
            uploadRetryTitle: 'Cuba muat naik semula',
            downloadTitle: 'Muat turun fail',
            rotateTitle: 'Putar 90 darjah. mengikut arah jam',
            zoomTitle: 'Lihat butiran',
            dragTitle: 'Pindah / Susun Semula',
            indicatorNewTitle: 'Belum dimuat naik',
            indicatorSuccessTitle: 'Dimuat naik',
            indicatorErrorTitle: 'Ralat Muat Naik',
            indicatorPausedTitle: 'Muat Naik Dijeda',
            indicatorLoadingTitle:  'Memuat naik &hellip;'
        },
        previewZoomButtonTitles: {
            prev: 'Lihat fail sebelumnya',
            next: 'Lihat fail seterusnya',
            rotate: 'Putar 90 darjah. mengikut arah jam',
            toggleheader: 'Togol pengepala',
            fullscreen: 'Togol skrin penuh',
            borderless: 'Togol mod tanpa sempadan',
            close: 'Tutup pratonton terperinci'
        }
    };
}));
