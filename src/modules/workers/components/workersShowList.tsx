import GenericList from "../../../components/generic/genericList";
import { useAppSelector } from "../../../Redux/hooks";
import ItemDetailToWorker from "./itemDetailToWorker";
import React, { useState } from "react";
import Button from "../../../common/components/Button/Button";
import { RootState } from "../../../Redux/store";
import { useTranslation } from 'react-i18next';

const WorkersShowList = () => {
  const { t } = useTranslation();
  const employees = useAppSelector((state: RootState) => state.employeeSlice.employees);

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
    startIndex + itemsPerPage
  );
  const hasNextPage = startIndex + itemsPerPage < employees.length;
  const hasPreviousPage = startIndex - itemsPerPage >= 0;

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <GenericList
          title={t('workers.workers list')}
          list={paginatedEmployees}
          column={[
            t('workers.userId'),
            t('workers.code'),
            t('workers.createdBy'),
            t('workers.updatedBy'),
            t('workers.roleId'),
            t('workers.position'),
            t('workers.details'),
          ]}
          desing={ItemDetailToWorker}
        />
      </div>
      <Button
        component="label"
        tabIndex={-1}
        onClick={showMoreData}
        disabled={!hasNextPage}
      >
        {t('workers.Next')}
      </Button>
      <Button
        component="label"
        tabIndex={-1}
        onClick={showLessData}
        disabled={!hasPreviousPage}
      >
        {t('workers.Previous')}
      </Button>
    </>
  );
};

export default WorkersShowList;
