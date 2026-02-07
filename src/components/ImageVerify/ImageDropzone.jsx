'use client';

import { useCallback, useState } from 'react';
import { Icons } from '@/components/icons';

const ACCEPT = 'image/jpeg,image/png,image/webp';
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export default function ImageDropzone({ onSelect, disabled }) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');

  const validateFile = (file) => {
    setError('');
    if (!file.type.match(/^image\/(jpeg|png|webp)$/)) {
      setError('JPG, PNG, WebP 형식만 지원합니다.');
      return false;
    }
    if (file.size > MAX_SIZE) {
      setError('파일 크기는 10MB 이하여야 합니다.');
      return false;
    }
    return true;
  };

  const handleFile = useCallback(
    (file) => {
      if (!file || disabled) return;
      if (!validateFile(file)) return;
      onSelect?.(file);
    },
    [onSelect, disabled]
  );

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer?.files?.[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleChange = (e) => {
    const file = e.target?.files?.[0];
    handleFile(file);
    e.target.value = '';
  };

  const handleClick = () => {
    if (disabled) return;
    document.getElementById('image-verify-input')?.click();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`verify-dropzone ${isDragging ? 'verify-dropzone--dragging' : ''} ${disabled ? 'verify-dropzone--disabled' : ''}`}
      aria-label="이미지를 드래그하거나 클릭하여 업로드"
    >
      <input
        id="image-verify-input"
        type="file"
        accept={ACCEPT}
        onChange={handleChange}
        className="verify-dropzone__input"
        aria-hidden
        disabled={disabled}
      />
      <span className="verify-dropzone__icon">{Icons.image}</span>
      <p className="verify-dropzone__text">이미지를 드래그하거나 클릭하여 업로드</p>
      <p className="verify-dropzone__hint">JPG, PNG, WebP · 최대 10MB</p>
      {error && <p className="verify-dropzone__error">{error}</p>}
    </div>
  );
}
