import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  changePageNumber,
  getAllImages,
  getNOPages,
  getPageNumber,
} from "../store/images";
import { useDispatch, useSelector } from "react-redux";

const ImagesPagination = () => {
  const page = useSelector(getPageNumber);
  const noPages = useSelector(getNOPages);
  const noImages = useSelector(getAllImages).length;

  const dispatch = useDispatch();

  const handleChange = (e, value) => {
    dispatch(changePageNumber(value));
  };

  if (!noImages) return null;

  return (
    <Stack alignItems="center">
      <Pagination
        page={page}
        count={noPages}
        color="primary"
        onChange={handleChange}
      />
    </Stack>
  );
};

export default ImagesPagination;
