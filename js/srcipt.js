//make object for a date square {ot, num, events array, shabbat parasha}

/* steps for the js srcipt:
1.find the first day in the current monthH (=hebrew month)
2.change the caption to fit the current month (the monthL (=none hebrew month) of the first and last day of the month)
3.make the days (including ot, num and Parasha on shabat)
4.how to make the today date with the id today.
5.add holidays (optin to others events in the future) 
learn to use "hebcal" */

let dateL= new Date();

function renderCalnder() {
    dateL = checkDateL(dateL);
    
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
    
    let loMonth = document.getElementById("loMonth");
    if(dateL.getMonth() !== 11) {
        loMonth.textContent = monthsL[dateL.getMonth()] + " - " + monthsL[dateL.getMonth() + 1] + " " + dateL.getFullYear();
    }
    else {
        
        loMonth.textContent = monthsL[dateL.getMonth()] + " " + dateL.getFullYear() + " - " + monthsL[0] + " " + (dateL.getFullYear()+1);
    }
}
window.onload = renderCalnder();

function checkDateL (dateL){
    if (dateL.getMonth() >= 12) {
        dateL.setMonth(0);
        dateL.setFullYear(dateL.getFullYear()+1);
        return dateL;
    }
    else if (dateL.getMonth() <= -1) {
        dateL.setMonth(12);
        dateL.setFullYear(dateL.getFullYear()-1);
        return dateL;
    }
    else {
        return dateL;
    }
}

//DON'T FORGET TO ADD HEBROW DATES + -

function nextMonth() {
    dateL.setMonth(dateL.getMonth() + 1);
    renderCalnder();
}

function lastMonth() {
    dateL.setMonth(dateL.getMonth() - 1);
    renderCalnder();
}

function nextYear() {
    dateL.setFullYear(dateL.getFullYear() + 1);
    renderCalnder();
}

function lastYear() {
    dateL.setFullYear(dateL.getFullYear() - 1);
    renderCalnder();
}

