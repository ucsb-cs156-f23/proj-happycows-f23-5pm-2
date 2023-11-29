const commonsFixtures = {
    threeCommons: [
        {
            "id": 5,
            "name": "Seths Common",
            "day": 5,
            "startingDate": "2022-03-05T15:50:10",
            "startingBalance": 1200.10,
            "totalPlayers": 50,
            "cowPrice": 15,
            "milkPrice": 10,
            "degradationRate": .5,
            "showLeaderboard": true,
            "capacityPerUser": 10,
            "carryingCapacity": 100,
            "effectiveCapacity": 500,
            "belowCapacityHealthUpdateStrategy": "Noop",
            "aboveCapacityHealthUpdateStrategy": "Noop"
        },
        {
            "id": 4,
            "name": "Kevin's Commons",
            "day": 5,
            "startingDate": "2012-03-05T15:50:10",
            "startingBalance": 100.50,
            "totalPlayers": 50,
            "cowPrice": 15,
            "milkPrice": 10,
            "degradationRate": .5,
            "showLeaderboard": true,
            "capacityPerUser": 11,
            "carryingCapacity": 123,
            "effectiveCapacity": 550,
            "belowCapacityHealthUpdateStrategy": "Linear",
            "aboveCapacityHealthUpdateStrategy": "Linear"
        },
        {
            "id": 1,
            "name": "Anika's Commons",
            "day": 5,
            "startingDate": "2026-03-05T15:50:10",
            "startingBalance": 200.50,
            "totalPlayers": 50,
            "cowPrice": 15,
            "milkPrice": 10,
            "degradationRate": .5,
            "showLeaderboard": true,
            "capacityPerUser": 13,
            "carryingCapacity": 42,
            "effectiveCapacity": 650,
            "belowCapacityHealthUpdateStrategy": "Constant",
            "aboveCapacityHealthUpdateStrategy": "Linear"
        }
    ],
    oneCommons:
        [
            {
                "id": 1,
                "name": "Anika's Commons",
                "day": 5,
                "startingDate": "2025-03-05T15:50:10",
                "startingBalance": 2000.50,
                "totalPlayers": 50,
                "cowPrice": 15,
                "milkPrice": 10,
                "degradationRate": .5,
                "showLeaderboard": true,
                "capacityPerUser": 5,
                "carryingCapacity": 314,
                "effectiveCapacity": 314,
                "belowCapacityHealthUpdateStrategy": "Constant",
                "aboveCapacityHealthUpdateStrategy": "Linear"
            }
        ],

    sevenCommons: [
        {
            "id": 10,
            "name": "Seths Commons",
            "day": 5,
            "totalPlayers": 50,
            "cowPrice": 15,
            "degradationRate": .5,
            "showLeaderboard": true,
            "capacityPerUser": 1,
            "carryingCapacity": 100,
            "effectiveCapacity": 100,
            "belowCapacityHealthUpdateStrategy": "Constant",
            "aboveCapacityHealthUpdateStrategy": "Linear"
        },
        {
            "id": 8,
            "name": "Kevin's Commons",
            "day": 5,
            "totalPlayers": 50,
            "cowPrice": 15,
            "degradationRate": .5,
            "showLeaderboard": true,
            "capacityPerUser": 5,
            "carryingCapacity": 100,
            "effectiveCapacity": 250,
            "belowCapacityHealthUpdateStrategy": "Constant",
            "aboveCapacityHealthUpdateStrategy": "Linear"
        },
        {
            "id": 6,
            "name": "Anika's Commons",
            "day": 5,
            "totalPlayers": 50,
            "cowPrice": 15,
            "degradationRate": .5,
            "showLeaderboard": true,
            "capacityPerUser": 5,
            "carryingCapacity": 100,
            "effectiveCapacity": 250,
            "belowCapacityHealthUpdateStrategy": "Constant",
            "aboveCapacityHealthUpdateStrategy": "Linear"
        },
        {
            "id": 5,
            "name": "Evan's Commons",
            "day": 5,
            "totalPlayers": 50,
            "cowPrice": 15,
            "degradationRate": .5,
            "showLeaderboard": true,
            "capacityPerUser": 2,
            "carryingCapacity": 100,
            "effectiveCapacity": 100,
            "belowCapacityHealthUpdateStrategy": "Constant",
            "aboveCapacityHealthUpdateStrategy": "Linear"
        },
        {
            "id": 4,
            "name": "Joshua's Commons",
            "day": 5,
            "totalPlayers": 50,
            "cowPrice": 15,
            "degradationRate": .5,
            "showLeaderboard": true,
            "capacityPerUser": 2,
            "carryingCapacity": 100,
            "effectiveCapacity": 100,
            "belowCapacityHealthUpdateStrategy": "Constant",
            "aboveCapacityHealthUpdateStrategy": "Linear"
        },
        {
            "id": 3,
            "name": "Danny's Commons",
            "day": 5,
            "totalPlayers": 50,
            "cowPrice": 15,
            "degradationRate": .5,
            "showLeaderboard": true,
            "capacityPerUser": 2,
            "carryingCapacity": 100,
            "effectiveCapacity": 100,
            "belowCapacityHealthUpdateStrategy": "Constant",
            "aboveCapacityHealthUpdateStrategy": "Linear"
        },
        {
            "id": 2,
            "name": "Jackson's Commons",
            "day": 5,
            "totalPlayers": 50,
            "cowPrice": 15,
            "degradationRate": .5,
            "showLeaderboard": true,
            "capacityPerUser": 2,
            "carryingCapacity": 100,
            "effectiveCapacity": 100,
            "belowCapacityHealthUpdateStrategy": "Constant",
            "aboveCapacityHealthUpdateStrategy": "Linear"
        }
    ],
    defaultCommons:
    [
        {
            "id": 1,
            "name": "",
            "day": 1,
            "startingDate": "2023-11-27T15:50:10",
            "startingBalance": 10000,
            "totalPlayers": 100,
            "cowPrice": 100,
            "milkPrice": 1,
            "degradationRate": .001,
            "showLeaderboard": true,
            "capacityPerUser": 5,
            "carryingCapacity": 100,
            "effectiveCapacity": 100,
            "belowCapacityHealthUpdateStrategy": "Constant",
            "aboveCapacityHealthUpdateStrategy": "Linear"
        }
    ],
}

export default commonsFixtures;
