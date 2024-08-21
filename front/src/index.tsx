import React, { useContext, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import {ContextPriveder} from 'components/Context';
import Webamp from 'components/Webamp';
import Menu from 'components/Menu';
import Modal from 'components/Modal';
import './index.css';

const App: React.FC = () => {

  return <div className='overflow-hidden w-screen h-screen flex flex-col'>
    <ContextPriveder>
      <Modal/>
      <Webamp />
      <Menu/>
    </ContextPriveder>
  </div>

};

//@ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);