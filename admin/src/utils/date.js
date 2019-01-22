    
export function getDateProps(date) {
    // If no parameter, create an object with todays date info. Else, parse the information for later use 
    if(!date) {
        var dateObj = new Date()
        var todaysDate = dateObj.getDate()
        var month = dateObj.getMonth();month += 1
        var year = dateObj.getFullYear()

        date = {year, month, todaysDate} 
    } else {
        var { year, month, todaysDate } = date
    }

    // Add the day of the week the month starts on (To populate the calender)
    var monthStart = new Date(year + "-" + month + "-" + 1)
    
    var start = monthStart.getDay()
    if(start === 0) { //because 0 is returned if the day is a Sunday
        start = 7
    }
    var months;

    //check if leap year and update CalenderMonths with appropriate date.
    if (year % 4 === 0 ||year % 100 === 0 || year % 400 === 0)   {
       months = {1: 31, 2: 29, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31}
    } else {
       months = {1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31}
    }

    var end = months[month]; //how many days in the month selected

    return ({start, end, year, month, todaysDate})
}

