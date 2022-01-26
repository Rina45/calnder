//make object for a date square {ot, num, events array, shabbat parashah}
/* steps for the js script:

3.make the days (including ot, num and Parashah on shabbat)
4.how to make the today date with the id today.
5.add holidays (option to others events in the future) 
learn to use "hebcal" */

let dateL = new Date();
let dateH = {};

async function firstRender() {
    dateH = await getHebrewDate(dateL);
    dateH.hd = 1;
    dateL = await getLoDate(dateH);
    renderCalender(dateL);
}

window.onload = firstRender();

async function renderCalender(dateL) {
    let month = await getMonth(dateL);
    dateH = month[0];
    writeTitle(dateH, dateL);
    writeDays(month);
}

function writeTitle(dateH, dateL) {
    let heMonth = document.getElementById("heMonth");
    heMonth.textContent = writeHeMonth(dateH);
    let loMonth = document.getElementById("loMonth");
    loMonth.textContent = writeLoMonth(dateL);
}

function writeHeMonth(date) {
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

function writeDays(month) {
    let calender = document.getElementById('tbody');
    calender.innerHTML = "";
    calender.append(...createFills(month[0].gd.getDay()));
    for (let i = 0; i < month.length - 1; i++) {
        calender.append(createDay(month[i]));
    }
    calender.append(...createFills(6 - month[29].gd.getDay()));
}

function createDay(date) {
    console.log(date)
    let day = document.createElement('div');
    day.className = 'td';
    let datePlace = document.createElement('div');
    datePlace.className = 'date';
    let ot = document.createElement('div');
    ot.className = 'ot';
    ot.textContent = numToHe(date.hd);
    let num = document.createElement('div');
    //bold in first lo
    num.className = 'num';
    num.textContent = date.gd.getDate();
    datePlace.append(ot, num);
    day.append(datePlace);
    return day;
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
    dateL = await getLoDate(dateH);
    renderCalender(dateL);
}

function futureMonth(date) {
    const enMonths = [
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
            date.hm = enMonths[enMonths.indexOf(date.hm) + 1];
            break;
    }
    return date;
}

async function lastMonth() {
    dateH = preMonth(dateH);
    dateL = await getLoDate(dateH);
    renderCalender(dateL);
}

function preMonth(date) {
    const enMonths = [
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
            date.hm = enMonths[enMonths.indexOf(date.hm) - 1];
            break;
    }
    return date;
}

async function nextYear() {
    dateH.hy++;
    dateL = await getLoDate(dateH);
    renderCalender(dateL);
}

async function lastYear() {
    dateH.hy--;
    dateL = await getLoDate(dateH);
    renderCalender(dateL);
}

async function getHebrewDate(dateL) {
    const url = `https://www.hebcal.com/converter?cfg=json&gy=${dateL.getFullYear()}&gm=${dateL.getMonth() + 1}&gd=${dateL.getDate()}&g2h=1`;
    const response = await fetch(url);
    const data = await response.json();
    return data
}

async function getLoDate(dateH) {
    const url = `https://www.hebcal.com/converter?cfg=json&hy=${dateH.hy}&hm=${dateH.hm}&hd=${dateH.hd}&h2g=1`;
    const response = await fetch(url);
    const data = await response.json();
    let date = new Date(data.gy, data.gm - 1, data.gd);
    return date;
}

async function getMonth(firstDate, numDays = 30) {
    let lastDate = new Date(firstDate);
    lastDate.setDate(firstDate.getDate() + numDays);
    const url = `https://www.hebcal.com/converter?cfg=json&start=${stringDate(firstDate)}&end=${stringDate(lastDate)}&g2h=1`;
    const response = await fetch(url);
    let month = await response.json();
    month = month.hdates;
    month = Object.entries(month);
    month = month.map(date => { return { ...date[1], gd: new Date(date[0]) } });
    return month;
}

function stringDate(date) {
    date.setDate(date.getDate() + 1);
    return date.toISOString().slice(0, 10);
}