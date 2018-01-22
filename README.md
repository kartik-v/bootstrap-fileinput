bootstrap-fileinput
===================

[![Bower version](https://badge.fury.io/bo/bootstrap-fileinput.svg)](http://badge.fury.io/bo/bootstrap-fileinput)
[![Latest Stable Version](https://poser.pugx.org/kartik-v/bootstrap-fileinput/v/stable)](https://packagist.org/packages/kartik-v/bootstrap-fileinput)
[![License](https://poser.pugx.org/kartik-v/bootstrap-fileinput/license)](https://packagist.org/packages/kartik-v/bootstrap-fileinput)
[![Packagist Downloads](https://poser.pugx.org/kartik-v/bootstrap-fileinput/downloads)](https://packagist.org/packages/kartik-v/bootstrap-fileinput)
[![Monthly Downloads](https://poser.pugx.org/kartik-v/bootstrap-fileinput/d/monthly)](https://packagist.org/packages/kartik-v/bootstrap-fileinput)

An enhanced HTML 5 file input for Bootstrap 3.x and 4.x with file preview for various files, offers multiple selection, and more. The plugin allows you a simple way to setup an advanced file picker/upload control built to work specially with Bootstrap CSS3 styles. It enhances the file input functionality further, by offering support to preview a wide variety of files i.e. images, text, html, video, audio, flash, and objects. In addition, it includes AJAX based uploads, dragging &amp; dropping files, viewing upload progress, and selectively previewing, adding, or deleting files.

![Krajee Default Theme](https://lh3.googleusercontent.com/8m5BKa-o2_W63OuL-NJtAYOxelboHccfsDojxdqhmVCxY49LTiSVK8rOywzup2EDJlXcda_SsKkMVA=w1366-h768-rw-no)

> NOTE: An alternative new [Krajee Explorer Theme](http://plugins.krajee.com/file-krajee-explorer-demo) (preview shown below) for `bootstrap-fileinput` has been released and available since v4.3.7. For more theming options and suggestions refer the [theming demos](http://plugins.krajee.com/file-theme-demo).

![Krajee Explorer Theme](https://lh3.googleusercontent.com/eKMw_la1h6Z0y1Vk0SU3fsWVpmUoqg_HS-ZEZ1U2-1e8s6fgFZqoGbXcRjIXbYLkLi6Ns17-nb2yOg=w1366-h768-rw-no)

## Documentation and Demo

View the [plugin documentation](http://plugins.krajee.com/file-input) and [plugin demos](http://plugins.krajee.com/file-input/demo) at Krajee JQuery plugins. 

## Pre-requisites  

1. [Bootstrap 3.x](http://getbootstrap.com/)
2. Latest [JQuery](http://jquery.com/)
3. Most modern browsers supporting HTML5 (inputs and FileReader API) including CSS3 & JQuery. For Internet Explorer, one must use IE versions 10 and above. IE9 and below will work as a normal file input, and will not support multiple file selection or the HTML 5 FileReader API.
4. With release 4.0, AJAX uploads are supported. AJAX uploads require that the browser support HTML5 FormData and XHR2 (XMLHttpRequest 2). Most modern browsers support FormData and XHR2. The plugin will automatically degrade to normal form based submission for browsers not supporting AJAX uploads

> NOTE: 
> - The latest version of the plugin is v4.4.7. Bootstrap 4.x is supported in addition to Bootstrap 3.x since release v4.4.4. Refer the [CHANGE LOG](https://github.com/kartik-v/bootstrap-fileinput/blob/master/CHANGE.md) for details. 
> - You can use the [sass branch](https://github.com/kartik-v/bootstrap-fileinput/tree/sass) for installation using `bootstrap-sass` dependency.
The [master branch](https://github.com/kartik-v/bootstrap-fileinput/tree/master) can be used for installation using plain `bootstrap` dependency.

## Installation

### Using Bower
You can use the `bower` package manager to install. Run:

    bower install bootstrap-fileinput

### Using Composer
You can use the `composer` package manager to install. Either run:

    $ php composer.phar require kartik-v/bootstrap-fileinput "@dev"

or add:

    "kartik-v/bootstrap-fileinput": "@dev"

to your composer.json file

### Manual Install

You can also manually install the plugin easily to your project. Just download the source [ZIP](https://github.com/kartik-v/bootstrap-fileinput/zipball/master) or [TAR ball](https://github.com/kartik-v/bootstrap-fileinput/tarball/master) and extract the plugin assets (css and js folders) into your project.

## Usage

Step 1: Load the following assets in your header. 

```html
<!-- bootstrap 4.x is supported. You can also use the bootstrap css 3.3.x versions -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css">
<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/4.4.7/css/fileinput.min.css" media="all" rel="stylesheet" type="text/css" />
<!-- if using RTL (Right-To-Left) orientation, load the RTL CSS file after fileinput.css by uncommenting below -->
<!-- link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/4.4.7/css/fileinput-rtl.min.css" media="all" rel="stylesheet" type="text/css" /-->
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<!-- piexif.min.js is only needed for restoring exif data in resized images and when you 
    wish to resize images before upload. This must be loaded before fileinput.min.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/4.4.7/js/plugins/piexif.min.js" type="text/javascript"></script>
<!-- sortable.min.js is only needed if you wish to sort / rearrange files in initial preview. 
    This must be loaded before fileinput.min.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/4.4.7/js/plugins/sortable.min.js" type="text/javascript"></script>
<!-- purify.min.js is only needed if you wish to purify HTML content in your preview for 
    HTML files. This must be loaded before fileinput.min.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/4.4.7/js/plugins/purify.min.js" type="text/javascript"></script>
<!-- popper.min.js below is needed if you use bootstrap 4.x. You can also use the bootstrap js 
   3.3.x versions without popper.min.js. -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"></script>
<!-- bootstrap.min.js below is needed if you wish to zoom and preview file content in a detail modal
    dialog. bootstrap 4.x is supported. You can also use the bootstrap js 3.3.x versions. -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" type="text/javascript"></script>
<!-- the main fileinput plugin file -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/4.4.7/js/fileinput.min.js"></script>
<!-- optionally if you need a theme like font awesome theme you can include it as mentioned below -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/4.4.7/themes/fa/theme.js"></script>
<!-- optionally if you need translation for your language then include  locale file as mentioned below -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/4.4.7/js/locales/(lang).js"></script>
```

If you noticed, you need to load the `jquery.min.js` and `bootstrap.min.css` in addition to the `fileinput.min.css` and `fileinput.min.js`. The theme file `themes/fa/theme.js` can be optionally included for the font awesome icons styling. The locale file `<lang>.js` can be optionally included for translating for your language if needed.

**Optional Dependent Plugins**

- The `piexif.min.js` file is the source for the [Piexifjs plugin by hMatoba](https://github.com/hMatoba/piexifjs). It is required to be loaded before `fileinput.min.js` if you wish to use the image resize feature of the **bootstrap-fileinput** plugin. 
- The `sortable.min.js` file is the source for the [Sortable plugin by rubaxa](https://github.com/rubaxa/Sortable). It is required to be loaded before `fileinput.min.js` if you wish to sort the thumbnails in the initial preview.
- The `purify.min.js` file is the source for the [DomPurify plugin by cure53](https://github.com/cure53/DOMPurify). It is required to be loaded before `fileinput.min.js` if you wish to purify your HTML for HTML content preview.

For ease of access, the sources for the above plugins are included in the `js/plugins` folder of this project repository.

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

## License

**bootstrap-fileinput** is released under the BSD 3-Clause License. See the bundled `LICENSE.md` for details.
