bootstrap-fileinput
====================

[![Bower version](https://badge.fury.io/bo/bootstrap-fileinput.svg)](http://badge.fury.io/bo/bootstrap-fileinput)
[![Latest Stable Version](https://poser.pugx.org/kartik-v/bootstrap-fileinput/v/stable)](https://packagist.org/packages/kartik-v/bootstrap-fileinput)
[![License](https://poser.pugx.org/kartik-v/bootstrap-fileinput/license)](https://packagist.org/packages/kartik-v/bootstrap-fileinput)
[![Packagist Downloads](https://poser.pugx.org/kartik-v/bootstrap-fileinput/downloads)](https://packagist.org/packages/kartik-v/bootstrap-fileinput)
[![Monthly Downloads](https://poser.pugx.org/kartik-v/bootstrap-fileinput/d/monthly)](https://packagist.org/packages/kartik-v/bootstrap-fileinput)

An enhanced HTML 5 file input for Bootstrap 3.x with file preview for various files, offers multiple selection, and more. The plugin allows you a simple way to setup an advanced file picker/upload control built to work specially with Bootstrap CSS3 styles. It enhances the file input functionality further, by offering support to preview a wide variety of files i.e. images, text, html, video, audio, flash, and objects. In addition, it includes AJAX based uploads, dragging &amp; dropping files, viewing upload progress, and selectively previewing, adding, or deleting files.
![File Input Screenshot](https://lh3.googleusercontent.com/-3FiEmc_okc4/VBw_d2LBAJI/AAAAAAAAAL8/KbVj5X9Dus0/w596-h454-no/FileInput.jpg)

This plugin was initially inspired by [this blog article](http://www.abeautifulsite.net/blog/2013/08/whipping-file-inputs-into-shape-with-bootstrap-3/) and [Jasny's File Input plugin](http://jasny.github.io/bootstrap/javascript/#fileinput). But the plugin has now matured with various additional features and enhancements to be a complete (yet simple) file management tool and solution for web developers. 

> NOTE: The latest version of the plugin v4.2.1 has been released. Refer the [CHANGE LOG](https://github.com/kartik-v/bootstrap-fileinput/blob/master/CHANGE.md) for details. 

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
26. Manipulate events and add your own custom validation messages easily by returning output to abort uploads in any of the other events.
27. Support for translations and locales.

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
13. Automatically refresh preview with content from server as soon as an ajax upload finishes.

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
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
<link href="path/to/css/fileinput.min.css" media="all" rel="stylesheet" type="text/css" />
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="path/to/js/fileinput.min.js"></script>
<!-- bootstrap.js below is only needed if you wish to the feature of viewing details
     of text file preview via modal dialog -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js" type="text/javascript"></script>
<!-- optionally if you need translation for your language then include 
    locale file as mentioned below -->
<script src="path/to/js/fileinput_locale_<lang>.js"></script>
```

If you noticed, you need to load the `jquery.min.js` and `bootstrap.min.css` in addition to the `fileinput.min.css` and `fileinput.min.js`. The locale file `fileinput_locale_<lang>.js` can be optionally included for translating for your language if needed.

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

## Translations

As shown in the installation section, translations are now enabled with release 4.1.8. You can load a locale file `/fileinput_locale_<lang>.js` after the core `fileinput.min.js` file, where `<lang>` is the language code (e.g. `de`, `fr` etc.). If  locale file does not exist, you can submit a translation for the new language via a [new pull request to add to this folder](https://github.com/kartik-v/bootstrap-fileinput/tree/master/js). Use the [sample locale file](https://github.com/kartik-v/bootstrap-fileinput/tree/master/js/fileinput_locale_LANG.js) to copy and create a translation configuration for your own language.

## Plugin Options
The plugin supports these following options:

### language
_string_ language configuration for the plugin to enable the plugin to display messages for your locale (you must set the ISO code for the language). You can have multiple language widgets on the same page. The locale JS file for the language code must be defined as mentioned in the translations section. The file must be loaded after `fileinput.js`.

### showCaption
_boolean_ whether to display the file caption. Defaults to `true`.

### showPreview
_boolean_ whether to display the file preview. Defaults to `true`.

### showRemove
_boolean_ whether to display the file remove/clear button. Defaults to `true`.

### showUpload
_boolean_ whether to display the file upload button. Defaults to `true`. This will default to a form submit button, unless the uploadUrl is specified.

### showCancel
_boolean_ whether to display the file upload cancel button. Defaults to `true`. This will be only enabled and displayed when an AJAX upload is in process.

### showUploadedThumbs
_boolean_ whether to persist display of the uploaded file thumbnails in the preview window (for ajax uploads) until the remove/clear button is pressed. Defaults to `true`.  When set to `false`, a next batch of files selected for upload will clear these thumbnails from preview.

### captionClass
_string_ any additional CSS class to append to the caption container.

### previewClass
_string_ any additional CSS class to append to the preview container.

### mainClass
_string_ any additional CSS class to append to the main plugin container.

### initialDelimiter
_string_, the delimiter to be used to allow passing multiple content delimited as a string to `initialPreview`. Defaults to `'*$$*'`.

### initialPreview
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

### initialPreviewCount
_int_, the count of initial preview items that will be added to the count of files selected in preview. This is applicable when displaying
the right caption, when `overwriteInitial` is set to `false`.

### initialPreviewDelimiter
_string_, the delimiter to be used for splitting the initial preview content as individual file thumbnails (applicable only if `initialPreview` is passed as a _string_ instead of _array_). Defaults to `*$$*`.

### initialPreviewConfig
_array_, the configuration for setting up important properties for each `initialPreview` item (that is setup as part of `initialPreview`). Each element in the array should be an object/associative array consisting of the following keys:

    - `caption`: _string_, the caption or filename to display for each initial preview item content.
    - `width`: _string_, the CSS width of the image/content displayed.
    - `url`: _string_, the URL for deleting the image/content in the initial preview via AJAX post response. This will default to `deleteUrl` if not set.
    - `key`: _string|object_, the key that will be passed as data to the `url` via AJAX POST.
    - `frameClass`: _string_, the additional frame css class to set for the file's thumbnail frame.
    - `frameAttr`: _object_, the HTML attribute settings (set as key:value pairs) for the thumbnail frame.
    - `extra`: _object|function_, the extra data that will be passed as data to the initial preview delete url/AJAX server call via POST. This will default to `deleteExtraData` if not set.

An example configuration of `initialPreviewConfig` (for the previously set `initialPreviewContent`) can be:

```js
// setup initial preview with data keys 
initialPreview: [
    "<img src='/images/desert.jpg' class='file-preview-image' alt='Desert' title='Desert'>",
    "<img src='/images/jellyfish.jpg' class='file-preview-image' alt='Jelly Fish' title='Jelly Fish'>",
],
// initial preview configuration
initialPreviewConfig: [
    {
        caption: 'desert.jpg', 
        width: '120px', 
        url: '/localhost/avatar/delete', 
        key: 100, 
        extra: {id: 100}
    },
    {
        caption: 'jellyfish.jpg', 
        width: '120px', 
        url: '/localhost/avatar/delete', 
        key: 101, 
        frameClass: 'my-custom-frame-css',
        frameAttr: {
            style: 'height:80px',
            title: 'My Custom Title',
        },
        extra: function() { 
            return {id: $("#id").val()};
        },
    }
]
```

> Note: The ajax delete action will send the following data to server via POST:
- `key`: the key setting as setup in `initialPreviewConfig['key']`
- any other extra data as `key: value` pairs passed either via `initialPreviewConfig['extra']` OR `deleteExtraData` format if former is not set.

### initialPreviewShowDelete
_bool_, whether the delete button will be displayed for each thumbnail that has been created with `initialPreview`.

### previewThumbTags
_array_, this will be a list of tags used in thumbnail templates that will be replaced dynamically within the thumbnail markup, when the thumbnail is rendered. For example:

```js
// change thumbnail footer template
layoutTemplates.footer = '<div class="file-thumbnail-footer">\n' +
'    <div class="file-caption-name">{caption}</div>\n' +
'    {CUSTOM_TAG_NEW}\n' +
'    {CUSTOM_TAG_INIT}\n' +
'    {actions}\n' +
'</div>';

// set preview template tags
previewThumbTags = {
    '{CUSTOM_TAG_NEW}': '<span class="custom-css">CUSTOM MARKUP</span>',
    '{CUSTOM_TAG_INIT}': '&nbsp;'
};
```

### initialPreviewThumbTags
_array_, this is an extension of `previewThumbTags` specifically for initial preview content - but will be configured as an array of objects corresponding to each initial preview thumbnail. The initial preview thumbnails set via `initialPreview` will read this configuration for replacing tags. Extending example above:


```js
// change thumbnail footer template
layoutTemplates.footer = '<div class="file-thumbnail-footer">\n' +
'    <div class="file-caption-name">{caption}</div>\n' +
'    {CUSTOM_TAG_NEW}\n' +
'    {CUSTOM_TAG_INIT}\n' +
'    {actions}\n' +
'</div>';

// setup initial preview with data keys 
initialPreview: [
    "<img src='/images/desert.jpg' class='file-preview-image' alt='Desert' title='Desert'>",
    "<img src='/images/jellyfish.jpg' class='file-preview-image' alt='Jelly Fish' title='Jelly Fish'>",
],

// set initial preview template tags
initialPreviewThumbTags = {
    '{CUSTOM_TAG_NEW}': '&nbsp;',
    '{CUSTOM_TAG_INIT}': '<span class="custom-css">CUSTOM MARKUP</span>'
};
```

### deleteExtraData
_object | function_ the extra data that will be passed as data to the initial preview delete url/AJAX server call via POST. This will be overridden by the `initialPreviewConfig['extra']` property. This can be setup either as an object (associative array of keys and values) or as a function callback. As an object, it can be set for example as:

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
### deleteUrl
_object | function_ the URL for deleting the image/content in the initial preview via AJAX post response. This will be overridden by the `initialPreviewConfig['url']` property.

### initialCaption
_string_ the initial preview caption text to be displayed. If you do not set a value here and `initialPreview` is set to 
`true` this will default to `"{preview-file-count} files selected"`, where `{preview-file-count}` is the count of the 
files passed in `initialPreview`.

### overwriteInitial
_boolean_ whether you wish to overwrite the initial preview content and caption setup. This defaults to `true`, whereby, any `initialPreview` content set 
will be overwritten, when new file is uploaded or when files are cleared. Setting it to `false` will help displaying a saved image or file from database always - 
useful especially when using the `multiple` file upload feature.
 
### layoutTemplates

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

Similarly, the `progress` layout template can understand the following special tags which will be replaced:

- `{class}`: the CSS class as set in the `progressClass` or `progressCompleteClass` properties.

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
        '   <span class="file-caption-ellipsis">&hellip;</span>\n' +
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
        '    <div class="{class}" role="progressbar" aria-valuenow="{percent}" aria-valuemin="0" aria-valuemax="100" style="width:{percent}%;">\n' +
        '        {percent}%\n' +
        '     </div>\n' +
        '</div>',
    footer: '<div class="file-thumbnail-footer">\n' +
        '    <div class="file-caption-name" style="width:{width}">{caption}</div>\n' +
        '    {actions}\n' +
        '</div>',
    actions: '<div class="file-actions">\n' +
        '    <div class="file-footer-buttons">\n' +
        '        {upload}{delete}{other}' +
        '    </div>\n' +
        '    <div class="file-upload-indicator" tabindex="-1" title="{indicatorTitle}">{indicator}</div>\n' +
        '    <div class="clearfix"></div>\n' +
        '</div>',
    actionDelete: '<button type="button" class="kv-file-remove {removeClass}" title="{removeTitle}"{dataUrl}{dataKey}>{removeIcon}</button>\n',
    actionUpload: '<button type="button" class="kv-file-upload {uploadClass}" title="{uploadTitle}">{uploadIcon}</button>\n'
};
```

### previewTemplates

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

```js
STYLE_SETTING = 'style="width:{width};height:{height};"',
OBJECT_PARAMS = '      <param name="controller" value="true" />\n' +
    '      <param name="allowFullScreen" value="true" />\n' +
    '      <param name="allowScriptAccess" value="always" />\n' +
    '      <param name="autoPlay" value="false" />\n' +
    '      <param name="autoStart" value="false" />\n'+
    '      <param name="quality" value="high" />\n',
DEFAULT_PREVIEW = '<div class="file-preview-other">\n' +
    '       <i class="glyphicon glyphicon-file"></i>\n' +
    '   </div>'
```

### allowedFileTypes

_array_ the list of allowed file types for upload. This by default is set to null which means the plugin supports all file types for upload. If an 
invalid file type is found, then a validation error message as set in `msgInvalidFileType` will be raised. The following types as set in `fileTypeSettings` 
are available for setup. 

```js
['image', 'html', 'text', 'video', 'audio', 'flash', 'object']
```

### allowedFileExtensions

_array_ the list of allowed file extensions for upload. This by default is set to null which means the plugin supports all file extensions for upload. If an 
invalid file extension is found, then a validation error message as set in `msgInvalidFileExtension` will be raised. An example of setting this could be:

```js
['jpg', 'gif', 'png', 'txt']
```

> NOTE: You need to be careful in case you are setting both `allowedFileTypes` and `allowedFileExtensions`. In this case, the `allowedFileTypes` property 
is validated first and generally precedes the `allowedFileExtensions` setting (and the latter validation maybe skipped).

### allowedPreviewTypes

_array_ the list of allowed preview types for your widget. This by default supports all file types for preview. The plugin by default treats each
file as an object if it does not match any of the previous types. To disable this behavior, you can remove `object` from the list of `allowedPreviewTypes`
OR fine tune it through `allowedPreviewMimeTypes`.

This is by default setup as following:
```js
['image', 'html', 'text', 'video', 'audio', 'flash', 'object']
```

### allowedPreviewMimeTypes

_array_ the list of allowed mime types for preview. This is set to null by default which means all possible mime types are allowed. This setting works in combination with `allowedPreviewTypes` to filter only the needed file types allowed for preview. You can check this [list of allowed mime types](http://www.sitepoint.com/web-foundations/mime-types-complete-list/) to add to this list if needed.

### customLayoutTags

_object_ the list of additional custom tags that will be replaced in the **layout** templates. This should be an associative array object of `key: value` pairs, where:

- `key`: _string_, is the tag to be replaced and as a standard is recommended to be enclosed between braces.
- `value`: _string|function_, is the value that will replace the tag key above. This can be setup either as a string or callback function.

For example:

```js
// example 1 - tags with value set as string
customLayoutTags: {
    '{tagA}': '<span class="label label-default">Tag A</span>',
    '{tagB}': 'Tag B',
}

// example 2 - tags with value set as callback
customLayoutTags: {
    '{tagC}': function() {
        return $("#element-id").val();
    }
}
```

### customPreviewTags

_object_ the list of additional custom tags that will be replaced in the **preview** templates. This should be an associative array object of `key: value` pairs, where:

- `key`: _string_, is the tag to be replaced and as a standard is recommended to be enclosed between braces.
- `value`: _string|function_, is the value that will replace the tag key above. This can be setup either as a string or callback function.

For example:

```js
// example 1 - tags with value set as string
customPreviewTags: {
    '{tagA}': '<span class="label label-default">Tag A</span>',
    '{tagB}': 'Tag B',
}

// example 2 - tags with value set as callback
customPreviewTags: {
    '{tagC}': function() {
        return $("#element-id").val();
    }
}
```
### previewSettings

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

### fileTypeSettings

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

### previewFileIcon
_string_ the icon to be shown in each preview file thumbnail when an unreadable file type for preview is detected. Defaults to `<i class="glyphicon glyphicon-file"></i>`.

### browseLabel
_string_ the label to display for the file picker/browse button. Defaults to `Browse &hellip;`.

### browseIcon
_string_ the icon to display before the label for the file picker/browse button. Defaults to `<i class="glyphicon glyphicon-folder-open"></i> &nbsp;`.

### browseClass
_string_ the CSS class for the file picker/browse button. Defaults to `btn btn-primary`.

### removeLabel
_string_ the label to display for the file remove button. Defaults to `Remove`.

### removeIcon
_string_ the icon to display before the label for the file picker/remove button. Defaults to `<i class="glyphicon glyphicon-trash"></i> &nbsp;`.

### removeClass
_string_ the CSS class for the file remove button. Defaults to `btn btn-default`.

### removeTitle
_string_ the title to display on hover for the file remove button. Defaults to `Clear selected files`.

### cancelLabel
_string_ the label to display for the file cancel button. Defaults to `Cancel`.

### cancelIcon
_string_ the icon to display before the label for the file picker/remove button. Defaults to `<i class="glyphicon glyphicon-ban-circle"></i> &nbsp;`.

### cancelClass
_string_ the CSS class for the file cancel button. Defaults to `btn btn-default`.

### cancelTitle
_string_ the title to display on hover for the file cancel button. Defaults to `Abort ongoing upload`.

### uploadLabel
_string_ the label to display for the file upload button. Defaults to `Upload`.

### uploadIcon
_string_ the icon to display before the label for the file upload button. Defaults to `<i class="glyphicon glyphicon-upload"></i> &nbsp;`.

### uploadClass
_string_ the CSS class for the file upload button. Defaults to `btn btn-default`.

### uploadTitle
_string_ the title to display on hover for the file remove button. Defaults to `Upload selected files`.

### uploadUrl
_string_ the URL for the upload processing action (typically for ajax based processing). Defaults to `null`. If this is not set or `null`, then the upload button action will default to form submission. NOTE: This is MANDATORY if you want to use advanced features like drag & drop, append/remove files, selectively upload files via ajax etc.

### uploadAsync
_bool_ whether the batch upload of multiple files will be asynchronous/in parallel. Defaults to `true`.

### uploadExtraData
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

### maxFileSize
_float_ the maximum file size for upload in KB.  If set to `0`, it means size allowed is unlimited. Defaults to `0`.

### minFileCount
_int_ the minimum number of files allowed for each multiple upload. If set to `0`, it means number of files are optional. Defaults to `0`.

### maxFileCount
_int_ the maximum number of files allowed for each multiple upload. If set to `0`, it means number of files allowed is unlimited. Defaults to `0`.

### msgSizeTooLarge
_string_ the message to be displayed when the file size exceeds maximum size. Defaults to:

```
File "{name}" (<b>{size} KB</b>) exceeds maximum allowed upload size of <b>{maxSize} KB</b>. Please retry your upload!
```
where:

- `{name}`: will be replaced by the file name being uploaded
- `{size}`: will be replaced by the uploaded file size
- `{maxSize}`: will be replaced by the `maxFileSize` parameter.

### msgFilesTooLess
_string_ the message to be displayed when the file count is less than the minimum count as set in `minFileCount`. Defaults to:

```
You must select at least <b>{n}</b> {files} to upload. Please retry your upload!
```

where:

- `{n}`: will be replaced by the allowed minimum files as set in `minFileCount`
- `{files}`: will be replaced with `fileSingle` or `filePlural` properties in locale file depending on the `minFileCount`.

### msgFilesTooMany
_string_ the message to be displayed when the file count exceeds maximum count as set in `maxFileCount`. Defaults to:

```
Number of files selected for upload <b>({n})</b> exceeds maximum allowed limit of <b>{m}</b>. Please retry your upload!
```

where:

- `{n}`: will be replaced by number of files selected for upload
- `{m}`: will be replaced by the allowed maximum files as set in `maxFileCount`

### msgFileNotFound
_string_ the exception message to be displayed when the file selected is not found by the FileReader. Defaults to:

```
File "{name}" not found!
```
where:

- `{name}`: will be replaced by the file name being uploaded

### msgFileSecured
_string_ the exception message to be displayed when the file selected is not allowed to be accessed due to a security exception. Defaults to:

```
Security restrictions prevent reading the file "{name}".
```
where:

- `{name}`: will be replaced by the file name being uploaded

### msgFileNotReadable
_string_ the exception message to be displayed when the file selected is not readable by the FileReader API. Defaults to:

```
File "{name}" is not readable.
```
where:

- `{name}`: will be replaced by the file name being uploaded

### msgFilePreviewAborted
_string_ the exception message to be displayed when the file preview upload is aborted. Defaults to:

```
File preview aborted for "{name}".
```
where:

- `{name}`: will be replaced by the file name being uploaded

### msgFilePreviewError
_string_ the exception message to be displayed for any other error when previewing the file. Defaults to:

```
An error occurred while reading the file "{name}".
```
where:

- `{name}`: will be replaced by the file name being uploaded

### msgInvalidFileType
_string_ the message to be displayed when the file type is not in one of the file types set in `allowedFileTypes`. Defaults to:

```
Invalid type for file "{name}". Only "{types}" files are supported.
```
where:

- `{name}`: will be replaced by the file name being uploaded
- `{types}`: will be replaced by the comma separated list of types defined in `allowedFileTypes`.

### msgInvalidFileExtension
_string_ the message to be displayed when the file type is not in one of the file extensions set in `allowedFileExtensions`. Defaults to:

```
Invalid extension for file "{name}". Only "{extensions}" files are supported.
```
where:

- `{name}`: will be replaced by the file name being uploaded
- `{extensions}`: will be replaced by the comma separated list of extensions defined in `allowedFileExtensions`.

### msgValidationError
_string_ the exception message to be displayed within the caption container (instead of `msgFilesSelected`), 
when a validation error is encountered. Defaults to `File Upload Error`.

### msgValidationErrorClass
_string_ the css class for the validation error message displayed in the caption container. Defaults to `text-danger`.

### msgValidationErrorIcon
_string_ the icon to be displayed before the validation error in the caption container. Defaults to `<i class="glyphicon glyphicon-exclamation-sign"></i> `.

### msgErrorClass
_string_ the css class for the error message to be displayed in the preview window when the file size exceeds `maxSize`. Defaults to `file-error-message`.

### msgLoading
_string_ the message displayed when the files are getting read and loaded for preview. Defaults to 

```Loading  file {index} of {files} &hellip;```

The following special variables will be replaced:

- `{index}`: the sequence number of the current file being loaded.
- `{files}`: the total number of files selected for upload.

### msgProgress
_string_ the progress message displayed as each file is loaded for preview. Defaults to:

```Loading file {index} of {files} - {name} - {percent}% completed.```

The following variables will be replaced:

- `{index}`: the sequence number of the current file being loaded.
- `{files}`: the total number of files selected for upload.
- `{percent}`: the percentage of file read and loaded.
- `{name}`: the name of the current file being loaded.

### msgSelected
_string_ the progress message displayed in caption window when multiple (more than one) files are selected. Defaults to `{n} files selected`. The following variables will be replaced:

- `{n}`: the number of files selected.

### msgFoldersNotAllowed
_string_ the message displayed when a folder has been dragged to the drop zone. Defaults to `Drag & drop files only! {n} folder(s) dropped were skipped.`. The following variables will be replaced The following variables will be replaced:

- `{n}`: the number of folders dropped.

### progressClass
_string_ the upload progress bar CSS class to be applied when AJAX upload is in process (applicable only for ajax uploads). Defaults to `progress-bar progress-bar-success progress-bar-striped active`. 

### progressCompleteClass
_string_ the upload progress bar CSS class to be applied when AJAX upload is complete. Defaults to `progress-bar progress-bar-success`. 

### previewFileType
_string_ the type of files that are to be displayed in the preview window. Defaults to `image`. Can be one of the following:

- `image`: Only `image` type files will be shown in preview.
- `text`:  Only `text` type files will be shown in preview.
- `any`: Both `image` and `text` files content will be shown in preview.

Files other than `image` or `text` will be displayed as a thumbnail with the filename in the preview window.

### wrapTextLength
_integer_ the number of characters after which the content will be stripped/wrapped for text preview. Defaults to `250`.

### wrapIndicator
_string_ the type of files that are to be displayed in the preview window. Defaults to ` <span class="wrap-indicator" title="{title}">[&hellip;]</span>`.  The following variables will be replaced:

- `{title}`: the content of the entire text file that will be displayed as a span title element.

### elErrorContainer
_string_ the identifier for the container element displaying the error (e.g. `'#id'`). If not set, will default to the container with CSS class `kv-fileinput-error` inside the preview container (identified by `elPreviewContainer`). The `msgErrorClass` will be automatically appended to this container before displaying the error.

### elCaptionContainer
_string_ the identifier for the container element containing the caption (e.g. `'#id'`). If not set, will default to the container with CSS class `file-caption` inside the main plugin container.

### elCaptionText
_string_ the identifier for the container element containing the caption text (e.g. `'#id'`). If not set, will default to the container with CSS class `file-caption-name` inside the main plugin container.

### elPreviewContainer
_string_ the identifier for the container element containing the preview (e.g. `'#id'`). If not set, will default to the container with CSS class `file-preview` inside the main plugin container.

### elPreviewImage
_string_ the identifier for the element containing the preview image thumbnails (e.g. `'#id'`). If not set, will default to the container with CSS class `file-preview-thumbnails` inside the main plugin container.

### elPreviewStatus
_string_ the identifier for the element containing the preview progress status (e.g. `'#id'`). If not set, will default to the container with CSS class `file-preview-status` inside the main plugin container.

### slugCallback
_function_ a callback to convert the filename as a slug string eliminating special characters. If not set, it will use the plugin's own internal `slugDefault` method. This callback function includes the filename as parameter and must return a converted filename string.

**Example:**

```js
slugCallback: function(filename) {
    return filename.replace('(', '_');
}
```

### dropZoneEnabled
_bool_ whether to enable a drag and drop zone for dragging and dropping files to. This is available only for ajax based uploads. Defaults to `true`. 

### dropZoneTitle
_string_ title to be displayed in the drag and drop zone. This is available only for ajax based uploads. Defaults to `Drag & drop files here &hellip;`. 

### dropZoneTitleClass
_string_ CSS class for the drag & drop zone title. Defaults to `file-drop-zone-title`. 

### fileActionSettings
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

### otherActionButtons
_string_ markup for additional action buttons to display within the initial preview thumbnails (for example displaying an image edit button). The following tags can be used in the markup and will be automatically replaced:

- `{dataKey}`: Will be replaced with the `key` set within `initialPreviewConfig`.    

### textEncoding
_string_ the encoding to be used while reading a text file. Applicable only for previewing text files. Defaults to `UTF-8`. 

### ajaxSettings
_object_ additional ajax settings to pass to the plugin before submitting the ajax request. Applicable only for ajax uploads. This can be useful to pass additional tokens to headers or one can use it for setting other ajax options for advanced cases. Refer the [jQuery ajax documentation](http://api.jquery.com/jQuery.ajax/) for the various settings you can configure.

### ajaxDeleteSettings
_object_ additional ajax settings to pass to the plugin before submitting the delete ajax request in each initial preview thumbnail. Applicable only for ajax deletions. This can be useful to pass additional tokens to headers or one can use it for setting other ajax options for advanced cases. Refer the [jQuery ajax documentation](http://api.jquery.com/jQuery.ajax/) for the various settings you can configure.

### showAjaxErrorDetails
_boolean_ whether to show details of the error stack from the server log when an error is encountered via ajax response. Defaults to `true`.

## Plugin Events
The plugin supports these events:

### File Events

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

#### filebatchselected
This event is triggered after a batch of files are selected and displayed in the preview.
Additional parameters available are: 

- `files`: the file stack array (or empty object if not available).

```js
$('#input-id').on('filebatchselected', function(event, files) {
    console.log('File batch selected triggered');
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
- `data`: the output of `deleteExtraData` object.

```js
$('#input-id').on('filepredelete', function(event, key, jqXHR) {
    console.log('Key = ' + key);
});
```

#### filedeleted
This event is triggered after deletion of each thumbnail file in the `initialPreview` content set. Additional parameters available are: 

- `key`: the key passed within `initialPreviewConfig` for the selected file that will be passed as POST data to the `url`.
- `jqXHR`: the `jQuery XMLHttpRequest` object used for this transaction (if available).
- `data`: the output of `deleteExtraData` object.

```js
$('#input-id').on('filedeleted', function(event, key) {
    console.log('Key = ' + key);
});
```

```js
$('#input-id').on('fileunlock', function(event, filestack) {
    var fstack = filestack.filter(function(n){ return n != undefined });
    console.log('Files selected - ' + fstack.length);
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


#### filebatchuploadcomplete
This event is triggered after completion of either the synchronous OR asynchronous ajax batch upload. Additional parameters available are: 

- `files`: the file stack array (or empty object if not available).
- `extra`: the `uploadExtraData` settings for the plugin (or empty object if not available).

```js
$('#input-id').on('filebatchuploadcomplete', function(event, files, extra) {
    console.log('File batch upload complete');
});
```

#### filesuccessremove
This event is triggered after a successfully uploaded thumbnail is removed using the thumbnail delete button. This is usually applicable when you have **showUploadedThumbs** set to `true`. Additional parameters available are: 

- `id`: the HTML ID attribute for the thumbnail container element.

The event can return `false` to abort the thumbnail removal.

```js
$('#input-id').on('filesuccessremove', function(event, id) {
    if (some_processing_function(id)) {
       console.log('Uploaded thumbnail successfully removed');
    } else {
        return false; // abort the thumbnail removal
    }
});
```
#### filedisabled
This event is triggered when the file input widget is disabled (prevents any modification) using the `disable` method.

```js
$('#input-id').on('filedisabled', function(event) {
    console.log('File disabled.');
});
```

#### fileenabled
This event is triggered when the file input widget is enabled (allows modification) using the `enable` method.

```js
$('#input-id').on('fileenabled', function(event) {
    console.log('File enabled.');
});
```

### Error Events

#### fileerror
This event is triggered when a client validation error is encountered for an uploaded file. This allows access to an object `data` as a parameter.

- `data`: object/associative array containing the following 
    - `id`: the preview thumbnail identifier (or undefined if not available)
    - `index`: the file index/preview thumbnail index (or undefined if not available)
    - `file`: the file object (or undefined if not available)
    - `reader`: the file reader instance (or undefined if not available)
    - `files`: the file stack array (or empty object if not available).

**Example:**
```js
$('#input-id').on('fileerror', function(event, data) {
   console.log(data.id);
   console.log(data.index);
   console.log(data.file);
   console.log(data.reader);
   console.log(data.files);
});
```

#### fileuploaderror
This event is triggered when an upload or file input validation error is encountered primarily for ajax uploads (through the upload icon for each thumbnail or for every file uploaded when uploadAsync is `true`). Additional parameters available are: 

- `data`: This is a data object (associative array) that sends the following information, whose keys are:
    - `id`: the preview thumbnail identifier (or undefined if not available)
    - `index`: the file index/preview thumbnail index (or undefined if not available).
    - `form`: the FormData object which is passed via XHR2 (or empty object if not available).
    - `files`: the file stack array (or empty object if not available).
    - `extra`: the `uploadExtraData` settings for the plugin (or empty object if not available).
    - `response`: the data sent via ajax response (or empty object if not available).
    - `reader`: the FileReader instance if available
    - `jqXHR`: the `jQuery XMLHttpRequest` object used for this transaction (if available).

```js
$('#input-id').on('fileuploaderror', function(event, data, previewId, index) {
    var form = data.form, files = data.files, extra = data.extra, 
        response = data.response, reader = data.reader;
    console.log('File upload error');
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

#### filedeleteerror
This event is triggered when an error is faced in deletion of each thumbnail file in the `initialPreview` content set. Additional parameters available are: 

- `data`: This is a data object (associative array) that sends the following information, whose keys are:
    - `id`: the preview thumbnail identifier (or undefined if not available)
    - `index`: the file index/preview thumbnail index (or undefined if not available).
    - `response`: the data sent via ajax response (or empty object if not available).
    - `extra`: the output of `deleteExtraData` object.
    - `jqXHR`: the `jQuery XMLHttpRequest` object used for this transaction (if available).

```js
$('#input-id').on('filedeleteerror', function(event, data) {
    console.log('File delete error');
});
```

#### filefoldererror
This event is triggered when a folder or multiple folders have been dragged & dropped to the file preview drop zone. Additional parameters available are: 

- `folders`: The count of folders dropped.

```js
$('#input-id').on('filefoldererror', function(event, folders) {
    console.log('File folder dropped error');
});
```

#### filecustomerror
This event is triggered manually by the user from one of the other events by returning an error object from the source event. Refer **Event Manipulation** section for details. Additional parameters available are: 

- `data`: This is a data object (associative array) that sends the following information, whose keys are:
    - `form`: the FormData object which is passed via XHR2 (or empty object if not available).
    - `response`: the aborted data sent when returned when triggering the validation error from the source event. 
    - `files`: the file stack array (or empty object if not available).
    - `extra`: the `uploadExtraData` settings for the plugin (or empty object if not available).
    - `reader`: the FileReader instance if available
    - `jqXHR`: the `jQuery XMLHttpRequest` object used for this transaction (an empty object usually).

```js
$("#input").on('filecustomerror', function(event, params) {
   console.log(params.id);
   console.log(params.index);
   console.log(params.data);
});
```

### Event Manipulation
With release v4.1.8, you can return data for most of the events and use it for advanced processing. This functionality is not applicable for the following events.

- `fileclear`
- `filecleared`
- `filereset`
- `fileerror`
- `fileuploaderror`
- `filebatchuploaderror`
- `filedeleteerror`
- `filefoldererror`
- `filecustomerror`
- `fileuploaded`
- `filebatchuploadcomplete`
- `filebatchuploadsuccess`

For all the events other than ones mentioned above, you can set a custom validation error which will be triggered just before upload is initiated.

This will enable you to add your additional custom validations to enhance the fileinput to be used for innumerous scenarios. It will allow an ability to return an associative object with any of the fileinput events (except the events above) e.g. `change`, `fileselect`, `filepreupload`, `filebatchpreupload` etc.

The object can return the following keys:

- `message`: _string_, the validation error message to be displayed before upload. If this is set the plugin will automatically abort the upload whenever called and display this as an error message. You can use this property for example to read a file and perform your own custom validation.
- `data`: _object_, an optional associative array of additional data at abort, that you can pass for usage later. 

**Example**

- **STEP 1:** You can trigger an error to abort from `filepreupload`

```js
$('#input').on('filepreupload', function(event, data, previewId, index, jqXHR) {
    // do your validation and return an error like below
    if (customValidationFailed) {
       return {
           message: 'You are not allowed to do that', 
           data: {key1: 'Key 1', detail1: 'Detail 1'}
       };
   }
});
```
The above abort will be triggered at time of upload for (ajax uploads) OR at form submission (for non-ajax uploads).

- **STEP 2:** Reading additional data at abort by trapping the `filecustomerror` event

```js
$('#input').on('filecustomerror', function(event, params) {
   // params.abortData will contain the additional abort data passed
   // params.abortMessage will contain the aborted error message passed
});
```

As mentioned before, the above functionality of raising a `filecustomerror` is not supported in the following events:

- `fileclear`
- `filecleared`
- `filereset`
- `fileerror`
- `fileuploaderror`
- `filebatchuploaderror`
- `filedeleteerror`
- `filecustomerror`
- `fileuploaded`
- `filebatchuploadcomplete`
- `filebatchuploadsuccess`

### Plugin Methods
The plugin supports these methods:

### disable
Disable the file input.
```js
$('#input-id').fileinput('disable');
```

### enable
Enable the file input.
```js
$('#input-id').fileinput('enable');
```

### reset
Reset the file input.
```js
$('#input-id').fileinput('reset');
```

### refresh
Refreshes the file input plugin based on options provided. You can supply an array of plugin options as a parameter.
```js
// example 1 (disable at runtime)
$('#input-id').attr('disabled', 'disabled');
$('#input-id').fileinput('refresh');

// example 2 (modify plugin options at runtime)
$('#input-id').fileinput('refresh', {browseLabel: 'Select...', removeLabel: 'Delete'});
```

### clear
Clear the file input and all files from preview.
```js
$('#input-id').fileinput('clear');
```

### upload
Trigger ajax upload of the files that are selected. Applicable only if `uploadUrl` is set.

```js
$('#input-id').fileinput('upload');
```

### cancel
Cancel an ongoing ajax upload of the files.

```js
$('#input-id').fileinput('cancel');
```

### lock
Locks the file input by disabling all actions/buttons except a cancel button to abort ongoing AJAX requests (for ajax uploads only).

```js
$('#input-id').fileinput('lock');
```

### unlock
Unlocks and enables the file input back again by reversing the outcome of the `lock` action.

```js
$('#input-id').fileinput('unlock');
```

## License

**bootstrap-fileinput** is released under the BSD 3-Clause License. See the bundled `LICENSE.md` for details.
