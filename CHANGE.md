version 2.9.1
=============
**Date:** 01-Dec-2014

1. (enh #60): Enhance upload button for disable/enable when used with `<a>` tag.


version 2.9.0
=============
**Date:** 23-Nov-2014

1. (enh #53): Validations and events for right reset of files when browse button is clicked.
2. (enh #55): Clear the files when file browse dialog is cancelled only if the browser clears the native file input.
3. (enh #56): Trigger new events `filebrowse` and `fileselectnone`.

version 2.8.0
=============
**Date:** 13-Nov-2014

1. (enh #50): Dynamically auto size file captions for long file names exceeding container width. New property `autoFitCaption` 
   is added which defaults to `true`. When this is `true` the plugin will auto fit caption text within the container dynamically
   and responsively based on window size.
2. (enh #51): Autosize preview images when they exceed the size of the preview container.
3. (enh #52): Raise new `fileimageloaded` event.

version 2.7.0
=============
**Date:** 11-Nov-2014

1. Set release to stable in composer.json.
2. (enh #48): Trigger `fileloaded` event when `showPreview` is `false`.
3. (enh #49): Set image preview dimensions to auto fit and center

version 2.6.0
=============
**Date:** 15-Oct-2014

- (bug #40): More correct fix for IE (ver < 11) inability to clear fileinput values.
- Templatize errorContainer for display within the preview window.
- (enh #42): Enhance plugin to configure the `elErrorContainer` for displaying validation errors.
- (bug #43): Validate special characters in filename before generating caption.
- (bug #44): Browser IE10 hangs on file clear.

version 2.5.0
=============
**Date:** 09-Oct-2014

- (enh #36): New feature. Validation routine for checking allowed file types and extensions.
- (bug #37): HTML encode text content for preview in modal.
- (enh #38): Highlight error CSS in file caption on validation error.
- (bug #39): HTML encode caption hover title.
- (bug #40): Fix IE (ver < 11) inability to clear fileinput values.

version 2.4.0
=============
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

version 2.3.0
=============
**Date:** 19-Sep-2014

1. (enh #28, #29): Added support for previewing flash and video files.
2. Better replacement of tags in templates. Replaces all tag occurences with this new release.

version 2.2.0
=============
**Date:** 19-Aug-2014

1. (enh #24): Update readAsBinaryString to readAsArrayBuffer
2. (enh #25): Graceful degrade to normal file input for older browsers (including previous versions of Safari).

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