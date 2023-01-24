const db = require('./connection');
const { User } = require('../models');

db.once('open', async () => {
    //await User.deleteMany()

    const userInfo = User.insertMany([{
        username: "test2",
        email: "test2@gmail.com",
        password: "Int3rn3t",
        budgetEvents: [
            {
                eventTitle: "",
                eventValue: "",
                eventType: "",
                eventFrequency: [
                        {
                            eventTitle: "Pure Storage 1",
                            eventValue: "2750",
                            eventType: "income",
                            eventFrequency: [
                                {
                                    frequency: "monthly",
                                    isSameDay: "sameDay",
                                    countWeekends: "preWeekends",
                                    hasCustom: false,
                                    nValue: null,
                                    nUnit: null,
                                    day: "15",
                                    month: null
                                }
                            ],
                            vitalEvent: true,
                            eventCategory: "other",
                            totalEventValue: "",
                            eventAPR: "",
                            eventDate: "1676484342000",
                            iouInfo: []
                        },
                        {
                            eventTitle: "Pure Storage 2",
                            eventValue: "2750",
                            eventType: "income",
                            eventFrequency: [
                                {
                                    frequency: "monthly",
                                    isSameDay: "lastDay",
                                    countWeekends: "preWeekends",
                                    hasCustom: false,
                                    nValue: null,
                                    nUnit: null,
                                    day: "31",
                                    month: null
                                }
                            ],
                            vitalEvent: true,
                            eventCategory: "other",
                            totalEventValue: "",
                            eventAPR: "",
                            eventDate: "1675188447000",
                            iouInfo: []
                        },
                        {
                            eventTitle: "Mortgage",
                            eventValue: "1508.01",
                            eventType: "expense",
                            eventFrequency: [
                                {
                                    frequency: "monthly",
                                    isSameDay: "sameDay",
                                    countWeekends: "ignore",
                                    hasCustom: false,
                                    nValue: null,
                                    nUnit: null,
                                    day: "1",
                                    month: null
                                }
                            ],
                            vitalEvent: false,
                            eventCategory: "commercial",
                            totalEventValue: "",
                            eventAPR: "",
                            eventDate: "1675311801000",
                            iouInfo: []
                        },
                        {
                            eventTitle: "Abuelo Payback",
                            eventValue: "820.82",
                            eventType: "income",
                            eventFrequency: [
                                {
                                    frequency: "monthly",
                                    isSameDay: "sameDay",
                                    countWeekends: "ignore",
                                    hasCustom: false,
                                    nValue: null,
                                    nUnit: null,
                                    day: "11",
                                    month: null
                                }
                            ],
                            vitalEvent: false,
                            eventCategory: "other",
                            totalEventValue: "",
                            eventAPR: "",
                            eventDate: "1676182179000",
                            iouInfo: [
                                {
                                    iouTitle: "Honda CRV",
                                    iouValue: "584.41",
                                    iouPaid: false
                                },
                                {
                                    iouTitle: "Insurance 2 Cars",
                                    iouValue: "84",
                                    iouPaid: false
                                },
                                {
                                    iouTitle: "Internet",
                                    iouValue: "30",
                                    iouPaid: false
                                },
                                {
                                    iouTitle: "Phones",
                                    iouValue: "85",
                                    iouPaid: false
                                },
                                {
                                    iouTitle: "iPad Payment",
                                    iouValue: "37.41",
                                    iouPaid: false
                                }
                            ]
                        },
                        {
                            eventTitle: "Rox Payback",
                            eventValue: "36.00",
                            eventType: "income",
                            eventFrequency: [
                                {
                                    frequency: "monthly",
                                    isSameDay: "sameDay",
                                    countWeekends: "ignore",
                                    hasCustom: false,
                                    nValue: null,
                                    nUnit: null,
                                    day: "11",
                                    month: null
                                }
                            ],
                            vitalEvent: false,
                            eventCategory: "payback",
                            totalEventValue: "",
                            eventAPR: "",
                            eventDate: "1676182765000",
                            iouInfo: [
                                {
                                    iouTitle: "Apple Watch ATT",
                                    iouValue: "36",
                                    iouPaid: false
                                }
                            ]
                        },
                        {
                            eventTitle: "Matthew Payback",
                            eventValue: "303.48",
                            eventType: "income",
                            eventFrequency: [
                                {
                                    frequency: "monthly",
                                    isSameDay: "sameDay",
                                    countWeekends: "ignore",
                                    hasCustom: false,
                                    nValue: null,
                                    nUnit: null,
                                    day: "15",
                                    month: null
                                }
                            ],
                            vitalEvent: false,
                            eventCategory: "payback",
                            totalEventValue: "",
                            eventAPR: "",
                            eventDate: "1676528492000",
                            iouInfo: [
                                {
                                    iouTitle: "Web Classes",
                                    iouValue: "239.48",
                                    iouPaid: false
                                },
                                {
                                    iouTitle: "Insurance 2 cars",
                                    iouValue: "64",
                                    iouPaid: false
                                }
                            ]
                        },
                        {
                            eventTitle: "HOA",
                            eventValue: "92",
                            eventType: "expense",
                            eventFrequency: [
                                {
                                    frequency: "monthly",
                                    isSameDay: "sameDay",
                                    countWeekends: "ignore",
                                    hasCustom: false,
                                    nValue: null,
                                    nUnit: null,
                                    day: "1",
                                    month: null
                                }
                            ],
                            vitalEvent: false,
                            eventCategory: "commercial",
                            totalEventValue: "",
                            eventAPR: "",
                            eventDate: "1675319300000",
                            iouInfo: []
                        },
                        {
                            eventTitle: "Youtube Premium",
                            eventValue: "22.99",
                            eventType: "expense",
                            eventFrequency: [
                                {
                                    frequency: "monthly",
                                    isSameDay: "sameDay",
                                    countWeekends: "ignore",
                                    hasCustom: false,
                                    nValue: null,
                                    nUnit: null,
                                    day: "23",
                                    month: null
                                }
                            ],
                            vitalEvent: false,
                            eventCategory: "subscription",
                            totalEventValue: "",
                            eventAPR: "",
                            eventDate: "1674541819000",
                            iouInfo: []
                        },
                        {
                            eventTitle: "Pandora Premium",
                            eventValue: "14.99",
                            eventType: "expense",
                            eventFrequency: [
                                {
                                    frequency: "monthly",
                                    isSameDay: "sameDay",
                                    countWeekends: "ignore",
                                    hasCustom: false,
                                    nValue: null,
                                    nUnit: null,
                                    day: "23",
                                    month: null
                                }
                            ],
                            vitalEvent: false,
                            eventCategory: "subscription",
                            totalEventValue: "",
                            eventAPR: "",
                            eventDate: "1674541868000",
                            iouInfo: []
                        },
                        {
                            eventTitle: "Wells Fargo CC",
                            eventValue: "116",
                            eventType: "expense",
                            eventFrequency: [
                                {
                                    frequency: "monthly",
                                    isSameDay: "sameDay",
                                    countWeekends: "ignore",
                                    hasCustom: false,
                                    nValue: null,
                                    nUnit: null,
                                    day: "2",
                                    month: null
                                }
                            ],
                            vitalEvent: false,
                            eventCategory: "credit",
                            totalEventValue: "7410.22",
                            eventAPR: "",
                            eventDate: "1675350389000",
                            iouInfo: []
                        },
                        {
                            eventTitle: "Web Dev Classes",
                            eventValue: "478.96",
                            eventType: "expense",
                            eventFrequency: [
                                {
                                    frequency: "monthly",
                                    isSameDay: "sameDay",
                                    countWeekends: "ignore",
                                    hasCustom: false,
                                    nValue: null,
                                    nUnit: null,
                                    day: "15",
                                    month: null
                                }
                            ],
                            vitalEvent: false,
                            eventCategory: "payments",
                            totalEventValue: "",
                            eventAPR: "",
                            eventDate: "1676473674000",
                            iouInfo: []
                        },
                        {
                            eventTitle: "Water/trash",
                            eventValue: "98",
                            eventType: "expense",
                            eventFrequency: [
                                {
                                    frequency: "monthly",
                                    isSameDay: "lastDay",
                                    countWeekends: "ignore",
                                    hasCustom: false,
                                    nValue: null,
                                    nUnit: null,
                                    day: "31",
                                    month: null
                                }
                            ],
                            vitalEvent: false,
                            eventCategory: "utilities",
                            totalEventValue: "",
                            eventAPR: "",
                            eventDate: "1675177751000",
                            iouInfo: []
                        },
                        {
                            eventTitle: "Internet",
                            eventValue: "150",
                            eventType: "expense",
                            eventFrequency: [
                                {
                                    frequency: "monthly",
                                    isSameDay: "lastDay",
                                    countWeekends: "ignore",
                                    hasCustom: false,
                                    nValue: null,
                                    nUnit: null,
                                    day: "31",
                                    month: null
                                }
                            ],
                            vitalEvent: false,
                            eventCategory: "utilities",
                            totalEventValue: "",
                            eventAPR: "",
                            eventDate: "1675177803000",
                            iouInfo: []
                        },
                        {
                            eventTitle: "Electricity",
                            eventValue: "100",
                            eventType: "expense",
                            eventFrequency: [
                                {
                                    frequency: "monthly",
                                    isSameDay: "sameDay",
                                    countWeekends: "ignore",
                                    hasCustom: false,
                                    nValue: null,
                                    nUnit: null,
                                    day: "15",
                                    month: null
                                }
                            ],
                            vitalEvent: false,
                            eventCategory: "utilities",
                            totalEventValue: "",
                            eventAPR: "",
                            eventDate: "1676473884000",
                            iouInfo: []
                        },
                        {
                            eventTitle: "Good Leap (solar)",
                            eventValue: "122.82",
                            eventType: "expense",
                            eventFrequency: [
                                {
                                    frequency: "monthly",
                                    isSameDay: "sameDay",
                                    countWeekends: "ignore",
                                    hasCustom: false,
                                    nValue: null,
                                    nUnit: null,
                                    day: "2",
                                    month: null
                                }
                            ],
                            vitalEvent: false,
                            eventCategory: "payments",
                            totalEventValue: "",
                            eventAPR: "",
                            eventDate: "1675350733000",
                            iouInfo: []
                        },
                        {
                            eventTitle: "Capital One Quicksilver David",
                            eventValue: "150",
                            eventType: "expense",
                            eventFrequency: [
                                {
                                    frequency: "monthly",
                                    isSameDay: "sameDay",
                                    countWeekends: "ignore",
                                    hasCustom: false,
                                    nValue: null,
                                    nUnit: null,
                                    day: "17",
                                    month: null
                                }
                            ],
                            vitalEvent: false,
                            eventCategory: "credit",
                            totalEventValue: "2868.44",
                            eventAPR: "27.99",
                            eventDate: "1676646844000",
                            iouInfo: []
                        },
                        {
                            eventTitle: "Capital One Platinum",
                            eventValue: "103",
                            eventType: "expense",
                            eventFrequency: [
                                {
                                    frequency: "monthly",
                                    isSameDay: "sameDay",
                                    countWeekends: "ignore",
                                    hasCustom: false,
                                    nValue: null,
                                    nUnit: null,
                                    day: "20",
                                    month: null
                                }
                            ],
                            vitalEvent: false,
                            eventCategory: "credit",
                            totalEventValue: "3409.64",
                            eventAPR: "24.49",
                            eventDate: "1674227747000",
                            iouInfo: []
                        },
                        {
                            eventTitle: "Honda Odyssey 2021",
                            eventValue: "485.44",
                            eventType: "expense",
                            eventFrequency: [
                                {
                                    frequency: "monthly",
                                    isSameDay: "sameDay",
                                    countWeekends: "ignore",
                                    hasCustom: false,
                                    nValue: null,
                                    nUnit: null,
                                    day: "15",
                                    month: null
                                }
                            ],
                            vitalEvent: false,
                            eventCategory: "commercial",
                            totalEventValue: "32586.35",
                            eventAPR: "",
                            eventDate: "1676481091000",
                            iouInfo: []
                        },
                        {
                            eventTitle: "ATT",
                            eventValue: "36",
                            eventType: "expense",
                            eventFrequency: [
                                {
                                    frequency: "monthly",
                                    isSameDay: "sameDay",
                                    countWeekends: "ignore",
                                    hasCustom: false,
                                    nValue: null,
                                    nUnit: null,
                                    day: "21",
                                    month: null
                                }
                            ],
                            vitalEvent: false,
                            eventCategory: "payments",
                            totalEventValue: "",
                            eventAPR: "",
                            eventDate: "1674321167000",
                            iouInfo: []
                        },
                        {
                            eventTitle: "Maryfer Citi Costco card",
                            eventValue: "123.46",
                            eventType: "expense",
                            eventFrequency: [
                                {
                                    frequency: "monthly",
                                    isSameDay: "sameDay",
                                    countWeekends: "ignore",
                                    hasCustom: false,
                                    nValue: null,
                                    nUnit: null,
                                    day: "16",
                                    month: null
                                }
                            ],
                            vitalEvent: false,
                            eventCategory: "credit",
                            totalEventValue: "4937.44",
                            eventAPR: "18.99",
                            eventDate: "1676567628000",
                            iouInfo: []
                        },
                        {
                            eventTitle: "Car Insurance",
                            eventValue: "206",
                            eventType: "expense",
                            eventFrequency: [
                                {
                                    frequency: "monthly",
                                    isSameDay: "sameDay",
                                    countWeekends: "ignore",
                                    hasCustom: false,
                                    nValue: null,
                                    nUnit: null,
                                    day: "16",
                                    month: null
                                }
                            ],
                            vitalEvent: false,
                            eventCategory: "other",
                            totalEventValue: "",
                            eventAPR: "",
                            eventDate: "1676567724000",
                            iouInfo: []
                        },
                        {
                            eventTitle: "Nord VPN",
                            eventValue: "89",
                            eventType: "expense",
                            eventFrequency: [
                                {
                                    frequency: "other",
                                    isSameDay: null,
                                    countWeekends: "ignore",
                                    hasCustom: true,
                                    nValue: "3",
                                    nUnit: "years",
                                    day: "14",
                                    month: null
                                }
                            ],
                            vitalEvent: false,
                            eventCategory: "subscription",
                            totalEventValue: "",
                            eventAPR: "",
                            eventDate: "1697300175000",
                            iouInfo: []
                        },
                        {
                            eventTitle: "Gas",
                            eventValue: "100",
                            eventType: "expense",
                            eventFrequency: [
                                {
                                    frequency: "monthly",
                                    isSameDay: "sameDay",
                                    countWeekends: "ignore",
                                    hasCustom: false,
                                    nValue: null,
                                    nUnit: null,
                                    day: "15",
                                    month: null
                                }
                            ],
                            vitalEvent: false,
                            eventCategory: "utilities",
                            totalEventValue: "",
                            eventAPR: "",
                            eventDate: "1676481443000",
                            iouInfo: []
                        },
                        {
                            eventTitle: "Amazon Prime",
                            eventValue: "139",
                            eventType: "expense",
                            eventFrequency: [
                                {
                                    frequency: "yearly",
                                    isSameDay: "sameDay",
                                    countWeekends: "ignore",
                                    hasCustom: false,
                                    nValue: null,
                                    nUnit: null,
                                    day: "25",
                                    month: "5"
                                }
                            ],
                            vitalEvent: false,
                            eventCategory: "subscription",
                            totalEventValue: "",
                            eventAPR: "",
                            eventDate: "1687709898000",
                            iouInfo: []
                        },
                        {
                            eventTitle: "Honda CRV",
                            eventValue: "584.41",
                            eventType: "expense",
                            eventFrequency: [
                                {
                                    frequency: "monthly",
                                    isSameDay: "sameDay",
                                    countWeekends: "ignore",
                                    hasCustom: false,
                                    nValue: null,
                                    nUnit: null,
                                    day: "15",
                                    month: null
                                }
                            ],
                            vitalEvent: false,
                            eventCategory: "payments",
                            totalEventValue: "27657.78",
                            eventAPR: "",
                            eventDate: "1676481585000",
                            iouInfo: []
                        },
                        {
                            eventTitle: "Tithing",
                            eventValue: "552",
                            eventType: "expense",
                            eventFrequency: [
                                {
                                    frequency: "monthly",
                                    isSameDay: "sameDay",
                                    countWeekends: "ignore",
                                    hasCustom: false,
                                    nValue: null,
                                    nUnit: null,
                                    day: "1",
                                    month: null
                                }
                            ],
                            vitalEvent: true,
                            eventCategory: "other",
                            totalEventValue: "",
                            eventAPR: "",
                            eventDate: "1675272053000",
                            iouInfo: []
                        },
                        {
                            eventTitle: "T-Mobile",
                            eventValue: "220",
                            eventType: "expense",
                            eventFrequency: [
                                {
                                    frequency: "monthly",
                                    isSameDay: "sameDay",
                                    countWeekends: "ignore",
                                    hasCustom: false,
                                    nValue: null,
                                    nUnit: null,
                                    day: "17",
                                    month: null
                                }
                            ],
                            vitalEvent: false,
                            eventCategory: "commercial",
                            totalEventValue: "",
                            eventAPR: "",
                            eventDate: "1676654524000",
                            iouInfo: []
                        },
                        {
                            eventTitle: "MACU CC",
                            eventValue: "36",
                            eventType: "expense",
                            eventFrequency: [
                                {
                                    frequency: "monthly",
                                    isSameDay: "lastDay",
                                    countWeekends: "ignore",
                                    hasCustom: false,
                                    nValue: null,
                                    nUnit: null,
                                    day: "31",
                                    month: null
                                }
                            ],
                            vitalEvent: false,
                            eventCategory: "credit",
                            totalEventValue: "1455.76",
                            eventAPR: "14.74",
                            eventDate: "1675185777000",
                            iouInfo: []
                        },
                        {
                            eventTitle: "Camilla Art class",
                            eventValue: "60",
                            eventType: "expense",
                            eventFrequency: [
                                {
                                    frequency: "monthly",
                                    isSameDay: "sameDay",
                                    countWeekends: "ignore",
                                    hasCustom: false,
                                    nValue: null,
                                    nUnit: null,
                                    day: "1",
                                    month: null
                                }
                            ],
                            vitalEvent: false,
                            eventCategory: "other",
                            totalEventValue: "",
                            eventAPR: "",
                            eventDate: "1675272243000",
                            iouInfo: []
                        },
                        {
                            eventTitle: "William School",
                            eventValue: "115",
                            eventType: "expense",
                            eventFrequency: [
                                {
                                    frequency: "monthly",
                                    isSameDay: "sameDay",
                                    countWeekends: "ignore",
                                    hasCustom: false,
                                    nValue: null,
                                    nUnit: null,
                                    day: "1",
                                    month: null
                                }
                            ],
                            vitalEvent: false,
                            eventCategory: "other",
                            totalEventValue: "",
                            eventAPR: "",
                            eventDate: "1675272278000",
                            iouInfo: []
                        },
                        {
                            eventTitle: "Maryfer Capital One",
                            eventValue: "44",
                            eventType: "expense",
                            eventFrequency: [
                                {
                                    frequency: "monthly",
                                    isSameDay: "sameDay",
                                    countWeekends: "ignore",
                                    hasCustom: false,
                                    nValue: null,
                                    nUnit: null,
                                    day: "20",
                                    month: null
                                }
                            ],
                            vitalEvent: false,
                            eventCategory: "credit",
                            totalEventValue: "1436",
                            eventAPR: "27.24",
                            eventDate: "1674247197000",
                            iouInfo: []
                        },
                        {
                            eventTitle: "Bills",
                            eventValue: "34",
                            eventType: "expense",
                            eventFrequency: [
                                {
                                    frequency: "once",
                                    isSameDay: null,
                                    countWeekends: "ignore",
                                    hasCustom: false,
                                    nValue: null,
                                    nUnit: null,
                                    day: "12",
                                    month: null
                                }
                            ],
                            vitalEvent: false,
                            eventCategory: "credit",
                            totalEventValue: "",
                            eventAPR: "",
                            eventDate: "1673579330000",
                            iouInfo: []
                        }
                    ],
                vitalEvent: false,
                eventCategory: "",
                totalEventValue: "",
                eventAPR: "",
                eventDate: "",
                iouInfo: []
            }
        ],
        histEvents: [],
        bankAccounts: [],
    }])
    process.exit();
});

console.log("user Seeded")