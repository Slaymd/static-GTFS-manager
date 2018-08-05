const readline = require('readline-sync');
const lineByLine = require('line-by-line');

let stopfile = readline.question("Stop file: ");

const lr = new lineByLine(stopfile);

let stations = [];
let bannedIds = [];
let index = 0;

lr.on('line', function (line) {
    if (index > 0) {
        let stopSplt = line.split(',');

        stations.push(stopSplt);
    }
    index += 1;
});

lr.on('end', function () {

    console.log("stop_id,stop_lat,stop_lon,stop_name,wheelchair_boarding,location_type,parent_station");

    for (let stationsIndex = 0; stationsIndex < stations.length; stationsIndex++) {
        let station = stations[stationsIndex];

        let stop_id = station[0];
        let stop_lat = station[1];
        let stop_lon = station[2];
        let stop_name = station[3];
        let wheelchair_boarding = station[4];

        if (bannedIds.includes(stop_id))
            continue;

        let filtred = stations.filter(el => el[3] === stop_name);

        let station_id = "SZ" + stationsIndex.toString();

        console.log(station_id + "," + stop_lat + "," + stop_lon + "," + stop_name + "," + wheelchair_boarding + ",1,");

        for (let i = 0; i < filtred.length; i++) {

            let fstop_id = filtred[i][0];
            let fstop_lat = filtred[i][1];
            let fstop_lon = filtred[i][2];
            let fstop_name = filtred[i][3];
            let fwheelchair_boarding = filtred[i][4];

            bannedIds.push(fstop_id);

            console.log(fstop_id + "," + fstop_lat + "," + fstop_lon + "," + fstop_name + "," + fwheelchair_boarding + ",0," + station_id);

        }
    }
});