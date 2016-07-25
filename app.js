angular.module('datePickerTest', ['datepicker']).controller('datePickerCtrl', function($scope) {
  $scope.selectionDates = moment.range([
    moment('2016-06-03 09:00'),
    moment('2016-06-10 18:00')
  ])
  $scope.doStuff = function () {
    console.log('apply')
  }
  $scope.activeDates = [
    moment.range([
      moment('2016-06-01 09:00'),
      moment('2016-06-04 18:00')
    ]),
    moment.range([
      moment('2016-06-20 09:00'),
      moment('2016-07-10 18:00')
    ])
  ]
})
