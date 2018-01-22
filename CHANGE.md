Change Log: `bootstrap-fileinput`
=================================

## version 4.4.7

**Date:** 22-Jan-2018

- Update copyright year to current.
- (enh #1164): Update Slovak translations.
- (enh #1163): Update Czech translations.
- (enh #1159): Update Portuguese Brazilian translations.
- (enh #1157, #1158): Update input group styles for BS4 beta3.
- (bug #1152): Correct preview thumbs stacking post sorting and/or ajax deletion.
- (enh #1149): Enhance download button behavior to allow Firefox browser to download.
- (enh #1143): Correct translation path in docs.
- (enh #1142, #1141): Update Georgian translations.
- (enh #1138, #1137): Update Italian translations.
- (enh #1134): Update Polish translations.
- (enh #1131): New public method `readFiles` to allow input & preview of file objects programmatically.
- (enh #1128, #1129): Update rubaxa sortable plugin to fix Chrome support errors.
- (enh #1127): Update Italian Translations.

## version 4.4.6

**Date:** 13-Nov-2017

- (enh #1125): Create CODE_OF_CONDUCT.md.
- (bug #1123): Correct error container close button click behavior for various scenarios.
- (enh #1121): Update Spanish Translations.
- (enh #1119): Enhance close button icon markup as per BS4 norms.
- (enh #1118): Better file action button style.
- (bug #1117): Reset `ajaxAborted` status more correctly before upload.
- (enh #1113): Correct slug default callback to include hyphens in file name.
- (enh #1111): Enhance default file download action to use `button` markup.
- (enh #1110): Add support for previewing TIFF, EPS, AI, WMF files.
- (bug #1108): Correct sortable drag element parsing during sorting.
- (enh #1106): Update Portuguese BR Translations.
- (enh #1105): Update Russian Translations.
- (enh #1103): Update German Translations.
- (enh #1099): Enhance mime type parsing for IE 11. 
- (enh #1097): Add support for previewing Office file formats (e.g. docx, xlsx, pptx). 
    - Supports all common formats that google docs can view.
    - Available only for initial preview content (where the document is accessible via a public web link).
- Update README to include updated cover images for bootstrap-fileinput themes (with Bootstrap 4.x support).
- (enh #1096): Update Czech language folder and code to ISO code `cs`.
- (bug #1095): Fix resize image when used with non JPEG images (silently ignoring `piexif` errors).
- (enh #1094): Update French Translations.

## version 4.4.5

**Date:** 01-Oct-2017

- Update readme and example index to use plugin's CDN libraries.
- (enh #1093): Revamp SCSS with better variables and extensions.
- (enh #1091): Set default button type for close button markup template.
- (enh #1090): Auto detect intelligently the preview type based on file content.
- (enh #1087): Enhance SCSS/SASS styling configurations.
- (enh #1086): New placeholder property and various caption rendering enhancements.
- (enh #1085): Update Slovak Translations.
- (enh #1084): Update Czech Translations.

## version 4.4.4

**Date:** 21-Sep-2017

**_This release adds Bootstrap v4.x support._**

- (enh #1082, #1083): Better handling of errors when `showPreview` is `false`.
- (enh #1080): Enhance styling of zoom modal header and buttons.
- (bug #1079): Correct initial preview rendering when no `initialPreviewConfig` supplied.
- (enh #1078): Correct markup during file validation errors (non-ajax mode).
- (enh #1075): Enhance initial preview delete behavior (ensure `previewCache` splices deleted initial preview content items).
- (enh #1073): Enhance `refresh` method to overwrite options.
- (enh #1072): Enhance preview thumb templates to allow setting CSS styles (BC Breaking).
- (enh #1071): Auto detect small screen width and auto style/auto fit preview thumbnails.
- (enh #1070): Include new download action button for initial preview thumbnails.
- (enh #1069): Enhance action buttons to parse new `{key}` & `{filename}` tags.
- (bug #1068): Add ability to merge ajax callbacks when overriding ajax settings.
- (bug #1066): Correct `removeFromPreviewOnError` validation.
- (enh #1065): Enhancements to support Bootstrap v4.x framework.
- (enh #1064): Update Chinese Translations.

## version 4.4.3

**Date:** 27-Aug-2017

- (enh #1059): Better form reset behavior and update of `reset` method in docs.
- (enh #1056): Add Lithuanian Translations.
- (enh #1050): Update Japanese Translations & Locales.
- (enh #1049): New property `uploadUrlThumb`.
- (enh #1048): Add ability to retry errored file uploads.
    - New plugin properties added:
        - `retryErrorUploads`: _boolean_, will determine if errored out thumbnails can be retried for upload and submitted again.
        - `fileActionSettings.uploadRetryIcon`: Will change the icon of the upload button to retry icon specified here.
        - `fileActionSettings.uploadRetryTitle`: Will change the title of the upload button to retry title specified here.
        - `msgUploadError`: will be displayed within the progress bar on the errored out thumbnails.
    - Other enhancements include:
        - resetting progress bar correctly
        - enhancing upload validation behavior so that if `retryErrorUploads` is `false`, then no upload button is shown on the errored out thumbnails.
- (enh #1044): Add Slovak Translations.
- (enh #1043): Add Czech Translations.
- (enh #1042, #830): Fixes to initial preview delete (related to #1034).
- (enh #1038): Fix documentation for `{dataKey}`.
- (enh #1034): Add new event `filebeforedelete` and enhance delete abort logic.
- (enh #1033): Correct reset of preview in `reset` method.
- (enh #1031): Update French Translations.
- (bug #1030): Correct image dimension validation to consider non JPEG images.
- (enh #1015): Enhancement to RTL styling.
- (enh #1014): Enhancements to file upload single.
- (enh #1012): Better formatting of ajax errors display.
- (enh #1006): Update Farsi Translations.

## version 4.4.2

**Date:** 24-Jun-2017

- (enh #1005): Update Dutch Translations.
- (enh #1004): New Krajee Explorer Font Awesome Theme.
- (bug #995): Correct and fix image load jquery event triggering for browser cache scenarios.
- (enh #991): Add Azerbaijan Translations.
- (enh #990): Ability to hide thumbnail content (`hideThumbnailContent`) and display only file name/size.
- (enh #989): Update Chinese Translations.
- (enh #987): Zoom preview arrows orientation for RTL.
- (enh #986): Image width parsing and styling enhancements.
- (enh #985): Do not reset input when upload fails (single-upload mode).
- (enh #981): Update Hungarian Translations.
- (enh #977): Add RTL capability (new property `rtl` to be set) - includes new `fileinput-rtl.css` (to be loaded after `fileinput.css` for RTL styling).
- (enh #973): Add SCSS image path variable and file-image alt style updates.

## version 4.4.1

**Date:** 25-May-2017

- (enh #980): Add new method `getFrames` to get all thumbnail frames as jQuery objects.
- (enh #979): Add new method `getExif` to retrieve exif data for a selected jpeg image.
- (enh #978, #974): Implement exif restoration for resized images via [`piexif` plugin](https://github.com/hMatoba/piexifjs).
- (enh #968): Update Turkish Translations.
- (enh #967): Correct file caption display for ajax upload mode when `showPreview` is `false`.

## version 4.4.0

**Date:** 13-May-2017

- (enh #966): Add Estonian Translations.
- (enh #965): New `required` and `msgFileRequired` properties.
- (bug #958): Create `setTokens` string helper for easier replacement of tokens.
- (bug #956): Correct initial preview file thumb deletions.
- (bug #955): Remove unnecessary `sourceMappingUrl` in `purify.min.js`.
- (enh #954): Add minified theme assets.
- (enh #952): Auto orientation of image based on EXIF data (new property `autoOrientImage`).
- (enh #950, #930): Add responsive support for Krajee Explorer theme for mobile devices.
- (enh #949): Sortable plugin enhancements and prevent scroll when dragging on mobile devices.
- Chronological ordering of issues for change log.
- (enh #947): Correct `showDelete` validation in `fileActionSettings`.
- (enh #946): Enhance iconic preview validation to ignore extension case if possible.
- (enh #944): Publish v4.3.9 release to NPM.
- (enh #942): Enhance indicator and drag templates. New layout template `indicator`.
- (enh #941): Correct `data-fileindex` validation.
- (bug #940): Correct validation of `initialPreviewShowDelete`.
- (enh #936): Enhance custom validation when ajax abort is triggered via event manipulation.
- (enh #934): Update Russian translations.
- (enh #929): Add Norwegian translations.
- (enh #926): Add Galician translations and update Spanish translations.
- (enh #924): Update Farsi Translations.
- (enh #921): Enhance zoom preview slide-show to show loading indicator during image change.
- (enh #920): Cancel ajax abort action more correctly.
- (bug #919): Fix resize validation.
- Parse all numeric properties correctly.
- (enh #915): Update default styling for zoom preview for object.
- (enh #910): New property `resizeIfMoreThan` to control image resize conditionally.
- (bug #899): Fix multiple file selection for non-ajax scenario.
- (enh #477): Enhance and correct IE10 fileinput click misbehavior.

## version 4.3.9

**Date:** 02-Apr-2017

- (enh #914): Update Portuguese BR translations.
- (enh #913): Better id parsing and resetting of uploaded file thumbnails.
- Enhance zoom preview styling for Krajee Explorer theme.
- More correct validation of `allowedFileTypes` to accept null values.
- (enh #909): Update German Translations.
- (enh #906): Add Swedish Translations.
- (enh #905): Prevent duplicate files to be dragged and dropped.
- (enh #902): Enhance zoom preview styling for large height images.
- (bug #900): Correct `overwriteInitial` validation for async batch uploads returning dynamic initial preview post upload.
- (enh #898): New plugin method to get files in preview and config.
- (enh #894, #895): Correct file size validation for empty files.
- (bug #893): Correct `file-success-remove` event handling.
- (bug #890): Fix doubling of images for async bulk uploads when initial preview is returned via ajax response.
- Enhance uploaded thumb frames to not reset or change the frame identifier after successful upload.
- (enh #887): New properties `msgUploadBegin` and `msgUploadEnd` to display a better progress status. The `layoutTemplates.progress` will support a new token `{status}`.
- Enhance events like `fileclear` and `filepreajax` to be aborted via `event.preventDefault()`.
- (enh #886): Append zoom modal dialog to `body` element if available to avoid multiple BS modals conflict. 
- (bug #885): Correct validation for `allowedFileTypes`. 
- (enh #875): Reset form based events more correctly to allow multiple bootstrap file inputs within forms.
- (bug #882): Correct image resize validation.
- (enh #881): Update Spanish Translations.
- (enh #863): New plugin method `zoom` with parameter `frameId` to allow custom triggering of zoomed preview for each thumbnail frame.

## version 4.3.8

**Date:** 21-Feb-2017

- (enh #879): Update Russian Translations.
- (enh #876): Update Spanish Translations.
- (enh #874): Enhance/Standardize CSS Styles for Krajee Default Theme.
- (bug #872): Correct typo in `bootstrap.min.css`.
- (bug #870): Correct config.width parsing.

## version 4.3.7

**Date:** 11-Feb-2017

- (enh #862): Launch a brand new Krajee theme: `explorer`.
- (enh #861): New properties within `layoutTemplates`.
- (enh #860): Initialize template defaults in a better manner.
- (enh #859): Enhance and revamp preview caching.
- (enh #858): Thumb Frame CSS class as configurable property.
- (enh #857): Default error handling for unknown ajax errors.
- (enh #854): Better file size calculation and display.
- (bug #852): Ensure `frameClass` setting in `initialPreviewConfig` is considered. 
- (enh #851): Create Kazakh Translations. 
- (enh #847): Update German Translations. 
- (enh #662, #725): Enhance preview modal to be appended to body before each zoom action (if `body` tag exists). 
- (enh #844): Display zoom preview navigation buttons only when multiple files exist.
- (bug #839): Correct `initialPreview` generation and sortable behavior for async uploads.
- (enh #837): Update Czech Translations.
- (enh #835): Update Polish Translations.
- (bug #834): Correct clearing of file preview including zoom cache.
- (bug #833): Correct validation and defaults init for `allowedPreviewTypes`.
- (enh #831): Update Finnish Translations.
- (enh #828): Allow drag sort of single uploaded thumbnails with `initialPreview` config set (post upload).
- (bug #826): Extend language configuration to consider defaults.
- (bug #825): Correct `fileimagesresized` event triggering.
- (enh #824): Add Korean Translations.
- (enh #823): Correct file indices assignment during validation of images.
- (enh #822): Enhancement for preventing upload when data is empty. New property `msgUploadEmpty` has been incorporated.
- (enh #820): Prevent resize if image is smaller than allowed dimensions.
- (bug #819): Correct init preview auto replace post `uploadSingle` action in thumbnails.
- (enh #816): New property `msgFileTypes` to control descriptions/localizations of file types displayed.
- (enh #815): Enhance parsing of thumbnails that are visible in preview (will allow plugin to be 
   initialized in hidden containers like tabs).
- (enh #812): Update Greek Translations.

## version 4.3.6

**Date:** 17-Dec-2016

- (enh #809): Various enhancements for preview control and iconic thumbnails.
    - add ability to control and render different previews for file thumbnails and zoomed preview content
    - new property `preferIconicPreview` will try to parse the `previewFileIconSettings` and `previewFileExtSettings` to automatically force iconic previews for file thumbnails.
    - new property `preferIconicZoomPreview` will try to parse the `previewFileIconSettings` and `previewFileExtSettings` to automatically force iconic previews in the zoomed content.
    - the above properties will be applied and parsed for `initialPreview` content as well.
- (enh #804): Add Slovenian Translations.
- (enh #803): Update Hungarian Translations.
- (enh #802): Allow MOV files preview for supported devices and browsers.
- (enh #800): Update Spanish Translations.
- (enh #799): Fix IE memory issue on image load.
- (enh #791): Auto orientation of images based on EXIF data.
- (enh #788): New validation for minimum file size:
   - new property `minFileSize` which validates the minimum file size in KB for upload, else throws
     a validation error using `msgSizeTooSmall`. This defaults to `0`.
   - if `minFileSize` is set to `null`, then above validation is skipped and no minimum file size 
     check is performed.
- (enh #782): New validation for invalid slug file name (caption):
   - if slug callback returns an empty string, then an error will be thrown using `msgInvalidFileName`.
   - if slug callback returns `false` then the next file will be read and current file skipped.
- (enh #779, #789): More correct thumbnail identification post rearrange.
- (enh #769, #785, #786, #787): Better image resized event handling.
- (enh #771): Update Chinese Translations.
- (enh #764): Update Russian Translations.
- (enh #696): Better default preview zoom settings.

## version 4.3.5

**Date:** 20-Sep-2016

- (bug #758): Correct file slug name parsing for an invalid file extension.
- (bug #753): Correct IE11 file clear bug when using without ajax.
- (enh #745): Update Russian Translations.
- (enh #741): Update Vietnamese Translations.
- (enh #736): Update Portugese Brazilian Translations.
- (bug #734): Correct right parsing of `fileuploaded` event params.

## version 4.3.4

**Date:** 07-Aug-2016

- (enh #731): New method `getFilesCount` for returning upl + non-upl files count.
- (enh #730): Correct Romanian Translations.
- (enh #729): Implement `progressUploadThreshold` to show processing when waiting for server response.
- (enh #728): Change sortable plugin name to avoid conflict with JUI Sortable.
- (bug #722): Correctly concat ajax output in initial preview.
- (enh #721): Update Turkish Translations.
- (enh #719): Pass right `previewId` to `fileuploaded` event.
- (enh #718): Update Japanese Translations.
- (enh #715): Reset caption correctly on clear.
- Add contribution templates.
- (bug #710): Fix bug for `ifSet` validation.

## version 4.3.3

**Date:** 09-Jul-2016

- (enh #706): Remove invalid files from filestack correctly for validation errors.
- (enh #704): Add grammatically correct "No files selected" message.
- (enh #702): Add files to stack correctly for max & min preview size validation.
- (bug #700): Fix custom preview icons to be displayed and validated correctly.
- (enh #698): Re-enable drag and drop support for IE Edge.
- (enh #695): Update Spanish Translations.
- (enh #680): Populate filestack for files greater than maxFilePreviewSize.

## version 4.3.2

**Date:** 11-Jun-2016

- (enh #674): Organize all themes in a separate `themes` folder.
- (enh #666): Update sortable draggable selector.
- (enh #655): Include sass styling configuration.
- (enh #654): Update Spanish Translations.
- (enh #650, #676): Ability to configure browse button display and file select via zone click.
    - New boolean property `showBrowse` that allows you to control the display of the browse button
    - New boolean property `browseOnZoneClick` that allows you to select a file:
         - **for ajax uploads** - by clicking on the preview drag/drop zone 
         - **for form based/non-ajax uploads** - by setting `defaultPreviewContent` and that will be clickable to browse files
    - New string message property `dropZoneClickTitle` that will be appended to the `dragZoneTitle` for ajax uploads when `browseOnZoneClick` is `true`.
    - New template `actionDrag` will be available within `layoutTemplates` to configure your drag indicator markup.
- (enh #647): Display file size in previews and templates.
- Enhancements to file preview icons (`other` template).
- Simpler naming for files in locales and themes folders.
- (enh #643):Implement rearranging / sorting functionality for initial preview. 
    - Add ability to rearrange and sort thumbnails by drag & drop. This feature will use the [Sortable plugin](https://github.com/RubaXa/Sortable) which will be included in the `js/plugins` folder.
    - This feature will be available only for **initial preview thumbnails** for both ajax and form uploads.
    - New property for drag indicator and drag behavior configurations will be included in `fileActionSettings`:
        - `showDrag`
        - `dragIcon`
        - `dragClass`
        - `dragTitle`
        - `dragSettings`
- (enh #642): Reorganize JS code into proper folders. Following folders will be added/maintained
    - `locales`: all translation JS files will be located here
    - `themes`: all theme JS files will be located here
    - `plugins`: third party JS plugins that will be used to work with bootstrap-fileinput
- (enh #641): Wrap readFile(index + 1) in a function to prevent 'unsafe-eval' blocking with CSP.
- (enh #640): Ability to theme and provide font awesome theme. New property `theme` added.
- (enh #639): Add ability to just require package in nodejs
- (enh #636): File action enhancements.
    - Zoom and Drag buttons will be shown as an additional file action buttons in addition to `upload` and `remove`
    - New boolean properties `showZoom`, `showDrag`, `showRemove`, `showUpload` are now added to `fileActionSettings` to control display of these buttons
    - New properties `zoomIcon`, `zoomClass`, `zoomTitle` are available within `fileActionSettings` for controlling the zoom button styles and display.
    - New properties `dragIcon`, `dragClass`, `dragTitle` are available within `fileActionSettings` for controlling the drag indicator styles and display.
    - New properties `actionZoom` and `actionDrag` are available within `layoutTemplates` to configure the markup of the zoom and drag buttons.
- (enh #635): Various preview enhancements. Previews will be revamped with various functionality:
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
- (enh #634): Enhance ability for PDF and HTML preview.
    - Enhanced PDF support as PDF embedding is now possible for `initialPreview`. In addition a new template for PDF is available within `previewTemplates`.
    - HTML Preview is enhanced with a better template. The plugin also now includes support for `DOMPurify` plugin (and available in plugins folder). This processes and cleans the HTML from XSS before previewing. This behavior can be controlled via `purifyHtml` property that defaults to `true`.
- (enh #633): New property `maxFilePreviewSize` to control preview of large size files.
- (enh #632): Find correct filename in IE9.
- (enh #618): Update German Translations.
- (enh #615): Correct Finnish Localizations.
- (enh #605): Fixed previewCache tags reset.
- (enh #604): Fixed unset method in deleting previewCache index.
- (enh #600): Synchronize latest package on NuGet.
- (bug #595): Correct initialization of `allowedPreviewTypes`.

## version 4.3.1

**Date:** 28-Feb-2016

- (bug #577): Better label spacing for default browse icon.
- (bug #576): Correct previewCache initialization.
- (enh #575): Implement public method chaining and update docs for methods.
- (enh #574): Change naming convention for private / internal methods. Prepend internal plugin methods with underscore `_`.
- (enh #573): Update package.json to include `peerDependencies`.
- (enh #572): Add Finnish Translations.
- (enh #567): New properties and improved messages.
- (enh #565): Enhance progress bar display when upload is aborted or cancelled.
- (enh #560): Update French Translations.
- (enh #559): Allow custom error display styles (e.g. via bootstrap dialog) through these changes:
    - added `msg` param in `fileerror`, `fileuploaderror`, and `filefoldererror` events.
- (enh #557): Enhance default file type parsing to intelligently not render unpreviewable content.
- (enh #555): Set default value for `removeFromPreviewOnError` to `false`.
- (enh #554): Update documentation and demos to include `webkitdirectory` for upload.
- (enh #514): Set default value for `removeFromPreviewOnError` to `false`.

## version 4.3.0

**Date:** 25-Jan-2016

- (enh #550): Correct Drag and drop issue with v4.2.9.

## version 4.2.9

**Date:** 22-Jan-2016

- (enh #545): Refactor code to deep extend options correctly.
- (enh #541): Improve default slug callback to accept most characters.
- (enh #534, enh #535): Ability to remove errored file thumbnails via `removeFromPreviewOnError`.
- (enh #531): Enhance/Fix typos of Arabic translation.
- (enh #530): Error alert box and preview thumbnail styling enhancements.
- (enh #523): Add new branch `sass` for `bootstrap-sass-official` support.
- (enh #521): Update Dutch Translations.
- (enh #489): Update documentation for `change` and `fileselect` events.

## version 4.2.8

**Date:** 18-Nov-2015

- (enh #494): Add Indonesian translations.
- (enh #490): Fix `zh-TW` translation `browseLabel` wording.
- (enh #488): Publish to npm.
- (bug #483): Clear and reset native input after uploading each single file thumbnail.
- (enh #481): Universal Module Definition for use with CommonJS, AMD or browser globals.
- (enh #474): Upload via button within each preview thumbnail skips last file for async uploads.
- (enh #477): Fix IE10 specific styling bug for file input block button.
- (enh #465): Add Català translations.
- (enh #462): Responsive buttons and new property `buttonLabelClass`.
- (enh #460): Update CSS selectors prefix to start with `file`.
- (enh #454): Update Turkish Translations.
- (enh #449): Add Arabic Translations.
- Implement package.json.
- Update bootstrap bower version to support only 3.x variants.

## version 4.2.7

**Date**: 13-Sep-2015

- (bug #442); Enhance the filenames parsing in the filestack and slug conversion.
- (enh #437): New property `defaultPreviewContent` to control a default preview.
- (enh #436): New property `showClose` and new layout template `close` to control close icon display.
- (enh #434): Added Japanese translations.
- (enh #433): Added new events for image handling.
    - `fileimageloaded` (fires after each image is loaded in preview) - this is an existing event
    - `fileimagesloaded` (fires after all images are loaded in preview)
    - `fileimageresized` (fires after each image in preview is resized)
    - `fileimagesresized` (fires after all images in preview are resized)
    - `fileimageresizeerror` (fires when any image resize error is faced)
- (enh #432): Send slugged file names with the file blob when uploading via ajax.
- (enh #431): Add Danish locale translations.
- (bug #429): Fix for MS Edge bug that does not support drag and drop.
- (enh #428): Enhancements to asynchronous uploads when `showPreview` is `false`.
- (enh #427): Add image resizing capability before upload.
- (bug #420): Revamp file status progress and positioning updates for asynchronous upload.

## version 4.2.6

**Date**: 26-Aug-2015

- (enh #426): Enhancements to progress bar and display thumbnail specific progress.
- (enh #413): Various updates to translations.
- (enh #412): Enhancements to file upload cancellation.
- (enh #410): Better validation for IE 10 and below.
- (enh #405): Create traditional Chinese translations.
- (enh #401): Various enhancements to preview file thumbnails and error validations.
- (bug #398): Validate `data.errorkeys` more correctly.
- (enh #393): Minor enhancements to abort events before upload.
- (enh #392): Enhancements to allow using plugin functions directly.
- (enh #391): Thumbnail styling enhancements for flash, html, and object types.
- (enh #390): Thumbnail error display enhancements.
- (enh #389): New templates and styling enhancements to caption and main buttons.
- (enh #387): Reset `initialCaption` better when preview is cleared.
- (enh #385): Updated Russian & Ukranian translations.
- (enh #382): Better implementation for parsing text in `parseError` method.
- Update translations to include `fileActionSettings`.
- (enh #380, #381): Consistent styling for thumbnails.
- (enh #379): Combine more translatable settings and update locale js files.
- (enh #378): Ability to configure different icon thumbnails for preview files.
- (enh #377): Various enhancements to text preview.
- (enh #373): Default delete ajax request type to POST (instead of DELETE).

## version 4.2.5

**Date**: 27-Jul-2015

- (enh #372): Create new event `filepreajax`.
- (enh #371): Ability to replace files in the preview. New `autoReplace` property.
- (bug #370): Reverts #342 with better fix.
- (enh #362): Add Bulgarian translations.

## version 4.2.4

**Date**: 22-Jul-2015

- (enh #358): Implement event namespaces and enhance event handling process.
- (enh #357): Enhanced and better `refresh` method.
- (enh #356): Implement `destroy` method.
- (enh #351): Updates to Ukranian & Russian translations.
- (enh #342): Add ability to modify extra data before ajax upload in `beforeSend` events.
- (enh #340): Receive `previewId` and `index` in extra data for individual thumbnail uploads (ajax).

## version 4.2.3

**Date**: 21-Jun-2015

- (enh #336): Fixes to reset preview via `initUploadSuccess`.

## version 4.2.2

**Date**: 18-Jun-2015

- (enh #332): Bump nuget and bower package versions.

## version 4.2.1

**Date**: 15-Jun-2015

- (enh #330): Minor enhancements in validating preview and progress bar display.
- (enh #329): Message translation updates.
- (bug #328): Implement image dimension validations.
    - New properties added to the plugin:
        - `minImageWidth`
        - `minImageHeight`
        - `maxImageWidth`
        - `maxImageHeight`
        - `msgImageWidthSmall`
        - `msgImageHeightSmall`
        - `msgImageWidthLarge`
        - `msgImageHeightLarge`
- (bug #327): More correct clearing of preview.
- (bug #315): Fix parsing of preview settings for default (other) preview.
- (bug #310): Set missing caption icon on error.
- (enh #309): Fixes for older browsers.
- (enh #308): Better check for `data.error` being empty.
- (enh #307): Allow setting thumbnail frame css class and attributes via `initialPreviewConfig`.
- (enh #305): Implement better cleanup of memory with `revokeObjectURL`.
- (enh #303): Validate only files to be dragged and dropped.
- (enh #302): Add Greek (el) translations.
- (enh #299): Enhancements for displaying uploaded file thumbnails.
    - New property `showUploadedThumbs` that will display uploaded thumbnails until the remove/clear button is explicitly pressed.
    - New event `filesuccessremove`. This will be triggered on removing the uploaded thumbnail using the thumbnail delete button. The event shares the following parameters:
        - `id`: the HTML id attribute of the thumbnail container 
      The `event` can be set to return `false` to abort the thumbnail removal.
- (enh #297): Add Romanian translations.
- (enh #296): Fixed license identifiers in bower.json and composer.json.
- (bug #295): Validate `overwriteInitial` correctly for ajax uploads.
- (enh #287): Add Brazilian Portugese (pt-BR) translations.
- (enh #279, #280): Fixed error for failed response types.

## version 4.2.0

**Date**: 11-May-2015

- (enh #277): New `language` property to allow configuring multi lang widgets on same page.
- (enh #275): Add Czech & Slovakian translations.

## version 4.1.9

**Date**: 02-May-2015

- (bug #273): Reset caption correctly after all initial preview is deleted.
- (enh #271): Add Dutch translations.
- (enh #270): Add Portugese translations.
- (enh #269, #272): Add Turkish translations.
- (enh #264): Validate input type of file before initializing plugin.
- (enh #263): Enhance parsing of file preview thumbnails and actions.
- (enh #259): Add Polish translations.
- (enh #258): Enhance messages to include file plural and single.
- (bug #257): Fix upload single to replace thumbs correctly.
- (bug #253): Fix initial preview delete cache initialization.
- (enh #252): Enhance async batch completion.
- (enh #251): Add Italian localizations.
- (enh #250): Change default slug routine to allow umlauts in filenames.
- (bug #249): Fix error message content display.
- (enh #248): keep chinese characters in file caption.
- (bug #247): Correct mime types validation.
- (enh #245): Allow initial caption to be set without initial preview.
- (enh #244): Add Serbian translations.
- (bug #243): Correct sending of `deleteExtraData`.
- (enh #241): Enhancements to initial preview delete to perform validations before delete.
- (bug #238): Correct initialization of plugin variables when other than maxFileCount & maxFileSize.
- (enh #237): Better styling of file caption icon.
- (enh #232): Update docs to reflect updated bootstrap CDN domain.

## version 4.1.8

**Date**: 30-Mar-2015

- (enh #230): More correct initial preview delete reset.
- (enh #229): Created French translations.
- (enh #228): Created Thai translations.
- (enh #227): Created Ukranian translations and updated Russian translations.
- (enh #226): Create Spanish (Latin American) translations.
- (enh #225): Create Russian translations.
- (enh #222): Enhance to include dynamically replaceable thumbnail tags. Two new properties `previewThumbTags` and `initialPreviewThumbTags` will be available for configuration.
- (enh #218): Do not clear preview for ajaxuploads until remove button clicked.
- (enh #217): Ensure `filebatchselected` event is triggered after FileReader completes reading files selected.
- (enh #216): Add Hungarian Translations.
- (enh #215): Set default delete method REST compliant.
- (enh #213): Code cleanup, eliminate change event on clear and properly reset preview cache after ajax deletes.
- (enh #212): Revamp preview to use a new preview caching object.
- (enh #211): Add ability to show detailed server error stack via `showAjaxErrorDetails`.
- (enh #209): Better validation for folder drag and drop and auto-skip any dropped folders. New property `msgFoldersNotAllowed` added to the plugin to allow configuring the message shown. The event `filefoldererror` is triggered when a folder is dragged.
- (enh #206): Ability to add custom validation and trigger custom error to abort upload.
    - This enhancement will enable you to add your additional custom validations to enhance the fileinput to be used for innumerous scenarios. It will allow an ability to return an associative object with any of the fileinput events (except the error events and the `filebatchuploadsuccess` or `filebatchuploadcomplete`) e.g. `change`, `fileselect`, `filepreupload`, `filebatchpreupload` etc. The object can return the following keys:
        - `message`: _string_, the validation error message to be displayed before upload. If this is set the plugin will automatically abort the upload whenever called and display this as an error message. You can use this property for example to read a file and perform your own custom validation.
        - `data`: _object_, an optional associative array of additional data that you can pass for usage later. 
    - You can get this data by reading `abortData` in the parameters for the new `filecustomerror` event. This new event will be triggered during upload, when  you have triggered an abort from any of the other events.
- (enh #205): Allow to auto set initialPreview within `filebatchuploadcomplete` & `filebatchuploadsuccess`.
    - Allows you to auto define the `initialPreview` and  `initialPreviewConfig` after an ajax upload by returning these within the data object from your ajax response on `fileuploaded` & `filebatchuploadsuccess`.  
- (enh #204): New properties `fileMinCount` and `msgFilesTooLess` (useful to make file input mandatory).
    - The `fileMinCount` property will allow to set the minimum file count needed before triggering upload. It will work for both `ajax` uploads and `normal form based submission`.
    - This will enable you to set the file input to be a mandatory / required input. (e.g. `fileMinCount` = `1`). The `msgFilesTooLess` will be displayed and error raised.
    - If `fileMinCount` is set to `0` it will be treated as files are optional and no error will be triggered.
- (enh #203): Enhancements and revamp of all error events.
    - fileerror
    - fileuploaderror
    - filebatchuploaderror
    - filedeleteerror
    - filefoldererror (new event - see #209)
    - filecustomerror (new event - see #206)
- (enh #202): Ability to add Translations / Locales.
    - Identify and group all messages that need to be translated configurable via `$.fn.fileinput.locales['<lang-code>']`
    - Set default english messages configuration `$.fn.fileinput.locales['en']` within the plugin core code
    - Individual locale files need to be created as separate js files e.g. `<lang>.js`
- (bug #193): Better validation for triggering `filebatchuploadcomplete` on async batch upload completion.
- (enh #192): Ability to extend and add one's own ajax settings.
    - New property `ajaxDeleteSettings` to help extend and add to delete ajax settings. 
    - `ajaxSettings` to help extend and add upload ajax settings
- (enh #189): Reinitialize initial preview delete events correctly on file selection.
- (enh #188): Clear fileinput more correctly for all browsers when initialPreview is set enhancement
- (enh #187): New property `previewFileIcon` to configure file icon shown in preview for unreadable file types.
- (enh #184): Fix documentation for filedeleted event.
- (enh #183): Delete extra data enhancements.
- (enh #181): Fix change event triggered for IE 11 when file input is set to empty.
- (enh #179): Validate and cast `maxFileSize` and `maxFileCount` to numeric - even if they have been setup as a string.
- (enh #178): Updated README for cancel button configuration.
- (enh #177): Trigger filebatchpreupload if showPreview is `false`.
- (enh #176): Wrong file in README installation steps fixed.
- (enh #175): Ability to override delete extra data in `initialPreviewConfig`.
- (enh #174): New `deleteUrl` property.
- (enh #167, #173): New `deleteExtraData` property for ajax deletions.
- (bug #171): Fix typo for files validation.

## version 4.1.7

**Date**: 13-Feb-2015

- Relocate sample files from examples directory to [bootstrap-fileinput-samples](https://github.com/kartik-v/bootstrap-fileinput-samples) repo.
- Set copyright year to current.
- (enh #162): New property ajaxSettings to allow configuring ajax params.
- (bug #160): Correct documentation typo for usage.
- (bug #159): Ensure filestack is passed correctly with `outData` for events.
- (enh #157): Upload progress bar styling enhancements.
    - Allow upload progress bar css class to be configurable 
    - Create and allow two different styles/css classes for progress bar
       - `progressClass`: styling for progress bar when upload is in process
       - `progressCompleteClass`: styling for progress bar when upload is complete
- (enh #156): Fix reset of file stack for various upload modes (single, batch async and batch sync).
- (enh #155): Allow display of long file names without spaces/word breaks.
- (enh #154): Code cleanup and restructure for JS lint changes (using JSHint Code cleanup library).
- (enh #153): Improve error handler for trapping FileReader security exceptions and new property `msgFileSecured` will display the security exception message.
- (enh #152): New faster `replaceAll` method instead of regexp parsing to replace tags in templates.
- (enh #151): New `filebatchselected` event triggered after every batch of files are selected.
- (enh #149): Custom tags support for layoutTemplates and previewTemplates (new properties `customLayoutTags` and `customPreviewTags` included).

## version 4.1.6

**Date:** 20-Jan-2015

- (enh #139): Reset file stack correctly on ajax upload completion.
- (enh #137): Trigger new events - `filedisabled` and `fileenabled`.
- (enh #136):Create new upload method that can be called externally.
- (enh #131): Allow empty values in extra data to be submitted.

## version 4.1.5

**Date:** 12-Jan-2015

- (enh #121): Animate progress bars by default for upload progress.
- (bug #120): Correct multiple iterations of upload for async batch uploads.
- (enh #119): Enhance caption to include ellipsis for long file names
- (enh #116): Hide remove and upload buttons until unless file(s) are selected.
- (enh #115): Autosize file caption responsively on window resize.
- (bug #114): Prevent multiple file selection when using single file configuration.
- (bug #113): Icon layout template undefined when using user template.
- (bug #112): Fix undefined filestack for individual file upload within preview.
- (enh #108): Add nuget package.
- (enh #106): Enhance events for ajax requests and enable cancelling sync uploads
- (enh #105): Expose current jqXHR object on ajax events.
- (bug #104): Fix formdata not defined.
- (bug #100, #101): Set right params for error thrown during reading of files.

## version 4.1.4

**Date:** 26-Dec-2014

- (bug #97): Reset events correctly with plugin refresh method.
- (bug #95): Correct event off for drag & drop in plugin refresh method.
- Code cleanup with reusable methods for event raising and outData generation.
- (enh #93): Better styling of file upload icon indicators in thumbnails.
- (enh #92): Realign event triggering timing for batch uploads to ensure outData is available.
- (enh #91): Pass FileReader instance with outData in events.
- (enh #90): New event `filebatchpreupload` for both synchronous and asynchronous batch uploads.
- (enh #89): New `otherActionButtons` to allow adding customized initial preview content actions.
- (enh #88): Allow uploadExtraData to be passed as a callback.

## version 4.1.3

**Date:** 20-Dec-2014

- (enh #87): More correct progress indicator percentage for asynchronous upload.
    - `filepreupload`
    - `fileuploaded`
    - `fileuploaderror`
    - `filebatchuploaderror`
    - `filebatchuploadsuccess`
    - `filebatchuploadcomplete`
- (enh #86): Disable thumbnail action buttons when upload is in progress.
- (enh #85): Combine output data as a single object, that is sent for various file upload events. 

## version 4.1.2

**Date:** 19-Dec-2014

- (enh #81): Add new events:
    - `filebatchuploadsuccess`
    - `filebatchuploadcomplete` 
- (enh #80): Allow access to `uploadExtraData` and `responseData` to following events
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

- (bug #78): Set uploadExtraData parameters to be correctly sent via POST.
- (bug #76): Update filestack when `showPreview` is false.
- (enh #58): Set a new property `textEncoding` for reading the text files with right encoding.

## version 4.1.0

**Date:** 17-Dec-2014

- (enh #75): Better validation of browser support for drag and drop.
- (enh #74): Enhancements to file validation errors for both FORM and AJAX uploads.
    - For normal Form based uploads automatically disable the Upload button
    - Display a separate error styled thumbnail for the file that faced the validation error.
    - Reset errors correctly to overwrite files with a new change or drag/drop

## version 4.0.0

**Date:** 14-Dec-2014

- (bug #72): Fix bootstrap ## version constraint.
- Renamed `initialDelimiter` to `initialPreviewDelimiter`
- (enh #70): Version 4.0 enhancements.

### Version 4.0 Features

- Add functionality for AJAX based UPLOAD using HTML5 FormData (most modern browsers support it). Will degrade to normal Form Based File submission if this is not supported.
- To use AJAX Upload, the `uploadUrl` property is MANDATORY and must be set.
- Enhance plugin to now allow files to be added, appended, removed (based on FEEDBACK from many). Thus one can append files to preview.
- New DRAG & DROP zone available in preview to drag and drop files and append.
- Delete or upload files one by one OR in batch.
- If `showPreview` is set to false, or uploadUrl is not supported plugin will degrade to normal form based upload.
- Configurable indicators for file awaiting upload, file successfully uploaded, files errored in upload.
- Ability to add extra form data with ajax based uploads.
- Upload progress bar and individual thumbnail upload indicators.
- Ability to cancel and abort ongoing AJAX uploads.
- Templates have been revamped and enhanced for each file type.
- Ensure plugin is still lean in size and optimized for performance inspite of the above features by optimally utilizing HTML5 & jquery features only.

### New properties added

- `showCancel`: shows a cancel button for aborting ajax uploads (defaults to `true`).
- `cancelLabel`: label for the cancel button.
- `cancelTitle`: title for the cancel button on hover.
- `cancelIcon`: icon markup for the cancel button
- `cancelClass`: CSS class for the cancel button.
- `removeTitle`: title for the remove button on hover.
- `uploadTitle`: title for the upload button on hover.
- `uploadUrl`: the url that will be used to process AJAX based uploads (using FormData XHR2).
- `uploadExtraData`: extra data that will be passed as data to the url/AJAX server call via POST
- `uploadAsync`: whether the batch upload of multiple files will be asynchronous/in parallel. Defaults to `true`.
- `initialPreviewShowDelete`:  shows a delete button for each initial preview content's thumbnail (defaults to `true`).
- `initialPreviewConfig`: configuration for setting up each `initialPreviewContent` item (associative array/object)
    - `caption`: The caption or filename to display for each initial preview item content.
    - `width`: The CSS width of the image/content displayed.
    - `url`: The URL for deleting the image/content via AJAX (shown only for `initialPreviewContent`).
    - `key`: The key that will be passed to the URL via POST (shown only for `initialPreviewContent`).
- `dropZoneEnabled`: Enable a drag and drop zone for dragging files and is available only for ajax based uploads (defaults to `true`). 
- `dropZoneTitle`: Title to be displayed in the drag & drop zone. 
- `dropZoneTitleClass`: CSS class for the drag & drop zone title.
- `fileActionSettings`: configuration for setting up actions for newly selected file thumbnails in the preview (associative array/object)
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

- (bug #68): Fix refresh method of the fileinput to trigger change correctly.
- (enh #67): Enhance support for IE browsers
    - Add specific validations for parsing IE versions rightly
    - Enhance plugin to extend styling support to IE 9 (with the limitation that IE 9 does not support HTML 5 features like multiple file upload)
    - Fix clearing of file input rightly for IE 9 & IE 10
    - Degrade plugin automatically to a native file input for older IE versions
    - Prevent change method firing twice when file is cleared after error is encountered in IE 11.
- (enh #65): Correct validation of `refreshPreview` using `updateFileDetails`.
- (enh #64): Add ability to override the slug method with a `slugCallback` property.
- (bug #61): Refresh preview to show errors correctly after each file is validated.
- (enh #60): Enhance upload button for disable/enable when used with `<a>` tag.

## version 2.9.0

**Date:** 23-Nov-2014

- (enh #56): Trigger new events `filebrowse` and `fileselectnone`.
- (enh #55): Clear the files when file browse dialog is cancelled only if the browser clears the native file input.
- (enh #53): Validations and events for right reset of files when browse button is clicked.

## version 2.8.0

**Date:** 13-Nov-2014

- (enh #52): Raise new `fileimageloaded` event.
- (enh #51): Autosize preview images when they exceed the size of the preview container.
- (enh #50): Dynamically auto size file captions for long file names exceeding container width. New property `autoFitCaption` 
   is added which defaults to `true`. When this is `true` the plugin will auto fit caption text within the container dynamically
   and responsively based on window size.

## version 2.7.0

**Date:** 11-Nov-2014

- (enh #49): Set image preview dimensions to auto fit and center
- (enh #48): Trigger `fileloaded` event when `showPreview` is `false`.
- Set release to stable in composer.json.

## version 2.6.0

**Date:** 15-Oct-2014

- (bug #44): Browser IE10 hangs on file clear.
- (bug #43): Validate special characters in filename before generating caption.
- (enh #42): Enhance plugin to configure the `elErrorContainer` for displaying validation errors.
- Templatize errorContainer for display within the preview window.
- (bug #40): More correct fix for IE (ver < 11) inability to clear fileinput values.

## version 2.5.0

**Date:** 09-Oct-2014

- (bug #40): Fix IE (ver < 11) inability to clear fileinput values.
- (bug #39): HTML encode caption hover title.
- (enh #38): Highlight error CSS in file caption on validation error.
- (bug #37): HTML encode text content for preview in modal.
- (enh #36): New feature. Validation routine for checking allowed file types and extensions.

## version 2.4.0

**Date:** 20-Sep-2014

- (enh #33): Better text format validation and correct modal preview.
- (enh #32): Added checks for file api support.
- (enh #31): Better control and configuration of preview templates.
- (enh #30): Enhanced generic support for more preview formats (audio, video, html, flash, and other objects).

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

- Better replacement of tags in templates. Replaces all tag occurences with this new release.
- (enh #28, #29): Added support for previewing flash and video files.

## version 2.2.0

**Date:** 19-Aug-2014

- (enh #25): Graceful degrade to normal file input for older browsers (including previous versions of Safari).
- (enh #24): Update readAsBinaryString to readAsArrayBuffer

## version 2.1.0

**Date:** 11-Aug-2014

- Other minor bug fixes.
- (enh #22): Enhance file caption message display for validation errors.
- (enh #21): Enhance loading progress message and message templates for multiple file uploads.
- (enh #21): Enhance multiple file upload and preview performance using setTimeout.
- (enh #20): Fix `fileloaded` event to increment `previewId` and enhance to return file index.
- (enh #19): Synchronize preview with file browse dialog behavior, when cancel button is pressed in file dialog window.
- (enh #18): Better validation for older browsers (not supporting HTML5) to degrade to normal file input.
- Enhanced plugin to improve browser performance when loading and previewing multiple image files.
- New configurable error messages added: `msgFilesTooMany`, `msgFileNotFound`, `msgFileNotReadable`, `msgFilePreviewAborted`, and `msgFilePreviewError`.
- New configuration property added: `maxFilesCount`. Defaults to `0` which means unlimited.
- (enh #16, #17): Added exception handling for trapping FileReader API errors

## version 2.0.0

**Date:** 25-Jul-2014

- Added delimiter option for `initialPreview` to pass multiple content delimited as a string.
- Automatic scale images for preview, when images are too wide to fit in container.
- Correct calculation of files selected when `initPreview` is false.
- Make caption text configurable through a new parameter `msgSelected`.
- Enhanced configurable templates for previewing image, text, and other files (and a generic template).
- New plugin methods added: `disable`, `enable`
- New plugin events added: `fileerror`, `fileloaded`, `filecleared`.
- (enh #15): Enhanced validation of file size through `maxFileSize` configuration.
- (enh #12, #13, #14): Various enhancements and fixes.

## version 1.9.0

**Date:** 21-Jul-2014

- (enh #10): Ability to display initial caption, when initialPreview is false.
- (enh #9): Enhanced caption template and styling for captions to prevent overflow of long file names out of the caption container.

## version 1.8.0

**Date:** 15-Jul-2014

- (enh #9): Enhanced caption template and styling for captions to prevent overflow of long file names out of the caption container.

## version 1.7.0

**Date:** 02-Jul-2014

- The plugin now offers an additional `overwriteInitial` option. This is by default set to `true`, whereby, any `initialPreview`
   content set will be overwritten, when new file is uploaded or when files are cleared. Setting it to `false` will help displaying 
   a saved image or file from database always - useful especially when using the `multiple` file upload feature.

## version 1.6.0

**Date:** 03-Jun-2014

- The plugin now offers an additional `refresh` method. This enables you to dynamically change element attributes or plugin options
   at runtime and refresh the widget.

## version 1.5.0

**Date:** 23-May-2014

- The plugin now offers an option to display initial preview of images/text/other files. This is useful
   for record update scenarios. This can be a single image/file or an array of images/files.
- Extending to the above feature, the plugin also allows you to set a preview caption for the initial preview field.
- The following element identifiers need to be passed as a string like '#id' instead of a JQuery object:
    - elCaptionContainer
    - elCaptionText
    - elPreviewContainer
    - elPreviewImage
    - elPreviewStatus

## version 1.0.0

**Date:** 01-Jan-2014 

Initial release. The following features are included in this release:

- The plugin will convert a simple HTML file input to an advanced file picker control. Will help fallback to a file input for browsers not supporting JQuery or Javascript.
- The file input consists of the following three sections with options and templates to control the display:
   - file caption section: to display a brief information of the file(s) selected
   - file action buttons section: to browse, remove, and upload files.
   - file preview section: to display the selected files on client for preview (supports images and text file types). Other file types will be displayed as normal thumbnails.
- The plugin automatically converts an input with `type = file` to an advanced file picker input if you set its `class = file`. All options to the input can be passed as HTML5 `data` attributes.
- Ability to select and preview multiple files. Uses HTML 5 File reader API to read and preview files. Displays the progress of files being being loaded onto the preview zone, in case many files are chosen.
- Offers predefined templates and CSS classes which can be changed to style your file-input display as per your needs.
- Option to show/hide any or all of the following:
   - caption section
   - preview section
   - upload button
   - remove button
- Customise the location of the target container elements to display the entire plugin, the caption container, the caption text, the preview container, preview image, and preview status.
- For text file previews, autowrap the text to the thumbnail width, and show a wrap indicator link to display complete text on hover. You can customize the wrap indicator (which defaults to &hellip;).
- Customise the messages for preview, progress, and files selected.
- Upload action defaults to form submit. Supports an upload route/server action parameter for custom ajax based upload.
- Triggers JQuery events for advanced development. Events currently available are `filereset` and `fileclear`.
- Disabled and readonly file input support.
- Size of the entire plugin is less than 11KB (about 9KB for the minified JS and 2KB for the minified CSS).
