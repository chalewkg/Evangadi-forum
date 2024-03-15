// styles.js
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  inputContainer: {
    width: "100%",
  },
  input: {
    width: "100%",
    padding: theme.spacing(1),
    boxSizing: "border-box",
  },
}));

export default useStyles;
