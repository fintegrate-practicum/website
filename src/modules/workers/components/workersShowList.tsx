import React, { useState } from 'react';
import { useAppSelector } from '../../../Redux/hooks';
import { RootState } from '../../../Redux/store';
import TableComponent from '../../../stories/TableComponent';
import Button from '../../../common/components/Button/Button';
import { useTranslation } from 'react-i18next';

const WorkersShowList = () => {
  const { t } = useTranslation();
  const employees = useAppSelector(
    (state: RootState) => state.employeeSlice.employees,
  );
  const showMoreData = () => {
    setStartIndex(startIndex + itemsPerPage);
  };
  const showLessData = () => {
    setStartIndex(Math.max(0, startIndex - itemsPerPage));
  };
  const [startIndex, setStartIndex] = useState<number>(0);
  const itemsPerPage = 10;
  const hasNextPage = startIndex + itemsPerPage < employees.length;
  const hasPreviousPage = startIndex - itemsPerPage >= 0;
  const paginatedEmployees = employees.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const headers = [
    { key: 'userId', label: 'User ID', type: 'text' },
    { key: 'code', label: 'Code', type: 'text' },
    { key: 'createdBy', label: 'Created By', type: 'text' },
    { key: 'updatedBy', label: 'Updated By', type: 'text' },
    { key: 'roleId', label: 'Role ID', type: 'text' },
    { key: 'position', label: 'Position', type: 'text' },
    { key: 'details', label: 'Details', type: 'text' },
  ];

  const dataObject = {
    headers,
    rows: paginatedEmployees.map((employee) => ({
      id: employee.userId,
      userId: employee.userId,
      code: employee.code,
      createdBy: employee.createdBy,
      updatedBy: employee.updatedBy,
      roleId: employee.role,
      // position: employee.position,
      // details: employee.details,
    })),
  };

  const handleDelete = () => {
    // Implement delete logic here
  };

  const handleAmountChange = () => {
    // Implement amount change logic here
  };

  return (
    <>
      <TableComponent
        dataObject={dataObject}
        tableSize='large'
        onDelete={handleDelete}
        showDeleteButton={false}
        handleAmountChange={handleAmountChange}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '20px',
        }}
      >
        <Button
          component='label'
          tabIndex={-1}
          onClick={showMoreData}
          disabled={!hasNextPage}
        >
          {t('common.Next')}{' '}
        </Button>
        <Button
          component='label'
          tabIndex={-1}
          onClick={showLessData}
          disabled={!hasPreviousPage}
        >
          {t('common.Previous')}{' '}
        </Button>
      </div>
    </>
  );
};

export default WorkersShowList;
