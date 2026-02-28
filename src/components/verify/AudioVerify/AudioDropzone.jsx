'use client';

import { useCallback, useRef, useState } from 'react';
import { Icons } from '@/components/icons';

const ACCEPT = 'audio/mpeg,audio/wav,audio/mp3';
const MAX_SIZE = 50 * 1024 * 1024; // 50MB

export default function AudioDropzone({ onSelect, disabled }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');

  const validateFile = (file) => {
    setError('');
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3'];
    const isValidType = validTypes.includes(file.type) || file.name.match(/\.(mp3|wav)$/i);
    if (!isValidType) {
      setError('MP3, WAV 형식만 지원합니다.');
      return false;
    }
    if (file.size > MAX_SIZE) {
      setError('파일 크기는 50MB 이하여야 합니다.');
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
    inputRef.current?.click();
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
      aria-label="음성 파일을 드래그하거나 클릭하여 업로드"
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        onChange={handleChange}
        className="verify-dropzone__input"
        aria-hidden
        disabled={disabled}
      />
      <span className="verify-dropzone__icon">{Icons.mic}</span>
      <p className="verify-dropzone__text">음성 파일을 드래그하거나 클릭하여 업로드</p>
      <p className="verify-dropzone__hint">10초 이상 1분 이하 · MP3, WAV · 최대 50MB</p>
      {error && <p className="verify-dropzone__error">{error}</p>}
    </div>
  );
}
