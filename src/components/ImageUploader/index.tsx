import React from 'react';
import { Input, Image } from 'antd';

import { ActionButton } from '@components/Button';
import './ImageUploader.scss';

interface ImageType {
    imageUrl: string;
}
interface ImageUploaderProps {
    imageUrls: ImageType[];
    setImageUrls: any;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ imageUrls, setImageUrls }) => {
    const handleChange = (index: number, value: string) => {
        const newImageUrls = [...imageUrls];
        newImageUrls[index].imageUrl = value;
        setImageUrls(newImageUrls);
    };

    const handleAddImage = () => {
        setImageUrls([...imageUrls, { imageUrl: '' }]);
    };

    const handleRemoveImage = (index: number) => {
        const newImageUrls = [...imageUrls];
        newImageUrls.splice(index, 1);
        setImageUrls(newImageUrls);
    };

    return (
        <div className='uploadContainer'>
            <ActionButton title={'+ Добавить'} type={'button'} onClick={handleAddImage} />
            {imageUrls.map((image, index) => (
                <div
                    className='imagePreview'
                    key={index}
                    onDoubleClick={() => {
                        handleRemoveImage(index);
                    }}
                >
                    {image.imageUrl && (
                        <div className='imageWrapper'>
                            <Image
                                preview={false}
                                className='image'
                                src={image.imageUrl}
                                alt='Preview'
                            />
                        </div>
                    )}
                    <Input
                        placeholder='Введите URL изображения'
                        value={image.imageUrl}
                        onChange={(event) => handleChange(index, event.target.value)}
                        className='urlInput'
                    />
                </div>
            ))}
        </div>
    );
};

export default ImageUploader;
