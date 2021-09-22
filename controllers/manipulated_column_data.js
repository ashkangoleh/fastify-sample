function column_data_id_2(element) {
    let OctData = [],
        NovData = [],
        SepData = [],
        AugData = [],
        JulData = [],
        JunData = [],
        MayData = [],
        AprData = [],
        MarData = [],
        FebData = [],
        JanData = [],
        DecData = [];

    let manipulatedData = {};
    for (let index = 0; index < element.length; index++) {
        let OctLists = [],
            NovLists = [],
            SepLists = [],
            AugLists = [],
            JulLists = [],
            JunLists = [],
            MayLists = [],
            AprLists = [],
            MarLists = [],
            FebLists = [],
            JanLists = [],
            DecLists = [];
        (element[index][0].indexOf("Oct") !== -1 ? OctLists.unshift(element[index][1]) : 0);
        (element[index][0].indexOf("Nov") !== -1 ? NovLists.unshift(element[index][1]) : 0);
        (element[index][0].indexOf("Sep") !== -1 ? SepLists.unshift(element[index][1]) : 0);
        (element[index][0].indexOf("Aug") !== -1 ? AugLists.unshift(element[index][1]) : 0);
        (element[index][0].indexOf("Jul") !== -1 ? JulLists.unshift(element[index][1]) : 0);
        (element[index][0].indexOf("Jun") !== -1 ? JunLists.unshift(element[index][1]) : 0);
        (element[index][0].indexOf("May") !== -1 ? MayLists.unshift(element[index][1]) : 0);
        (element[index][0].indexOf("Apr") !== -1 ? AprLists.unshift(element[index][1]) : 0);
        (element[index][0].indexOf("Mar") !== -1 ? MarLists.unshift(element[index][1]) : 0);
        (element[index][0].indexOf("Feb") !== -1 ? FebLists.unshift(element[index][1]) : 0);
        (element[index][0].indexOf("Jan") !== -1 ? JanLists.unshift(element[index][1]) : 0);
        (element[index][0].indexOf("Dec") !== -1 ? DecLists.unshift(element[index][1]) : 0);

        OctData.unshift(OctLists[0]);
        NovData.unshift(NovLists[0]);
        DecData.unshift(DecLists[0]);
        JanData.unshift(JanLists[0]);
        SepData.unshift(SepLists[0]);
        AugData.unshift(AugLists[0]);
        JulData.unshift(JulLists[0]);
        JunData.unshift(JunLists[0]);
        MayData.unshift(MayLists[0]);
        AprData.unshift(AprLists[0]);
        MarData.unshift(MarLists[0]);
        FebData.unshift(FebLists[0]);
    }
    manipulatedData["Oct"] = OctData;
    manipulatedData["Nov"] = NovData;
    manipulatedData["Dec"] = DecData;
    manipulatedData["Jan"] = JanData;
    manipulatedData["Feb"] = FebData;
    manipulatedData["Mar"] = MarData;
    manipulatedData["Apr"] = AprData;
    manipulatedData["May"] = MayData;
    manipulatedData["Jun"] = JunData;
    manipulatedData["Jul"] = JulData;
    manipulatedData["Aug"] = AugData;
    manipulatedData["Sep"] = SepData;
    let finalData = {};
    for (const iterator in manipulatedData) {
        let lists = [];
        for (const i of manipulatedData[iterator]) {
            if (i !== undefined) {
                lists.unshift(i);
            }

            finalData[iterator] = lists;
        }
    }
    let result = {};
    for (const iterator in finalData) {
        let last_index = finalData[iterator][finalData[iterator].length - 1];
        let first_index = finalData[iterator].splice(0, 1)[0];
        result[iterator] = ((last_index - first_index) / first_index) * 100;
    }
    return result;
}

module.exports = column_data_id_2;