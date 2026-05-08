"use client";

import { useState, useRef } from "react";
import { uploadFileAction } from "@/actions/upload";
import { Upload, FileText, CheckCircle2, Loader2, X } from "lucide-react";

interface FileUploadProps {
  label: string;
  subLabel: string;
  accept: string;
  folder: string;
  iconType?: "image" | "document";
}

export default function FileUpload({ label, subLabel, accept, folder, iconType = "image" }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ url: string, name: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const result = await uploadFileAction(formData);
      
      if (result.success && result.url) {
        setUploadedFile({ url: result.url, name: result.filename || file.name });
      } else {
        setError(result.error || "Upload failed");
      }
    } catch (err) {
      setError("An unexpected error occurred during upload");
    } finally {
      setIsUploading(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors relative
        ${isDragging ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900"}
        ${uploadedFile ? "border-green-500 bg-green-50 dark:bg-green-900/10" : ""}
      `}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => !isUploading && fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={onFileChange}
        accept={accept}
      />

      {isUploading ? (
        <div className="flex flex-col items-center text-blue-600">
          <Loader2 className="h-8 w-8 mb-3 animate-spin" />
          <span className="text-sm font-medium">Uploading...</span>
        </div>
      ) : uploadedFile ? (
        <div className="flex flex-col items-center w-full">
          <div className="absolute top-2 right-2">
            <button 
              onClick={removeFile}
              className="p-1 bg-white dark:bg-slate-800 rounded-full text-slate-400 hover:text-red-500 shadow-sm"
              title="Remove file"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <CheckCircle2 className="h-8 w-8 text-green-500 mb-3" />
          <span className="text-sm font-medium text-slate-900 dark:text-white truncate max-w-[200px]" title={uploadedFile.name}>
            {uploadedFile.name}
          </span>
          <a 
            href={uploadedFile.url} 
            target="_blank" 
            rel="noreferrer"
            className="text-xs text-blue-600 hover:underline mt-1"
            onClick={(e) => e.stopPropagation()}
          >
            View uploaded file
          </a>
        </div>
      ) : (
        <>
          {iconType === "image" ? (
            <Upload className="h-8 w-8 text-slate-400 mb-3" />
          ) : (
            <FileText className="h-8 w-8 text-slate-400 mb-3" />
          )}
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {label}
          </span>
          <span className="text-xs text-slate-500 mt-1">{subLabel}</span>
          {error && (
            <span className="text-xs text-red-500 mt-2 font-medium">{error}</span>
          )}
        </>
      )}
    </div>
  );
}
