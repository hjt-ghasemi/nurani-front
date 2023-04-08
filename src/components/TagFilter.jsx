import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTagFilter,
  getTagFilter,
  searchImagesByTag,
} from "../store/images";

const SearchButton = ({ onClick }) => (
  <IconButton onClick={onClick} color="primary">
    <SearchIcon />
  </IconButton>
);

const TagFilter = () => {
  const tagFilter = useSelector(getTagFilter);
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(searchImagesByTag);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <TextField
        sx={{ width: 1 }}
        id="standard-name"
        label="Search by a tag"
        value={tagFilter}
        InputProps={{ endAdornment: <SearchButton onClick={handleSearch} /> }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.target.blur();
          }
        }}
        onBlur={handleSearch}
        onChange={(e) => dispatch(changeTagFilter(e.target.value))}
      />
    </Box>
  );
};

export default TagFilter;
