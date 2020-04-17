import React from 'react';
import { Formik, Form } from 'formik';
import { Modal, Input, List } from 'antd';
import FieldForm from '../EditorPane/FieldForm/FieldForm';
import { MyInput } from '../EditorPane/style';
import { NotoModal } from './utils.style';
import NotesWrapper from '../../containers/util/NotesWrapper';
import FinderResultList from './FinderResultList';

export default function Finder({
  onSearchResultSelect,
  placeholder,
  visible,
  title,
  initialValue,
  handleCancel,
  data,
  search
}) {
  return (
    <Formik
      enableReinitialize
      initialValues={{ value: initialValue }}
      validate={values => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log('onSubmit:: ', values);
        search(values.value);
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleSubmit }) => (
        <NotoModal>
          <Modal
            title={title}
            visible={visible}
            onOk={handleSubmit}
            onCancel={handleCancel}
            width="80%"
            headerStyle={{ padding: '0' }}
            bodyStyle={{
              padding: '5px'
            }}
          >
            <Form>
              <MyInput>
                <Input
                  autoFocus
                  name="value"
                  value={values.value}
                  onChange={handleChange}
                  placeholder={placeholder}
                />
              </MyInput>
            </Form>
            {data && data.results && (
              <>
                <FinderResultList
                  header="Title Matches"
                  data={data.results.titleResults}
                  onResultClick={onSearchResultSelect}
                />
                <FinderResultList
                  header="Content Matches"
                  data={data.results.contentResults}
                  onResultClick={onSearchResultSelect}
                />
                <FinderResultList
                  header="Tag Matches"
                  data={data.results.tagResults}
                  onResultClick={onSearchResultSelect}
                />
              </>
            )}
          </Modal>
        </NotoModal>
      )}
    </Formik>
  );
}
