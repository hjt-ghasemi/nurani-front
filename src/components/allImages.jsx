import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ImageCard from "./ImageCard";
import {
  deleteImage,
  editImage,
  getAllImages,
  loadImages,
} from "../store/images";
import { useDispatch, useSelector } from "react-redux";
import TagFilter from "./TagFilter";
import ImagesPagination from "./ImagesPagination";

const AllImages = () => {
  const images = useSelector(getAllImages);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadImages);
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteImage(id));
  };

  const handleEdit = (id, image, tags) => {
    dispatch(editImage(id, image, tags));
  };

  return (
    <Container maxWidth="sm">
      <TagFilter />

      {images.length === 0 ? (
        <Typography variant="caption" display="block" gutterBottom>
          There is no image in database.
        </Typography>
      ) : (
        images.map((image) => (
          <ImageCard
            key={image.id}
            id={image.id}
            imgUrl={image.image}
            tags={image.tags}
            onDelete={() => handleDelete(image.id)}
            onEdit={handleEdit}
          />
        ))
      )}

      <ImagesPagination />
    </Container>
  );
};

export default AllImages;
