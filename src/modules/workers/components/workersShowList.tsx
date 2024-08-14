
import GenericList from "../../../components/generic/genericList";
import { useAppSelector } from "../../../Redux/hooks";
import ItemDetailToWorker from "./itemDetailToWorker";
import React, { useState } from "react";
import Button from "../../../common/components/Button/Button";
import { RootState } from "../../../Redux/store";

const WorkersShowList = () => {

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
          title={"workers list"}
          list={paginatedEmployees}
          column={[
            "userId",
            "code",
            "createdBy",
            "updatedBy",
            "roleId",
            "position",
            "details",
          ]}
          desing={ItemDetailToWorker}
        />
      </div>
      <Button
        component="label"
        tabIndex={-1}
        // startIcon={<CloudUploadIcon />}
        onClick={showMoreData}
        disabled={!hasNextPage}
      >
        הבא
      </Button>
      <Button
        component="label"
        tabIndex={-1}
        // startIcon={<CloudUploadIcon />}
        onClick={showLessData}
        disabled={!hasPreviousPage}
      >
        הקודם
      </Button>
    </>
  );
};

export default WorkersShowList;
