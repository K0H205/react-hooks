import React from 'react';

import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

const DeleteButton: React.FC<{ id: number }> = props => {
  return (
    <div className="delete-button">
      <DeleteOutlineOutlinedIcon />
    </div>
  );
};

export default DeleteButton;
