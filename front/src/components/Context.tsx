import React, { createContext, useState, ReactNode, useContext, useRef } from 'react';

type modalStateType = null | ReactNode;

interface contextType {
    webamp: any;
    postMessage: any;
    isModalOpen: Boolean;
    modalContent: modalStateType;
    setModalContent: (content: ReactNode) => void;
}

// const Context = createContext<contextType>({
//     webamp: {},
//     postMessage: {},
//     setPostMessage: {},
//     isModalOpen: false,
//     modalContent: null,
//     setModalContent: (content: ReactNode) => { }
// });
const Context = createContext<contextType | null>(null);

export function ContextPriveder({ children }: { children: ReactNode }) {

    const webamp = useRef();
    const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
    const [modalContent, _setModalContent] = useState<modalStateType>(null);
    const postMessage = useRef();

    function setModalContent(content: ReactNode) {
        if (content) {
            setIsModalOpen(true);
            _setModalContent(content);
        } else {
            setIsModalOpen(false);
            setTimeout(() => {
                _setModalContent(null);
            }, 300)
        }
    }

    return (
        <Context.Provider
            value={{
                isModalOpen,
                modalContent,
                setModalContent,
                webamp,
                postMessage,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default function useCtx() {
    return useContext(Context);
}