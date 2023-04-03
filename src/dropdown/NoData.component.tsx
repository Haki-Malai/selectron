import React, { memo } from 'react';
import { ReactComponent as FolderIcon } from "./icons/folderIcon.svg";

const NoDataComponent = () => {
  return (
    <div className="no-data">
      <FolderIcon/>
      <span>No Data Found</span>
    </div>
  );
};

export default memo(NoDataComponent);
