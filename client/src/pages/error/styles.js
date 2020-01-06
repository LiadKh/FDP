import {
	makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
	container: {
		height: "100vh",
		width: "100vw",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: theme.palette.primary.main,
		position: "absolute",
		top: 0,
		left: 0,
	},
	logotype: {
		display: "flex",
		alignItems: "center",
		marginBottom: theme.spacing(12),
		[theme.breakpoints.down("sm")]: {
			display: "none",
		},
	},
	logotypeText: {
		fontWeight: 500,
		color: "white",
		marginLeft: theme.spacing(2),
	},
	logotypeIcon: {
		width: 70,
		marginRight: theme.spacing(2),
	},
	paperRoot: {
		boxShadow: theme.customShadows.widgetDark,
		margin: '10px',
		height: '90%',
		display: "grid",
		flexDirection: "column",
		alignItems: "center",
		padding: theme.spacing(2),
		maxWidth: 404,
		[theme.breakpoints.down("xs")]: {
			height: '100%',
			maxWidth: '100%',
			margin: '0',
		},
	},
	textRow: {
		textAlign: "center",
	},
	errorCode: {
		fontSize: 148,
		fontWeight: 600,
	},
	safetyText: {
		fontWeight: 300,
		color: theme.palette.text.hint,
	},
	backButton: {
		boxShadow: theme.customShadows.widget,
		textTransform: "none",
		fontSize: 22,
	},
}));
