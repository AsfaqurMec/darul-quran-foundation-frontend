'use client';

import { useRef, useState, useEffect } from 'react';

type Props = {
  multiple?: boolean;
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  accept?: string;
  label?: string;
};

// Simple client-side media uploader that returns object URLs (no server storage).
export default function MediaUploader({ multiple, value, onChange, accept = 'image/*', label = 'Upload media' }: Props): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const [urls, setUrls] = useState<string[]>(Array.isArray(value) ? value : (value ? [value] : []));

  useEffect(() => {
    if (Array.isArray(value)) setUrls(value);
    else if (typeof value === 'string') setUrls(value ? [value] : []);
  }, [value]);

  const openPicker = () => inputRef.current?.click();

  const onFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const selected = Array.from(files).map((f) => URL.createObjectURL(f));
    const next = multiple ? [...urls, ...selected] : [selected[0]];
    setUrls(next);
    onChange(multiple ? next : next[0]);
  };

  const removeAt = (i: number) => {
    const next = urls.filter((_, idx) => idx !== i);
    setUrls(next);
    onChange(multiple ? next : (next[0] ?? ''));
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onFiles(e.dataTransfer.files);
  };

  return (
    <div>
      <input ref={inputRef} type="file" className="hidden" accept={accept} multiple={multiple} onChange={(e)=>onFiles(e.target.files)} />
      <div
        onClick={openPicker}
        onDragOver={(e)=>e.preventDefault()}
        onDrop={onDrop}
        className="rounded-lg border border-dashed p-4 text-center cursor-pointer hover:bg-gray-50"
      >
        <div className="text-sm text-gray-600">{label}</div>
        <div className="text-xs text-gray-500">Click to choose or drag & drop</div>
      </div>
      {urls.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {urls.map((u, i) => (
            <div key={i} className="relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={u} alt="preview" className="h-24 w-full object-cover rounded" />
              <button type="button" onClick={() => removeAt(i)} className="absolute top-1 right-1 rounded bg-white/80 px-1 text-xs shadow opacity-0 group-hover:opacity-100">
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


