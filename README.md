bootstrap-fileinput
====================

An enhanced HTML 5 file input for Bootstrap 3.x with file preview for images and text, multiple selection, and more. This plugin is inspired by [this blog article](http://www.abeautifulsite.net/blog/2013/08/whipping-file-inputs-into-shape-with-bootstrap-3/) and [Jasny's File Input plugin](http://jasny.github.io/bootstrap/javascript/#fileinput). The plugin enhances these concepts and simplifies the widget initialization with simple HTML markup on a file input. It also offers support for multiple file preview and previewing both images and text types.

![File Input Screenshot](https://lh6.googleusercontent.com/-2niyujIaat0/UyqzA_78OQI/AAAAAAAAADE/f6IJkr11uA8/w666-h418-no/fileinput-screenshot.jpg)

> NOTE: The latest version of the plugin v2.1.0 has been released. Refer the [CHANGE LOG](https://github.com/kartik-v/bootstrap-fileinput/blob/master/CHANGE.md) for details.

## Features  

1. The plugin will convert a simple HTML file input to an advanced file picker control. Will help fallback to a normal HTML file input for browsers not supporting JQuery or Javascript.
2. The file input consists of the following three sections with options and templates to control the display:
   - file caption section: to display a brief information of the file(s) selected
   - file action buttons section: to browse, remove, and upload files.
   - file preview section: to display the selected files on client for preview (supports images and text file types). Other file types will be displayed as normal thumbnails.
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
14. Size of the entire plugin is less than 6KB if gzipped. The minified assets are less than 19KB (about 16KB for the minified JS and 3KB for the minified CSS).

## Demo

View the [plugin documentation](http://plugins.krajee.com/file-input) and [plugin demos](http://plugins.krajee.com/file-input/demo) at Krajee JQuery plugins. 

## Pre-requisites  

1. [Bootstrap 3.x](http://getbootstrap.com/)
2. Latest [JQuery](http://jquery.com/)
3. Most modern browsers supporting HTML5 file inputs and FileReader API including CSS3 & JQuery. For Internet Explorer, one must use IE versions 10 and above. IE9 and below will work as a normal file input, and will not support multiple file selection or the HTML 5 FileReader API.

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
<script src="path/to/js/fileinput.min.js" type="text/javascript"></script>
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

#### captionClass
_string_ any additional CSS class to append to the caption container.

#### previewClass
_string_ any additional CSS class to append to the preview container.

#### mainClass
_string_ any additional CSS class to append to the main plugin container.

#### mainTemplate
_string_ the template used to render the widget. The following template variables will be parsed:

- `{class}`: the CSS class as set in the `mainClass` property.
- `{preview}`: the content parsed by the `previewTemplate` and will be displayed only if `showPreview` is `true`.
- `{caption}`: the content parsed by the `captionTemplate` and will be displayed only if `showCaption` is `true`.
- `{remove}`: the file remove/clear button and will be displayed only if `showRemove` is `true`.
- `{upload}`: the file upload button and will be displayed only if `showUpload` is `true`.
- `{browse}`: the main file browse button to select your files for input.

The `mainTemplate` if not passed, will be automatically set based on `showCaption` settings.

- If `showCaption` is set to `true`, the `mainTemplate` will default to:
```html
{preview}
<div class="input-group {class}">
   {caption}
   <div class="input-group-btn">
       {remove}
       {upload}
       {browse}
   </div>
</div>
```

- If `showCaption` is set to `false`, the `mainTemplate` will default to:
```html
{preview}\n{remove}\n{upload}\n{browse}\n
```

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
 
#### captionTemplate
_string_ the template used to render the caption. The following template variables will be parsed:

- `{class}`: the CSS class as set in the `captionClass` property.

The `captionTemplate` if not set will default to:
```html
<div tabindex="-1" class="form-control file-caption {class}">
   <span class="glyphicon glyphicon-file"></span> <span class="file-caption-name"></span>
</div>
```

#### previewTemplate
_string_ the template used to render the preview. The following template variables will be parsed:

- `{class}`: the CSS class as set in the `previewClass` property.

The `previewTemplate` if not set will default to:
```html
<div class="file-preview {class}">
   <div class="close fileinput-remove text-right">&times;</div>
   <div class="file-preview-thumbnails"></div>
   <div class="clearfix"></div>
   <div class="file-preview-status text-center text-success"></div>
</div>
```

#### previewGenericTemplate
_string_ the generic preview template markup used within the preview container. Defaults to `IMAGE_TEMPLATE` as shown below.
The following variables will be parsed:

- `{content}`: the file preview content
- `{previewId}`: the previewed file container identifier

```html
<div class="file-preview-frame" id="{previewId}">
    {content}
</div>
```

#### previewImageTemplate
_string_ the template markup for previewing image files within the preview container. Defaults to `IMAGE_TEMPLATE` as shown below.
The following variables will be parsed:

- `{content}`: the file preview content
- `{previewId}`: the previewed file container identifier

```html
<div class="file-preview-frame" id="{previewId}">
    {content}
</div>
```

#### previewTextTemplate
_string_ the template markup for previewing text files within the preview container. Defaults to `TEXT_TEMPLATE` as shown below.
The following variables will be parsed:

- `{strText}`: the file text content
- `{caption}`: the file name to be displayed on hover
- `{previewId}`: the previewed file container identifier

```html
<div class="file-preview-frame" id="{previewId}">
    <div class="file-preview-text" title="{caption}">
        {strText}
    </div>
</div>
```

#### previewOtherTemplate
_string_ the template markup for previewing all other files within the preview container. Defaults to `OTHER_TEMPLATE` as shown below.
The following variables will be parsed:

- `{caption}`: the file name to be displayed 
- `{previewId}`: the previewed file container identifier

```html
<div class="file-preview-frame" id="{previewId}">
   <div class="file-preview-other">
       <h2><i class="glyphicon glyphicon-file"></i></h2>
       {caption}
   </div>
</div>
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
