import React from "react";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// Monthlypayment from "./MonthlyPayment.jsx";


function PreviousPayment(){
    return(<>hello world</>)

}

export default PreviousPayment
function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
}
//   return (
//     <React.Fragment>
//       <tr>
//         <td>
//           <IconButton
//             aria-label="expand row"
//             variant="plain"
//             color="neutral"
//             size="sm"
//             onClick={() => setOpen(!open)}
//           >
//             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//           </IconButton>
//         </td>
//         <th scope="row">{row.name}</th>
//         <td>{row.calories}</td>
//         <td>{row.fat}</td>
//         <td>{row.carbs}</td>
//         <td>{row.protein}</td>
//       </tr>
//       <tr>
//         <td style={{ height: 0, padding: 0 }} colSpan={6}>
//           {open && (
//             <Sheet
//               variant="soft"
//               sx={{ p: 1, pl: 6, boxShadow: 'inset 0 3px 6px 0 rgba(0 0 0 / 0.08)' }}
//             >
//               <Typography level="body-lg" component="div">
//                 History
//               </Typography>
//               <Table
//                 borderAxis="bothBetween"
//                 size="sm"
//                 aria-label="purchases"
//                 sx={{
//                   '& > thead > tr > th:nth-child(n + 3), & > tbody > tr > td:nth-child(n + 3)':
//                     { textAlign: 'right' },
//                   '--TableCell-paddingX': '0.5rem',
//                 }}
//               >
//                 <thead>
//                   <tr>
//                     <th>Date</th>
//                     <th>Customer</th>
//                     <th>Amount</th>
//                     <th>Total price ($)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {row.history.map((historyRow) => (
//                     <tr key={historyRow.date}>
//                       <th scope="row">{historyRow.date}</th>
//                       <td>{historyRow.customerId}</td>
//                       <td>{historyRow.amount}</td>
//                       <td>
//                         {Math.round(historyRow.amount * row.price * 100) / 100}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             </Sheet>
//           )}
//         </td>
//       </tr>
//     </React.Fragment>
//   );
// }

// Row.propTypes = {
//   initialOpen: PropTypes.bool,
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];

// export default function TableCollapsibleRow() {
//   return (
//     <Sheet>
//       <Table
//         aria-label="collapsible table"
//         sx={{
//           '& > thead > tr > th:nth-child(n + 3), & > tbody > tr > td:nth-child(n + 3)':
//             { textAlign: 'right' },
//           '& > tbody > tr:nth-child(odd) > td, & > tbody > tr:nth-child(odd) > th[scope="row"]':
//             {
//               borderBottom: 0,
//             },
//         }}
//       >
//         <thead>
//           <tr>
//             <th style={{ width: 40 }} aria-label="empty" />
//             <th style={{ width: '40%' }}>Dessert (100g serving)</th>
//             <th>Calories</th>
//             <th>Fat&nbsp;(g)</th>
//             <th>Carbs&nbsp;(g)</th>
//             <th>Protein&nbsp;(g)</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row, index) => (
//             <MonthlyPayment key={row.name} row={row} initialOpen={index === 0} />
//           ))}
//         </tbody>
//       </Table>
//     </Sheet>
//   );
// }
