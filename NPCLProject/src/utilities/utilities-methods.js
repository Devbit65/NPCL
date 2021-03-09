
export const SCREENTYPE = {
    FORGETPASSWORD : "FORGETPASSWORD",
    SETNEWPASSWORD : "SETNEWPASSWORD",
    VERIFYOTP : "VERIFYOTP",
    CHANGEPASSWORD : "CHANGEPASSWORD"
} 

export function getSideMenu(willAddEVCD) {
    var sideMenuArray = [
        {
            title:"OVERVIEW",
            image:require("../resources/overview.png"),
            selImage:require("../resources/overview1.png"),
        },
        {
            title:"RECHARGE",
            image:require("../resources/recharge.png"),
            selImage:require("../resources/recharge1.png"),
        },
        {
            title:"REPORT",
            image:require("../resources/report.png"),
            selImage:require("../resources/report1.png"),
        },
        {
            title:"SETTINGS",
            image:require("../resources/setting.png"),
            selImage:require("../resources/setting1.png"),
        },
        {
            title:"PROFILE",
            image:require("../resources/icon.png"),
            selImage:require("../resources/icon.png"),
        },
        {
            title:"NOTICE",
            image:require("../resources/notification.png"),
            selImage:require("../resources/notification1.png"),
        },
        {
            title:"EVENT-LOG",
            image:require("../resources/DG.png"),
            selImage:require("../resources/DG1.png"),
        },
    ]

    if(willAddEVCD) {
        var evceMenuItem =  {
                                title:"EVCD",
                                image:require("../resources/EV.png"),
                                selImage:require("../resources/EV.png"),
                            }

        sideMenuArray.splice(1, 0, evceMenuItem)
    }

    return sideMenuArray
}