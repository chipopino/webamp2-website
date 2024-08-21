import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useContext } from 'react';

type modalStateType = null | ReactNode;

interface contextType {
    isModalOpen: Boolean;
    modalContent: modalStateType;
    setModalContent: (content: ReactNode) => void;
}

const Context = createContext<contextType | undefined>(undefined);

export function ContextPriveder({ children }: { children: ReactNode }) {

    const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
    const [modalContent, _setModalContent] = useState<modalStateType>(null);

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
        <Context.Provider value={{ isModalOpen, modalContent, setModalContent }}>
            {children}
        </Context.Provider>
    );
};

export default function useCtx() {
    const context = useContext(Context);
    return context;
}