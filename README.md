bootstrap-fileinput
====================

An enhanced HTML 5 file input for Bootstrap 3.x with file preview for various files, offers multiple selection, and more. This plugin is inspired by [this blog article](http://www.abeautifulsite.net/blog/2013/08/whipping-file-inputs-into-shape-with-bootstrap-3/) and [Jasny's File Input plugin](http://jasny.github.io/bootstrap/javascript/#fileinput). 
The plugin enhances these concepts and simplifies the widget initialization with simple HTML markup on a file input. It offers support for previewing a 
wide variety of files i.e. images, text, html, video, audio, flash, and objects.

![File Input Screenshot](https://lh3.googleusercontent.com/-3FiEmc_okc4/VBw_d2LBAJI/AAAAAAAAAL8/KbVj5X9Dus0/w596-h454-no/FileInput.jpg)

> NOTE: The latest version of the plugin v2.9.1 has been released. Refer the [CHANGE LOG](https://github.com/kartik-v/bootstrap-fileinput/blob/master/CHANGE.md) for details.

## Features  

1. The plugin will convert a simple HTML file input to an advanced file picker control. Will help fallback to a normal HTML file input for browsers not supporting JQuery or Javascript.
2. The file input consists of the following three sections with options and templates to control the display:
   - file caption section: to display a brief information of the file(s) selected
   - file action buttons section: to browse, remove, and upload files.
   - file preview section: to display the selected files on client for preview (supports preview of image, text, flash, and video file types). Other file types will be displayed as normal thumbnails.
3. The plugin automatically converts an input with `type = file` to an advanced file picker input if you set its `class = file`. All options to the input can be passed as HTML5 `data` attributes.
4. Ability to select and preview multiple files. Uses HTML 5 File reader API to read and preview files. Displays the progress of files being being loaded onto the preview zone, in case many files are chosen.
5. Offers predefined templates and CSS classes which can be changed to style your file-input display as per your needs.
6. With **v1.5.0**, you can now configure the plugin to show an **initial preview of images/files** with **initial caption** 
   (more useful for record update scenarios). Refer the [`initialPreview`](https://github.com/kartik-v/bootstrap-fileinput/blob/master/README.md#initialpreview) 
   and [`initialCaption`](https://github.com/kartik-v/bootstrap-fileinput/blob/master/README.md#initialcaption) properties in the plugin options
   section for configuring this.
7. Option to show/hide any or all of the following:
   - caption section
   - preview section
   - upload button
   - remove button
8. Customise the location of the target container elements to display the entire plugin, the caption container, the caption text, the preview container, preview image, and preview status.
9. For text file previews, autowrap the text to the thumbnail width, and show a wrap indicator link to display complete text on hover. You can customize the wrap indicator (which defaults to &hellip;).
10. Customise the messages for preview, progress, and files selected.
11. Upload action defaults to form submit. Supports an upload route/server action parameter for custom ajax based upload.
12. Triggers JQuery events for advanced development. Events currently available are `filereset`, `fileclear`, `filecleared`, `fileloaded`, and `fileerror`.
13. Disabled and readonly file input support.
14. Size of the entire plugin is less than 6KB if gzipped. The minified assets are less than 21KB (about 18KB for the minified JS and 3KB for the minified CSS).

### New features since v2.4.0

> **Note:** There are BC Breaking Changes with release v2.4.0.

With release v2.4.0, the plugin has been revamped to support and configure a wide variety of file formats for preview. This may break some
backward compatibility (BC) for older versions that use custom templates. 

The following are the major changes with release v2.4.0:

- Dynamically auto size the file captions for long file names exceeding container width. New property `autoFitCaption` 
  is added which defaults to `true`. When this is `true` the plugin will auto fit caption text within the container dynamically
  and responsively based on window size.
- Raise new `fileimageuploaded` event that fires after image is completely loaded on the preview container.
- Autosize preview images when they exceed the size of the preview container.
- Completely templatized and extensible to allow configuration of the file-input the way the developer wants.
- Plugin has been revamped to build preview intelligence based on various file preview types. The inbuilt file support types are categorized as 
  `image`, `text`, `html`, `video`,  `audio`, `flash`, `object`, and `other`.
- `allowedPreviewTypes`: You can now configure which all file types are allowed to be shown as a preview. This defaults to `['image', 'html', 'text', 'video', 'audio', 'flash', 'object']`.
   Thus all file types are treated as an object to preview by default. For exampleTo preview only `image` and `video`, you can set this to `['image', 'video']`.
- `allowedPreviewMimeTypes`: In addition to `allowedPreviewTypes`, you can also control which all mime types can be displayed for preview. This defaults to null,
   meaning all mime types are supported.
   >NOTE: With release 2.5.0 you can now control which file types or extensions are allowed for upload by setting `allowedFileTypes` and `allowedFileExtensions`.
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

## Demo

View the [plugin documentation](http://plugins.krajee.com/file-input) and [plugin demos](http://plugins.krajee.com/file-input/demo) at Krajee JQuery plugins. 

## Pre-requisites  

1. [Bootstrap 3.x](http://getbootstrap.com/)
2. Latest [JQuery](http://jquery.com/)
3. Most modern browsers supporting HTML5 (inputs and FileReader API) including CSS3 & JQuery. For Internet Explorer, one must use IE versions 10 and above. IE9 and below will work as a normal file input, and will not support multiple file selection or the HTML 5 FileReader API.

## Restrictions
The plugin supports only file input and preview at client level. It does not actually process the upload of the files to the server.

## Installation

### Using Bower
You can use the `bower` package manager to install. Run:

    bower install bootstrap-fileinput

### Using Composer
You can use the `composer` package manager to install. Either run:

    $ php composer.phar require kartik-v/bootstrap-fileinput "dev-master"

or add:

    "kartik-v/bootstrap-fileinput": "dev-master"

to your composer.json file

### Manual Install

You can also manually install the plugin easily to your project. Just download the source [ZIP](https://github.com/kartik-v/bootstrap-fileinput/zipball/master) or [TAR ball](https://github.com/kartik-v/bootstrap-fileinput/tarball/master) and extract the plugin assets (css and js folders) into your project.

## Usage

Step 1: Load the following assets in your header. 

```html
<link href="http://netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css" rel="stylesheet">
<link href="path/to/css/fileinput.min.css" media="all" rel="stylesheet" type="text/css" />
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js" type="text/javascript"></script>
```

If you noticed, you need to load the `jquery.min.js` and `bootstrap.min.css` in addition to the `fileinput.min.css` and `fileinput.min.js`.

Step 2: Initialize the plugin on your page. For example,

```js
// initialize with defaults
$("#input-id").fileinput();

// with plugin options
$("#input-id").fileinput({'showUpload':false, 'previewFileType':'any'});
```

The `#input-id` is the identifier for the input (e.g. `type = file`) on your page, which is hidden automatically by the plugin. 

Alternatively, you can directly call the plugin options by setting data attributes to your input field.

```html
<input id="input-id" type="file" class="file" data-preview-file-type="text" >
```

## Documentation

### Plugin Options
The plugin supports these following options:

#### showCaption
_boolean_ whether to display the file caption. Defaults to `true`.

#### showPreview
_boolean_ whether to display the file preview. Defaults to `true`.

#### showRemove
_boolean_ whether to display the file remove/clear button. Defaults to `true`.

#### showUpload
_boolean_ whether to display the file upload button. Defaults to `true`. This will default to a form submit button, unless the uploadUrl is specified.

#### autoFitCaption
_boolean_ whether to automatically size the file caption text to fit the container for long file names overflowing the container. Defaults to `true`. When set to true, the caption text will be dynamically sized. Shrunk file names will be appended with ellipsis, and the complete filename will be displayed as a title on hover.

#### captionClass
_string_ any additional CSS class to append to the caption container.

#### previewClass
_string_ any additional CSS class to append to the preview container.

#### mainClass
_string_ any additional CSS class to append to the main plugin container.

#### initialDelimiter
_string_, the delimiter to be used to allow passing multiple content delimited as a string to `initialPreview`. Defaults to `'*$$*'`.

#### initialPreview
_string | array_ the initial preview content to be displayed. You can pass the minimal HTML markup for displaying your image, text, or file. 
If set as a string, this will display a single file in the initial preview if there is no delimiter. You can set a delimiter (as defined 
in `initialDelimiter`) to show multiple files in initial preview.  If set as an array, it will display all files in the array as an 
initial preview (useful for multiple file upload scenarios).

The following CSS classes will need to be added for displaying each file type as per the plugin style theme:

- **image files:** Include CSS class `file-preview-image`
- **text files:** Include CSS class `file-preview-text`
- **other files:** Include CSS class `file-preview-other`

Examples of how you can setup various files for initial preview:

```js
// for image files
initialPreview: [
    "<img src='/images/desert.jpg' class='file-preview-image' alt='Desert' title='Desert'>",
    "<img src='/images/jellyfish.jpg' class='file-preview-image' alt='Jelly Fish' title='Jelly Fish'>",
],

// for text files
initialPreview: "<div class='file-preview-text' title='NOTES.txt'>" +
    "This is the sample text file content upto wrapTextLength of 250 characters" +
    "<span class='wrap-indicator' onclick='$(\"#show-detailed-text\").modal(\"show\")' title='NOTES.txt'>[…]</span>" +
    "</div>"

// for other files    
initialPreview: "<div class='file-preview-text'>" + 
    "<h2><i class='glyphicon glyphicon-file'></i></h2>" +
    "Filename.xlsx" + "</div>"
```

#### initialPreviewCount
_int_, the count of initial preview items that will be added to the count of files selected in preview. This is applicable when displaying
the right caption, when `overwriteInitial` is set to `false`.

#### initialCaption
_string_ the initial preview caption text to be displayed. If you do not set a value here and `initialPreview` is set to 
`true` this will default to `"{preview-file-count} files selected"`, where `{preview-file-count}` is the count of the 
files passed in `initialPreview`.

#### overwriteInitial
_boolean_ whether you wish to overwrite the initial preview content and caption setup. This defaults to `true`, whereby, any `initialPreview` content set 
will be overwritten, when new file is uploaded or when files are cleared. Setting it to `false` will help displaying a saved image or file from database always - 
useful especially when using the `multiple` file upload feature.
 
#### layoutTemplates

_object_ the templates configuration for rendering each part of the layout. You can set the following templates to control the widget layout:

- `main1`: the template for rendering the widget with caption.
- `main2`: the template for rendering the widget without caption.
- `preview`: the template for rendering the preview.
- `caption`: the template for rendering the caption.
- `modal`: the template for rendering the modal (for text file preview zooming).

The `main1` and `main2` templates would automatically parse the following tags for replacement:

- `{class}`: the CSS class as set in the `mainClass` property.
- `{preview}`: the content parsed by the `previewTemplate` and will be displayed only if `showPreview` is `true`.
- `{caption}`: the content parsed by the `captionTemplate` and will be displayed only if `showCaption` is `true`.
- `{remove}`: the file remove/clear button and will be displayed only if `showRemove` is `true`.
- `{upload}`: the file upload button and will be displayed only if `showUpload` is `true`.
- `{browse}`: the main file browse button to select your files for input.

The `preview` and `caption` templates can understand the following special tags which will be replaced:

- `{class}`: the CSS class as set in the `mainClass`, `captionClass` or `previewClass` properties.

The `layoutTemplates` if not set will default to:

```js
{
    main1: '{preview}\n' +
        '<div class="input-group {class}">\n' +
        '   {caption}\n' +
        '   <div class="input-group-btn">\n' +
        '       {remove}\n' +
        '       {upload}\n' +
        '       {browse}\n' +
        '   </div>\n' +
        '</div>',
    main2: '{preview}\n{remove}\n{upload}\n{browse}\n',
    preview: '<div class="file-preview {class}">\n' +
        '   <div class="close fileinput-remove text-right">&times;</div>\n' +
        '   <div class="file-preview-thumbnails"></div>\n' +
        '   <div class="clearfix"></div>' +
        '   <div class="file-preview-status text-center text-success"></div>\n' +
        '   <div class="kv-fileinput-error file-error-message"></div>\n' +
        '</div>',
    caption: '<div tabindex="-1" class="form-control file-caption {class}">\n' +
        '   <span class="glyphicon glyphicon-file kv-caption-icon"></span><div class="file-caption-name"></div>\n' +
        '</div>',
    modal: '<div id="{id}" class="modal fade">\n' +
        '  <div class="modal-dialog modal-lg">\n' +
        '    <div class="modal-content">\n' +
        '      <div class="modal-header">\n' +
        '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n' +
        '        <h3 class="modal-title">Detailed Preview <small>{title}</small></h3>\n' +
        '      </div>\n' +
        '      <div class="modal-body">\n' +
        '        <textarea class="form-control" style="font-family:Monaco,Consolas,monospace; height: {height}px;" readonly>{body}</textarea>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</div>\n'    
};
```

#### previewTemplates

_object_ the templates configuration for rendering each preview file type. The following file types are recognized:

- `image`: the preview template for image files.
- `text`: the  preview template for text files.
- `html`: the preview template for html files.
- `video`: the preview template for video files (supported by HTML 5 video tag).
- `audio`: the preview template for audio files (supported by HTML 5 audio tag).
- `flash`: the preview template for flash files (supported currently on webkit browsers).
- `object`: the preview template for all other files - by default treated as object. To disable this behavior, configure the `allowedPreviewTypes` property.
- `generic`: this template is used ONLY for rendering the `initialPreview` markup content passed directly as a raw format. 

The following tags will be parsed and replaced in each of the templates:

- `{previewId}`: will be replaced with the generated identifier for the preview frame container.
- `{data}`: will be replaced with the data source for each preview type.
- `{width}`: will be replaced with the width for the file type as set in `previewSettings`.
- `{height}`: will be replaced with the height for the file type as set in `previewSettings`.
- `{caption}`: will be replaced with the file name.
- `{type}`: will be replaced with the file type.
- `{content}`: this is applicable only for the `generic` template. It will be replaced with the raw HTML markup as set in `initialPreview`. None of 
   the above tags will be parsed for the `generic` template.

As noted, if you are coming from an earlier release (before v2.4.0), all preview templates have now been combined into one property, instead of separate templates for image, text etc. 

The `previewTemplates` if not set will default to:

```js
{
    generic: '<div class="file-preview-frame" id="{previewId}">\n' +
        '   {content}\n' +
        '</div>\n',
    html: '<div class="file-preview-frame" id="{previewId}">\n' +
        '    <object data="{data}" type="{type}" width="{width}" height="{height}">\n' +
        '       ' + DEFAULT_PREVIEW + '\n' +
        '    </object>\n' + PREVIEW_LABEL + 
        '</div>',
    image: '<div class="file-preview-frame" id="{previewId}">\n' +
        '   <img src="{data}" class="file-preview-image" title="{caption}" alt="{caption}" ' + STYLE_SETTING + '>\n' +
        '</div>\n',
    text: '<div class="file-preview-frame" id="{previewId}">\n' +
        '   <div class="file-preview-text" title="{caption}" ' + STYLE_SETTING + '>\n' +
        '       {data}\n' + 
        '   </div>\n' + 
        '</div>\n',
    video: '<div class="file-preview-frame" id="{previewId}" title="{caption}" ' + STYLE_SETTING + '>\n' +
        '   <video width="{width}" height="{height}" controls>\n' +
        '       <source src="{data}" type="{type}">\n' +
        '       ' + DEFAULT_PREVIEW + '\n' +
        '   </video>\n' + PREVIEW_LABEL + 
        '</div>\n',
    audio: '<div class="file-preview-frame" id="{previewId}" title="{caption}" ' + STYLE_SETTING + '>\n' +
        '   <audio controls>\n' +
        '       <source src="{data}" type="{type}">\n' +
        '       ' + DEFAULT_PREVIEW + '\n' +
        '   </audio>\n' + PREVIEW_LABEL + 
        '</div>\n',
    flash: '<div class="file-preview-frame" id="{previewId}" title="{caption}" ' + STYLE_SETTING + '>\n' +
        '   <object type="application/x-shockwave-flash" width="{width}" height="{height}" data="{data}">\n' +
        OBJECT_PARAMS + '       ' + DEFAULT_PREVIEW + '\n' +
        '   </object>\n' + PREVIEW_LABEL + 
        '</div>\n',
    object: '<div class="file-preview-frame" id="{previewId}" title="{caption}" ' + STYLE_SETTING + '>\n' +
        '    <object data="{data}" type="{type}" width="{width}" height="{height}">\n' +
        '      <param name="movie" value="{caption}" />\n' +
        OBJECT_PARAMS + '           ' + DEFAULT_PREVIEW + '\n' +
        '   </object>\n' + PREVIEW_LABEL + 
        '</div>',
    other: '<div class="file-preview-frame" id="{previewId}" title="{caption}" ' + STYLE_SETTING + '>\n' +
        '   ' + DEFAULT_PREVIEW + '\n' + PREVIEW_LABEL + 
        '</div>',
}
```

#### allowedFileTypes

_array_ the list of allowed file types for upload. This by default is set to null which means the plugin supports all file types for upload. If an 
invalid file type is found, then a validation error message as set in `msgInvalidFileType` will be raised. The following types as set in `fileTypeSettings` 
are available for setup. 

```js
['image', 'html', 'text', 'video', 'audio', 'flash', 'object']
```

#### allowedFileExtensions

_array_ the list of allowed file extensions for upload. This by default is set to null which means the plugin supports all file extensions for upload. If an 
invalid file extension is found, then a validation error message as set in `msgInvalidFileExtension` will be raised. An example of setting this could be:

```js
['jpg', 'gif', 'png', 'txt']
```

> NOTE: You need to be careful in case you are setting both `allowedFileTypes` and `allowedFileExtensions`. In this case, the `allowedFileTypes` property 
is validated first and generally precedes the `allowedFileExtensions` setting (and the latter validation maybe skipped).

#### allowedPreviewTypes

_array_ the list of allowed preview types for your widget. This by default supports all file types for preview. The plugin by default treats each
file as an object if it does not match any of the previous types. To disable this behavior, you can remove `object` from the list of `allowedPreviewTypes`
OR fine tune it through `allowedPreviewMimeTypes`.

This is by default setup as following:
```js
['image', 'html', 'text', 'video', 'audio', 'flash', 'object']
```

#### allowedPreviewMimeTypes

_array_ the list of allowed mime types for preview. This is set to null by default which means all possible mime types are allowed. This setting works in combination
with `allowedPreviewTypes` to filter only the needed file types allowed for preview. You can check this [list of allowed mime types](http://www.sitepoint.com/web-foundations/mime-types-complete-list/)
to add to this list if needed.

#### previewSettings

_object_ the format settings (width and height) for rendering each preview file type. This is by default setup as following:

```js
{
    image: {width: "auto", height: "160px"},
    html: {width: "320px", height: "180px"},
    text: {width: "160px", height: "160px"},
    video: {width: "320px", height: "240px"},
    audio: {width: "320px", height: "80px"},
    flash: {width: "320px", height: "240px"},
    object: {width: "320px", height: "300px"},
    other: {width: "160px", height: "120px"}
}
```

#### fileTypeSettings

_object_ the settings to validate and identify each file type when a file is selected for upload. This is a list of callbacks, which accepts the file mime type and file name as a parameter.
This is by default setup as following:

```js
// vType: is the file mime type
// vName: is the file name
{
	image: function(vType, vName) {
		return (typeof vType !== "undefined") ? vType.match('image.*') : vName.match(/\.(gif|png|jpe?g)$/i);
	},
	html: function(vType, vName) {
		return (typeof vType !== "undefined") ? vType == 'text/html' : vName.match(/\.(htm|html)$/i);
	},
	text: function(vType, vName) {
		return typeof vType !== "undefined" && vType.match('text.*') || vName.match(/\.(txt|md|csv|nfo|php|ini)$/i);
	},
	video: function (vType, vName) {
		return typeof vType !== "undefined" && vType.match(/\.video\/(ogg|mp4|webm)$/i) || vName.match(/\.(og?|mp4|webm)$/i);
	},
	audio: function (vType, vName) {
		return typeof vType !== "undefined" && vType.match(/\.audio\/(ogg|mp3|wav)$/i) || vName.match(/\.(ogg|mp3|wav)$/i);
	},
	flash: function (vType, vName) {
		return typeof vType !== "undefined" && vType == 'application/x-shockwave-flash' || vName.match(/\.(swf)$/i);
	},
	object: function (vType, vName) {
		return true;
	},
	other: function (vType, vName) {
		return true;
	},
}
```

#### browseLabel
_string_ the label to display for the file picker/browse button. Defaults to `Browse &hellip;`.


#### browseIcon
_string_ the icon to display before the label for the file picker/browse button. Defaults to `<i class="glyphicon glyphicon-folder-open"></i> &nbsp;`.

#### browseClass
_string_ the CSS class for the file picker/browse button. Defaults to `btn btn-primary`.

#### removeLabel
_string_ the label to display for the file remove button. Defaults to `Remove`.

#### removeIcon
_string_ the icon to display before the label for the file picker/remove button. Defaults to `<i class="glyphicon glyphicon-ban-circle"></i> &nbsp;`.

#### removeClass
_string_ the CSS class for the file remove button. Defaults to `btn btn-default`.

#### uploadLabel
_string_ the label to display for the file upload button. Defaults to `Upload`.

#### uploadIcon
_string_ the icon to display before the label for the file upload button. Defaults to `<i class="glyphicon glyphicon-upload"></i> &nbsp;`.

#### uploadClass
_string_ the CSS class for the file upload button. Defaults to `btn btn-default`.

#### uploadUrl
_string_ the URL for the upload processing action (typically for ajax based processing). Defaults to `null`. If this is not set or `null`, then the upload button action will default to form submission.

#### maxFileSize
_float_ the maximum file size for upload in KB.  If set to `0`, it means size allowed is unlimited. Defaults to `0`.

#### maxFileCount
_float_ the maximum number of files allowed for each multiple upload. If set to `0`, it means number of files allowed is unlimited. Defaults to `0`.

#### msgSizeTooLarge
_string_ the message to be displayed when the file size exceeds maximum size. Defaults to:

```
File "{name}" (<b>{size} KB</b>) exceeds maximum allowed upload size of <b>{maxSize} KB</b>. Please retry your upload!
```
where:

- `{name}`: will be replaced by the file name being uploaded
- `{size}`: will be replaced by the uploaded file size
- `{maxSize}`: will be replaced by the `maxFileSize` parameter.

### msgFilesTooMany
_string_ the message to be displayed when the file count exceeds maximum count as set in `maxFileCount`. Defaults to:

```
Number of files selected for upload <b>({n})</b> exceeds maximum allowed limit of <b>{m}</b>. Please retry your upload!
```

where:

- `{n}`: will be replaced by number of files selected for upload
- `{m}`: will be replaced by the allowed maximum files as set in `maxFileCount`

#### msgFileNotFound
_string_ the exception message to be displayed when the file selected is not found by the FileReader. Defaults to:

```
File "{name}" not found!
```
where:

- `{name}`: will be replaced by the file name being uploaded

#### msgFileNotReadable
_string_ the exception message to be displayed when the file selected is not readable by the FileReader API. Defaults to:

```
File "{name}" is not readable.
```
where:

- `{name}`: will be replaced by the file name being uploaded

#### msgFilePreviewAborted
_string_ the exception message to be displayed when the file preview upload is aborted. Defaults to:

```
File preview aborted for "{name}".
```
where:

- `{name}`: will be replaced by the file name being uploaded

#### msgFilePreviewError
_string_ the exception message to be displayed for any other error when previewing the file. Defaults to:

```
An error occurred while reading the file "{name}".
```
where:

- `{name}`: will be replaced by the file name being uploaded

#### msgInvalidFileType
_string_ the message to be displayed when the file type is not in one of the file types set in `allowedFileTypes`. Defaults to:

```
Invalid type for file "{name}". Only "{types}" files are supported.
```
where:

- `{name}`: will be replaced by the file name being uploaded
- `{types}`: will be replaced by the comma separated list of types defined in `allowedFileTypes`.

#### msgInvalidFileExtension
_string_ the message to be displayed when the file type is not in one of the file extensions set in `allowedFileExtensions`. Defaults to:

```
Invalid extension for file "{name}". Only "{extensions}" files are supported.
```
where:

- `{name}`: will be replaced by the file name being uploaded
- `{extensions}`: will be replaced by the comma separated list of extensions defined in `allowedFileExtensions`.

#### msgValidationError
_string_ the exception message to be displayed within the caption container (instead of `msgFilesSelected`), 
when a validation error is encountered. Defaults to:

```
<span class="text-danger"><i class="glyphicon glyphicon-exclamation-sign"></i> File Upload Error</span>
```

#### msgErrorClass
_string_ the css class for the error message to be displayed in the preview window when the file size exceeds `maxSize`. Defaults to `file-error-message`.

#### msgLoading
_string_ the message displayed when the files are getting read and loaded for preview. Defaults to 

```Loading  file {index} of {files} &hellip;```

The following special variables will be replaced:

- `{index}`: the sequence number of the current file being loaded.
- `{files}`: the total number of files selected for upload.

#### msgProgress
_string_ the progress message displayed as each file is loaded for preview. Defaults to:

```Loading file {index} of {files} - {name} - {percent}% completed.```

The following variables will be replaced:

- `{index}`: the sequence number of the current file being loaded.
- `{files}`: the total number of files selected for upload.
- `{percent}`: the percentage of file read and loaded.
- `{name}`: the name of the current file being loaded.

#### msgSelected
_string_ the progress message displayed in caption window when multiple (more than one) files are selected. Defaults to `{n} files selected`. The following variables will be replaced:

- `{n}`: the number of files selected.


#### previewFileType
_string_ the type of files that are to be displayed in the preview window. Defaults to `image`. Can be one of the following:

- `image`: Only `image` type files will be shown in preview.
- `text`:  Only `text` type files will be shown in preview.
- `any`: Both `image` and `text` files content will be shown in preview.

Files other than `image` or `text` will be displayed as a thumbnail with the filename in the preview window.

#### wrapTextLength
_integer_ the number of characters after which the content will be stripped/wrapped for text preview. Defaults to `250`.

#### wrapIndicator
_string_ the type of files that are to be displayed in the preview window. Defaults to ` <span class="wrap-indicator" title="{title}">[&hellip;]</span>`.  The following variables will be replaced:

- `{title}`: the content of the entire text file that will be displayed as a span title element.

#### elErrorContainer
_string_ the identifier for the container element displaying the error (e.g. `'#id'`). If not set, will default to the container with CSS class `kv-fileinput-error` inside the preview container (identified by `elPreviewContainer`). The `msgErrorClass` will be automatically appended to this container before displaying the error.

#### elCaptionContainer
_string_ the identifier for the container element containing the caption (e.g. `'#id'`). If not set, will default to the container with CSS class `file-caption` inside the main plugin container.

#### elCaptionText
_string_ the identifier for the container element containing the caption text (e.g. `'#id'`). If not set, will default to the container with CSS class `file-caption-name` inside the main plugin container.

#### elPreviewContainer
_string_ the identifier for the container element containing the preview (e.g. `'#id'`). If not set, will default to the container with CSS class `file-preview` inside the main plugin container.

#### elPreviewImage
_string_ the identifier for the element containing the preview image thumbnails (e.g. `'#id'`). If not set, will default to the container with CSS class `file-preview-thumbnails` inside the main plugin container.

#### elPreviewStatus
_string_ the identifier for the element containing the preview progress status (e.g. `'#id'`). If not set, will default to the container with CSS class `file-preview-status` inside the main plugin container.

### Plugin Events
The plugin supports these events:

#### fileclear
This event is triggered when the file input the remove button is pressed for clearing the file preview.

**Example:**
```js
$('#input-id').on('fileclear', function(event) {
    console.log("fileclear");
});
```

#### filecleared
This event is triggered after the files in the preview are cleared.

**Example:**
```js
$('#input-id').on('filecleared', function(event) {
    console.log("filecleared");
});
```

#### fileerror
This event is triggered when a client validation error is encountered for an uploaded file. 
Additional parameters available are: 

- `file`: the FileReader instance 
- `previewId`: the identifier for the preview file container.
- `index`: the zero-based sequential index of the loaded file in the preview list

**Example:**
```js
$('#input-id').on('fileerror', function(event, file, previewId, index) {
    console.log("fileerror");
});
```

#### fileloaded
This event is triggered after a file is loaded in the preview. Additional parameters available 
are: 

- `file`: the FileReader instance 
- `previewId`: the identifier for the preview file container.
- `index`: the zero-based sequential index of the loaded file in the preview list


**Example:**
```js
$('#input-id').on('fileloaded', function(event, file, previewId, index) {
    console.log("fileloaded");
});
```

#### filereset
This event is triggered when the file input is reset to initial value.

**Example:**
```js
$('#input-id').on('filereset', function(event) {
    console.log("filereset");
});
```

#### fileimageloaded
This event is triggered when each file image is fully loaded in the preview window. This is only applicable for image file previews and if `showPreview` is set to true. Additional parameters available are: 

- `previewId`: the identifier for the preview file container.

**Example:**
```js
$('#input-id').on('fileimageloaded', function(event, previewId) {
    console.log("fileimageloaded");
});
```
#### filebrowse
This event is triggered when the file browse button is clicked to open the file selection dialog.

**Example:**
```js
$('#input-id').on('filebrowse', function(event) {
    console.log("File browse triggered.");
});
```

#### fileselectnone
This event is triggered when no files are selected by the user for a repeat selection scenario (i.e. on a file input that already contains previously selected files). This event is better applicable for browsers like Google Chrome, which clear the file input when the file selection dialog is cancelled. For other browsers, this event is typically triggered only when one resets the form or clears file input (using the remove button).

**Example:**
```js
$('#input-id').on('fileselectnone', function(event) {
    console.log("Huh! No files were selected.");
});
```

### Plugin Methods
The plugin supports these methods:

#### disable
Disable the file input.
```js
$('#input-id').fileinput('disable');
```

#### enable
Enable the file input.
```js
$('#input-id').fileinput('enable');
```

#### reset
Reset the file input.
```js
$('#input-id').fileinput('reset');
```

#### clear
Clear the file input.
```js
$('#input-id').fileinput('clear');
```

#### refresh
Refreshes the file input plugin based on options provided. You can supply an array of plugin options as a parameter.
```js
// example 1 (disable at runtime)
$('#input-id').attr('disabled', 'disabled');
$('#input-id').fileinput('refresh');

// example 2 (modify plugin options at runtime)
$('#input-id').fileinput('refresh', {browseLabel: 'Select...', removeLabel: 'Delete'});
```

## License

**bootstrap-fileinput** is released under the BSD 3-Clause License. See the bundled `LICENSE.md` for details.
