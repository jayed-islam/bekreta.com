import React, { useState } from "react";
import ReactImageMagnify from "react-image-magnify";

interface ImageGalleryProps {
  images: string[];
}

const ImageMagnifyGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]); // Set the initial selected image

  // Handle selecting an image from the thumbnail gallery
  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className="w-full">
      <div className="h-[400px] cursor-pointer">
        <ReactImageMagnify
          {...{
            enlargedImageContainerStyle: {
              zIndex: 9999,
              backgroundColor: "white",
              objectFit: "contain",
              position: "absolute",
              top: 0,
              left: 400,
            },
            enlargedImageStyle: {
              objectFit: "contain",
              //   position
            },
            imageStyle: {
              border: "1px solid gray",
              padding: 11,
            },
            smallImage: {
              alt: "Selected Product Image",
              isFluidWidth: false,
              width: 400,
              height: 400,
              src: selectedImage,
              //   sizes:
              //     "(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px",
            },
            largeImage: {
              src: selectedImage,
              width: 1200,
              height: 1800,
            },
            isHintEnabled: true,
            shouldHideHintAfterFirstActivation: false,
            enlargedImageContainerDimensions: {
              width: "200%",
              height: "150%",
            },
          }}
        />
      </div>

      {/* Thumbnails Section */}
      <div className="flex gap-4 mt-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`w-20 h-20 border-2 cursor-pointer ${
              selectedImage === image ? "border-orange-600" : "border-gray-300"
            }`}
            onClick={() => handleImageSelect(image)} // Select image on click
            onMouseOver={() => handleImageSelect(image)} // Optionally select on hover
          >
            <img
              src={image}
              alt={`Thumbnail ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageMagnifyGallery;
