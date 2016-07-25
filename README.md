# Trax Simple Datepicker

Using [Moment](https://github.com/moment/moment/ "Moment Github") and [Moment Range](https://github.com/gf3/moment-range "Moment Range Github") as a model for all the datepicker.

The top controller muat have 3 items:
 - `selection`: A range object of the selection
 - `active-dates` [optional]: An array of range objects if you want to have only sepecific days shown as available (does not effect selection, only visual indicator)
 - `on-apply`: A function to run once you click apply
