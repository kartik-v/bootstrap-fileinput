/*!
 * FileInput Serbian Translations
 *
 * This file must be loaded after 'fileinput.js'. Patterns in braces '{}', or
 * any HTML markup tags in the messages must not be converted or translated.
 *
 * @see http://github.com/kartik-v/bootstrap-fileinput
 * @author Milos Stojanovic <stojanovic.loshmi@gmail.com>
 *
 * NOTE: this file must be saved in UTF-8 encoding.
 */
(function ($) {
    "use strict";

    $.fn.fileinputLocales['sr'] = {
        fileSingle: 'datoteka',
        filePlural: 'datoteke',
        browseLabel: 'Izaberi &hellip;',
        removeLabel: 'Ukloni',
        removeTitle: 'Ukloni označene datoteke',
        cancelLabel: 'Odustani',
        cancelTitle: 'Prekini trenutno otpremanje',
        uploadLabel: 'Otpremi',
        uploadTitle: 'Otpremi označene datoteke',
        msgZoomTitle: 'Приказ детаља',
        msgZoomModalHeading: 'Детаљан приказ',
        msgSizeTooLarge: 'Datoteka "{name}" (<b>{size} KB</b>) prekoračuje maksimalnu dozvoljenu veličinu datoteke od <b>{maxSize} KB</b>.',
        msgFilesTooLess: 'Morate odabrati najmanje <b>{n}</b> {files} za otpremanje.',
        msgFilesTooMany: 'Broj datoteka označenih za otpremanje <b>({n})</b> prekoračuje maksimalni dozvoljeni limit od <b>{m}</b>.',
        msgFileNotFound: 'Datoteka "{name}" nije pronađena!',
        msgFileSecured: 'Datoteku "{name}" nije moguće pročitati zbog bezbednosnih ograničenja.',
        msgFileNotReadable: 'Datoteku "{name}" nije moguće pročitati.',
        msgFilePreviewAborted: 'Generisanje prikaza nije moguće za "{name}".',
        msgFilePreviewError: 'Došlo je do greške prilikom čitanja datoteke "{name}".',
        msgInvalidFileType: 'Datoteka "{name}" je pogrešnog formata. Dozvoljeni formati su "{types}".',
        msgInvalidFileExtension: 'Ekstenzija datoteke "{name}" nije dozvoljena. Dozvoljene ekstenzije su "{extensions}".',
        msgValidationError: 'Greška prilikom otpremanja fajla',
        msgLoading: 'Učitavanje datoteke {index} od {files} &hellip;',
        msgProgress: 'Učitavanje datoteke {index} od {files} - {name} - {percent}% završeno.',
        msgSelected: '{n} {files} je označeno',
        msgFoldersNotAllowed: 'Moguće je prevlačiti samo datoteke! Preskočeno je {n} fascikla.',
        msgImageWidthSmall: 'Ширина Имаге Филе "{name}" мора бити најмање {size} пк.',
        msgImageHeightSmall: 'Висина Имаге Филе "{name}" мора бити најмање {size} пк.',
        msgImageWidthLarge: 'Ширина Имаге Филе "{name}" не може бити већи од {size} пк.',
        msgImageHeightLarge: 'Висина Имаге Филе "{name}" не може бити већи од {size} пк.',
        dropZoneTitle: 'Prevucite datoteke ovde &hellip;',
        fileActionSettings: {
            removeTitle: 'Уклони датотеку',
            uploadTitle: 'филе уплоад',
            indicatorNewTitle: 'Још није уплоадед',
            indicatorSuccessTitle: 'Постављено',
            indicatorErrorTitle: 'Додај Грешка',
            indicatorLoadingTitle: 'уплоадинг ...'
        }
    };
})(window.jQuery);
