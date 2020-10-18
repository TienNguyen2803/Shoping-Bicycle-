const styles = (theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    maxWidth: "100%",
  },
  iconAdd: {
    display: "inline-grid",
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    color: "#3f51b5",
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  formControl: {
    minWidth: "100%",
    marginTop: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  display: {
    display: "flex",
    marginBottom: "5%",
  },
  containerImg: {
    width: 150,
    height: 150,
    marginBottom: "5%",
  },
  large: {
    width: "100%",
    height: "100%",
  },
  img : {
    width: 200,
    height: 200,
  },
  mb: {
    marginBottom: "5%",
  },
});
export default styles;
