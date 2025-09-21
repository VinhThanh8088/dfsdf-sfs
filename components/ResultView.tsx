import React, { useState, useRef, useCallback } from 'react';
import { DownloadIcon } from './icons/DownloadIcon';
import { RefreshIcon } from './icons/RefreshIcon';

interface ResultViewProps {
  originalImageUrl: string;
  generatedImageUrl: string;
  onReset: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ originalImageUrl, generatedImageUrl, onReset }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    e.preventDefault();
    handleMove(e.clientX);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
      isDragging.current = true;
      handleMove(e.touches[0].clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };
  
  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    handleMove(e.clientX);
  };
  
  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  const handleDownload = async (format: 'jpeg' | 'png' | 'original') => {
    if (format === 'original') {
        try {
            const response = await fetch(generatedImageUrl);
            const blob = await response.blob();
            const fileExtension = blob.type.split('/')[1] || 'png';
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ai-id-photo-original.${fileExtension}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Lỗi khi tải xuống ảnh gốc:", error);
            alert("Không thể tải xuống ảnh gốc. Vui lòng thử lại.");
        }
        return;
    }

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = generatedImageUrl;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(image, 0, 0);
        
        const mimeType = `image/${format}`;
        const fileExtension = format === 'jpeg' ? 'jpg' : 'png';
        
        const imageUrl = canvas.toDataURL(mimeType, 1.0);
        
        const a = document.createElement('a');
        a.href = imageUrl;
        a.download = `ai-id-photo.${fileExtension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    };
  };

  return (
    <div className="flex flex-col items-center h-full">
      <div 
        ref={containerRef}
        className="relative w-full flex-grow cursor-ew-resize select-none overflow-hidden rounded-lg bg-white"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <img src={originalImageUrl} alt="Original" className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none" />
        <div
          className="absolute top-0 left-0 h-full w-full overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img src={generatedImageUrl} alt="Generated" className="absolute top-0 left-0 w-full h-full object-contain" />
        </div>
        <div
          className="absolute top-0 h-full w-1 bg-white/50 backdrop-invert pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
           <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center border-2 border-white shadow-lg">
             <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
           </div>
        </div>
      </div>
       <div className="w-full pt-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
            <button
                onClick={() => handleDownload('jpeg')}
                className="w-full bg-blue-600 text-white text-center font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-base shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
            >
                <DownloadIcon className="w-5 h-5" />
                <span>Tải JPG</span>
            </button>
            <button
                onClick={onReset}
                className="w-full bg-slate-200 text-slate-700 text-center font-bold py-3 px-4 rounded-lg hover:bg-slate-300 transition-colors text-base flex items-center justify-center gap-2"
            >
                 <RefreshIcon className="w-5 h-5" />
                 <span>Tạo mới</span>
            </button>
        </div>
        <div className="text-center flex items-center justify-center gap-x-4">
            <button 
                onClick={() => handleDownload('png')} 
                className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
            >
                Lưu dưới dạng PNG
            </button>
            <span className="text-slate-300">|</span>
            <button 
                onClick={() => handleDownload('original')} 
                className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
            >
                Lưu bản gốc
            </button>
        </div>
      </div>
    </div>
  );
};