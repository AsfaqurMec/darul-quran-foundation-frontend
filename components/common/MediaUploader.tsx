'use client';

import { useRef, useState, useEffect } from 'react';

type MediaValue = string | File;

type Props = {
  multiple?: boolean;
  value?: MediaValue | MediaValue[] | '';
  onChange: (value: MediaValue | MediaValue[] | '' | undefined) => void;
  accept?: string;
  label?: string;
};

export default function MediaUploader({ multiple, value, onChange, accept = 'image/*', label = 'Upload media' }: Props): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const toArray = (val?: MediaValue | MediaValue[] | '' | undefined): MediaValue[] => {
    if (Array.isArray(val)) return val;
    if (val === '' || val === undefined) return [];
    return [val];
  };

  useEffect(() => {
    const items = toArray(value);
    const createdUrls: string[] = [];
    const nextPreviews = items.map((item) => {
      if (typeof File !== 'undefined' && item instanceof File) {
        const url = URL.createObjectURL(item);
        createdUrls.push(url);
        return url;
      }
      return String(item ?? '');
    });
    setPreviews(nextPreviews);
    return () => {
      createdUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [value]);

  const openPicker = () => inputRef.current?.click();

  const onFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const selected = Array.from(files);
    if (multiple) {
      const current = toArray(value);
      onChange([...current, ...selected]);
    } else {
      onChange(selected[0] ?? '');
    }
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const removeAt = (index: number) => {
    const current = toArray(value);
    const next = current.filter((_, idx) => idx !== index);
    if (multiple) {
      onChange(next);
    } else {
      onChange(next[0] ?? '');
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onFiles(e.dataTransfer.files);
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={(e) => onFiles(e.target.files)}
      />
      <div
        onClick={openPicker}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="rounded-lg border border-dashed p-4 text-center cursor-pointer hover:bg-gray-50"
      >
        <div className="text-sm text-gray-600">{label}</div>
        <div className="text-xs text-gray-500">Click to choose or drag & drop</div>
      </div>
      {previews.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {previews.map((preview, i) => (
            <div key={preview + i} className="relative group">
              <img src={preview} alt="preview" className="h-24 w-full object-cover rounded" />
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="absolute top-1 right-1 rounded bg-white/80 px-1 text-xs shadow opacity-0 group-hover:opacity-100"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


