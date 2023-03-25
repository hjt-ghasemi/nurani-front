import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { LoadingContext } from "../contexts";

const Progress = () => {
  const { loading } = useContext(LoadingContext);
  return (
    <Box sx={{ width: 1, position: "fixed", top: 0, zIndex: 100000 }}>
      {loading && <LinearProgress />}
    </Box>
  );
};

export default Progress;
