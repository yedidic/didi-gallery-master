'use strict';
function getMonthName(timestamp) {
    var date = new Date(timestamp * 1000);
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    return month[date.getMonth()];
}
function getYearName(timestamp) {
    var date = new Date(timestamp * 1000);
    return date.getFullYear();
}