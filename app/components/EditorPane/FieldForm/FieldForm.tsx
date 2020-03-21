import React from 'react';
import {DelayInput} from 'react-delay-input';
import { Formik } from 'formik';
import { Form } from 'antd';
import { MyInput } from '../style';
const FieldForm = (props) => {
  const { label, value, onUpdate , placeholder, className} = props

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
                  isSubmitting,
              }) => (
                <Form>
                  <MyInput>
                    <DelayInput className={`ant-input ant-input-lg ${className}`}
                      name={label}
                      value={value}
                      delayTimeout={1000}
                      onChange={event => onUpdate(event)}
                      placeholder={placeholder} />
                    </MyInput>
                </Form>
              )}
          </Formik>
  )
}

export default FieldForm;
