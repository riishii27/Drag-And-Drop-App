import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const Dropdown = ({ className }) => {
  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
    if (rejectedFiles.length) {
      setRejected(rejectedFiles); // Save rejected files as-is
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1000, // 1MB
  });

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
    setRejected((rejected) => rejected.filter((file) => file.file.name !== name)); // Remove from rejected files
  };

  return (
    <div className="container mt-4">
      <form>
        <div
          {...getRootProps({
            className: `dropzone p-4 border rounded ${className}`,
          })}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-center text-muted">Drop the files here ...</p>
          ) : (
            <p className="text-center text-muted">Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>

        <h3 className="mt-5 mb-3">Accepted Files</h3>
        <ul className="list-unstyled">
          {files.map((file) => (
            <li key={file.name} className="mb-3">
              <div className="d-flex align-items-center">
                <img
                  className="img-thumbnail me-3"
                  src={file.preview}
                  alt={file.name}
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  onLoad={() => URL.revokeObjectURL(file.preview)}
                />
                <div>
                  <p className="mb-1">{file.name}</p>
                  <button
                    type="button"
                    onClick={() => removeFile(file.name)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <h3 className="mt-5 mb-3">Rejected Files</h3>
        <ul className="list-unstyled">
          {rejected.map(({ file, errors }) => (
            <li key={file.name} className="mb-3">
              <p className="mb-1"><strong>{file.name}</strong></p>
              <ul className="list-unstyled">
                {errors.map((error) => (
                  <li key={error.code} className="text-danger">
                    {error.message}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => removeFile(file.name)}
                className="btn btn-danger mt-2"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default Dropdown;
