import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

const Progress = () => {
  const isLoading = useSelector((state) => state.ui.isLoading);

  if (!isLoading) return null;

  return (
    <>
      <Box
        sx={{
          width: 1,
          height: "100vh",
          position: "fixed",
          top: 0,
          backgroundColor: "#ffffff88",
          zIndex: 1201,
        }}
      ></Box>
      <Box sx={{ position: "fixed", top: 0, width: 1, zIndex: 9999 }}>
        <LinearProgress />
      </Box>
    </>
  );
};

export default Progress;
