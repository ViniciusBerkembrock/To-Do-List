import { useState, useEffect } from 'react';
import { format } from 'date-fns';

function useCurrentDate() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Atualize a data a cada segundo

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formattedDate = format(currentDate, 'yyyy-MM-dd');

  return formattedDate;
}

export default useCurrentDate;