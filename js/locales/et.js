/*!
 * FileInput Estonian Translations
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

    $.fn.fileinputLocales['et'] = {
        sizeUnits: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        bitRateUnits: ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s', 'PB/s', 'EB/s', 'ZB/s', 'YB/s'],
        fileSingle: 'fail',
        filePlural: 'failid',
        browseLabel: 'Sirvi &hellip;',
        removeLabel: 'Eemalda',
        removeTitle: 'Eemalda valitud failid',
        cancelLabel: 'Tühista',
        cancelTitle: 'Katkesta käimasolev üleslaadimine',
        pauseLabel: 'Peata',
        pauseTitle: 'Peata käimasolev üleslaadimine',
        uploadLabel: 'Salvesta',
        uploadTitle: 'Salvesta valitud failid',
        msgNo: 'Ei',
        msgNoFilesSelected: 'Faile pole valitud',
        msgPaused: 'Peatatud',
        msgCancelled: 'Tühistatud',
        msgPlaceholder: 'Vali {files} ...',
        msgZoomModalHeading: 'Detailne eelvaade',
        msgFileRequired: 'Faili üleslaadimiseks tuleb valida fail.',
        msgSizeTooSmall: 'Fail "{name}" (<b>{size}</b>) on liiga väike ja peab olema suurem kui <b>{minSize}</b>.',
        msgSizeTooLarge: 'Fail "{name}" (<b>{size}</b>) ületab maksimaalse lubatud suuruse <b>{maxSize}</b>.',
        msgMultipleSizeTooLarge: 'Fail "{name}" (<b>{size}</b>) ületab maksimaalse lubatud suuruse <b>{maxSize}</b>.',
        msgFilesTooLess: 'Üleslaadimiseks tuleb valida vähemalt <b>{n}</b> {files}.',
        msgFilesTooMany: 'Valitud failide arv <b>({n})</b> ületab lubatud maksimumi <b>{m}</b>.',
        msgTotalFilesTooMany: 'Maksimaalne lubatud failide arv on <b>{m}</b> (tuvastatud faile: <b>{n}</b>).',
        msgFileNotFound: 'Faili "{name}" ei leitud!',
        msgFileSecured: 'Turvapiirangud ei luba faili "{name}" lugeda.',
        msgFileNotReadable: 'Fail "{name}" pole loetav.',
        msgFilePreviewAborted: 'Faili eelvaade katkestati failil "{name}".',
        msgFilePreviewError: 'Tekkis viga faili "{name}" lugemisel.',
        msgInvalidFileName: 'Failinimes "{name}" on keelatud või toetamatud sümbolid.',
        msgInvalidFileType: 'Fail "{name}" on vale tüüpi. Lubatud ainult "{types}" tüübid.',
        msgInvalidFileExtension: 'Failil "{name}" on vale laiend. Lubatud ainult "{extensions}" laiendid.',
        msgFileTypes: {
            'image': 'pilt',
            'html': 'HTML',
            'text': 'tekst',
            'video': 'video',
            'audio': 'heli',
            'flash': 'flash',
            'pdf': 'PDF',
            'object': 'objekt'
        },
        msgUploadAborted: 'Faili üleslaadimine katkestati',
        msgUploadThreshold: 'Töötlen &hellip;',
        msgUploadBegin: 'Alustan &hellip;',
        msgUploadEnd: 'Valmis',
        msgUploadResume: 'Taastan üleslaadimist &hellip;',
        msgUploadEmpty: 'Üleslaadimiseks pole kehtivaid andmeid.',
        msgUploadError: 'Üleslaadimisviga',
        msgDeleteError: 'Kustutamisviga',
        msgProgressError: 'Viga',
        msgValidationError: 'Valideerimisviga',
        msgLoading: 'Laen faili {index} {files} &hellip;',
        msgProgress: 'Laen faili {index} {files} - {name} - {percent}% valmis.',
        msgSelected: 'Valitud {n} {files}',
        msgFoldersNotAllowed: 'Lohista ainult faile! {n} lohistatud kaust(ad) jäeti vahele.',
        msgImageWidthSmall: 'Pildi laius peab olema vähemalt <b>{size} px</b> (tuvastatud <b>{dimension} px</b>).',
        msgImageHeightSmall: 'Pildi kõrgus peab olema vähemalt <b>{size} px</b> (tuvastatud <b>{dimension} px</b>).',
        msgImageWidthLarge: 'Pildi "{name}" laius ei tohi ületada <b>{size} px</b> (tuvastatud <b>{dimension} px</b>).',
        msgImageHeightLarge: 'Pildi "{name}" kõrgus ei tohi ületada <b>{size} px</b> (tuvastatud <b>{dimension} px</b>).',
        msgImageResizeError: 'Ei õnnestunud hankida pildi mõõtmeid suuruse muutmiseks.',
        msgImageResizeException: 'Tekkis viga pildi suuruse muutmisel.<pre>{errors}</pre>',
        msgAjaxError: 'Midagi läks valesti toimingu {operation} käigus. Proovige hiljem uuesti!',
        msgAjaxProgressError: '{operation} ebaõnnestus',
        msgDuplicateFile: 'Fail "{name}" suurusega "{size}" on juba varem valitud. Korduv valik jäetakse vahele.',
        msgResumableUploadRetriesExceeded:  'Üleslaadimine katkestati pärast <b>{max}</b> katset faili <b>{file}</b> jaoks! Veateave: <pre>{error}</pre>',
        msgPendingTime: 'Jäänud aeg: {time}',
        msgCalculatingTime: 'arvutan järelejäänud aega',
        ajaxOperations: {
            deleteThumb: 'faili kustutamine',
            uploadThumb: 'faili üleslaadimine',
            uploadBatch: 'mitme failide üleslaadimine',
            uploadExtra: 'ekstra andmete üleslaadimine'
        },
        dropZoneTitle: 'Lohista failid siia &hellip;',
        dropZoneClickTitle: '<br>(või kikki, et valida {files})',
        fileActionSettings: {
            removeTitle: 'Eemalda fail',
            uploadTitle: 'Salvesta fail',
            uploadRetryTitle: 'Proovi üleslaadimist uuesti',
            rotateTitle: 'Pööra 90 kraadi päripäeva',
            zoomTitle: 'Vaata detaile',
            dragTitle: 'Liiguta / Korralda',
            indicatorNewTitle: 'Pole veel üles laetud',
            indicatorSuccessTitle: 'Üles laaditud',
            indicatorErrorTitle: 'Salvestamise viga',
            indicatorPausedTitle: 'Üleslaadimine peatatud',
            indicatorLoadingTitle: 'Laen üles &hellip;'
        },
        previewZoomButtonTitles: {
            prev: 'Vaata eelmist faili',
            next: 'Vaata järgmist faili',
            rotate: 'Pööra 90 kraadi päripäeva',
            toggleheader: 'Peida/näita päist',
            fullscreen: 'Täisekraani režiim',
            borderless: 'Ilma piirjoonteta režiim',
            close: 'Sulge detailide eelvaade'
        }
    };
}));
