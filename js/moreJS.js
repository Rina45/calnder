function writeTitle(dateH, dateL) {
    let heMonth = document.getElementById("heMonth");
    heMonth.textContent = writeHeMonth(dateH);
    let loMonth = document.getElementById("loMonth");
    loMonth.textContent = writeLoMonth(dateL);
}

function writeDays(dateH, dateL) {
    let calender = document.getElementById(tbody);
    for (let day = 1; day <= daysH; day++) {
        createDay(day); // day is dateH object
    }
}

function createDay(day) {
    let day = document.createElement('div');
    day.className = 'td';
    let datePlace = document.createElement('div');
    datePlace.className = 'date';
    let ot = document.createElement('div');
    ot.className = 'ot';
    ot.textContent = numToOt(day);
    let num = document.createElement('div');
    num.className = 'num';
    datePlace.append(ot, num);
    day.append(datePlace);
    return
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