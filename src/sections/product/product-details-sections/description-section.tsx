import { IProduct } from "@/types/products";
import React from "react";
import Rating from "@mui/material/Rating";
import { Box, Typography } from "@mui/material";

interface DescriptionTabProps {
  activeTab: string;
  product: IProduct;
}

const DescriptionSection: React.FC<DescriptionTabProps> = ({
  activeTab,
  product,
}) => {
  // Calculate total ratings count
  const totalRatingCount = product.ratingCount;

  return (
    <div id="description" className={`bg-white px-5 pt-5 pb-7 shadow-sm mt-6`}>
      {/* Average Rating Section */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <Typography variant="h6" component="h2">
            Average Rating
          </Typography>
          <Rating value={product.averageRating} readOnly precision={0.5} />
          <Typography variant="body2">
            {product.averageRating.toFixed(2)} out of 5 ({totalRatingCount}{" "}
            ratings)
          </Typography>
        </div>
      </div>

      {/* Rating Distribution Section */}
      <div className="flex flex-col mt-5">
        <Typography variant="h6" component="h2" className="pb-2">
          Rating Distribution
        </Typography>
        {([5, 4, 3, 2, 1] as const).map((rating) => {
          const count = product.ratingDistribution[rating];
          const percentage = (count / totalRatingCount) * 100; // Calculate percentage for progress

          return (
            <Box key={rating} display="flex" alignItems="center" mb={1}>
              {/* Rating MUI Component */}
              <Rating
                value={rating}
                readOnly
                precision={0.5}
                size="small"
                className="mr-2"
              />

              {/* Rating Text */}
              <Typography variant="body2" className="mr-2">
                {rating} Star
              </Typography>

              {/* Progress Bar */}
              <Box
                sx={{
                  flexGrow: 1,
                  height: "10px",
                  borderRadius: "5px",
                  backgroundColor: "gray",
                  marginRight: "10px",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    width: `${percentage}%`,
                    height: "100%",
                    backgroundColor: "#faaf00",
                  }}
                />
              </Box>

              {/* Count */}
              <Typography variant="body2">{count}</Typography>
            </Box>
          );
        })}
      </div>

      {/* Specifications Section */}
      <div className="pb-5 flex flex-col gap-1 mt-5">
        <h2 className="text-xl font-semibold pb-2">Specifications</h2>
        {product.specifications.map((item, index) => (
          <h2 className="text-sm md:text-md" key={index}>
            {item}
          </h2>
        ))}
      </div>

      {/* Descriptions Section */}
      <div className="flex flex-col gap-2 mt-5">
        {product.descriptions.map((item, index) => (
          <h2 key={index}>{item}</h2>
        ))}
      </div>
    </div>
  );
};

export default DescriptionSection;
