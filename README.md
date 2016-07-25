# Trax Simple Date-picker

### Features:
- Using [Moment](https://github.com/moment/moment/ "Moment Github") and [Moment Range](https://github.com/gf3/moment-range "Moment Range Github") objects as model.
- Lightweight.
- 2 Month panes.
- Plain text input of date and time.

Demo: [https://trax-retail.github.io/date-picker](https://trax-retail.github.io/date-picker/ "Datepicker demo")

----

### How to use:

The top controller muat have 3 items:

 - `selection`: A range object of the selection
 - `active-dates` [optional]: An array of range objects if you want to have only sepecific days shown as available (does not effect selection, only visual indicator)
 - `on-apply`: A function to run once you click apply


----

Creator: [Ilya Dorman](https://github.com/ilyador "Ilya Dorman")