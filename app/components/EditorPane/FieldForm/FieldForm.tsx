import React from 'react';
import {DelayInput} from 'react-delay-input';
import { Formik } from 'formik';
import { Form } from 'antd';
const FieldForm = (props) => {
  const { label, value, onUpdate , placeholder, className} = props
  const delay = props.delay ? props.delay : 1000

    return (
          <Formik
              enableReinitialize={true}
              initialValues={value}
              validate={values => {
                  const errors = {};
                  return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                  if (values !== issue) {
                      console.log("onSubmit:: ", values)
                  }
              }}
          >
              {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,setValues
              }) => (
                <Form>
                  {/* <MyInput> */}
                    <DelayInput className={`ant-input  ${className}`}
                      name={label}
                      value={value}
                      delayTimeout={delay}
                      onChange={event => onUpdate(event)}
                      placeholder={placeholder}
                       />
                    {/* </MyInput> */}
                </Form>
              )}
          </Formik>
  )
}

export default FieldForm;
