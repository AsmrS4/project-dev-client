import React from 'react';
import { Carousel } from 'antd';
import type { ImageProps } from 'src/models/Event/Event';
import styles from './ImageItem.module.scss';

interface CarouselProps {
    images: ImageProps[];
}

const ImageCarousel: React.FC<CarouselProps> = ({ images }) => (
    <Carousel className={styles.carousel} autoplay={{ dotDuration: true }} autoplaySpeed={4000}>
        {images.map((image) => {
            return (
                <div className={styles.imageCard}>
                    <img src={image.imageUrl} alt='event image' />
                </div>
            );
        })}
    </Carousel>
);

export default ImageCarousel;
