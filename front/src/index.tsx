import React, { useContext, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { ContextPriveder } from 'components/Context';
import Webamp2 from 'components/Webamp2';
import Menu from 'components/Menu';
import Modal from 'components/Modal';
import Loader from 'components/Loader';
import './animate-background.css'
import './index.css';

const App: React.FC = () => {

  return <div className='animated-background overflow-hidden w-full h-full flex flex-col'>
    <ContextPriveder>
      <Loader />
      <Webamp2 />
      <Menu />
      <Modal />
    </ContextPriveder>
  </div>

};

//@ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);