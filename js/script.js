//make object for a date square {ot, num, events array, shabbat parashah}
/* steps for the js script:

3.make the days (including ot, num and Parashah on shabbat)
4.how to make the today date with the id today.
5.add holidays (option to others events in the future) */

let dateL = new Date();
let dateH = {};
let today = new Date(dateL);

async function firstRender() {
    changeToColor();
    dateH = await getHebrewDate(dateL);
    dateH = await getByH({ ...dateH, hd: 1 });
    dateL = dateH.gDate;
    renderCalender(dateL);
}

window.onload = firstRender();

function renderCalender(dateL) {
    writeTitle(dateH, dateL);
    writeDays(dateL);
}

function writeTitle(dateH, dateL) {
    let heMonth = document.getElementById("heMonth");
    heMonth.textContent = writeHeMonth(dateH);
    let loMonth = document.getElementById("loMonth");
    loMonth.textContent = writeLoMonth(dateL);
}

function writeHeMonth(date) {
    const month = heMonths[enMonths.indexOf(date.hm)];
    const year = numToHe(date.hy);
    return `${month} ${year}`;
}

function numToHe(num) {
    let word = '';
    if (num >= 1000) {
        word = numToHe(Math.floor(num / 1000)) + "'";
        num %= 1000
    }
    do {
        switch (true) {
            case num >= 400:
                word += 'ת';
                num -= 400;
                break;
            case num >= 300:
                word += 'ש';
                num -= 300;
                break;
            case num >= 200:
                word += 'ר';
                num -= 200;
                break;
            case num >= 100:
                word += 'ק';
                num -= 100;
                break;
            case num >= 90:
                word += 'צ';
                num -= 90;
                break;
            case num >= 80:
                word += 'פ';
                num -= 80;
                break;
            case num >= 70:
                word += 'ע';
                num -= 70;
                break;
            case num >= 60:
                word += 'ס';
                num -= 60;
                break;
            case num >= 50:
                word += 'נ';
                num -= 50;
                break;
            case num >= 40:
                word += 'מ';
                num -= 40;
                break;
            case num >= 30:
                word += 'ל';
                num -= 30;
                break;
            case num >= 20:
                word += 'כ';
                num -= 20;
                break;
            case num === 16:
                word += 'טז';
                num -= 16;
                break;
            case num === 15:
                word += 'טו';
                num -= 15;
                break;
            case num >= 10:
                word += 'י';
                num -= 10;
                break;
            case num === 9:
                word += 'ט';
                num -= 9;
                break;
            case num === 8:
                word += 'ח';
                num -= 8;
                break;
            case num === 7:
                word += 'ז';
                num -= 7;
                break;
            case num === 6:
                word += 'ו';
                num -= 6;
                break;
            case num === 5:
                word += 'ה';
                num -= 5;
                break;
            case num === 4:
                word += 'ד';
                num -= 4;
                break;
            case num === 3:
                word += 'ג';
                num -= 3;
                break;
            case num === 2:
                word += 'ב';
                num -= 2;
                break;
            case num === 1:
                word += 'א';
                num -= 1;
                break;
            default:
                break;
        }
    } while (num > 0);
    if (word.length >= 2 && word[-2] !== "'") {
        let char = word.slice(-1);
        word = word.slice(0, -1)
        word += '"' + char;
    }
    return word;
}

function writeLoMonth(dateL) {
    if (dateL.getMonth() !== 11) {
        return monthsL[dateL.getMonth()] + " - " + monthsL[dateL.getMonth() + 1] + " " + dateL.getFullYear();
    }
    else {

        return monthsL[dateL.getMonth()] + " " + dateL.getFullYear() + " - " + monthsL[0] + " " + (dateL.getFullYear() + 1);
    }
}

async function writeDays(dateL) {
    let month = await getMonth(dateL);
    let calender = document.getElementById('tbody');
    calender.innerHTML = "";
    calender.append(...createFills(month[0].gDate.getDay()));
    const last = lastInMonth(month[29]);
    for (let i = 0; i < last; i++) {
        calender.append(createDay(month[i]));
    }
    calender.append(...createFills(6 - month[last - 1].gDate.getDay()));
}

function createDay(date) {
    let day = document.createElement('div');
    day.className = 'td';
    if (date.gDate.getDay() === 6) {
        day.classList.add('shabat');
    }
    if (compareToToday(date.gDate)) {
        day.setAttribute('id', 'today')
    }
    let datePlace = createDate(date);
    day.append(datePlace);
    let eventList = createEvent(date);
    day.append(eventList);
    return day;
}

function createDate(date) {
    let datePlace = document.createElement('div');
    datePlace.className = 'date';
    let ot = document.createElement('div');
    ot.className = 'ot';
    ot.textContent = numToHe(date.hd);
    let num = document.createElement('div');
    num.className = 'num';
    if (date.gDate.getDate() === 1) {
        num.innerHTML = '<b>1</b>'
    }
    else {
        num.textContent = date.gDate.getDate();
    }
    datePlace.append(ot, num);
    return datePlace;
}
function createEventsList(date) {
    let list = date.events;
    if (date.gDate.getDay() !== 6) {
        let newList = [];
        for (let i = 0; i < list.length; i++) {
            if (!list[i].startsWith("פָּרָשַׁת")) {
                newList.push(list[i]);
            }
        }
        list = newList;
    } //check if it's a shabbat, if not remove weekly portion from list (פרשה)
    return list;
}

