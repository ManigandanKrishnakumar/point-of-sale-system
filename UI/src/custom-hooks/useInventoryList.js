import {useEffect, useRef, useState} from 'react';
import {fetchInventoryList} from '../services/inventoryService';

export default () => {
  const isCancelled = useRef(false);
  const [inventoryList, setInventoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getInventoryList = async () => {
    if (!isCancelled.current) {
      setLoading(loading);
      const result = await fetchInventoryList();
      setLoading(false);
      result.error ? setError(true) : setInventoryList(result.data);
    }
  };

  useEffect(() => {
    getInventoryList();

    return () => {
      isCancelled.current = true;
    };
  });

  return [inventoryList, loading, error, getInventoryList];
};
