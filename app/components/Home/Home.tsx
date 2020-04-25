import React, {useState}  from 'react';
import styled from 'styled-components';
// import SplitPane, { Pane } from 'react-split-pane';
// import SplitterLayout from 'react-splitter-layout';

import MainMenuCont from '../../containers/MainMenu/MainMenuCont';
import CounterPage from '../../containers/CounterPage/CounterPage';
const Content = styled.div`
  margin-left: 500px;
  padding: 1px 16px;
  height: 100%;
`;
import MiddleMenuCont from '../../containers/MiddleMenu/MiddleMenuCont';
import ContentAreaCont from '../../containers/ContentAreaCont/ContentAreaCont';
import { Input, Modal } from 'antd';
import { Form, Formik } from 'formik';
import isElectron from 'is-electron';
import SplitPane from 'react-split-pane';
import Pane from 'react-split-pane'
import { waitSync} from 'redux-pouchdb';

const mapStateToProps = (state) => {
  return {
    settings: state.settings
  };
}
export default function Home(props) {
  const {resizeSidebarAction, resizeMainMenuAction, resizeMiddleMenuAction, settings, saveStoreConfig, sizeMain, sizeSidebar, sizeMiddle, config, setConfig, syncNotesSuccess, syncNotesError} = props

  return (<>

    <SplitPane split="vertical" style={{height: "100%"}}>
      <Pane initialSize="15%" maxWidth="25%" ><MainMenuCont /></Pane>
      <Pane initialSize="20%" maxWidth="25%"><MiddleMenuCont /></Pane>
      <Pane initialSize="65%"><ContentAreaCont /></Pane>
    </SplitPane>
  { isElectron() && config && config.url === null ? <Formik
      enableReinitialize={true}
      initialValues={{url: ""}}
      validate={values => {
          const errors = {};
          return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log("values", values)
        const s = values.url.split('://')
        setConfig('scheme', s[0])
        setConfig('url', s[1])
        setConfig('username', values.username)
        setConfig('password', values.password)
        // saveStoreConfig('db', values.connectionString)
        location.reload()
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
        title="Connect to a server"
        visible={config.url === null}
        onOk={handleSubmit}
      >
        <p>Let's get you started with Notorious! Enter the URL to your CouchDB backend. Examples are shown below:</p>
        <p>https://couchdb.example.com (no trailing slash)</p>
        <p>local_data/</p>
          {errors && <p>{errors["all"]}</p> }
            <Form>
              <Input className="ant-input"
                name="url"
                placeholder="https://notorious.example.com"
                value={values.url}
                onChange={handleChange}
              />

             <Input className="ant-input"
                name="username"
                placeholder="username"
                value={values.username}
                onChange={handleChange}
              />
              <Input className="ant-input"
                name="password"
                placeholder="password"
                value={values.password}
                onChange={handleChange}
              />
            </Form>
      </Modal>
    )}
    </Formik> :<></>
  }

</>
  );
}
