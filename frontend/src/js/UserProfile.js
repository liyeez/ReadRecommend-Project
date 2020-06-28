"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const styles_1 = require("@material-ui/core/styles");
const CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
const Link_1 = __importDefault(require("@material-ui/core/Link"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const Container_1 = __importDefault(require("@material-ui/core/Container"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const recharts_1 = require("recharts");
const styles_2 = require("@material-ui/core/styles");
const Paper_1 = __importDefault(require("@material-ui/core/Paper"));
const Collections_1 = __importDefault(require("./Collections"));
function UserProfile() {
    // function weird(){
    //     var data; 
    //     data = onSignIn(function(result){ 
    //         alert("hello"+result);
    //     });
    // }
    // function onSignIn(callback) {
    //     $.ajax({
    //         async: false,
    //         url: "http://localhost:8000/api/auth/signin",
    //         method: "POST",
    //         data: {
    //             email: signInForm.signInEmail,
    //             password: signInForm.signInPassword
    //         },
    //         success: function (data) {
    //             console.log(data.status);
    //             console.log(data.message);
    //             if(data.status == 'ok') {
    //                 // Handle sign in success.
    //                 var result = data.token;
    //                 callback(result)
    //                 console.log("result:"+result);
    //                 //window.location.href = "/";
    //                 // The cookie will be available on all URLs.
    //                 const options = { path: "/" };
    //                 // Create a cookie with the token from response.
    //                 CookieService.set("access_token", data.token, options);
    //                 window.location.href="/";
    //             }
    //         },
    //         error: function (xhr, error) {
    //             flag=false;
    //             callback(error);
    //             console.log("server error!"+error);
    //             window.location.href="/auth/signin";
    //         }
    //     });
    const classes = useStyles();
    const fixedHeightPaper = clsx_1.default(classes.paper, classes.fixedHeight);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(CssBaseline_1.default, null),
        react_1.default.createElement(Container_1.default, { maxWidth: "sm" },
            react_1.default.createElement("div", null,
                react_1.default.createElement(Typography_1.default, { component: "h2", variant: "h2", align: "center", color: "textPrimary" }, "Home Profile"))),
        react_1.default.createElement("main", null,
            react_1.default.createElement(Container_1.default, { maxWidth: "lg", className: classes.container },
                react_1.default.createElement(Grid_1.default, { container: true, spacing: 3 },
                    react_1.default.createElement(Grid_1.default, { item: true, xs: 12, md: 8, lg: 9 },
                        react_1.default.createElement(Paper_1.default, { className: fixedHeightPaper },
                            react_1.default.createElement(Chart, null))),
                    react_1.default.createElement(Grid_1.default, { item: true, xs: 12, md: 4, lg: 3 },
                        react_1.default.createElement(Paper_1.default, { className: fixedHeightPaper },
                            react_1.default.createElement(Goal, null))))),
            react_1.default.createElement(Container_1.default, { maxWidth: "md" },
                react_1.default.createElement(Typography_1.default, { component: "h4", variant: "h4", align: "left", color: "textPrimary", gutterBottom: true }, "My Collections"),
                react_1.default.createElement(Grid_1.default, { container: true, direction: 'row', spacing: 4 }, MyCollections.map((collection) => (react_1.default.createElement(Collections_1.default, { key: collection.title, collection: collection }))))))));
}
exports.default = UserProfile;
const useStyles = styles_1.makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        wrap: 'nowrap'
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 350,
    },
    depositContext: {
        flex: 1,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%',
    },
    cardContent: {
        flexGrow: 1,
    },
}));
// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}
function Chart() {
    const theme = styles_2.useTheme();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(recharts_1.ResponsiveContainer, null,
            react_1.default.createElement(recharts_1.LineChart, { data: data, margin: {
                    top: 16,
                    right: 16,
                    bottom: 0,
                    left: 24,
                } },
                react_1.default.createElement(recharts_1.XAxis, { dataKey: "time", stroke: theme.palette.text.secondary }),
                react_1.default.createElement(recharts_1.YAxis, { stroke: theme.palette.text.secondary },
                    react_1.default.createElement(recharts_1.Label, { angle: 270, position: "left", style: { textAnchor: 'middle', fill: theme.palette.text.primary } }, "Sales ($)")),
                react_1.default.createElement(recharts_1.Line, { type: "monotone", dataKey: "amount", stroke: theme.palette.primary.main, dot: false })))));
}
function Goal() {
    const classes = useStyles();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Container_1.default, { className: classes.container },
            react_1.default.createElement(Typography_1.default, { component: "h4", variant: "h4", align: "center", color: "textPrimary" }, "Reading Goals")),
        react_1.default.createElement(Container_1.default, { className: classes.container },
            react_1.default.createElement(Typography_1.default, { component: "p", variant: "h4" }, "$3,024.00"),
            react_1.default.createElement(Typography_1.default, { color: "textSecondary", className: classes.depositContext }, "on 15 March, 2019")),
        react_1.default.createElement(Container_1.default, { className: classes.container },
            react_1.default.createElement(Link_1.default, { color: "primary", href: "#" }, "Set Goal"))));
}
const data = [
    createData('00:00', 0),
    createData('03:00', 300),
    createData('06:00', 600),
    createData('09:00', 800),
    createData('12:00', 1500),
    createData('15:00', 2000),
    createData('18:00', 2400),
    createData('21:00', 2400),
    createData('24:00', undefined),
];
const MyCollections = [
    {
        title: 'Collections 1',
        description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random',
        imageText: 'Image Text',
    },
    {
        title: 'Collections 2',
        description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random',
        imageText: 'Image Text',
    },
    {
        title: 'Collections 3',
        description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random',
        imageText: 'Image Text',
    },
    {
        title: 'Collections 4',
        description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random',
        imageText: 'Image Text',
    },
    {
        title: 'Collections 5',
        description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random',
        imageText: 'Image Text',
    },
    {
        title: 'Collections 6',
        description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random',
        imageText: 'Image Text',
    },
    {
        title: 'Collections 7',
        description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random',
        imageText: 'Image Text',
    },
    {
        title: 'Collections 8',
        description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random',
        imageText: 'Image Text',
    },
    {
        title: 'Collections 9',
        description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random',
        imageText: 'Image Text',
    },
    {
        title: 'Collections 10',
        description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random',
        imageText: 'Image Text',
    },
];
//<FeaturedPost book={book} />
//# sourceMappingURL=UserProfile.js.map