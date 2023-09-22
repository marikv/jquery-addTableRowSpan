                (function ($, window, document, undefined) {
                    "use strict";
                    var addTableRowSpan = "addTableRowSpan", defaults = {
                        vertical_align: "top",
                        columns: [],
                        emptyCellsPairWithUppers: false,
                        emptyCellsPairWithLowers: false,
                        firstRow: 0,
                        cellTypes: ["th", "td"]
                    };

                    function f(element, options) {
                        this.element = element;
                        this.settings = $.extend({}, defaults, options);
                        this._defaults = defaults;
                        this._name = addTableRowSpan;
                        this.init()
                    }

                    $.extend(f.prototype, {
                        init: function () {
                            var _this = this;
                            var $table = $(this.element);
                            var arr = [];
                            let f = function (el) {
                                $table.find('tr').each(function (r, tr, ii) {
                                    if (r >= _this.settings.firstRow) {
                                        $(this).find(el).each(function (d, el) {
                                            if (_this.settings.columns.length === 0 || _this.settings.columns.indexOf(d) !== -1) {
                                                var $el = $(el);
                                                var v_dato = $el.html().trim();
                                                if (typeof arr[d] != 'undefined' && 'dato' in arr[d] && (
                                                    (
                                                        arr[d].dato == v_dato
                                                        || (_this.settings.emptyCellsPairWithUppers && v_dato == '')
                                                    )
                                                )) {
                                                    var rs = arr[d].elem.data('rowspan');
                                                    if (rs == 'undefined' || isNaN(rs)) rs = 1;
                                                    arr[d].elem.data('rowspan', parseInt(rs) + 1).addClass('rowspan-combine');
                                                    $el.addClass('rowspan-remove');
                                                } else {
                                                    arr[d] = {dato: v_dato, elem: $el};
                                                }
                                            }
                                        });
                                    }
                                });
                                $('.rowspan-combine').each(function (r, tr) {
                                    var $this = $(this);
                                    $this.attr('rowspan', $this.data('rowspan')).css({'vertical-align': _this.settings.vertical_align})
                                });
                                $('.rowspan-remove').remove()
                            };

                            if (_this.settings.emptyCellsPairWithLowers) {
                                for(var ii = 0; ii < _this.settings.cellTypes.length; ii++) {
                                    var el = _this.settings.cellTypes[ii];
                                    var arr = {};
                                    $table.find('tr').each(function (r, tr, ii) {
                                        if (r >= _this.settings.firstRow) {
                                            arr[r] = [];
                                            $(this).find(el).each(function (d, el) {
                                                var $el = $(el);
                                                arr[r].push($el.html().trim());
                                            });
                                        }
                                    });
                                    $table.find('tr').each(function (r, tr, ii) {
                                        if (r >= _this.settings.firstRow) {
                                            $(this).find(el).each(function (d, el) {
                                                var $el = $(el);
                                                var value = $el.html().trim();
                                                if (value == ''
                                                    && typeof arr[r + 1] !== "undefined"
                                                    && typeof arr[r + 1][d] !== "undefined"
                                                    && typeof arr[r + 1][d] != ''
                                                ) {
                                                    $el.html(arr[r + 1][d]);
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                            for(var i = 0; i < _this.settings.cellTypes.length; i++) {
                                f(_this.settings.cellTypes[i]);
                            }
                        }
                    });
                    $.fn[addTableRowSpan] = function (options) {
                        return this.each(function () {
                            if (!$.data(this, "plugin_" + addTableRowSpan)) {
                                $.data(this, "plugin_" + addTableRowSpan, new f(this, options))
                            }
                        })
                    }
                })(jQuery, window, document);
