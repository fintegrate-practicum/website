import React from 'react';

interface DateFormatProps {
  isoDate: string;
}

const DateFormat: React.FC<DateFormatProps> = ({ isoDate }) => {
  const date = new Date(isoDate);
  const formattedDate = date.toLocaleDateString('he-IL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const formattedTime = date.toLocaleTimeString('he-IL', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <span>
      {formattedDate} {formattedTime}
    </span>
  );
};

export default DateFormat;
