import React, { useEffect } from 'react';
import { getClientByBusinessId } from '../inventory/features/Clients/clientSlice';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function ClientsListByBusinessId() {
  const dispatch = useAppDispatch();
  const clientsData = useAppSelector((state) => state.client.data);
  const currentUser = useAppSelector((state) => state.currentUserSlice);
  const businessId = currentUser?.employeeDetails.businessId?.toString();
  const { t } = useTranslation();
  useEffect(() => {
    //You need to check that the businessID does return
    if (businessId) {
      dispatch(getClientByBusinessId(businessId));
    }
  }, [dispatch]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>{t('website.Username')}</StyledTableCell>
              <StyledTableCell>{t('website.Email')}</StyledTableCell>
              <StyledTableCell>{t('website.Registered At')}</StyledTableCell>
              <StyledTableCell>{t('website.Last Login')}</StyledTableCell>
              <StyledTableCell>{t('website.Mobile')}</StyledTableCell>
              <StyledTableCell>{t('website.Address')}</StyledTableCell>
              <StyledTableCell>{t('website.dateOfBirth')}</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientsData?.map((c, i) => (
              <StyledTableRow key={i}>
                <StyledTableCell component='th' scope='row'>
                  {' '}
                  {c.userName}
                </StyledTableCell>
                <StyledTableCell>{c.userEmail}</StyledTableCell>
                <StyledTableCell>
                  {c.registeredAt.toLocaleString()}
                </StyledTableCell>
                <StyledTableCell>
                  {c.lastLogin.toLocaleString()}
                </StyledTableCell>
                <StyledTableCell>{c.mobile}</StyledTableCell>
                <StyledTableCell>
                  {c.address.city}, {c.address.street}, {c.address.num}
                </StyledTableCell>
                <StyledTableCell>
                  {c.dateOfBirth.toLocaleString()}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default ClientsListByBusinessId;
