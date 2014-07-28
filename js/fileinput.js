/*!
 * @copyright Copyright &copy; Kartik Visweswaran, Krajee.com, 2014
 * @version 1.9.0
 *
 * File input styled for Bootstrap 3.0 that utilizes HTML5 File Input's advanced 
 * features including the FileReader API. This plugin is inspired by the blog article at
 * http://www.abeautifulsite.net/blog/2013/08/whipping-file-inputs-into-shape-with-bootstrap-3/
 * and Jasny's File Input plugin http://jasny.github.io/bootstrap/javascript/#fileinput
 * 
 * The plugin drastically enhances the file input to preview multiple files on the client before
 * upload. In addition it provides the ability to preview content of images and text files. 
 * 
 * Author: Kartik Visweswaran
 * Copyright: 2013, Kartik Visweswaran, Krajee.com
 * For more JQuery plugins visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */
(function ($) {
    var MAIN_TEMPLATE_1 = '{preview}\n' +
        '<div class="input-group {class}">\n' +
        '   {caption}\n' +
        '   <div class="input-group-btn">\n' +
        '       {remove}\n' +
        '       {upload}\n' +
        '       {browse}\n' +
        '   </div>\n' +
        '</div>';

    var MAIN_TEMPLATE_2 = '{preview}\n{remove}\n{upload}\n{browse}\n';

    var PREVIEW_TEMPLATE = '<div class="file-preview {class}">\n' +
        '   <div class="file-preview-status text-center text-success"></div>\n' +
        '   <div class="close fileinput-remove text-right">&times;</div>\n' +
        '   <div class="file-preview-thumbnails"></div>\n' +
        '   <div class="clearfix"></div>' +
        '</div>';

    var CAPTION_TEMPLATE = '<div class="form-control file-caption {class}">\n' +
        '   <span class="glyphicon glyphicon-file kv-caption-icon"></span><div class="file-caption-name"></div>\n' +
        '</div>';

    var MODAL_TEMPLATE = '<div id="{id}" class="modal fade">\n' +
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
        '</div>\n';

    var PICTURE_TEMPLATE = '<div class="file-preview-frame" id="{id_content}">\n' +
        '   {content}\n' +
        '</div>\n';

    var TEXT_TEMPLATE = '<div class="file-preview-frame" id="{id_content}">\n' +
        '   <div class="file-preview-text" title="{caption}">\n' +
        '       {strText}\n' +
        '   </div>\n'+
        '</div>\n';

    var OTHER_TEMPLATE = '<div class="file-preview-frame" id="{id_content}">\n' +
        '   <div class="file-preview-other">\n' +
        '       <h2><i class="glyphicon glyphicon-file"></i></h2>\n' +
    '           {caption}\n' +
        '   </div>\n'+
        '</div>';

    var isEmpty = function (value, trim) {
        return value === null || value === undefined || value == []
            || value === '' || trim && $.trim(value) === '';
    };
    var isArray = Array.isArray || function (a) {
        return Object.prototype.toString.call(a) === '[object Array]';
    };
    var getValue = function (options, param, value) {
        return (isEmpty(options) || isEmpty(options[param])) ? value : options[param];
    };
    var getElement = function (options, param, value) {
        return (isEmpty(options) || isEmpty(options[param])) ? value : $(options[param]);
    };
    var isImageFile = function (type, name) {
        return (typeof type !== "undefined") ? type.match('image.*') : name.match(/\.(gif|png|jpe?g)$/i);
    };
    var isTextFile = function (type, name) {
        return (typeof type !== "undefined") ? type.match('text.*') : name.match(/\.(txt|md|csv|htm|html|php|ini)$/i);
    };
    var uniqId = function () {
        return Math.round(new Date().getTime() + (Math.random() * 100));
    };
    var FileInput = function (element, options) {
        this.$element = $(element);
        this.init(options);
        this.listen();
    };

    FileInput.prototype = {
        constructor: FileInput,
        init: function (options) {
            var self = this;
            self.showCaption = options.showCaption;
            self.showPreview = options.showPreview;
            self.initialDelimiter = options.initialDelimiter;
            self.initialPreview = options.initialPreview;
            self.initialCaption = options.initialCaption;
            self.overwriteInitial = options.overwriteInitial;
            self.showRemove = options.showRemove;
            self.showUpload = options.showUpload;
            self.captionClass = options.captionClass;
            self.previewClass = options.previewClass;
            self.mainClass = options.mainClass;
            if (isEmpty(options.mainTemplate)) {
                self.mainTemplate = self.showCaption ? MAIN_TEMPLATE_1 : MAIN_TEMPLATE_2;
            }
            else {
                self.mainTemplate = options.mainTemplate;
            }
            self.previewTemplate = (self.showPreview) ? options.previewTemplate : '';
            self.previewGenericTemplate = options.previewGenericTemplate;
            self.previewPictureTemplate = options.previewPictureTemplate;
            self.previewTextTemplate = options.previewTextTemplate;
            self.previewOtherTemplate = options.previewOtherTemplate;
            self.captionTemplate = options.captionTemplate;
            self.browseLabel = options.browseLabel;
            self.browseIcon = options.browseIcon;
            self.browseClass = options.browseClass;
            self.removeLabel = options.removeLabel;
            self.removeIcon = options.removeIcon;
            self.removeClass = options.removeClass;
            self.uploadLabel = options.uploadLabel;
            self.uploadIcon = options.uploadIcon;
            self.uploadClass = options.uploadClass;
            self.uploadUrl = options.uploadUrl;
            self.msgLoading = options.msgLoading;
            self.msgProgress = options.msgProgress;
            self.msgSelected = options.msgSelected;
            self.previewFileType = options.previewFileType;
            self.wrapTextLength = options.wrapTextLength;
            self.wrapIndicator = options.wrapIndicator;
            self.isDisabled = self.$element.attr('disabled') || self.$element.attr('readonly');
            if (isEmpty(self.$element.attr('id'))) {
                self.$element.attr('id', uniqId());
            }
            if (typeof self.$container == 'undefined') {
                self.$container = self.createContainer();
            }
            else {
                self.refreshContainer();
            }
            /* Initialize plugin option parameters */
            self.$captionContainer = getElement(options, 'elCaptionContainer', self.$container.find('.file-caption'));
            self.$caption = getElement(options, 'elCaptionText', self.$container.find('.file-caption-name'));
            self.$previewContainer = getElement(options, 'elPreviewContainer', self.$container.find('.file-preview'));
            self.$preview = getElement(options, 'elPreviewImage', self.$container.find('.file-preview-thumbnails'));
            self.$previewStatus = getElement(options, 'elPreviewStatus', self.$container.find('.file-preview-status'));
            self.initPreview();
            self.original = {
                preview: self.$preview.html(),
                caption: self.$caption.html()
            };
            this.options = options;
            self.$element.removeClass('file-loading');
        },
        listen: function () {
            var self = this;
            self.$element.on('change', $.proxy(self.change, self));
            $(self.$element[0].form).on('reset', $.proxy(self.reset, self));
            self.$container.on('click', '.fileinput-remove:not([disabled])', $.proxy(self.clear, self));
        },
        refresh: function (options) {
            var self = this, params = (arguments.length) ? $.extend(self.options, options) : self.options;
            self.init(params);
        },
        initPreview: function () {
            var self = this, html = '',
                content = self.initialPreview,
                len = (isArray(content))?content.length:(content.length>0)?content.split(self.initialDelimiter).length:0,
                cap = self.initialCaption.length,
                caption = (cap > 0) ? self.initialCaption : self.msgSelected.replace("{n}",len);
            if (isArray(content) && len > 0) {
                for (var i = 0; i < len; i++) {
                    var id_content = "preview_"+uniqId();
                    html += self.previewGenericTemplate.replace("{id_content}", id_content).replace("{content}", content[i]);
                }
                if (len > 1 && cap == 0) {
                    caption = self.msgSelected.replace("{n}",len);
                }
            }
            else if (len > 0) {
                var fileList=content.split(self.initialDelimiter);
                for(var i = 0; i < len; i++){
                    var id_content = "preview_"+uniqId();
                    html += self.previewGenericTemplate.replace("{id_content}", id_content).replace("{content}", fileList[i]);
                }
                if (len > 1 && cap == 0) {
                    caption = self.msgSelected.replace("{n}",len);
                }
            }
            else if (cap > 0) {
                self.$caption.html(caption);
                self.$captionContainer.attr('title', caption);
                self.$captionContainer.find('.kv-caption-icon').show();
                return;
            }
            else {
                return;
            }
            self.initialNbPreview = len;
            self.initialPreviewContent = html;
            self.$preview.html(html);
            self.$caption.html(caption);
            self.$captionContainer.attr('title', caption);
            self.$container.removeClass('file-input-new');
        },
        clear: function (e) {
            var self = this;
            if (e) {
                e.preventDefault();
            }
            self.$element.val('');
            if (e !== false) {
                self.$element.trigger('change');
                self.$element.trigger('fileclear');
            }
            if (!self.overwriteInitial && !isEmpty(self.initialPreviewContent)) {
                self.$preview.html(self.original.preview);
                self.$caption.html(self.original.caption);
                self.$container.removeClass('file-input-new');
            }
            else {
                self.$preview.html('');
                var cap = (!self.overwriteInitial && self.initialCaption.length > 0) ? 
                    self.original.caption : '';
                self.$caption.html(cap);
                self.$captionContainer.attr('title', '');
                self.$container.removeClass('file-input-new').addClass('file-input-new');
            }
            if (self.overwriteInitial) {
                self.$captionContainer.find('.kv-caption-icon').hide();
            }
            self.$element.trigger('filecleared');
        },
        reset: function (e) {
            var self = this;
            self.clear(false);
            self.$preview.html(self.original.preview);
            self.$caption.html(self.original.caption);
            self.$container.find('.fileinput-filename').text('');
            self.$element.trigger('filereset');
            if (self.initialPreview.length > 0) {
                self.$container.removeClass('file-input-new');
            }
        },
        disable: function (e) {
            var self = this;
            self.isDisabled=true;
            self.$container.find(".js_fileinput_caption").addClass("file-caption-disabled");
            self.$container.find(".btn-file, .fileinput-remove, .js_fileinput_upload, input[type=file]").attr("disabled",true);
        },
        enable: function (e) {
            var self = this;
            self.isDisabled=false;
            self.$container.find(".js_fileinput_caption").removeClass("file-caption-disabled");
            self.$container.find(".btn-file, .fileinput-remove, .js_fileinput_upload, input[type=file]").removeAttr("disabled");
        },
        change: function (e) {
            var self = this;
            var elem = self.$element, files = elem.get(0).files, numFiles = files ? (files.length+self.initialNbPreview) : 1,
                label = elem.val().replace(/\\/g, '/').replace(/.*\//, ''), $preview = self.$preview,
                $container = self.$previewContainer, $status = self.$previewStatus, msgLoading = self.msgLoading,
                msgProgress = self.msgProgress, msgSelected = self.msgSelected, tfiles,
                fileType = self.previewFileType, wrapLen = parseInt(self.wrapTextLength),
                wrapInd = self.wrapIndicator;

            if (e.target.files === undefined) {
                tfiles = e.target && e.target.value ? [
                    {name: e.target.value.replace(/^.+\\/, '')}
                ] : [];
            }
            else {
                tfiles = e.target.files;
            }
            if (tfiles.length === 0) {
                return;
            }
            $preview.html('');
            if (!self.overwriteInitial) {
                $preview.html(self.initialPreviewContent);
            }
            var total = tfiles.length;
            for (var i = 0; i < total; i++) {
                (function (file) {
                    var id_content = "preview_"+uniqId();
                    var caption = file.name;
                    var isImg = isImageFile(file.type, file.name);
                    var isTxt = isTextFile(file.type, file.name);
                    if ($preview.length > 0 && (fileType == "any" ? (isImg || isTxt) : (fileType == "text" ? isTxt : isImg)) && typeof FileReader !== "undefined") {
                        var reader = new FileReader();
                        $status.html(msgLoading);
                        $container.addClass('loading');
                        reader.onload = function (theFile) {
                            var content = '', modal = '';
                            if (isTxt) {
                                var strText = theFile.target.result;
                                if (strText.length > wrapLen) {
                                    var id = uniqId(), height = window.innerHeight * .75,
                                        modal = MODAL_TEMPLATE.replace("{id}", id).replace("{title}", caption).replace("{body}", strText).replace("{height}", height);
                                    wrapInd = wrapInd.replace("{title}", caption).replace("{dialog}", "$('#" + id + "').modal('show')");
                                    strText = strText.substring(0, (wrapLen - 1)) + wrapInd;
                                }
                                content = self.previewTextTemplate.replace("{id_content}", id_content).replace("{caption}", caption).replace("{strText}", strText) + modal;
                            }
                            else {
                                content = self.previewPictureTemplate.replace("{id_content}", id_content).replace("{content}", '<img src="' + theFile.target.result + '" class="file-preview-image" title="' + caption + '" alt="' + caption + '">');
                            }
                            $preview.append("\n" + content);

                            //here we check if the picture is not too wide. If it's the case we scale the picture on the width and not on the height anymore.
                            var containerWidth=$preview.width(),
                                image=$preview.find("#"+id_content+" img"),
                                imageWidth=image.width();
                            if(imageWidth > containerWidth){
                                image.width("100%");
                                image.height("auto");
                            }

                            if (i >= total - 1) {
                                $container.removeClass('loading');
                                $status.html('');
                            }
                            elem.trigger('filepreviewloaded', [file, id_content]);
                        };
                        reader.onprogress = function (data) {
                            if (data.lengthComputable) {
                                var progress = parseInt(((data.loaded / data.total) * 100), 10);
                                var msg = msgProgress.replace('{percent}', progress).replace('{file}', file.name);
                                $status.html(msg);
                            }
                        };
                        if (isTxt) {
                            reader.readAsText(file);
                        }
                        else {
                            reader.readAsDataURL(file);
                        }
                    }
                    else {
                        $preview.append("\n" + self.previewOtherTemplate.replace("{id_content}", id_content).replace("{caption}", caption));
                        elem.trigger('filepreviewloaded', [file, id_content]);
                    }
                })(tfiles[i]);
            }

            var log = numFiles > 1 ? msgSelected.replace('{n}', numFiles) : label;
            self.$caption.html(log);
            self.$captionContainer.attr('title', log);
            self.$container.removeClass('file-input-new');
            elem.trigger('fileselect', [numFiles, label]);
        },
        createContainer: function () {
            var self = this;
            var container = $(document.createElement("div")).attr({"class": 'file-input file-input-new'}).html(self.renderMain());
            self.$element.before(container);
            container.find('.btn-file').append(self.$element);
            return container;
        },
        refreshContainer: function () {
            var self = this;
            self.$container.before(self.$element);
            self.$container.html(self.renderMain());
            self.$container.find('.btn-file').append(self.$element);
        },
        renderMain: function () {
            var self = this;
            var preview = self.previewTemplate.replace('{class}', self.previewClass);
            var css = self.isDisabled ? self.captionClass + ' file-caption-disabled' : self.captionClass;
            var caption = self.captionTemplate.replace('{class}', css + ' js_fileinput_caption');
            return self.mainTemplate.replace('{class}', self.mainClass).
                replace('{preview}', preview).
                replace('{caption}', caption).
                replace('{upload}', self.renderUpload()).
                replace('{remove}', self.renderRemove()).
                replace('{browse}', self.renderBrowse());
        },
        renderBrowse: function () {
            var self = this, css = self.browseClass + ' btn-file', status = '';
            if (self.isDisabled) {
                status = ' disabled ';
            }
            return '<div class="' + css + '"' + status + '> ' + self.browseIcon + self.browseLabel + ' </div>';
        },
        renderRemove: function () {
            var self = this, css = self.removeClass + ' fileinput-remove fileinput-remove-button', status = '';
            if (!self.showRemove) {
                return '';
            }
            if (self.isDisabled) {
                status = ' disabled ';
            }
            return '<button type="button" class="' + css + '"' + status + '>' + self.removeIcon + self.removeLabel + '</button>';
        },
        renderUpload: function () {
            var self = this, css = self.uploadClass + ' js_fileinput_upload', content = '', status = '';
            if (!self.showUpload) {
                return '';
            }
            if (self.isDisabled) {
                status = ' disabled ';
            }
            if (isEmpty(self.uploadUrl)) {
                content = '<button type="submit" class="' + css + '"' + status + '>' + self.uploadIcon + self.uploadLabel + '</button>';
            }
            else {
                content = '<a href="' + self.uploadUrl + '" class="' + self.uploadClass + '"' + status + '>' + self.uploadIcon + self.uploadLabel + '</a>';
            }
            return content;
        }
    }

    $.fn.fileinput = function (options) {
        return this.each(function () {
            var $this = $(this), data = $this.data('fileinput')
            if (!data) {
                $this.data('fileinput', (data = new FileInput(this, options)))
            }
            if (typeof options == 'string') {
                data[options]()
            }
        })
    };

    //FileInput plugin definition
    $.fn.fileinput = function (option) {
        var args = Array.apply(null, arguments);
        args.shift();
        return this.each(function () {
            var $this = $(this),
                data = $this.data('fileinput'),
                options = typeof option === 'object' && option;

            if (!data) {
                $this.data('fileinput', (data = new FileInput(this, $.extend({}, $.fn.fileinput.defaults, options, $(this).data()))));
            }

            if (typeof option === 'string') {
                data[option].apply(data, args);
            }
        });
    };

    $.fn.fileinput.defaults = {
        showCaption: true,
        showPreview: true,
        showRemove: true,
        showUpload: true,
        captionClass: '',
        previewClass: '',
        mainClass: '',
        mainTemplate: null,
        initialDelimiter: '*$$*',
        initialPreview: '',
        initialCaption: '',
        initialNbPreview: 0,
        initialPreviewContent: '',
        overwriteInitial: true,
        previewTemplate: PREVIEW_TEMPLATE,
        previewGenericTemplate:PICTURE_TEMPLATE,
        previewPictureTemplate:PICTURE_TEMPLATE,
        previewTextTemplate:TEXT_TEMPLATE,
        previewOtherTemplate:OTHER_TEMPLATE,
        captionTemplate: CAPTION_TEMPLATE,
        browseLabel: 'Browse &hellip;',
        browseIcon: '<i class="glyphicon glyphicon-folder-open"></i> &nbsp;',
        browseClass: 'btn btn-primary',
        removeLabel: 'Remove',
        removeIcon: '<i class="glyphicon glyphicon-ban-circle"></i> ',
        removeClass: 'btn btn-default',
        uploadLabel: 'Upload',
        uploadIcon: '<i class="glyphicon glyphicon-upload"></i> ',
        uploadClass: 'btn btn-default',
        uploadUrl: null,
        msgLoading: 'Loading &hellip;',
        msgProgress: 'Loaded {percent}% of {file}',
        msgSelected: '{n} files selected',
        previewFileType: 'image',
        wrapTextLength: 250,
        wrapIndicator: ' <span class="wrap-indicator" title="{title}" onclick="{dialog}">[&hellip;]</span>',
        elCaptionContainer: null,
        elCaptionText: null,
        elPreviewContainer: null,
        elPreviewImage: null,
        elPreviewStatus: null
    };
    
    /**
     * Convert automatically file inputs with class 'file'
     * into a bootstrap fileinput control.
     */
    $(document).ready(function () {
        var $input = $('input.file[type=file]'), count = Object.keys($input).length;
        if (count > 0) {
            $input.fileinput();
        }
    });

})(window.jQuery);
