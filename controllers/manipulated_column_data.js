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


// // history of manupulated data in controllers body
// const column_data_id_2 = require('./manipulated_column_data')
//
// function one_year_ago() {
//     return new Date(
//         new Date().setFullYear(
//             new Date().getFullYear() - 1,
//             new Date().getMonth() + 1, 1
//         )
//     ).getTime().toLocaleString().split(",").join('');
// }
//
// function nowDateLive() {
//     return new Date().getTime().toLocaleString().split(",").join('');
// }
//
//
// // sort function for duplicate indexes
// const uniqSort = (arr = []) => {
//     const map = {};
//     const res = [];
//     for (let i = 0; i < arr.length; i++) {
//         if (!map[arr[i]]) {
//             map[arr[i]] = true;
//             res.push(arr[i]);
//         }
//     }
//     return res.sort((a, b) => a - b);
// };
// // end of line sort function for duplicate indexes
//
// const periodHistoryAmount = async (request, response) => {
//     const historyUrl = `https://api.arzdigital.com/history/?gethistory=2&from=${one_year_ago()}&to=${nowDateLive()}`;
//     const history = await axios.get(historyUrl);
//     let data = history.data["price"];
//     let modify_data = [];
//     let date_check = [];
//     let modify_duplicate_result = [];
//     let semi_final_result = [];
//     data.forEach((element) => {
//         if (element[0] > one_year_ago()) {
//             modify_data.push(element);
//             modify_data.forEach((element) => {
//                 const Day = new Date(element[0]).toUTCString();
//                 const fullTimeCheck = Day.split(" ")[1] + Day.split(" ")[2];
//                 date_check.push(fullTimeCheck, element[1]);
//             });
//         }
//     });
//     const sorter = uniqSort(date_check);
//     modify_duplicate_result.push(sorter);
//     let start = 0;
//     let end = 1;
//     while (1) {
//         if (modify_duplicate_result[0][start] != null) {
//             semi_final_result.push([
//                 modify_duplicate_result[0][start],
//                 modify_duplicate_result[0][end],
//             ]);
//             start += 2;
//             end += 2;
//         } else {
//             break;
//         }
//     }
//     const finalData = column_data_id_2(semi_final_result)
//     response.code(200).send({
//         'status': 'success',
//         data: finalData,
//     });
// };
// // history of manupulated data in controllers body