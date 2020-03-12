import React from 'react';
import {DelayInput} from 'react-delay-input';
import { Formik } from 'formik';
import { Form } from 'antd';
const FieldForm = ({ label, value, onUpdate }) => (
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
                <DelayInput className="ant-input"
                  name={label}
                  value={value}
                  delayTimeout={1000}
                  onChange={event => onUpdate(event)} />
              </Form>
            )}
        </Formik>
);

export default FieldForm;
