import { ModalProps } from '@app/dekits/modal';
import { useSubscription } from '@app/hooks/subscription';
import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Observable } from 'rxjs';

interface FileWithPreview extends File {
  preview: string;
}

interface DragDropFileData {
  onSaveFile: (files: File[]) => Observable<any>;
}

export function DragDropFile(props: ModalProps<DragDropFileData>) {
  console.log(props)
  const subscription = useSubscription();
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const { modalRef, data } = props;

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const images = files.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} style={{ width: "200px" }} alt='preview' />
      </div>
    </div>
  ))

  const handleSave = useCallback(() => {
    const updateFileSub = data?.onSaveFile(files).subscribe({
      next: () => {
        // do something...
        modalRef.close()
      }
    });

    subscription.add(updateFileSub);
  }, [files])

  const dragdropstyle = {
    'border': '1px dashed',
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'height': '200px'
  }

  const previewstyle = {
    height: '200px',
    display: 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'marginBottom': '20px'
  }
  const modalstyle = {
    padding: '10px'
  }
  return (
    <div style={modalstyle}>
      <div style={dragdropstyle} {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {images && images.length >0 && <div style={previewstyle} className='de-thumbs'>{images}</div>}
      <div className='row'>
        <div className='col-md-6 col-6'>
          <a onClick={modalRef.close} className='de-btn w-100'>
            <span>cancel</span>
          </a>
        </div>
        <div className='col-md-6 col-6'>
          <button type='button' className='de-btn de-btn-primary w-100' onClick={handleSave}>
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  )
}
