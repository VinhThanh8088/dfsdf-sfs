import React, { useState, useEffect } from 'react';

const messages = [
  'AI đang chọn trang phục phù hợp...',
  'Điều chỉnh ánh sáng chuyên nghiệp...',
  'Làm mịn và hoàn thiện các chi tiết...',
  'Sắp xong rồi, chờ một chút nhé...',
  'Đang tạo ra bức ảnh hoàn hảo...',
];

export const Loader: React.FC = () => {
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(prevMessage => {
        const currentIndex = messages.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % messages.length;
        return messages[nextIndex];
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm rounded-lg z-10 p-4 text-center">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-base font-semibold text-slate-700">{message}</p>
      <p className="mt-1 text-sm text-slate-500">Quá trình này có thể mất đến một phút.</p>
    </div>
  );
};