function createEvent(date) {
    let list = createEventsList(date);

    if (Array.isArray(list) && list.length > 0) {
        let events = list.toReversed().map(item => `<div> ${item}</div> `).join('');
        let eventsPlace = document.createElement('div');
        eventsPlace.className = 'event';
        eventsPlace.innerHTML = events;

        return eventsPlace;
    } else {
        return '';
    }
}

function createFills(numDays) {
    let fills = [];
    for (let i = 0; i < numDays; i++) {
        fills[i] = document.createElement('div');
        fills[i].className = 'td empty';
    }
    return fills;
}

document.querySelector("#next > .month").addEventListener('click', nextMonth);
document.querySelector("#next > .year").addEventListener('click', nextYear);
document.querySelector("#last > .month").addEventListener('click', lastMonth);
document.querySelector("#last > .year").addEventListener('click', lastYear);

async function nextMonth() {
    dateH = futureMonth(dateH);
    dateH = await getByH(dateH);
    dateL = dateH.gDate;
    renderCalender(dateL);
}

function futureMonth(date) {
    switch (date.hm) {
        case 'Sh\'vat':
            date.hm = 'Adar I';
            break;
        case 'Adar I':
            date.hm = 'Adar II';
            break;
        case 'Adar II':
            date.hm = 'Nisan';
            break;
        case 'Elul':
            date.hm = 'Tishrei';
            date.hy++;
            break;
        default:
            date.hm = theMonths[theMonths.indexOf(date.hm) + 1];
            break;
    }
    return date;
}

async function lastMonth() {
    dateH = preMonth(dateH);
    dateH = await getByH(dateH);
    dateL = dateH.gDate;
    renderCalender(dateL);
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
            date.hm = theMonths[theMonths.indexOf(date.hm) - 1];
            break;
    }
    return date;
}

async function nextYear() {
    dateH.hy++;
    dateH = await getByH(dateH);
    dateL = dateH.gDate;
    renderCalender(dateL);
}

async function lastYear() {
    dateH.hy--;
    dateH = await getByH(dateH);
    dateL = dateH.gDate;
    renderCalender(dateL);
}

async function getHebrewDate(dateL) {
    const url = `https://www.hebcal.com/converter?cfg=json&gy=${dateL.getFullYear()}&gm=${dateL.getMonth() + 1}&gd=${dateL.getDate()}&g2h=1`;
    const response = await fetch(url);
    let date = await response.json();
    date.gDate = new Date(date.gy, date.gm - 1, date.gd);
    return date;
}

async function getByH(dateH) {
    const url = `https://www.hebcal.com/converter?cfg=json&hy=${dateH.hy}&hm=${dateH.hm}&hd=${dateH.hd}&h2g=1`;
    const response = await fetch(url);
    let date = await response.json();
    date.gDate = new Date(date.gy, date.gm - 1, date.gd);
    return date;
}

async function getMonth(firstDate, numDays = 29) {
    let lastDate = new Date(firstDate);
    lastDate.setDate(firstDate.getDate() + numDays);
    const url = `https://www.hebcal.com/converter?cfg=json&start=${stringDate(firstDate)}&end=${stringDate(lastDate)}&g2h=1&lg=he`;
    const response = await fetch(url);
    let month = await response.json();
    month = month.hdates;
    month = Object.entries(month);
    month = month.map(date => { return { ...date[1], gDate: new Date(date[0]) } });
    return month;
}

function stringDate(date) {
    date.setDate(date.getDate() + 1);
    return date.toISOString().slice(0, 10);
}

function lastInMonth(last) {
    if (last.hm == dateH.hm) {
        return 30;
    } else {
        return 29;
    }
}

function compareToToday(date) {
    if (today.getFullYear() === date.getFullYear()) {
        if (today.getMonth() === date.getMonth()) {
            if (today.getDate() === date.getDate()) {
                return true;
            }
        }
    }
    return false;
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
const heMonths = [
    "תשרי",
    "חשוון",
    "כסלו",
    "טבת",
    "שבט",
    "אדר",
    "אדר א'",
    "אדר ב'",
    "ניסן",
    "אייר",
    "סיון",
    "תמוז",
    "אב",
    "אלול"];
const enMonths = [
    'Tishrei',
    'Cheshvan',
    'Kislev',
    'Tevet',
    'Sh\'vat',
    'Adar',
    'Adar I',
    'Adar II',
    'Nisan',
    'Iyyar',
    'Sivan',
    'Tamuz',
    'Av',
    'Elul'];
const theMonths = [
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

//styleChanger start here
document.getElementById('pink').addEventListener('click', changeToColor);
document.getElementById('bnw').addEventListener('click', changeToBnW);

function changeToColor() {
    document.styleSheets[1].disabled = false;
    document.styleSheets[2].disabled = true;
}

function changeToBnW() {
    document.styleSheets[1].disabled = true;
    document.styleSheets[2].disabled = false;

}