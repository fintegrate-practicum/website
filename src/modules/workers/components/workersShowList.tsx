import GenericList from '../../../components/generic/genericList';
import { useAppSelector } from '../../../Redux/hooks';
import React, { useState } from 'react';
import Button from '../../../common/components/Button/Button';
import { RootState } from '../../../Redux/store';
import { useTranslation } from 'react-i18next';

const WorkersShowList = () => {
  const { t } = useTranslation();
  const employees = useAppSelector(
    (state: RootState) => state.employeeSlice.employees,
  );

  const [startIndex, setStartIndex] = useState<number>(0);
  const itemsPerPage = 10;
  const showMoreData = () => {
    setStartIndex(startIndex + itemsPerPage);
  };
  const showLessData = () => {
    setStartIndex(Math.max(0, startIndex - itemsPerPage));
  };
  const paginatedEmployees = employees.slice(
    startIndex,
    startIndex + itemsPerPage,
  );
  const hasNextPage = startIndex + itemsPerPage < employees.length;
  const hasPreviousPage = startIndex - itemsPerPage >= 0;

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <GenericList
          title={'workers list'}
          list={paginatedEmployees}
          column={[
            { name: 'userId', header: 'userId', type: 'text' },
            { name: 'code', header: 'code', type: 'text' },
            { name: 'createdBy', header: 'createdBy', type: 'text' },
            { name: 'updatedBy', header: 'updatedBy', type: 'text' },
            { name: 'roleId', header: 'roleId', type: 'text' },
            { name: 'position', header: 'position', type: 'text' },
            { name: 'details', header: 'details', type: 'text' },
          ]}
          desing={null}
        />
      </div>
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
    </>
  );
};

export default WorkersShowList;
