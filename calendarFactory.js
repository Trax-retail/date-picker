'use strict';

angular.module('datepicker', []).factory('calendarFactory', function() {

  // Half-days do not count within range, so only for comparison I make all days full
  function tempDisplayRange(range) {
    return moment.range(
      range.start.clone().startOf('day'),
      range.end.clone().endOf('day')
    )
  }

  return {
    // Create all the days needed to draw a month calendar
    getCalendarOfMonth: function (startingDateToDisplay, selectionRange, activeDates) {

      var monthStartDate,
          firstDayOfMonth,
          lastDayOfMonth,
          month,
          tempSelectionRange,
          tempActiveDates;

      // Days in first week of month before the month starts
      // The Clone is really stupid - you can't read first/last date
      // without changing the moment object :( http://stackoverflow.com/questions/37928175
      monthStartDate = startingDateToDisplay.clone().startOf('month').day();
      firstDayOfMonth = startingDateToDisplay.clone().startOf('month');
      lastDayOfMonth = startingDateToDisplay.clone().endOf('month');
      month = moment.range(firstDayOfMonth, lastDayOfMonth);

      if (selectionRange) {
        tempSelectionRange = tempDisplayRange(selectionRange);
      }

      // All days, including the empty, to draw
      var days = [];

      //  fill empty days from Monday to start of month
      for (var i = 1; i < monthStartDate; i++) {
        days.push(false);
      }

      // Create an array of all dates in month. If any in selected range,
      // add selected property for HTML. If a day is today, mark it.
      month.by('days', function(day) {
        if (activeDates) { // find enabled dates
          for (var i = 0; i < activeDates.length; i++) {
            tempActiveDates = tempDisplayRange(activeDates[i]);
            if (day.within(tempActiveDates)) {
              day.enabled = true;
            }
          }
        } else { // if no activeDates, all days are enabled
          day.enabled = true;
        }

        if (selectionRange && day.within(tempSelectionRange)) {
          day.selected = true;
        }

        if (day.isSame(moment(), 'day')) {
          day.today = true;
        }

        days.push(day);
      });

      return days;
    },

    // Here we populate the HTML of the month calendar and magical cats
    updateCalendar: function (startingDateToDisplay, selectionRange, activeDates) {
      var nextMonth,
          calendar;

      nextMonth = startingDateToDisplay.clone().add(1, 'M');
      calendar = [
        this.getCalendarOfMonth(startingDateToDisplay, selectionRange, activeDates),
        this.getCalendarOfMonth(nextMonth, selectionRange, activeDates)
      ];

      return calendar;
    }
  };
});
