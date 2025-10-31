"use client";

import { useState } from 'react';
import { Folder, FileCode2, FileImage, ChevronRight } from 'lucide-react';
import type { UnpackedFile } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface FileTreeProps {
  files: UnpackedFile[];
  onSelect: (file: UnpackedFile) => void;
  selectedFile: UnpackedFile | null;
}

interface TreeItemProps extends FileTreeProps {
  file: UnpackedFile;
  level: number;
}

function TreeItem({ file, level, onSelect, selectedFile }: TreeItemProps) {
  const [isOpen, setIsOpen] = useState(level < 2);
  const isDirectory = file.type === 'directory';

  const handleToggle = () => {
    if (isDirectory) {
      setIsOpen(!isOpen);
    } else {
      onSelect(file);
    }
  };

  const Icon = isDirectory ? Folder : (file.mimeType?.startsWith('image') ? FileImage : FileCode2);

  return (
    <div>
      <Button
        variant="ghost"
        className={cn(
          'w-full justify-start h-8 px-2',
          selectedFile?.path === file.path && !isDirectory && 'bg-accent text-accent-foreground'
        )}
        style={{ paddingLeft: `${level * 1.5}rem` }}
        onClick={handleToggle}
      >
        <div className="flex items-center gap-2 truncate">
          {isDirectory && (
            <ChevronRight className={cn("h-4 w-4 transform transition-transform duration-200", isOpen && "rotate-90")} />
          )}
          {!isDirectory && <div className="w-4"></div>}
          <Icon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm truncate">{file.name}</span>
        </div>
      </Button>
      {isDirectory && isOpen && (
        <div className="flex flex-col">
          <FileTree files={file.children} level={level + 1} onSelect={onSelect} selectedFile={selectedFile} />
        </div>
      )}
    </div>
  );
}

export function FileTree({ files, level = 0, ...props }: FileTreeProps & { level?: number }) {
  return (
    <div className="flex flex-col space-y-1">
      {files.map((file) => (
        <TreeItem key={file.path} file={file} level={level} {...props} />
      ))}
    </div>
  );
}
