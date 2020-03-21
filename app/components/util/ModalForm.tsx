import React from 'react';
import FieldForm from '../EditorPane/FieldForm/FieldForm';
import { Formik, Form } from 'formik';
import { Modal, Input } from 'antd';

export default function ModalForm({formSubmitHandler, placeholder,visible, title, initialValue, handleCancel}) {

  return (
    <Formik
           enableReinitialize={true}
           initialValues={{value: initialValue}}
           validate={values => {
               const errors = {};
               return errors;
           }}
           onSubmit={(values, { setSubmitting }) => {
            console.log("onSubmit:: ", values)
            formSubmitHandler(values)
            values.value = ""
            setSubmitting(false)
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
              <Modal
                title={title}
                visible={visible}
                onOk={handleSubmit}
                onCancel={handleCancel}
              >
                <Form>
                  <Input
                    autoFocus={true}
                    name="value"
                    value={values.value}
                    onChange={handleChange}
                    placeholder={placeholder}
                  />
                </Form>
                </Modal>
    )}
    </Formik>
  );
}
