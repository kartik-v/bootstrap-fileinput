/*!
 * FileInput Hungarian Translations
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

    $.fn.fileinputLocales['hu'] = {
        sizeUnits: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], 
        bitRateUnits: ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s', 'PB/s', 'EB/s', 'ZB/s', 'YB/s'],
        fileSingle: 'fájl',
        filePlural: 'fájlok',
        browseLabel: 'Tallózás...',
        removeLabel: 'Eltávolítás',
        removeTitle: 'Kijelölt fájlok törlése',
        cancelLabel: 'Mégse',
        cancelTitle: 'Feltöltés megszakítása',
        pauseLabel: 'Szünet',
        pauseTitle: 'A folyamatban lévő feltöltés szüneteltetése',
        uploadLabel: 'Feltöltés',
        uploadTitle: 'Kijelölt fájlok feltöltése',
        msgNo: 'Nem',
        msgNoFilesSelected: 'Nincs fájl kiválasztva',
        msgPaused: 'Szünetel',
        msgCancelled: 'Megszakítva',
        msgPlaceholder: '{files} kiválasztása...',
        msgZoomModalHeading: 'Részletes Előnézet',
        msgFileRequired: 'Kötelező fájlt kiválasztani a feltöltéshez.',
        msgSizeTooSmall: '"{name}" fájl (<b>{size}</b>) mérete túl kicsi, nagyobbnak kell lennie, mint <b>{minSize}</b>.',
        msgSizeTooLarge: '"{name}" fájl (<b>{size}</b>) mérete nagyobb a megengedettnél <b>{maxSize}</b>.',
        msgFilesTooLess: 'Legalább <b>{n}</b> fájl kiválasztására van szükség a feltöltéshez.',
        msgFilesTooMany: 'A feltölteni kívánt fájlok száma <b>({n})</b> elérte a megengedett maximumot <b>{m}</b>.',
        msgTotalFilesTooMany: 'Legfeljebb <b>{m}</b> fájlt tölthet fel (<b>{n}</b> fájl észlelve).',
        msgFileNotFound: '"{name}" fájl nem található!',
        msgFileSecured: 'Biztonsági beállítások nem engedik olvasni a fájlt: "{name}"',
        msgFileNotReadable: '"{name}" fájl nem olvasható.',
        msgFilePreviewAborted: '"{name}" fájl feltöltése megszakítva.',
        msgFilePreviewError: '"{name}" fájl olvasása közben hiba lépett fel.',
        msgInvalidFileName: '"{name}" fájlnév hibás vagy nem támogatott karaktereket tartalmaz.',
        msgInvalidFileType: '"{name}" fájl típusa nem megengedett. Csak a következő fájltípusok támogatottak: "{types}"',
        msgInvalidFileExtension: '"{name}" fájl kiterjesztése nem megengedett. Csak a következő kiterjesztések támogatottak: "{extensions}"',
        msgFileTypes: {
            'image': 'image',
            'html': 'HTML',
            'text': 'text',
            'video': 'video',
            'audio': 'audio',
            'flash': 'flash',
            'pdf': 'PDF',
            'object': 'object'
        },
        msgUploadAborted: 'A fájl feltöltés megszakítva',
        msgUploadThreshold: 'Feldolgozás...',
        msgUploadBegin: 'Inicializálás...',
        msgUploadEnd: 'Kész',
        msgUploadResume: 'Feltöltés folytatása...',
        msgUploadEmpty: 'Nincs érvényes adat a feltöltéshez.',
        msgUploadError: 'Feltöltési hiba',
        msgDeleteError: 'Törlési hiba',
        msgProgressError: 'Hiba',
        msgValidationError: 'Érvényesítési hiba',
        msgLoading: '{index}. fájl töltése...',
        msgProgress: '{index}. fájl töltése... - {name} - {percent}% kész.',
        msgSelected: '{n} fájl kiválasztva',
        msgProcessing: 'Feldolgozás...',
        msgFoldersNotAllowed: 'Csak fájlokat húzzon ide! Kihagyva {n} könyvtár.',
        msgImageWidthSmall: '"{name}" kép szélességének legalább {size} pixelnek kell lennie.',
        msgImageHeightSmall: '"{name}" kép magasságának legalább {size} pixelnek kell lennie.',
        msgImageWidthLarge: '"{name}" kép szélessége nem haladhatja meg a {size} pixelt.',
        msgImageHeightLarge: '"{name}" kép magassága nem haladhatja meg a {size} pixelt.',
        msgImageResizeError: 'Nem lehet megállapítani a kép méreteit az átméretezéshez.',
        msgImageResizeException: 'Hiba történt a méretezés közben.<pre>{errors}</pre>',
        msgAjaxError: 'Hiba történt a művelet közben ({operation}). Kérjük, próbálja újra később!',
        msgAjaxProgressError: '{operation} sikertelen',
        msgDuplicateFile: '"{name}" fájl azonos mérettel "{size}" már korábban kiválasztva. Az ismételt kiválasztás kihagyása.',
        msgResumableUploadRetriesExceeded: '<b>{file}</b> fájl feltöltése megszakítva <b>{max}</b> próbálkozás után! Hiba részletei: <pre>{error}</pre>',
        msgPendingTime: '{time} van hátra',
        msgCalculatingTime: 'hátralévő idő kiszámítása',
        ajaxOperations: {
            deleteThumb: 'fájl törlés',
            uploadThumb: 'fájl feltöltés',
            uploadBatch: 'csoportos fájl feltöltés',
            uploadExtra: 'űrlap adat feltöltés'
        },
        dropZoneTitle: 'Húzzon ide fájlokat...',
        dropZoneClickTitle: '<br>(vagy kattintson ide a {files} tallózásához...)',
        fileActionSettings: {
            removeTitle: 'A fájl eltávolítása',
            uploadTitle: 'Fájl feltöltése',
            uploadRetryTitle: 'Feltöltés újból',
            downloadTitle: 'Fájl letöltése',
            rotateTitle: 'Elforgatás 90 fokkal az óra járásával megegyezően',
            zoomTitle: 'Részletek megtekintése',
            dragTitle: 'Mozgatás / Átrendezés',
            indicatorNewTitle: 'Még fel nem töltött',
            indicatorSuccessTitle: 'Feltöltött',
            indicatorErrorTitle: 'Feltöltés hiba',
            indicatorPausedTitle: 'Feltöltés szüneteltetve',
            indicatorLoadingTitle: 'Feltöltés...'
        },
        previewZoomButtonTitles: {
            prev: 'Előző fájl megnézése',
            next: 'Következő fájl megnézése',
            rotate: 'Elforgatás 90 fokkal az óra járásával megegyezően',
            toggleheader: 'Fejléc mutatása',
            fullscreen: 'Teljes képernyős mód bekapcsolása',
            borderless: 'Keret nélküli ablak mód bekapcsolása',
            close: 'Részletes előnézet bezárása'
        }
    };
}));
