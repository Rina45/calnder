//make object for a date square {ot, num, events array, shabbat parashah}


/* steps for the js script:
1.find the first day in the current monthH (=hebrew month)
2.change the caption to fit the current month (the monthL (=none hebrew month) of the first and last day of the month)
3.make the days (including ot, num and Parashah on shabbat)
4.how to make the today date with the id today.
5.add holidays (option to others events in the future) 
learn to use "hebcal" */

let dateL = new Date();
let dateH = {};

function renderCalender() {
    dateL = checkDateL(dateL);
    // dateH = checkDateH();
    let heMonth = document.getElementById("heMonth");
    getHebrewDate(dateL).then(date => { heMonth.textContent = date.hebrew });
    let loMonth = document.getElementById("loMonth");
    loMonth.textContent = writeLoMonth(dateL);
}
window.onload = renderCalender();

function checkDateL(dateL) {
    if (dateL.getMonth() >= 12) {
        dateL.setMonth(0);
        dateL.setFullYear(dateL.getFullYear() + 1);
    }
    else if (dateL.getMonth() <= -1) {
        dateL.setMonth(12);
        dateL.setFullYear(dateL.getFullYear() - 1);
    }
    return dateL;
}

function writeLoMonth(dateL) {
    const monthsL = ['ינואר',
        'פברואר',
        'מרץ',
        'אפריל',
        'מאי',
        'יוני',
        'יולי',
        'אוגוסט',
        'ספטמבר',
        'אוקטובר',
        'נובמבר',
        'דצמבר'];

    if (dateL.getMonth() !== 11) {
        return monthsL[dateL.getMonth()] + " - " + monthsL[dateL.getMonth() + 1] + " " + dateL.getFullYear();
    }
    else {

        return monthsL[dateL.getMonth()] + " " + dateL.getFullYear() + " - " + monthsL[0] + " " + (dateL.getFullYear() + 1);
    }
}

//DON'T FORGET TO ADD HEBREW DATES + -

document.querySelector("#next > .month").addEventListener('click', nextMonth);
document.querySelector("#next > .year").addEventListener('click', nextYear);
document.querySelector("#last > .month").addEventListener('click', lastMonth);
document.querySelector("#last > .year").addEventListener('click', lastYear);

function nextMonth() {
    dateL.setMonth(dateL.getMonth() + 1);
    renderCalender();
}

function lastMonth() {
    dateL.setMonth(dateL.getMonth() - 1);
    renderCalender();
}

function nextYear() {
    dateL.setFullYear(dateL.getFullYear() + 1);
    renderCalender();
}

function lastYear() {
    dateL.setFullYear(dateL.getFullYear() - 1);
    renderCalender();
}

async function getHebrewDate(dateL) {
    const url = `https://www.hebcal.com/converter?cfg=json&gy=${dateL.getFullYear()}&gm=${dateL.getMonth() + 1}&gd=${dateL.getDate()}&g2h=1`;
    const response = await fetch(url);
    const data = await response.json();
    return data
}