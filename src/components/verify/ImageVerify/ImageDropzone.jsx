'use client';

import { useCallback, useState } from 'react';
import { Icons } from '@/components/icons';

const ACCEPT = 'image/jpeg,image/png';
const MAX_SIZE = 20 * 1024 * 1024; // 20MB
const MIN_WIDTH = 256;
const MIN_HEIGHT = 256;

export default function ImageDropzone({ onSelect, disabled }) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');

  const validateFile = (file) => {
    setError('');
    if (!file.type.match(/^image\/(jpeg|png)$/)) {
      setError('JPG, PNG 형식만 지원합니다.');
      return false;
    }
    if (file.size > MAX_SIZE) {
      setError('파일 크기는 20MB 이하여야 합니다.');
      return false;
    }
    return true;
  };

  const validateDimensions = (file, callback) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      if (img.naturalWidth < MIN_WIDTH || img.naturalHeight < MIN_HEIGHT) {
        setError('사진 크기는 256×256 이상이어야 합니다.');
        callback(false);
      } else {
        callback(true);
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      setError('이미지 크기를 확인할 수 없습니다.');
      callback(false);
    };
    img.src = url;
  };

  const handleFile = useCallback(
    (file) => {
      if (!file || disabled) return;
      if (!validateFile(file)) return;
      validateDimensions(file, (ok) => {
        if (ok) onSelect?.(file);
      });
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
        accept="image/jpeg,image/png"
        onChange={handleChange}
        className="verify-dropzone__input"
        aria-hidden
        disabled={disabled}
      />
      <span className="verify-dropzone__icon">{Icons.image}</span>
      <p className="verify-dropzone__text">이미지를 드래그하거나 클릭하여 업로드</p>
      <p className="verify-dropzone__hint">JPG, PNG · 256×256 이상 · 최대 20MB</p>
      {error && <p className="verify-dropzone__error">{error}</p>}
    </div>
  );
}
