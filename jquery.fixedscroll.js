/**
 * jquery.fixedscroll.js
 * Copyright (c) 2010 Hansson & Larsson Internet AB (http://hanssonlarsson.se/)
 * Licensed under the MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * @author Linus G Thiel
 *
 * @projectDescription  jQuery plugin for making elements stick to the top of the viewport as the page is scrolled
 *
 * @version 0.2.0
 *
 * @requires jquery.js (tested with 1.3.2, 1.4.2)
 *
 * @param view          element - element from which to calculate offset
 *                                      default: window
 * @param events        string - events to bind
 *                                      default: "scroll resize"
 * @className           string - the CSS class that specifies the element as being fixed
 *                                      default: "fixed"
 * @container           object - container of scrolling element
 *                                      default: the elements parent
 *
 * Usage:
 * $(selector).fixedscroll(options);
 *
 * */
(function($) {
    $.fixedscroll = $.fixedscroll || {
        version: "0.2.0",
        defaults: {
            view: window,
            events: "scroll resize",
            className: "fixed",
            container: null,
        }
    };
    $.fn.fixedscroll = $.fn.fixedscroll || function(options) {
        // Merge defaults and options
        var config = $.extend({}, $.fixedscroll.defaults, options);
        var view = $(config.view);
        var className = config.className;
        var events = config.events;
        return this.each(function() {
            var $this = $(this);
            var container = config.container || $this.parent();
            view.bind(
                events,
                function() {
                    // Offset from top calculated from container
                    elementTop = container.offset().top;
                    viewTop = view.scrollTop();
                    if(viewTop > elementTop && !$this.is("." + className)) {
                        // Specify height to calculated height
                        $this.height($this.height());
                        $this.addClass(className);
                    } else if(viewTop <= elementTop && $this.is("." + className)) {
                        // Restore height to auto FIXME: Could we read and store this above?
                        $this.css("height", "auto");
                        $this.removeClass(className);
                    }
                }
            );
            });
    };
})(jQuery);
