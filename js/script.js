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

async function firstRender() {
    dateH = await getHebrewDate(dateL);
    dateL = await getLDate({ ...dateH, hd: 1 });
    renderCalender(dateL);
}

window.onload = firstRender();

function renderCalender(dateL) {
    let heMonth = document.getElementById("heMonth");
    getHebrewDate(dateL).then(date => heMonth.textContent = date.hebrew);
    let loMonth = document.getElementById("loMonth");
    loMonth.textContent = writeLoMonth(dateL);
}

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

function writeLoMonth(dateL) {
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
    // dateH = checkDateH();
    renderCalender(dateL);
}

function lastMonth() {
    dateL.setMonth(dateL.getMonth() - 1);
    // dateH = checkDateH();
    renderCalender(dateL);
}

function nextYear() {
    dateL.setFullYear(dateL.getFullYear() + 1);
    // dateH = checkDateH();
    renderCalender(dateL);
}

function lastYear() {
    dateL.setFullYear(dateL.getFullYear() - 1);
    // dateH = checkDateH();
    renderCalender(dateL);
}

async function getHebrewDate(dateL) {
    const url = `https://www.hebcal.com/converter?cfg=json&gy=${dateL.getFullYear()}&gm=${dateL.getMonth() + 1}&gd=${dateL.getDate()}&g2h=1`;
    const response = await fetch(url);
    const data = await response.json();
    return data
}

async function getLDate(dateH) {
    const url = `https://www.hebcal.com/converter?cfg=json&hy=${dateH.hy}&hm=${dateH.hm}&hd=${dateH.hd}&h2g=1`;
    const response = await fetch(url);
    const data = await response.json();
    let date = new Date(data.gy, data.gm - 1, data.gd);
    return date;
}

const MONTHS_H = {
    Tishrei: "תשרי",
    Cheshvan: "חשון",
    Kislev: "כסלו",
    Tevet: "טבת",
    'Sh\'avt': "שבט",
    Adar: "אדר",
    'Adar I': "אדר א'",
    'Adar II': "אדר ב'",
    Nisan: "ניסן",
    Iyyar: "אייר",
    Sivan: "סיון",
    Tamuz: "תמוז",
    Av: "אב",
    Elul: "אלול",
    list: [
        'Tishrei',
        'Cheshvan',
        'Kislev',
        'Tevet',
        'Sh\'vat',
        'Adar',
        'Nisan',
        'Iyyar',
        'Sivan',
        'Tamuz',
        'Av',
        'Elul'
    ]
}

function preMonth(date) {
    switch (date.hm) {
        case 'Nisan':
            date.hm = 'Adar II';
            break;
        case 'Adar II':
            date.hm = 'Adar I';
            break;
        case 'Adar I':
            date.hm = 'Sh\'vat';
            break;
        case 'Tishrei':
            date.hm = 'Elul';
            date.hy--;
            break;
        default:
            date.hm = MONTHS_H.list[MONTHS_H.list.indexOf(date.hm) - 1];
            break;
    }
    return date;
}