/*!
 * bootstrap-fileinput v5.5.3
 * http://plugins.krajee.com/file-input
 *
 * Author: Kartik Visweswaran
 * Copyright: 2014 - 2022, Kartik Visweswaran, Krajee.com
 *
 * Licensed under the BSD-3-Clause
 * https://github.com/kartik-v/bootstrap-fileinput/blob/master/LICENSE.md
 */
(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        factory(require('jquery'));
    } else {
        factory(window.jQuery);
    }
}(function ($) {
    'use strict';

    $.fn.fileinputLocales = {};
    $.fn.fileinputThemes = {};

    if (!$.fn.fileinputBsVersion) {
        $.fn.fileinputBsVersion = (window.bootstrap && window.bootstrap.Alert && window.bootstrap.Alert.VERSION) ||
            (window.Alert && window.Alert.VERSION) || '3.x.x';
    }

    String.prototype.setTokens = function (replacePairs) {
        var str = this.toString(), key, re;
        for (key in replacePairs) {
            if (replacePairs.hasOwnProperty(key)) {
                re = new RegExp('\{' + key + '\}', 'g');
                str = str.replace(re, replacePairs[key]);
            }
        }
        return str;
    };

    if (!Array.prototype.flatMap) { // polyfill flatMap
        Array.prototype.flatMap = function (lambda) {
            return [].concat(this.map(lambda));
        };
    }

    var $h, FileInput;

    // fileinput helper object for all global variables and internal helper methods
    $h = {
        FRAMES: '.kv-preview-thumb',
        SORT_CSS: 'file-sortable',
        INIT_FLAG: 'init-',
        SCRIPT_SRC: document && document.currentScript && document.currentScript.src || null,
        OBJECT_PARAMS: '<param name="controller" value="true" />\n' +
            '<param name="allowFullScreen" value="true" />\n' +
            '<param name="allowScriptAccess" value="always" />\n' +
            '<param name="autoPlay" value="false" />\n' +
            '<param name="autoStart" value="false" />\n' +
            '<param name="quality" value="high" />\n',
        DEFAULT_PREVIEW: '<div class="file-preview-other">\n' +
            '<span class="{previewFileIconClass}">{previewFileIcon}</span>\n' +
            '</div>',
        MODAL_ID: 'kvFileinputModal',
        MODAL_EVENTS: ['show', 'shown', 'hide', 'hidden', 'loaded'],
        logMessages: {
            ajaxError: '{status}: {error}. Error Details: {text}.',
            badDroppedFiles: 'Error scanning dropped files!',
            badExifParser: 'Error loading the piexif.js library. {details}',
            badInputType: 'The input "type" must be set to "file" for initializing the "bootstrap-fileinput" plugin.',
            exifWarning: 'To avoid this warning, either set "autoOrientImage" to "false" OR ensure you have loaded ' +
                'the "piexif.js" library correctly on your page before the "fileinput.js" script.',
            invalidChunkSize: 'Invalid upload chunk size: "{chunkSize}". Resumable uploads are disabled.',
            invalidThumb: 'Invalid thumb frame with id: "{id}".',
            noResumableSupport: 'The browser does not support resumable or chunk uploads.',
            noUploadUrl: 'The "uploadUrl" is not set. Ajax uploads and resumable uploads have been disabled.',
            retryStatus: 'Retrying upload for chunk # {chunk} for {filename}... retry # {retry}.',
            chunkQueueError: 'Could not push task to ajax pool for chunk index # {index}.',
            resumableMaxRetriesReached: 'Maximum resumable ajax retries ({n}) reached.',
            resumableRetryError: 'Could not retry the resumable request (try # {n})... aborting.',
            resumableAborting: 'Aborting / cancelling the resumable request.',
            resumableRequestError: 'Error processing resumable request. {msg}'

        },
        objUrl: window.URL || window.webkitURL,
        getZoomPlaceholder: function () { // used to prevent 404 errors in URL parsing
            var src = $h.SCRIPT_SRC, srcPath, zoomVar = '?kvTemp__2873389129__=';
            if (!src) {
                return zoomVar;
            }
            srcPath = src.substring(0, src.lastIndexOf("/"));
            return srcPath.substring(0, srcPath.lastIndexOf("/") + 1) + 'img/loading.gif' + zoomVar;
        },
        isBs: function (ver) {
            var chk = $.trim(($.fn.fileinputBsVersion || '') + '');
            ver = parseInt(ver, 10);
            if (!chk) {
                return ver === 4;
            }
            return ver === parseInt(chk.charAt(0), 10);

        },
        defaultButtonCss: function (fill) {
            return 'btn-default btn-' + (fill ? '' : 'outline-') + 'secondary';
        },
        now: function () {
            return new Date().getTime();
        },
        round: function (num) {
            num = parseFloat(num);
            return isNaN(num) ? 0 : Math.floor(Math.round(num));
        },
        getArray: function (obj) {
            var i, arr = [], len = obj && obj.length || 0;
            for (i = 0; i < len; i++) {
                arr.push(obj[i]);
            }
            return arr;
        },
        getFileRelativePath: function (file) {
            /** @namespace file.relativePath */
            /** @namespace file.webkitRelativePath */
            return String(file.newPath || file.relativePath || file.webkitRelativePath || $h.getFileName(file) || null);

        },
        getFileId: function (file, generateFileId) {
            var relativePath = $h.getFileRelativePath(file);
            if (typeof generateFileId === 'function') {
                return generateFileId(file);
            }
            if (!file) {
                return null;
            }
            if (!relativePath) {
                return null;
            }
            return (file.size + '_' + encodeURIComponent(relativePath).replace(/%/g, '_'));
        },
        getFrameSelector: function (id, selector) {
            selector = selector || '';
            return '[id="' + id + '"]' + selector;
        },
        getZoomSelector: function (id, selector) {
            return $h.getFrameSelector('zoom-' + id, selector);
        },
        getFrameElement: function ($element, id, selector) {
            return $element.find($h.getFrameSelector(id, selector));
        },
        getZoomElement: function ($element, id, selector) {
            return $element.find($h.getZoomSelector(id, selector));
        },
        getElapsed: function (seconds) {
            var delta = seconds, out = '', result = {}, structure = {
                year: 31536000,
                month: 2592000,
                week: 604800, // uncomment row to ignore
                day: 86400,   // feel free to add your own row
                hour: 3600,
                minute: 60,
                second: 1
            };
            $h.getObjectKeys(structure).forEach(function (key) {
                result[key] = Math.floor(delta / structure[key]);
                delta -= result[key] * structure[key];
            });
            $.each(result, function (key, value) {
                if (value > 0) {
                    out += (out ? ' ' : '') + value + key.substring(0, 1);
                }
            });
            return out;
        },
        debounce: function (func, delay) {
            var inDebounce;
            return function () {
                var args = arguments, context = this;
                clearTimeout(inDebounce);
                inDebounce = setTimeout(function () {
                    func.apply(context, args);
                }, delay);
            };
        },
        stopEvent: function (e) {
            e.stopPropagation();
            e.preventDefault();
        },
        getFileName: function (file) {
            /** @namespace file.fileName */
            return file ? (file.fileName || file.name || '') : ''; // some confusion in different versions of Firefox
        },
        createObjectURL: function (data) {
            if ($h.objUrl && $h.objUrl.createObjectURL && data) {
                return $h.objUrl.createObjectURL(data);
            }
            return '';
        },
        revokeObjectURL: function (data) {
            if ($h.objUrl && $h.objUrl.revokeObjectURL && data) {
                $h.objUrl.revokeObjectURL(data);
            }
        },
        compare: function (input, str, exact) {
            return input !== undefined && (exact ? input === str : input.match(str));
        },
        isIE: function (ver) {
            var div, status;
            // check for IE versions < 11
            if (navigator.appName !== 'Microsoft Internet Explorer') {
                return false;
            }
            if (ver === 10) {
                return new RegExp('msie\\s' + ver, 'i').test(navigator.userAgent);
            }
            div = document.createElement('div');
            div.innerHTML = '<!--[if IE ' + ver + ']> <i></i> <![endif]-->';
            status = div.getElementsByTagName('i').length;
            document.body.appendChild(div);
            div.parentNode.removeChild(div);
            return status;
        },
        canOrientImage: function ($el) {
            var $img = $(document.createElement('img')).css({width: '1px', height: '1px'}).insertAfter($el),
                flag = $img.css('image-orientation');
            $img.remove();
            return !!flag;
        },
        canAssignFilesToInput: function () {
            var input = document.createElement('input');
            try {
                input.type = 'file';
                input.files = null;
                return true;
            } catch (err) {
                return false;
            }
        },
        getDragDropFolders: function (items) {
            var i, item, len = items ? items.length : 0, folders = 0;
            if (len > 0 && items[0].webkitGetAsEntry()) {
                for (i = 0; i < len; i++) {
                    item = items[i].webkitGetAsEntry();
                    if (item && item.isDirectory) {
                        folders++;
                    }
                }
            }
            return folders;
        },
        initModal: function ($modal) {
            var $body = $('body');
            if ($body.length) {
                $modal.appendTo($body);
            }
        },
        isFunction: function (v) {
            return typeof v === 'function';
        },
        isEmpty: function (value, trim) {
            if (value === undefined || value === null || value === '') {
                return true;
            }
            if ($h.isString(value) && trim) {
                return $.trim(value) === '';
            }
            if ($h.isArray(value)) {
                return value.length === 0;
            }
            if ($.isPlainObject(value) && $.isEmptyObject(value)) {
                return true;
            }
            return false;
        },
        isArray: function (a) {
            return Array.isArray(a) || Object.prototype.toString.call(a) === '[object Array]';
        },
        isString: function (a) {
            return Object.prototype.toString.call(a) === '[object String]';
        },
        ifSet: function (needle, haystack, def) {
            def = def || '';
            return (haystack && typeof haystack === 'object' && needle in haystack) ? haystack[needle] : def;
        },
        cleanArray: function (arr) {
            if (!(arr instanceof Array)) {
                arr = [];
            }
            return arr.filter(function (e) {
                return (e !== undefined && e !== null);
            });
        },
        spliceArray: function (arr, index, reverseOrder) {
            var i, j = 0, out = [], newArr;
            if (!(arr instanceof Array)) {
                return [];
            }
            newArr = $.extend(true, [], arr);
            if (reverseOrder) {
                newArr.reverse();
            }
            for (i = 0; i < newArr.length; i++) {
                if (i !== index) {
                    out[j] = newArr[i];
                    j++;
                }
            }
            if (reverseOrder) {
                out.reverse();
            }
            return out;
        },
        getNum: function (num, def) {
            def = def || 0;
            if (typeof num === 'number') {
                return num;
            }
            if (typeof num === 'string') {
                num = parseFloat(num);
            }
            return isNaN(num) ? def : num;
        },
        hasFileAPISupport: function () {
            return !!(window.File && window.FileReader);
        },
        hasDragDropSupport: function () {
            var div = document.createElement('div');
            /** @namespace div.draggable */
            /** @namespace div.ondragstart */
            /** @namespace div.ondrop */
            return !$h.isIE(9) &&
                (div.draggable !== undefined || (div.ondragstart !== undefined && div.ondrop !== undefined));
        },
        hasFileUploadSupport: function () {
            return $h.hasFileAPISupport() && window.FormData;
        },
        hasBlobSupport: function () {
            try {
                return !!window.Blob && Boolean(new Blob());
            } catch (e) {
                return false;
            }
        },
        hasArrayBufferViewSupport: function () {
            try {
                return new Blob([new Uint8Array(100)]).size === 100;
            } catch (e) {
                return false;
            }
        },
        hasResumableUploadSupport: function () {
            /** @namespace Blob.prototype.webkitSlice */
            /** @namespace Blob.prototype.mozSlice */
            return $h.hasFileUploadSupport() && $h.hasBlobSupport() && $h.hasArrayBufferViewSupport() &&
                (!!Blob.prototype.webkitSlice || !!Blob.prototype.mozSlice || !!Blob.prototype.slice || false);
        },
        dataURI2Blob: function (dataURI) {
            var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder ||
                    window.MSBlobBuilder, canBlob = $h.hasBlobSupport(), byteStr, arrayBuffer, intArray, i, mimeStr, bb,
                canProceed = (canBlob || BlobBuilder) && window.atob && window.ArrayBuffer && window.Uint8Array;
            if (!canProceed) {
                return null;
            }
            if (dataURI.split(',')[0].indexOf('base64') >= 0) {
                byteStr = atob(dataURI.split(',')[1]);
            } else {
                byteStr = decodeURIComponent(dataURI.split(',')[1]);
            }
            arrayBuffer = new ArrayBuffer(byteStr.length);
            intArray = new Uint8Array(arrayBuffer);
            for (i = 0; i < byteStr.length; i += 1) {
                intArray[i] = byteStr.charCodeAt(i);
            }
            mimeStr = dataURI.split(',')[0].split(':')[1].split(';')[0];
            if (canBlob) {
                return new Blob([$h.hasArrayBufferViewSupport() ? intArray : arrayBuffer], {type: mimeStr});
            }
            bb = new BlobBuilder();
            bb.append(arrayBuffer);
            return bb.getBlob(mimeStr);
        },
        arrayBuffer2String: function (buffer) {
            if (window.TextDecoder) {
                return new TextDecoder('utf-8').decode(buffer);
            }
            var array = Array.prototype.slice.apply(new Uint8Array(buffer)), out = '', i = 0, len, c, char2, char3;
            len = array.length;
            while (i < len) {
                c = array[i++];
                switch (c >> 4) { // jshint ignore:line
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        // 0xxxxxxx
                        out += String.fromCharCode(c);
                        break;
                    case 12:
                    case 13:
                        // 110x xxxx   10xx xxxx
                        char2 = array[i++];
                        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F)); // jshint ignore:line
                        break;
                    case 14:
                        // 1110 xxxx  10xx xxxx  10xx xxxx
                        char2 = array[i++];
                        char3 = array[i++];
                        out += String.fromCharCode(((c & 0x0F) << 12) | // jshint ignore:line
                            ((char2 & 0x3F) << 6) |  // jshint ignore:line
                            ((char3 & 0x3F) << 0)); // jshint ignore:line
                        break;
                }
            }
            return out;
        },
        isHtml: function (str) {
            var a = document.createElement('div');
            a.innerHTML = str;
            for (var c = a.childNodes, i = c.length; i--;) {
                if (c[i].nodeType === 1) {
                    return true;
                }
            }
            return false;
        },
        isPdf: function (str) {
            if ($h.isEmpty(str)) {
                return false;
            }
            str = str.toString().trim().replace(/\n/g, ' ');
            if (str.length === 0) {
                return false;
            }
        },
        isSvg: function (str) {
            if ($h.isEmpty(str)) {
                return false;
            }
            str = str.toString().trim().replace(/\n/g, ' ');
            if (str.length === 0) {
                return false;
            }
            return str.match(/^\s*<\?xml/i) && (str.match(/<!DOCTYPE svg/i) || str.match(/<svg/i));
        },
        getMimeType: function (sign, contents, type) {
            var signature = sign || "";
            switch (signature) {
                case 'ffd8ffe0':
                case 'ffd8ffe1':
                case 'ffd8ffe2':
                    return 'image/jpeg';
                case '89504e47':
                    return 'image/png';
                case '47494638':
                    return 'image/gif';
                case '49492a00':
                    return 'image/tiff';
                case '52494646':
                    return 'image/webp';
                case '41433130':
                    return 'image/vnd.dwg';
                case '66747970':
                    return 'video/3gp';
                case '4f676753':
                    return 'video/ogg';
                case '1a45dfa3':
                    return 'video/mkv';
                case '000001ba':
                case '000001b3':
                    return 'video/mpeg';
                case '3026b275':
                    return 'video/wmv';
                case '25504446':
                    return 'application/pdf';
                case '25215053':
                    return 'application/ps';
                case '504b0304':
                case '504b0506':
                case '504b0508':
                    return 'application/zip';
                case '377abcaf':
                    return 'application/7z';
                case '75737461':
                    return 'application/tar';
                case '7801730d':
                    return 'application/dmg';
                default:
                    switch (signature.substring(0, 6)) {
                        case '435753':
                            return 'application/x-shockwave-flash';
                        case '494433':
                            return 'audio/mp3';
                        case '425a68':
                            return 'application/bzip';
                        default:
                            switch (signature.substring(0, 4)) {
                                case '424d':
                                    return 'image/bmp';
                                case 'fffb':
                                    return 'audio/mp3';
                                case '4d5a':
                                    return 'application/exe';
                                case '1f9d':
                                case '1fa0':
                                    return 'application/zip';
                                case '1f8b':
                                    return 'application/gzip';
                                default:
                                    return contents && !contents.match(
                                        /[^\u0000-\u007f]/) ? 'application/text-plain' : type;
                            }
                    }
            }
        },
        addCss: function ($el, css) {
            $el.removeClass(css).addClass(css);
        },
        getElement: function (options, param, value) {
            return ($h.isEmpty(options) || $h.isEmpty(options[param])) ? value : $(options[param]);
        },
        createElement: function (str, tag) {
            tag = tag || 'div';
            return $($.parseHTML('<' + tag + '>' + str + '</' + tag + '>'));
        },
        uniqId: function () {
            return (new Date().getTime() + Math.floor(Math.random() * Math.pow(10, 15))).toString(36);
        },
        cspBuffer: {
            CSP_ATTRIB: 'data-csp-01928735', // a randomly named temporary attribute to store the CSP elem id
            domElementsStyles: {},
            stash: function (htmlString) {
                var self = this, outerDom = $.parseHTML('<div>' + htmlString + '</div>'), $el = $(outerDom);
                $el.find('[style]').each(function (key, elem) {
                    var $elem = $(elem), styleDeclaration = $elem[0].style, id = $h.uniqId(), styles = {};
                    if (styleDeclaration && styleDeclaration.length) {
                        $(styleDeclaration).each(function () {
                            styles[this] = styleDeclaration[this];
                        });
                        self.domElementsStyles[id] = styles;
                        $elem.removeAttr('style').attr(self.CSP_ATTRIB, id);
                    }
                });
                $el.filter('*').removeAttr('style');                   // make sure all style attr are removed
                var values = Object.values ? Object.values(outerDom) : Object.keys(outerDom).map(function (itm) {
                    return outerDom[itm];
                });
                return values.flatMap(function (elem) {
                    return elem.innerHTML;
                }).join('');
            },
            apply: function (domElement) {
                var self = this, $el = $(domElement);
                $el.find('[' + self.CSP_ATTRIB + ']').each(function (key, elem) {
                    var $elem = $(elem), id = $elem.attr(self.CSP_ATTRIB), styles = self.domElementsStyles[id];
                    if (styles) {
                        $elem.css(styles);
                    }
                    $elem.removeAttr(self.CSP_ATTRIB);
                });
                self.domElementsStyles = {};
            }
        },
        setHtml: function ($elem, htmlString) {
            var buf = $h.cspBuffer;
            $elem.html(buf.stash(htmlString));
            buf.apply($elem);
            return $elem;
        },
        htmlEncode: function (str, undefVal) {
            if (str === undefined) {
                return undefVal || null;
            }
            return str.replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&apos;');
        },
        replaceTags: function (str, tags) {
            var out = str;
            if (!tags) {
                return out;
            }
            $.each(tags, function (key, value) {
                if (typeof value === 'function') {
                    value = value();
                }
                out = out.split(key).join(value);
            });
            return out;
        },
        cleanMemory: function ($thumb) {
            var data = $thumb.is('img') ? $thumb.attr('src') : $thumb.find('source').attr('src');
            $h.revokeObjectURL(data);
        },
        findFileName: function (filePath) {
            var sepIndex = filePath.lastIndexOf('/');
            if (sepIndex === -1) {
                sepIndex = filePath.lastIndexOf('\\');
            }
            return filePath.split(filePath.substring(sepIndex, sepIndex + 1)).pop();
        },
        checkFullScreen: function () {
            return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement ||
                document.msFullscreenElement;
        },
        toggleFullScreen: function (maximize) {
            var doc = document, de = doc.documentElement, isFullScreen = $h.checkFullScreen();
            if (de && maximize && !isFullScreen) {
                if (de.requestFullscreen) {
                    de.requestFullscreen();
                } else {
                    if (de.msRequestFullscreen) {
                        de.msRequestFullscreen();
                    } else {
                        if (de.mozRequestFullScreen) {
                            de.mozRequestFullScreen();
                        } else {
                            if (de.webkitRequestFullscreen) {
                                de.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                            }
                        }
                    }
                }
            } else {
                if (isFullScreen) {
                    if (doc.exitFullscreen) {
                        doc.exitFullscreen();
                    } else {
                        if (doc.msExitFullscreen) {
                            doc.msExitFullscreen();
                        } else {
                            if (doc.mozCancelFullScreen) {
                                doc.mozCancelFullScreen();
                            } else {
                                if (doc.webkitExitFullscreen) {
                                    doc.webkitExitFullscreen();
                                }
                            }
                        }
                    }
                }
            }
        },
        moveArray: function (arr, oldIndex, newIndex, reverseOrder) {
            var newArr = $.extend(true, [], arr);
            if (reverseOrder) {
                newArr.reverse();
            }
            if (newIndex >= newArr.length) {
                var k = newIndex - newArr.length;
                while ((k--) + 1) {
                    newArr.push(undefined);
                }
            }
            newArr.splice(newIndex, 0, newArr.splice(oldIndex, 1)[0]);
            if (reverseOrder) {
                newArr.reverse();
            }
            return newArr;
        },
        closeButton: function (css) {
            css = ($h.isBs(5) ? 'btn-close' : 'close') + (css ? ' ' + css : '');
            return '<button type="button" class="' + css + '" aria-label="Close">\n' +
                ($h.isBs(5) ? '' : '  <span aria-hidden="true">&times;</span>\n') +
                '</button>';
        },
        getRotation: function (value) {
            switch (value) {
                case 2:
                    return 'rotateY(180deg)';
                case 3:
                    return 'rotate(180deg)';
                case 4:
                    return 'rotate(180deg) rotateY(180deg)';
                case 5:
                    return 'rotate(270deg) rotateY(180deg)';
                case 6:
                    return 'rotate(90deg)';
                case 7:
                    return 'rotate(90deg) rotateY(180deg)';
                case 8:
                    return 'rotate(270deg)';
                default:
                    return '';
            }
        },
        setTransform: function (el, val) {
            if (!el) {
                return;
            }
            el.style.transform = val;
            el.style.webkitTransform = val;
            el.style['-moz-transform'] = val;
            el.style['-ms-transform'] = val;
            el.style['-o-transform'] = val;
        },
        getObjectKeys: function (obj) {
            var keys = [];
            if (obj) {
                $.each(obj, function (key) {
                    keys.push(key);
                });
            }
            return keys;
        },
        getObjectSize: function (obj) {
            return $h.getObjectKeys(obj).length;
        },
        /**
         * Small dependency injection for the task manager
         * https://gist.github.com/fearphage/4341799
         */
        whenAll: function (array) {
            var s = [].slice, resolveValues = arguments.length === 1 && $h.isArray(array) ? array : s.call(arguments),
                deferred = $.Deferred(), i, failed = 0, value, length = resolveValues.length,
                remaining = length, rejectContexts, rejectValues, resolveContexts, updateFunc;
            rejectContexts = rejectValues = resolveContexts = Array(length);
            updateFunc = function (index, contexts, values) {
                return function () {
                    if (values !== resolveValues) {
                        failed++;
                    }
                    deferred.notifyWith(contexts[index] = this, values[index] = s.call(arguments));
                    if (!(--remaining)) {
                        deferred[(!failed ? 'resolve' : 'reject') + 'With'](contexts, values);
                    }
                };
            };
            for (i = 0; i < length; i++) {
                if ((value = resolveValues[i]) && $.isFunction(value.promise)) {
                    value.promise()
                        .done(updateFunc(i, resolveContexts, resolveValues))
                        .fail(updateFunc(i, rejectContexts, rejectValues));
                } else {
                    deferred.notifyWith(this, value);
                    --remaining;
                }
            }
            if (!remaining) {
                deferred.resolveWith(resolveContexts, resolveValues);
            }
            return deferred.promise();
        }
    };
    FileInput = function (element, options) {
        var self = this;
        self.$element = $(element);
        self.$parent = self.$element.parent();
        if (!self._validate()) {
            return;
        }
        self.isPreviewable = $h.hasFileAPISupport();
        self.isIE9 = $h.isIE(9);
        self.isIE10 = $h.isIE(10);
        if (self.isPreviewable || self.isIE9) {
            self._init(options);
            self._listen();
        }
        self.$element.removeClass('file-loading');
    };

    FileInput.prototype = {
        constructor: FileInput,
        _cleanup: function () {
            var self = this;
            self.reader = null;
            self.clearFileStack();
            self.fileBatchCompleted = true;
            self.isError = false;
            self.isDuplicateError = false;
            self.isPersistentError = false;
            self.cancelling = false;
            self.paused = false;
            self.lastProgress = 0;
            self._initAjax();
        },
        _isAborted: function () {
            var self = this;
            return self.cancelling || self.paused;
        },
        _initAjax: function () {
            var self = this, tm = self.taskManager = {
                pool: {},
                addPool: function (id) {
                    return (tm.pool[id] = new tm.TasksPool(id));
                },
                getPool: function (id) {
                    return tm.pool[id];
                },
                addTask: function (id, logic) { // add standalone task directly from task manager
                    return new tm.Task(id, logic);
                },
                TasksPool: function (id) {
                    var tp = this;
                    tp.id = id;
                    tp.cancelled = false;
                    tp.cancelledDeferrer = $.Deferred();
                    tp.tasks = {};
                    tp.addTask = function (id, logic) {
                        return (tp.tasks[id] = new tm.Task(id, logic));
                    };
                    tp.size = function () {
                        return $h.getObjectSize(tp.tasks);
                    };
                    tp.run = function (maxThreads) {
                        var i = 0, failed = false, task, tasksList = $h.getObjectKeys(tp.tasks).map(function (key) {
                            return tp.tasks[key];
                        }), tasksDone = [], deferred = $.Deferred(), enqueue, callback;

                        if (tp.cancelled) {
                            tp.cancelledDeferrer.resolve();
                            return deferred.reject();
                        }
                        // if run all at once
                        if (!maxThreads) {
                            var tasksDeferredList = $h.getObjectKeys(tp.tasks).map(function (key) {
                                return tp.tasks[key].deferred;
                            });
                            // when all are done
                            $h.whenAll(tasksDeferredList).done(function () {
                                var argv = $h.getArray(arguments);
                                if (!tp.cancelled) {
                                    deferred.resolve.apply(null, argv);
                                    tp.cancelledDeferrer.reject();
                                } else {
                                    deferred.reject.apply(null, argv);
                                    tp.cancelledDeferrer.resolve();
                                }
                            }).fail(function () {
                                var argv = $h.getArray(arguments);
                                deferred.reject.apply(null, argv);
                                if (!tp.cancelled) {
                                    tp.cancelledDeferrer.reject();
                                } else {
                                    tp.cancelledDeferrer.resolve();
                                }
                            });
                            // run all tasks
                            $.each(tp.tasks, function (id) {
                                task = tp.tasks[id];
                                task.run();
                            });
                            return deferred;
                        }
                        enqueue = function (task) {
                            $.when(task.deferred)
                                .fail(function () {
                                    failed = true;
                                    callback.apply(null, arguments);
                                })
                                .always(callback);
                        };
                        callback = function () {
                            var argv = $h.getArray(arguments);
                            // notify a task just ended
                            deferred.notify(argv);
                            tasksDone.push(argv);
                            if (tp.cancelled) {
                                deferred.reject.apply(null, tasksDone);
                                tp.cancelledDeferrer.resolve();
                                return;
                            }
                            if (tasksDone.length === tp.size()) {
                                if (failed) {
                                    deferred.reject.apply(null, tasksDone);
                                } else {
                                    deferred.resolve.apply(null, tasksDone);
                                }
                            }
                            // if there are any tasks remaining
                            if (tasksList.length) {
                                task = tasksList.shift();
                                enqueue(task);
                                task.run();
                            }
                        };
                        // run the first "maxThreads" tasks
                        while (tasksList.length && i++ < maxThreads) {
                            task = tasksList.shift();
                            enqueue(task);
                            task.run();
                        }
                        return deferred;
                    };
                    tp.cancel = function () {
                        tp.cancelled = true;
                        return tp.cancelledDeferrer;
                    };
                },
                Task: function (id, logic) {
                    var tk = this;
                    tk.id = id;
                    tk.deferred = $.Deferred();
                    tk.logic = logic;
                    tk.context = null;
                    tk.run = function () {
                        var argv = $h.getArray(arguments);
                        argv.unshift(tk.deferred);     // add deferrer as first argument
                        logic.apply(tk.context, argv); // run task
                        return tk.deferred;            // return deferrer
                    };
                    tk.runWithContext = function (context) {
                        tk.context = context;
                        return tk.run();
                    };
                }
            };
            self.ajaxQueue = [];
            self.ajaxRequests = [];
            self.ajaxPool = null;
            self.ajaxAborted = false;
        },
        _init: function (options, refreshMode) {
            var self = this, f, $el = self.$element, $cont, t, tmp;
            self.options = options;
            self.zoomPlaceholder = $h.getZoomPlaceholder();
            self.canOrientImage = $h.canOrientImage($el);
            $.each(options, function (key, value) {
                switch (key) {
                    case 'minFileCount':
                    case 'maxFileCount':
                    case 'maxTotalFileCount':
                    case 'minFileSize':
                    case 'maxFileSize':
                    case 'maxFilePreviewSize':
                    case 'resizeQuality':
                    case 'resizeIfSizeMoreThan':
                    case 'progressUploadThreshold':
                    case 'initialPreviewCount':
                    case 'zoomModalHeight':
                    case 'minImageHeight':
                    case 'maxImageHeight':
                    case 'minImageWidth':
                    case 'maxImageWidth':
                    case 'bytesToKB':
                        self[key] = $h.getNum(value);
                        break;
                    default:
                        self[key] = value;
                        break;
                }
            });
            if (!self.bytesToKB || self.bytesToKB <= 0) {
                self.bytesToKB = 1024;
            }
            if (self.errorCloseButton === undefined) {
                self.errorCloseButton = $h.closeButton('kv-error-close' + ($h.isBs(5) ? '  float-end' : ''));
            }
            if (self.maxTotalFileCount > 0 && self.maxTotalFileCount < self.maxFileCount) {
                self.maxTotalFileCount = self.maxFileCount;
            }
            if (self.rtl) { // swap buttons for rtl
                tmp = self.previewZoomButtonIcons.prev;
                self.previewZoomButtonIcons.prev = self.previewZoomButtonIcons.next;
                self.previewZoomButtonIcons.next = tmp;
            }
            // validate chunk threads to not exceed maxAjaxThreads
            if (!isNaN(self.maxAjaxThreads) && self.maxAjaxThreads < self.resumableUploadOptions.maxThreads) {
                self.resumableUploadOptions.maxThreads = self.maxAjaxThreads;
            }
            self._initFileManager();
            if (typeof self.autoOrientImage === 'function') {
                self.autoOrientImage = self.autoOrientImage();
            }
            if (typeof self.autoOrientImageInitial === 'function') {
                self.autoOrientImageInitial = self.autoOrientImageInitial();
            }
            if (!refreshMode) {
                self._cleanup();
            }
            self.duplicateErrors = [];
            self.$form = $el.closest('form');
            self._initTemplateDefaults();
            self.uploadFileAttr = !$h.isEmpty($el.attr('name')) ? $el.attr('name') : 'file_data';
            t = self._getLayoutTemplate('progress');
            self.progressTemplate = t.replace('{class}', self.progressClass);
            self.progressInfoTemplate = t.replace('{class}', self.progressInfoClass);
            self.progressPauseTemplate = t.replace('{class}', self.progressPauseClass);
            self.progressCompleteTemplate = t.replace('{class}', self.progressCompleteClass);
            self.progressErrorTemplate = t.replace('{class}', self.progressErrorClass);
            self.isDisabled = $el.attr('disabled') || $el.attr('readonly');
            if (self.isDisabled) {
                $el.attr('disabled', true);
            }
            self.isClickable = self.browseOnZoneClick && self.showPreview &&
                (self.dropZoneEnabled || !$h.isEmpty(self.defaultPreviewContent));
            self.isAjaxUpload = $h.hasFileUploadSupport() && !$h.isEmpty(self.uploadUrl);
            self.dropZoneEnabled = $h.hasDragDropSupport() && self.dropZoneEnabled;
            if (!self.isAjaxUpload) {
                self.dropZoneEnabled = self.dropZoneEnabled && $h.canAssignFilesToInput();
            }
            self.slug = typeof options.slugCallback === 'function' ? options.slugCallback : self._slugDefault;
            self.mainTemplate = self.showCaption ? self._getLayoutTemplate('main1') : self._getLayoutTemplate('main2');
            self.captionTemplate = self._getLayoutTemplate('caption');
            self.previewGenericTemplate = self._getPreviewTemplate('generic');
            if (!self.imageCanvas && self.resizeImage && (self.maxImageWidth || self.maxImageHeight)) {
                self.imageCanvas = document.createElement('canvas');
                self.imageCanvasContext = self.imageCanvas.getContext('2d');
            }
            if ($h.isEmpty($el.attr('id'))) {
                $el.attr('id', $h.uniqId());
            }
            self.namespace = '.fileinput_' + $el.attr('id').replace(/-/g, '_');
            if (self.$container === undefined) {
                self.$container = self._createContainer();
            } else {
                self._refreshContainer();
            }
            $cont = self.$container;
            self.$dropZone = $cont.find('.file-drop-zone');
            self.$progress = $cont.find('.kv-upload-progress');
            self.$btnUpload = $cont.find('.fileinput-upload');
            self.$captionContainer = $h.getElement(options, 'elCaptionContainer', $cont.find('.file-caption'));
            self.$caption = $h.getElement(options, 'elCaptionText', $cont.find('.file-caption-name'));
            if (!$h.isEmpty(self.msgPlaceholder)) {
                f = $el.attr('multiple') ? self.filePlural : self.fileSingle;
                self.$caption.attr('placeholder', self.msgPlaceholder.replace('{files}', f));
            }
            self.$captionIcon = self.$captionContainer.find('.file-caption-icon');
            self.$previewContainer = $h.getElement(options, 'elPreviewContainer', $cont.find('.file-preview'));
            self.$preview = $h.getElement(options, 'elPreviewImage', $cont.find('.file-preview-thumbnails'));
            self.$previewStatus = $h.getElement(options, 'elPreviewStatus', $cont.find('.file-preview-status'));
            self.$errorContainer = $h.getElement(options, 'elErrorContainer',
                self.$previewContainer.find('.kv-fileinput-error'));
            self._validateDisabled();
            if (!$h.isEmpty(self.msgErrorClass)) {
                $h.addCss(self.$errorContainer, self.msgErrorClass);
            }
            if (!refreshMode) {
                self._resetErrors();
                self.$errorContainer.hide();
                self.previewInitId = 'thumb-' + $el.attr('id');
                self._initPreviewCache();
                self._initPreview(true);
                self._initPreviewActions();
                if (self.$parent.hasClass('file-loading')) {
                    self.$container.insertBefore(self.$parent);
                    self.$parent.remove();
                }
            } else {
                if (!self._errorsExist()) {
                    self.$errorContainer.hide();
                }
            }
            self._setFileDropZoneTitle();
            if ($el.attr('disabled')) {
                self.disable();
            }
            self._initZoom();
            if (self.hideThumbnailContent) {
                $h.addCss(self.$preview, 'hide-content');
            }
        },
        _initFileManager: function () {
            var self = this;
            self.uploadStartTime = $h.now();
            self.fileManager = {
                stack: {},
                filesProcessed: [],
                errors: [],
                loadedImages: {},
                totalImages: 0,
                totalFiles: null,
                totalSize: null,
                uploadedSize: 0,
                stats: {},
                bpsLog: [],
                bps: 0,
                initStats: function (id) {
                    var data = {started: $h.now()};
                    if (id) {
                        self.fileManager.stats[id] = data;
                    } else {
                        self.fileManager.stats = data;
                    }
                },
                getUploadStats: function (id, loaded, total) {
                    var fm = self.fileManager,
                        started = id ? fm.stats[id] && fm.stats[id].started || $h.now() : self.uploadStartTime,
                        elapsed = ($h.now() - started) / 1000, bps = Math.ceil(elapsed ? loaded / elapsed : 0),
                        pendingBytes = total - loaded, out, delay = fm.bpsLog.length ? self.bitrateUpdateDelay : 0;
                    setTimeout(function () {
                        var i, j = 0, n = 0, len, beg;
                        fm.bpsLog.push(bps);
                        fm.bpsLog.sort(function (a, b) {
                            return a - b;
                        });
                        len = fm.bpsLog.length;
                        beg = len > 10 ? len - 10 : Math.ceil(len / 2);
                        for (i = len; i > beg; i--) {
                            n = parseFloat(fm.bpsLog[i]);
                            j++;
                        }
                        fm.bps = (j > 0 ? n / j : 0) * 64;
                    }, delay);
                    out = {
                        fileId: id,
                        started: started,
                        elapsed: elapsed,
                        loaded: loaded,
                        total: total,
                        bps: fm.bps,
                        bitrate: self._getSize(fm.bps, false, self.bitRateUnits),
                        pendingBytes: pendingBytes
                    };
                    if (id) {
                        fm.stats[id] = out;
                    } else {
                        fm.stats = out;
                    }
                    return out;
                },
                exists: function (id) {
                    return $.inArray(id, self.fileManager.getIdList()) !== -1;
                },
                count: function () {
                    return self.fileManager.getIdList().length;
                },
                total: function () {
                    var fm = self.fileManager;
                    if (!fm.totalFiles) {
                        fm.totalFiles = fm.count();
                    }
                    return fm.totalFiles;
                },
                getTotalSize: function () {
                    var fm = self.fileManager;
                    if (fm.totalSize) {
                        return fm.totalSize;
                    }
                    fm.totalSize = 0;
                    $.each(self.getFileStack(), function (id, f) {
                        var size = parseFloat(f.size);
                        fm.totalSize += isNaN(size) ? 0 : size;
                    });
                    return fm.totalSize;
                },
                add: function (file, id) {
                    if (!id) {
                        id = self.fileManager.getId(file);
                    }
                    if (!id) {
                        return;
                    }
                    self.fileManager.stack[id] = {
                        file: file,
                        name: $h.getFileName(file),
                        relativePath: $h.getFileRelativePath(file),
                        size: file.size,
                        nameFmt: self._getFileName(file, ''),
                        sizeFmt: self._getSize(file.size)
                    };
                },
                remove: function ($thumb) {
                    var id = self._getThumbFileId($thumb);
                    self.fileManager.removeFile(id);
                },
                removeFile: function (id) {
                    var fm = self.fileManager;
                    if (!id) {
                        return;
                    }
                    delete fm.stack[id];
                    delete fm.loadedImages[id];
                },
                move: function (idFrom, idTo) {
                    var result = {}, stack = self.fileManager.stack;
                    if (!idFrom && !idTo || idFrom === idTo) {
                        return;
                    }
                    $.each(stack, function (k, v) {
                        if (k !== idFrom) {
                            result[k] = v;
                        }
                        if (k === idTo) {
                            result[idFrom] = stack[idFrom];
                        }
                    });
                    self.fileManager.stack = result;
                },
                list: function () {
                    var files = [];
                    $.each(self.getFileStack(), function (k, v) {
                        if (v && v.file) {
                            files.push(v.file);
                        }
                    });
                    return files;
                },
                isPending: function (id) {
                    return $.inArray(id, self.fileManager.filesProcessed) === -1 && self.fileManager.exists(id);
                },
                isProcessed: function () {
                    var filesProcessed = true, fm = self.fileManager;
                    $.each(self.getFileStack(), function (id) {
                        if (fm.isPending(id)) {
                            filesProcessed = false;
                        }
                    });
                    return filesProcessed;
                },
                clear: function () {
                    var fm = self.fileManager;
                    self.isDuplicateError = false;
                    self.isPersistentError = false;
                    fm.totalFiles = null;
                    fm.totalSize = null;
                    fm.uploadedSize = 0;
                    fm.stack = {};
                    fm.errors = [];
                    fm.filesProcessed = [];
                    fm.stats = {};
                    fm.bpsLog = [];
                    fm.bps = 0;
                    fm.clearImages();
                },
                clearImages: function () {
                    self.fileManager.loadedImages = {};
                    self.fileManager.totalImages = 0;
                },
                addImage: function (id, config) {
                    self.fileManager.loadedImages[id] = config;
                },
                removeImage: function (id) {
                    delete self.fileManager.loadedImages[id];
                },
                getImageIdList: function () {
                    return $h.getObjectKeys(self.fileManager.loadedImages);
                },
                getImageCount: function () {
                    return self.fileManager.getImageIdList().length;
                },
                getId: function (file) {
                    return self._getFileId(file);
                },
                getIndex: function (id) {
                    return self.fileManager.getIdList().indexOf(id);
                },
                getThumb: function (id) {
                    var $thumb = null;
                    self._getThumbs().each(function () {
                        var $t = $(this);
                        if (self._getThumbFileId($t) === id) {
                            $thumb = $t;
                        }
                    });
                    return $thumb;
                },
                getThumbIndex: function ($thumb) {
                    var id = self._getThumbFileId($thumb);
                    return self.fileManager.getIndex(id);
                },
                getIdList: function () {
                    return $h.getObjectKeys(self.fileManager.stack);
                },
                getFile: function (id) {
                    return self.fileManager.stack[id] || null;
                },
                getFileName: function (id, fmt) {
                    var file = self.fileManager.getFile(id);
                    if (!file) {
                        return '';
                    }
                    return fmt ? (file.nameFmt || '') : file.name || '';
                },
                getFirstFile: function () {
                    var ids = self.fileManager.getIdList(), id = ids && ids.length ? ids[0] : null;
                    return self.fileManager.getFile(id);
                },
                setFile: function (id, file) {
                    if (self.fileManager.getFile(id)) {
                        self.fileManager.stack[id].file = file;
                    } else {
                        self.fileManager.add(file, id);
                    }
                },
                setProcessed: function (id) {
                    self.fileManager.filesProcessed.push(id);
                },
                getProgress: function () {
                    var total = self.fileManager.total(), filesProcessed = self.fileManager.filesProcessed.length;
                    if (!total) {
                        return 0;
                    }
                    return Math.ceil(filesProcessed / total * 100);

                },
                setProgress: function (id, pct) {
                    var f = self.fileManager.getFile(id);
                    if (!isNaN(pct) && f) {
                        f.progress = pct;
                    }
                }
            };
        },
        _setUploadData: function (fd, config) {
            var self = this;
            $.each(config, function (key, value) {
                var param = self.uploadParamNames[key] || key;
                if ($h.isArray(value)) {
                    fd.append(param, value[0], value[1]);
                } else {
                    fd.append(param, value);
                }
            });
        },
        _initResumableUpload: function () {
            var self = this, opts = self.resumableUploadOptions, logs = $h.logMessages, rm, fm = self.fileManager;
            if (!self.enableResumableUpload) {
                return;
            }
            if (opts.fallback !== false && typeof opts.fallback !== 'function') {
                opts.fallback = function (s) {
                    s._log(logs.noResumableSupport);
                    s.enableResumableUpload = false;
                };
            }
            if (!$h.hasResumableUploadSupport() && opts.fallback !== false) {
                opts.fallback(self);
                return;
            }
            if (!self.uploadUrl && self.enableResumableUpload) {
                self._log(logs.noUploadUrl);
                self.enableResumableUpload = false;
                return;

            }
            opts.chunkSize = parseFloat(opts.chunkSize);
            if (opts.chunkSize <= 0 || isNaN(opts.chunkSize)) {
                self._log(logs.invalidChunkSize, {chunkSize: opts.chunkSize});
                self.enableResumableUpload = false;
                return;
            }
            rm = self.resumableManager = {
                init: function (id, f, index) {
                    rm.logs = [];
                    rm.stack = [];
                    rm.error = '';
                    rm.id = id;
                    rm.file = f.file;
                    rm.fileName = f.name;
                    rm.fileIndex = index;
                    rm.completed = false;
                    rm.lastProgress = 0;
                    if (self.showPreview) {
                        rm.$thumb = fm.getThumb(id) || null;
                        rm.$progress = rm.$btnDelete = null;
                        if (rm.$thumb && rm.$thumb.length) {
                            rm.$progress = rm.$thumb.find('.file-thumb-progress');
                            rm.$btnDelete = rm.$thumb.find('.kv-file-remove');
                        }
                    }
                    rm.chunkSize = opts.chunkSize * self.bytesToKB;
                    rm.chunkCount = rm.getTotalChunks();
                },
                setAjaxError: function (jqXHR, textStatus, errorThrown, isTest) {
                    if (jqXHR.responseJSON && jqXHR.responseJSON.error) {
                        errorThrown = jqXHR.responseJSON.error.toString();
                    }
                    if (!isTest) {
                        rm.error = errorThrown;
                    }
                    if (opts.showErrorLog) {
                        self._log(logs.ajaxError, {
                            status: jqXHR.status,
                            error: errorThrown,
                            text: jqXHR.responseText || ''
                        });
                    }
                },
                reset: function () {
                    rm.stack = [];
                    rm.chunksProcessed = {};
                },
                setProcessed: function (status) {
                    var id = rm.id, msg, $thumb = rm.$thumb, $prog = rm.$progress, hasThumb = $thumb && $thumb.length,
                        params = {id: hasThumb ? $thumb.attr('id') : '', index: fm.getIndex(id), fileId: id}, tokens,
                        skipErrorsAndProceed = self.resumableUploadOptions.skipErrorsAndProceed;
                    rm.completed = true;
                    rm.lastProgress = 0;
                    if (hasThumb) {
                        $thumb.removeClass('file-uploading');
                    }
                    if (status === 'success') {
                        fm.uploadedSize += rm.file.size;
                        if (self.showPreview) {
                            self._setProgress(101, $prog);
                            self._setThumbStatus($thumb, 'Success');
                            self._initUploadSuccess(rm.chunksProcessed[id].data, $thumb);
                        }
                        fm.removeFile(id);
                        delete rm.chunksProcessed[id];
                        self._raise('fileuploaded', [params.id, params.index, params.fileId]);
                        if (fm.isProcessed()) {
                            self._setProgress(101);
                        }
                    } else {
                        if (status !== 'cancel') {
                            if (self.showPreview) {
                                self._setThumbStatus($thumb, 'Error');
                                self._setPreviewError($thumb, true);
                                self._setProgress(101, $prog, self.msgProgressError);
                                self._setProgress(101, self.$progress, self.msgProgressError);
                                self.cancelling = !skipErrorsAndProceed;
                            }
                            if (!self.$errorContainer.find('li[data-file-id="' + params.fileId + '"]').length) {
                                tokens = {file: rm.fileName, max: opts.maxRetries, error: rm.error};
                                msg = self.msgResumableUploadRetriesExceeded.setTokens(tokens);
                                $.extend(params, tokens);
                                self._showFileError(msg, params, 'filemaxretries');
                                if (skipErrorsAndProceed) {
                                    fm.removeFile(id);
                                    delete rm.chunksProcessed[id];
                                    if (fm.isProcessed()) {
                                        self._setProgress(101);
                                    }
                                }
                            }
                        }
                    }
                    if (fm.isProcessed()) {
                        rm.reset();
                    }
                },
                check: function () {
                    var status = true;
                    $.each(rm.logs, function (index, value) {
                        if (!value) {
                            status = false;
                            return false;
                        }
                    });
                },
                processedResumables: function () {
                    var logs = rm.logs, i, count = 0;
                    if (!logs || !logs.length) {
                        return 0;
                    }
                    for (i = 0; i < logs.length; i++) {
                        if (logs[i] === true) {
                            count++;
                        }
                    }
                    return count;
                },
                getUploadedSize: function () {
                    var size = rm.processedResumables() * rm.chunkSize;
                    return size > rm.file.size ? rm.file.size : size;
                },
                getTotalChunks: function () {
                    var chunkSize = parseFloat(rm.chunkSize);
                    if (!isNaN(chunkSize) && chunkSize > 0) {
                        return Math.ceil(rm.file.size / chunkSize);
                    }
                    return 0;
                },
                getProgress: function () {
                    var chunksProcessed = rm.processedResumables(), total = rm.chunkCount;
                    if (total === 0) {
                        return 0;
                    }
                    return Math.ceil(chunksProcessed / total * 100);
                },
                checkAborted: function (intervalId) {
                    if (self._isAborted()) {
                        clearInterval(intervalId);
                        self.unlock();
                    }
                },
                upload: function () {
                    var ids = fm.getIdList(), flag = 'new', intervalId;
                    intervalId = setInterval(function () {
                        var id;
                        rm.checkAborted(intervalId);
                        if (flag === 'new') {
                            self.lock();
                            flag = 'processing';
                            id = ids.shift();
                            fm.initStats(id);
                            if (fm.stack[id]) {
                                rm.init(id, fm.stack[id], fm.getIndex(id));
                                rm.processUpload();
                            }
                        }
                        if (!fm.isPending(id) && rm.completed) {
                            flag = 'new';
                        }
                        if (fm.isProcessed()) {
                            var $initThumbs = self.$preview.find('.file-preview-initial');
                            if ($initThumbs.length) {
                                $h.addCss($initThumbs, $h.SORT_CSS);
                                self._initSortable();
                            }
                            clearInterval(intervalId);
                            self._clearFileInput();
                            self.unlock();
                            setTimeout(function () {
                                var data = self.previewCache.data;
                                if (data) {
                                    self.initialPreview = data.content;
                                    self.initialPreviewConfig = data.config;
                                    self.initialPreviewThumbTags = data.tags;
                                }
                                self._raise('filebatchuploadcomplete', [
                                    self.initialPreview,
                                    self.initialPreviewConfig,
                                    self.initialPreviewThumbTags,
                                    self._getExtraData()
                                ]);
                            }, self.processDelay);
                        }
                    }, self.processDelay);
                },
                uploadResumable: function () {
                    var i, pool, tm = self.taskManager, total = rm.chunkCount;
                    pool = tm.addPool(rm.id);
                    for (i = 0; i < total; i++) {
                        rm.logs[i] = !!(rm.chunksProcessed[rm.id] && rm.chunksProcessed[rm.id][i]);
                        if (!rm.logs[i]) {
                            rm.pushAjax(i, 0);
                        }
                    }
                    pool.run(opts.maxThreads)
                        .done(function () {
                            rm.setProcessed('success');
                        })
                        .fail(function () {
                            rm.setProcessed(pool.cancelled ? 'cancel' : 'error');
                        });
                },
                processUpload: function () {
                    var fd, f, id = rm.id, fnBefore, fnSuccess, fnError, fnComplete, outData;
                    if (!opts.testUrl) {
                        rm.uploadResumable();
                        return;
                    }
                    fd = new FormData();
                    f = fm.stack[id];
                    self._setUploadData(fd, {
                        fileId: id,
                        fileName: f.fileName,
                        fileSize: f.size,
                        fileRelativePath: f.relativePath,
                        chunkSize: rm.chunkSize,
                        chunkCount: rm.chunkCount
                    });
                    fnBefore = function (jqXHR) {
                        outData = self._getOutData(fd, jqXHR);
                        self._raise('filetestbeforesend', [id, fm, rm, outData]);
                    };
                    fnSuccess = function (data, textStatus, jqXHR) {
                        outData = self._getOutData(fd, jqXHR, data);
                        var pNames = self.uploadParamNames, chunksUploaded = pNames.chunksUploaded || 'chunksUploaded',
                            params = [id, fm, rm, outData];
                        if (!data[chunksUploaded] || !$h.isArray(data[chunksUploaded])) {
                            self._raise('filetesterror', params);
                        } else {
                            if (!rm.chunksProcessed[id]) {
                                rm.chunksProcessed[id] = {};
                            }
                            $.each(data[chunksUploaded], function (key, index) {
                                rm.logs[index] = true;
                                rm.chunksProcessed[id][index] = true;
                            });
                            rm.chunksProcessed[id].data = data;
                            self._raise('filetestsuccess', params);
                        }
                        rm.uploadResumable();
                    };
                    fnError = function (jqXHR, textStatus, errorThrown) {
                        outData = self._getOutData(fd, jqXHR);
                        self._raise('filetestajaxerror', [id, fm, rm, outData]);
                        rm.setAjaxError(jqXHR, textStatus, errorThrown, true);
                        rm.uploadResumable();
                    };
                    fnComplete = function () {
                        self._raise('filetestcomplete', [id, fm, rm, self._getOutData(fd)]);
                    };
                    self._ajaxSubmit(fnBefore, fnSuccess, fnComplete, fnError, fd, id, rm.fileIndex, opts.testUrl);
                },
                pushAjax: function (index, retry) {
                    var tm = self.taskManager, pool = tm.getPool(rm.id);
                    pool.addTask(pool.size() + 1, function (deferrer) {
                        // use fifo chunk stack
                        var arr = rm.stack.shift(), index;
                        index = arr[0];
                        if (!rm.chunksProcessed[rm.id] || !rm.chunksProcessed[rm.id][index]) {
                            rm.sendAjax(index, arr[1], deferrer);
                        } else {
                            self._log(logs.chunkQueueError, {index: index});
                        }
                    });
                    rm.stack.push([index, retry]);
                },
                sendAjax: function (index, retry, deferrer) {
                    var f, chunkSize = rm.chunkSize, id = rm.id, file = rm.file, $thumb = rm.$thumb,
                        msgs = $h.logMessages, $btnDelete = rm.$btnDelete, logError = function (msg, tokens) {
                            if (tokens) {
                                msg = msg.setTokens(tokens);
                            }
                            msg = msgs.resumableRequestError.setTokens({msg: msg});
                            self._log(msg);
                            deferrer.reject(msg);
                        };
                    if (rm.chunksProcessed[id] && rm.chunksProcessed[id][index]) {
                        return;
                    }
                    if (retry > opts.maxRetries) {
                        logError(msgs.resumableMaxRetriesReached, {n: opts.maxRetries});
                        rm.setProcessed('error');
                        return;
                    }
                    var fd, outData, fnBefore, fnSuccess, fnError, fnComplete, slice = file.slice ? 'slice' :
                            (file.mozSlice ? 'mozSlice' : (file.webkitSlice ? 'webkitSlice' : 'slice')),
                        blob = file[slice](chunkSize * index, chunkSize * (index + 1));
                    fd = new FormData();
                    f = fm.stack[id];
                    self._setUploadData(fd, {
                        chunkCount: rm.chunkCount,
                        chunkIndex: index,
                        chunkSize: chunkSize,
                        chunkSizeStart: chunkSize * index,
                        fileBlob: [blob, rm.fileName],
                        fileId: id,
                        fileName: rm.fileName,
                        fileRelativePath: f.relativePath,
                        fileSize: file.size,
                        retryCount: retry
                    });
                    if (rm.$progress && rm.$progress.length) {
                        rm.$progress.show();
                    }
                    fnBefore = function (jqXHR) {
                        outData = self._getOutData(fd, jqXHR);
                        if (self.showPreview) {
                            if (!$thumb.hasClass('file-preview-success')) {
                                self._setThumbStatus($thumb, 'Loading');
                                $h.addCss($thumb, 'file-uploading');
                            }
                            $btnDelete.attr('disabled', true);
                        }
                        self._raise('filechunkbeforesend', [id, index, retry, fm, rm, outData]);
                    };
                    fnSuccess = function (data, textStatus, jqXHR) {
                        if (self._isAborted()) {
                            logError(msgs.resumableAborting);
                            return;
                        }
                        outData = self._getOutData(fd, jqXHR, data);
                        var paramNames = self.uploadParamNames, chunkIndex = paramNames.chunkIndex || 'chunkIndex',
                            params = [id, index, retry, fm, rm, outData];
                        if (data.error) {
                            if (opts.showErrorLog) {
                                self._log(logs.retryStatus, {
                                    retry: retry + 1,
                                    filename: rm.fileName,
                                    chunk: index
                                });
                            }
                            self._raise('filechunkerror', params);
                            rm.pushAjax(index, retry + 1);
                            rm.error = data.error;
                            logError(data.error);
                        } else {
                            rm.logs[data[chunkIndex]] = true;
                            if (!rm.chunksProcessed[id]) {
                                rm.chunksProcessed[id] = {};
                            }
                            rm.chunksProcessed[id][data[chunkIndex]] = true;
                            rm.chunksProcessed[id].data = data;
                            deferrer.resolve.call(null, data);
                            self._raise('filechunksuccess', params);
                            rm.check();
                        }
                    };
                    fnError = function (jqXHR, textStatus, errorThrown) {
                        if (self._isAborted()) {
                            logError(msgs.resumableAborting);
                            return;
                        }
                        outData = self._getOutData(fd, jqXHR);
                        rm.setAjaxError(jqXHR, textStatus, errorThrown);
                        self._raise('filechunkajaxerror', [id, index, retry, fm, rm, outData]);
                        rm.pushAjax(index, retry + 1);                        // push another task
                        logError(msgs.resumableRetryError, {n: retry - 1}); // resolve the current task
                    };
                    fnComplete = function () {
                        if (!self._isAborted()) {
                            self._raise('filechunkcomplete', [id, index, retry, fm, rm, self._getOutData(fd)]);
                        }
                    };
                    self._ajaxSubmit(fnBefore, fnSuccess, fnComplete, fnError, fd, id, rm.fileIndex);
                }
            };
            rm.reset();
        },
        _initTemplateDefaults: function () {
            var self = this, tMain1, tMain2, tPreview, tFileIcon, tClose, tCaption, tBtnDefault, tBtnLink, tBtnBrowse,
                tModalMain, tModal, tProgress, tSize, tFooter, tActions, tActionDelete, tActionUpload, tActionDownload,
                tActionZoom, tActionDrag, tIndicator, tTagBef, tTagBef1, tTagBef2, tTagAft, tGeneric, tHtml, tImage,
                tText, tOffice, tGdocs, tVideo, tAudio, tFlash, tObject, tPdf, tOther, tStyle, tZoomCache, vDefaultDim,
                tActionRotate, tStats, tModalLabel, tDescClose, renderObject = function (type, mime) {
                    return '<object class="kv-preview-data file-preview-' + type + '" title="{caption}" ' +
                        'data="{data}" type="' + mime + '"' + tStyle + '>\n' + $h.DEFAULT_PREVIEW + '\n</object>\n';
                }, defBtnCss1 = 'btn btn-sm btn-kv ' + $h.defaultButtonCss();
            tMain1 = '{preview}\n' +
                '<div class="kv-upload-progress kv-hidden"></div><div class="clearfix"></div>\n' +
                '<div class="file-caption {class}">\n' +
                '  <div class="input-group {inputGroupClass}">\n' +
                '      {caption}\n<span class="file-caption-icon"></span>\n' +
                ($h.isBs(5) ? '' : '<div class="input-group-btn input-group-append">\n') +
                '      {remove}\n' +
                '      {cancel}\n' +
                '      {pause}\n' +
                '      {upload}\n' +
                '      {browse}\n' +
                ($h.isBs(5) ? '' : '    </div>\n') +
                '  </div>';
            '</div>';
            tMain2 = '{preview}\n<div class="kv-upload-progress kv-hidden"></div>\n<div class="clearfix"></div>\n' +
                '<span class="{class}">{remove}\n{cancel}\n{upload}\n{browse}\n</span>';
            tPreview = '<div class="file-preview {class}">\n' +
                '  {close}' +
                '  <div class="{dropClass} clearfix">\n' +
                '    <div class="file-preview-thumbnails clearfix">\n' +
                '    </div>\n' +
                '    <div class="file-preview-status text-center text-success"></div>\n' +
                '    <div class="kv-fileinput-error"></div>\n' +
                '  </div>\n' +
                '</div>';
            tClose = $h.closeButton('fileinput-remove');
            tFileIcon = '<i class="bi-file-earmark-arrow-up"></i>';
            // noinspection HtmlUnknownAttribute
            tCaption = '<input readonly class="file-caption-name form-control {class}">\n';
            //noinspection HtmlUnknownAttribute
            tBtnDefault = '<button type="{type}" title="{title}" class="{css}" ' +
                '{status} {tabIndexConfig}>{icon} {label}</button>';
            //noinspection HtmlUnknownTarget,HtmlUnknownAttribute
            tBtnLink = '<a href="{href}" title="{title}" class="{css}" {status} {tabIndexConfig}>{icon} {label}</a>';
            //noinspection HtmlUnknownAttribute
            tBtnBrowse = '<div class="{css}" {status} {tabIndexConfig}>{icon} {label}</div>';
            tModalLabel = $h.MODAL_ID + 'Label';
            tModalMain = '<div id="' + $h.MODAL_ID + '" class="file-zoom-dialog modal fade" ' +
                'aria-labelledby="' + tModalLabel + '" {tabIndexConfig}></div>';
            tModal = '<div class="modal-dialog modal-lg{rtl}" role="document">\n' +
                '  <div class="modal-content">\n' +
                '    <div class="modal-header kv-zoom-header">\n' +
                '      <h6 class="modal-title kv-zoom-title" id="' + tModalLabel + '"><span class="kv-zoom-caption"></span> <span class="kv-zoom-size"></span></h6>\n' +
                '      <div class="kv-zoom-actions">{rotate}{toggleheader}{fullscreen}{borderless}{close}</div>\n' +
                '    </div>\n' +
                '    <div class="floating-buttons"></div>\n' +
                '    <div class="kv-zoom-body file-zoom-content {zoomFrameClass}"></div>\n' + '{prev} {next}\n' +
                '    <div class="kv-zoom-description"></div>\n' +
                '  </div>\n' +
                '</div>\n';
            tDescClose = '<button type="button" class="kv-desc-hide" aria-label="Close">{closeIcon}</button>';
            tProgress = '<div class="progress">\n' +
                '    <div class="{class}" role="progressbar"' +
                ' aria-valuenow="{percent}" aria-valuemin="0" aria-valuemax="100" style="width:{percent}%;">\n' +
                '        {status}\n' +
                '     </div>\n' +
                '</div>{stats}';
            tStats = '<div class="text-primary file-upload-stats">' +
                '<span class="pending-time">{pendingTime}</span> ' +
                '<span class="upload-speed">{uploadSpeed}</span>' +
                '</div>';
            tSize = ' <samp>({sizeText})</samp>';
            tFooter = '<div class="file-thumbnail-footer">\n' +
                '    <div class="file-footer-caption" title="{caption}">\n' +
                '        <div class="file-caption-info">{caption}</div>\n' +
                '        <div class="file-size-info">{size}</div>\n' +
                '    </div>\n' +
                '    {progress}\n{indicator}\n{actions}\n' +
                '</div>';
            tActions = '<div class="file-actions">\n' +
                '    <div class="file-footer-buttons">\n' +
                '        {rotate} {download} {upload} {delete} {zoom} {other}' +
                '    </div>\n' +
                '</div>\n' +
                '{drag}\n' +
                '<div class="clearfix"></div>';
            //noinspection HtmlUnknownAttribute
            tActionDelete = '<button type="button" class="kv-file-remove {removeClass}" ' +
                'title="{removeTitle}" {dataUrl}{dataKey}>{removeIcon}</button>\n';
            tActionUpload = '<button type="button" class="kv-file-upload {uploadClass}" title="{uploadTitle}">' +
                '{uploadIcon}</button>';
            tActionRotate = '<button type="button" class="kv-file-rotate {rotateClass}" title="{rotateTitle}">' +
                '{rotateIcon}</button>';
            tActionDownload = '<a class="kv-file-download {downloadClass}" title="{downloadTitle}" ' +
                'href="{downloadUrl}" download="{caption}" target="_blank">{downloadIcon}</a>';
            tActionZoom = '<button type="button" class="kv-file-zoom {zoomClass}" ' +
                'title="{zoomTitle}">{zoomIcon}</button>';
            tActionDrag = '<span class="file-drag-handle {dragClass}" title="{dragTitle}">{dragIcon}</span>';
            tIndicator = '<div class="file-upload-indicator" title="{indicatorTitle}">{indicator}</div>';
            tTagBef = '<div class="file-preview-frame {frameClass}" id="{previewId}" data-fileindex="{fileindex}"' +
                ' data-fileid="{fileid}" data-filename="{filename}" data-template="{template}" data-zoom="{zoomData}"';
            tTagBef1 = tTagBef + '><div class="kv-file-content">\n';
            tTagBef2 = tTagBef + ' title="{caption}"><div class="kv-file-content">\n';
            tTagAft = '</div>{footer}\n{zoomCache}</div>\n';
            tGeneric = '{content}\n';
            tStyle = ' {style}';
            tHtml = renderObject('html', 'text/html');
            tText = renderObject('text', 'text/plain;charset=UTF-8');
            tPdf = renderObject('pdf', 'application/pdf');
            tImage = '<img src="{data}" class="file-preview-image kv-preview-data" title="{title}" alt="{alt}"' +
                tStyle + '>\n';
            tOffice = '<iframe class="kv-preview-data file-preview-office" ' +
                'src="https://view.officeapps.live.com/op/embed.aspx?src={data}"' + tStyle + '></iframe>';
            tGdocs = '<iframe class="kv-preview-data file-preview-gdocs" ' +
                'src="https://docs.google.com/gview?url={data}&embedded=true"' + tStyle + '></iframe>';
            tVideo = '<video class="kv-preview-data file-preview-video" controls' + tStyle + '>\n' +
                '<source src="{data}" type="{type}">\n' + $h.DEFAULT_PREVIEW + '\n</video>\n';
            tAudio = '<!--suppress ALL --><audio class="kv-preview-data file-preview-audio" controls' + tStyle + '>\n<source src="{data}" ' +
                'type="{type}">\n' + $h.DEFAULT_PREVIEW + '\n</audio>\n';
            tFlash = '<embed class="kv-preview-data file-preview-flash" src="{data}" type="application/x-shockwave-flash"' + tStyle + '>\n';
            tObject = '<object class="kv-preview-data file-preview-object file-object {typeCss}" ' +
                'data="{data}" type="{type}"' + tStyle + '>\n' + '<param name="movie" value="{caption}" />\n' +
                $h.OBJECT_PARAMS + ' ' + $h.DEFAULT_PREVIEW + '\n</object>\n';
            tOther = '<div class="kv-preview-data file-preview-other-frame"' + tStyle + '>\n' + $h.DEFAULT_PREVIEW + '\n</div>\n';
            tZoomCache = '<div class="kv-zoom-cache">{zoomContent}</div>';
            vDefaultDim = {width: '100%', height: '100%', 'min-height': '480px'};
            if (self._isPdfRendered()) {
                tPdf = self.pdfRendererTemplate.replace('{renderer}', self._encodeURI(self.pdfRendererUrl));
            }
            self.defaults = {
                layoutTemplates: {
                    main1: tMain1,
                    main2: tMain2,
                    preview: tPreview,
                    close: tClose,
                    fileIcon: tFileIcon,
                    caption: tCaption,
                    modalMain: tModalMain,
                    modal: tModal,
                    descriptionClose: tDescClose,
                    progress: tProgress,
                    stats: tStats,
                    size: tSize,
                    footer: tFooter,
                    indicator: tIndicator,
                    actions: tActions,
                    actionDelete: tActionDelete,
                    actionRotate: tActionRotate,
                    actionUpload: tActionUpload,
                    actionDownload: tActionDownload,
                    actionZoom: tActionZoom,
                    actionDrag: tActionDrag,
                    btnDefault: tBtnDefault,
                    btnLink: tBtnLink,
                    btnBrowse: tBtnBrowse,
                    zoomCache: tZoomCache
                },
                previewMarkupTags: {
                    tagBefore1: tTagBef1,
                    tagBefore2: tTagBef2,
                    tagAfter: tTagAft
                },
                previewContentTemplates: {
                    generic: tGeneric,
                    html: tHtml,
                    image: tImage,
                    text: tText,
                    office: tOffice,
                    gdocs: tGdocs,
                    video: tVideo,
                    audio: tAudio,
                    flash: tFlash,
                    object: tObject,
                    pdf: tPdf,
                    other: tOther
                },
                allowedPreviewTypes: ['image', 'html', 'text', 'video', 'audio', 'flash', 'pdf', 'object'],
                previewTemplates: {},
                previewSettings: {
                    image: {width: 'auto', height: 'auto', 'max-width': '100%', 'max-height': '100%'},
                    html: {width: '213px', height: '160px'},
                    text: {width: '213px', height: '160px'},
                    office: {width: '213px', height: '160px'},
                    gdocs: {width: '213px', height: '160px'},
                    video: {width: '213px', height: '160px'},
                    audio: {width: '100%', height: '30px'},
                    flash: {width: '213px', height: '160px'},
                    object: {width: '213px', height: '160px'},
                    pdf: {width: '100%', height: '160px', 'position': 'relative'},
                    other: {width: '213px', height: '160px'}
                },
                previewSettingsSmall: {
                    image: {width: 'auto', height: 'auto', 'max-width': '100%', 'max-height': '100%'},
                    html: {width: '100%', height: '160px'},
                    text: {width: '100%', height: '160px'},
                    office: {width: '100%', height: '160px'},
                    gdocs: {width: '100%', height: '160px'},
                    video: {width: '100%', height: 'auto'},
                    audio: {width: '100%', height: '30px'},
                    flash: {width: '100%', height: 'auto'},
                    object: {width: '100%', height: 'auto'},
                    pdf: {width: '100%', height: '160px'},
                    other: {width: '100%', height: '160px'}
                },
                previewZoomSettings: {
                    image: {width: 'auto', height: 'auto', 'max-width': '100%', 'max-height': '100%'},
                    html: vDefaultDim,
                    text: vDefaultDim,
                    office: {width: '100%', height: '100%', 'max-width': '100%', 'min-height': '480px'},
                    gdocs: {width: '100%', height: '100%', 'max-width': '100%', 'min-height': '480px'},
                    video: {width: 'auto', height: '100%', 'max-width': '100%'},
                    audio: {width: '100%', height: '30px'},
                    flash: {width: 'auto', height: '480px'},
                    object: {width: 'auto', height: '100%', 'max-width': '100%', 'min-height': '480px'},
                    pdf: vDefaultDim,
                    other: {width: 'auto', height: '100%', 'min-height': '480px'}
                },
                mimeTypeAliases: {
                    'video/quicktime': 'video/mp4'
                },
                fileTypeSettings: {
                    image: function (vType, vName) {
                        return ($h.compare(vType, 'image.*') && !$h.compare(vType, /(tiff?|wmf)$/i) ||
                            $h.compare(vName, /\.(gif|png|jpe?g)$/i));
                    },
                    html: function (vType, vName) {
                        return $h.compare(vType, 'text/html') || $h.compare(vName, /\.(htm|html)$/i);
                    },
                    office: function (vType, vName) {
                        return $h.compare(vType, /(word|excel|powerpoint|office)$/i) ||
                            $h.compare(vName, /\.(docx?|xlsx?|pptx?|pps|potx?)$/i);
                    },
                    gdocs: function (vType, vName) {
                        return $h.compare(vType, /(word|excel|powerpoint|office|iwork-pages|tiff?)$/i) ||
                            $h.compare(vName,
                                /\.(docx?|xlsx?|pptx?|pps|potx?|rtf|ods|odt|pages|ai|dxf|ttf|tiff?|wmf|e?ps)$/i);
                    },
                    text: function (vType, vName) {
                        return $h.compare(vType, 'text.*') || $h.compare(vName, /\.(xml|javascript)$/i) ||
                            $h.compare(vName, /\.(txt|md|nfo|ini|json|php|js|css)$/i);
                    },
                    video: function (vType, vName) {
                        return $h.compare(vType, 'video.*') && ($h.compare(vType, /(ogg|mp4|mp?g|mov|webm|3gp)$/i) ||
                            $h.compare(vName, /\.(og?|mp4|webm|mp?g|mov|3gp)$/i));
                    },
                    audio: function (vType, vName) {
                        return $h.compare(vType, 'audio.*') && ($h.compare(vName, /(ogg|mp3|mp?g|wav)$/i) ||
                            $h.compare(vName, /\.(og?|mp3|mp?g|wav)$/i));
                    },
                    flash: function (vType, vName) {
                        return $h.compare(vType, 'application/x-shockwave-flash', true) || $h.compare(vName,
                            /\.(swf)$/i);
                    },
                    pdf: function (vType, vName) {
                        return $h.compare(vType, 'application/pdf', true) || $h.compare(vName, /\.(pdf)$/i);
                    },
                    object: function () {
                        return true;
                    },
                    other: function () {
                        return true;
                    }
                },
                fileActionSettings: {
                    showRemove: true,
                    showUpload: true,
                    showDownload: true,
                    showZoom: true,
                    showDrag: true,
                    showRotate: true,
                    removeIcon: '<i class="bi-trash"></i>',
                    removeClass: defBtnCss1,
                    removeErrorClass: 'btn btn-sm btn-kv btn-danger',
                    removeTitle: 'Remove file',
                    uploadIcon: '<i class="bi-upload"></i>',
                    uploadClass: defBtnCss1,
                    uploadTitle: 'Upload file',
                    uploadRetryIcon: '<i class="bi-cloud-arrow-up-fill"></i>',
                    uploadRetryTitle: 'Retry upload',
                    downloadIcon: '<i class="bi-download"></i>',
                    downloadClass: defBtnCss1,
                    downloadTitle: 'Download file',
                    rotateIcon: '<i class="bi-arrow-clockwise"></i>',
                    rotateClass: defBtnCss1,
                    rotateTitle: 'Rotate 90 deg. clockwise',
                    zoomIcon: '<i class="bi-zoom-in"></i>',
                    zoomClass: defBtnCss1,
                    zoomTitle: 'View Details',
                    dragIcon: '<i class="bi-arrows-move"></i>',
                    dragClass: 'text-primary',
                    dragTitle: 'Move / Rearrange',
                    dragSettings: {},
                    indicatorNew: '<i class="bi-plus-lg text-warning"></i>',
                    indicatorSuccess: '<i class="bi-check-lg text-success"></i>',
                    indicatorError: '<i class="bi-exclamation-lg text-danger"></i>',
                    indicatorLoading: '<i class="bi-hourglass-bottom text-muted"></i>',
                    indicatorPaused: '<i class="bi-pause-fill text-primary"></i>',
                    indicatorNewTitle: 'Not uploaded yet',
                    indicatorSuccessTitle: 'Uploaded',
                    indicatorErrorTitle: 'Upload Error',
                    indicatorLoadingTitle: 'Uploading &hellip;',
                    indicatorPausedTitle: 'Upload Paused'
                }
            };
            $.each(self.defaults, function (key, setting) {
                if (key === 'allowedPreviewTypes') {
                    if (self.allowedPreviewTypes === undefined) {
                        self.allowedPreviewTypes = setting;
                    }
                    return;
                }
                self[key] = $.extend(true, {}, setting, self[key]);
            });
            self._initPreviewTemplates();
        },
        _initPreviewTemplates: function () {
            var self = this, tags = self.previewMarkupTags, tagBef, tagAft = tags.tagAfter;
            $.each(self.previewContentTemplates, function (key, value) {
                if ($h.isEmpty(self.previewTemplates[key])) {
                    tagBef = tags.tagBefore2;
                    if (key === 'generic' || key === 'image') {
                        tagBef = tags.tagBefore1;
                    }
                    if (self._isPdfRendered() && key === 'pdf') {
                        tagBef = tagBef.replace('kv-file-content', 'kv-file-content kv-pdf-rendered');
                    }
                    self.previewTemplates[key] = tagBef + value + tagAft;
                }
            });
        },
        _initPreviewCache: function () {
            var self = this;
            self.previewCache = {
                data: {},
                init: function () {
                    var content = self.initialPreview;
                    if (content.length > 0 && !$h.isArray(content)) {
                        content = content.split(self.initialPreviewDelimiter);
                    }
                    self.previewCache.data = {
                        content: content,
                        config: self.initialPreviewConfig,
                        tags: self.initialPreviewThumbTags
                    };
                },
                count: function (skipNull) {
                    if (!self.previewCache.data || !self.previewCache.data.content) {
                        return 0;
                    }
                    if (skipNull) {
                        var chk = self.previewCache.data.content.filter(function (n) {
                            return n !== null;
                        });
                        return chk.length;
                    }
                    return self.previewCache.data.content.length;
                },
                get: function (i, isDisabled) {
                    var ind = $h.INIT_FLAG + i, data = self.previewCache.data, config = data.config[i],
                        content = data.content[i], out, $tmp, cat, ftr,
                        fname, ftype, frameClass, asData = $h.ifSet('previewAsData', config, self.initialPreviewAsData),
                        a = config ? {title: config.title || null, alt: config.alt || null} : {title: null, alt: null},
                        parseTemplate = function (cat, dat, fname, ftype, ftr, ind, fclass, t) {
                            var fc = ' file-preview-initial ' + $h.SORT_CSS + (fclass ? ' ' + fclass : ''),
                                id = self.previewInitId + '-' + ind,
                                fileId = config && config.fileId || id;
                            /** @namespace config.zoomData */
                            return self._generatePreviewTemplate(cat, dat, fname, ftype, id, fileId, false, null, null, fc,
                                ftr, ind, t, a, config && config.zoomData || dat);
                        };
                    if (!content || !content.length) {
                        return '';
                    }
                    isDisabled = isDisabled === undefined ? true : isDisabled;
                    cat = $h.ifSet('type', config, self.initialPreviewFileType || 'generic');
                    fname = $h.ifSet('filename', config, $h.ifSet('caption', config));
                    ftype = $h.ifSet('filetype', config, cat);
                    ftr = self.previewCache.footer(i, isDisabled, (config && config.size || null));
                    frameClass = $h.ifSet('frameClass', config);
                    if (asData) {
                        out = parseTemplate(cat, content, fname, ftype, ftr, ind, frameClass);
                    } else {
                        out = parseTemplate('generic', content, fname, ftype, ftr, ind, frameClass, cat)
                            .setTokens({'content': data.content[i]});
                    }
                    if (data.tags.length && data.tags[i]) {
                        out = $h.replaceTags(out, data.tags[i]);
                    }
                    /** @namespace config.frameAttr */
                    if (!$h.isEmpty(config) && !$h.isEmpty(config.frameAttr)) {
                        $tmp = $h.createElement(out);
                        $tmp.find('.file-preview-initial').attr(config.frameAttr);
                        out = $tmp.html();
                        $tmp.remove();
                    }
                    return out;
                },
                clean: function (data) {
                    data.content = $h.cleanArray(data.content);
                    data.config = $h.cleanArray(data.config);
                    data.tags = $h.cleanArray(data.tags);
                    self.previewCache.data = data;
                },
                add: function (content, config, tags, append) {
                    var data = self.previewCache.data, index;
                    if (!content || !content.length) {
                        return 0;
                    }
                    index = content.length - 1;
                    if (!$h.isArray(content)) {
                        content = content.split(self.initialPreviewDelimiter);
                    }
                    if (append && data.content) {
                        index = data.content.push(content[0]) - 1;
                        data.config[index] = config;
                        data.tags[index] = tags;
                    } else {
                        data.content = content;
                        data.config = config;
                        data.tags = tags;
                    }
                    self.previewCache.clean(data);
                    return index;
                },
                set: function (content, config, tags, append) {
                    var data = self.previewCache.data, i, chk;
                    if (!content || !content.length) {
                        return;
                    }
                    if (!$h.isArray(content)) {
                        content = content.split(self.initialPreviewDelimiter);
                    }
                    chk = content.filter(function (n) {
                        return n !== null;
                    });
                    if (!chk.length) {
                        return;
                    }
                    if (data.content === undefined) {
                        data.content = [];
                    }
                    if (data.config === undefined) {
                        data.config = [];
                    }
                    if (data.tags === undefined) {
                        data.tags = [];
                    }
                    if (append) {
                        for (i = 0; i < content.length; i++) {
                            if (content[i]) {
                                data.content.push(content[i]);
                            }
                        }
                        for (i = 0; i < config.length; i++) {
                            if (config[i]) {
                                data.config.push(config[i]);
                            }
                        }
                        for (i = 0; i < tags.length; i++) {
                            if (tags[i]) {
                                data.tags.push(tags[i]);
                            }
                        }
                    } else {
                        data.content = content;
                        data.config = config;
                        data.tags = tags;
                    }
                    self.previewCache.clean(data);
                },
                unset: function (index) {
                    var chk = self.previewCache.count(), rev = self.reversePreviewOrder;
                    if (!chk) {
                        return;
                    }
                    if (chk === 1) {
                        self.previewCache.data.content = [];
                        self.previewCache.data.config = [];
                        self.previewCache.data.tags = [];
                        self.initialPreview = [];
                        self.initialPreviewConfig = [];
                        self.initialPreviewThumbTags = [];
                        return;
                    }
                    self.previewCache.data.content = $h.spliceArray(self.previewCache.data.content, index, rev);
                    self.previewCache.data.config = $h.spliceArray(self.previewCache.data.config, index, rev);
                    self.previewCache.data.tags = $h.spliceArray(self.previewCache.data.tags, index, rev);
                    var data = $.extend(true, {}, self.previewCache.data);
                    self.previewCache.clean(data);
                },
                out: function () {
                    var html = '', caption, len = self.previewCache.count(), i, content;
                    if (len === 0) {
                        return {content: '', caption: ''};
                    }
                    for (i = 0; i < len; i++) {
                        content = self.previewCache.get(i);
                        html = self.reversePreviewOrder ? (content + html) : (html + content);
                    }
                    caption = self._getMsgSelected(len);
                    return {content: html, caption: caption};
                },
                footer: function (i, isDisabled, size) {
                    var data = self.previewCache.data || {};
                    if ($h.isEmpty(data.content)) {
                        return '';
                    }
                    if ($h.isEmpty(data.config) || $h.isEmpty(data.config[i])) {
                        data.config[i] = {};
                    }
                    isDisabled = isDisabled === undefined ? true : isDisabled;
                    var config = data.config[i], caption = $h.ifSet('caption', config), a,
                        width = $h.ifSet('width', config, 'auto'), url = $h.ifSet('url', config, false),
                        key = $h.ifSet('key', config, null), fileId = $h.ifSet('fileId', config, null),
                        fs = self.fileActionSettings, initPreviewShowDel = self.initialPreviewShowDelete || false,
                        downloadInitialUrl = !self.initialPreviewDownloadUrl ? '' :
                            self.initialPreviewDownloadUrl + '?key=' + key + (fileId ? '&fileId=' + fileId : ''),
                        dUrl = config.downloadUrl || downloadInitialUrl,
                        dFil = config.filename || config.caption || '',
                        initPreviewShowDwl = !!(dUrl),
                        sDel = $h.ifSet('showRemove', config, initPreviewShowDel),
                        sRot = $h.ifSet('showRotate', config, $h.ifSet('showRotate', fs, true)),
                        sDwl = $h.ifSet('showDownload', config, $h.ifSet('showDownload', fs, initPreviewShowDwl)),
                        sZm = $h.ifSet('showZoom', config, $h.ifSet('showZoom', fs, true)),
                        sDrg = $h.ifSet('showDrag', config, $h.ifSet('showDrag', fs, true)),
                        dis = (url === false) && isDisabled;
                    sDwl = sDwl && config.downloadUrl !== false && !!dUrl;
                    a = self._renderFileActions(config, false, sDwl, sDel, sRot, sZm, sDrg, dis, url, key, true, dUrl, dFil);
                    return self._getLayoutTemplate('footer').setTokens({
                        'progress': self._renderThumbProgress(),
                        'actions': a,
                        'caption': caption,
                        'size': self._getSize(size),
                        'width': width,
                        'indicator': ''
                    });
                }
            };
            self.previewCache.init();
        },
        _isPdfRendered: function () {
            var self = this, useLib = self.usePdfRenderer,
                flag = typeof useLib === 'function' ? useLib() : !!useLib;
            return flag && self.pdfRendererUrl;
        },
        _handler: function ($el, event, callback) {
            var self = this, ns = self.namespace, ev = event.split(' ').join(ns + ' ') + ns;
            if (!$el || !$el.length) {
                return;
            }
            $el.off(ev).on(ev, callback);
        },
        _encodeURI: function (vUrl) {
            var self = this;
            return self.encodeUrl ? encodeURI(vUrl) : vUrl;
        },
        _log: function (msg, tokens) {
            var self = this, id = self.$element.attr('id');
            if (!self.showConsoleLogs) {
                return;
            }
            if (id) {
                msg = '"' + id + '": ' + msg;
            }
            msg = 'bootstrap-fileinput: ' + msg;
            if (typeof tokens === 'object') {
                msg = msg.setTokens(tokens);
            }
            if (window.console && typeof window.console.log !== 'undefined') {
                window.console.log(msg);
            } else {
                window.alert(msg);
            }
        },
        _validate: function () {
            var self = this, status = self.$element.attr('type') === 'file';
            if (!status) {
                self._log($h.logMessages.badInputType);
            }
            return status;
        },
        _errorsExist: function () {
            var self = this, $err, $errList = self.$errorContainer.find('li');
            if ($errList.length) {
                return true;
            }
            $err = $h.createElement(self.$errorContainer.html());
            $err.find('.kv-error-close').remove();
            $err.find('ul').remove();
            return !!$.trim($err.text()).length;
        },
        _errorHandler: function (evt, caption) {
            var self = this, err = evt.target.error, showError = function (msg) {
                self._showError(msg.replace('{name}', caption));
            };
            /** @namespace err.NOT_FOUND_ERR */
            /** @namespace err.SECURITY_ERR */
            /** @namespace err.NOT_READABLE_ERR */
            if (err.code === err.NOT_FOUND_ERR) {
                showError(self.msgFileNotFound);
            } else {
                if (err.code === err.SECURITY_ERR) {
                    showError(self.msgFileSecured);
                } else {
                    if (err.code === err.NOT_READABLE_ERR) {
                        showError(self.msgFileNotReadable);
                    } else {
                        if (err.code === err.ABORT_ERR) {
                            showError(self.msgFilePreviewAborted);
                        } else {
                            showError(self.msgFilePreviewError);
                        }
                    }
                }
            }
        },
        _addError: function (msg) {
            var self = this, $error = self.$errorContainer;
            if (msg && $error.length) {
                $h.setHtml($error, self.errorCloseButton + msg);
                self._handler($error.find('.kv-error-close'), 'click', function () {
                    setTimeout(function () {
                        if (self.showPreview && !self.getFrames().length) {
                            self.clear();
                        }
                        $error.fadeOut('slow');
                    }, self.processDelay);
                });
            }
        },
        _setValidationError: function (css) {
            var self = this;
            css = (css ? css + ' ' : '') + 'has-error';
            self.$container.removeClass(css).addClass('has-error');
            $h.addCss(self.$caption, 'is-invalid');
        },
        _resetErrors: function (fade) {
            var self = this, $error = self.$errorContainer, history = self.resumableUploadOptions.retainErrorHistory;
            if (self.isPersistentError || (self.enableResumableUpload && history && !self.clearInput)) {
                return;
            }
            self.clearInput = false;
            self.isError = false;
            self.$container.removeClass('has-error');
            self.$caption.removeClass('is-invalid is-valid file-processing');
            $error.html('');
            if (fade) {
                $error.fadeOut('slow');
            } else {
                $error.hide();
            }
        },
        _showFolderError: function (folders) {
            var self = this, $error = self.$errorContainer, msg;
            if (!folders) {
                return;
            }
            if (!self.isAjaxUpload) {
                self._clearFileInput();
            }
            msg = self.msgFoldersNotAllowed.replace('{n}', folders);
            self._addError(msg);
            self._setValidationError();
            $error.fadeIn(self.fadeDelay);
            self._raise('filefoldererror', [folders, msg]);
        },
        showUserError: function (msg, params, retainErrorHistory) {
            var self = this, fileName;
            if (!self.uploadInitiated) {
                return;
            }
            if (!params || !params.fileId) {
                if (!retainErrorHistory) {
                    self.$errorContainer.html('');
                }
            } else {
                if (!retainErrorHistory) {
                    self.$errorContainer.find('[data-file-id="' + params.fileId + '"]').remove();
                }
                fileName = self.fileManager.getFileName(params.fileId);
                if (fileName) {
                    msg = '<b>' + fileName + ':</b> ' + msg;
                }
            }
            self._showFileError(msg, params, 'fileusererror');
        },
        _showFileError: function (msg, params, event) {
            var self = this, $error = self.$errorContainer, ev = event || 'fileuploaderror',
                fId = params && params.fileId || '', e = params && params.id ?
                    '<li data-thumb-id="' + params.id + '" data-file-id="' + fId + '">' + msg + '</li>' :
                    '<li>' + msg + '</li>';

            if ($error.find('ul').length === 0) {
                self._addError('<ul>' + e + '</ul>');
            } else {
                $error.find('ul').append(e);
            }
            $error.fadeIn(self.fadeDelay);
            self._raise(ev, [params, msg]);
            self._setValidationError('file-input-new');
            return true;
        },
        _showError: function (msg, params, event) {
            var self = this, $error = self.$errorContainer, ev = event || 'fileerror';
            params = params || {};
            params.reader = self.reader;
            self._addError(msg);
            $error.fadeIn(self.fadeDelay);
            self._raise(ev, [params, msg]);
            if (!self.isAjaxUpload) {
                self._clearFileInput();
            }
            self._setValidationError('file-input-new');
            self.$btnUpload.attr('disabled', true);
            return true;
        },
        _noFilesError: function (params) {
            var self = this, label = self.minFileCount > 1 ? self.filePlural : self.fileSingle,
                msg = self.msgFilesTooLess.replace('{n}', self.minFileCount).replace('{files}', label),
                $error = self.$errorContainer;
            msg = '<li>' + msg + '</li>';
            if ($error.find('ul').length === 0) {
                self._addError('<ul>' + msg + '</ul>');
            } else {
                $error.find('ul').append(msg);
            }
            self.isError = true;
            self._updateFileDetails(0);
            $error.fadeIn(self.fadeDelay);
            self._raise('fileerror', [params, msg]);
            self._clearFileInput();
            self._setValidationError();
        },
        _parseError: function (operation, jqXHR, errorThrown, fileName) {
            /** @namespace jqXHR.responseJSON */
            var self = this, errMsg = $.trim(errorThrown + ''), textPre, errText, text;
            errText = jqXHR.responseJSON && jqXHR.responseJSON.error ? jqXHR.responseJSON.error.toString() : '';
            text = errText ? errText : jqXHR.responseText;
            if (self.cancelling && self.msgUploadAborted) {
                errMsg = self.msgUploadAborted;
            }
            if (self.showAjaxErrorDetails && text) {
                if (errText) {
                    errMsg = $.trim(errText + '');
                } else {
                    text = $.trim(text.replace(/\n\s*\n/g, '\n'));
                    textPre = text.length ? '<pre>' + text + '</pre>' : '';
                    errMsg += errMsg ? textPre : text;
                }
            }
            if (!errMsg) {
                errMsg = self.msgAjaxError.replace('{operation}', operation);
            }
            self.cancelling = false;
            return fileName ? '<b>' + fileName + ': </b>' + errMsg : errMsg;
        },
        _parseFileType: function (type, name) {
            var self = this, isValid, vType, cat, i, types = self.allowedPreviewTypes || [];
            if (type === 'application/text-plain') {
                return 'text';
            }
            for (i = 0; i < types.length; i++) {
                cat = types[i];
                isValid = self.fileTypeSettings[cat];
                vType = isValid(type, name) ? cat : '';
                if (!$h.isEmpty(vType)) {
                    return vType;
                }
            }
            return 'other';
        },
        _getPreviewIcon: function (fname) {
            var self = this, ext, out = null;
            if (fname && fname.indexOf('.') > -1) {
                ext = fname.split('.').pop();
                if (self.previewFileIconSettings) {
                    out = self.previewFileIconSettings[ext] || self.previewFileIconSettings[ext.toLowerCase()] || null;
                }
                if (self.previewFileExtSettings) {
                    $.each(self.previewFileExtSettings, function (key, func) {
                        if (self.previewFileIconSettings[key] && func(ext)) {
                            out = self.previewFileIconSettings[key];
                            //noinspection UnnecessaryReturnStatementJS
                            return;
                        }
                    });
                }
            }
            return out || self.previewFileIcon;
        },
        _parseFilePreviewIcon: function (content, fname) {
            var self = this, icn = self._getPreviewIcon(fname), out = content;
            if (out.indexOf('{previewFileIcon}') > -1) {
                out = out.setTokens({'previewFileIconClass': self.previewFileIconClass, 'previewFileIcon': icn});
            }
            return out;
        },
        _raise: function (event, params) {
            var self = this, e = $.Event(event);
            if (params !== undefined) {
                self.$element.trigger(e, params);
            } else {
                self.$element.trigger(e);
            }
            var out = e.result, isAborted = out === false;
            if (e.isDefaultPrevented() || isAborted) {
                return false;
            }
            if (e.type === 'filebatchpreupload' && (out || isAborted)) {
                self.ajaxAborted = out;
                return false;
            }
            switch (event) {
                // ignore these events
                case 'filebatchuploadcomplete':
                case 'filebatchuploadsuccess':
                case 'fileuploaded':
                case 'fileclear':
                case 'filecleared':
                case 'filereset':
                case 'fileerror':
                case 'filefoldererror':
                case 'filecustomerror':
                case 'filesuccessremove':
                    break;
                // receive data response via `filecustomerror` event`
                default:
                    if (!self.ajaxAborted) {
                        self.ajaxAborted = out;
                    }
                    break;
            }
            return true;
        },
        _listenFullScreen: function (isFullScreen) {
            var self = this, $modal = self.$modal, $btnFull, $btnBord;
            if (!$modal || !$modal.length) {
                return;
            }
            $btnFull = $modal && $modal.find('.btn-kv-fullscreen');
            $btnBord = $modal && $modal.find('.btn-kv-borderless');
            if (!$btnFull.length || !$btnBord.length) {
                return;
            }
            $btnFull.removeClass('active').attr('aria-pressed', 'false');
            $btnBord.removeClass('active').attr('aria-pressed', 'false');
            if (isFullScreen) {
                $btnFull.addClass('active').attr('aria-pressed', 'true');
            } else {
                $btnBord.addClass('active').attr('aria-pressed', 'true');
            }
            if ($modal.hasClass('file-zoom-fullscreen')) {
                self._maximizeZoomDialog();
            } else {
                if (isFullScreen) {
                    self._maximizeZoomDialog();
                } else {
                    $btnBord.removeClass('active').attr('aria-pressed', 'false');
                }
            }
        },
        _listen: function () {
            var self = this, $el = self.$element, $form = self.$form, $cont = self.$container, fullScreenEv;
            self._handler($el, 'click', function (e) {
                self._initFileSelected();
                if ($el.hasClass('file-no-browse')) {
                    if ($el.data('zoneClicked')) {
                        $el.data('zoneClicked', false);
                    } else {
                        e.preventDefault();
                    }
                }
            });
            self._handler($el, 'change', $.proxy(self._change, self));
            self._handler(self.$caption, 'paste', $.proxy(self.paste, self));
            if (self.showBrowse) {
                self._handler(self.$btnFile, 'click', $.proxy(self._browse, self));
                self._handler(self.$btnFile, 'keypress', function (e) {
                    var keycode = e.keyCode || e.which;
                    if (keycode === 13) {
                        $el.trigger('click');
                        self._browse(e);
                    }
                });
            }
            self._handler($cont.find('.fileinput-remove:not([disabled])'), 'click', $.proxy(self.clear, self));
            self._handler($cont.find('.fileinput-cancel'), 'click', $.proxy(self.cancel, self));
            self._handler($cont.find('.fileinput-pause'), 'click', $.proxy(self.pause, self));
            self._initDragDrop();
            self._handler($form, 'reset', $.proxy(self.clear, self));
            if (!self.isAjaxUpload) {
                self._handler($form, 'submit', $.proxy(self._submitForm, self));
            }
            self._handler(self.$container.find('.fileinput-upload'), 'click', $.proxy(self._uploadClick, self));
            self._handler($(window), 'resize', function () {
                self._listenFullScreen(screen.width === window.innerWidth && screen.height === window.innerHeight);
            });
            fullScreenEv = 'webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange';
            self._handler($(document), fullScreenEv, function () {
                self._listenFullScreen($h.checkFullScreen());
            });
            self.$caption.on('focus', function () {
                self.$captionContainer.focus();
            });
            self._autoFitContent();
            self._initClickable();
            self._refreshPreview();
        },
        _autoFitContent: function () {
            var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                self = this, config = width < 400 ? (self.previewSettingsSmall || self.defaults.previewSettingsSmall) :
                    (self.previewSettings || self.defaults.previewSettings), sel;
            $.each(config, function (cat, settings) {
                sel = '.file-preview-frame .file-preview-' + cat;
                self.$preview.find(sel + '.kv-preview-data,' + sel + ' .kv-preview-data').css(settings);
            });
        },
        _scanDroppedItems: function (item, files, path) {
            path = path || '';
            var self = this, i, dirReader, readDir, errorHandler = function (e) {
                self._log($h.logMessages.badDroppedFiles);
                self._log(e);
            };
            if (item.isFile) {
                item.file(function (file) {
                    if (path) {
                        file.newPath = path + file.name;
                    }
                    files.push(file);
                }, errorHandler);
            } else {
                if (item.isDirectory) {
                    dirReader = item.createReader();
                    readDir = function () {
                        dirReader.readEntries(function (entries) {
                            if (entries && entries.length > 0) {
                                for (i = 0; i < entries.length; i++) {
                                    self._scanDroppedItems(entries[i], files, path + item.name + '/');
                                }
                                // recursively call readDir() again, since browser can only handle first 100 entries.
                                readDir();
                            }
                            return null;
                        }, errorHandler);
                    };
                    readDir();
                }
            }

        },
        _initDragDrop: function () {
            var self = this, $zone = self.$dropZone;
            if (self.dropZoneEnabled && self.showPreview) {
                self._handler($zone, 'dragenter dragover', $.proxy(self._zoneDragEnter, self));
                self._handler($zone, 'dragleave', $.proxy(self._zoneDragLeave, self));
                self._handler($zone, 'drop', $.proxy(self._zoneDrop, self));
                self._handler($(document), 'dragenter dragover drop', self._zoneDragDropInit);
            }
        },
        _zoneDragDropInit: function (e) {
            e.stopPropagation();
            e.preventDefault();
        },
        _zoneDragEnter: function (e) {
            var self = this, dt = e.originalEvent.dataTransfer, hasFiles = $.inArray('Files', dt.types) > -1;
            self._zoneDragDropInit(e);
            if (self.isDisabled || !hasFiles) {
                dt.effectAllowed = 'none';
                dt.dropEffect = 'none';
                return;
            }
            dt.dropEffect = 'copy';
            if (self._raise('fileDragEnter', {'sourceEvent': e, 'files': dt.types.Files})) {
                $h.addCss(self.$dropZone, 'file-highlighted');
            }
        },
        _zoneDragLeave: function (e) {
            var self = this;
            self._zoneDragDropInit(e);
            if (self.isDisabled) {
                return;
            }
            if (self._raise('fileDragLeave', {'sourceEvent': e})) {
                self.$dropZone.removeClass('file-highlighted');
            }

        },
        _dropFiles: function (e, files) {
            var self = this, $el = self.$element;
            if (!self.isAjaxUpload) {
                self.changeTriggered = true;
                $el.get(0).files = files;
                setTimeout(function () {
                    self.changeTriggered = false;
                    $el.trigger('change' + self.namespace);
                }, self.processDelay);
            } else {
                self._change(e, files);
            }
            self.$dropZone.removeClass('file-highlighted');
        },
        _zoneDrop: function (e) {
            /** @namespace e.originalEvent.dataTransfer */
            var self = this, i, $el = self.$element, dt = e.originalEvent.dataTransfer,
                files = dt.files, items = dt.items, folders = $h.getDragDropFolders(items);
            e.preventDefault();
            if (self.isDisabled || $h.isEmpty(files)) {
                return;
            }
            if (!self._raise('fileDragDrop', {'sourceEvent': e, 'files': files})) {
                return;
            }
            if (folders > 0) {
                if (!self.isAjaxUpload) {
                    self._showFolderError(folders);
                    return;
                }
                files = [];
                for (i = 0; i < items.length; i++) {
                    var item = items[i].webkitGetAsEntry();
                    if (item) {
                        self._scanDroppedItems(item, files);
                    }
                }
                setTimeout(function () {
                    self._dropFiles(e, files);
                }, 500);
            } else {
                self._dropFiles(e, files);
            }
        },
        _uploadClick: function (e) {
            var self = this, $btn = self.$container.find('.fileinput-upload'), $form,
                isEnabled = !$btn.hasClass('disabled') && $h.isEmpty($btn.attr('disabled'));
            if (e && e.isDefaultPrevented()) {
                return;
            }
            if (!self.isAjaxUpload) {
                if (isEnabled && $btn.attr('type') !== 'submit') {
                    e.preventDefault();
                    $form = $btn.closest('form');
                    // downgrade to normal form submit if possible
                    if ($form.length) {
                        $form.trigger('submit');
                    }
                }
                return;
            }
            e.preventDefault();
            if (isEnabled) {
                self.upload();
            }
        },
        _submitForm: function () {
            var self = this;
            return self._isFileSelectionValid() && !self._abort({});
        },
        _clearPreview: function () {
            var self = this,
                $thumbs = self.showUploadedThumbs ? self.getFrames(':not(.file-preview-success)') : self.getFrames();
            $thumbs.each(function () {
                var $thumb = $(this);
                $thumb.remove();
            });
            if (!self.getFrames().length || !self.showPreview) {
                self._resetUpload();
            }
            self._validateDefaultPreview();
        },
        _initSortable: function () {
            var self = this, $el = self.$preview, settings, selector = '.' + $h.SORT_CSS, $cont, $body = $('body'),
                $html = $('html'), rev = self.reversePreviewOrder, Sortable = window.Sortable, beginGrab, endGrab;
            if (!Sortable || $el.find(selector).length === 0) {
                return;
            }
            $cont = $body.length ? $body : ($html.length ? $html : self.$container);
            beginGrab = function () {
                $cont.addClass('file-grabbing');
            };
            endGrab = function () {
                $cont.removeClass('file-grabbing');
            };
            settings = {
                handle: '.drag-handle-init',
                dataIdAttr: 'data-fileid',
                animation: 600,
                draggable: selector,
                scroll: false,
                forceFallback: true,
                onChoose: beginGrab,
                onStart: beginGrab,
                onUnchoose: endGrab,
                onEnd: endGrab,
                onSort: function (e) {
                    var oldIndex = e.oldIndex, newIndex = e.newIndex, i = 0, len = self.initialPreviewConfig.length,
                        exceedsLast = len > 0 && newIndex >= len, $item = $(e.item), $first;
                    if (exceedsLast) {
                        newIndex = len - 1;
                    }
                    self.initialPreview = $h.moveArray(self.initialPreview, oldIndex, newIndex, rev);
                    self.initialPreviewConfig = $h.moveArray(self.initialPreviewConfig, oldIndex, newIndex, rev);
                    self.previewCache.init();
                    self.getFrames('.file-preview-initial').each(function () {
                        $(this).attr('data-fileindex', $h.INIT_FLAG + i);
                        i++;
                    });
                    if (exceedsLast) {
                        $first = self.getFrames(':not(.file-preview-initial):first');
                        if ($first.length) {
                            $item.slideUp(function () {
                                $item.insertBefore($first).slideDown();
                            });
                        }
                    }
                    self._raise('filesorted', {
                        previewId: $item.attr('id'),
                        'oldIndex': oldIndex,
                        'newIndex': newIndex,
                        stack: self.initialPreviewConfig
                    });
                },
            };
            $.extend(true, settings, self.fileActionSettings.dragSettings);
            if (self.sortable) {
                self.sortable.destroy();
            }
            self.sortable = Sortable.create($el[0], settings);
        },
        _setPreviewContent: function (content) {
            var self = this;
            $h.setHtml(self.$preview, content);
            self._autoFitContent();
        },
        _initPreviewImageOrientations: function () {
            var self = this, i = 0, canOrientImage = self.canOrientImage;
            if (!self.autoOrientImageInitial && !canOrientImage) {
                return;
            }
            self.getFrames('.file-preview-initial').each(function () {
                var $thumb = $(this), $img, $zoomImg, id, config = self.initialPreviewConfig[i];
                /** @namespace config.exif */
                if (config && config.exif && config.exif.Orientation) {
                    id = $thumb.attr('id');
                    $img = $thumb.find('>.kv-file-content img');
                    $zoomImg = self._getZoom(id, ' >.kv-file-content img');
                    if (canOrientImage) {
                        $img.css('image-orientation', (self.autoOrientImageInitial ? 'from-image' : 'none'));
                    } else {
                        self.setImageOrientation($img, $zoomImg, config.exif.Orientation, $thumb);
                    }
                }
                i++;
            });
        },
        _initPreview: function (isInit) {
            var self = this, cap = self.initialCaption || '', out;
            if (!self.previewCache.count(true)) {
                self._clearPreview();
                if (isInit) {
                    self._setCaption(cap);
                } else {
                    self._initCaption();
                }
                return;
            }
            out = self.previewCache.out();
            cap = isInit && self.initialCaption ? self.initialCaption : out.caption;
            self._setPreviewContent(out.content);
            self._setInitThumbAttr();
            self._setCaption(cap);
            self._initSortable();
            if (!$h.isEmpty(out.content)) {
                self.$container.removeClass('file-input-new');
            }
            self._initPreviewImageOrientations();
        },
        _getZoomButton: function (type) {
            var self = this, label = self.previewZoomButtonIcons[type], css = self.previewZoomButtonClasses[type],
                title = ' title="' + (self.previewZoomButtonTitles[type] || '') + '" ', tag = $h.isBs(5) ? 'bs-' : '',
                params = title + (type === 'close' ? ' data-' + tag + 'dismiss="modal" aria-hidden="true"' : '');
            if (type === 'fullscreen' || type === 'borderless' || type === 'toggleheader') {
                params += ' data-toggle="button" aria-pressed="false" autocomplete="off"';
            }
            return '<button type="button" class="' + css + ' btn-kv-' + type + '"' + params + '>' + label + '</button>';
        },
        _getModalContent: function () {
            var self = this;
            return self._getLayoutTemplate('modal').setTokens({
                'rtl': self.rtl ? ' kv-rtl' : '',
                'zoomFrameClass': self.frameClass,
                'prev': self._getZoomButton('prev'),
                'next': self._getZoomButton('next'),
                'rotate': self._getZoomButton('rotate'),
                'toggleheader': self._getZoomButton('toggleheader'),
                'fullscreen': self._getZoomButton('fullscreen'),
                'borderless': self._getZoomButton('borderless'),
                'close': self._getZoomButton('close')
            });
        },
        _listenModalEvent: function (event) {
            var self = this, $modal = self.$modal, getParams = function (e) {
                return {
                    sourceEvent: e,
                    previewId: $modal.data('previewId'),
                    modal: $modal
                };
            };
            $modal.on(event + '.bs.modal', function (e) {
                if (e.namespace !== 'bs.modal') {
                    return;
                }
                var $btnFull = $modal.find('.btn-fullscreen'), $btnBord = $modal.find('.btn-borderless');
                if ($modal.data('fileinputPluginId') === self.$element.attr('id')) {
                    self._raise('filezoom' + event, getParams(e));
                }
                if (event === 'shown') {
                    self._handleRotation($modal, $modal.find('.file-zoom-detail'), $modal.data('angle'));
                    $btnBord.removeClass('active').attr('aria-pressed', 'false');
                    $btnFull.removeClass('active').attr('aria-pressed', 'false');
                    if ($modal.hasClass('file-zoom-fullscreen')) {
                        self._maximizeZoomDialog();
                        if ($h.checkFullScreen()) {
                            $btnFull.addClass('active').attr('aria-pressed', 'true');
                        } else {
                            $btnBord.addClass('active').attr('aria-pressed', 'true');
                        }
                    }
                }
            });
        },
        _initZoom: function () {
            var self = this, $dialog, modalMain = self._getLayoutTemplate('modalMain'), modalId = '#' + $h.MODAL_ID;
            modalMain = self._setTabIndex('modal', modalMain);
            if (!self.showPreview) {
                return;
            }
            self.$modal = $(modalId);
            if (!self.$modal || !self.$modal.length) {
                $dialog = $h.createElement($h.cspBuffer.stash(modalMain)).insertAfter(self.$container);
                self.$modal = $(modalId).insertBefore($dialog);
                $h.cspBuffer.apply(self.$modal);
                $dialog.remove();
            }
            $h.initModal(self.$modal);
            self.$modal.html($h.cspBuffer.stash(self._getModalContent()));
            $h.cspBuffer.apply(self.$modal);
            $.each($h.MODAL_EVENTS, function (key, event) {
                self._listenModalEvent(event);
            });
        },
        _initZoomButtons: function () {
            var self = this, $modal = self.$modal, previewId = $modal.data('previewId') || '', $first, $last,
                thumbs = self.getFrames().toArray(), len = thumbs.length, $prev = $modal.find('.btn-kv-prev'),
                $next = $modal.find('.btn-kv-next'), $rotate = $modal.find('.btn-kv-rotate');
            if (thumbs.length < 2) {
                $prev.hide();
                $next.hide();
                return;
            } else {
                $prev.show();
                $next.show();
            }
            if (!len) {
                return;
            }
            $first = $(thumbs[0]);
            $last = $(thumbs[len - 1]);
            $prev.removeAttr('disabled');
            $next.removeAttr('disabled');
            if (self.reversePreviewOrder) {
                [$prev, $next] = [$next, $prev]; // swap
            }
            if ($first.length && $first.attr('id') === previewId) {
                $prev.attr('disabled', true);
            }
            if ($last.length && $last.attr('id') === previewId) {
                $next.attr('disabled', true);
            }
        },
        _maximizeZoomDialog: function () {
            var self = this, $modal = self.$modal, $head = $modal.find('.modal-header:visible'),
                $foot = $modal.find('.modal-footer:visible'), $body = $modal.find('.kv-zoom-body'),
                h = $(window).height(), diff = 0;
            $modal.addClass('file-zoom-fullscreen');
            if ($head && $head.length) {
                h -= $head.outerHeight(true);
            }
            if ($foot && $foot.length) {
                h -= $foot.outerHeight(true);
            }
            if ($body && $body.length) {
                diff = $body.outerHeight(true) - $body.height();
                h -= diff;
            }
            $modal.find('.kv-zoom-body').height(h);
        },
        _resizeZoomDialog: function (fullScreen) {
            var self = this, $modal = self.$modal, $btnFull = $modal.find('.btn-kv-fullscreen'),
                $btnBord = $modal.find('.btn-kv-borderless');
            if ($modal.hasClass('file-zoom-fullscreen')) {
                $h.toggleFullScreen(false);
                if (!fullScreen) {
                    if (!$btnFull.hasClass('active')) {
                        $modal.removeClass('file-zoom-fullscreen');
                        self.$modal.find('.kv-zoom-body').css('height', self.zoomModalHeight);
                    } else {
                        $btnFull.removeClass('active').attr('aria-pressed', 'false');
                    }
                } else {
                    if (!$btnFull.hasClass('active')) {
                        $modal.removeClass('file-zoom-fullscreen');
                        self._resizeZoomDialog(true);
                        if ($btnBord.hasClass('active')) {
                            $btnBord.removeClass('active').attr('aria-pressed', 'false');
                        }
                    }
                }
            } else {
                if (!fullScreen) {
                    self._maximizeZoomDialog();
                    return;
                }
                $h.toggleFullScreen(true);
            }
            $modal.focus();
        },
        _setZoomContent: function ($frame, navigate) {
            var self = this, $content, tmplt, body, title, $body, $dataEl, config, previewId = $frame.attr('id'),
                $zoomPreview = self._getZoom(previewId), $modal = self.$modal, $tmp, desc, $desc,
                $btnFull = $modal.find('.btn-kv-fullscreen'), $btnBord = $modal.find('.btn-kv-borderless'), cap, size,
                $btnTogh = $modal.find('.btn-kv-toggleheader'), dir = navigate === 'prev' ? 'Left' : 'Right',
                slideIn = 'slideIn' + dir, slideOut = 'slideOut' + dir, parsed, zoomData = $frame.data('zoom');
            if (zoomData) {
                zoomData = decodeURIComponent(zoomData);
                parsed = $zoomPreview.html().replace(self.zoomPlaceholder, '').setTokens({zoomData: zoomData});
                $zoomPreview.html(parsed);
                $frame.data('zoom', '');
                $zoomPreview.attr('data-zoom', zoomData);
            }
            tmplt = $zoomPreview.attr('data-template') || 'generic';
            $content = $zoomPreview.find('.kv-file-content');
            body = $content.length ? $content.html() : '';
            cap = $frame.data('caption') || self.msgZoomModalHeading;
            size = $frame.data('size') || '';
            desc = $frame.data('description') || '';
            $modal.find('.kv-zoom-caption').attr('title', cap).html(cap);
            $modal.find('.kv-zoom-size').html(size);
            $desc = $modal.find('.kv-zoom-description').hide();
            if (desc) {
                if (self.showDescriptionClose) {
                    desc = self._getLayoutTemplate('descriptionClose').setTokens({
                        closeIcon: self.previewZoomButtonIcons.close
                    }) + '</button>' + desc;
                }
                $desc.show().html(desc);
                if (self.showDescriptionClose) {
                    self._handler($modal.find('.kv-desc-hide'), 'click', function () {
                        $(this).parent().fadeOut('fast', function () {
                            $modal.focus();
                        });
                    });
                }
            }
            $body = $modal.find('.kv-zoom-body');
            $modal.removeClass('kv-single-content');
            if (navigate) {
                $tmp = $body.addClass('file-thumb-loading').clone().insertAfter($body);
                $h.setHtml($body, body).hide();
                $tmp.fadeOut('fast', function () {
                    $body.fadeIn('fast', function () {
                        $body.removeClass('file-thumb-loading');
                    });
                    $tmp.remove();
                });
            } else {
                $h.setHtml($body, body);
            }
            config = self.previewZoomSettings[tmplt];
            if (config) {
                $dataEl = $body.find('.kv-preview-data');
                $h.addCss($dataEl, 'file-zoom-detail');
                $.each(config, function (key, value) {
                    $dataEl.css(key, value);
                    if (($dataEl.attr('width') && key === 'width') || ($dataEl.attr('height') && key === 'height')) {
                        $dataEl.removeAttr(key);
                    }
                });
            }
            $modal.data('previewId', previewId);
            self._handler($modal.find('.btn-kv-prev'), 'click', function () {
                self._zoomSlideShow('prev', previewId);
            });
            self._handler($modal.find('.btn-kv-next'), 'click', function () {
                self._zoomSlideShow('next', previewId);
            });
            self._handler($btnFull, 'click', function () {
                self._resizeZoomDialog(true);
            });
            self._handler($btnBord, 'click', function () {
                self._resizeZoomDialog(false);
            });
            self._handler($btnTogh, 'click', function () {
                var $header = $modal.find('.modal-header'), $floatBar = $modal.find('.floating-buttons'),
                    ht, $actions = $header.find('.kv-zoom-actions'), resize = function (height) {
                        var $body = self.$modal.find('.kv-zoom-body'), h = self.zoomModalHeight;
                        if ($modal.hasClass('file-zoom-fullscreen')) {
                            h = $body.outerHeight(true);
                            if (!height) {
                                h = h - $header.outerHeight(true);
                            }
                        }
                        $body.css('height', height ? h + height : h);
                    };
                if ($header.is(':visible')) {
                    ht = $header.outerHeight(true);
                    $header.slideUp('slow', function () {
                        $actions.find('.btn').appendTo($floatBar);
                        resize(ht);
                    });
                } else {
                    $floatBar.find('.btn').appendTo($actions);
                    $header.slideDown('slow', function () {
                        resize();
                    });
                }
                $modal.focus();
            });
            self._handler($modal, 'keydown', function (e) {
                var key = e.which || e.keyCode, delay = self.processDelay + 1, $prev = $(this).find('.btn-kv-prev'),
                    $next = $(this).find('.btn-kv-next'), vId = $(this).data('previewId'), vPrevKey, vNextKey;
                [vPrevKey, vNextKey] = self.rtl ? [39, 37] : [37, 39];
                $.each({prev: [$prev, vPrevKey], next: [$next, vNextKey]}, function (direction, config) {
                    var $btn = config[0], vKey = config[1];
                    if (key === vKey && $btn.length) {
                        $modal.focus();
                        if (!$btn.attr('disabled')) {
                            $btn.blur();
                            setTimeout(function () {
                                $btn.focus();
                                self._zoomSlideShow(direction, vId);
                                setTimeout(function () {
                                    if ($btn.attr('disabled')) {
                                        $modal.focus();
                                    }
                                }, delay);
                            }, delay);
                        }
                    }
                });
            });
        },
        _showModal: function ($frame) {
            var self = this, $modal = self.$modal, $content, css, angle;
            if (!$frame || !$frame.length) {
                return;
            }
            $h.initModal($modal);
            $h.setHtml($modal, self._getModalContent());
            self._setZoomContent($frame);
            $modal.removeClass('rotatable');
            $modal.data({backdrop: false, fileinputPluginId: self.$element.attr('id')});
            $modal.find('.kv-zoom-body').css('height', self.zoomModalHeight);
            $content = $frame.find('.kv-file-content > :first-child');
            if ($content.length) {
                css = $content.css('transform');
                if (css) {
                    $modal.find('.file-zoom-detail').css('transform', css);
                }
            }
            if ($frame.hasClass('rotatable')) {
                $modal.addClass('rotatable');
            }
            if ($frame.data('angle')) {
                $modal.data('angle', $frame.data('angle'));
            }
            angle = ($frame.data('angle') || 0);
            $modal.modal('show');
            self._initZoomButtons();
            self._initRotateZoom($frame, $content);
        },
        _zoomPreview: function ($btn) {
            var self = this, $frame;
            if (!$btn.length) {
                throw 'Cannot zoom to detailed preview!';
            }
            $frame = $btn.closest($h.FRAMES);
            self._showModal($frame);
        },
        _zoomSlideShow: function (dir, previewId) {
            var self = this, $modal = self.$modal, $btn = $modal.find('.kv-zoom-actions .btn-kv-' + dir), $targFrame, i,
                $thumb, thumbsData = self.getFrames().toArray(), thumbs = [], len = thumbsData.length, out, angle,
                $content;
            if (self.reversePreviewOrder) {
                dir = dir === 'prev' ? 'next' : 'prev';
            }
            if ($btn.attr('disabled')) {
                return;
            }
            for (i = 0; i < len; i++) {
                $thumb = $(thumbsData[i]);
                if ($thumb && $thumb.length && $thumb.find('.kv-file-zoom:visible').length) {
                    thumbs.push(thumbsData[i]);
                }
            }
            len = thumbs.length;
            for (i = 0; i < len; i++) {
                if ($(thumbs[i]).attr('id') === previewId) {
                    out = dir === 'prev' ? i - 1 : i + 1;
                    break;
                }
            }
            if (out < 0 || out >= len || !thumbs[out]) {
                return;
            }
            $targFrame = $(thumbs[out]);
            if ($targFrame.length) {
                self._setZoomContent($targFrame, dir);
            }
            self._initZoomButtons();
            if ($targFrame.length && $targFrame.hasClass('rotatable')) {
                angle = $targFrame.data('angle') || 0;
                $modal.addClass('rotatable').data('angle', angle);
                $content = $targFrame.find('.kv-file-content > :first-child');
                self._initRotateZoom($targFrame, $content);
            } else {
                $modal.removeClass('rotatable').removeData('angle');
            }
            self._raise('filezoom' + dir, {'previewId': previewId, modal: self.$modal});
        },
        _initZoomButton: function () {
            var self = this;
            self.$preview.find('.kv-file-zoom').each(function () {
                var $el = $(this);
                self._handler($el, 'click', function () {
                    self._zoomPreview($el);
                });
            });
        },
        _inputFileCount: function () {
            return this.$element[0].files.length;
        },
        _refreshPreview: function () {
            var self = this, files;
            if ((!self._inputFileCount() && !self.isAjaxUpload) || !self.showPreview || !self.isPreviewable) {
                return;
            }
            if (self.isAjaxUpload) {
                if (self.fileManager.count() > 0) {
                    files = $.extend(true, [], self.getFileList());
                    self.fileManager.clear();
                    self._clearFileInput();
                } else {
                    files = self.$element[0].files;
                }
            } else {
                files = self.$element[0].files;
            }
            if (files && files.length) {
                self.readFiles(files);
            }
        },
        _clearObjects: function ($el) {
            $el.find('video audio').each(function () {
                this.pause();
                $(this).remove();
            });
            $el.find('img object div').each(function () {
                $(this).remove();
            });
        },
        _clearFileInput: function () {
            var self = this, $el = self.$element, $srcFrm, $tmpFrm, $tmpEl;
            if (!self._inputFileCount()) {
                return;
            }
            $srcFrm = $el.closest('form');
            $tmpFrm = $(document.createElement('form'));
            $tmpEl = $(document.createElement('div'));
            $el.before($tmpEl);
            if ($srcFrm.length) {
                $srcFrm.after($tmpFrm);
            } else {
                $tmpEl.after($tmpFrm);
            }
            $tmpFrm.append($el).trigger('reset');
            $tmpEl.before($el).remove();
            $tmpFrm.remove();
        },
        _resetUpload: function () {
            var self = this;
            self.uploadInitiated = false;
            self.uploadStartTime = $h.now();
            self.uploadCache = [];
            self.$btnUpload.removeAttr('disabled');
            self._setProgress(0);
            self._hideProgress();
            self._resetErrors(false);
            self._initAjax();
            self.fileManager.clearImages();
            self._resetCanvas();
            if (self.overwriteInitial) {
                self.initialPreview = [];
                self.initialPreviewConfig = [];
                self.initialPreviewThumbTags = [];
                self.previewCache.data = {
                    content: [],
                    config: [],
                    tags: []
                };
            }
        },
        _resetCanvas: function () {
            var self = this;
            if (self.imageCanvas && self.imageCanvasContext) {
                self.imageCanvasContext.clearRect(0, 0, self.imageCanvas.width, self.imageCanvas.height);
            }
        },
        _hasInitialPreview: function () {
            var self = this;
            return !self.overwriteInitial && self.previewCache.count(true);
        },
        _resetPreview: function () {
            var self = this, out, cap, $div, hasSuc = self.showUploadedThumbs, hasErr = !self.removeFromPreviewOnError,
                includeProcessed = (hasSuc || hasErr) && self.isDuplicateError;
            if (self.previewCache.count(true)) {
                out = self.previewCache.out();
                if (includeProcessed) {
                    $div = $h.createElement('').insertAfter(self.$container);
                    self.getFrames().each(function () {
                        var $thumb = $(this);
                        if ((hasSuc && $thumb.hasClass('file-preview-success')) ||
                            (hasErr && $thumb.hasClass('file-preview-error'))) {
                            $div.append($thumb);
                        }
                    });
                }
                self._setPreviewContent(out.content);
                self._setInitThumbAttr();
                cap = self.initialCaption ? self.initialCaption : out.caption;
                self._setCaption(cap);
                if (includeProcessed) {
                    $div.contents().appendTo(self.$preview);
                    $div.remove();
                }
            } else {
                self._clearPreview();
                self._initCaption();
            }
            if (self.showPreview) {
                self._initZoom();
                self._initSortable();
            }
            self.isDuplicateError = false;
        },
        _clearDefaultPreview: function () {
            var self = this;
            self.$preview.find('.file-default-preview').remove();
        },
        _validateDefaultPreview: function () {
            var self = this;
            if (!self.showPreview || $h.isEmpty(self.defaultPreviewContent)) {
                return;
            }
            self._setPreviewContent('<div class="file-default-preview">' + self.defaultPreviewContent + '</div>');
            self.$container.removeClass('file-input-new');
            self._initClickable();
        },
        _resetPreviewThumbs: function (isAjax) {
            var self = this, out;
            if (isAjax) {
                self._clearPreview();
                self.clearFileStack();
                return;
            }
            if (self._hasInitialPreview()) {
                out = self.previewCache.out();
                self._setPreviewContent(out.content);
                self._setInitThumbAttr();
                self._setCaption(out.caption);
                self._initPreviewActions();
            } else {
                self._clearPreview();
            }
        },
        _getLayoutTemplate: function (t) {
            var self = this, template = self.layoutTemplates[t];
            if ($h.isEmpty(self.customLayoutTags)) {
                return template;
            }
            return $h.replaceTags(template, self.customLayoutTags);
        },
        _getPreviewTemplate: function (t) {
            var self = this, templates = self.previewTemplates, template = templates[t] || templates.other;
            if ($h.isEmpty(self.customPreviewTags)) {
                return template;
            }
            return $h.replaceTags(template, self.customPreviewTags);
        },
        _getOutData: function (formdata, jqXHR, responseData, filesData) {
            var self = this;
            jqXHR = jqXHR || {};
            responseData = responseData || {};
            filesData = filesData || self.fileManager.list();
            return {
                formdata: formdata,
                files: filesData,
                filenames: self.filenames,
                filescount: self.getFilesCount(),
                extra: self._getExtraData(),
                response: responseData,
                reader: self.reader,
                jqXHR: jqXHR
            };
        },
        _getMsgSelected: function (n, processing) {
            var self = this, strFiles = n === 1 ? self.fileSingle : self.filePlural;
            return n > 0 ? self.msgSelected.replace('{n}', n).replace('{files}', strFiles) :
                (processing ? self.msgProcessing : self.msgNoFilesSelected);
        },
        _getFrame: function (id, skipWarning) {
            var self = this, $frame = $h.getFrameElement(self.$preview, id);
            if (self.showPreview && !skipWarning && !$frame.length) {
                self._log($h.logMessages.invalidThumb, {id: id});
            }
            return $frame;
        },
        _getZoom: function (id, selector) {
            var self = this, $frame = $h.getZoomElement(self.$preview, id, selector);
            if (self.showPreview && !$frame.length) {
                self._log($h.logMessages.invalidThumb, {id: id});
            }
            return $frame;
        },
        _getThumbs: function (css) {
            css = css || '';
            return this.getFrames(':not(.file-preview-initial)' + css);
        },
        _getThumbId: function (fileId) {
            var self = this;
            return self.previewInitId + '-' + fileId;
        },
        _getExtraData: function (fileId, index) {
            var self = this, data = self.uploadExtraData;
            if (typeof self.uploadExtraData === 'function') {
                data = self.uploadExtraData(fileId, index);
            }
            return data;
        },
        _initXhr: function (xhrobj, fileId) {
            var self = this, fm = self.fileManager, func = function (event) {
                var pct = 0, total = event.total, loaded = event.loaded || event.position,
                    stats = fm.getUploadStats(fileId, loaded, total);
                /** @namespace event.lengthComputable */
                if (event.lengthComputable && !self.enableResumableUpload) {
                    pct = $h.round(loaded / total * 100);
                }
                if (fileId) {
                    self._setFileUploadStats(fileId, pct, stats);
                } else {
                    self._setProgress(pct, null, null, self._getStats(stats));
                }
                self._raise('fileajaxprogress', [stats]);
            };
            if (xhrobj.upload) {
                if (self.progressDelay) {
                    func = $h.debounce(func, self.progressDelay);
                }
                xhrobj.upload.addEventListener('progress', func, false);
            }
            return xhrobj;
        },
        _initAjaxSettings: function () {
            var self = this;
            self._ajaxSettings = $.extend(true, {}, self.ajaxSettings);
            self._ajaxDeleteSettings = $.extend(true, {}, self.ajaxDeleteSettings);
        },
        _mergeAjaxCallback: function (funcName, srcFunc, type) {
            var self = this, settings = self._ajaxSettings, flag = self.mergeAjaxCallbacks, targFunc;
            if (type === 'delete') {
                settings = self._ajaxDeleteSettings;
                flag = self.mergeAjaxDeleteCallbacks;
            }
            targFunc = settings[funcName];
            if (flag && typeof targFunc === 'function') {
                if (flag === 'before') {
                    settings[funcName] = function () {
                        targFunc.apply(this, arguments);
                        srcFunc.apply(this, arguments);
                    };
                } else {
                    settings[funcName] = function () {
                        srcFunc.apply(this, arguments);
                        targFunc.apply(this, arguments);
                    };
                }
            } else {
                settings[funcName] = srcFunc;
            }
        },
        _ajaxSubmit: function (fnBefore, fnSuccess, fnComplete, fnError, formdata, fileId, index, vUrl) {
            var self = this, settings, defaults, data, tm = self.taskManager;
            if (!self._raise('filepreajax', [formdata, fileId, index])) {
                return;
            }
            formdata.append('initialPreview', JSON.stringify(self.initialPreview));
            formdata.append('initialPreviewConfig', JSON.stringify(self.initialPreviewConfig));
            formdata.append('initialPreviewThumbTags', JSON.stringify(self.initialPreviewThumbTags));
            self._initAjaxSettings();
            self._mergeAjaxCallback('beforeSend', fnBefore);
            self._mergeAjaxCallback('success', fnSuccess);
            self._mergeAjaxCallback('complete', fnComplete);
            self._mergeAjaxCallback('error', fnError);
            vUrl = vUrl || self.uploadUrlThumb || self.uploadUrl;
            if (typeof vUrl === 'function') {
                vUrl = vUrl();
            }
            data = self._getExtraData(fileId, index) || {};
            if (typeof data === 'object') {
                $.each(data, function (key, value) {
                    formdata.append(key, value);
                });
            }
            defaults = {
                xhr: function () {
                    var xhrobj = $.ajaxSettings.xhr();
                    return self._initXhr(xhrobj, fileId);
                },
                url: self._encodeURI(vUrl),
                type: 'POST',
                dataType: 'json',
                data: formdata,
                cache: false,
                processData: false,
                contentType: false
            };
            settings = $.extend(true, {}, defaults, self._ajaxSettings);
            self.ajaxQueue.push(settings);
            tm.addTask(fileId + '-' + index, function () {
                var self = this.self, config, xhr;
                config = self.ajaxQueue.shift();
                xhr = $.ajax(config);
                self.ajaxRequests.push(xhr);
            }).runWithContext({self: self});
        },
        _mergeArray: function (prop, content) {
            var self = this, arr1 = $h.cleanArray(self[prop]), arr2 = $h.cleanArray(content);
            self[prop] = arr1.concat(arr2);
        },
        _initUploadSuccess: function (out, $thumb, allFiles) {
            var self = this, append, data, index, $div, content, config, tags, id, i;
            if (!self.showPreview || typeof out !== 'object' || $.isEmptyObject(out)) {
                self._resetCaption();
                return;
            }
            if (out.initialPreview !== undefined && out.initialPreview.length > 0) {
                self.hasInitData = true;
                content = out.initialPreview || [];
                config = out.initialPreviewConfig || [];
                tags = out.initialPreviewThumbTags || [];
                append = out.append === undefined || out.append;
                if (content.length > 0 && !$h.isArray(content)) {
                    content = content.split(self.initialPreviewDelimiter);
                }
                if (content.length) {
                    self._mergeArray('initialPreview', content);
                    self._mergeArray('initialPreviewConfig', config);
                    self._mergeArray('initialPreviewThumbTags', tags);
                }
                if ($thumb !== undefined) {
                    if (!allFiles) {
                        index = self.previewCache.add(content[0], config[0], tags[0], append);
                        data = self.previewCache.get(index, false);
                        $div = $h.createElement(data).hide().appendTo($thumb);
                        $thumb.fadeOut('slow', function () {
                            var $newThumb = $div.find('> .file-preview-frame');
                            if ($newThumb && $newThumb.length) {
                                $newThumb.insertBefore($thumb).fadeIn('slow').css('display:inline-block');
                            }
                            self._initPreviewActions();
                            self._clearFileInput();
                            $thumb.remove();
                            $div.remove();
                            self._initSortable();
                        });
                    } else {
                        id = $thumb.attr('id');
                        i = self._getUploadCacheIndex(id);
                        if (i !== null) {
                            self.uploadCache[i] = {
                                id: id,
                                content: content[0],
                                config: config[0] || [],
                                tags: tags[0] || [],
                                append: append
                            };
                        }
                    }
                } else {
                    self.previewCache.set(content, config, tags, append);
                    self._initPreview();
                    self._initPreviewActions();
                }
            }
            self._resetCaption();
        },
        _getUploadCacheIndex: function (id) {
            var self = this, i, len = self.uploadCache.length, config;
            for (i = 0; i < len; i++) {
                config = self.uploadCache[i];
                if (config.id === id) {
                    return i;
                }
            }
            return null;
        },
        _initSuccessThumbs: function () {
            var self = this;
            if (!self.showPreview) {
                return;
            }
            setTimeout(function () {
                self._getThumbs($h.FRAMES + '.file-preview-success').each(function () {
                    var $thumb = $(this), $remove = $thumb.find('.kv-file-remove');
                    $remove.removeAttr('disabled');
                    self._handler($remove, 'click', function () {
                        var id = $thumb.attr('id'),
                            out = self._raise('filesuccessremove', [id, $thumb.attr('data-fileindex')]);
                        $h.cleanMemory($thumb);
                        if (out === false) {
                            return;
                        }
                        self.$caption.attr('title', '');
                        $thumb.fadeOut('slow', function () {
                            var fm = self.fileManager;
                            $thumb.remove();
                            if (!self.getFrames().length) {
                                self.reset();
                            }
                        });
                    });
                });
            }, self.processDelay);
        },
        _updateInitialPreview: function () {
            var self = this, u = self.uploadCache;
            if (self.showPreview) {
                $.each(u, function (key, setting) {
                    self.previewCache.add(setting.content, setting.config, setting.tags, setting.append);
                });
                if (self.hasInitData) {
                    self._initPreview();
                    self._initPreviewActions();
                }
            }
        },
        _getThumbFileId: function ($thumb) {
            var self = this;
            if (self.showPreview && $thumb !== undefined) {
                return $thumb.attr('data-fileid');
            }
            return null;
        },
        _getThumbFile: function ($thumb) {
            var self = this, id = self._getThumbFileId($thumb);
            return id ? self.fileManager.getFile(id) : null;
        },
        _uploadSingle: function (i, id, isBatch, deferrer) {
            var self = this, fm = self.fileManager, count = fm.count(), formdata = new FormData(), outData,
                previewId = self._getThumbId(id), $thumb, chkComplete, $btnUpload, $btnDelete,
                hasPostData = count > 0 || !$.isEmptyObject(self.uploadExtraData), uploadFailed, $prog, fnBefore,
                errMsg, fnSuccess, fnComplete, fnError, updateUploadLog, op = self.ajaxOperations.uploadThumb,
                fileObj = fm.getFile(id), params = {id: previewId, index: i, fileId: id},
                fileName = self.fileManager.getFileName(id, true), resolve = function () {
                    if (deferrer && deferrer.resolve) {
                        deferrer.resolve();
                    }
                }, reject = function () {
                    if (deferrer && deferrer.reject) {
                        deferrer.reject();
                    }
                };
            if (self.enableResumableUpload) { // not enabled for resumable uploads
                return;
            }
            self.uploadInitiated = true;
            if (self.showPreview) {
                $thumb = fm.getThumb(id);
                $prog = $thumb.find('.file-thumb-progress');
                $btnUpload = $thumb.find('.kv-file-upload');
                $btnDelete = $thumb.find('.kv-file-remove');
                $prog.show();
            }
            if (count === 0 || !hasPostData || (self.showPreview && $btnUpload && $btnUpload.hasClass('disabled')) ||
                self._abort(params)) {
                return;
            }
            updateUploadLog = function () {
                if (!uploadFailed) {
                    fm.removeFile(id);
                } else {
                    fm.errors.push(id);
                }
                fm.setProcessed(id);
                if (fm.isProcessed()) {
                    self.fileBatchCompleted = true;
                    chkComplete();
                }
            };
            chkComplete = function () {
                var $initThumbs;
                if (!self.fileBatchCompleted) {
                    return;
                }
                setTimeout(function () {
                    var triggerReset = fm.count() === 0, errCount = fm.errors.length;
                    self._updateInitialPreview();
                    self.unlock(triggerReset);
                    if (triggerReset) {
                        self._clearFileInput();
                    }
                    $initThumbs = self.$preview.find('.file-preview-initial');
                    if (self.uploadAsync && $initThumbs.length) {
                        $h.addCss($initThumbs, $h.SORT_CSS);
                        self._initSortable();
                    }
                    self._raise('filebatchuploadcomplete', [fm.stack, self._getExtraData()]);
                    if (!self.retryErrorUploads || errCount === 0) {
                        fm.clear();
                    }
                    self._setProgress(101);
                    self.ajaxAborted = false;
                    self.uploadInitiated = false;
                }, self.processDelay);
            };
            fnBefore = function (jqXHR) {
                outData = self._getOutData(formdata, jqXHR);
                fm.initStats(id);
                self.fileBatchCompleted = false;
                if (!isBatch) {
                    self.ajaxAborted = false;
                }
                if (self.showPreview) {
                    if (!$thumb.hasClass('file-preview-success')) {
                        self._setThumbStatus($thumb, 'Loading');
                        $h.addCss($thumb, 'file-uploading');
                    }
                    $btnUpload.attr('disabled', true);
                    $btnDelete.attr('disabled', true);
                }
                if (!isBatch) {
                    self.lock();
                }
                if (fm.errors.indexOf(id) !== -1) {
                    delete fm.errors[id];
                }
                self._raise('filepreupload', [outData, previewId, i, self._getThumbFileId($thumb)]);
                $.extend(true, params, outData);
                if (self._abort(params)) {
                    jqXHR.abort();

                    if (!isBatch) {
                        self._setThumbStatus($thumb, 'New');
                        $thumb.removeClass('file-uploading');
                        $btnUpload.removeAttr('disabled');
                        $btnDelete.removeAttr('disabled');
                    }
                    self._setProgressCancelled();
                }
            };
            fnSuccess = function (data, textStatus, jqXHR) {
                var pid = self.showPreview && $thumb.attr('id') ? $thumb.attr('id') : previewId;
                outData = self._getOutData(formdata, jqXHR, data);
                $.extend(true, params, outData);
                setTimeout(function () {
                    if ($h.isEmpty(data) || $h.isEmpty(data.error)) {
                        if (self.showPreview) {
                            self._setThumbStatus($thumb, 'Success');
                            $btnUpload.hide();
                            self._initUploadSuccess(data, $thumb, isBatch);
                            self._setProgress(101, $prog);
                        }
                        self._raise('fileuploaded', [outData, pid, i, self._getThumbFileId($thumb)]);
                        if (!isBatch) {
                            self.fileManager.remove($thumb);
                        } else {
                            updateUploadLog();
                            resolve();
                        }
                    } else {
                        uploadFailed = true;
                        errMsg = self._parseError(op, jqXHR, self.msgUploadError, self.fileManager.getFileName(id));
                        self._showFileError(errMsg, params);
                        self._setPreviewError($thumb, true);
                        if (!self.retryErrorUploads) {
                            $btnUpload.hide();
                        }
                        if (isBatch) {
                            updateUploadLog();
                            resolve();
                        }
                        self._setProgress(101, self._getFrame(pid).find('.file-thumb-progress'),
                            self.msgUploadError);
                    }
                }, self.processDelay);
            };
            fnComplete = function () {
                if (self.showPreview) {
                    $btnUpload.removeAttr('disabled');
                    $btnDelete.removeAttr('disabled');
                    $thumb.removeClass('file-uploading');
                }
                if (!isBatch) {
                    self.unlock(false);
                    self._clearFileInput();
                } else {
                    chkComplete();
                }
                self._initSuccessThumbs();
            };
            fnError = function (jqXHR, textStatus, errorThrown) {
                errMsg = self._parseError(op, jqXHR, errorThrown, self.fileManager.getFileName(id));
                uploadFailed = true;
                setTimeout(function () {
                    var $prog;
                    if (isBatch) {
                        updateUploadLog();
                        reject();
                    }
                    self.fileManager.setProgress(id, 100);
                    self._setPreviewError($thumb, true);
                    if (!self.retryErrorUploads) {
                        $btnUpload.hide();
                    }
                    $.extend(true, params, self._getOutData(formdata, jqXHR));
                    self._setProgress(101, self.$progress, self.msgAjaxProgressError.replace('{operation}', op));
                    $prog = self.showPreview && $thumb ? $thumb.find('.file-thumb-progress') : '';
                    self._setProgress(101, $prog, self.msgUploadError);
                    self._showFileError(errMsg, params);
                }, self.processDelay);
            };
            self._setFileData(formdata, fileObj.file, fileName, id);
            self._setUploadData(formdata, {fileId: id});
            self._ajaxSubmit(fnBefore, fnSuccess, fnComplete, fnError, formdata, id, i);
        },
        _setFileData: function (formdata, file, fileName, fileId) {
            var self = this, preProcess = self.preProcessUpload;
            if (preProcess && typeof preProcess === 'function') {
                formdata.append(self.uploadFileAttr, preProcess(fileId, file));
            } else {
                formdata.append(self.uploadFileAttr, file, fileName);
            }
        },
        _checkBatchPreupload: function (outData, jqXHR) {
            var self = this, out = self._raise('filebatchpreupload', [outData]);
            if (out) {
                return true;
            }
            self._abort(outData);
            if (jqXHR) {
                jqXHR.abort();
            }
            self._getThumbs().each(function () {
                var $thumb = $(this), $btnUpload = $thumb.find('.kv-file-upload'),
                    $btnDelete = $thumb.find('.kv-file-remove');
                if ($thumb.hasClass('file-preview-loading')) {
                    self._setThumbStatus($thumb, 'New');
                    $thumb.removeClass('file-uploading');
                }
                $btnUpload.removeAttr('disabled');
                $btnDelete.removeAttr('disabled');
            });
            self._setProgressCancelled();
            return false;
        },
        _uploadBatch: function () {
            var self = this, fm = self.fileManager, total = fm.total(), params = {}, fnBefore, fnSuccess, fnError,
                fnComplete, hasPostData = total > 0 || !$.isEmptyObject(self.uploadExtraData), errMsg,
                setAllUploaded, formdata = new FormData(), op = self.ajaxOperations.uploadBatch;
            if (total === 0 || !hasPostData || self._abort(params)) {
                return;
            }
            setAllUploaded = function () {
                self.fileManager.clear();
                self._clearFileInput();
            };
            fnBefore = function (jqXHR) {
                self.lock();
                fm.initStats();
                var outData = self._getOutData(formdata, jqXHR);
                self.ajaxAborted = false;
                if (self.showPreview) {
                    self._getThumbs().each(function () {
                        var $thumb = $(this), $btnUpload = $thumb.find('.kv-file-upload'),
                            $btnDelete = $thumb.find('.kv-file-remove');
                        if (!$thumb.hasClass('file-preview-success')) {
                            self._setThumbStatus($thumb, 'Loading');
                            $h.addCss($thumb, 'file-uploading');
                        }
                        $btnUpload.attr('disabled', true);
                        $btnDelete.attr('disabled', true);
                    });
                }
                self._checkBatchPreupload(outData, jqXHR);
            };
            fnSuccess = function (data, textStatus, jqXHR) {
                /** @namespace data.errorkeys */
                var outData = self._getOutData(formdata, jqXHR, data), key = 0,
                    $thumbs = self._getThumbs(':not(.file-preview-success)'),
                    keys = $h.isEmpty(data) || $h.isEmpty(data.errorkeys) ? [] : data.errorkeys;

                if ($h.isEmpty(data) || $h.isEmpty(data.error)) {
                    self._raise('filebatchuploadsuccess', [outData]);
                    setAllUploaded();
                    if (self.showPreview) {
                        $thumbs.each(function () {
                            var $thumb = $(this);
                            self._setThumbStatus($thumb, 'Success');
                            $thumb.removeClass('file-uploading');
                            $thumb.find('.kv-file-upload').hide().removeAttr('disabled');
                        });
                        self._initUploadSuccess(data);
                    } else {
                        self.reset();
                    }
                    self._setProgress(101);
                } else {
                    if (self.showPreview) {
                        $thumbs.each(function () {
                            var $thumb = $(this);
                            $thumb.removeClass('file-uploading');
                            $thumb.find('.kv-file-upload').removeAttr('disabled');
                            $thumb.find('.kv-file-remove').removeAttr('disabled');
                            if (keys.length === 0 || $.inArray(key, keys) !== -1) {
                                self._setPreviewError($thumb, true);
                                if (!self.retryErrorUploads) {
                                    $thumb.find('.kv-file-upload').hide();
                                    self.fileManager.remove($thumb);
                                }
                            } else {
                                $thumb.find('.kv-file-upload').hide();
                                self._setThumbStatus($thumb, 'Success');
                                self.fileManager.remove($thumb);
                            }
                            if (!$thumb.hasClass('file-preview-error') || self.retryErrorUploads) {
                                key++;
                            }
                        });
                        self._initUploadSuccess(data);
                    }
                    errMsg = self._parseError(op, jqXHR, self.msgUploadError);
                    self._showFileError(errMsg, outData, 'filebatchuploaderror');
                    self._setProgress(101, self.$progress, self.msgUploadError);
                }
            };
            fnComplete = function () {
                self.unlock();
                self._initSuccessThumbs();
                self._clearFileInput();
                self._raise('filebatchuploadcomplete', [self.fileManager.stack, self._getExtraData()]);
            };
            fnError = function (jqXHR, textStatus, errorThrown) {
                var outData = self._getOutData(formdata, jqXHR);
                errMsg = self._parseError(op, jqXHR, errorThrown);
                self._showFileError(errMsg, outData, 'filebatchuploaderror');
                self.uploadFileCount = total - 1;
                if (!self.showPreview) {
                    return;
                }
                self._getThumbs().each(function () {
                    var $thumb = $(this);
                    $thumb.removeClass('file-uploading');
                    if (self._getThumbFile($thumb)) {
                        self._setPreviewError($thumb);
                    }
                });
                self._getThumbs().removeClass('file-uploading');
                self._getThumbs(' .kv-file-upload').removeAttr('disabled');
                self._getThumbs(' .kv-file-delete').removeAttr('disabled');
                self._setProgress(101, self.$progress, self.msgAjaxProgressError.replace('{operation}', op));
            };
            var ctr = 0;
            $.each(self.fileManager.stack, function (key, data) {
                if (!$h.isEmpty(data.file)) {
                    self._setFileData(formdata, data.file, (data.nameFmt || ('untitled_' + ctr)), key);
                }
                ctr++;
            });
            self._ajaxSubmit(fnBefore, fnSuccess, fnComplete, fnError, formdata);
        },
        _uploadExtraOnly: function () {
            var self = this, params = {}, fnBefore, fnSuccess, fnComplete, fnError, formdata = new FormData(), errMsg,
                op = self.ajaxOperations.uploadExtra;
            fnBefore = function (jqXHR) {
                self.lock();
                var outData = self._getOutData(formdata, jqXHR);
                self._setProgress(50);
                params.data = outData;
                params.xhr = jqXHR;
                self._checkBatchPreupload(outData, jqXHR);
            };
            fnSuccess = function (data, textStatus, jqXHR) {
                var outData = self._getOutData(formdata, jqXHR, data);
                if ($h.isEmpty(data) || $h.isEmpty(data.error)) {
                    self._raise('filebatchuploadsuccess', [outData]);
                    self._clearFileInput();
                    self._initUploadSuccess(data);
                    self._setProgress(101);
                } else {
                    errMsg = self._parseError(op, jqXHR, self.msgUploadError);
                    self._showFileError(errMsg, outData, 'filebatchuploaderror');
                }
            };
            fnComplete = function () {
                self.unlock();
                self._clearFileInput();
                self._raise('filebatchuploadcomplete', [self.fileManager.stack, self._getExtraData()]);
            };
            fnError = function (jqXHR, textStatus, errorThrown) {
                var outData = self._getOutData(formdata, jqXHR);
                errMsg = self._parseError(op, jqXHR, errorThrown);
                params.data = outData;
                self._showFileError(errMsg, outData, 'filebatchuploaderror');
                self._setProgress(101, self.$progress, self.msgAjaxProgressError.replace('{operation}', op));
            };
            self._ajaxSubmit(fnBefore, fnSuccess, fnComplete, fnError, formdata);
        },
        _deleteFileIndex: function ($frame) {
            var self = this, ind = $frame.attr('data-fileindex'), rev = self.reversePreviewOrder;
            if (ind.substring(0, 5) === $h.INIT_FLAG) {
                ind = parseInt(ind.replace($h.INIT_FLAG, ''));
                self.initialPreview = $h.spliceArray(self.initialPreview, ind, rev);
                self.initialPreviewConfig = $h.spliceArray(self.initialPreviewConfig, ind, rev);
                self.initialPreviewThumbTags = $h.spliceArray(self.initialPreviewThumbTags, ind, rev);
                self.getFrames().each(function () {
                    var $nFrame = $(this), nInd = $nFrame.attr('data-fileindex');
                    if (nInd.substring(0, 5) === $h.INIT_FLAG) {
                        nInd = parseInt(nInd.replace($h.INIT_FLAG, ''));
                        if (nInd > ind) {
                            nInd--;
                            $nFrame.attr('data-fileindex', $h.INIT_FLAG + nInd);
                        }
                    }
                });
            }
        },
        _resetCaption: function () {
            var self = this;
            setTimeout(function () {
                var cap = '', n, chk = self.previewCache.count(true), len = self.fileManager.count(), file,
                    incomplete = ':not(.file-preview-success):not(.file-preview-error)', cfg,
                    hasThumb = self.showPreview && self.getFrames(incomplete).length;
                if (len === 0 && chk === 0 && !hasThumb) {
                    self.reset();
                } else {
                    n = chk + len;
                    if (n > 1) {
                        cap = self._getMsgSelected(n);
                    } else {
                        if (len === 0) {
                            cfg = self.initialPreviewConfig[0];
                            cap = '';
                            if (cfg) {
                                cap = cfg.caption || cfg.filename || '';
                            }
                            if (!cap) {
                                cap = self._getMsgSelected(n);
                            }
                        } else {
                            file = self.fileManager.getFirstFile();
                            cap = file ? file.nameFmt : '_';
                        }
                    }
                    self._setCaption(cap);
                }
            }, self.processDelay);
        },
        _handleRotation: function ($el, $content, angle) {
            var self = this, css, newCss, addCss = '', scale = 1, elContent = $content[0], quadrant, transform, h, w,
                wNew, $parent = $content.parent(), hParent, wParent, $body = $('body'), bodyExists = !!$body.length;
            if (bodyExists) {
                $body.addClass('kv-overflow-hidden');
            }
            if (!$content.length || $el.hasClass('hide-rotate')) {
                if (bodyExists) {
                    $body.removeClass('kv-overflow-hidden');
                }
                return;
            }
            transform = $content.css('transform');
            if (transform) {
                $content.css('transform', 'none');
            }
            if (transform) {
                $content.css('transform', transform);
            }
            angle = angle || 0;
            quadrant = angle % 360;
            css = 'rotate(' + angle + 'deg)';
            newCss = 'rotate(' + quadrant + 'deg)';
            addCss = '';
            if (quadrant === 90 || quadrant === 270) {
                w = elContent.naturalWidth || $content.outerWidth() || 0;
                h = elContent.naturalHeight || $content.outerHeight() || 0;
                scale = w > h && w != 0 ? (h / w).toFixed(2) : 1;
                if ($parent.length) {
                    hParent = $parent.height();
                    wParent = $parent.width();
                    wNew = Math.min(w, wParent);
                    if (hParent > scale * wNew) {
                        scale = wNew > hParent && wNew != 0 ? (hParent / wNew).toFixed(2) : 1;
                    }
                }
                if (scale !== 1) {
                    addCss = ' scale(' + scale + ')';
                }
            }
            $content.addClass('rotate-animate').css('transform', css + addCss);
            setTimeout(function () {
                $content.removeClass('rotate-animate').css('transform', newCss + addCss);
                if (bodyExists) {
                    $body.removeClass('kv-overflow-hidden');
                }
                $el.data('angle', quadrant);
            }, self.fadeDelay);
        },
        _initRotateButton: function () {
            var self = this;
            self.getFrames('.rotatable .kv-file-rotate').each(function () {
                var $el = $(this), $frame = $el.closest($h.FRAMES),
                    $content = $frame.find('.kv-file-content > :first-child');
                self._handler($el, 'click', function () {
                    var angle = ($frame.data('angle') || 0) + 90;
                    self._handleRotation($frame, $content, angle);
                });
            });
        },
        _initRotateZoom: function ($frame, $content) {
            var self = this, $modal = self.$modal, $rotate = $modal.find('.btn-kv-rotate'),
                angle = $frame.data('angle');
            $modal.data('angle', angle);
            if ($rotate.length) {
                $rotate.off('click');
                if ($modal.hasClass('rotatable')) {
                    $rotate.on('click', function () {
                        angle = ($modal.data('angle') || 0) + 90;
                        $modal.data('angle', angle);
                        self._handleRotation($modal, $modal.find('.file-zoom-detail'), angle);
                        self._handleRotation($frame, $content, angle);
                        if ($frame.hasClass('hide-rotate')) {
                            $frame.data('angle', angle);
                        }
                    });
                }
            }
        },
        _initFileActions: function () {
            var self = this;
            if (!self.showPreview) {
                return;
            }
            self._initZoomButton();
            self._initRotateButton();
            self.getFrames(' .kv-file-remove').each(function () {
                var $el = $(this), $frame = $el.closest($h.FRAMES), hasError, id = $frame.attr('id'),
                    ind = $frame.attr('data-fileindex'), status, fm = self.fileManager;
                self._handler($el, 'click', function () {
                    status = self._raise('filepreremove', [id, ind]);
                    if (status === false || !self._validateMinCount()) {
                        return false;
                    }
                    hasError = $frame.hasClass('file-preview-error');
                    $h.cleanMemory($frame);
                    $frame.fadeOut('slow', function () {
                        self.fileManager.remove($frame);
                        self._clearObjects($frame);
                        $frame.remove();
                        if (id && hasError) {
                            self.$errorContainer.find('li[data-thumb-id="' + id + '"]').fadeOut('fast', function () {
                                $(this).remove();
                                if (!self._errorsExist()) {
                                    self._resetErrors();
                                }
                            });
                        }
                        self._clearFileInput();
                        self._resetCaption();
                        self._raise('fileremoved', [id, ind]);
                    });
                });
            });
            self.getFrames(' .kv-file-upload').each(function () {
                var $el = $(this);
                self._handler($el, 'click', function () {
                    var $frame = $el.closest($h.FRAMES), fileId = self._getThumbFileId($frame);
                    self._hideProgress();
                    if ($frame.hasClass('file-preview-error') && !self.retryErrorUploads) {
                        return;
                    }
                    self._uploadSingle(self.fileManager.getIndex(fileId), fileId, false);
                });
            });
        },
        _initPreviewActions: function () {
            var self = this, $preview = self.$preview, deleteExtraData = self.deleteExtraData || {},
                btnRemove = $h.FRAMES + ' .kv-file-remove', settings = self.fileActionSettings,
                origClass = settings.removeClass, errClass = settings.removeErrorClass,
                resetProgress = function () {
                    var hasFiles = self.isAjaxUpload ? self.previewCache.count(true) : self._inputFileCount();
                    if (!self.getFrames().length && !hasFiles) {
                        self._setCaption('');
                        self.reset();
                        self.initialCaption = '';
                    } else {
                        self._resetCaption();
                    }
                };
            self._initZoomButton();
            self._initRotateButton();
            $preview.find(btnRemove).each(function () {
                var $el = $(this), vUrl = $el.data('url') || self.deleteUrl, vKey = $el.data('key'), errMsg, fnBefore,
                    fnSuccess, fnError, op = self.ajaxOperations.deleteThumb;
                if ($h.isEmpty(vUrl) || vKey === undefined) {
                    return;
                }
                if (typeof vUrl === 'function') {
                    vUrl = vUrl();
                }
                var $frame = $el.closest($h.FRAMES), cache = self.previewCache.data, settings, params, config,
                    fileName, extraData, index = $frame.attr('data-fileindex');
                index = parseInt(index.replace($h.INIT_FLAG, ''));
                config = $h.isEmpty(cache.config) && $h.isEmpty(cache.config[index]) ? null : cache.config[index];
                extraData = $h.isEmpty(config) || $h.isEmpty(config.extra) ? deleteExtraData : config.extra;
                fileName = config && (config.filename || config.caption) || '';
                if (typeof extraData === 'function') {
                    extraData = extraData();
                }
                params = {id: $el.attr('id'), key: vKey, extra: extraData};
                fnBefore = function (jqXHR) {
                    self.ajaxAborted = false;
                    self._raise('filepredelete', [vKey, jqXHR, extraData]);
                    if (self._abort()) {
                        jqXHR.abort();
                    } else {
                        $el.removeClass(errClass);
                        $h.addCss($frame, 'file-uploading');
                        $h.addCss($el, 'disabled ' + origClass);
                    }
                };
                fnSuccess = function (data, textStatus, jqXHR) {
                    var n, cap;
                    if (!$h.isEmpty(data) && !$h.isEmpty(data.error)) {
                        params.jqXHR = jqXHR;
                        params.response = data;
                        errMsg = self._parseError(op, jqXHR, self.msgDeleteError, fileName);
                        self._showFileError(errMsg, params, 'filedeleteerror');
                        $frame.removeClass('file-uploading');
                        $el.removeClass('disabled ' + origClass).addClass(errClass);
                        resetProgress();
                        return;
                    }
                    $frame.removeClass('file-uploading').addClass('file-deleted');
                    $frame.fadeOut('slow', function () {
                        index = parseInt(($frame.attr('data-fileindex')).replace($h.INIT_FLAG, ''));
                        self.previewCache.unset(index);
                        self._deleteFileIndex($frame);
                        n = self.previewCache.count(true);
                        cap = n > 0 ? self._getMsgSelected(n) : '';
                        self._setCaption(cap);
                        self._raise('filedeleted', [vKey, jqXHR, extraData]);
                        self._clearObjects($frame);
                        $frame.remove();
                        resetProgress();
                    });
                };
                fnError = function (jqXHR, textStatus, errorThrown) {
                    var errMsg = self._parseError(op, jqXHR, errorThrown, fileName);
                    params.jqXHR = jqXHR;
                    params.response = {};
                    self._showFileError(errMsg, params, 'filedeleteerror');
                    $frame.removeClass('file-uploading');
                    $el.removeClass('disabled ' + origClass).addClass(errClass);
                    resetProgress();
                };
                self._initAjaxSettings();
                self._mergeAjaxCallback('beforeSend', fnBefore, 'delete');
                self._mergeAjaxCallback('success', fnSuccess, 'delete');
                self._mergeAjaxCallback('error', fnError, 'delete');
                settings = $.extend(true, {}, {
                    url: self._encodeURI(vUrl),
                    type: 'POST',
                    dataType: 'json',
                    data: $.extend(true, {}, {key: vKey}, extraData)
                }, self._ajaxDeleteSettings);
                self._handler($el, 'click', function () {
                    if (!self._validateMinCount()) {
                        return false;
                    }
                    self.ajaxAborted = false;
                    self._raise('filebeforedelete', [vKey, extraData]);
                    if (self.ajaxAborted instanceof Promise) {
                        self.ajaxAborted.then(function (result) {
                            if (!result) {
                                $.ajax(settings);
                            }
                        });
                    } else {
                        if (!self.ajaxAborted) {
                            $.ajax(settings);
                        }
                    }
                });
            });
        },
        _hideFileIcon: function () {
            var self = this;
            if (self.overwriteInitial) {
                self.$captionContainer.removeClass('icon-visible');
            }
        },
        _showFileIcon: function () {
            var self = this;
            $h.addCss(self.$captionContainer, 'icon-visible');
        },
        _getSize: function (bytes, skipTemplate, sizeUnits) {
            var self = this, size = parseFloat(bytes), i = 0, factor = self.bytesToKB, func = self.fileSizeGetter, out,
                sizeHuman = size, newSize;
            if (!$.isNumeric(bytes) || !$.isNumeric(size)) {
                return '';
            }
            if (typeof func === 'function') {
                out = func(size);
            } else {
                if (!sizeUnits) {
                    sizeUnits = self.sizeUnits;
                }
                if (size > 0) {
                    while (sizeHuman >= factor) {
                        sizeHuman /= factor;
                        ++i;
                    }
                    if (!sizeUnits[i]) {
                        sizeHuman = size;
                        i = 0;
                    }
                }
                newSize = sizeHuman.toFixed(2);
                if (newSize == sizeHuman) {
                    newSize = sizeHuman;
                }
                out = newSize + ' ' + sizeUnits[i];
            }
            return skipTemplate ? out : self._getLayoutTemplate('size').replace('{sizeText}', out);
        },
        _getFileType: function (ftype) {
            var self = this;
            return self.mimeTypeAliases[ftype] || ftype;
        },
        _generatePreviewTemplate: function (
            cat,
            data,
            fname,
            ftype,
            previewId,
            fileId,
            isError,
            size,
            fnameUpdated,
            frameClass,
            foot,
            ind,
            templ,
            attrs,
            zoomData
        ) {
            var self = this, caption = self.slug(fname), prevContent, zoomContent = '', styleAttribs = '',
                filename = fnameUpdated || fname, isIconic, ext = filename.split('.').pop().toLowerCase(),
                screenW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                config, title = caption, alt = caption, typeCss = 'type-default', getContent, addFrameCss,
                footer = foot || self._renderFileFooter(cat, caption, size, 'auto', isError), isRotatable,
                alwaysPreview = $.inArray(ext, self.alwaysPreviewFileExtensions) !== -1,
                forcePrevIcon = self.preferIconicPreview && !alwaysPreview,
                forceZoomIcon = self.preferIconicZoomPreview && !alwaysPreview, newCat = forcePrevIcon ? 'other' : cat;
            config = screenW < 400 ? (self.previewSettingsSmall[newCat] || self.defaults.previewSettingsSmall[newCat]) :
                (self.previewSettings[newCat] || self.defaults.previewSettings[newCat]);
            if (config) {
                $.each(config, function (key, val) {
                    styleAttribs += key + ':' + val + ';';
                });
            }
            getContent = function (vCat, vData, zoom, frameCss, vZoomData) {
                var id = zoom ? 'zoom-' + previewId : previewId, tmplt = self._getPreviewTemplate(vCat),
                    css = (frameClass || '') + ' ' + frameCss, tokens;
                if (self.frameClass) {
                    css = self.frameClass + ' ' + css;
                }
                if (zoom) {
                    css = css.replace(' ' + $h.SORT_CSS, '');
                }
                tmplt = self._parseFilePreviewIcon(tmplt, fname);
                if (cat === 'object' && !ftype) {
                    $.each(self.defaults.fileTypeSettings, function (key, func) {
                        if (key === 'object' || key === 'other') {
                            return;
                        }
                        if (func(fname, ftype)) {
                            typeCss = 'type-' + key;
                        }
                    });
                }
                if (!$h.isEmpty(attrs)) {
                    if (attrs.title !== undefined && attrs.title !== null) {
                        title = attrs.title;
                    }
                    if (attrs.alt !== undefined && attrs.alt !== null) {
                        alt = title = attrs.alt;
                    }
                }
                tokens = {
                    'previewId': id,
                    'caption': caption,
                    'title': title,
                    'alt': alt,
                    'frameClass': css,
                    'type': self._getFileType(ftype),
                    'fileindex': ind,
                    'fileid': fileId || '',
                    'filename': filename,
                    'typeCss': typeCss,
                    'footer': footer,
                    'data': zoom && vZoomData ? self.zoomPlaceholder + '{zoomData}' : vData,
                    'template': templ || cat,
                    'style': styleAttribs ? 'style="' + styleAttribs + '"' : '',
                    'zoomData': vZoomData ? encodeURIComponent(vZoomData) : ''
                };
                if (zoom) {
                    tokens.zoomCache = '';
                    tokens.zoomData = '{zoomData}';
                }
                return tmplt.setTokens(tokens);
            };
            ind = ind || previewId.slice(previewId.lastIndexOf('-') + 1);
            isRotatable = self.fileActionSettings.showRotate && $.inArray(ext, self.rotatableFileExtensions) !== -1;
            if (self.fileActionSettings.showZoom) {
                addFrameCss = 'kv-zoom-thumb';
                if (isRotatable) {
                    addFrameCss += ' rotatable' + (forceZoomIcon ? ' hide-rotate' : '');
                }
                zoomContent = getContent((forceZoomIcon ? 'other' : cat), data, true, addFrameCss, zoomData);
            }
            zoomContent = '\n' + self._getLayoutTemplate('zoomCache').replace('{zoomContent}', zoomContent);
            if (typeof self.sanitizeZoomCache === 'function') {
                zoomContent = self.sanitizeZoomCache(zoomContent);
            }
            addFrameCss = 'kv-preview-thumb';
            if (isRotatable) {
                isIconic = forcePrevIcon || self.hideThumbnailContent || !!self.previewFileIconSettings[ext];
                addFrameCss += ' rotatable' + (isIconic ? ' hide-rotate' : '');
            }
            prevContent = getContent((forcePrevIcon ? 'other' : cat), data, false, addFrameCss, zoomData);
            return prevContent.setTokens({zoomCache: zoomContent});
        },
        _addToPreview: function ($preview, content) {
            var self = this, $el;
            content = $h.cspBuffer.stash(content);
            $el = self.reversePreviewOrder ? $preview.prepend(content) : $preview.append(content);
            $h.cspBuffer.apply($preview);
            return $el;
        },
        _previewDefault: function (file, isDisabled) {
            var self = this, $preview = self.$preview;
            if (!self.showPreview) {
                return;
            }
            var fname = $h.getFileName(file), ftype = file ? file.type : '', content, size = file.size || 0,
                caption = self._getFileName(file, ''), isError = isDisabled === true && !self.isAjaxUpload,
                data = $h.createObjectURL(file), fileId = self.fileManager.getId(file),
                previewId = self._getThumbId(fileId);
            self._clearDefaultPreview();
            content = self._generatePreviewTemplate('other', data, fname, ftype, previewId, fileId, isError, size);
            self._addToPreview($preview, content);
            self._setThumbAttr(previewId, caption, size);
            if (isDisabled === true && self.isAjaxUpload) {
                self._setThumbStatus(self._getFrame(previewId), 'Error');
            }
        },
        _previewFile: function (i, file, theFile, data, fileInfo) {
            if (!this.showPreview) {
                return;
            }
            var self = this, fname = $h.getFileName(file), ftype = fileInfo.type, content,
                caption = fileInfo.name, cat = self._parseFileType(ftype, fname), $preview = self.$preview,
                fsize = file.size || 0, iData = cat === 'image' ? theFile.target.result : data, fm = self.fileManager,
                fileId = fm.getId(file), previewId = self._getThumbId(fileId);
            /** @namespace window.DOMPurify */
            content = self._generatePreviewTemplate(cat, iData, fname, ftype, previewId, fileId, false, fsize, fileInfo.filename);
            self._clearDefaultPreview();
            self._addToPreview($preview, content);
            var $thumb = self._getFrame(previewId);
            self._validateImageOrientation($thumb.find('img'), file, previewId, fileId, caption, ftype, fsize, iData);
            self._setThumbAttr(previewId, caption, fsize);
            self._initSortable();
        },
        _setThumbAttr: function (id, caption, size, description) {
            var self = this, $frame = self._getFrame(id);
            if ($frame.length) {
                size = size && size > 0 ? self._getSize(size) : '';
                $frame.data({'caption': caption, 'size': size, 'description': description || ''});
            }
        },
        _setInitThumbAttr: function () {
            var self = this, data = self.previewCache.data, len = self.previewCache.count(true), config,
                caption, size, description, previewId;
            if (len === 0) {
                return;
            }
            for (var i = 0; i < len; i++) {
                config = data.config[i];
                previewId = self.previewInitId + '-' + $h.INIT_FLAG + i;
                caption = $h.ifSet('caption', config, $h.ifSet('filename', config));
                size = $h.ifSet('size', config);
                description = $h.ifSet('description', config);
                self._setThumbAttr(previewId, caption, size, description);
            }
        },
        _slugDefault: function (text) {
            // noinspection RegExpRedundantEscape
            return $h.isEmpty(text, true) ? '' : String(text).replace(/[\[\]\/\{}:;#%=\(\)\*\+\?\\\^\$\|<>&"']/g, '_');
        },
        _updateFileDetails: function (numFiles) {
            var self = this, $el = self.$element, label, n, log, nFiles, file,
                name = ($h.isIE(9) && $h.findFileName($el.val())) || ($el[0].files[0] && $el[0].files[0].name);
            if (!name && self.fileManager.count() > 0) {
                file = self.fileManager.getFirstFile();
                label = file.nameFmt;
            } else {
                label = name ? self.slug(name) : '_';
            }
            n = self.isAjaxUpload ? self.fileManager.count() : numFiles;
            nFiles = self.previewCache.count(true) + n;
            log = n === 1 ? label : self._getMsgSelected(nFiles, !self.isAjaxUpload && !self.isError);
            if (self.isError) {
                self.$previewContainer.removeClass('file-thumb-loading');
                self._initCapStatus();
                self.$previewStatus.html('');
                self.$captionContainer.removeClass('icon-visible');
            } else {
                self._showFileIcon();
            }
            self._setCaption(log, self.isError);
            self.$container.removeClass('file-input-new file-input-ajax-new');
            self._raise('fileselect', [numFiles, label]);
            if (self.previewCache.count(true)) {
                self._initPreviewActions();
            }
        },
        _setThumbStatus: function ($thumb, status) {
            var self = this;
            if (!self.showPreview) {
                return;
            }
            var icon = 'indicator' + status, msg = icon + 'Title',
                css = 'file-preview-' + status.toLowerCase(),
                $indicator = $thumb.find('.file-upload-indicator'),
                config = self.fileActionSettings;
            $thumb.removeClass('file-preview-success file-preview-error file-preview-paused file-preview-loading');
            if (status === 'Success') {
                $thumb.find('.file-drag-handle').remove();
            }
            $h.setHtml($indicator, config[icon]);
            $indicator.attr('title', config[msg]);
            $thumb.addClass(css);
            if (status === 'Error' && !self.retryErrorUploads) {
                $thumb.find('.kv-file-upload').attr('disabled', true);
            }
        },
        _setProgressCancelled: function () {
            var self = this;
            self._setProgress(101, self.$progress, self.msgCancelled);
        },
        _setProgress: function (p, $el, error, stats) {
            var self = this;
            $el = $el || self.$progress;
            if (!$el.length) {
                return;
            }
            var pct = Math.min(p, 100), out, pctLimit = self.progressUploadThreshold,
                t = p <= 100 ? self.progressTemplate : self.progressCompleteTemplate,
                template = pct < 100 ? self.progressTemplate :
                    (error ? (self.paused ? self.progressPauseTemplate : self.progressErrorTemplate) : t);
            if (p >= 100) {
                stats = '';
            }
            if (!$h.isEmpty(template)) {
                if (pctLimit && pct > pctLimit && p <= 100) {
                    out = template.setTokens({'percent': pctLimit, 'status': self.msgUploadThreshold});
                } else {
                    out = template.setTokens({'percent': pct, 'status': (p > 100 ? self.msgUploadEnd : pct + '%')});
                }
                stats = stats || '';
                out = out.setTokens({stats: stats});
                $h.setHtml($el, out);
                if (error) {
                    $h.setHtml($el.find('[role="progressbar"]'), error);
                }
            }
        },
        _hasFiles: function () {
            var el = this.$element[0];
            return !!(el && el.files && el.files.length);
        },
        _setFileDropZoneTitle: function () {
            var self = this, $zone = self.$container.find('.file-drop-zone'), title = self.dropZoneTitle, strFiles;
            if (self.isClickable) {
                strFiles = $h.isEmpty(self.$element.attr('multiple')) ? self.fileSingle : self.filePlural;
                title += self.dropZoneClickTitle.replace('{files}', strFiles);
            }
            $zone.find('.' + self.dropZoneTitleClass).remove();
            if (!self.showPreview || $zone.length === 0 || self.fileManager.count() > 0 || !self.dropZoneEnabled ||
                self.previewCache.count() > 0 || (!self.isAjaxUpload && self._hasFiles())) {
                return;
            }
            if ($zone.find($h.FRAMES).length === 0 && $h.isEmpty(self.defaultPreviewContent)) {
                $zone.prepend('<div class="' + self.dropZoneTitleClass + '">' + title + '</div>');
            }
            self.$container.removeClass('file-input-new');
            $h.addCss(self.$container, 'file-input-ajax-new');
        },
        _getStats: function (stats) {
            var self = this, pendingTime, t;
            if (!self.showUploadStats || !stats || !stats.bitrate) {
                return '';
            }
            t = self._getLayoutTemplate('stats');
            pendingTime = (!stats.elapsed || !stats.bps) ? self.msgCalculatingTime :
                self.msgPendingTime.setTokens({time: $h.getElapsed(Math.ceil(stats.pendingBytes / stats.bps))});

            return t.setTokens({
                uploadSpeed: stats.bitrate,
                pendingTime: pendingTime
            });
        },
        _setResumableProgress: function (pct, stats, $thumb) {
            var self = this, rm = self.resumableManager, obj = $thumb ? rm : self,
                $prog = $thumb ? $thumb.find('.file-thumb-progress') : null;
            if (obj.lastProgress === 0) {
                obj.lastProgress = pct;
            }
            if (pct < obj.lastProgress) {
                pct = obj.lastProgress;
            }
            self._setProgress(pct, $prog, null, self._getStats(stats));
            obj.lastProgress = pct;
        },
        _toggleResumableProgress: function (template, message) {
            var self = this, $progress = self.$progress;
            if ($progress && $progress.length) {
                $h.setHtml($progress, template.setTokens({
                    percent: 101,
                    status: message,
                    stats: ''
                }));
            }
        },
        _setFileUploadStats: function (id, pct, stats) {
            var self = this, $prog = self.$progress;
            if (!self.showPreview && (!$prog || !$prog.length)) {
                return;
            }
            var fm = self.fileManager, rm = self.resumableManager, $thumb = fm.getThumb(id), pctTot,
                totUpSize = 0, totSize = fm.getTotalSize(), totStats = $.extend(true, {}, stats);
            if (self.enableResumableUpload) {
                var loaded = stats.loaded, currUplSize = rm.getUploadedSize(), currTotSize = rm.file.size, totLoaded;
                loaded += currUplSize;
                totLoaded = fm.uploadedSize + loaded;
                pct = $h.round(100 * loaded / currTotSize);
                stats.pendingBytes = currTotSize - currUplSize;
                self._setResumableProgress(pct, stats, $thumb);
                pctTot = Math.floor(100 * totLoaded / totSize);
                totStats.pendingBytes = totSize - totLoaded;
                self._setResumableProgress(pctTot, totStats);
            } else {
                fm.setProgress(id, pct);
                $prog = $thumb && $thumb.length ? $thumb.find('.file-thumb-progress') : null;
                self._setProgress(pct, $prog, null, self._getStats(stats));
                $.each(fm.stats, function (id, cfg) {
                    totUpSize += cfg.loaded;
                });
                totStats.pendingBytes = totSize - totUpSize;
                pctTot = $h.round(totUpSize / totSize * 100);
                self._setProgress(pctTot, null, null, self._getStats(totStats));
            }
        },
        _validateMinCount: function () {
            var self = this, len = self.isAjaxUpload ? self.fileManager.count() : self._inputFileCount();
            if (self.validateInitialCount && self.minFileCount > 0 && self._getFileCount(len - 1) < self.minFileCount) {
                self._noFilesError({});
                return false;
            }
            return true;
        },
        _getFileCount: function (fileCount, includeInitial) {
            var self = this, addCount = 0;
            if (includeInitial === undefined) {
                includeInitial = self.validateInitialCount && !self.overwriteInitial;
            }
            if (includeInitial) {
                addCount = self.previewCache.count(true);
                fileCount += addCount;
            }
            return fileCount;
        },
        _getFileId: function (file) {
            return $h.getFileId(file, this.generateFileId);
        },
        _getFileName: function (file, defaultValue) {
            var self = this, fileName = $h.getFileName(file);
            return fileName ? self.slug(fileName) : defaultValue;
        },
        _getFileNames: function (skipNull) {
            var self = this;
            return self.filenames.filter(function (n) {
                return (skipNull ? n !== undefined : n !== undefined && n !== null);
            });
        },
        _setPreviewError: function ($thumb, keepFile) {
            var self = this, removeFrame = self.removeFromPreviewOnError && !self.retryErrorUploads;
            if (!keepFile || removeFrame) {
                self.fileManager.remove($thumb);
            }
            if (!self.showPreview) {
                return;
            }
            if (removeFrame) {
                $thumb.remove();
                return;
            } else {
                self._setThumbStatus($thumb, 'Error');
            }
            self._refreshUploadButton($thumb);
        },
        _refreshUploadButton: function ($thumb) {
            var self = this, $btn = $thumb.find('.kv-file-upload'), cfg = self.fileActionSettings,
                icon = cfg.uploadIcon, title = cfg.uploadTitle;
            if (!$btn.length) {
                return;
            }
            if (self.retryErrorUploads) {
                icon = cfg.uploadRetryIcon;
                title = cfg.uploadRetryTitle;
            }
            $btn.attr('title', title);
            $h.setHtml($btn, icon);
        },
        _isValidSize: function (size, type, $image, $thumb, filename, params) {
            var self = this, msg, dim, $img, tag = size === 'Small' ? 'min' : 'max', limit = self[tag + 'Image' + type];
            if ($h.isEmpty(limit) || !$image.length) {
                return true;
            }
            $img = $image[0];
            dim = (type === 'Width') ? $img.naturalWidth || $img.width : $img.naturalHeight || $img.height;
            if (size === 'Small' ? dim >= limit : dim <= limit) {
                return true;
            }
            msg = self['msgImage' + type + size] || 'Image "{name}" has a size validation error (limit "{size}").';
            self._showFileError(msg.setTokens({'name': filename, 'size': limit, 'dimension': dim}), params);
            self._setPreviewError($thumb);
            self.fileManager.remove($thumb);
            self._clearFileInput();
            return false;
        },
        _getExifObj: function (data) {
            var self = this, exifObj, error = $h.logMessages.exifWarning;
            if (data.slice(0, 23) !== 'data:image/jpeg;base64,' && data.slice(0, 22) !== 'data:image/jpg;base64,') {
                exifObj = null;
                return;
            }
            try {
                exifObj = window.piexif ? window.piexif.load(data) : null;
            } catch (err) {
                exifObj = null;
                error = err && err.message || '';
            }
            if (!exifObj && self.showExifErrorLog) {
                self._log($h.logMessages.badExifParser, {details: error});
            }
            return exifObj;
        },
        setImageOrientation: function ($img, $zoomImg, value, $thumb) {
            var self = this, invalidImg = !$img || !$img.length, invalidZoomImg = !$zoomImg || !$zoomImg.length, $mark,
                isHidden = false, $div, zoomOnly = invalidImg && $thumb && $thumb.attr('data-template') === 'image', ev;
            if (invalidImg && invalidZoomImg) {
                return;
            }
            ev = 'load.fileinputimageorient';
            if (zoomOnly) {
                $img = $zoomImg;
                $zoomImg = null;
                $img.css(self.previewSettings.image);
                $div = $(document.createElement('div')).appendTo($thumb.find('.kv-file-content'));
                $mark = $(document.createElement('span')).insertBefore($img);
                $img.css('visibility', 'hidden').removeClass('file-zoom-detail').appendTo($div);
            } else {
                isHidden = !$img.is(':visible');
            }
            $img.off(ev).on(ev, function () {
                if (isHidden) {
                    self.$preview.removeClass('hide-content');
                    $thumb.find('.kv-file-content').css('visibility', 'hidden');
                }
                var img = $img[0], zoomImg = $zoomImg && $zoomImg.length ? $zoomImg[0] : null,
                    h = img.offsetHeight, w = img.offsetWidth, r = $h.getRotation(value);
                if (isHidden) {
                    $thumb.find('.kv-file-content').css('visibility', 'visible');
                    self.$preview.addClass('hide-content');
                }
                $img.data('orientation', value);
                if (zoomImg) {
                    $zoomImg.data('orientation', value);
                }
                if (value < 5) {
                    $h.setTransform(img, r);
                    $h.setTransform(zoomImg, r);
                    return;
                }
                var offsetAngle = Math.atan(w / h), origFactor = Math.sqrt(Math.pow(h, 2) + Math.pow(w, 2)),
                    scale = !origFactor ? 1 : (h / Math.cos(Math.PI / 2 + offsetAngle)) / origFactor,
                    s = ' scale(' + Math.abs(scale) + ')';
                $h.setTransform(img, r + s);
                $h.setTransform(zoomImg, r + s);
                if (zoomOnly) {
                    $img.css('visibility', 'visible').insertAfter($mark).addClass('file-zoom-detail');
                    $mark.remove();
                    $div.remove();
                }
            });
        },
        _validateImageOrientation: function ($img, file, previewId, fileId, caption, ftype, fsize, iData) {
            var self = this, exifObj = null, value, autoOrientImage = self.autoOrientImage, selector;
            exifObj = self._getExifObj(iData);
            if (self.canOrientImage) {
                $img.css('image-orientation', (autoOrientImage ? 'from-image' : 'none'));
                self._validateImage(previewId, fileId, caption, ftype, fsize, iData, exifObj);
                return;
            }
            selector = $h.getZoomSelector(previewId, ' img');
            value = exifObj ? exifObj['0th'][piexif.ImageIFD.Orientation] : null; // jshint ignore:line
            if (!value) {
                self._validateImage(previewId, fileId, caption, ftype, fsize, iData, exifObj);
                return;
            }
            self.setImageOrientation($img, $(selector), value, self._getFrame(previewId));
            self._raise('fileimageoriented', {'$img': $img, 'file': file});
            self._validateImage(previewId, fileId, caption, ftype, fsize, iData, exifObj);
        },
        _validateImage: function (previewId, fileId, fname, ftype, fsize, iData, exifObj) {
            var self = this, $preview = self.$preview, params, w1, w2, $thumb = self._getFrame(previewId),
                i = $thumb.attr('data-fileindex'), $img = $thumb.find('img');
            fname = fname || 'Untitled';
            $img.one('load', function () {
                if ($img.data('validated')) {
                    return;
                }
                $img.data('validated', true);
                w1 = $thumb.width();
                w2 = $preview.width();
                if (w1 > w2) {
                    $img.css('width', '100%');
                }
                params = {ind: i, id: previewId, fileId: fileId};
                setTimeout(function () {
                    var isValidWidth, isValidHeight;
                    isValidWidth = self._isValidSize('Small', 'Width', $img, $thumb, fname, params);
                    isValidHeight = self._isValidSize('Small', 'Height', $img, $thumb, fname, params);
                    if (!self.resizeImage) {
                        isValidWidth = isValidWidth && self._isValidSize('Large', 'Width', $img, $thumb, fname, params);
                        isValidHeight = isValidHeight && self._isValidSize('Large', 'Height', $img, $thumb, fname, params);
                    }
                    self._raise('fileimageloaded', [previewId]);
                    $thumb.data('exif', exifObj);
                    if (isValidWidth && isValidHeight) {
                        self.fileManager.addImage(fileId, {
                            ind: i,
                            img: $img,
                            thumb: $thumb,
                            pid: previewId,
                            typ: ftype,
                            siz: fsize,
                            validated: false,
                            imgData: iData,
                            exifObj: exifObj
                        });
                        self._validateAllImages();
                    }
                }, self.processDelay);
            }).one('error', function () {
                self._raise('fileimageloaderror', [previewId]);
            });
        },
        _validateAllImages: function () {
            var self = this, counter = {val: 0}, numImgs = self.fileManager.getImageCount(), fsize,
                minSize = self.resizeIfSizeMoreThan;
            if (numImgs !== self.fileManager.totalImages) {
                return;
            }
            self._raise('fileimagesloaded');
            if (!self.resizeImage) {
                return;
            }
            $.each(self.fileManager.loadedImages, function (id, config) {
                if (!config.validated) {
                    fsize = config.siz;
                    if (fsize && fsize > minSize * self.bytesToKB) {
                        self._getResizedImage(id, config, counter, numImgs);
                    }
                    config.validated = true;
                }
            });
        },
        _getResizedImage: function (id, config, counter, numImgs) {
            var self = this, img = $(config.img)[0], width = img.naturalWidth, height = img.naturalHeight, blob,
                ratio = 1, maxWidth = self.maxImageWidth || width, maxHeight = self.maxImageHeight || height,
                isValidImage = !!(width && height), chkWidth, chkHeight, canvas = self.imageCanvas, dataURI,
                context = self.imageCanvasContext, type = config.typ, pid = config.pid, ind = config.ind,
                $thumb = config.thumb, throwError, msg, exifObj = config.exifObj, exifStr, file, params, evParams;
            throwError = function (msg, params, ev) {
                if (self.isAjaxUpload) {
                    self._showFileError(msg, params, ev);
                } else {
                    self._showError(msg, params, ev);
                }
                self._setPreviewError($thumb);
            };
            file = self.fileManager.getFile(id);
            params = {id: pid, 'index': ind, fileId: id};
            evParams = [id, pid, ind];
            if (!file || !isValidImage || (width <= maxWidth && height <= maxHeight)) {
                if (isValidImage && file) {
                    self._raise('fileimageresized', evParams);
                }
                counter.val++;
                if (counter.val === numImgs) {
                    self._raise('fileimagesresized');
                }
                if (!isValidImage) {
                    throwError(self.msgImageResizeError, params, 'fileimageresizeerror');
                    return;
                }
            }
            type = type || self.resizeDefaultImageType;
            chkWidth = width > maxWidth;
            chkHeight = height > maxHeight;
            if (self.resizePreference === 'width') {
                ratio = chkWidth ? maxWidth / width : (chkHeight ? maxHeight / height : 1);
            } else {
                ratio = chkHeight ? maxHeight / height : (chkWidth ? maxWidth / width : 1);
            }
            self._resetCanvas();
            width *= ratio;
            height *= ratio;
            canvas.width = width;
            canvas.height = height;
            try {
                context.drawImage(img, 0, 0, width, height);
                dataURI = canvas.toDataURL(type, self.resizeQuality);
                if (exifObj) {
                    exifStr = window.piexif.dump(exifObj);
                    dataURI = window.piexif.insert(exifStr, dataURI);
                }
                blob = $h.dataURI2Blob(dataURI);
                self.fileManager.setFile(id, blob);
                self._raise('fileimageresized', evParams);
                counter.val++;
                if (counter.val === numImgs) {
                    self._raise('fileimagesresized', [undefined, undefined]);
                }
                if (!(blob instanceof Blob)) {
                    throwError(self.msgImageResizeError, params, 'fileimageresizeerror');
                }
            } catch (err) {
                counter.val++;
                if (counter.val === numImgs) {
                    self._raise('fileimagesresized', [undefined, undefined]);
                }
                msg = self.msgImageResizeException.replace('{errors}', err.message);
                throwError(msg, params, 'fileimageresizeexception');
            }
        },
        _showProgress: function () {
            var self = this;
            if (self.$progress && self.$progress.length) {
                self.$progress.show();
            }
        },
        _hideProgress: function () {
            var self = this;
            if (self.$progress && self.$progress.length) {
                self.$progress.hide();
            }
        },
        _initBrowse: function ($container) {
            var self = this, $el = self.$element;
            if (self.showBrowse) {
                self.$btnFile = $container.find('.btn-file').append($el);
            } else {
                $el.appendTo($container).attr('tabindex', -1);
                $h.addCss($el, 'file-no-browse');
            }
        },
        _initClickable: function () {
            var self = this, $zone, $tmpZone;
            if (!self.isClickable) {
                return;
            }
            $zone = self.$dropZone;
            if (!self.isAjaxUpload) {
                $tmpZone = self.$preview.find('.file-default-preview');
                if ($tmpZone.length) {
                    $zone = $tmpZone;
                }
            }

            $h.addCss($zone, 'clickable');
            $zone.attr('tabindex', -1);
            self._handler($zone, 'click', function (e) {
                var $tar = $(e.target);
                if (!self.$errorContainer.is(':visible') && (!$tar.parents(
                    '.file-preview-thumbnails').length || $tar.parents(
                    '.file-default-preview').length)) {
                    self.$element.data('zoneClicked', true).trigger('click');
                    $zone.blur();
                }
            });
        },
        _initCaption: function () {
            var self = this, cap = self.initialCaption || '';
            if (self.overwriteInitial || $h.isEmpty(cap)) {
                self.$caption.val('');
                return false;
            }
            self._setCaption(cap);
            return true;
        },
        _setCaption: function (content, isError) {
            var self = this, title, out, icon, n, cap, file;
            if (!self.$caption.length) {
                return;
            }
            self.$captionContainer.removeClass('icon-visible');
            if (isError) {
                title = $('<div>' + self.msgValidationError + '</div>').text();
                n = self.fileManager.count();
                if (n) {
                    file = self.fileManager.getFirstFile();
                    cap = n === 1 && file ? file.nameFmt : self._getMsgSelected(n);
                } else {
                    cap = self._getMsgSelected(self.msgNo);
                }
                out = $h.isEmpty(content) ? cap : content;
                icon = '<span class="' + self.msgValidationErrorClass + '">' + self.msgValidationErrorIcon + '</span>';
            } else {
                if ($h.isEmpty(content)) {
                    self.$caption.attr('title', '');
                    return;
                }
                title = $('<div>' + content + '</div>').text();
                out = title;
                icon = self._getLayoutTemplate('fileIcon');
            }
            self.$captionContainer.addClass('icon-visible');
            self.$caption.attr('title', title).val(out);
            $h.setHtml(self.$captionIcon, icon);
        },
        _createContainer: function () {
            var self = this, attribs = {'class': 'file-input file-input-new' + (self.rtl ? ' kv-rtl' : '')},
                $container = $h.createElement($h.cspBuffer.stash(self._renderMain()));
            $h.cspBuffer.apply($container);
            $container.insertBefore(self.$element).attr(attribs);
            self._initBrowse($container);
            if (self.theme) {
                $container.addClass('theme-' + self.theme);
            }
            return $container;
        },
        _refreshContainer: function () {
            var self = this, $container = self.$container, $el = self.$element;
            $el.insertAfter($container);
            $h.setHtml($container, self._renderMain());
            self._initBrowse($container);
            self._validateDisabled();
        },
        _validateDisabled: function () {
            var self = this;
            self.$caption.attr({readonly: self.isDisabled});
        },
        _setTabIndex: function (type, html) {
            var self = this, index = self.tabIndexConfig[type];
            return html.setTokens({
                tabIndexConfig: index === undefined || index === null ? '' : 'tabindex="' + index + '"'
            });
        },
        _renderMain: function () {
            var self = this,
                dropCss = self.dropZoneEnabled ? ' file-drop-zone' : 'file-drop-disabled',
                close = !self.showClose ? '' : self._getLayoutTemplate('close'),
                preview = !self.showPreview ? '' : self._getLayoutTemplate('preview')
                    .setTokens({'class': self.previewClass, 'dropClass': dropCss}),
                css = self.isDisabled ? self.captionClass + ' file-caption-disabled' : self.captionClass,
                caption = self.captionTemplate.setTokens({'class': css + ' kv-fileinput-caption'});
            caption = self._setTabIndex('caption', caption);
            return self.mainTemplate.setTokens({
                'class': self.mainClass + (!self.showBrowse && self.showCaption ? ' no-browse' : ''),
                'inputGroupClass': self.inputGroupClass,
                'preview': preview,
                'close': close,
                'caption': caption,
                'upload': self._renderButton('upload'),
                'remove': self._renderButton('remove'),
                'cancel': self._renderButton('cancel'),
                'pause': self._renderButton('pause'),
                'browse': self._renderButton('browse')
            });

        },
        _renderButton: function (type) {
            var self = this, tmplt = self._getLayoutTemplate('btnDefault'), css = self[type + 'Class'],
                title = self[type + 'Title'], icon = self[type + 'Icon'], label = self[type + 'Label'],
                status = self.isDisabled ? ' disabled' : '', btnType = 'button';
            switch (type) {
                case 'remove':
                    if (!self.showRemove) {
                        return '';
                    }
                    break;
                case 'cancel':
                    if (!self.showCancel) {
                        return '';
                    }
                    css += ' kv-hidden';
                    break;
                case 'pause':
                    if (!self.showPause) {
                        return '';
                    }
                    css += ' kv-hidden';
                    break;
                case 'upload':
                    if (!self.showUpload) {
                        return '';
                    }
                    if (self.isAjaxUpload && !self.isDisabled) {
                        tmplt = self._getLayoutTemplate('btnLink').replace('{href}', self.uploadUrl);
                    } else {
                        btnType = 'submit';
                    }
                    break;
                case 'browse':
                    if (!self.showBrowse) {
                        return '';
                    }
                    tmplt = self._getLayoutTemplate('btnBrowse');
                    break;
                default:
                    return '';
            }
            tmplt = self._setTabIndex(type, tmplt);

            css += type === 'browse' ? ' btn-file' : ' fileinput-' + type + ' fileinput-' + type + '-button';
            if (!$h.isEmpty(label)) {
                label = ' <span class="' + self.buttonLabelClass + '">' + label + '</span>';
            }
            return tmplt.setTokens({
                'type': btnType, 'css': css, 'title': title, 'status': status, 'icon': icon, 'label': label
            });
        },
        _renderThumbProgress: function () {
            var self = this;
            return '<div class="file-thumb-progress kv-hidden">' +
                self.progressInfoTemplate.setTokens({percent: 101, status: self.msgUploadBegin, stats: ''}) +
                '</div>';
        },
        _renderFileFooter: function (cat, caption, size, width, isError) {
            var self = this, config = self.fileActionSettings, rem = config.showRemove, drg = config.showDrag,
                upl = config.showUpload, rot = config.showRotate, zoom = config.showZoom, out, params,
                template = self._getLayoutTemplate('footer'), tInd = self._getLayoutTemplate('indicator'),
                ind = isError ? config.indicatorError : config.indicatorNew,
                title = isError ? config.indicatorErrorTitle : config.indicatorNewTitle,
                indicator = tInd.setTokens({'indicator': ind, 'indicatorTitle': title});
            size = self._getSize(size);
            params = {type: cat, caption: caption, size: size, width: width, progress: '', indicator: indicator};
            if (self.isAjaxUpload) {
                params.progress = self._renderThumbProgress();
                params.actions = self._renderFileActions(params, upl, false, rem, rot, zoom, drg, false, false, false);
            } else {
                params.actions = self._renderFileActions(params, false, false, false, false, zoom, drg, false, false, false);
            }
            out = template.setTokens(params);
            out = $h.replaceTags(out, self.previewThumbTags);
            return out;
        },
        _renderFileActions: function (
            cfg,
            showUpl,
            showDwn,
            showDel,
            showRot,
            showZoom,
            showDrag,
            disabled,
            url,
            key,
            isInit,
            dUrl,
            dFile
        ) {
            var self = this;
            if (!cfg.type && isInit) {
                cfg.type = 'image';
            }
            if (self.enableResumableUpload) {
                showUpl = false;
            } else {
                if (typeof showUpl === 'function') {
                    showUpl = showUpl(cfg);
                }
            }
            if (typeof showDwn === 'function') {
                showDwn = showDwn(cfg);
            }
            if (typeof showDel === 'function') {
                showDel = showDel(cfg);
            }
            if (typeof showZoom === 'function') {
                showZoom = showZoom(cfg);
            }
            if (typeof showDrag === 'function') {
                showDrag = showDrag(cfg);
            }
            if (typeof showRot === 'function') {
                showRot = showRot(cfg);
            }
            if (!showUpl && !showDwn && !showDel && !showRot && !showZoom && !showDrag) {
                return '';
            }
            var vUrl = url === false ? '' : ' data-url="' + url + '"', btnZoom = '', btnDrag = '', btnRotate = '', css,
                vKey = key === false ? '' : ' data-key="' + key + '"', btnDelete = '', btnUpload = '', btnDownload = '',
                template = self._getLayoutTemplate('actions'), config = self.fileActionSettings,
                otherButtons = self.otherActionButtons.setTokens({'dataKey': vKey, 'key': key}),
                removeClass = disabled ? config.removeClass + ' disabled' : config.removeClass;
            if (showDel) {
                btnDelete = self._getLayoutTemplate('actionDelete').setTokens({
                    'removeClass': removeClass,
                    'removeIcon': config.removeIcon,
                    'removeTitle': config.removeTitle,
                    'dataUrl': vUrl,
                    'dataKey': vKey,
                    'key': key
                });
            }
            if (showRot) {
                btnRotate = self._getLayoutTemplate('actionRotate').setTokens({
                    'rotateClass': config.rotateClass,
                    'rotateIcon': config.rotateIcon,
                    'rotateTitle': config.rotateTitle
                });
            }
            if (showUpl) {
                btnUpload = self._getLayoutTemplate('actionUpload').setTokens({
                    'uploadClass': config.uploadClass,
                    'uploadIcon': config.uploadIcon,
                    'uploadTitle': config.uploadTitle
                });
            }
            if (showDwn) {
                btnDownload = self._getLayoutTemplate('actionDownload').setTokens({
                    'downloadClass': config.downloadClass,
                    'downloadIcon': config.downloadIcon,
                    'downloadTitle': config.downloadTitle,
                    'downloadUrl': dUrl || self.initialPreviewDownloadUrl
                });
                btnDownload = btnDownload.setTokens({'filename': dFile, 'key': key});
            }
            if (showZoom) {
                btnZoom = self._getLayoutTemplate('actionZoom').setTokens({
                    'zoomClass': config.zoomClass,
                    'zoomIcon': config.zoomIcon,
                    'zoomTitle': config.zoomTitle
                });
            }
            if (showDrag && isInit) {
                css = 'drag-handle-init ' + config.dragClass;
                btnDrag = self._getLayoutTemplate('actionDrag').setTokens({
                    'dragClass': css,
                    'dragTitle': config.dragTitle,
                    'dragIcon': config.dragIcon
                });
            }
            return template.setTokens({
                'delete': btnDelete,
                'upload': btnUpload,
                'download': btnDownload,
                'rotate': btnRotate,
                'zoom': btnZoom,
                'drag': btnDrag,
                'other': otherButtons
            });
        },
        _browse: function (e) {
            var self = this;
            if (e && e.isDefaultPrevented() || !self._raise('filebrowse')) {
                return;
            }
            if (self.isError && !self.isAjaxUpload) {
                self.clear();
            }
            if (self.focusCaptionOnBrowse) {
                self.$captionContainer.focus();
            }
        },
        _change: function (e) {
            var self = this;
            $(document.body).off('focusin.fileinput focusout.fileinput');
            if (self.changeTriggered) {
                self._toggleLoading('hide');
                return;
            }
            self._toggleLoading('show');
            var $el = self.$element, isDragDrop = arguments.length > 1, isAjaxUpload = self.isAjaxUpload,
                tfiles, files = isDragDrop ? arguments[1] : $el[0].files, ctr = self.fileManager.count(),
                total, initCount, len, isSingleUpl = $h.isEmpty($el.attr('multiple')),
                maxCount = !isAjaxUpload && isSingleUpl ? 1 : self.maxFileCount, maxTotCount = self.maxTotalFileCount,
                inclAll = maxTotCount > 0 && maxTotCount > maxCount, flagSingle = (isSingleUpl && ctr > 0),
                throwError = function (mesg, file, previewId, index) {
                    var p1 = $.extend(true, {}, self._getOutData(null, {}, {}, files), {id: previewId, index: index}),
                        p2 = {id: previewId, index: index, file: file, files: files};
                    self.isPersistentError = true;
                    self._toggleLoading('hide');
                    return isAjaxUpload ? self._showFileError(mesg, p1) : self._showError(mesg, p2);
                },
                maxCountCheck = function (n, m, all) {
                    var msg = all ? self.msgTotalFilesTooMany : self.msgFilesTooMany;
                    msg = msg.replace('{m}', m).replace('{n}', n);
                    self.isError = throwError(msg, null, null, null);
                    self.$captionContainer.removeClass('icon-visible');
                    self._setCaption('', true);
                    self.$container.removeClass('file-input-new file-input-ajax-new');
                };
            self.reader = null;
            self._resetUpload();
            self._hideFileIcon();
            if (self.dropZoneEnabled) {
                self.$container.find('.file-drop-zone .' + self.dropZoneTitleClass).remove();
            }
            if (!isAjaxUpload) {
                if (e.target && e.target.files === undefined) {
                    files = e.target.value ? [{name: e.target.value.replace(/^.+\\/, '')}] : [];
                } else {
                    files = e.target.files || {};
                }
            }
            tfiles = files;
            if ($h.isEmpty(tfiles) || tfiles.length === 0) {
                if (!isAjaxUpload) {
                    self.clear();
                }
                self._raise('fileselectnone');
                return;
            }
            self._resetErrors();
            len = tfiles.length;
            initCount = isAjaxUpload ? (self.fileManager.count() + len) : len;
            total = self._getFileCount(initCount, inclAll ? false : undefined);
            if (maxCount > 0 && total > maxCount) {
                if (!self.autoReplace || len > maxCount) {
                    maxCountCheck((self.autoReplace && len > maxCount ? len : total), maxCount);
                    return;
                }
                if (total > maxCount) {
                    self._resetPreviewThumbs(isAjaxUpload);
                }

            } else {
                if (inclAll) {
                    total = self._getFileCount(initCount, true);
                    if (maxTotCount > 0 && total > maxTotCount) {
                        if (!self.autoReplace || len > maxCount) {
                            maxCountCheck((self.autoReplace && len > maxTotCount ? len : total), maxTotCount, true);
                            return;
                        }
                        if (total > maxCount) {
                            self._resetPreviewThumbs(isAjaxUpload);
                        }
                    }
                }
                if (!isAjaxUpload || flagSingle) {
                    self._resetPreviewThumbs(false);
                    if (flagSingle) {
                        self.clearFileStack();
                    }
                } else {
                    if (isAjaxUpload && ctr === 0 && (!self.previewCache.count(true) || self.overwriteInitial)) {
                        self._resetPreviewThumbs(true);
                    }
                }
            }
            if (self.autoReplace) {
                self._getThumbs().each(function () {
                    var $thumb = $(this);
                    if ($thumb.hasClass('file-preview-success') || $thumb.hasClass('file-preview-error')) {
                        $thumb.remove();
                    }
                });
            }
            self.readFiles(tfiles);
            self._toggleLoading('hide');
        },
        _abort: function (params) {
            var self = this, data;
            if (self.ajaxAborted && typeof self.ajaxAborted === 'object' && self.ajaxAborted.message !== undefined) {
                data = $.extend(true, {}, self._getOutData(null), params);
                data.abortData = self.ajaxAborted.data || {};
                data.abortMessage = self.ajaxAborted.message;
                self._setProgress(101, self.$progress, self.msgCancelled);
                self._showFileError(self.ajaxAborted.message, data, 'filecustomerror');
                self.cancel();
                self.unlock();
                return true;
            }
            return !!self.ajaxAborted;
        },
        _resetFileStack: function () {
            var self = this, i = 0;
            self._getThumbs().each(function () {
                var $thumb = $(this), ind = $thumb.attr('data-fileindex'), pid = $thumb.attr('id');
                if (ind === '-1' || ind === -1) {
                    return;
                }
                if (!self._getThumbFile($thumb)) {
                    $thumb.attr({'data-fileindex': i});
                    i++;
                } else {
                    $thumb.attr({'data-fileindex': '-1'});
                }
                self._getZoom(pid).attr({
                    'data-fileindex': $thumb.attr('data-fileindex')
                });
            });
        },
        _isFileSelectionValid: function (cnt) {
            var self = this;
            cnt = cnt || 0;
            if (self.required && !self.getFilesCount()) {
                self.$errorContainer.html('');
                self._showFileError(self.msgFileRequired);
                return false;
            }
            if (self.minFileCount > 0 && self._getFileCount(cnt) < self.minFileCount) {
                self._noFilesError({});
                return false;
            }
            return true;
        },
        _canPreview: function (file) {
            var self = this;
            if (!file || !self.showPreview || !self.$preview || !self.$preview.length) {
                return false;
            }
            var name = file.name || '', type = file.type || '', size = (file.size || 0) / self.bytesToKB,
                cat = self._parseFileType(type, name), allowedTypes, allowedMimes, allowedExts, skipPreview,
                types = self.allowedPreviewTypes, mimes = self.allowedPreviewMimeTypes,
                exts = self.allowedPreviewExtensions || [], dTypes = self.disabledPreviewTypes,
                dMimes = self.disabledPreviewMimeTypes, dExts = self.disabledPreviewExtensions || [],
                maxSize = self.maxFilePreviewSize && parseFloat(self.maxFilePreviewSize) || 0,
                expAllExt = new RegExp('\\.(' + exts.join('|') + ')$', 'i'),
                expDisExt = new RegExp('\\.(' + dExts.join('|') + ')$', 'i');
            allowedTypes = !types || types.indexOf(cat) !== -1;
            allowedMimes = !mimes || mimes.indexOf(type) !== -1;
            allowedExts = !exts.length || $h.compare(name, expAllExt);
            skipPreview = (dTypes && dTypes.indexOf(cat) !== -1) || (dMimes && dMimes.indexOf(type) !== -1) ||
                (dExts.length && $h.compare(name, expDisExt)) || (maxSize && !isNaN(maxSize) && size > maxSize);
            return !skipPreview && (allowedTypes || allowedMimes || allowedExts);
        },
        addToStack: function (file, id) {
            var self = this;
            self.stackIsUpdating = true;
            self.fileManager.add(file, id);
            self._refreshPreview();
            self.stackIsUpdating = false;
        },
        clearFileStack: function () {
            var self = this;
            self.fileManager.clear();
            self._initResumableUpload();
            if (self.enableResumableUpload) {
                if (self.showPause === null) {
                    self.showPause = true;
                }
                if (self.showCancel === null) {
                    self.showCancel = false;
                }
            } else {
                self.showPause = false;
                if (self.showCancel === null) {
                    self.showCancel = true;
                }
            }
            return self.$element;
        },
        getFileStack: function () {
            return this.fileManager.stack;
        },
        getFileList: function () {
            return this.fileManager.list();
        },
        getFilesSize: function () {
            return this.fileManager.getTotalSize();
        },
        getFilesCount: function (includeInitial) {
            var self = this, len = self.isAjaxUpload ? self.fileManager.count() : self._inputFileCount();
            if (includeInitial) {
                len += self.previewCache.count(true);
            }
            return self._getFileCount(len);
        },
        _initCapStatus: function (status) {
            var self = this, $cap = self.$caption;
            $cap.removeClass('is-valid file-processing');
            if (!status) {
                return;
            }
            if (status === 'processing') {
                $cap.addClass('file-processing');
            } else {
                $cap.addClass('is-valid');
            }
        },
        _toggleLoading: function (type) {
            var self = this;
            self.$previewStatus.html(type === 'hide' ? '' : self.msgProcessing);
            self.$container.removeClass('file-thumb-loading');
            self._initCapStatus(type === 'hide' ? '' : 'processing');
            if (type !== 'hide') {
                if (self.dropZoneEnabled) {
                    self.$container.find('.file-drop-zone .' + self.dropZoneTitleClass).remove();
                }
                self.$container.addClass('file-thumb-loading');
            }
        },
        _initFileSelected: function () {
            var self = this, $el = self.$element, $body = $(document.body), ev = 'focusin.fileinput focusout.fileinput';
            if ($body.length) {
                $body.off(ev).on('focusout.fileinput', function () {
                    self._toggleLoading('show');
                }).on('focusin.fileinput', function () {
                    setTimeout(function () {
                        if (!$el.val()) {
                            self._setFileDropZoneTitle();
                        }
                        $body.off(ev);
                        self._toggleLoading('hide');
                    }, 2500);
                });
            } else {
                self._toggleLoading('hide');
            }
        },
        readFiles: function (files) {
            this.reader = new FileReader();
            var self = this, reader = self.reader, $container = self.$previewContainer,
                $status = self.$previewStatus, msgLoading = self.msgLoading, msgProgress = self.msgProgress,
                previewInitId = self.previewInitId, numFiles = files.length, settings = self.fileTypeSettings,
                readFile, fileTypes = self.allowedFileTypes, typLen = fileTypes ? fileTypes.length : 0,
                fileExt = self.allowedFileExtensions, strExt = $h.isEmpty(fileExt) ? '' : fileExt.join(', '),
                throwError = function (msg, file, previewId, index, fileId) {
                    var $thumb, p1 = $.extend(true, {}, self._getOutData(null, {}, {}, files),
                            {id: previewId, index: index, fileId: fileId}),
                        p2 = {id: previewId, index: index, fileId: fileId, file: file, files: files};
                    self._previewDefault(file, true);
                    $thumb = self._getFrame(previewId, true);
                    self._toggleLoading('hide');
                    if (self.isAjaxUpload) {
                        setTimeout(function () {
                            readFile(index + 1);
                        }, self.processDelay);
                    } else {
                        self.unlock();
                        numFiles = 0;
                    }
                    if (self.removeFromPreviewOnError && $thumb.length) {
                        $thumb.remove();
                    } else {
                        self._initFileActions();
                        $thumb.find('.kv-file-upload').remove();
                    }
                    self.isPersistentError = true;
                    self.isError = self.isAjaxUpload ? self._showFileError(msg, p1) : self._showError(msg, p2);
                    self._updateFileDetails(numFiles);
                };
            self.fileManager.clearImages();
            $.each(files, function (key, file) {
                var func = self.fileTypeSettings.image;
                if (func && func(file.type)) {
                    self.fileManager.totalImages++;
                }
            });
            readFile = function (i) {
                var $error = self.$errorContainer, errors, fm = self.fileManager;
                if (i >= numFiles) {
                    self.unlock();
                    if (self.duplicateErrors.length) {
                        errors = '<li>' + self.duplicateErrors.join('</li><li>') + '</li>';
                        if ($error.find('ul').length === 0) {
                            $h.setHtml($error, self.errorCloseButton + '<ul>' + errors + '</ul>');
                        } else {
                            $error.find('ul').append(errors);
                        }
                        $error.fadeIn(self.fadeDelay);
                        self._handler($error.find('.kv-error-close'), 'click', function () {
                            $error.fadeOut(self.fadeDelay);
                        });
                        self.duplicateErrors = [];
                    }
                    if (self.isAjaxUpload) {
                        self._raise('filebatchselected', [fm.stack]);
                        if (fm.count() === 0 && !self.isError) {
                            self.reset();
                        }
                    } else {
                        self._raise('filebatchselected', [files]);
                    }
                    $container.removeClass('file-thumb-loading');
                    self._initCapStatus('valid');
                    $status.html('');
                    return;
                }
                self.lock(true);
                var file = files[i], id, previewId, fileProcessed,
                    fSize = (file && file.size || 0), sizeHuman = self._getSize(fSize, true), j, msg,
                    fnImage = settings.image, chk, typ, typ1, typ2, caption, fileSize = fSize / self.bytesToKB,
                    fileExtExpr = '', previewData, fileCount = 0, strTypes = '', fileId, canLoad,
                    fileReaderAborted = false, func, knownTypes = 0, isImage, processFileLoaded, initFileData;
                initFileData = function (dataSource) {
                    dataSource = dataSource || file;
                    id = fileId = self._getFileId(file);
                    previewId = previewInitId + '-' + id;
                    previewData = $h.createObjectURL(dataSource);
                    caption = self._getFileName(file, '');
                };
                processFileLoaded = function () {
                    var isImageResized = !!fm.loadedImages[id], msg = msgProgress.setTokens({
                        'index': i + 1,
                        'files': numFiles,
                        'percent': 50,
                        'name': caption
                    });
                    setTimeout(function () {
                        $status.html(msg);
                        self._updateFileDetails(numFiles);
                        if (self.getFilesCount(true) > 0 && self.getFrames(':visible')) {
                            self.$dropZone.find('.' + self.dropZoneTitleClass).remove();
                        }
                        readFile(i + 1);
                    }, self.processDelay);
                    if (self._raise('fileloaded', [file, previewId, id, i, reader]) && self.isAjaxUpload) {
                        if (!isImageResized) {
                            fm.add(file);
                        }
                    } else {
                        if (isImageResized) {
                            fm.removeFile(id);
                        }
                    }
                };
                if (!file) {
                    return;
                }
                initFileData();

                if (typLen > 0) {
                    for (j = 0; j < typLen; j++) {
                        typ1 = fileTypes[j];
                        typ2 = self.msgFileTypes[typ1] || typ1;
                        strTypes += j === 0 ? typ2 : ', ' + typ2;
                    }
                }
                if (caption === false) {
                    readFile(i + 1);
                    return;
                }
                if (caption.length === 0) {
                    msg = self.msgInvalidFileName.replace('{name}', $h.htmlEncode($h.getFileName(file), '[unknown]'));
                    throwError(msg, file, previewId, i, fileId);
                    return;
                }
                if (!$h.isEmpty(fileExt)) {
                    fileExtExpr = new RegExp('\\.(' + fileExt.join('|') + ')$', 'i');
                }
                if (self.isAjaxUpload && fm.exists(fileId) || self._getFrame(previewId, true).length) {
                    var p2 = {id: previewId, index: i, fileId: fileId, file: file, files: files};
                    msg = self.msgDuplicateFile.setTokens({name: caption, size: sizeHuman});
                    if (self.isAjaxUpload) {
                        if (!self.stackIsUpdating) {
                            self.duplicateErrors.push(msg);
                            self.isDuplicateError = true;
                            self._raise('fileduplicateerror', [file, fileId, caption, sizeHuman, previewId, i]);
                        }
                        readFile(i + 1);
                        self._updateFileDetails(numFiles);
                    } else {
                        self._showError(msg, p2);
                        self.unlock();
                        numFiles = 0;
                        self._clearFileInput();
                        self.reset();
                        self._updateFileDetails(numFiles);
                    }
                    return;
                }
                if (self.maxFileSize > 0 && fileSize > self.maxFileSize) {
                    msg = self.msgSizeTooLarge.setTokens({
                        'name': caption,
                        'size': sizeHuman,
                        'maxSize': self._getSize(self.maxFileSize * self.bytesToKB, true)
                    });
                    throwError(msg, file, previewId, i, fileId);
                    return;
                }
                if (self.minFileSize !== null && fileSize <= $h.getNum(self.minFileSize)) {
                    msg = self.msgSizeTooSmall.setTokens({
                        'name': caption,
                        'size': sizeHuman,
                        'minSize': self._getSize(self.minFileSize * self.bytesToKB, true)
                    });
                    throwError(msg, file, previewId, i, fileId);
                    return;
                }
                if (!$h.isEmpty(fileTypes) && $h.isArray(fileTypes)) {
                    for (j = 0; j < fileTypes.length; j += 1) {
                        typ = fileTypes[j];
                        func = settings[typ];
                        fileCount += !func || (typeof func !== 'function') ? 0 : (func(file.type,
                            $h.getFileName(file)) ? 1 : 0);
                    }
                    if (fileCount === 0) {
                        msg = self.msgInvalidFileType.setTokens({name: caption, types: strTypes});
                        throwError(msg, file, previewId, i, fileId);
                        return;
                    }
                }
                if (fileCount === 0 && !$h.isEmpty(fileExt) && $h.isArray(fileExt) && !$h.isEmpty(fileExtExpr)) {
                    chk = $h.compare(caption, fileExtExpr);
                    fileCount += $h.isEmpty(chk) ? 0 : chk.length;
                    if (fileCount === 0) {
                        msg = self.msgInvalidFileExtension.setTokens({name: caption, extensions: strExt});
                        throwError(msg, file, previewId, i, fileId);
                        return;
                    }
                }
                if (!self._canPreview(file)) {
                    canLoad = self._raise('filebeforeload', [file, i, reader]);
                    if (self.isAjaxUpload && canLoad) {
                        fm.add(file);
                    }
                    if (self.showPreview && canLoad) {
                        $container.addClass('file-thumb-loading');
                        self._initCapStatus('processing');
                        self._previewDefault(file);
                        self._initFileActions();
                    }
                    setTimeout(function () {
                        if (canLoad) {
                            self._updateFileDetails(numFiles);
                        }
                        readFile(i + 1);
                        self._raise('fileloaded', [file, previewId, id, i]);
                    }, 10);
                    return;
                }
                isImage = fnImage(file.type, caption);
                $status.html(msgLoading.replace('{index}', i + 1).replace('{files}', numFiles));
                $container.addClass('file-thumb-loading');
                self._initCapStatus('processing');
                reader.onerror = function (evt) {
                    self._errorHandler(evt, caption);
                };
                reader.onload = function (theFile) {
                    var hex, fileInfo, fileData, byte, bytes = [], contents, mime,
                        processPreview = function (fType, ext) {
                            if ($h.isEmpty(fType)) { // look for ascii text content
                                contents = $h.arrayBuffer2String(reader.result);
                                fType = $h.isSvg(contents) ? 'image/svg+xml' : $h.getMimeType(hex, contents, file.type);
                            }
                            fileInfo = {'name': caption, 'type': fType || ''};
                            if (ext && typeof File !== "undefined") {
                                try {
                                    var fName = fileInfo.filename = caption + '.' + ext;
                                    fileProcessed = new File([file], fName, {type: fileInfo.type});
                                    initFileData(fileProcessed);
                                } catch (err) {
                                }
                            }
                            isImage = fnImage(fType, '');
                            if (isImage) {
                                var newReader = new FileReader();
                                newReader.onerror = function (theFileNew) {
                                    self._errorHandler(theFileNew, caption);
                                };
                                newReader.onload = function (theFileNew) {
                                    if (self.isAjaxUpload && !self._raise('filebeforeload', [file, i, reader])) {
                                        fileReaderAborted = true;
                                        self._resetCaption();
                                        reader.abort();
                                        $status.html('');
                                        $container.removeClass('file-thumb-loading');
                                        self._initCapStatus('valid');
                                        self.enable();
                                        return;
                                    }
                                    self._previewFile(i, file, theFileNew, previewData, fileInfo);
                                    self._initFileActions();
                                    processFileLoaded();
                                };
                                newReader.readAsDataURL(file);
                                return;
                            }
                            if (self.isAjaxUpload && !self._raise('filebeforeload', [file, i, reader])) {
                                fileReaderAborted = true;
                                self._resetCaption();
                                reader.abort();
                                $status.html('');
                                $container.removeClass('file-thumb-loading');
                                self._initCapStatus('valid');
                                self.enable();
                                return;
                            }
                            self._previewFile(i, file, theFile, previewData, fileInfo);
                            self._initFileActions();
                            processFileLoaded();
                        };
                    mime = file.type;
                    fileInfo = {'name': caption, 'type': mime};
                    $.each(settings, function (k, f) {
                        if (k !== 'object' && k !== 'other' && typeof f === 'function' && f(mime, caption)) {
                            knownTypes++;
                        }
                    });
                    if (typeof FileTypeParser !== "undefined") {
                        fileData = new Uint8Array(theFile.target.result);
                        new FileTypeParser().parse(fileData).then(function (result) {
                            processPreview(result && result.mime || mime, result && result.ext || '');
                        });
                    } else {
                        if (knownTypes === 0) { // auto detect mime types from content if no known file types detected
                            fileData = new Uint8Array(theFile.target.result);
                            for (j = 0; j < fileData.length; j++) {
                                byte = fileData[j].toString(16);
                                bytes.push(byte);
                            }
                            hex = bytes.join('').toLowerCase().substring(0, 8);
                            mime = $h.getMimeType(hex, '', '');
                        }
                        processPreview(mime);
                    }
                };
                reader.onprogress = function (data) {
                    if (data.lengthComputable) {
                        var fact = (data.loaded / data.total) * 100, progress = Math.ceil(fact);
                        msg = msgProgress.setTokens({
                            'index': i + 1,
                            'files': numFiles,
                            'percent': progress,
                            'name': caption
                        });
                        setTimeout(function () {
                            if (!fileReaderAborted) {
                                $status.html(msg);
                            }
                        }, self.processDelay);
                    }
                };
                reader.readAsArrayBuffer(file);
            };

            readFile(0);
            self._updateFileDetails(numFiles);
        },
        lock: function (selectMode) {
            var self = this, $container = self.$container;
            self._resetErrors();
            self.disable();
            if (!selectMode && self.showCancel) {
                $container.find('.fileinput-cancel').show();
            }
            if (!selectMode && self.showPause) {
                $container.find('.fileinput-pause').show();
            }
            self._initCapStatus('processing');
            self._raise('filelock', [self.fileManager.stack, self._getExtraData()]);
            return self.$element;
        },
        unlock: function (reset) {
            var self = this, $container = self.$container;
            if (reset === undefined) {
                reset = true;
            }
            self.enable();
            $container.removeClass('is-locked');
            if (self.showCancel) {
                $container.find('.fileinput-cancel').hide();
            }
            if (self.showPause) {
                $container.find('.fileinput-pause').hide();
            }
            if (reset) {
                self._resetFileStack();
            }
            self._initCapStatus();
            self._raise('fileunlock', [self.fileManager.stack, self._getExtraData()]);
            return self.$element;
        },
        resume: function () {
            var self = this, fm = self.fileManager, flag = false, rm = self.resumableManager;
            fm.bpsLog = [];
            fm.bps = 0;
            if (!self.enableResumableUpload) {
                return self.$element;
            }
            if (self.paused) {
                self._toggleResumableProgress(self.progressPauseTemplate, self.msgUploadResume);
            } else {
                flag = true;
            }
            self.paused = false;
            if (flag) {
                self._toggleResumableProgress(self.progressInfoTemplate, self.msgUploadBegin);
            }
            setTimeout(function () {
                rm.upload();
            }, self.processDelay);
            return self.$element;
        },
        paste: function (e) {
            var self = this, ev = e.originalEvent, files = ev.clipboardData && ev.clipboardData.files || null;
            if (files) {
                self._dropFiles(e, files);
            }
            return self.$element;
        },
        pause: function () {
            var self = this, rm = self.resumableManager, xhr = self.ajaxRequests, len = xhr.length, i,
                pct = rm.getProgress(), actions = self.fileActionSettings, tm = self.taskManager,
                pool = tm.getPool(rm.id);
            if (!self.enableResumableUpload) {
                return self.$element;
            } else {
                if (pool) {
                    pool.cancel();
                }
            }
            self._raise('fileuploadpaused', [self.fileManager, rm]);
            if (len > 0) {
                for (i = 0; i < len; i += 1) {
                    self.paused = true;
                    xhr[i].abort();
                }
            }
            if (self.showPreview) {
                self._getThumbs().each(function () {
                    var $thumb = $(this), t = self._getLayoutTemplate('stats'), stats,
                        $indicator = $thumb.find('.file-upload-indicator');
                    $thumb.removeClass('file-uploading');
                    if ($indicator.attr('title') === actions.indicatorLoadingTitle) {
                        self._setThumbStatus($thumb, 'Paused');
                        stats = t.setTokens({pendingTime: self.msgPaused, uploadSpeed: ''});
                        self.paused = true;
                        self._setProgress(pct, $thumb.find('.file-thumb-progress'), pct + '%', stats);
                    }
                    if (!self._getThumbFile($thumb)) {
                        $thumb.find('.kv-file-remove').removeClass('disabled').removeAttr('disabled');
                    }
                });
            }
            self._setProgress(101, self.$progress, self.msgPaused);
            return self.$element;
        },
        cancel: function () {
            var self = this, xhr = self.ajaxRequests,
                rm = self.resumableManager, tm = self.taskManager,
                pool = rm ? tm.getPool(rm.id) : undefined, len = xhr.length, i;
            if (self.enableResumableUpload && pool) {
                pool.cancel().done(function () {
                    self._setProgressCancelled();
                });
                rm.reset();
                self._raise('fileuploadcancelled', [self.fileManager, rm]);
            } else {
                if (self.ajaxPool) {
                    self.ajaxPool.cancel();
                }
                self._raise('fileuploadcancelled', [self.fileManager]);
            }
            self._initAjax();
            if (len > 0) {
                for (i = 0; i < len; i += 1) {
                    self.cancelling = true;
                    xhr[i].abort();
                }
            }
            self._getThumbs().each(function () {
                var $thumb = $(this), $prog = $thumb.find('.file-thumb-progress');
                $thumb.removeClass('file-uploading');
                self._setProgress(0, $prog);
                $prog.hide();
                if (!self._getThumbFile($thumb)) {
                    $thumb.find('.kv-file-upload').removeClass('disabled').removeAttr('disabled');
                    $thumb.find('.kv-file-remove').removeClass('disabled').removeAttr('disabled');
                }
                self.unlock();
            });
            setTimeout(function () {
                self._setProgressCancelled();
            }, self.processDelay);
            return self.$element;
        },
        clear: function () {
            var self = this, cap;
            if (!self._raise('fileclear')) {
                return;
            }
            self.clearInput = true;
            self.$btnUpload.removeAttr('disabled');
            self._getThumbs().find('video,audio,img').each(function () {
                $h.cleanMemory($(this));
            });
            self._clearFileInput();
            self._resetUpload();
            self.clearFileStack();
            self.isDuplicateError = false;
            self.isPersistentError = false;
            self._resetErrors(true);
            if (self._hasInitialPreview()) {
                self._showFileIcon();
                self._resetPreview();
                self._initPreviewActions();
                self.$container.removeClass('file-input-new');
            } else {
                self._getThumbs().each(function () {
                    self._clearObjects($(this));
                });
                if (self.isAjaxUpload) {
                    self.previewCache.data = {};
                }
                self.$preview.html('');
                cap = (!self.overwriteInitial && self.initialCaption.length > 0) ? self.initialCaption : '';
                self.$caption.attr('title', '').val(cap);
                $h.addCss(self.$container, 'file-input-new');
                self._validateDefaultPreview();
            }
            if (self.$container.find($h.FRAMES).length === 0) {
                if (!self._initCaption()) {
                    self.$captionContainer.removeClass('icon-visible');
                }
            }
            self._hideFileIcon();
            if (self.focusCaptionOnClear) {
                self.$captionContainer.focus();
            }
            self._setFileDropZoneTitle();
            self._raise('filecleared');
            return self.$element;
        },
        reset: function () {
            var self = this;
            if (!self._raise('filereset')) {
                return;
            }
            self.lastProgress = 0;
            self._resetPreview();
            self.$container.find('.fileinput-filename').text('');
            $h.addCss(self.$container, 'file-input-new');
            if (self.getFrames().length) {
                self.$container.removeClass('file-input-new');
            }
            self.clearFileStack();
            self._setFileDropZoneTitle();
            return self.$element;
        },
        disable: function () {
            var self = this, $container = self.$container;
            self.isDisabled = true;
            self._raise('filedisabled');
            self.$element.attr('disabled', 'disabled');
            $container.addClass('is-locked');
            $h.addCss($container.find('.btn-file'), 'disabled');
            $container.find('.kv-fileinput-caption').addClass('file-caption-disabled');
            $container.find('.fileinput-remove, .fileinput-upload, .file-preview-frame button')
                .attr('disabled', true);
            self._initDragDrop();
            return self.$element;
        },
        enable: function () {
            var self = this, $container = self.$container;
            self.isDisabled = false;
            self._raise('fileenabled');
            self.$element.removeAttr('disabled');
            $container.removeClass('is-locked');
            $container.find('.kv-fileinput-caption').removeClass('file-caption-disabled');
            $container.find('.fileinput-remove, .fileinput-upload, .file-preview-frame button')
                .removeAttr('disabled');
            $container.find('.btn-file').removeClass('disabled');
            self._initDragDrop();
            return self.$element;
        },
        upload: function () {
            var self = this, fm = self.fileManager, totLen = fm.count(), i, outData, tm = self.taskManager,
                hasExtraData = !$.isEmptyObject(self._getExtraData());
            fm.bpsLog = [];
            fm.bps = 0;
            if (!self.isAjaxUpload || self.isDisabled || !self._isFileSelectionValid(totLen)) {
                return;
            }
            self.lastProgress = 0;
            self._resetUpload();
            if (totLen === 0 && !hasExtraData) {
                self._showFileError(self.msgUploadEmpty);
                return;
            }
            self.cancelling = false;
            self.uploadInitiated = true;
            self._showProgress();
            self.lock();
            if (totLen === 0 && hasExtraData) {
                self._setProgress(2);
                self._uploadExtraOnly();
                return;
            }
            if (self.enableResumableUpload) {
                return self.resume();
            }
            if (self.uploadAsync || self.enableResumableUpload) {
                outData = self._getOutData(null);
                if (!self._checkBatchPreupload(outData)) {
                    return;
                }
                self.fileBatchCompleted = false;
                self.uploadCache = [];
                $.each(self.getFileStack(), function (id) {
                    var previewId = self._getThumbId(id);
                    self.uploadCache.push({id: previewId, content: null, config: null, tags: null, append: true});
                });
                self.$preview.find('.file-preview-initial').removeClass($h.SORT_CSS);
                self._initSortable();
            }
            self._setProgress(2);
            self.hasInitData = false;
            if (self.uploadAsync) {
                i = 0;
                var pool = self.ajaxPool = tm.addPool($h.uniqId());
                $.each(self.getFileStack(), function (id) {
                    pool.addTask(id + i, function (deferrer) {
                        self._uploadSingle(i, id, true, deferrer);
                    });
                    i++;
                });

                pool.run(self.maxAjaxThreads).done(function () {
                    self._log('Async upload batch completed successfully.');
                    self._raise('filebatchuploadsuccess', [fm.stack, self._getExtraData()]);
                }).fail(function () {
                    self._log('Async upload batch completed with errors.');
                    self._raise('filebatchuploaderror', [fm.stack, self._getExtraData()]);
                });
                return;
            }
            self._uploadBatch();
            return self.$element;
        },
        destroy: function () {
            var self = this, $form = self.$form, $cont = self.$container, $el = self.$element, ns = self.namespace;
            $(document).off(ns);
            $(window).off(ns);
            if ($form && $form.length) {
                $form.off(ns);
            }
            if (self.isAjaxUpload) {
                self._clearFileInput();
            }
            self._cleanup();
            self._initPreviewCache();
            $el.insertBefore($cont).off(ns).removeData();
            $cont.off().remove();
            return $el;
        },
        refresh: function (options) {
            var self = this, $el = self.$element;
            if (typeof options !== 'object' || $h.isEmpty(options)) {
                options = self.options;
            } else {
                options = $.extend(true, {}, self.options, options);
            }
            self._init(options, true);
            self._listen();
            return $el;
        },
        zoom: function (frameId) {
            var self = this, $frame = self._getFrame(frameId);
            self._showModal($frame);
        },
        getExif: function (frameId) {
            var self = this, $frame = self._getFrame(frameId);
            return $frame && $frame.data('exif') || null;
        },
        getFrames: function (cssFilter) {
            var self = this, $frames;
            cssFilter = cssFilter || '';
            $frames = self.$preview.find($h.FRAMES + cssFilter);
            if (self.reversePreviewOrder) {
                $frames = $($frames.get().reverse());
            }
            return $frames;
        },
        getPreview: function () {
            var self = this;
            return {
                content: self.initialPreview,
                config: self.initialPreviewConfig,
                tags: self.initialPreviewThumbTags
            };
        }
    };

    $.fn.fileinput = function (option) {
        if (!$h.hasFileAPISupport() && !$h.isIE(9)) {
            return;
        }
        var args = Array.apply(null, arguments), retvals = [];
        args.shift();
        this.each(function () {
            var options = {};
            if (typeof option === 'object') {
                options = $.extend(true, {}, $.fn.fileinput.defaults, option);
            }
            var self = $(this), data = self.data('fileinput'),
                theme = options.theme || self.data('theme') || $.fn.fileinput.defaults.theme, l = {}, t = {},
                lang = options.language || self.data('language') || $.fn.fileinput.defaults.language || 'en', opt;
            if (!data) {
                if (theme) {
                    t = $.fn.fileinputThemes[theme] || {};
                }
                if (lang !== 'en' && !$h.isEmpty($.fn.fileinputLocales[lang])) {
                    l = $.fn.fileinputLocales[lang] || {};
                }
                opt = $.extend(true, {}, $.fn.fileinput.defaults, t, $.fn.fileinputLocales.en, l, options, self.data());
                data = new FileInput(this, opt);
                self.data('fileinput', data);
            }

            if (typeof option === 'string') {
                retvals.push(data[option].apply(data, args));
            }
        });
        switch (retvals.length) {
            case 0:
                return this;
            case 1:
                return retvals[0];
            default:
                return retvals;
        }
    };

    var IFRAME_ATTRIBS = 'class="kv-preview-data file-preview-pdf" src="{renderer}?file={data}" {style}',
        defBtnCss1 = 'btn btn-sm btn-kv ' + $h.defaultButtonCss(), defBtnCss2 = 'btn ' + $h.defaultButtonCss();

    $.fn.fileinput.defaults = {
        language: 'en',
        bytesToKB: 1024,
        showCaption: true,
        showBrowse: true,
        showPreview: true,
        showRemove: true,
        showUpload: true,
        showUploadStats: true,
        showCancel: null,
        showPause: null,
        showClose: true,
        showUploadedThumbs: true,
        showConsoleLogs: false,
        browseOnZoneClick: false,
        autoReplace: false,
        showDescriptionClose: true,
        autoOrientImage: function () { // applicable for JPEG images only and non ios safari
            var ua = window.navigator.userAgent, webkit = !!ua.match(/WebKit/i),
                iOS = !!ua.match(/iP(od|ad|hone)/i), iOSSafari = iOS && webkit && !ua.match(/CriOS/i);
            return !iOSSafari;
        },
        autoOrientImageInitial: true,
        showExifErrorLog: false,
        required: false,
        rtl: false,
        hideThumbnailContent: false,
        encodeUrl: true,
        focusCaptionOnBrowse: true,
        focusCaptionOnClear: true,
        generateFileId: null,
        previewClass: '',
        captionClass: '',
        frameClass: 'krajee-default',
        mainClass: '',
        inputGroupClass: '',
        mainTemplate: null,
        fileSizeGetter: null,
        initialCaption: '',
        initialPreview: [],
        initialPreviewDelimiter: '*$$*',
        initialPreviewAsData: false,
        initialPreviewFileType: 'image',
        initialPreviewConfig: [],
        initialPreviewThumbTags: [],
        previewThumbTags: {},
        initialPreviewShowDelete: true,
        initialPreviewDownloadUrl: '',
        removeFromPreviewOnError: false,
        deleteUrl: '',
        deleteExtraData: {},
        overwriteInitial: true,
        sanitizeZoomCache: function (content) {
            var $container = $h.createElement(content);
            $container.find('input,textarea,select,datalist,form,.file-thumbnail-footer').remove();
            return $container.html();
        },
        previewZoomButtonIcons: {
            prev: '<i class="bi-chevron-left"></i>',
            next: '<i class="bi-chevron-right"></i>',
            rotate: '<i class="bi-arrow-clockwise"></i>',
            toggleheader: '<i class="bi-arrows-expand"></i>',
            fullscreen: '<i class="bi-arrows-fullscreen"></i>',
            borderless: '<i class="bi-arrows-angle-expand"></i>',
            close: '<i class="bi-x-lg"></i>'
        },
        previewZoomButtonClasses: {
            prev: 'btn btn-default btn-outline-secondary btn-navigate',
            next: 'btn btn-default btn-outline-secondary btn-navigate',
            rotate: defBtnCss1,
            toggleheader: defBtnCss1,
            fullscreen: defBtnCss1,
            borderless: defBtnCss1,
            close: defBtnCss1
        },
        previewTemplates: {},
        previewContentTemplates: {},
        preferIconicPreview: false,
        preferIconicZoomPreview: false,
        alwaysPreviewFileExtensions: [],
        rotatableFileExtensions: ['jpg', 'jpeg', 'png', 'gif'],
        allowedFileTypes: null,
        allowedFileExtensions: null,
        allowedPreviewTypes: undefined,
        allowedPreviewMimeTypes: null,
        allowedPreviewExtensions: null,
        disabledPreviewTypes: undefined,
        disabledPreviewExtensions: ['msi', 'exe', 'com', 'zip', 'rar', 'app', 'vb', 'scr'],
        disabledPreviewMimeTypes: null,
        defaultPreviewContent: null,
        customLayoutTags: {},
        customPreviewTags: {},
        previewFileIcon: '<i class="bi-file-earmark-fill"></i>',
        previewFileIconClass: 'file-other-icon',
        previewFileIconSettings: {},
        previewFileExtSettings: {},
        buttonLabelClass: 'hidden-xs',
        browseIcon: '<i class="bi-folder2-open"></i> ',
        browseClass: 'btn btn-primary',
        removeIcon: '<i class="bi-trash"></i>',
        removeClass: defBtnCss2,
        cancelIcon: '<i class="bi-slash-circle"></i>',
        cancelClass: defBtnCss2,
        pauseIcon: '<i class="bi-pause-fill"></i>',
        pauseClass: defBtnCss2,
        uploadIcon: '<i class="bi-upload"></i>',
        uploadClass: defBtnCss2,
        uploadUrl: null,
        uploadUrlThumb: null,
        uploadAsync: true,
        uploadParamNames: {
            chunkCount: 'chunkCount',
            chunkIndex: 'chunkIndex',
            chunkSize: 'chunkSize',
            chunkSizeStart: 'chunkSizeStart',
            chunksUploaded: 'chunksUploaded',
            fileBlob: 'fileBlob',
            fileId: 'fileId',
            fileName: 'fileName',
            fileRelativePath: 'fileRelativePath',
            fileSize: 'fileSize',
            retryCount: 'retryCount'
        },
        maxAjaxThreads: 5,
        fadeDelay: 800,
        processDelay: 100,
        bitrateUpdateDelay: 500,
        queueDelay: 10, // must be lesser than process delay
        progressDelay: 0, // must be lesser than process delay
        enableResumableUpload: false,
        resumableUploadOptions: {
            fallback: null,
            testUrl: null, // used for checking status of chunks/ files previously / partially uploaded
            chunkSize: 2048, // in KB
            maxThreads: 4,
            maxRetries: 3,
            showErrorLog: true,
            retainErrorHistory: false, // when set to true, display complete error history always unless user explicitly resets upload
            skipErrorsAndProceed: false // when set to true, files with errors will be skipped and upload will continue with other files
        },
        uploadExtraData: {},
        zoomModalHeight: 485, // 5px more than the default preview content heights set for text, html, pdf etc.
        minImageWidth: null,
        minImageHeight: null,
        maxImageWidth: null,
        maxImageHeight: null,
        resizeImage: false,
        resizePreference: 'width',
        resizeQuality: 0.92,
        resizeDefaultImageType: 'image/jpeg',
        resizeIfSizeMoreThan: 0, // in KB
        minFileSize: -1,
        maxFileSize: 0,
        maxFilePreviewSize: 25600, // 25 MB
        minFileCount: 0,
        maxFileCount: 0,
        maxTotalFileCount: 0,
        validateInitialCount: false,
        msgValidationErrorClass: 'text-danger',
        msgValidationErrorIcon: '<i class="bi-exclamation-circle-fill"></i> ',
        msgErrorClass: 'file-error-message',
        progressThumbClass: 'progress-bar progress-bar-striped active progress-bar-animated',
        progressClass: 'progress-bar bg-success progress-bar-success progress-bar-striped active progress-bar-animated',
        progressInfoClass: 'progress-bar bg-info progress-bar-info progress-bar-striped active progress-bar-animated',
        progressCompleteClass: 'progress-bar bg-success progress-bar-success',
        progressPauseClass: 'progress-bar bg-primary progress-bar-primary progress-bar-striped active progress-bar-animated',
        progressErrorClass: 'progress-bar bg-danger progress-bar-danger',
        progressUploadThreshold: 99,
        previewFileType: 'image',
        elCaptionContainer: null,
        elCaptionText: null,
        elPreviewContainer: null,
        elPreviewImage: null,
        elPreviewStatus: null,
        elErrorContainer: null,
        errorCloseButton: undefined,
        slugCallback: null,
        dropZoneEnabled: true,
        dropZoneTitleClass: 'file-drop-zone-title',
        fileActionSettings: {},
        otherActionButtons: '',
        textEncoding: 'UTF-8',
        preProcessUpload: null,
        ajaxSettings: {},
        ajaxDeleteSettings: {},
        showAjaxErrorDetails: true,
        mergeAjaxCallbacks: false,
        mergeAjaxDeleteCallbacks: false,
        retryErrorUploads: true,
        reversePreviewOrder: false,
        usePdfRenderer: function () {
            var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
            return !!navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/i) || isIE11;
        },
        pdfRendererUrl: '',
        pdfRendererTemplate: '<iframe ' + IFRAME_ATTRIBS + '></iframe>',
        tabIndexConfig: {
            browse: 500,
            remove: 500,
            upload: 500,
            cancel: null,
            pause: null,
            modal: -1
        }
    };

    // noinspection HtmlUnknownAttribute
    $.fn.fileinputLocales.en = {
        sizeUnits: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        bitRateUnits: ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s', 'PB/s', 'EB/s', 'ZB/s', 'YB/s'],
        fileSingle: 'file',
        filePlural: 'files',
        browseLabel: 'Browse &hellip;',
        removeLabel: 'Remove',
        removeTitle: 'Clear all unprocessed files',
        cancelLabel: 'Cancel',
        cancelTitle: 'Abort ongoing upload',
        pauseLabel: 'Pause',
        pauseTitle: 'Pause ongoing upload',
        uploadLabel: 'Upload',
        uploadTitle: 'Upload selected files',
        msgNo: 'No',
        msgNoFilesSelected: 'No files selected',
        msgCancelled: 'Cancelled',
        msgPaused: 'Paused',
        msgPlaceholder: 'Select {files} ...',
        msgZoomModalHeading: 'Detailed Preview',
        msgFileRequired: 'You must select a file to upload.',
        msgSizeTooSmall: 'File "{name}" (<b>{size}</b>) is too small and must be larger than <b>{minSize}</b>.',
        msgSizeTooLarge: 'File "{name}" (<b>{size}</b>) exceeds maximum allowed upload size of <b>{maxSize}</b>.',
        msgFilesTooLess: 'You must select at least <b>{n}</b> {files} to upload.',
        msgFilesTooMany: 'Number of files selected for upload <b>({n})</b> exceeds maximum allowed limit of <b>{m}</b>.',
        msgTotalFilesTooMany: 'You can upload a maximum of <b>{m}</b> files (<b>{n}</b> files detected).',
        msgFileNotFound: 'File "{name}" not found!',
        msgFileSecured: 'Security restrictions prevent reading the file "{name}".',
        msgFileNotReadable: 'File "{name}" is not readable.',
        msgFilePreviewAborted: 'File preview aborted for "{name}".',
        msgFilePreviewError: 'An error occurred while reading the file "{name}".',
        msgInvalidFileName: 'Invalid or unsupported characters in file name "{name}".',
        msgInvalidFileType: 'Invalid type for file "{name}". Only "{types}" files are supported.',
        msgInvalidFileExtension: 'Invalid extension for file "{name}". Only "{extensions}" files are supported.',
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
        msgUploadAborted: 'The file upload was aborted',
        msgUploadThreshold: 'Processing &hellip;',
        msgUploadBegin: 'Initializing &hellip;',
        msgUploadEnd: 'Done',
        msgUploadResume: 'Resuming upload &hellip;',
        msgUploadEmpty: 'No valid data available for upload.',
        msgUploadError: 'Upload Error',
        msgDeleteError: 'Delete Error',
        msgProgressError: 'Error',
        msgValidationError: 'Validation Error',
        msgLoading: 'Loading file {index} of {files} &hellip;',
        msgProgress: 'Loading file {index} of {files} - {name} - {percent}% completed.',
        msgSelected: '{n} {files} selected',
        msgProcessing: 'Processing ...',
        msgFoldersNotAllowed: 'Drag & drop files only! {n} folder(s) dropped were skipped.',
        msgImageWidthSmall: 'Width of image file "{name}" must be at least <b>{size} px</b> (detected <b>{dimension} px</b>).',
        msgImageHeightSmall: 'Height of image file "{name}" must be at least <b>{size} px</b> (detected <b>{dimension} px</b>).',
        msgImageWidthLarge: 'Width of image file "{name}" cannot exceed <b>{size} px</b> (detected <b>{dimension} px</b>).',
        msgImageHeightLarge: 'Height of image file "{name}" cannot exceed <b>{size} px</b> (detected <b>{dimension} px</b>).',
        msgImageResizeError: 'Could not get the image dimensions to resize.',
        msgImageResizeException: 'Error while resizing the image.<pre>{errors}</pre>',
        msgAjaxError: 'Something went wrong with the {operation} operation. Please try again later!',
        msgAjaxProgressError: '{operation} failed',
        msgDuplicateFile: 'File "{name}" of same size "{size}" has already been selected earlier. Skipping duplicate selection.',
        msgResumableUploadRetriesExceeded: 'Upload aborted beyond <b>{max}</b> retries for file <b>{file}</b>! Error Details: <pre>{error}</pre>',
        msgPendingTime: '{time} remaining',
        msgCalculatingTime: 'calculating time remaining',
        ajaxOperations: {
            deleteThumb: 'file delete',
            uploadThumb: 'file upload',
            uploadBatch: 'batch file upload',
            uploadExtra: 'form data upload'
        },
        dropZoneTitle: 'Drag & drop files here &hellip;',
        dropZoneClickTitle: '<br>(or click to select {files})',
        previewZoomButtonTitles: {
            prev: 'View previous file',
            next: 'View next file',
            rotate: 'Rotate 90 deg. clockwise',
            toggleheader: 'Toggle header',
            fullscreen: 'Toggle full screen',
            borderless: 'Toggle borderless mode',
            close: 'Close detailed preview'
        }
    };

    $.fn.fileinput.Constructor = FileInput;

    /**
     * Convert automatically file inputs with class 'file' into a bootstrap fileinput control.
     */
    $(document).ready(function () {
        var $input = $('input.file[type=file]');
        if ($input.length) {
            $input.fileinput();
        }
    });
}));
