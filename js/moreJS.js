function createDay(day) {
    let day = document.createElement('div');
    day.className = 'td';
    let datePlace = document.createElement('div');
    datePlace.className = 'date';
    let ot = document.createElement('div');
    ot.className = 'ot';
    ot.textContent = numToHe(day);
    let num = document.createElement('div');
    num.className = 'num';
    datePlace.append(ot, num);
    day.append(datePlace);
    return day;
}