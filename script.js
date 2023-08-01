// Create Countdown
var Countdown = {

    // Backbone-like structure
    $el: $('.countdown'),

    // Params
    countdown_interval: null,
    total_seconds     : 0,

    // Initialize the countdown  
    init: function() {
        
        // DOM
        this.$ = {
            days: this.$el.find('.bloc-time.days .figure'), // Fix the selector
            hours: this.$el.find('.bloc-time.hours .figure'),
            minutes: this.$el.find('.bloc-time.min .figure'),
            seconds: this.$el.find('.bloc-time.sec .figure')
        };

        // Init countdown values
        this.values = {
            days: this.$.days ? parseInt(this.$.days.parent().attr('data-init-value'), 10) : 0,
            hours: this.$.hours ? parseInt(this.$.hours.parent().attr('data-init-value'), 10) : 0,
            minutes: this.$.minutes ? parseInt(this.$.minutes.parent().attr('data-init-value'), 10) : 0,
            seconds: this.$.seconds ? parseInt(this.$.seconds.parent().attr('data-init-value'), 10) : 0,
        };
        this.values.days = parseInt(this.values.days, 10);
        this.values.hours = parseInt(this.values.hours, 10);
        this.values.minutes = parseInt(this.values.minutes, 10);
        this.values.seconds = parseInt(this.values.seconds, 10);
        // Initialize total seconds
        this.total_seconds = this.values.days * 24 * 60 * 60 + this.values.hours * 60 * 60 + this.values.minutes * 60 + this.values.seconds;

        // Animate countdown to the end 
        this.count();    
    },

    count: function() {
        var that = this,
            $day_1 = this.$.days.eq(0),
            $day_2 = this.$.days.eq(1),
            $hour_1 = this.$.hours.eq(0),
            $hour_2 = this.$.hours.eq(1),
            $min_1 = this.$.minutes.eq(0),
            $min_2 = this.$.minutes.eq(1),
            $sec_1 = this.$.seconds.eq(0),
            $sec_2 = this.$.seconds.eq(1);
    
        this.countdown_interval = setInterval(function() {
            if (that.total_seconds > 0) {
                // Calculate days, hours, minutes, and seconds
                var days = Math.floor(that.total_seconds / (24 * 60 * 60));
                var hours = Math.floor((that.total_seconds % (24 * 60 * 60)) / (60 * 60));
                var minutes = Math.floor((that.total_seconds % (60 * 60)) / 60);
                var seconds = that.total_seconds % 60;
    
                // Update DOM values
                // Days
                that.checkHour(days, $day_1, $day_2);
    
                // Hours
                that.checkHour(hours, $hour_1, $hour_2);
    
                // Minutes
                that.checkHour(minutes, $min_1, $min_2);
    
                // Seconds
                that.checkHour(seconds, $sec_1, $sec_2);
    
                --that.total_seconds;
            } else {
                clearInterval(that.countdown_interval);
            }
        }, 1000);
    },

    animateFigure: function($el, value) {
        
        var that         = this,
            $top         = $el.find('.top'),
            $bottom      = $el.find('.bottom'),
            $back_top    = $el.find('.top-back'),
            $back_bottom = $el.find('.bottom-back');

        // Before we begin, change the back value
        $back_top.find('span').html(value);

        // Also change the back bottom value
        $back_bottom.find('span').html(value);

        // Then animate
        TweenMax.to($top, 0.8, {
            rotationX           : '-180deg',
            transformPerspective: 300,
            ease                : Quart.easeOut,
            onComplete          : function() {

                $top.html(value);

                $bottom.html(value);

                TweenMax.set($top, { rotationX: 0 });
            }
        });

        TweenMax.to($back_top, 0.8, { 
            rotationX           : 0,
            transformPerspective: 300,
            ease                : Quart.easeOut, 
            clearProps          : 'all' 
        });    
    },

    checkHour: function(value, $el) {
        var val = value.toString().padStart(2, '0'); // Format the value to always have 2 digits
        var fig_value = $el.find('.top').html();
    
        // Animate only if the figure has changed
        if (fig_value !== val) this.animateFigure($el, val);
    },

    ready: function(callback) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", callback);
        } else {
            callback();
        }
    },
};

Countdown.ready(function() {
    Countdown.init();
});


Countdown.ready(function() {
    Countdown.init();
});
