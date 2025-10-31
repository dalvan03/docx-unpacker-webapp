"use client";

import { useState, useCallback, type DragEvent, useRef } from 'react';
import { UploadCloud } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import type { Dictionary } from '@/get-dictionary';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
  dictionary: Dictionary['docxUnpacker']['fileUpload'];
}

export function FileUpload({ onFileSelect, isLoading, dictionary }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File | null | undefined) => {
    if (file && file.name.endsWith('.docx')) {
      onFileSelect(file);
    } else {
      alert(dictionary.validationError);
    }
  }, [onFileSelect, dictionary.validationError]);

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    handleFile(file);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    handleFile(file);
  };
  
  const onBrowseClick = () => {
    fileInputRef.current?.click();
  }

  return (
    <div
      className={cn(
        'w-full max-w-2xl mx-auto text-center p-8 border-2 border-dashed rounded-xl transition-all duration-300',
        isDragging ? 'border-primary bg-accent/50' : 'border-border hover:border-primary/50'
      )}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <UploadCloud className={cn("h-16 w-16", isDragging ? "text-primary animate-bounce" : "text-muted-foreground")} />
        <div className="space-y-2">
            <h3 className="text-2xl font-semibold">{dictionary.title}</h3>
            <p className="text-muted-foreground">{dictionary.subtitle}</p>
        </div>
        <input
            type="file"
            ref={fileInputRef}
            onChange={onFileChange}
            accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            disabled={isLoading}
        />
        <Button onClick={onBrowseClick} disabled={isLoading} size="lg">
            {dictionary.button}
        </Button>
      </div>
    </div>
  );
}
