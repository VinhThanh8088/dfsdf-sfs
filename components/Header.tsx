import React from 'react';
import type { User } from '../types';
import { UserIcon } from './icons/UserIcon';
import { LogoutIcon } from './icons/LogoutIcon';

interface HeaderProps {
    user: User;
    onLogout: () => void;
    onShowSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout, onShowSettings }) => {
  return (
    <header className="bg-white/90 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Trình Tạo Ảnh Thẻ AI</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm">
                <span className="text-slate-500">Xin chào, </span>
                <span className="font-semibold text-slate-800">{user.username}</span>
            </div>
            <button
                onClick={onShowSettings}
                title="Cài đặt tài khoản"
                className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
            >
                <UserIcon className="w-5 h-5" />
            </button>
            <button
                onClick={onLogout}
                title="Đăng xuất"
                className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
            >
                <LogoutIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
