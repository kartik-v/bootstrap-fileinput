/*!
 * FileInput Italian Translation
 * 
 * Author: Lorenzo Milesi <maxxer@yetopen.it>
 * Reviewed by : TheCocce <thecocce@gmail.com> on 30/11/2017
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

    $.fn.fileinputLocales['it'] = {
        fileSingle: 'file',
        filePlural: 'file',
        browseLabel: 'Sfoglia&hellip;',
        removeLabel: 'Rimuovi',
        removeTitle: 'Rimuovi i file selezionati',
        cancelLabel: 'Annulla',
        cancelTitle: 'Annulla i caricamenti in corso',
        uploadLabel: 'Carica',
        uploadTitle: 'Carica i file selezionati',
        msgNo: 'No',
        msgNoFilesSelected: '',
        msgCancelled: 'Annullato',
        msgPlaceholder: 'Seleziona {files}...',
        msgZoomModalHeading: 'Anteprima dettagliata',
        msgFileRequired: 'Devi selezionare almeno un file per poterlo caricare.',
        msgSizeTooSmall: 'La dimensione del file "{name}" (<b>{size} KB</b>) è troppo piccola e deve superare i <b>{minSize} KB</b>.',
        msgSizeTooLarge: 'Il file "{name}" (<b>{size} KB</b>) eccede la dimensione massima di caricamento pari a <b>{maxSize} KB</b>.',
        msgFilesTooLess: 'Devi selezionare almeno <b>{n}</b> {files} da caricare.',
        msgFilesTooMany: 'Il numero di file selezionati per il caricamento <b>({n})</b> eccede il numero massimo di file accettati <b>{m}</b>.',
        msgFileNotFound: 'File "{name}" non trovato!',
        msgFileSecured: 'Restrizioni di sicurezza impediscono la lettura del file "{name}".',
        msgFileNotReadable: 'Il file "{name}" non \xE8 leggibile.',
        msgFilePreviewAborted: 'Generazione anteprima per "{name}" annullata.',
        msgFilePreviewError: 'Errore durante la lettura del file "{name}".',
        msgInvalidFileName: 'Sono presenti caratteri non supportati o non validi nel nome del file "{name}".',
        msgInvalidFileType: 'Tipo non valido per il file "{name}". Sono ammessi solo file di tipo "{types}".',
        msgInvalidFileExtension: 'Estensione non valida per il file "{name}". Sono ammessi solo file con estensione "{extensions}".',
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
        msgUploadAborted: 'Il caricamento del file è stato interrotto',
        msgUploadThreshold: 'Processo in corso...',
        msgUploadBegin: 'Inizializzazione in corso...',
        msgUploadEnd: 'Caricamento completato',
        msgUploadEmpty: 'Nessun dato valido per il caricamento.',
        msgUploadError: 'Errore',
        msgValidationError: 'Errore di convalida',
        msgLoading: 'Caricamento file {index} di {files}&hellip;',
        msgProgress: 'Caricamento file {index} di {files} - {name} - {percent}% completato.',
        msgSelected: '{n} {files} selezionati',
        msgFoldersNotAllowed: 'Trascina solo file! Ignorata/e {n} cartella/e.',
        msgImageWidthSmall: 'La larghezza del file immagine "{name}" deve essere di almeno di {size} px.',
        msgImageHeightSmall: 'L\' altezza del file immagine "{name}" deve essere di almeno {size} px.',
        msgImageWidthLarge: 'La larghezza del file immagine "{name}" non può superare {size} px.',
        msgImageHeightLarge: 'L\' altezza del file immagine "{name}" non può superare {size} px.',
        msgImageResizeError: "Impossibile ottenere le dimensioni dell'immagine per ridimensionare.",
        msgImageResizeException: "Errore durante il ridimensionamento dell'immagine.<pre>{errors}</pre>",
        msgAjaxError: 'Qualcosa non è andato a buon fine con l\'operazione {operation} . Per favore riporva più tardi!',
        msgAjaxProgressError: '{operation} fallita',
        ajaxOperations: {
            deleteThumb: 'cancella file',
            uploadThumb: 'carica file',
            uploadBatch: 'carica file multipli',
            uploadExtra: 'form caricamento dati'
        },
        dropZoneTitle: 'Trascina i file qui&hellip;',
        dropZoneClickTitle: '<br>(oppure clicca qui per selezionare i {files})',
        fileActionSettings: {
            removeTitle: 'Rimuovere il file',
            uploadTitle: 'Caricare un file',
            uploadRetryTitle: 'Riprova caricamento',
            downloadTitle: 'Download file',
            zoomTitle: 'Guarda i dettagli',
            dragTitle: 'Muovi / arrangia files',
            indicatorNewTitle: 'Non ancora caricato',
            indicatorSuccessTitle: 'Caricati',
            indicatorErrorTitle: 'Errore caricamento',
            indicatorLoadingTitle: 'Caricamento ...'
        },
        previewZoomButtonTitles: {
            prev: 'Visualizza file precedente',
            next: 'Visualizza file successivo',
            toggleheader: 'Attiva / disattiva intestazione',
            fullscreen: 'Attiva / disattiva modalità schermo intero',
            borderless: 'Atttiva / disattiva modalità senza bordi',
            close: 'Chiudi dettaglio anteprima'
        }
    };
})(window.jQuery);