import { createSelector, createSlice } from "@reduxjs/toolkit";
import imageService from "../services/imageService";
import { beginLoading, endLoading } from "./ui";
import config from "../config.json";
import { toast } from "react-toastify";

const slice = createSlice({
  name: "images",
  initialState: {
    list: [],
    pageNumber: 1,
    tagFilter: "",
    noPages: 1,
    fetchRequired: true,
  },
  reducers: {
    imagesReceived: (images, action) => {
      images.list = action.payload;
      images.fetchRequired = false;
    },
    anImageUpdated: (images, action) => {
      action.payload.id = parseInt(action.payload?.id);

      const index = images.list.findIndex(
        (img) => img.id === action.payload.id
      );
      images.list[index] = action.payload;
    },
    imagesPageChanged: (images, action) => {
      images.pageNumber = action.payload;
      images.fetchRequired = true;
    },
    imagesNOPagesChanged: (images, action) => {
      images.noPages = action.payload;
    },
    imagesTagFilterChanged: (images, action) => {
      images.tagFilter = action.payload;
      images.fetchRequired = true;
    },
    imagesFetchRequired: (images, action) => {
      images.fetchRequired = true;
    },
  },
});

export default slice.reducer;

// Actions
const {
  imagesReceived,
  imagesNOPagesChanged,
  imagesPageChanged,
  imagesTagFilterChanged,
  imagesFetchRequired,
  anImageUpdated,
} = slice.actions;

// Selectors
export const getPageNumber = createSelector(
  (state) => state.entities.images.pageNumber,
  (pageNumber) => pageNumber
);

export const getNOPages = createSelector(
  (state) => state.entities.images.noPages,
  (noPages) => noPages
);

export const getTagFilter = createSelector(
  (state) => state.entities.images.tagFilter,
  (tagFilter) => tagFilter
);

export const getAllImages = createSelector(
  (state) => state.entities.images.list,
  (list) => list
);

// Action creators
export const loadImages = async (dispatch, getState) => {
  if (!getState().entities.images.fetchRequired) return;

  dispatch({ type: "Loading images" });

  try {
    dispatch(beginLoading);
    const {
      data: { count, content: images },
    } = await imageService.getImages(
      getPageNumber(getState()),
      getTagFilter(getState()).trim()
    );
    const noPages = Math.ceil(count / config.imagesPageSize);
    dispatch(imagesNOPagesChanged(noPages));
    dispatch(imagesReceived(images || []));
  } catch (ex) {
    toast.error("Something went wrong while fetching images");
  } finally {
    dispatch(endLoading);
  }
};

export const changeTagFilter = (value) => (dispatch) => {
  dispatch(imagesTagFilterChanged(value));
};

export const changeImagesFetchRequired = (dispatch) => {
  dispatch(imagesFetchRequired(true));
};

export const changePageNumber = (page) => (dispatch) => {
  dispatch(imagesPageChanged(page));
  dispatch(loadImages);
};

export const deleteImage = (id) => async (dispatch, getState) => {
  dispatch({ type: "Deleting an image" });
  const noPages = getNOPages(getState());
  const noImages = getAllImages(getState()).length;

  try {
    dispatch(beginLoading);
    await imageService.deleteImage(id);
    dispatch(imagesFetchRequired());
    if (noPages !== 1 && noImages === 1)
      dispatch(imagesPageChanged(noPages - 1));

    await dispatch(loadImages);
  } catch (ex) {
    const error =
      (ex.response && ex.response.data.message) ||
      "Something went wrong while deleting the image";
    toast.error(error);
  } finally {
    dispatch(endLoading);
  }
};

export const editImage = (id, image, tags) => async (dispatch) => {
  dispatch({ type: "Editing an image" });

  try {
    dispatch(beginLoading);
    const {
      data: { content },
    } = await imageService.edit(id, image, tags);
    toast.success("The image updated successfully.");
    dispatch(anImageUpdated(content));
  } catch (ex) {
    const error =
      (ex.response && ex.response.data.message) ||
      "Something went wrong while updating the image";
    toast.error(error);
  } finally {
    dispatch(endLoading);
  }
};

export const searchImagesByTag = async (dispatch) => {
  dispatch({ type: "Searching by tag" });
  dispatch(imagesPageChanged(1));
  dispatch(loadImages);
};
