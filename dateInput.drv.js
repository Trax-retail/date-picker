'use strict';

angular.module('datepicker').directive('dateInput', function(calendarFactory) {
  return {
    scope: false,
    require: 'ngModel',
    link: function(scope, element, attrs, ngModelCtrl) {
      ngModelCtrl.$parsers.push(function(textDate) {
        var formattedDate =  moment(new Date(textDate))
        var selectionPosition = attrs.ngModel.split('.').slice(-1)[0]; // start or enf
        if (formattedDate.isValid()) {
          scope.selection[selectionPosition] = formattedDate;
          scope.calendar = calendarFactory.updateCalendar(scope.selection.start, scope.selection, scope.activeDates)
        }
        return formattedDate;
      });

      ngModelCtrl.$formatters.push(function(date) {
        return date.format(attrs.dateInput);
      });
    }
  }
});
