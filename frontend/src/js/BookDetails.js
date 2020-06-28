"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clsx_1 = __importDefault(require("clsx"));
const CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
const styles_1 = require("@material-ui/core/styles");
const Card_1 = __importDefault(require("@material-ui/core/Card"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const Router = __importStar(require("react-router-dom"));
const Paper_1 = __importDefault(require("@material-ui/core/Paper"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const react_1 = __importDefault(require("react"));
const react_material_ui_carousel_1 = __importDefault(require("react-material-ui-carousel"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Container_1 = __importDefault(require("@material-ui/core/Container"));
const Reviews_1 = __importDefault(require("./Reviews"));
const useStyles = styles_1.makeStyles((theme) => ({
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        height: 500,
        width: 250,
        justify: 'center',
        backgroundPosition: 'center',
    },
    root: {
        height: '100vh',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingLeft: theme.spacing(45),
        paddingRight: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
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
    blockSpacing: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
}));
function Slides(props) {
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ];
    // todo: multi slides Carousel? too mcuh work for sprint 1 ;-;
    return (react_1.default.createElement(react_material_ui_carousel_1.default, null, items.map(item => react_1.default.createElement(Item, { item: item }))));
}
function Item(props) {
    const classes = useStyles();
    return (react_1.default.createElement(Card_1.default, { className: classes.cardGrid },
        react_1.default.createElement(Typography_1.default, { component: "p", align: "center" }, props.item.name),
        react_1.default.createElement(Typography_1.default, { component: "p", align: "center" }, props.item.description),
        react_1.default.createElement(Grid_1.default, { container: true, justify: "center", className: classes.blockSpacing },
            react_1.default.createElement(Button_1.default, { component: Router.Link, to: "/bookdata/metadata", type: "submit", variant: "contained", color: "primary" }, "Check it out!"))));
}
function Metadata() {
    const classes = useStyles();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Grid_1.default, null,
            react_1.default.createElement(Typography_1.default, { variant: "h4", align: "center", color: "textPrimary" }, "Book Title"),
            react_1.default.createElement(Typography_1.default, { component: "p", align: "center" }, "by Author"),
            react_1.default.createElement(Typography_1.default, { component: "p", align: "center", className: classes.blockSpacing }, "description"),
            react_1.default.createElement(Grid_1.default, { container: true, justify: "center" },
                react_1.default.createElement(Button_1.default, { component: Router.Link, to: "/bookdata/metadata", type: "submit", variant: "contained", color: "primary" }, "Add to Library")))));
}
//<Grid item xs={12} md={4} lg={3}>
const BookDetails = ({}) => {
    // This page is rendered when user clicks on 'My Collections.'
    //const [index, setIndex] = React.useState(0);
    const classes = useStyles();
    // const handleSelect = (selectedIndex, e) => {
    //     setIndex(selectedIndex);
    // };
    const fixedHeightPaper = clsx_1.default(classes.paper, classes.fixedHeight);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(CssBaseline_1.default, null),
        react_1.default.createElement("main", null,
            react_1.default.createElement(Container_1.default, { maxWidth: "xl" },
                react_1.default.createElement(Grid_1.default, { container: true, spacing: 3, className: classes.container },
                    react_1.default.createElement(Grid_1.default, { item: true, xs: false, md: 5, lg: 6, className: classes.image }),
                    react_1.default.createElement(Grid_1.default, { item: true, xs: 12, md: 6, lg: 3 },
                        react_1.default.createElement(Paper_1.default, { className: fixedHeightPaper },
                            react_1.default.createElement(Metadata, null)),
                        react_1.default.createElement(Grid_1.default, { item: true, className: classes.heroButtons },
                            react_1.default.createElement(Button_1.default, { component: Router.Link, to: "/auth/signup", type: "submit", variant: "contained", color: "primary" }, "Report False Book Details"))))),
            react_1.default.createElement(Container_1.default, { maxWidth: "xl" },
                react_1.default.createElement(Grid_1.default, { container: true, spacing: 3, className: classes.container },
                    react_1.default.createElement(Grid_1.default, { item: true, xs: 12, md: 8, lg: 9 },
                        react_1.default.createElement(Paper_1.default, { className: classes.paper },
                            react_1.default.createElement(Reviews_1.default, null))),
                    react_1.default.createElement(Grid_1.default, { item: true, xs: 12, md: 8, lg: 9 },
                        react_1.default.createElement(Typography_1.default, { component: "h4", variant: "h4", align: "left", color: "textSecondary", gutterBottom: true }, "More Books like this:"),
                        react_1.default.createElement(Slides, null)))))));
};
exports.default = BookDetails;
// <React.Fragment>
//           <Grid container component="main" className={classes.root}>
//             <CssBaseline />
//               <Grid item xs={false} sm={4} md={7} className={classes.image} />
//                  <CarouselProvider
//                     naturalSlideWidth={100}
//                     naturalSlideHeight={125}
//                     totalSlides={3}
//                   >
//                     <Slider>
//                       <Slide index={0}>I am the first Slide.</Slide>
//                       <Slide index={1}>I am the second Slide.</Slide>
//                       <Slide index={2}>I am the third Slide.</Slide>
//                     </Slider>
//                     <ButtonBack>Back</ButtonBack>
//                     <ButtonNext>Next</ButtonNext>
//                   </CarouselProvider>
//               </Grid>    
//       </React.Fragment>   
// <CarouselProvider
//                     naturalSlideWidth={100}
//                     naturalSlideHeight={125}
//                     totalSlides={3}
//                   >
//                     <Slider>
//                       <Slide index={0}>I am the first Slide.</Slide>
//                       <Slide index={1}>I am the second Slide.</Slide>
//                       <Slide index={2}>I am the third Slide.</Slide>
//                     </Slider>
//                     <ButtonBack>Back</ButtonBack>
//                     <ButtonNext>Next</ButtonNext>
//                   </CarouselProvider>
//# sourceMappingURL=BookDetails.js.map