import React from 'react';
import { Formik, Form } from 'formik';
import { Modal, Input, List } from 'antd';
import { MyInput } from '../EditorPane/style';
import { NotoModal } from './utils.style';
import FinderResultList from './FinderResultList';
import {DelayInput} from 'react-delay-input';

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
      {({ values, handleChange, handleSubmit, setValues }) => (
        <NotoModal>
          <Modal
            title={null}
            closable={false}
            onCancel={handleCancel}
            visible={visible}
            width="50%"
            footer={null}
            headerStyle={{ padding: '0' }}
            bodyStyle={{
              padding: '5px'
            }}
          >
            <Form>
              <MyInput >
                <DelayInput className={`ant-input`}
                  style={{fontSize: 'larger', margin: '10px 0 10px 0'}}
                  autoFocus
                  name="value"

                  value={values.value}
                  onChange={e => {handleChange(e); search(e.target.value)}}
                  placeholder={placeholder}
                />
              </MyInput>
            </Form>
            {data && data.results && (
              <>
                <FinderResultList
                  header="Title Matches"
                  data={data.results.titleResults}
                  onResultClick={id => {onSearchResultSelect(id);setValues({value: ""})}}
                />
                <FinderResultList
                  header="Content Matches"
                  data={data.results.contentResults}
                  onResultClick={id => {onSearchResultSelect(id); setValues({value: ""})}}
                />
                <FinderResultList
                  header="Tag Matches"
                  type="tag"
                  data={data.results.tagResults}
                  onResultClick={id => {onSearchResultSelect(id); setValues({value: ""})}}
                />
              </>
            )}
          </Modal>
        </NotoModal>
      )}
    </Formik>
  );
}
