import React from 'react';



const useSelectFile = () => {
    const [selectFile, setSelectFile] = React.useState<string>('');
    const [error, setError] = React.useState<Boolean>(false)
    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        if (e.target.files?.[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            if (readerEvent.target?.result) setSelectFile(readerEvent.target.result as string)
        }
    }
    return {onSelectFile, selectFile, setSelectFile}
}
export default useSelectFile;