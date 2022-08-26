import React from "react";
import { Alert, Row, Col, Form, Button, UncontrolledTooltip } from "reactstrap";

// hooks
import { useRedux } from "../../hooks/index";

// router
import { Link, Redirect } from "react-router-dom";

// validations
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

// hooks
import { useProfile } from "../../hooks";

//actions
import { registerUser,registerOTP } from "../../redux/actions";

// components
import NonAuthLayoutWrapper from "../../components/NonAutnLayoutWrapper";
import AuthHeader from "../../components/AuthHeader";
import FormInput from "../../components/FormInput";
import Loader from "../../components/Loader";

interface RegisterProps {}
const Register = (props: RegisterProps) => {
  // global store
  const { dispatch, useAppSelector } = useRedux();

  const { user, registrationError, regLoading,otp } = useAppSelector(state => ({
    user: state.Register.user,
    registrationError: state.Register.registrationError,
    regLoading: state.Register.loading,
    isUserRegistered: state.Register.isUserRegistered,
    otp: state.Register.otp,
  }));

  const resolver = yupResolver(
    yup.object().shape({
      mobile: yup.string().required("Please Enter Mobile."),
      // password: yup.string().required("Please Enter Password."),
    })
  );
  const resolver2 = yupResolver(
    yup.object().shape({
      otp: yup.string().required("Please Enter OTP."),
      // password: yup.string().required("Please Enter Password."),
    })
  );

  const defaultValues2: any = {otp:''};
  const defaultValues: any = {};
  const methods = useForm({ defaultValues, resolver });
  const methods2 = useForm({ defaultValues:defaultValues2, resolver:resolver2 });
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = methods;

  const {
    handleSubmit:handleSubmit2,
    register:register2,
    control:control2,
    formState: { errors:errors2 },
  } = methods2;

  const onSubmitForm = (values: object) => {
    dispatch(registerUser(values));
  };
  const onSubmitForm2 = (values: object) => {
    dispatch(registerOTP(values));
  };
  const { userProfile, loading } = useProfile();

  if (userProfile && !loading) {
    return <Redirect to={{ pathname: "/dashboard" }} />;
  }

  return (
    // <NonAuthLayoutWrapper>
      <Row className=" justify-content-center my-auto">
        <Col sm={8} lg={6} xl={5} className="col-xxl-4">
          <div className="py-md-5 py-4 px-3">
            <AuthHeader
              title="Register Account"
              // subtitle="Get your free Doot account now."
            />

            {user && user  && !otp ? (
              <Alert color="success">please Enter OTP</Alert>
            ) : user && user  && otp ?<Alert color="success">User is registered</Alert>:null }

            {registrationError && registrationError ? (
              <Alert color="danger">{registrationError}</Alert>
            ) : null}

           {!user && !user  && !otp  ? <Form
              onSubmit={handleSubmit(onSubmitForm)}
              className="position-relative"
            >
              {regLoading && <Loader />}
              <div className="mb-3">
                <FormInput
                  label="Mobile"
                  type="text"
                  name="mobile"
                  register={register}
                  errors={errors}
                  control={control}
                  labelClassName="form-label"
                  placeholder="Enter Mobile Number"
                  className="form-control"
                />
              </div>


              <div className="text-center mb-3">
                <Button
                  color="primary"
                  className="w-100  waves-effect waves-light"
                  type="submit"
                >
                  Register
                </Button>
              </div>
            
            </Form>: 
            <Form
            onSubmit={handleSubmit2(onSubmitForm2)}
            className="position-relative"
          >
            {regLoading && <Loader />}
            <div className="mb-3">
              <FormInput
                label="OTP"
                type="text"
                name="otp"
                register={register2}
                errors={errors2}
                control={control2}
                labelClassName="form-label"
                placeholder="Enter OTP"
                className="form-control"
              />
            </div>


            <div className="text-center mb-3">
              <Button
                color="primary"
                className="w-100  waves-effect waves-light"
                type="submit"
              >
                Register
              </Button>
            </div>
          
          </Form>
            }

            <div className="mt-5 text-center text-muted">
              <p>
                Already have an account ?{" "}
                <Link
                  to="/auth-login"
                  className="fw-medium text-decoration-underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    // </NonAuthLayoutWrapper>
  );
};

export default Register;
