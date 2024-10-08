import React, { useState } from 'react';
import { useAppSelector } from '../../../Redux/hooks';
import { RootState } from '../../../Redux/store';
import TableComponent from '../../../common/components/Table/TableComponent';
import Button from '../../../common/components/Button/Button';
import { useTranslation } from 'react-i18next';
import { DataObject, Row } from '../../../common/components/Table/interfaces';

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
  const rows: Row[] = paginatedEmployees.map((employee) => ({
    userId: employee.userId,
    code: employee.code,
    createdBy: employee.createdBy,
    updatedBy: employee.updatedBy,
    roleId: employee.role.type,
  }));

  const dataObject: DataObject = {
    headers: [
      { key: 'userId', label: t('common.User ID'), type: 'text' },
      { key: 'code', label: t('common.Code'), type: 'text' },
      { key: 'createdBy', label: t('common.created By'), type: 'text' },
      { key: 'updatedBy', label: t('common.Updated By'), type: 'text' },
      { key: 'roleId', label: t('common.Role ID'), type: 'text' },
      { key: 'position', label: t('common.Position'), type: 'text' },
      { key: 'details', label: t('common.Details'), type: 'text' },
    ],
    rows,
  };
  return (
    <>
      <TableComponent
        dataObject={dataObject}
        tableSize='large'
        showDeleteButton={false}
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
