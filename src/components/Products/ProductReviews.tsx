import {
  Box,
  Button,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Modal,
  Rating,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { singleProductService } from "./service";
import { ProductProps } from "./types";
import { DateTime } from "../common";
import useSWR from "swr";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  margin: "10px",
};

/**
 * A Review button with a Modal dialog showing the product reviews
 * @param {string} productId - Id of the product to display the review
 * @returns - A Modal containing the product reviews
 */
const ProductReviews = ({ productId }: { productId: number }) => {
  const [showReviewModal, setShowReviewModal] = useState(false);

  const { data: product, isLoading } = useSWR<ProductProps>(
    showReviewModal ? { productId } : null, // SWR key or null to skip fetch
    () => singleProductService({ productId }) // Fetcher function
  );

  return (
    <>
      <Button size="small" onClick={() => setShowReviewModal(true)}>
        View Reviews
      </Button>
      <Modal
        open={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isLoading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center", // Center horizontally
                alignItems: "center", // Center vertically
                height: "100%", // Make sure it takes up the full height of the modal box
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {!isLoading && (
            <>
              <Typography variant="h6" id="parent-modal-title">
                {product?.title}
              </Typography>
              <ReviewsList reviews={product?.reviews || []} />
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

/**
 * A component that displays a list of reviews
 * @param {Object[]} reviews - list of reviews data
 * @returns - A list of reviews
 */
const ReviewsList = ({ reviews }: { reviews: ProductProps["reviews"] }) => {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {reviews.map((review, idx) => {
        return (
          <>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <>
                    <Rating readOnly value={review.rating} />
                    <Typography>{review.comment}</Typography>
                  </>
                } // Shows the Rating the Comment
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {review.reviewerName}
                    </Typography>
                    {" - "}
                    <DateTime dateTime={review.date} />
                  </React.Fragment>
                } // Shows the Reviewer name and date of review
              />
            </ListItem>
            {/* Hide the divider at the last Review */}
            {idx < reviews.length - 1 && <Divider component="li" />}
          </>
        );
      })}
    </List>
  );
};

export default ProductReviews;
