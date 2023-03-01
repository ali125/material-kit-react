import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import StorageService from "../services/StorageService";

const STORAGE_NAME = '@dir';

const INITIAL = {
    isRTL: false,
    onToggle: () => {},
}

export const RTLContext = createContext(INITIAL);

const RTLContextProvider = ({ children }) => {
    const [isRTL, setIsRTL] = useState(null);

    // get default direction from LocalStorage and set as state
    useEffect(() => {
        const dir = StorageService.getItem(STORAGE_NAME);
        const rtl = dir === '1';
        setIsRTL(rtl);
        if (rtl) {
            document.dir = 'rtl';
        }
    }, []);

    const onToggle = () => {
        const storeData = isRTL ? '0' : '1';
        document.dir = isRTL ? 'ltr' : 'rtl';
        setIsRTL((prev) => !prev);
        StorageService.setItem(STORAGE_NAME, storeData);
    };

    return (
        <RTLContext.Provider value={{ isRTL, onToggle }}>
            {children}
        </RTLContext.Provider>
    )
}

RTLContextProvider.propTypes = {
    children: PropTypes.any,
};

export default RTLContextProvider;
