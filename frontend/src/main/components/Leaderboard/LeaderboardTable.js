import React from "react";
import OurTable from "main/components/OurTable";
import { hasRole } from "main/utils/currentUser";

// should take in a players list from a commons
export default function LeaderboardTable({ leaderboardUsers, currentUser }) {

    const USD = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    });

    const columns = [
        {
            Header: 'User Id',
            accessor: 'userId',
        },
        {
            Header: 'Username',
            accessor: 'username',
        },
        {
            Header: 'Total Wealth',
            id: 'totalWealth',
            accessor: (row, _rowIndex) => {
                return USD.format(row.totalWealth);
            },
            sortType: 
                (rowA,rowB,_id,_desc)=>{
                    console.log("desc",_desc);
                    console.log("rowA",rowA);
                    const diff = parseFloat(rowA.original.totalWealth) - parseFloat(rowB.original.totalWealth);
                    console.log("diff",diff);
                    return diff;
                }
            ,
            Cell: (props) => {
                return (
                    <div style={{ textAlign: "right" }}>{props.value}</div>)
            },
        },
        {
            Header: 'Cows Owned',
            accessor: 'numOfCows',
        },
        {
            Header: 'Cow Health',
            accessor: 'cowHealth',
        },
        {
            Header: 'Cows Bought',
            accessor: 'cowsBought',
        },
        {
            Header: 'Cows Sold',
            accessor: 'cowsSold',
        },
        {
            Header: 'Cow Deaths',
            accessor: 'cowDeaths',
        },
    ];

    const testid = "LeaderboardTable";

    /* Temp filler for admin leaderboard table */

    const columnsIfAdmin = [
        {
            Header: '(Admin) userCommons Id',
            accessor: 'id'
        },
        ...columns

    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={leaderboardUsers}
        columns={columnsToDisplay}
        testid={testid}
    />;

};