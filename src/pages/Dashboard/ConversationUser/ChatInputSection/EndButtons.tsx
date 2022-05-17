import React from "react";

import { Button, UncontrolledPopover, PopoverBody } from "reactstrap";
interface EndButtonsProps {
  onSubmit: () => void;
  disabled: boolean;
}
const EndButtons = ({ onSubmit, disabled }: EndButtonsProps) => {
  return (
    <div className="chat-input-links ms-2 gap-md-1">
      <div className="links-list-item">
        <Button
          color="primary"
          type="submit"
          disabled={disabled}
          hidden={disabled}
          className="btn btn-primary btn-lg chat-send waves-effect waves-light"
        >
          <i className="bx bxs-send align-middle"></i>
        </Button>
      </div>
    </div>
  );
};

export default EndButtons;
