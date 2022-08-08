const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const WEEK_DAYS_FROM_MONDAY = [6, 0, 1, 2, 3, 4, 5];

const Month = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    Novermber: 10,
    December: 11
};

export const areEqual = (a, b) => {
    if(!a || !b) {
        return false
    }
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

export const isLeapYear = (year) => {
    return !((year % 4) || (!(year % 100) && (year % 400)));
}

export const getDaysInMonth = (date) => {
    const month = date.getMonth();
    const year = date.getFullYear();

    if(isLeapYear(year) && month === Month.February) {
        return DAYS_IN_MONTH[month] + 1;
    } else {
        return DAYS_IN_MONTH[month];
    }
}

export const getDayOfWeek = (date) => {
    const dayOfWeek = date.getDay();

    return WEEK_DAYS_FROM_MONDAY[dayOfWeek];
}

export const getMonthData = (year, month) => {
    const result = [];
    const date = new Date(year, month);
    const daysInMonth = getDaysInMonth(date);
    const monthStartsOn = getDayOfWeek(date);
    let day = 1;

    for (let i = 0; i < (daysInMonth + monthStartsOn) / DAYS_IN_WEEK; i++) {
        result[i] = [];
        for (let j = 0; j < DAYS_IN_WEEK; j++) {
            if((i === 0 && j < monthStartsOn) || day > daysInMonth) {
                result[i][j] = undefined;
            } else {
                result[i][j] = new Date(year, month, day++);
            }
        }
    }

    return result
}