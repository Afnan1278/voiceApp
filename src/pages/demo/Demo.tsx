import React, { useEffect, useState } from "react";
import AudioPlayer from 'react-h5-audio-player';
import { useParams } from "react-router-dom";
import 'react-h5-audio-player/lib/styles.css';
import logo from '../../assets/images/web ui icons/voice-message-logo (1).png';
import play from '../../assets/images/web ui icons/play.png';
import dlt from '../../assets/images/web ui icons/delete.png';

import download from '../../assets/images/web ui icons/download.png'

import voice from '../../assets/images/web ui icons/voice.png'

import {
  Alert,
  Row,
  Col,
  Form,
  Label,
  Button,
  UncontrolledTooltip,
  Popover,
  PopoverBody,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
} from "reactstrap";

import AuthHeader from "../../components/AuthHeader";
import MicRecorder from 'mic-recorder-to-mp3';
import axios from "axios";
import { PinInput } from "react-input-pin-code";

const Mp3Recorder = new MicRecorder<any>({ bitRate: 128 });

const Demo = () => {
  const param:any = useParams();
  axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

  const [requireOTP, setRequireOTP] =useState<any>(true);
  const [showAlert, setShowAlert] =useState<any>(false)
  const [recording, setRecording] =useState<any>(false)
  const [vmId, setVmId] = useState<any>(null)
  const [msisdn, setMsisdn] = useState<any>(null)
  const [pinCode, setPinCode] = useState<any>(null)
  const [vmBase64, setVMBase64] = useState<any>(null)
  const [alertPinResend, setalertPinResend] =useState<any>(false)

  



  useEffect(() => {
    debugger
    setVmId(param.vmId)
    loadAudio()
  }, []);

  const loadAudio = async()=>{
      let chechQuota = await 
      axios.get(`http://101.53.236.29:8080/api/subscriber/chkQuotaWeb?refid=1234567&vmId=${param.vmId}`);
      if (chechQuota.data.result == 'success')
      {
        setMsisdn(chechQuota.data.msisdn)
        let pinValidate = await 
          axios.get(`http://101.53.236.29:8080/api/subscriber/pinCodeValidation?refid=1234567&msisdn=${chechQuota.data.msisdn}`);
        if (pinValidate.data.success){
          setPinCode(pinValidate.data.pinCode)
        }
        else{
          setShowAlert(true)
        }
      }
      else{
        setShowAlert(true)
      }
    //   let response = await axios.get(`http://127.0.0.1:8099/api/subscriber/chkQuotaWeb?refid=1234567&vmId=ODI5MTUzMjAx`, {
    //   params: {},
    //   // headers: { "x-token": `Bearer ${token}` },
    // });
  }
  const submitOTP =async(otp)=>{
    debugger
    if(showAlert)
    setShowAlert(false)
    if(alertPinResend)
    setalertPinResend(false)
    otp = otp.join("")
    if(otp == pinCode){
      const decodedVmID = atob(vmId)
      let getVm = await axios.get(`http://101.53.236.29:88/${decodedVmID}.wav`,{})
      setVMBase64(getVm)
      setRequireOTP(false)
      setShowAlert(false)
    }
    
    else
    setShowAlert(true)
  }
  const handleAudio = ()=>{
    setRecording(!recording)
  }

  const resendOTP = async()=>{

    setalertPinResend(true)
    if(showAlert)
    setShowAlert(false)
    let pinValidate = await 
          axios.get(`http://101.53.236.29:8080/api/subscriber/resendPinCode?refid=1234567&msisdn=${msisdn}`);
        if (pinValidate.data.success){
          setPinCode(pinValidate.data.pinCode)
        }
        else{
          setShowAlert(true)
        }
  }

  return (
      <div className="demo-background" style={{overflow:"hidden"}}>
        <Row className="justify-content-center my-auto align-items-center pb-0" style={{height:'100vh'}}>
        <Col sm={10} lg={6} xl={5} className="col-xxl-4">
        { showAlert && <Alert color="danger">User not authorized</Alert>}
        { alertPinResend && <Alert color="success">Pin resent to your number</Alert>}

        <OTPModal open={requireOTP} submitOTP={submitOTP} resendOTP={resendOTP}/>
          <div className="py-md-5 py-4">
          <div className="">
                <div className="demo-logo mx-auto mb-4">
                  <img src={logo}/>
                </div>
              </div>
            {/* <AuthHeader
              title="Demo"
              subtitle="Voice note check"
            /> */}
            <div className="position-relative  px-2 " >
             
            <AudioPlayer
              customAdditionalControls={[]}
              showSkipControls={false}
              src = "https://file-examples.com/storage/fef1fade0e62c0557a4ffca/2017/11/file_example_WAV_1MG.wav"
              style={{backgroundColor:'rgb(25 20 20)'}}
             
              onPlay={e => console.log("onPlay")}
              // other props here
            />
            <div className="d-flex justify-content-between text-center px-5">
              
                <div >
                <img style={{cursor: "pointer", width:"60px"}} src={download}/>
                <p>download</p>
                </div>
                <div>
                <img style={{cursor: "pointer", width:"60px"}} src={dlt}/>
                <p>delete</p>
                </div>
                <div>
                <img style={{cursor: "pointer", width:"60px"}} src={play}/>
                <p>play</p>
                </div>
                <div>
                <img onClick={handleAudio} style={{cursor: "pointer", width:"60px"}} src ={voice} id="audio-btn"/>
                <p>voice</p>
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
                </div>
             
              
              
            </div>
                
              </div>
          </div>
        </Col>
      </Row>

      </div>
        
      
  
  );
};

const OTPModal = (props)=>{
  const [values, setValues] = React.useState(['', '', '','']);
  const [number, setNumber] = React.useState<any>(null);
  const [showNumber, setShowNumber] = React.useState<any>(true);
  
  
  useEffect(() => {
   
  }, [props])
  return(
    <>
    <Modal className="border-danger" funk={true} isOpen={props.open} centered={true} style={{paddingRight:10}}>
      {showNumber ? <><ModalHeader  className="mx-auto"> <h5 style={{color:'yellow'}}> SIGN IN</h5></ModalHeader><ModalBody>
        

          <Input type="text" className="form-control" placeholder="Enter 11 digit number" onChange={(e)=>setNumber(e.target.value)}/>
        </ModalBody><ModalFooter>

            
            <Button className="mx-auto" style={{ backgroundColor: '#800000' }} onClick={() => setShowNumber(false)}>SIGN IN</Button>

          </ModalFooter></>:
       <><ModalBody>
            <div className="d-flex justify-content-center">
              <PinInput
                mask={true}
                values={values}
                inputStyle={{ padding: '30px', margin: '10px' }}

                borderColor='#DAA520'
                onChange={(value, index, values) => setValues(values)} />
                
            </div>
            <p className="d-flex justify-content-center text-warning mt-2">OTP has been sent to your number</p>

            {/* <Input type="password" className="form-control" placeholder="OTP" onChange={(e)=>setOTP(e.target.value)}/> */}
          </ModalBody><ModalFooter>
 
              {/* <Button color="primary">Do Something</Button>{' '} */}
              <Button style={{ backgroundColor: '#800000' }} onClick={() => props.resendOTP()}>Resend OTP</Button>
              <Button style={{ backgroundColor: '#800000' }} onClick={() => props.submitOTP(values)}>Submit</Button>

            </ModalFooter></>
       }
    </Modal>
    </>
  )
}

export default Demo;
