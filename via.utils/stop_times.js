const readline = require('readline-sync');

function DayDate(/*Number*/hours, /*Number*/mins, /*Number*/secs) {
    this.hours = hours;
    this.mins = mins;
    this.secs = secs;

    this.toGTFSTimeFormat = function() {
        let hoursStr = hours < 10 ? "0" + hours.toString() : hours.toString();
        let minsStr = mins < 10 ? "0" + mins.toString() : mins.toString();
        let secsStr = secs < 10 ? "0" + secs.toString() : secs.toString();

        return hoursStr + ":" + minsStr + ":" + secsStr;
    };
}

function /*DayDate*/ sumDate(/*DayDate*/date, /*DayDate*/toAdd) {

    let newSecs = date.secs + toAdd.secs;
    let newMins = 0;
    let newHours = 0;

    if (newSecs >= 60) {
        newSecs -= 60;
        newMins += 1;
    }

    newMins += (date.mins + toAdd.mins);

    if (newMins >= 60) {
        newMins -= 60;
        newHours += 1;
    }

    newHours += (date.hours + toAdd.hours);

    if (newHours >= 24) {
        newHours -= 24;
    }

    return new DayDate(newHours, newMins, newSecs);
}

function /*DayDate*/ getDateFromString(/*String*/dateStr) {

    let dateElems = dateStr.split(':');

    if (dateElems.length === 2) {
        let hours = parseInt(dateElems[0]);
        let mins = parseInt(dateElems[1]);

        return new DayDate(hours, mins, 0);
    } else if (dateElems.length === 3) {
        let hours = parseInt(dateElems[0]);
        let mins = parseInt(dateElems[1]);
        let secs = parseInt(dateElems[2]);

        return new DayDate(hours, mins, secs);
    } else if (dateElems.length === 1) {
        if (dateStr.includes("m")) {
            let mins = parseInt(dateStr.replace("m", ""));

            if (!Number.isNaN(mins)) {
                return new DayDate(0, mins, 0);
            }
        }
        return new DayDate(0, 0, 0);
    }

}

/*let stopSequenceC-F = ["465", "0m",
    "365", "0m",
    "364", "1m",
    "361", "1m",
    "WID400", "2m",
    "409", "1m",
    "411", "1m",
    "413", "0m",
    "415", "3m",
    "418", "1m",
    "416", "1m",
    "518", "3m",
    "WID401", "2m",
    "385", "1m",
    "387", "1m",
    "389", "1m",
    "391", "1m",
    "393", "1m",
    "310", "0m",
    "262", "1m",
    "311", "2m",
    "427", "1m",
    "428", "1m",
    "429", "0m",
    "430", "1m",
    "WID402", "0m",
    "262", "3m",
    "328", "2m",
    "264", "0m",
    "265", "3m",
    "267", "1m",
    "305", "2m"];*/

//let stopSequence = ["237", "0m", "239", "1m", "241", "0m", "243", "1m", "245", "0m", "247", "2m", "248", "1m", "249", "1m", "251", "1m", "253", "1m", "255", "1m", "456", "1m", "457", "1m", "505", "0m", "435", "0m", "433", "1m", "262", "0m", "311", "1m", "427", "1m", "428", "0m", "429", "1m", "430", "0m", "WID402", "1m", "262", "1m", "499", "2m", "501", "0m", "334", "1m", "294", "1m", "296", "0m", "298", "1m", "300", "0m", "289", "3m", "287", "1m", "285", "0m", "283", "1m", "318", "1m", "320", "1m", "322", "1m", "324", "1m", "462", "0m", "270", "1m", "304", "1m", "305", "0m", "307", "1m", "308", "1m", "309", "0m", "394", "1m", "392", "0m", "390", "1m", "388", "0m", "502", "2m", "417", "2m"];
let stopSequence = ["416", "0m", "385", "2m", "387", "1m", "389", "1m", "391", "1m", "268", "3m", "269", "0m", "271", "1m", "325", "1m", "321", "2m", "319", "1m", "282", "1m", "284", "0m", "286", "0m", "288", "1m", "302", "2m", "301", "1m", "299", "0m", "297", "1m", "295", "0m", "335", "1m", "500", "2m", "311", "2m", "427", "0m", "428", "1m", "429", "0m", "430", "1m", "WID402", "0m", "432", "1m", "434", "0m", "506", "1m", "458", "0m", "456", "0m", "256", "2m", "254", "1m", "252", "1m", "250", "1m", "248", "1m", "247", "1m", "246", "1m", "244", "0m", "241", "0m", "240", "0m", "237", "1m"];


let tripId = readline.question("Trip ID: ");

let firstDateStr = readline.question("Time: ");

if (firstDateStr === "reverse") {
    for (let i = stopSequence.length-1; i >= 0; i -= 2) {
        console.log("\"" + stopSequence[i-1] + "\", \"" + stopSequence[i] + "\"");
    }
    return;
}

let firstDate = getDateFromString(firstDateStr);

for (let i = 0; i < stopSequence.length; i += 2) {
    let diff = getDateFromString(stopSequence[i+1]);
    let stopId = stopSequence[i];

    firstDate = sumDate(firstDate, diff);

    console.log(firstDate.toGTFSTimeFormat() + "," + firstDate.toGTFSTimeFormat() + ",," + stopId + "," + (i/2+1) + ",1," + tripId);
}