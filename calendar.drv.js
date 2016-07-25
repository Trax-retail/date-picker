'use strict';

angular.module('datepicker').directive('datePicker', function (calendarFactory) {

  return {
    restrict: 'E',

    templateUrl: 'calendar.html',

    scope: {
      selection: '=', // A moment-range object
      activeDates: '=', // A moment-range object
      onApply : '&'
    },

    link : function (scope) {
      var startingDateToDisplay,
          weekDayNames;

      // If any selection is saved, the datepicker will open on the month of the selection
      // otherwise, it will open on current date.
      startingDateToDisplay = (scope.selection) ? scope.selection.clone().start : moment();
      weekDayNames = moment.weekdaysMin();
      weekDayNames.push(weekDayNames.shift());

      scope.showDatePicker = false;
      scope.calendar = calendarFactory.updateCalendar(startingDateToDisplay, scope.selection, scope.activeDates);
      scope.weekDayNames = weekDayNames;

      scope.applySelectedDates = function () {
        scope.onApply();
        scope.showDatePicker = false;
      };

      scope.changeMonth = {
        next : function () {
          scope.calendar = calendarFactory.updateCalendar(startingDateToDisplay.add(1 ,'M'), scope.selection, scope.activeDates);
        },

        previous : function () {
          scope.calendar = calendarFactory.updateCalendar(startingDateToDisplay.subtract(1, 'M'), scope.selection, scope.activeDates);
        }
      };

      scope.dateSelect = {
        start: true,
        end: false
      }

      scope.select = function (range, date) {
        switch (range) {
          case 'date':
            startingDateToDisplay = date;
            if (!scope.selection ||
              !scope.selection.start.isSame(scope.selection.end, 'day') ||
              date.isBefore(scope.selection.start, 'day')) {
              // New selection, set FROM date
              scope.selection = moment.range(date, date);
              scope.dateSelect = {
                start: false,
                end: true
              };
            }
            else if (scope.selection.start.isSame(scope.selection.end, 'day')) {
              // Set TO date
              scope.selection = moment.range(scope.selection.start, date);
              // if range is outside one month, move calendar to show selected month as last
              if (scope.selection.diff('months') > 0) {
                startingDateToDisplay = date.subtract(1, 'M');
              }
              scope.dateSelect = {
                start: false,
                end: false
              };
            }
            break;

          case 'today':
            startingDateToDisplay = moment();
            scope.selection = moment.range(
              moment().startOf('day'),
              moment().endOf('day')
            )
            break;

          case 'this week':
            startingDateToDisplay = moment();
            scope.selection = moment.range(
              moment().startOf('isoweek'),
              moment()
            );
            break;

          case 'this month':
            startingDateToDisplay = moment();
            scope.selection = moment.range(
              moment().startOf('month'),
              moment()
            );
            break;

          case 'two weeks':
            startingDateToDisplay = moment().subtract(14, 'days');
            scope.selection = moment.range(
              moment().subtract(14, 'days'),
              moment()
            );
            break;

          case 'clear':
            scope.selection = null;
            break;
        }

        scope.calendar = calendarFactory.updateCalendar(startingDateToDisplay, scope.selection, scope.activeDates);
      };
    }
  };
});
