import React, {useState}  from 'react';
import styled from 'styled-components';
// import SplitPane, { Pane } from 'react-split-pane';
import SplitterLayout from 'react-splitter-layout';

import MainMenuCont from '../../containers/MainMenu/MainMenuCont';
import CounterPage from '../../containers/CounterPage/CounterPage';
const Content = styled.div`
  margin-left: 500px;
  padding: 1px 16px;
  height: 100%;
`;
import MiddleMenuCont from '../../containers/MiddleMenu/MiddleMenuCont';
import ContentAreaCont from '../../containers/ContentAreaCont/ContentAreaCont';

const mapStateToProps = (state) => {
  return {
    settings: state.settings
  };
}
export default function Home(props) {
  const {resizeSidebarAction, resizeMainMenuAction, resizeMiddleMenuAction, settings, sizeMain, sizeSidebar, sizeMiddle} = props
// console.log("Home", props )
const [state, setstate] = useState({sizeMain: 0, sizeMiddle: 0})
const handleSizeChange = size => {
  setstate({sizeMain: size})
}


  return (
    <SplitterLayout id={sizeMain}
      percentage={true}
      secondaryInitialSize={sizeMain}
      onSecondaryPaneSizeChange={size => {
        setstate({...state, sizeMain: size})
      }}
      onDragEnd={e=>resizeMainMenuAction(sizeMain, state.sizeMain)}
      >

        <MainMenuCont />

    <SplitterLayout
      percentage={true}

      id={sizeMiddle}
      secondaryInitialSize={sizeMiddle}
      onSecondaryPaneSizeChange={size => {
        setstate({...state, sizeMiddle: size})
      }}
      onDragEnd={e=>resizeMiddleMenuAction(sizeMiddle, state.sizeMiddle)}
      >
        <MiddleMenuCont />
        <ContentAreaCont />

      </SplitterLayout>
    </SplitterLayout>

    // <SplitPane  split="vertical" >
    //   <Pane   >
    //     <MainMenuCont />
    //   </Pane>
    //   <Pane  >
    //   <SplitPane  split="vertical" >
    //     <Pane  >
    //       <MiddleMenuCont />
    //     </Pane>
    //     <Pane  >
    //       {/* <Content> */}
    //         <p>Main</p>
    //       {/* </Content> */}
    //     </Pane>

    //     </SplitPane>
    //     {/* <MiddleMenuCont /> */}
    //   </Pane>
    // </SplitPane>

  );
}
