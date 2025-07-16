import { useEffect } from 'react';
import { usePassport } from '@/context/PassportContext';

const TimeTracker = () => {
  const { updateTimeSpent } = usePassport();

  useEffect(() => {
    const interval = setInterval(() => {
      updateTimeSpent(1); // Update every second
    }, 1000);

    return () => clearInterval(interval);
  }, [updateTimeSpent]);

  return null; // This component doesn't render anything
};

export default TimeTracker;
