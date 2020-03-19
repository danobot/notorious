import React from 'react';
import {DelayInput} from 'react-delay-input';
import { Formik } from 'formik';
import { Form } from 'antd';
const FieldForm = (props) => {
  const { label, value, onUpdate , placeholder} = props

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
                  <DelayInput className="ant-input ant-input-lg"
                  style={{fontWeight: 'bold'}}
                    name={label}
                    value={value}
                    delayTimeout={1000}
                    onChange={event => onUpdate(event)}
                    placeholder={placeholder} />
                </Form>
              )}
          </Formik>
  )
}

export default FieldForm;
