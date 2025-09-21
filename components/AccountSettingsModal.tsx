import React, { useState } from 'react';
import type { User } from '../types';
import { XIcon } from './icons/XIcon';

interface AccountSettingsModalProps {
  currentUser: User;
  onClose: () => void;
  onUpdateSuccess: (updatedUser: User) => void;
}

export const AccountSettingsModal: React.FC<AccountSettingsModalProps> = ({ currentUser, onClose, onUpdateSuccess }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newUsername, setNewUsername] = useState(currentUser.username);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const storedCredsRaw = localStorage.getItem('userCredentials');
    if (!storedCredsRaw) {
      setError('Lỗi hệ thống: Không tìm thấy thông tin đăng nhập.');
      return;
    }

    try {
      const storedCreds = JSON.parse(storedCredsRaw);
      
      if (currentPassword !== storedCreds.password) {
        setError('Mật khẩu hiện tại không chính xác.');
        return;
      }

      if (newPassword && newPassword !== confirmPassword) {
        setError('Mật khẩu mới không khớp.');
        return;
      }

      const updatedCreds = {
        username: newUsername.trim(),
        password: newPassword ? newPassword : storedCreds.password,
      };

      localStorage.setItem('userCredentials', JSON.stringify(updatedCreds));
      onUpdateSuccess({ username: updatedCreds.username });
      setSuccess('Thông tin tài khoản đã được cập nhật thành công!');
      
      setTimeout(() => {
          onClose();
      }, 1500);

    } catch {
      setError('Lỗi hệ thống: Dữ liệu đăng nhập không hợp lệ.');
    }
  };

  return (
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        aria-modal="true"
        role="dialog"
    >
      <div className="relative w-full max-w-lg p-8 bg-white rounded-xl shadow-2xl m-4">
        <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-500 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Đóng"
        >
            <XIcon className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Cài đặt Tài khoản</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label htmlFor="new-username" className="block text-sm font-medium text-slate-700">Tên đăng nhập mới</label>
            <input
              id="new-username"
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
             <p className="text-sm font-semibold text-slate-800 mb-3">Thay đổi mật khẩu</p>
             <div className="space-y-4">
                <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-slate-700">Mật khẩu mới (để trống nếu không đổi)</label>
                    <input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-700">Xác nhận mật khẩu mới</label>
                    <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
             </div>
          </div>
          
          <div>
            <label htmlFor="current-password" className="block text-sm font-medium text-slate-700">Mật khẩu hiện tại (bắt buộc)</label>
            <input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nhập mật khẩu hiện tại để lưu"
            />
          </div>

          {error && <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">{error}</div>}
          {success && <div className="bg-green-50 text-green-700 p-3 rounded-md text-sm">{success}</div>}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
