import React from "react";
import Table from '@mui/joy/Table';


function findCaresInMonth(month, cares) {
    return cares.maps((care) => { return care.date.month === month })
}

function Monthlypayment(props) {
    const month = props.month;
    const cares = props.cares;
    const caresInMonth = findCaresInMonth(month, cares);
    return <>
        <Table>
            <thead>
                <tr>
                    <th>תאריך</th>
                    <th>סכום</th>
                    <th>התקיים?</th>
                </tr>
            </thead>
            <tbody>
                {caresInMonth.map((care) => {
                    return <tr>
                        <td>{care.date}</td>
                        <td>{care.cost}</td>
                        <td>{care.status}</td>
                    </tr>
                })}
            </tbody>
        </Table>
    </>;
}

export default Monthlypayment;