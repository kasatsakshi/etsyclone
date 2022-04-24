import React, { useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {
  Table, TableBody, TableContainer, TableFooter, TableRow, TableCell, TablePagination, Avatar,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { grey } from '@mui/material/colors';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { getOrders } from '../redux/cart';
import { numberFormat } from '../util/currency';
import defaultProduct from '../assets/defaultProduct.png';

const Container = styled.div`
position: relative;
 min-height: 100vh;
 `;

const Wrapper = styled.div`
padding-bottom:80px;
margin-left: 100px;
margin-right:100px;
`;

const NoOrders = styled.div`
    position: relative;
    margin-top: 100px;
    text-align: center
`;

const Heading = styled.h1`
    position: relative;
    margin-top: 20px;
    padding-bottom: 20px;
    align-items: center
    text-align: center
    font-weight: bold;
    font-size: 20px;
`;

function Purchases() {
  const orders = useSelector((state) => state.cart.purchases);
  const pastPurchases = [];
  orders.map((order) => {
    order.orderDetails.map((orderDetail) => {
      pastPurchases.push(orderDetail);
    });
  });
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const [rowsPerPage, setRowsPerPage] = React.useState(2);
  const [page, setPage] = React.useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        getOrders(dispatch);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <Navbar />
      { pastPurchases && pastPurchases.length > 0
        ? (
          <Wrapper>
            <Heading>Your Purchase Orders</Heading>
            {/* <Pagination length={orders.length} /> */}
            <TableContainer>
              <Table>
                <TableBody>
                  {(rowsPerPage > 0
                    ? pastPurchases.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : pastPurchases
                  ).map((pastPurchase) => (
                    <TableRow key={pastPurchase.orderId}>
                      <TableCell component="th" scope="row">
                        <Avatar
                          sx={{ bgcolor: grey }}
                          src={pastPurchase ? pastPurchase.pictureUrl : defaultProduct}
                          variant="square"
                        />
                      </TableCell>
                      <TableCell style={{ width: 300 }} component="th" scope="row">
                        {pastPurchase.name}
                      </TableCell>
                      <TableCell style={{ width: 300 }} component="th" scope="row">
                        {pastPurchase.giftMessage}
                      </TableCell>
                      <TableCell style={{ width: 60 }} align="right">
                        <span>qty: </span>
                        {pastPurchase.orderQuantity}
                      </TableCell>
                      <TableCell style={{ width: 60 }} align="right">
                        {numberFormat(pastPurchase.price, user ? user.currency : 'USD')}
                      </TableCell>
                      <TableCell style={{ width: 260 }} align="right">
                        {moment(pastPurchase.createdAt).format('MM/DD/YYYY')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[2, 5, 10]}
                      count={orders.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          'aria-label': 'rows per page',
                        },
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      // ActionsComponent={TablePaginationActions}
                      // component={Box}
                      labelDisplayedRows={({ page }) => `page: ${page}`}
                      backIconButtonProps={{
                        color: 'primary',
                      }}
                      nextIconButtonProps={{ color: 'primary' }}
                      labelRowsPerPage={<span style={{ color: 'black' }}>size:</span>}
                      sx={{
                        '.MuiTablePagination-toolbar': {
                          backgroundColor: 'white',
                        },
                        '.MuiTablePagination-selectLabel, .MuiTablePagination-input': {
                          fontWeight: 'bold',
                          color: 'black',
                        },
                      }}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Wrapper>
        )
        : <NoOrders> No Purchase Orders </NoOrders>}
      <Footer />
    </Container>
  );
}

export default Purchases;
