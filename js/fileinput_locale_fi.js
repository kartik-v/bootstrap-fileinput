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
(function ($) {
    "use strict";

    $.fn.fileinput.locales.fi = {
        fileSingle: 'tiedosto',
        filePlural: 'tiedostot',
        browseLabel: 'Selaa &hellip;',
        removeLabel: 'Remove',
        removeTitle: 'Tyhj‰nn‰ valitut tiedostot',
        cancelLabel: 'Peruuta',
        cancelTitle: 'Peruuta lataus',
        uploadLabel: 'Lataa',
        uploadTitle: 'Lataa valitut tiedostot',
        msgSizeTooLarge: 'Tiedosto "{name}" (<b>{size} Kt</b>) ylitt‰‰ suurimman sallitun tiedoston koon, joka on <b>{maxSize} Kt</b>. Yrit‰ uudelleen!',
        msgFilesTooLess: 'V‰hint‰‰n <b>{n}</b> {files} tiedostoa on valittava ladattavaksi. Ole hyv‰ ja yrit‰ uudelleen!',
        msgFilesTooMany: 'Valittujen tiedostojen lukum‰‰r‰ <b>({n})</b> ylitt‰‰ suurimman sallitun m‰‰r‰n <b>{m}</b>. Ole hyv‰ ja yrit‰ uudelleen!',
        msgFileNotFound: 'Tiedostoa "{name}" ei lˆydy!',
        msgFileSecured: 'Tietoturvarajoitukset est‰v‰t tiedoston "{name}" lukemisen.',
        msgFileNotReadable: 'Tiedosto "{name}" ei ole luettavissa.',
        msgFilePreviewAborted: 'Tiedoston "{name}" esikatselu keskeytetty.',
        msgFilePreviewError: 'Virhe on tapahtunut luettaessa tiedostoa "{name}".',
        msgInvalidFileType: 'Tiedosto "{name}" on v‰‰r‰n tyyppinen. Ainoastaan tiedostot tyyppi‰ "{types}" ovat tuettuja.',
        msgInvalidFileExtension: 'Tiedoston "{name}" tarkenne on ep‰kelpo. Ainoastaan tarkenteet "{extensions}" ovat tuettuja.',
        msgValidationError: 'Tiedoston latausvirhe',
        msgLoading: 'Ladataan tiedostoa {index} / {files} &hellip;',
        msgProgress: 'Ladataan tiedostoa {index} / {files} - {name} - {percent}% valmistunut.',
        msgSelected: '{n} tiedostoa valittu',
        msgFoldersNotAllowed: 'Raahaa ja pudota ainoastaan tiedostoja! Ohitettu {n} raahattua kansiota.',
        dropZoneTitle: 'Raahaa ja pudota tiedostot t‰h‰n &hellip;'
    };

    $.extend($.fn.fileinput.defaults, $.fn.fileinput.locales.fi);
})(window.jQuery);