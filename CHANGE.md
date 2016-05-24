Change Log: `bootstrap-fileinput`
=================================

## version 4.3.2

**Date:** 22-May-2016

1. (bug #595): Correct initialization of `allowedPreviewTypes`.
2. (enh #600): Synchronize latest package on NuGet.
3. (enh #604): Fixed unset method in deleting previewCache index.
4. (enh #605): Fixed previewCache tags reset.
5. (enh #615): Correct Finnish Localizations.
6. (enh #618): Update German Translations.
7. (enh #632): Find correct filename in IE9.
8. (enh #633): New property `maxFilePreviewSize` to control preview of large size files.
9. (enh #634): Enhance ability for PDF and HTML preview.
    - Enhanced PDF support as PDF embedding is now possible for `initialPreview`. In addition a new template for PDF is available within `previewTemplates`.
    - HTML Preview is enhanced with a better template. The plugin also now includes support for `DOMPurify` plugin (and available in plugins folder). This processes and cleans the HTML from XSS before previewing. This behavior can be controlled via `purifyHtml` property that defaults to `true`.
10. (enh #635): Various preview enhancements. Previews will be revamped with various functionality:
    - Add ability to zoom every thumbnail to a modal preview. So all types of files (images, videos, pdf, text etc) can be previewed in a larger zoom dialog window.
    - Automatic slideshow like interface for zoom preview modal. One can navigate left or right to view previous or next content in the preview. In addition to button navigation, keyboard navigation (via left/right arrow keys) is also available.
    - Borderless maximized mode and Full Screen mode available for preview.
    - Auto disable the previous or next button when the first or last file/image is reached.
    - Now `initialPreview` can be setup MORE easier without writing or returning entire markup. Thus the new functionality will enable to use built in `previewTemplates`.  
    - A new boolean property `initialPreviewAsData` is available to control the above. If set to `true`, it will allow developers to now pass just the data within `initialPreview` (instead of complete markup) and the markup will be auto generated using `previewTemplates`.
    - New property `initialPreviewFileType` to set the default file type for initial preview. Defaults to `image`. Must be on of the keys in `fileTypeSettings`.
    - All the other settings can be controlled via `initialPreviewConfig`. The new properties available within `initialPreviewConfig` are:
       - `type`: Override `initialPreviewFileType` at global level and set a separate type for each file in the initial preview.
       - `previewAsData`: boolean property to override the `initialPreviewAsData` setting at global level
    - New zoom preview control buttons:
       - `prev`
       - `next`
       - `fullscreen`
       - `borderless`
       - `toggleheader`
       - `close`
    - The other new settings to control zoomed preview:
        - `previewZoomSettings`: Will allow to set the CSS style (e.g. width, height and other CSS style settings) for each zoomed content type (i.e. `image`, `pdf`, `video` etc.).
        - `previewZoomButtonIcons`: Ability to set the labels for previous, next, fullscreen, borderless, and close buttons.
        - `previewZoomButtonTitles`: Ability to set the titles for previous, next,  fullscreen, borderless, and close buttons.
        - `previewZoomButtonClasses`:  Ability to set the CSS classes for previous, next,  fullscreen, borderless, and close buttons.
    - Modifications to all language locales JS for accomodating new translations
11. (enh #636): File action enhancements.
    - Zoom and Drag buttons will be shown as an additional file action buttons in addition to `upload` and `remove`
    - New boolean properties `showZoom`, `showDrag`, `showRemove`, `showUpload` are now added to `fileActionSettings` to control display of these buttons
    - New properties `zoomIcon`, `zoomClass`, `zoomTitle` are available within `fileActionSettings` for controlling the zoom button styles and display.
    - New properties `dragIcon`, `dragClass`, `dragTitle` are available within `fileActionSettings` for controlling the drag indicator styles and display.
    - New properties `actionZoom` and `actionDrag` are available within `layoutTemplates` to configure the markup of the zoom and drag buttons.
12. (enh #639): Add ability to just require package in nodejs
13. (enh #640): Ability to theme and provide font awesome theme. New property `theme` added.
14. (enh #641): Wrap readFile(index + 1) in a function to prevent 'unsafe-eval' blocking with CSP.
15. (enh #642): Reorganize JS code into proper folders. Following folders will be added/maintained
    - `locales`: all translation JS files will be located here
    - `themes`: all theme JS files will be located here
    - `plugins`: third party JS plugins that will be used to work with bootstrap-fileinput
16. (enh #643):Implement rearranging / sorting functionality for initial preview. 
    - Add ability to rearrange and sort thumbnails by drag & drop. This feature will use the [Sortable plugin](https://github.com/RubaXa/Sortable) which will be included in the `js/plugins` folder.
    - This feature will be available only for **initial preview thumbnails** for both ajax and form uploads.
    - New property for drag indicator and drag behavior configurations will be included in `fileActionSettings`:
        - `showDrag`
        - `dragIcon`
        - `dragClass`
        - `dragTitle`
        - `dragSettings`
    - New template `actionDrag` will be available within `layoutTemplates` to configure your drag indicator markup.
17. Simpler naming for files in locales and themes folders.
18. (enh #647): Display file size in previews and templates.
19. Enhancements to file preview icons (`other` template).
20. (enh #654): Update Spanish Translations.
21. (enh #655): Include sass styling configuration.

## version 4.3.1

**Date:** 28-Feb-2016

1. (enh #514): Set default value for `removeFromPreviewOnError` to `false`.
2. (enh #554): Update documentation and demos to include `webkitdirectory` for upload.
3. (enh #555): Set default value for `removeFromPreviewOnError` to `false`.
4. (enh #557): Enhance default file type parsing to intelligently not render unpreviewable content.
5. (enh #559): Allow custom error display styles (e.g. via bootstrap dialog) through these changes:
    - added `msg` param in `fileerror`, `fileuploaderror`, and `filefoldererror` events.
6. (enh #560): Update French Translations.
7. (enh #565): Enhance progress bar display when upload is aborted or cancelled.
8. (enh #567): New properties and improved messages.
9. (enh #572): Add Finnish Translations.
10. (enh #573): Update package.json to include `peerDependencies`.
11. (enh #574): Change naming convention for private / internal methods. Prepend internal plugin methods with underscore `_`.
12. (enh #575): Implement public method chaining and update docs for methods.
13. (bug #576): Correct previewCache initialization.
14. (bug #577): Better label spacing for default browse icon.

## version 4.3.0

**Date:** 25-Jan-2016

1. (enh #550): Correct Drag and drop issue with v4.2.9.

## version 4.2.9

**Date:** 22-Jan-2016

1. (enh #489): Update documentation for `change` and `fileselect` events.
2. (enh #521): Update Dutch Translations.
3. (enh #523): Add new branch `sass` for `bootstrap-sass-official` support.
4. (enh #530): Error alert box and preview thumbnail styling enhancements.
5. (enh #531): Enhance/Fix typos of Arabic translation.
6. (enh #534, enh #535): Ability to remove errored file thumbnails via `removeFromPreviewOnError`.
7. (enh #541): Improve default slug callback to accept most characters.
8. (enh #545): Refactor code to deep extend options correctly.

## version 4.2.8

**Date:** 18-Nov-2015

1. Update bootstrap bower version to support only 3.x variants.
2. Implement package.json.
3. (enh #449): Add Arabic Translations.
4. (enh #454): Update Turkish Translations.
5. (enh #460): Update CSS selectors prefix to start with `file`.
6. (enh #462): Responsive buttons and new property `buttonLabelClass`.
7. (enh #465): Add Català translations.
8. (enh #474): Upload via button within each preview thumbnail skips last file for async uploads.
9. (enh #477): Fix IE10 specific styling bug for file input block button.
10. (enh #481): Universal Module Definition for use with CommonJS, AMD or browser globals.
11. (bug #483): Clear and reset native input after uploading each single file thumbnail.
12. (enh #488): Publish to npm.
13. (enh #490): Fix `zh-TW` translation `browseLabel` wording.
14. (enh #494): Add Indonesian translations.

## version 4.2.7

**Date**: 13-Sep-2015

1. (bug #420): Revamp file status progress and positioning updates for asynchronous upload.
2. (enh #427): Add image resizing capability before upload.
3. (enh #428): Enhancements to asynchronous uploads when `showPreview` is `false`.
4. (bug #429): Fix for MS Edge bug that does not support drag and drop.
5. (enh #431): Add Danish locale translations.
6. (enh #432): Send slugged file names with the file blob when uploading via ajax.
7. (enh #433): Added new events for image handling.
    - `fileimageloaded` (fires after each image is loaded in preview) - this is an existing event
    - `fileimagesloaded` (fires after all images are loaded in preview)
    - `fileimageresized` (fires after each image in preview is resized)
    - `fileimagesresized` (fires after all images in preview are resized)
    - `fileimageresizeerror` (fires when any image resize error is faced)
8. (enh #434): Added Japanese translations.
9. (enh #436): New property `showClose` and new layout template `close` to control close icon display.
10. (enh #437): New property `defaultPreviewContent` to control a default preview.
11. (bug #442); Enhance the filenames parsing in the filestack and slug conversion.

## version 4.2.6

**Date**: 26-Aug-2015

1. (enh #373): Default delete ajax request type to POST (instead of DELETE).
2. (enh #376): Ability to validate initial/server files for max and min file count.
3. (enh #377): Various enhancements to text preview.
4. (enh #378): Ability to configure different icon thumbnails for preview files.
5. (enh #379): Combine more translatable settings and update locale js files.
6. (enh #380, #381): Consistent styling for thumbnails.
7. Update translations to include `fileActionSettings`.
8. (enh #382): Better implementation for parsing text in `parseError` method.
9. (enh #385): Updated Russian & Ukranian translations.
10. (enh #387): Reset `initialCaption` better when preview is cleared.
11. (enh #389): New templates and styling enhancements to caption and main buttons.
12. (enh #390): Thumbnail error display enhancements.
13. (enh #391): Thumbnail styling enhancements for flash, html, and object types.
14. (enh #392): Enhancements to allow using plugin functions directly.
15. (enh #393): Minor enhancements to abort events before upload.
16. (bug #398): Validate `data.errorkeys` more correctly.
17. (enh #401): Various enhancements to preview file thumbnails and error validations.
18. (enh #405): Create traditional Chinese translations.
19. (enh #410): Better validation for IE 10 and below.
20. (enh #412): Enhancements to file upload cancellation.
21. (enh #413): Various updates to translations.
22. (enh #426): Enhancements to progress bar and display thumbnail specific progress.

## version 4.2.5

**Date**: 27-Jul-2015

1. (enh #362): Add Bulgarian translations.
2. (bug #370): Reverts #342 with better fix.
3. (enh #371): Ability to replace files in the preview. New `autoReplace` property.
4. (enh #372): Create new event `filepreajax`.

## version 4.2.4

**Date**: 22-Jul-2015

1. (enh #340): Receive `previewId` and `index` in extra data for individual thumbnail uploads (ajax).
2. (enh #342): Add ability to modify extra data before ajax upload in `beforeSend` events.
3. (enh #351): Updates to Ukranian & Russian translations.
4. (enh #356): Implement `destroy` method.
5. (enh #357): Enhanced and better `refresh` method.
6. (enh #358): Implement event namespaces and enhance event handling process.

## version 4.2.3

**Date**: 21-Jun-2015

1. (enh #336): Fixes to reset preview via `initUploadSuccess`.

## version 4.2.2

**Date**: 18-Jun-2015

1. (enh #332): Bump nuget and bower package versions.

## version 4.2.1

**Date**: 15-Jun-2015

1. (enh #279, #280): Fixed error for failed response types.
2. (enh #287): Add Brazilian Portugese (pt-BR) translations.
3. (bug #295): Validate `overwriteInitial` correctly for ajax uploads.
4. (enh #296): Fixed license identifiers in bower.json and composer.json.
5. (enh #297): Add Romanian translations.
6. (enh #299): Enhancements for displaying uploaded file thumbnails.
    - New property `showUploadedThumbs` that will display uploaded thumbnails until the remove/clear button is explicitly pressed.
    - New event `filesuccessremove`. This will be triggered on removing the uploaded thumbnail using the thumbnail delete button. The event shares the following parameters:
        - `id`: the HTML id attribute of the thumbnail container 
      The `event` can be set to return `false` to abort the thumbnail removal.
7. (enh #302): Add Greek (el) translations.
8. (enh #303): Validate only files to be dragged and dropped.
9. (enh #305): Implement better cleanup of memory with `revokeObjectURL`.
10. (enh #307): Allow setting thumbnail frame css class and attributes via `initialPreviewConfig`.
11. (enh #308): Better check for `data.error` being empty.
12. (enh #309): Fixes for older browsers.
13. (bug #310): Set missing caption icon on error.
14. (bug #315): Fix parsing of preview settings for default (other) preview.
15. (bug #327): More correct clearing of preview.
16. (bug #328): Implement image dimension validations.
    - New properties added to the plugin:
        - `minImageWidth`
        - `minImageHeight`
        - `maxImageWidth`
        - `maxImageHeight`
        - `msgImageWidthSmall`
        - `msgImageHeightSmall`
        - `msgImageWidthLarge`
        - `msgImageHeightLarge`
17. (enh #329): Message translation updates.
18. (enh #330): Minor enhancements in validating preview and progress bar display.

## version 4.2.0

**Date**: 11-May-2015

1. (enh #275): Add Czech & Slovakian translations.
2. (enh #277): New `language` property to allow configuring multi lang widgets on same page.

## version 4.1.9

**Date**: 02-May-2015

1. (enh #232): Update docs to reflect updated bootstrap CDN domain.
2. (enh #237): Better styling of file caption icon.
3. (bug #238): Correct initialization of plugin variables when other than maxFileCount & maxFileSize.
4. (enh #241): Enhancements to initial preview delete to perform validations before delete.
5. (bug #243): Correct sending of `deleteExtraData`.
6. (enh #244): Add Serbian translations.
7. (enh #245): Allow initial caption to be set without initial preview.
8. (bug #247): Correct mime types validation.
9. (enh #248): keep chinese characters in file caption.
10. (bug #249): Fix error message content display.
11. (enh #250): Change default slug routine to allow umlauts in filenames.
12. (enh #251): Add Italian localizations.
13. (enh #252): Enhance async batch completion.
14. (bug #253): Fix initial preview delete cache initialization.
15. (bug #257): Fix upload single to replace thumbs correctly.
16. (enh #258): Enhance messages to include file plural and single.
17. (enh #259): Add Polish translations.
18. (enh #263): Enhance parsing of file preview thumbnails and actions.
19. (enh #264): Validate input type of file before initializing plugin.
20. (enh #269, #272): Add Turkish translations.
21. (enh #270): Add Portugese translations.
22. (enh #271): Add Dutch translations.
23. (bug #273): Reset caption correctly after all initial preview is deleted.

## version 4.1.8

**Date**: 30-Mar-2015

1. (bug #171): Fix typo for files validation.
2. (enh #167, #173): New `deleteExtraData` property for ajax deletions.
3. (enh #174): New `deleteUrl` property.
4. (enh #175): Ability to override delete extra data in `initialPreviewConfig`.
5. (enh #176): Wrong file in README installation steps fixed.
6. (enh #177): Trigger filebatchpreupload if showPreview is `false`.
7. (enh #178): Updated README for cancel button configuration.
8. (enh #179): Validate and cast `maxFileSize` and `maxFileCount` to numeric - even if they have been setup as a string.
9. (enh #181): Fix change event triggered for IE 11 when file input is set to empty.
10. (enh #183): Delete extra data enhancements.
11. (enh #184): Fix documentation for filedeleted event.
12. (enh #187): New property `previewFileIcon` to configure file icon shown in preview for unreadable file types.
13. (enh #188): Clear fileinput more correctly for all browsers when initialPreview is set enhancement
14. (enh #189): Reinitialize initial preview delete events correctly on file selection.
15. (enh #192): Ability to extend and add one's own ajax settings.
    - New property `ajaxDeleteSettings` to help extend and add to delete ajax settings. 
    - `ajaxSettings` to help extend and add upload ajax settings
16. (bug #193): Better validation for triggering `filebatchuploadcomplete` on async batch upload completion.
17. (enh #202): Ability to add Translations / Locales.
    - Identify and group all messages that need to be translated configurable via `$.fn.fileinput.locales['<lang-code>']`
    - Set default english messages configuration `$.fn.fileinput.locales['en']` within the plugin core code
    - Individual locale files need to be created as separate js files e.g. `<lang>.js`
18. (enh #203): Enhancements and revamp of all error events.
    - fileerror
    - fileuploaderror
    - filebatchuploaderror
    - filedeleteerror
    - filefoldererror (new event - see #209)
    - filecustomerror (new event - see #206)
19. (enh #204): New properties `fileMinCount` and `msgFilesTooLess` (useful to make file input mandatory).
    - The `fileMinCount` property will allow to set the minimum file count needed before triggering upload. It will work for both `ajax` uploads and `normal form based submission`.
    - This will enable you to set the file input to be a mandatory / required input. (e.g. `fileMinCount` = `1`). The `msgFilesTooLess` will be displayed and error raised.
    - If `fileMinCount` is set to `0` it will be treated as files are optional and no error will be triggered.
20. (enh #205): Allow to auto set initialPreview within `filebatchuploadcomplete` & `filebatchuploadsuccess`.
    - Allows you to auto define the `initialPreview` and  `initialPreviewConfig` after an ajax upload by returning these within the data object from your ajax response on `fileuploaded` & `filebatchuploadsuccess`. 
21. (enh #206): Ability to add custom validation and trigger custom error to abort upload.
    - This enhancement will enable you to add your additional custom validations to enhance the fileinput to be used for innumerous scenarios. It will allow an ability to return an associative object with any of the fileinput events (except the error events and the `filebatchuploadsuccess` or `filebatchuploadcomplete`) e.g. `change`, `fileselect`, `filepreupload`, `filebatchpreupload` etc. The object can return the following keys:
        - `message`: _string_, the validation error message to be displayed before upload. If this is set the plugin will automatically abort the upload whenever called and display this as an error message. You can use this property for example to read a file and perform your own custom validation.
        - `data`: _object_, an optional associative array of additional data that you can pass for usage later. 
    - You can get this data by reading `abortData` in the parameters for the new `filecustomerror` event. This new event will be triggered during upload, when  you have triggered an abort from any of the other events. 
22. (enh #209): Better validation for folder drag and drop and auto-skip any dropped folders. New property `msgFoldersNotAllowed` added to the plugin to allow configuring the message shown. The event `filefoldererror` is triggered when a folder is dragged.
23. (enh #211): Add ability to show detailed server error stack via `showAjaxErrorDetails`.
24. (enh #212): Revamp preview to use a new preview caching object.
25. (enh #213): Code cleanup, eliminate change event on clear and properly reset preview cache after ajax deletes.
26. (enh #215): Set default delete method REST compliant.
27. (enh #216): Add Hungarian Translations.
28. (enh #217): Ensure `filebatchselected` event is triggered after FileReader completes reading files selected.
29. (enh #218): Do not clear preview for ajaxuploads until remove button clicked.
30. (enh #222): Enhance to include dynamically replaceable thumbnail tags. Two new properties `previewThumbTags` and `initialPreviewThumbTags` will be available for configuration.
31. (enh #225): Create Russian translations.
32. (enh #226): Create Spanish (Latin American) translations.
33. (enh #227): Created Ukranian translations and updated Russian translations.
34. (enh #228): Created Thai translations.
35. (enh #229): Created French translations.
36. (enh #230): More correct initial preview delete reset.

## version 4.1.7

**Date**: 13-Feb-2015

1. (enh #149): Custom tags support for layoutTemplates and previewTemplates (new properties `customLayoutTags` and `customPreviewTags` included).
2. (enh #151): New `filebatchselected` event triggered after every batch of files are selected.
3. (enh #152): New faster `replaceAll` method instead of regexp parsing to replace tags in templates.
4. (enh #153): Improve error handler for trapping FileReader security exceptions and new property `msgFileSecured` will display the security exception message.
5. (enh #154): Code cleanup and restructure for JS lint changes (using JSHint Code cleanup library).
6. (enh #155): Allow display of long file names without spaces/word breaks.
7. (enh #156): Fix reset of file stack for various upload modes (single, batch async and batch sync).
8. (enh #157): Upload progress bar styling enhancements.
    - Allow upload progress bar css class to be configurable 
    - Create and allow two different styles/css classes for progress bar
       - `progressClass`: styling for progress bar when upload is in process
       - `progressCompleteClass`: styling for progress bar when upload is complete
9. (bug #159): Ensure filestack is passed correctly with `outData` for events.
10. (bug #160): Correct documentation typo for usage.
11. (enh #162): New property ajaxSettings to allow configuring ajax params.
12. Set copyright year to current.
13. Relocate sample files from examples directory to [bootstrap-fileinput-samples](https://github.com/kartik-v/bootstrap-fileinput-samples) repo.

## version 4.1.6

**Date:** 20-Jan-2015

1. (enh #124): Allow submission of extra data even if no files are selected.
2. (enh #131): Allow empty values in extra data to be submitted.
3. (enh #136):Create new upload method that can be called externally.
4. (enh #137): Trigger new events - `filedisabled` and `fileenabled`.
5. (enh #139): Reset file stack correctly on ajax upload completion.

## version 4.1.5

**Date:** 12-Jan-2015

1. (bug #100, #101): Set right params for error thrown during reading of files.
2. (bug #104): Fix formdata not defined.
3. (enh #105): Expose current jqXHR object on ajax events.
4. (enh #106): Enhance events for ajax requests and enable cancelling sync uploads
5. (enh #108): Add nuget package.
6. (bug #112): Fix undefined filestack for individual file upload within preview.
7. (bug #113): Icon layout template undefined when using user template.
8. (bug #114): Prevent multiple file selection when using single file configuration.
9. (enh #115): Autosize file caption responsively on window resize.
10. (enh #116): Hide remove and upload buttons until unless file(s) are selected.
11. (enh #119): Enhance caption to include ellipsis for long file names
12. (bug #120): Correct multiple iterations of upload for async batch uploads.
13. (enh #121): Animate progress bars by default for upload progress.

## version 4.1.4

**Date:** 26-Dec-2014

1. (enh #88): Allow uploadExtraData to be passed as a callback.
2. (enh #89): New `otherActionButtons` to allow adding customized initial preview content actions.
3. (enh #90): New event `filebatchpreupload` for both synchronous and asynchronous batch uploads.
4. (enh #91): Pass FileReader instance with outData in events.
5. (enh #92): Realign event triggering timing for batch uploads to ensure outData is available.
6. (enh #93): Better styling of file upload icon indicators in thumbnails.
7. Code cleanup with reusable methods for event raising and outData generation.
8. (bug #95): Correct event off for drag & drop in plugin refresh method.
9. (bug #97): Reset events correctly with plugin refresh method.

## version 4.1.3

**Date:** 20-Dec-2014

1. (enh #85): Combine output data as a single object, that is sent for various file upload events. 
    - `filepreupload`
    - `fileuploaded`
    - `fileuploaderror`
    - `filebatchuploaderror`
    - `filebatchuploadsuccess`
    - `filebatchuploadcomplete`
2. (enh #86): Disable thumbnail action buttons when upload is in progress.
3. (enh #87): More correct progress indicator percentage for asynchronous upload.

## version 4.1.2

**Date:** 19-Dec-2014

1. (enh #81): Add new events:
    - `filebatchuploadsuccess`
    - `filebatchuploadcomplete` 
2. (enh #80): Allow access to `uploadExtraData` and `responseData` to following events
    - `filepreupload`
    - `fileuploaded`
    - `fileuploaderror`
    - `filebatchuploaderror`
    - `filebatchuploadsuccess`
    - `filebatchuploadcomplete`
    - `filelock`
    - `fileunlock`

## version 4.1.1

**Date:** 18-Dec-2014

1. (bug #76): Update filestack when `showPreview` is false.
2. (bug #78): Set uploadExtraData parameters to be correctly sent via POST.
3. (enh #58): Set a new property `textEncoding` for reading the text files with right encoding.

## version 4.1.0

**Date:** 17-Dec-2014

1. (enh #74): Enhancements to file validation errors for both FORM and AJAX uploads.
    - For normal Form based uploads automatically disable the Upload button
    - Display a separate error styled thumbnail for the file that faced the validation error.
    - Reset errors correctly to overwrite files with a new change or drag/drop
2. (enh #75): Better validation of browser support for drag and drop.

## version 4.0.0

**Date:** 14-Dec-2014

1. (enh #70): Version 4.0 enhancements.
2. Renamed `initialDelimiter` to `initialPreviewDelimiter`
3. (bug #72): Fix bootstrap ## version constraint.

### Version 4.0 Features

1. Add functionality for AJAX based UPLOAD using HTML5 FormData (most modern browsers support it). Will degrade to normal Form Based File submission if this is not supported.
2. To use AJAX Upload, the `uploadUrl` property is MANDATORY and must be set.
3. Enhance plugin to now allow files to be added, appended, removed (based on FEEDBACK from many). Thus one can append files to preview.
4. New DRAG & DROP zone available in preview to drag and drop files and append.
5. Delete or upload files one by one OR in batch.
6. If `showPreview` is set to false, or uploadUrl is not supported plugin will degrade to normal form based upload.
7. Configurable indicators for file awaiting upload, file successfully uploaded, files errored in upload.
8. Ability to add extra form data with ajax based uploads.
9. Upload progress bar and individual thumbnail upload indicators.
10. Ability to cancel and abort ongoing AJAX uploads.
11. Templates have been revamped and enhanced for each file type.
12. Ensure plugin is still lean in size and optimized for performance inspite of the above features by optimally utilizing HTML5 & jquery features only.

### New properties added

1. `showCancel`: shows a cancel button for aborting ajax uploads (defaults to `true`).
2. `cancelLabel`: label for the cancel button.
3. `cancelTitle`: title for the cancel button on hover.
4. `cancelIcon`: icon markup for the cancel button
5. `cancelClass`: CSS class for the cancel button.
6. `removeTitle`: title for the remove button on hover.
7. `uploadTitle`: title for the upload button on hover.
8. `uploadUrl`: the url that will be used to process AJAX based uploads (using FormData XHR2).
9. `uploadExtraData`: extra data that will be passed as data to the url/AJAX server call via POST
10. `uploadAsync`: whether the batch upload of multiple files will be asynchronous/in parallel. Defaults to `true`.
11. `initialPreviewShowDelete`:  shows a delete button for each initial preview content's thumbnail (defaults to `true`).
12. `initialPreviewConfig`: configuration for setting up each `initialPreviewContent` item (associative array/object)
    - `caption`: The caption or filename to display for each initial preview item content.
    - `width`: The CSS width of the image/content displayed.
    - `url`: The URL for deleting the image/content via AJAX (shown only for `initialPreviewContent`).
    - `key`: The key that will be passed to the URL via POST (shown only for `initialPreviewContent`).
13. `dropZoneEnabled`: Enable a drag and drop zone for dragging files and is available only for ajax based uploads (defaults to `true`). 
14. `dropZoneTitle`: Title to be displayed in the drag & drop zone. 
15. `dropZoneTitleClass`: CSS class for the drag & drop zone title.
16. `fileActionSettings`: configuration for setting up actions for newly selected file thumbnails in the preview (associative array/object)
    - `removeIcon`: icon for remove button to be displayed in each file thumbnail.
    - `removeClass`: CSS class for the remove button in each file thumbnail.
    - `removeTitle`: title for remove button in each file thumbnail.
    - `uploadIcon`: icon for upload button to be displayed in each file thumbnail.
    - `uploadClass`: CSS class for the remove button in each file thumbnail.
    - `uploadTitle`: title for remove button in each file thumbnail.
    - `indicatorNew`: an indicator (HTML markup) for new pending upload displayed in each file thumbnail.
    - `indicatorSuccess`: an indicator (HTML markup) for successful upload displayed in each file thumbnail.
    - `indicatorError`: an indicator (HTML markup) for error in upload displayed in each file thumbnail.
    - `indicatorLoading`: an indicator (HTML markup) for ongoing upload displayed in each file thumbnail.
    - `indicatorNewTitle`: title to display on hover of indicator for new pending upload in each file thumbnail.
    - `indicatorSuccessTitle`: title to display on hover of indicator for successful in each file thumbnail.
    - `indicatorErrorTitle`: title to display on hover of indicator for error in upload in each file thumbnail.
    - `indicatorLoadingTitle`: title to display on hover of indicator for ongoing upload in each file thumbnail.

## version 3.0.0

**Date:** 08-Dec-2014

1. (enh #60): Enhance upload button for disable/enable when used with `<a>` tag.
2. (bug #61): Refresh preview to show errors correctly after each file is validated.
3. (enh #64): Add ability to override the slug method with a `slugCallback` property.
4. (enh #65): Correct validation of `refreshPreview` using `updateFileDetails`.
5. (enh #67): Enhance support for IE browsers
    - Add specific validations for parsing IE versions rightly
    - Enhance plugin to extend styling support to IE 9 (with the limitation that IE 9 does not support HTML 5 features like multiple file upload)
    - Fix clearing of file input rightly for IE 9 & IE 10
    - Degrade plugin automatically to a native file input for older IE versions
    - Prevent change method firing twice when file is cleared after error is encountered in IE 11.
6. (bug #68): Fix refresh method of the fileinput to trigger change correctly.

## version 2.9.0

**Date:** 23-Nov-2014

1. (enh #53): Validations and events for right reset of files when browse button is clicked.
2. (enh #55): Clear the files when file browse dialog is cancelled only if the browser clears the native file input.
3. (enh #56): Trigger new events `filebrowse` and `fileselectnone`.

## version 2.8.0

**Date:** 13-Nov-2014

1. (enh #50): Dynamically auto size file captions for long file names exceeding container width. New property `autoFitCaption` 
   is added which defaults to `true`. When this is `true` the plugin will auto fit caption text within the container dynamically
   and responsively based on window size.
2. (enh #51): Autosize preview images when they exceed the size of the preview container.
3. (enh #52): Raise new `fileimageloaded` event.

## version 2.7.0

**Date:** 11-Nov-2014

1. Set release to stable in composer.json.
2. (enh #48): Trigger `fileloaded` event when `showPreview` is `false`.
3. (enh #49): Set image preview dimensions to auto fit and center

## version 2.6.0

**Date:** 15-Oct-2014

- (bug #40): More correct fix for IE (ver < 11) inability to clear fileinput values.
- Templatize errorContainer for display within the preview window.
- (enh #42): Enhance plugin to configure the `elErrorContainer` for displaying validation errors.
- (bug #43): Validate special characters in filename before generating caption.
- (bug #44): Browser IE10 hangs on file clear.

## version 2.5.0

**Date:** 09-Oct-2014

- (enh #36): New feature. Validation routine for checking allowed file types and extensions.
- (bug #37): HTML encode text content for preview in modal.
- (enh #38): Highlight error CSS in file caption on validation error.
- (bug #39): HTML encode caption hover title.
- (bug #40): Fix IE (ver < 11) inability to clear fileinput values.

## version 2.4.0

**Date:** 20-Sep-2014

- (enh #30): Enhanced generic support for more preview formats (audio, video, html, flash, and other objects).
- (enh #31): Better control and configuration of preview templates.
- (enh #32): Added checks for file api support.
- (enh #33): Better text format validation and correct modal preview.

> **Note:** There are BC Breaking Changes with release v2.4.0.

With release v2.4.0, the plugin has been revamped to support and configure a wide variety of file formats for preview. This may break some
backward compatibility (BC) for older versions that use custom templates. 

The following are the major changes with release v2.4.0:

- Plugin has been revamped to build preview intelligence based on various file preview types. The inbuilt file support types are categorized as 
  `image`, `text`, `html`, `video`,  `audio`, `flash`, `object`, and `other`.
- `allowedPreviewTypes`: You can now configure which all file types are allowed to be shown as a preview. This defaults to `['image', 'html', 'text', 'video', 'audio', 'flash', 'object']`.
   Thus all file types are treated as an object to preview by default. For exampleTo preview only `image` and `video`, you can set this to `['image', 'video']`.
- `allowedPreviewMimeTypes`: In addition to `allowedPreviewTypes`, you can also control which all mime types can be displayed for preview. This defaults to null,
   meaning all mime types are supported.
- `layoutTemplates`: Allows you to configure all layout template settings within one property. The layout objects that can be configured are: `main1`, `main2`,
   `preview`, `caption`, and `modal`.
- `previewTemplates`: All preview templates for **each preview type** have been combined into one property, instead of separate templates for image, text etc. 
   The keys are the formats as set in `allowedPreviewTypes` and values are the templates used for previewing. There are default prebuilt templates for each 
   preview file type (`generic`, `image`, `text`, `html`, `video`,  `audio`, `flash`, `object`, and `other`). The `generic` template is used only for displaying
   `initialPreview` content using direct markup.
- `previewSettings`: Allows you to configure width and height for each preview image type. The plugin has default widths and heights predefined for each type i.e
   `image`, `text`, `html`, `video`,  `audio`, `flash`, and `object`.
- `fileTypeSettings`: Allows you to configure and identify each preview file type using a callback. The plugin has default callbacks predefined to identify each type i.e
   `image`, `text`, `html`, `video`,  `audio`, `flash`, and `object`.
- Replacing tags within templates has been enhanced. With this release it will automatically check for multiple occurrences of each tag to replace within a template string.

> NOTE: Flash preview will require Shockwave flash to be installed and supported by the client browser. The flash preview currently works successfully with webkit browsers only. Video & Audio formats are however supported by all modern browsers 
that support the HTML5 `video`/`audio` tags. Note that browsers have limited number of video/audio formats supported by the HTML5 video element (e.g. mp4, webm, ogg, mp3, wav). The size of video files are recommended to be small (to be controlled 
through `maxFileSize` property) so that it does not affect the preview performance. You can copy a few files from the `examples` directory of this plugin repo, to test a few examples of flash and video files.

## version 2.3.0

**Date:** 19-Sep-2014

1. (enh #28, #29): Added support for previewing flash and video files.
2. Better replacement of tags in templates. Replaces all tag occurences with this new release.

## version 2.2.0

**Date:** 19-Aug-2014

1. (enh #24): Update readAsBinaryString to readAsArrayBuffer
2. (enh #25): Graceful degrade to normal file input for older browsers (including previous versions of Safari).

## version 2.1.0

**Date:** 11-Aug-2014

1. (enh #16, #17): Added exception handling for trapping FileReader API errors
2. New configuration property added: `maxFilesCount`. Defaults to `0` which means unlimited.
3. New configurable error messages added: `msgFilesTooMany`, `msgFileNotFound`, `msgFileNotReadable`, `msgFilePreviewAborted`, and `msgFilePreviewError`.
4. Enhanced plugin to improve browser performance when loading and previewing multiple image files.
5. (enh #18): Better validation for older browsers (not supporting HTML5) to degrade to normal file input.
6. (enh #19): Synchronize preview with file browse dialog behavior, when cancel button is pressed in file dialog window.
7. (enh #20): Fix `fileloaded` event to increment `previewId` and enhance to return file index.
8. (enh #21): Enhance multiple file upload and preview performance using setTimeout.
9. (enh #21): Enhance loading progress message and message templates for multiple file uploads.
10. (enh #22): Enhance file caption message display for validation errors.
11. Other minor bug fixes.

## version 2.0.0

**Date:** 25-Jul-2014

1. (enh #12, #13, #14): Various enhancements and fixes.
2. (enh #15): Enhanced validation of file size through `maxFileSize` configuration.
3. New plugin events added: `fileerror`, `fileloaded`, `filecleared`.
4. New plugin methods added: `disable`, `enable`
5. Enhanced configurable templates for previewing image, text, and other files (and a generic template).
6. Make caption text configurable through a new parameter `msgSelected`.
7. Correct calculation of files selected when `initPreview` is false.
8. Automatic scale images for preview, when images are too wide to fit in container.
9. Added delimiter option for `initialPreview` to pass multiple content delimited as a string.

## version 1.9.0

**Date:** 21-Jul-2014

1. (enh #9): Enhanced caption template and styling for captions to prevent overflow of long file names out of the caption container.
2. (enh #10): Ability to display initial caption, when initialPreview is false.

## version 1.8.0

**Date:** 15-Jul-2014

### Additions
1. (enh #9): Enhanced caption template and styling for captions to prevent overflow of long file names out of the caption container.

## version 1.7.0

**Date:** 02-Jul-2014

### Additions
1. The plugin now offers an additional `overwriteInitial` option. This is by default set to `true`, whereby, any `initialPreview`
   content set will be overwritten, when new file is uploaded or when files are cleared. Setting it to `false` will help displaying 
   a saved image or file from database always - useful especially when using the `multiple` file upload feature.

## version 1.6.0

**Date:** 03-Jun-2014

### Additions
1. The plugin now offers an additional `refresh` method. This enables you to dynamically change element attributes or plugin options
   at runtime and refresh the widget.

## version 1.5.0

**Date:** 23-May-2014

### Additions
1. The plugin now offers an option to display initial preview of images/text/other files. This is useful
   for record update scenarios. This can be a single image/file or an array of images/files.
2. Extending to the above feature, the plugin also allows you to set a preview caption for the initial preview field.

### Changes
3. The following element identifiers need to be passed as a string like '#id' instead of a JQuery object:
    
- elCaptionContainer
- elCaptionText
- elPreviewContainer
- elPreviewImage
- elPreviewStatus

## version 1.0.0

**Date:** 01-Jan-2014 

Initial release. The following features are included in this release:

1. The plugin will convert a simple HTML file input to an advanced file picker control. Will help fallback to a file input for browsers not supporting JQuery or Javascript.
2. The file input consists of the following three sections with options and templates to control the display:
   - file caption section: to display a brief information of the file(s) selected
   - file action buttons section: to browse, remove, and upload files.
   - file preview section: to display the selected files on client for preview (supports images and text file types). Other file types will be displayed as normal thumbnails.
3. The plugin automatically converts an input with `type = file` to an advanced file picker input if you set its `class = file`. All options to the input can be passed as HTML5 `data` attributes.
4. Ability to select and preview multiple files. Uses HTML 5 File reader API to read and preview files. Displays the progress of files being being loaded onto the preview zone, in case many files are chosen.
5. Offers predefined templates and CSS classes which can be changed to style your file-input display as per your needs.
6. Option to show/hide any or all of the following:
   - caption section
   - preview section
   - upload button
   - remove button
7. Customise the location of the target container elements to display the entire plugin, the caption container, the caption text, the preview container, preview image, and preview status.
8. For text file previews, autowrap the text to the thumbnail width, and show a wrap indicator link to display complete text on hover. You can customize the wrap indicator (which defaults to &hellip;).
9. Customise the messages for preview, progress, and files selected.
10. Upload action defaults to form submit. Supports an upload route/server action parameter for custom ajax based upload.
11. Triggers JQuery events for advanced development. Events currently available are `filereset` and `fileclear`.
12. Disabled and readonly file input support.
13. Size of the entire plugin is less than 11KB (about 9KB for the minified JS and 2KB for the minified CSS).
