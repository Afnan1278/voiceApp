import React, { useEffect, useState } from "react";

import { Button, Input, Popover, PopoverBody, UncontrolledPopover } from "reactstrap";


interface InputSectionProps {
  value: null | string;
  onChange: (value: string) => void;
  start:()=>void;
  stop:()=>void;
  note:any;
  recording:boolean
}
const InputSection = ({ value, onChange,note, start, stop, recording }: InputSectionProps) => {


 
  const handlerAudio = ()=>{
    if(!recording) start() 
    else stop()
  }
 
  
  return (
    <div className="position-relative d-flex">
       {note  && !recording &&<audio src={note} controls={true} />}
         <Button
          color="none"
          type="button"
          className="btn btn-link text-decoration-none btn-lg waves-effect btn-red"
          onClick={handlerAudio}
          // disabled={msg.isRecording}
          id="audio-btn"
        >
          <i style={{fontSize: "50px"}} className="bx bx-microphone align-middle"></i>
        </Button>
      <Popover  isOpen={recording} trigger="focus" placement="top" target="audio-btn">   
      <PopoverBody>
          <div className="loader-line">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </PopoverBody>
        </Popover>
        {/* <button onClick={start} disabled={msg.isRecording}>Record</button>
          <button onClick={stop} disabled={!msg.isRecording}>Stop</button> */}
         
    </div>
  );
};
export default InputSection;
