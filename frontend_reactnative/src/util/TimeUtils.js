import { DAY } from '../constants';

export const getServiceTimeDateObject = (serviceTime) => {
    const now = new Date();

    let startYear, startMonth, startDay, startHour, startMinute;
    let endYear, endMonth, endDay, endHour, endMinute;

    if(serviceTime.startD === "오늘" || serviceTime.startD === "내일") {
        startYear = now.getFullYear();
    } else startYear = serviceTime.startD.substr(0, 4);
    if(serviceTime.endD === "오늘" || serviceTime.endD === "내일") {
        endYear = now.getFullYear();
    } else endYear = serviceTime.endD.substr(0, 4);

    if(serviceTime.startD === "오늘" || serviceTime.startD === "내일") {
        startMonth = now.getMonth() + 1;
        if(startMonth.toString().length === 1) startMonth = '0' + startMonth;
    } else startMonth = serviceTime.startD.substr(5, 2);
    if(serviceTime.endD === "오늘" || serviceTime.endD === "내일") {
        endMonth = now.getMonth() + 1;
        if(endMonth.toString().length === 1) endMonth = '0' + endMonth;
    } else endMonth = serviceTime.endD.substr(5, 2);

    if(serviceTime.startD === "오늘") {
        startDay = now.getDate();
        if(startDay.toString().length === 1) startDay = '0' + startDay;
    } else if (serviceTime.startD === "내일") {
        startDay = now.getDate() + 1;
        if(startDay.toString().length === 1) startDay = '0' + startDay;
    }
    else startDay = serviceTime.startD.substr(10, 2);
    if(serviceTime.endD === "오늘") {
        endDay = now.getDate();
        if(endDay.toString().length === 1) endDay = '0' + endDay;
    } else if (serviceTime.endD === "내일") {
        endDay = now.getDate() + 1;
        if(endDay.toString().length === 1) endDay = '0' + endDay;
    } else endDay = serviceTime.endD.substr(10, 2);

    startHour = serviceTime.startH;
    endHour = serviceTime.endH;

    startMinute = serviceTime.startM;
    endMinute = serviceTime.endM;

    // console.log("TimeUtils, 2")
    // console.log(startYear, startMonth, startDay, startHour, startMinute);
    // console.log(endYear, endMonth, endDay, endHour, endMinute);

    const _now = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes()));
    const serviceStartTime = new Date(Date.UTC(parseInt(startYear), parseInt(startMonth)-1, parseInt(startDay), parseInt(startHour), parseInt(startMinute)));
    const serviceEndTime = new Date(Date.UTC(parseInt(endYear), parseInt(endMonth)-1, parseInt(endDay), parseInt(endHour), parseInt(endMinute)));
    // console.log(serviceStartTime);
    // console.log(serviceEndTime);

    return { now: _now, serviceStartTime, serviceEndTime };
}

export const calcServiceTime = (serviceTime) => {
    const dateObject = getServiceTimeDateObject(serviceTime);
    let dateDiff = dateObject.serviceEndTime - dateObject.serviceStartTime;

    const day = !parseInt(dateDiff / 86400000) ? `` : `${parseInt(dateDiff / 86400000)}일 `;
    dateDiff = dateDiff % 86400000;
    const hour = !parseInt(dateDiff / 3600000) ? `` : `${parseInt(dateDiff / 3600000)}시간 `;
    dateDiff = dateDiff % 3600000;
    const minute = !parseInt(dateDiff / 60000) ? `` : `${parseInt(dateDiff /= 60000)}분`;

    return `${day}${hour}${minute}`;
}

export const calcServiceTimeToMinute = (serviceTime) => {
    const dateObject = getServiceTimeDateObject(serviceTime);
    let dateDiff = dateObject.serviceEndTime - dateObject.serviceStartTime;
    return dateDiff / 60000;
}

export const transferToUriDate = (date) => {
    const now = new Date();
    const dateArr = date.split(' ');
    let Year = dateArr[0], Month = dateArr[1], Day = dateArr[3];
    if(Year === "오늘") {
        Year = now.getFullYear();
        Month = now.getMonth() + 1;
        Day = now.getDate();
    } else if(Year === "내일") {
        Year = now.getFullYear();
        Month = now.getMonth() + 1;
        Day = now.getDate() + 1;
    }
    return `${Year}-${Month}-${Day}`;
}

export const getDefaultServiceTime = () => {
    let currentHour = new Date().getHours();

    let startH = (currentHour + 1) % 24;
    if(startH .toString().length === 1) {
        startH  = '0' + startH ;
    }
    let startD = (currentHour + 1) >= 24 ? '내일' : '오늘';

    let EndH = (currentHour + 3) % 24;
    if(EndH .toString().length === 1) {
        EndH  = '0' + EndH ;
    }
    let EndD = (currentHour + 3) >= 24 ? '내일' : '오늘';

    return {
        startD: startD,
        startH: startH,
        startM: '00',
        endD: EndD,
        endH: EndH,
        endM: '00',
    }
}

export const transformUTCToDateJson = (UTCTime) => {
    // UTCTime Example: "2020-11-24T23:00:00.000+0000"
    const _UTCTime = new Date(UTCTime);
    let dayOfWeek = DAY[_UTCTime.getDay()],
        day = _UTCTime.getDate(),
        month = _UTCTime.getMonth() + 1,
        year = _UTCTime.getFullYear();
    if(day.toString().length == 1) day = '0' + day;
    if(month.toString().length == 1) month = '0' + month;

    const ret = {
        D: `${year} ${month} / ${day} (${dayOfWeek})`,
        H: `${UTCTime.substr(11, 2)}`,
        M: `${UTCTime.substr(14, 2)}`,
    };

    const now = new Date();

    if(now.getFullYear() === parseInt(year) && now.getMonth()+1 === parseInt(month)) {
        if(now.getDate() === parseInt(day)) {
            ret.D = "오늘";
        } else if (now.getDate() + 1 === parseInt(day)) {
            ret.D = "내일";
        }
    }

    return ret;
}

export const isEqual = (originDate, newDate) => {
    // // 둘 다 NULL 인 경우 같다.
    // if(!originDate && !newDate) {
    //     return true;
    // }
    // // originDate 만 NULL 일 경우 같지 않다.
    // if(!originDate && newDate) {
    //     return false;
    // }
    // // 둘 다 NULL 이 아닌 경우 같은지 확인한다.
    // if(originDate.startD === newDate.startD &&
    //     originDate.startH === newDate.startH &&
    //     originDate.startM === newDate.startM &&
    //     originDate.endD === originDate.endD &&
    //     originDate.endH === originDate.endH &&
    //     originDate.endM === originDate.endM) {
    //     return true;
    // }
    // // 그 외의 경우에는 같지 않다.
    // return false;

    if(!originDate) originDate = {};
    if(!newDate) newDate = {};
    if(JSON.stringify(originDate) === JSON.stringify(newDate)) {
        return true;
    } else return false;
}
