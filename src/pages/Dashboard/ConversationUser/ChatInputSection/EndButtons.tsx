import React from "react";

import { Button, UncontrolledPopover, PopoverBody } from "reactstrap";
interface EndButtonsProps {
  onSubmit: () => void;
  disabled: boolean;
}
const EndButtons = ({ onSubmit, disabled }: EndButtonsProps) => {
  return (
    <div >
      <div >
        {/* <Button
          // color="red"
          type="submit"
          disabled={disabled}
          hidden={disabled}
          className="btn  btn-lg  waves-effect waves-light btn-red"
        > */}
          <i className="bx bxs-send align-middle btn-red" style={{fontSize:"30px",cursor:"pointer"}} onClick={onSubmit} hidden={disabled}></i>
        {/* </Button> */}
      </div>
    </div>
  );
};

export default EndButtons;
