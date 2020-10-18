const styles = (theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    maxWidth: "100%",
  },
  iconAdd:{
    display: 'inline-grid',
  },root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    color: '#3f51b5',
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
});
export default styles;
