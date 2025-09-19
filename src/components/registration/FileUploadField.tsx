import React from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Upload, FileCheck, X } from 'lucide-react';

interface FileUploadFieldProps {
  label: string;
  field: string;
  file: File | null;
  onFileUpload: (field: string, file: File | null) => void;
  acceptedTypes?: string;
  required?: boolean;
}

export function FileUploadField({ 
  label, 
  field, 
  file,
  onFileUpload,
  acceptedTypes = ".pdf,.jpg,.jpeg,.png",
  required = false 
}: FileUploadFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm">{label} {required && <span className="text-red-500">*</span>}</Label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
        {file ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileCheck className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-700">{file.name}</span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onFileUpload(field, null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div>
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-500">Supported: {acceptedTypes}</p>
            <input
              type="file"
              accept={acceptedTypes}
              onChange={(e) => onFileUpload(field, e.target.files?.[0] || null)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
}