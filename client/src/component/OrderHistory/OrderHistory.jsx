import React from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

const OrderHistory = () => {
  const orderHistory = useSelector(
    (state) => state.userInfo.userList.orderHistory
  );

  // Accordian functionality
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return orderHistory?.length > 0 ? (
    <div>
      <h1 style={{ marginTop: '4em', marginLeft: '1em' }}>
        Your order history
      </h1>

      <div style={{ width: '80vw', margin: '2em auto' }}>
        {orderHistory.map((i, j) => {
          return (
            <Accordion
              key={j}
              expanded={expanded === j}
              onChange={handleChange(j)}
              style={{ margin: '0.3em', borderRadius: '10px' }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color="success" />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                style={{
                  backgroundColor: '#272727',
                  color: 'white',
                  borderRadius: '10px',
                }}
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  Order ID :
                </Typography>
                <Typography>{i.orderId}</Typography>
              </AccordionSummary>
              <AccordionDetails
                style={{ fontSize: '15px', borderRadius: '10px' }}
              >
                <p>
                  Order placed on : <strong>{i.orderDate}</strong>
                </p>
                <p>
                  Order price : <strong>${i.orderPrice}</strong>
                </p>
                <p>
                  Payment status : <strong>{i.orderStatus}</strong>
                </p>
              </AccordionDetails>
            </Accordion>
            // <tr key={j}>
            //   <td>{i.orderId}</td>
            //   <td>{i.orderDate}</td>
            //   <td>${i.orderPrice}</td>
            //   <td>{i.orderStatus}</td>
            // </tr>
          );
        })}
      </div>

      {/* <Table
        style={{
          textAlign: 'center',
          width: '90%',
          margin: '2em auto',
          marginBottom: '5em',
        }}
        striped
        bordered
        hover
      >
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Total Price</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {orderHistory.map((i, j) => {
            return (
              <tr key={j}>
                <td>{i.orderId}</td>
                <td>{i.orderDate}</td>
                <td>${i.orderPrice}</td>
                <td>{i.orderStatus}</td>
              </tr>
            );
          })}
        </tbody>
      </Table> */}
    </div>
  ) : (
    <div
      style={{
        textAlign: 'center',
        marginTop: '23em',
        marginBottom: '28em',
      }}
    >
      <h1>No orders placed by you yet</h1>
    </div>
  );
};

export default OrderHistory;
