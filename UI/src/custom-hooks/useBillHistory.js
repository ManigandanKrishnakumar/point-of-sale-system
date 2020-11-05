import {useEffect, useState, useRef} from 'react';
import {fetchBillHistory} from '../services/billService';

export default () => {
  const isCancelled = useRef(false);
  const [billHistory, setBillHistory] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const getBillHistory = async () => {
    if (!isCancelled.current) {
      setLoading(true);
      const result = await fetchBillHistory();
      setLoading(false);
      result.error ? setError(true) : setBillHistory(result.data);
    }
  };

  useEffect(() => {
    getBillHistory();

    return () => {
      isCancelled.current = true;
    };
  }, []);

  return [billHistory, loading, error, getBillHistory];
};
