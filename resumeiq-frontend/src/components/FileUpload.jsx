import React, { useState } from "react";

export default function FileUpload({ onUploadSuccess, onUploadError, uploading, setUploading }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setMessage('');
    onUploadError('');
    onUploadSuccess(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    setUploading(true);
    setMessage('Uploading...');
    onUploadError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      onUploadSuccess(true);
      setMessage(`"${file.name}" uploaded successfully!`);
      setFile(null);
    } catch (error) {
      console.error('Upload error:', error);
      onUploadError('File upload failed. Please try again.');
      setMessage('');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 text-center border border-blue-100 max-w-md mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 font-inter">Upload Your Resume</h1>
      <input
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileChange}
        className="mb-4 block w-full text-gray-700 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      <button
        type="button"
        onClick={handleUpload}
        disabled={!file || uploading}
        className={`w-full mt-4 px-6 py-3 rounded-lg font-semibold transition transform duration-200 ${
          !file || uploading
            ? 'bg-gray-400 text-white cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95'
        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center`}
      >
        {uploading ? (
          <>
            <div className="animate-spin fallback-spin rounded-full h-5 w-5 border-t-4 border-b-4 border-white mr-2"></div>
            <span>Uploading...</span>
          </>
        ) : (
          'Upload Resume'
        )}
      </button>
      {message && (
        <div className={`mt-4 text-sm ${
          message.includes('Uploading...')
            ? 'text-blue-600 font-semibold'
            : message.includes('successfully')
              ? 'text-green-600'
              : 'text-gray-700'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
}
