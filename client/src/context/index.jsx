import React, { createContext, useState } from 'react';

export const GlobalContext = createContext(null);

export default function GlobalState({ children }){
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [blogList, setBLogList] = useState([])
  const [loading, setLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  return (
    <GlobalContext.Provider value={{ formData, setFormData, blogList, setBLogList,isEdit, setIsEdit }}>
      {children}
    </GlobalContext.Provider>
  );
};
