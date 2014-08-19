version 2.2.0
=============
**Date:** 19-Aug-2014

1. (enh #24): Update readAsBinaryString to readAsArrayBuffer

version 2.1.0
=============
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

version 2.0.0
=============
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

version 1.9.0
=============
**Date:** 21-Jul-2014

1. (enh #9): Enhanced caption template and styling for captions to prevent overflow of long file names out of the caption container.
2. (enh #10): Ability to display initial caption, when initialPreview is false.

version 1.8.0
=============
**Date:** 15-Jul-2014

### Additions
1. (enh #9): Enhanced caption template and styling for captions to prevent overflow of long file names out of the caption container.

version 1.7.0
=============
**Date:** 02-Jul-2014

### Additions
1. The plugin now offers an additional `overwriteInitial` option. This is by default set to `true`, whereby, any `initialPreview`
   content set will be overwritten, when new file is uploaded or when files are cleared. Setting it to `false` will help displaying 
   a saved image or file from database always - useful especially when using the `multiple` file upload feature.

version 1.6.0
=============
**Date:** 03-Jun-2014

### Additions
1. The plugin now offers an additional `refresh` method. This enables you to dynamically change element attributes or plugin options
   at runtime and refresh the widget.

version 1.5.0
=============
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

version 1.0.0
=============
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