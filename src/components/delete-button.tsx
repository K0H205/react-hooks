import React from "react";

import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { Word } from "../models/word";

const DeleteButton: React.FC<{
  word: Word;
  deleteWord: (word: Word) => void;
}> = (props) => {
  const callDeleteWord = () => props.deleteWord(props.word);

  return (
    <div className="delete-button">
      <DeleteOutlineOutlinedIcon onClick={callDeleteWord} />
    </div>
  );
};

export default DeleteButton;
