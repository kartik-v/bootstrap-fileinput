bootstrap-fileinput
====================

An enhanced HTML 5 file input for Bootstrap 3.x with file preview for various files, offers multiple selection, and more. This plugin was initially inspired by [this blog article](http://www.abeautifulsite.net/blog/2013/08/whipping-file-inputs-into-shape-with-bootstrap-3/) and [Jasny's File Input plugin](http://jasny.github.io/bootstrap/javascript/#fileinput). But the plugin has now matured with various additional features and enhancements to be a complete (yet simple) file management tool and solution for web developers. 

The plugin incorporates a simple HTML markup with enhanced CSS styling of a HTML file input. But it enhances this further, by offering support to preview a wide variety of files i.e. images, text, html, video, audio, flash, and objects. In addition, it includes AJAX based uploads, dragging & dropping files, viewing upload progress, and selectively previewing, adding, or deleting files.

![File Input Screenshot](https://lh3.googleusercontent.com/-3FiEmc_okc4/VBw_d2LBAJI/AAAAAAAAAL8/KbVj5X9Dus0/w596-h454-no/FileInput.jpg)

> NOTE: The latest version of the plugin v4.1.5 has been released. Refer the [CHANGE LOG](https://github.com/kartik-v/bootstrap-fileinput/blob/master/CHANGE.md) for details. 

## Features  

### File Input Features

1. The plugin will convert a simple HTML file input to an advanced file picker control. Will help fallback to a normal HTML file input for browsers not supporting JQuery or Javascript.
2. The file input consists of the following three sections with options and templates to control the display:
   - **_file caption section_**: to display a brief information of the file(s) selected
   - **_file action buttons section_**: to browse, remove, and upload files.
   - **_file preview section_**: to display the selected files on client for preview (supports preview of image, text, flash, and video file types). Other file types will be displayed as normal thumbnails.
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
14. Dynamically auto size the file captions for long file names exceeding container width. 
15. Raise new `fileimageuploaded` event that fires after image is completely loaded on the preview container.
16. Autosize preview images when they exceed the size of the preview container.
17. Completely templatized and extensible to allow configuration of the file-input the way the developer wants.
18. Preview intelligence based on various file preview types. The inbuilt file support types are categorized as `image`, `text`, `html`, `video`,  `audio`, `flash`, `object`, and `other`.
19. `allowedPreviewTypes`: You can now configure which all file types are allowed to be shown as a preview. This defaults to `['image', 'html', 'text', 'video', 'audio', 'flash', 'object']`. Thus all file types are treated as an object to preview by default. For exampleTo preview only `image` and `video`, you can set this to `['image', 'video']`.
20. `allowedPreviewMimeTypes`: In addition to `allowedPreviewTypes`, you can also control which all mime types can be displayed for preview. This defaults to null, meaning all mime types are supported.
   >NOTE: With release 2.5.0 you can now control which file types or extensions are allowed for upload by setting `allowedFileTypes` and `allowedFileExtensions`.
21. `layoutTemplates`: Allows you to configure all layout template settings within one property. The layout objects that can be configured are: `main1`, `main2`, `preview`, `caption`, and `modal`.
22. `previewTemplates`: All preview templates for **each preview type** have been combined into one property, instead of separate templates for image, text etc. The keys are the formats as set in `allowedPreviewTypes` and values are the templates used for previewing. There are default prebuilt templates for each preview file type (`generic`, `image`, `text`, `html`, `video`,  `audio`, `flash`, `object`, and `other`). The `generic` template is used only for displaying `initialPreview` content using direct markup.
23. `previewSettings`: Allows you to configure width and height for each preview image type. The plugin has default widths and heights predefined for each type i.e `image`, `text`, `html`, `video`,  `audio`, `flash`, and `object`.
24. `fileTypeSettings`: Allows you to configure and identify each preview file type using a callback. The plugin has default callbacks predefined to identify each type i.e `image`, `text`, `html`, `video`,  `audio`, `flash`, and `object`.
25. Replacing tags within templates has been enhanced. With this release it will automatically check for multiple occurrences of each tag to replace within a template string.

### File Upload Features

With release 4.0.0, the plugin now also includes inbuilt support for AJAX Uploads and selectively adding or deleting files. AJAX upload functionality are 
built upon HTML5 FormData and XMLHttpRequest Level 2 standards. Most modern browsers do support this standard, but the plugin will automatically degrade to normal form based submission for unsupported browsers.

1. Add functionality for AJAX based UPLOAD using HTML5 FormData (most modern browsers support it). Will degrade to normal Form Based File submission if this is not supported.
2. To use AJAX Upload, one must set the `uploadUrl` property.
3. Enhance plugin to now allow files to be added, appended, removed (based on FEEDBACK from many). Thus one can append files to preview.
4. New DRAG & DROP zone available in preview to drag and drop files and append.
5. Delete or upload files one by one OR in batch.
6. If `showPreview` is set to false, or uploadUrl is not supported plugin will degrade to normal form based upload.
7. Configurable indicators for file awaiting upload, file successfully uploaded, files errored in upload.
8. Ability to add extra form data with ajax based uploads.
9. Upload progress bar and individual thumbnail upload indicators.
10. Ability to cancel and abort ongoing AJAX uploads.
11. Build up initial preview content (e.g. gallery of saved images). You can set initial preview actions (prebuilt support for initial preview delete). Other custom action buttons can be set for initial preview thumbnails as well. 
12. Ensure plugin is still lean in size and optimized for performance inspite of the above features by optimally utilizing HTML5 & jquery features only.

> NOTE: Drag and Drop zone functionality, selectively appending or deleting files, and upload indicator with progress are ONLY AVAILABLE if you use AJAX BASED uploads (by setting `uploadUrl`).

## Demo

View the [plugin documentation](http://plugins.krajee.com/file-input) and [plugin demos](http://plugins.krajee.com/file-input/demo) at Krajee JQuery plugins. 

## Pre-requisites  

1. [Bootstrap 3.x](http://getbootstrap.com/)
2. Latest [JQuery](http://jquery.com/)
3. Most modern browsers supporting HTML5 (inputs and FileReader API) including CSS3 & JQuery. For Internet Explorer, one must use IE versions 10 and above. IE9 and below will work as a normal file input, and will not support multiple file selection or the HTML 5 FileReader API.
4. With release 4.0, AJAX uploads are supported. AJAX uploads require that the browser support HTML5 FormData and XHR2 (XMLHttpRequest 2). Most modern browsers support FormData and XHR2. The plugin will automatically degrade to normal form based submission for browsers not supporting AJAX uploads.

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
<link href="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" rel="stylesheet">
<link href="path/to/css/fileinput.min.css" media="all" rel="stylesheet" type="text/css" />
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
<script src="http://netdna.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js" type="text/javascript"></script>
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

#### showCancel
_boolean_ whether to display the file upload cancel button. Defaults to `true`. This will be only enabled and displayed when an AJAX upload is in process.

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

#### initialPreviewDelimiter
_string_, the delimiter to be used for splitting the initial preview content as individual file thumbnails (applicable only if `initialPreview` is passed as a _string_ instead of _array_). Defaults to `*$$*`.

#### initialPreviewConfig
_array_, the configuration for setting up important properties for each `initialPreview` item (that is setup as part of `initialPreview`). Each element in the array should be an object/associative array consisting of the following keys:

    - `caption`: _string_, the caption or filename to display for each initial preview item content.
    - `width`: _string_, the CSS width of the image/content displayed.
    - `url`: _string_, the URL for deleting the image/content in the initial preview via AJAX post response.
    - `key`: _string|object_, the key that will be passed as data to the `url` via AJAX POST.

An example configuration of `initialPreviewConfig` (for the previously set `initialPreviewContent`) can be:

```js
// setup initial preview with data keys 
initialPreview: [
    "<img src='/images/desert.jpg' class='file-preview-image' alt='Desert' title='Desert'>",
    "<img src='/images/jellyfish.jpg' class='file-preview-image' alt='Jelly Fish' title='Jelly Fish'>",
],
// initial preview configuration
initialPreviewConfig: [
    {caption: 'desert.jpg', 'width': '120px', 'url': '/localhost/avatar/delete', 'key': 100},
    {caption: 'jellyfish.jpg', 'width': '120px', 'url': '/localhost/avatar/delete', 'key': 101},
]
```

#### initialPreviewShowDelete
_bool_, whether the delete button will be displayed for each thumbnail that has been created with `initialPreview`.

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
- `icon`: the icon to render before the caption text.
- `caption`: the template for rendering the caption.
- `modal`: the template for rendering the modal (for text file preview zooming).
- `progress`: the template for the progress bar when upload is in progress (for batch/mass uploads). The following tags will be parsed and replaced automatically:
    - `{percent}`: will be replaced with the upload progress percentage.
- `footer`: the template for the footer section of each file preview thumbnail. The following tags will be parsed and replaced automatically:
    - `{actions}`: will be replaced with the output of the `actions` template.
- `actions`: the template for the file action buttons to be displayed within the thumbnail `footer`. The following tags will be parsed and replaced automatically:
    - `{upload}`: will be replaced with the output of the `actionUpload` template.
    - `{delete}`: will be replaced with the output of the `actionDelete` template.
- `actionDelete`: the template for the file delete action button within the thumbnail `footer`. The following tags will be parsed and replaced automatically:
    - `{removeClass}`: the css class for the remove button. Will be replaced with the `removeClass` set within `fileActionSettings`.
    - `{removeIcon}`: the icon for the remove button. Will be replaced with the `removeIcon` set within `fileActionSettings`.
    - `{removeTitle}`: the title to display on hover for the remove button. Will be replaced with the `removeTitle` set within `fileActionSettings`.
    - `{dataUrl}`: the URL for deleting the file thumbnail for `initialPreview` content only. Will be replaced with the `url` set within `initialPreviewConfig`.
    - `{dataKey}`: the key (additional data) that will be passed to the URL above via POST to the AJAX call. Will be replaced with the `key` set within `initialPreviewConfig`.    
- `actionUpload`: the template for the file upload action button within the thumbnail `footer`.
    - `{uploadClass}`: the css class for the upload button. Will be replaced with the `uploadClass` set within `fileActionSettings`.
    - `{uploadIcon}`: the icon for the upload button. Will be replaced with the `uploadIcon` set within `fileActionSettings`.
    - `{uploadTitle}`: the title to display on hover for the upload button. Will be replaced with the `uploadTitle` set within `fileActionSettings`.

The `main1` and `main2` templates would automatically parse the following tags for replacement:

- `{class}`: the CSS class as set in the `mainClass` property.
- `{preview}`: the content parsed by the `previewTemplate` and will be displayed only if `showPreview` is `true`.
- `{caption}`: the content parsed by the `captionTemplate` and will be displayed only if `showCaption` is `true`.
- `{remove}`: the file remove/clear button and will be displayed only if `showRemove` is `true`.
- `{upload}`: the file upload button and will be displayed only if `showUpload` is `true`.
- `{cancel}`: the file upload cancel button that will be displayed when AJAX upload is in process to abort the AJAX upload.
- `{browse}`: the main file browse button to select your files for input.

The `preview` and `caption` templates can understand the following special tags which will be replaced:

- `{class}`: the CSS class as set in the `mainClass`, `captionClass` or `previewClass` properties.

The `layoutTemplates` if not set will default to:

```js
{
    main1: '{preview}\n' +
        '<div class="kv-upload-progress hide"></div>\n' +
        '<div class="input-group {class}">\n' +
        '   {caption}\n' +
        '   <div class="input-group-btn">\n' +
        '       {remove}\n' +
        '       {cancel}\n' +
        '       {upload}\n' +
        '       {browse}\n' +
        '   </div>\n' +
        '</div>',
    main2: '{preview}\n<div class="kv-upload-progress hide"></div>\n{remove}\n{cancel}\n{upload}\n{browse}\n',
    preview: '<div class="file-preview {class}">\n' +
        '    <div class="close fileinput-remove">&times;</div>\n' +
        '    <div class="{dropClass}">\n' +
        '    <div class="file-preview-thumbnails">\n' +
        '    </div>\n' +
        '    <div class="clearfix"></div>' +
        '    <div class="file-preview-status text-center text-success"></div>\n' +
        '    <div class="kv-fileinput-error"></div>\n' +
        '    </div>\n' +
        '</div>',
    icon: '<span class="glyphicon glyphicon-file kv-caption-icon"></span>',
    caption: '<div tabindex="-1" class="form-control file-caption {class}">\n' +
        '   <div class="file-caption-name"></div>\n' +
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
        '</div>',
    progress: '<div class="progress">\n' +
        '    <div class="progress-bar progress-bar-success progress-bar-striped text-center" role="progressbar" aria-valuenow="{percent}" aria-valuemin="0" aria-valuemax="100" style="width:{percent}%;">\n' +
        '        {percent}%\n' +
        '     </div>\n' +
        '</div>',
    footer: '<div class="file-thumbnail-footer">\n' +
        '    <div class="file-caption-name" style="width:{width}">{caption}</div>\n' +
        '    {actions}\n' +
        '</div>',
    actions: '<div class="file-actions">\n' +
        '    <div class="file-footer-buttons">\n' +
        '        {upload}{delete}' +
        '    </div>\n' +
        '    <div class="file-upload-indicator" tabindex="-1" title="{indicatorTitle}">{indicator}</div>\n' +
        '    <div class="clearfix"></div>\n' +
        '</div>',
    actionDelete: '<button type="button" class="kv-file-remove {removeClass}" title="{removeTitle}"{dataUrl}{dataKey}>{removeIcon}</button>\n',
    actionUpload: '<button type="button" class="kv-file-upload {uploadClass}" title="{uploadTitle}">{uploadIcon}</button>\n'

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
    generic: '<div class="file-preview-frame" id="{previewId}" data-fileindex="{fileindex}">\n' +
        '   {content}\n' +
        '   {footer}\n' +
        '</div>\n',
    html: '<div class="file-preview-frame" id="{previewId}" data-fileindex="{fileindex}">\n' +
        '    <object data="{data}" type="{type}" width="{width}" height="{height}">\n' +
        '       ' + DEFAULT_PREVIEW + '\n' +
        '    </object>\n' + 
        '   {footer}\n' +
        '</div>',
    image: '<div class="file-preview-frame" id="{previewId}" data-fileindex="{fileindex}">\n' +
        '   <img src="{data}" class="file-preview-image" title="{caption}" alt="{caption}" ' + STYLE_SETTING + '>\n' +
        '   {footer}\n' +
        '</div>\n',
    text: '<div class="file-preview-frame" id="{previewId}" data-fileindex="{fileindex}">\n' +
        '   <div class="file-preview-text" title="{caption}" ' + STYLE_SETTING + '>\n' +
        '       {data}\n' + 
        '   </div>\n' + 
        '   {footer}\n' +
        '</div>\n',
    video: '<div class="file-preview-frame" id="{previewId}" data-fileindex="{fileindex}" title="{caption}" ' + STYLE_SETTING + '>\n' +
        '   <video width="{width}" height="{height}" controls>\n' +
        '       <source src="{data}" type="{type}">\n' +
        '       ' + DEFAULT_PREVIEW + '\n' +
        '   </video>\n' + 
        '   {footer}\n' +
        '</div>\n',
    audio: '<div class="file-preview-frame" id="{previewId}" data-fileindex="{fileindex}" title="{caption}" ' + STYLE_SETTING + '>\n' +
        '   <audio controls>\n' +
        '       <source src="{data}" type="{type}">\n' +
        '       ' + DEFAULT_PREVIEW + '\n' +
        '   </audio>\n' + 
        '   {footer}\n' +
        '</div>\n',
    flash: '<div class="file-preview-frame" id="{previewId}" data-fileindex="{fileindex}" title="{caption}" ' + STYLE_SETTING + '>\n' +
        '   <object type="application/x-shockwave-flash" width="{width}" height="{height}" data="{data}">\n' +
        OBJECT_PARAMS + '       ' + DEFAULT_PREVIEW + '\n' +
        '   </object>\n' + 
        '   {footer}\n' +
        '</div>\n',
    object: '<div class="file-preview-frame" id="{previewId}" data-fileindex="{fileindex}" title="{caption}" ' + STYLE_SETTING + '>\n' +
        '    <object data="{data}" type="{type}" width="{width}" height="{height}">\n' +
        '      <param name="movie" value="{caption}" />\n' +
        OBJECT_PARAMS + '           ' + DEFAULT_PREVIEW + '\n' +
        '   </object>\n' + 
        '   {footer}\n' +
        '</div>',
    other: '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}" title="{caption}" ' + STYLE_SETTING + '>\n' +
        '   ' + DEFAULT_PREVIEW + '\n' +
        '   {footer}\n' +
        '</div>',
}
```

The values of the constants used in the above templates are as follows:

```
STYLE_SETTING = 'style="width:{width};height:{height};"',
OBJECT_PARAMS = '      &lt;param name="controller" value="true" />\n' +
    '      &lt;param name="allowFullScreen" value="true" />\n' +
    '      &lt;param name="allowScriptAccess" value="always" />\n' +
    '      &lt;param name="autoPlay" value="false" />\n' +
    '      &lt;param name="autoStart" value="false" />\n'+
    '      &lt;param name="quality" value="high" />\n',
DEFAULT_PREVIEW = '&lt;div class="file-preview-other">\n' +
    '       &lt;i class="glyphicon glyphicon-file">&lt;/i>\n' +
    '   &lt;/div>'
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
    html: {width: "213px", height: "160px"},
    text: {width: "160px", height: "160px"},
    video: {width: "213px", height: "160px"},
    audio: {width: "213px", height: "80px"},
    flash: {width: "213px", height: "160px"},
    object: {width: "160px", height: "160px"},
    other: {width: "160px", height: "160px"}
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
_string_ the icon to display before the label for the file picker/remove button. Defaults to `<i class="glyphicon glyphicon-trash"></i> &nbsp;`.

#### removeClass
_string_ the CSS class for the file remove button. Defaults to `btn btn-default`.

#### removeTitle
_string_ the title to display on hover for the file remove button. Defaults to `Clear selected files`.

#### uploadLabel
_string_ the label to display for the file upload button. Defaults to `Upload`.

#### uploadIcon
_string_ the icon to display before the label for the file upload button. Defaults to `<i class="glyphicon glyphicon-upload"></i> &nbsp;`.

#### uploadClass
_string_ the CSS class for the file upload button. Defaults to `btn btn-default`.

#### uploadTitle
_string_ the title to display on hover for the file remove button. Defaults to `Upload selected files`.

#### uploadUrl
_string_ the URL for the upload processing action (typically for ajax based processing). Defaults to `null`. If this is not set or `null`, then the upload button action will default to form submission. NOTE: This is MANDATORY if you want to use advanced features like drag & drop, append/remove files, selectively upload files via ajax etc.

#### uploadExtraData
_object | function_ the extra data that will be passed as data to the url/AJAX server call via POST. This can be setup either as an object (associative array of keys and values) or as a function callback. As an object, it can be set for example as:

```js
 {id: 100, value: '100 Details'}
```

As a function callback, it can be setup for example as:

```js
function() {
    var obj = {};
    $('.your-form-class').find('input').each(function() {
        var id = $(this).attr('id'), val = $(this).val();
        obj[id] = val;
    });
    return obj;
}
```

#### uploadAsync
_bool_ whether the batch upload of multiple files will be asynchronous/in parallel. Defaults to `true`.

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

#### slugCallback
_function_ a callback to convert the filename as a slug string eliminating special characters. If not set, it will use the plugin's own internal `slugDefault` method. This callback function includes the filename as parameter and must return a converted filename string.

**Example:**

```js
slugCallback: function(filename) {
    return filename.replace('(', '_');
}
```

#### dropZoneEnabled
_bool_ whether to enable a drag and drop zone for dragging and dropping files to. This is available only for ajax based uploads. Defaults to `true`. 

#### dropZoneTitle
_string_ title to be displayed in the drag and drop zone. This is available only for ajax based uploads. Defaults to `Drag & drop files here &hellip;`. 

#### dropZoneTitleClass
_string_ CSS class for the drag & drop zone title. Defaults to `file-drop-zone-title`. 

#### fileActionSettings
_object_ configuration for setting up file actions for newly selected file thumbnails in the preview window. The following properties can be set:
    - `removeIcon`: _string_, icon for remove button to be displayed in each file thumbnail.
    - `removeClass`: _string_, CSS class for the remove button in each file thumbnail.
    - `removeTitle`: _string_, title for remove button in each file thumbnail.
    - `uploadIcon`: _string_, icon for upload button to be displayed in each file thumbnail.
    - `uploadClass`: _string_, CSS class for the remove button in each file thumbnail.
    - `uploadTitle`: _string_, title for remove button in each file thumbnail.
    - `indicatorNew`: _string_, an indicator (HTML markup) for new pending upload displayed in each file thumbnail.
    - `indicatorSuccess`: _string_, an indicator (HTML markup) for successful upload displayed in each file thumbnail.
    - `indicatorError`: _string_, an indicator (HTML markup) for error in upload displayed in each file thumbnail.
    - `indicatorLoading`: _string_, an indicator (HTML markup) for ongoing upload displayed in each file thumbnail.
    - `indicatorNewTitle`: _string_, title to display on hover of indicator for new pending upload in each file thumbnail.
    - `indicatorSuccessTitle`: _string_, title to display on hover of indicator for successful in each file thumbnail.
    - `indicatorErrorTitle`: _string_, title to display on hover of indicator for error in upload in each file thumbnail.
    - `indicatorLoadingTitle`: _string_, title to display on hover of indicator for ongoing upload in each file thumbnail.

Defaults to the following setting:
```js
{
    removeIcon: '<i class="glyphicon glyphicon-trash text-danger"></i>',
    removeClass: 'btn btn-xs btn-default',
    removeTitle: 'Remove file',
    uploadIcon: '<i class="glyphicon glyphicon-upload text-info"></i>',
    uploadClass: 'btn btn-xs btn-default',
    uploadTitle: 'Upload file',
    indicatorNew: '<i class="glyphicon glyphicon-hand-down text-warning"></i>',
    indicatorSuccess: '<i class="glyphicon glyphicon-ok-sign file-icon-large text-success"></i>',
    indicatorError: '<i class="glyphicon glyphicon-exclamation-sign text-danger"></i>',
    indicatorLoading: '<i class="glyphicon glyphicon-hand-up text-muted"></i>',
    indicatorNewTitle: 'Not uploaded yet',
    indicatorSuccessTitle: 'Uploaded',
    indicatorErrorTitle: 'Upload Error',
    indicatorLoadingTitle: 'Uploading ...'
}
```

#### otherActionButtons
_string_ markup for additional action buttons to display within the initial preview thumbnails (for example displaying an image edit button). The following tags can be used in the markup and will be automatically replaced:

- `{dataKey}`: Will be replaced with the `key` set within `initialPreviewConfig`.    

#### textEncoding
_string_ the encoding to be used while reading a text file. Applicable only for previewing text files. Defaults to `UTF-8`. 

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

- `file`: the file object instance
- `previewId`: the identifier for the preview file container
- `index`: the zero-based sequential index of the loaded file in the preview list
- `reader`: the FileReader instance if available
- `jqXHR`: the `jQuery XMLHttpRequest` object used for this transaction (if available).

**Example:**
```js
$('#input-id').on('fileerror', function(event, file, previewId, index) {
    console.log("fileerror");
});
```

#### fileloaded
This event is triggered after a file is loaded in the preview. Additional parameters available 
are: 

- `file`: the file object instance
- `previewId`: the identifier for the preview file container
- `index`: the zero-based sequential index of the loaded file in the preview list
- `reader`: the FileReader instance if available

**Example:**
```js
$('#input-id').on('fileloaded', function(event, file, previewId, index, reader) {
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

- `previewId`: the identifier for the preview file container

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

#### filelock
This event is triggered when the upload process is launched by clicking a upload button, and the entire widget is locked (disabled) until upload is getting processed. Only the `Cancel` button will be enabled when the file input is locked. Additional parameters available are: 

- `filestack`: the array of selected file objects.
- `extraData`: the `uploadExtraData` settings for the plugin (will return an empty object if not set).

```js
$('#input-id').on('filelock', function(event, filestack, extraData) {
    var fstack = filestack.filter(function(n){ return n != undefined });
    console.log('Files selected - ' + fstack.length);
});
```

#### fileunlock
This event is triggered when the upload process is completed (successfully or with error). The entire widget is unlocked (enabled) and reverts to initial state. Additional parameters available are: 

- `filestack`: the array of selected file objects.
- `extraData`: the `uploadExtraData` settings for the plugin (will return an empty object if not set).

```js
$('#input-id').on('fileunlock', function(event, filestack, extraData) {
    var fstack = filestack.filter(function(n){ return n != undefined });
    console.log('Files selected - ' + fstack.length);
});
```

#### filepredelete
This event is triggered before deletion of each thumbnail file in the `initialPreview` content set. Additional parameters available are: 

- `key`: the key passed within `initialPreviewConfig` for the selected file for delete.
- `jqXHR`: the `jQuery XMLHttpRequest` object used for this transaction (if available).

```js
$('#input-id').on('filepredelete', function(event, key, jqXHR) {
    console.log('Key = ' + key);
});
```

#### filedeleted
This event is triggered after deletion of each thumbnail file in the `initialPreview` content set. Additional parameters available are: 

- `key`: the key passed within `initialPreviewConfig` for the selected file that will be passed as POST data to the `url`.
- `jqXHR`: the `jQuery XMLHttpRequest` object used for this transaction (if available).

```js
$('#input-id').on('filedelete', function(event, key) {
    console.log('Key = ' + key);
});
```

```js
$('#input-id').on('fileunlock', function(event, filestack) {
    var fstack = filestack.filter(function(n){ return n != undefined });
    console.log('Files selected - ' + fstack.length);
});
```

#### filedeleteerror
This event is triggered when an error is faced in deletion of each thumbnail file in the `initialPreview` content set. Additional parameters available are: 

- `data`: this is always null for `filedeleteerror`.
- `previewId`: the identifier of the preview thumbnail container.
- `index`: the zero-based index of the file in the preview container.
- `jqXHR`: the `jQuery XMLHttpRequest` object used for this transaction (if available).

```js
$('#input-id').on('filedeleteerror', function(event, data, preview, index) {
    console.log('File delete error');
});
```

#### filepreupload
This event is triggered before upload of each thumbnail file. Additional parameters available are: 

- `data`: This is a data object (associative array) that sends the following information, whose keys are:
    - `form`: the FormData object which is passed via XHR2 (or empty object if not available).
    - `files`: the file stack array (or empty object if not available).
    - `extra`: the `uploadExtraData` settings for the plugin (or empty object if not available).
    - `response`: the data sent via ajax response (or empty object if not available).
    - `reader`: the FileReader instance if available
    - `jqXHR`: the `jQuery XMLHttpRequest` object used for this transaction (if available).
- `previewId`: the identifier of the preview thumbnail container.
- `index`: the zero-based index of the file in the preview container.

```js
$('#input-id').on('filepreupload', function(event, data, previewId, index, jqXHR) {
    var form = data.form, files = data.files, extra = data.extra, 
        response = data.response, reader = data.reader;
    console.log('File pre upload triggered');
});
```

#### fileuploaded
This event is triggered after upload is completed for each thumbnail file. Note this event is also triggered for 
asynchronous batch uploads after each file in the selection is uploaded via ajax. Additional parameters available are: 

- `data`: This is a data object (associative array) that sends the following information, whose keys are:
    - `form`: the FormData object which is passed via XHR2 (or empty object if not available).
    - `files`: the file stack array (or empty object if not available).
    - `extra`: the `uploadExtraData` settings for the plugin (or empty object if not available).
    - `response`: the data sent via ajax response (or empty object if not available).
    - `reader`: the FileReader instance if available
    - `jqXHR`: the `jQuery XMLHttpRequest` object used for this transaction (if available).
- `previewId`: the identifier of each file's parent thumbnail div element in the preview window.
- `index`: the zero-based index of the file in the file stack.

```js
$('#input-id').on('fileuploaded', function(event, data, previewId, index) {
    var form = data.form, files = data.files, extra = data.extra, 
        response = data.response, reader = data.reader;
    console.log('File uploaded triggered');
});
```

#### fileuploaderror
This event is triggered when an upload or file input validation error is encountered primarily for ajax uploads. Additional parameters available are: 

- `data`: This is a data object (associative array) that sends the following information, whose keys are:
    - `form`: the FormData object which is passed via XHR2 (or empty object if not available).
    - `files`: the file stack array (or empty object if not available).
    - `extra`: the `uploadExtraData` settings for the plugin (or empty object if not available).
    - `response`: the data sent via ajax response (or empty object if not available).
    - `reader`: the FileReader instance if available
    - `jqXHR`: the `jQuery XMLHttpRequest` object used for this transaction (if available).
- `previewId`: the identifier of each file's parent thumbnail div element in the preview window.
- `index`: the zero-based index of the file in the file stack.

```js
$('#input-id').on('fileuploaderror', function(event, data, previewId, index) {
    var form = data.form, files = data.files, extra = data.extra, 
        response = data.response, reader = data.reader;
    console.log('File upload error');
});
```

#### filebatchpreupload
This event is triggered before a batch upload (for both synchronous and asynchronous uploads) after the upload button is clicked. 
Additional parameters available are: 

- `data`: This is a data object (associative array) that sends the following information, whose keys are:
    - `form`: the FormData object which is passed via XHR2 (or empty object if not available).
    - `files`: the file stack array (or empty object if not available).
    - `extra`: the `uploadExtraData` settings for the plugin (or empty object if not available).
    - `response`: the data sent via ajax response (or empty object if not available).
    - `reader`: the FileReader instance if available
    - `jqXHR`: the `jQuery XMLHttpRequest` object used for this transaction (if available).

```js
$('#input-id').on('filebatchpreupload', function(event, data, jqXHR) {
    var form = data.form, files = data.files, extra = data.extra, 
        response = data.response, reader = data.reader;
    console.log('File batch pre upload triggered');
});
```

#### filebatchuploadsuccess
This event is triggered after a successful synchronous batch upload (i.e. when `uploadAsync` is `false`). Additional parameters available are: 

- `data`: This is a data object (associative array) that sends the following information, whose keys are:
    - `form`: the FormData object which is passed via XHR2 (or empty object if not available).
    - `files`: the file stack array (or empty object if not available).
    - `extra`: the `uploadExtraData` settings for the plugin (or empty object if not available).
    - `response`: the data sent via ajax response (or empty object if not available).
    - `reader`: the FileReader instance if available

```js
$('#input-id').on('filebatchuploadsuccess', function(event, data) {
    var form = data.form, files = data.files, extra = data.extra, 
        response = data.response, reader = data.reader;
    console.log('File batch upload success');
});
```

#### filebatchuploaderror
This event is triggered when any error is faced in the synchronous batch upload (i.e. when `uploadAsync` is `false`). Additional parameters available are: 

- `data`: This is a data object (associative array) that sends the following information, whose keys are:
    - `form`: the FormData object which is passed via XHR2 (or empty object if not available).
    - `files`: the file stack array (or empty object if not available).
    - `extra`: the `uploadExtraData` settings for the plugin (or empty object if not available).
    - `response`: the data sent via ajax response (or empty object if not available).
    - `reader`: the FileReader instance if available
    - `jqXHR`: the `jQuery XMLHttpRequest` object used for this transaction (if available).

```js
$('#input-id').on('filebatchuploaderror', function(event, data) {
    var form = data.form, files = data.files, extra = data.extra, 
        response = data.response, reader = data.reader;
    console.log('File upload error');
});
```

#### filebatchuploadcomplete
This event is triggered after completion of either the synchronous OR asynchronous ajax batch upload. Additional parameters available are: 

- `files`: the file stack array (or empty object if not available).
- `extra`: the `uploadExtraData` settings for the plugin (or empty object if not available).

```js
$('#input-id').on('filebatchuploadcomplete', function(event, files, extra) {
    console.log('File batch upload complete');
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
