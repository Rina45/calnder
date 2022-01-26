function first(dateL) {
    let dateH = getHebrewDate(dateL);
    // writeDays(); inside fetchEvents()
}

function renderCalender() {
    dateH = checkDateH(dateH);
    dateL = getLDate({ ...dateH, hd: 1 });

    writeTitle(dateH, dateL);

}

function writeTitle(dateH, dateL) {
    let heMonth = document.getElementById("heMonth");
    heMonth.textContent = writeHeMonth(dateH);
    let loMonth = document.getElementById("loMonth");
    loMonth.textContent = writeLoMonth(dateL);
}

function writeDays(dateH, dateL) {
    const calender = document.getElementById(tbody);
    const daysH = countDaysH(dateH);
    const daysL = countDaysL(dateL);
    for (let day = 1; day <= daysH; day++) {
        createDay(day);
    }
}

function createDay(day) {
    let td = document.createElement('div');
    td.className = 'td';
    let datePlace = document.createElement('div');
    datePlace.className = 'date';
    let ot = document.createElement('div');
    ot.className = 'ot';
    ot.textContent = numToOt(day);
    let num = document.createElement('div');
    num.className = 'num';
    datePlace.append(ot, num);
    td.append(datePlace);
    calender.append(td);
}

async function getMonth(firstDate, numDays = 29) {
    const lastDate = firstDate.setDate(firstDate.getDate() + numDays);
    const url = `https://www.hebcal.com/converter?cfg=json&start=${stringDate(firstDate)}&end=${stringDate(lastDate)}&g2h=1`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function stringDate(date = new Date()) {
    return date.toISOString().slice(0, 10);
}

async function getLDate(dateH) {
    const url = `https://www.hebcal.com/converter?cfg=json&hy=${dateH.hy}&hm=${dateH.hm}&hd=${dateH.hd}&h2g=1`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const MONTHS_H = {
    Tishrei: "תשרי",
    Cheshvan: "חשון",
    Kislev: "כסלו",
    Tevet: "טבת",
    Shavt: "שבט",
    Adar: "אדר",
    Adar1: "אדר א'",
    Adar2: "אדר ב'",
    Nisan: "ניסן",
    Iyyar: "אייר",
    Sivan: "סיון",
    Tamuz: "תמוז",
    Av: "אב",
    Elul: "אלול",
    monthList: [
        Tishrei,
        Cheshvan,
        Kislev,
        Tevet,
        Shavt,
        Adar,
        Nisan,
        Iyyar,
        Sivan,
        Tamuz,
        Av,
        Elul
    ],
    // previous(key) {
    // 
    // },
    // index(key) {
    //     return this.monthList.indexOf(key);
    // }
}

function checkDateL() {
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