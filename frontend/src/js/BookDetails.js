"use strict";
// BookDetails.tsx
// Displays details for a particular book including book metadata and book reviews.
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
const react_1 = __importDefault(require("react"));
const Router = __importStar(require("react-router-dom"));
const $ = require("jquery");
// Page Imports
const Reviews_1 = __importDefault(require("./Reviews"));
const CookieService_1 = __importDefault(require("../services/CookieService"));
// Material UI
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Card_1 = __importDefault(require("@material-ui/core/Card"));
const Container_1 = __importDefault(require("@material-ui/core/Container"));
const CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const Paper_1 = __importDefault(require("@material-ui/core/Paper"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const clsx_1 = __importDefault(require("clsx"));
const styles_1 = require("@material-ui/core/styles");
const useStyles = styles_1.makeStyles((theme) => ({
    image: {
        backgroundImage: "url(https://source.unsplash.com/random)",
        backgroundRepeat: "no-repeat",
        backgroundColor: theme.palette.type === "light"
            ? theme.palette.grey[50]
            : theme.palette.grey[900],
        backgroundSize: "cover",
        height: 500,
        width: 250,
        justify: "center",
        backgroundPosition: "center",
    },
    root: {
        height: "100vh",
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
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
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
// function Slides(props) {
//   // Made ID fields so that the compiler shuts up.
//   var items = [
//     {
//       id: 1,
//       name: "Random Name #1",
//       description: "Probably the most random thing you have ever seen!",
//     },
//     {
//       id: 2,
//       name: "Random Name #2",
//       description: "Hello World!",
//     },
//   ];
//   return (
//     <Carousel>
//       {items.map((item) => (
//         <Item key={item.id} item={item} />
//       ))}
//     </Carousel>
//   );
// }
function Item(props) {
    const classes = useStyles();
    return (react_1.default.createElement(Card_1.default, { className: classes.cardGrid },
        react_1.default.createElement(Typography_1.default, { component: "p", align: "center" }, props.item.name),
        react_1.default.createElement(Typography_1.default, { component: "p", align: "center" }, props.item.description),
        react_1.default.createElement(Grid_1.default, { container: true, justify: "center", className: classes.blockSpacing },
            react_1.default.createElement(Button_1.default, { component: Router.Link, to: "/bookdata/metadata", type: "submit", variant: "contained", color: "primary" }, "Check it out!"))));
}
function viewBook(data) {
    window.location.href = "/bookdata/metadata?id=" + data;
}
const BookDetails = ({}) => {
    const classes = useStyles();
    const fixedHeightPaper = clsx_1.default(classes.paper, classes.fixedHeight);
    const token = CookieService_1.default.get("access_token");
    let str = window.location.href.split("?")[1];
    let type = str.split("=")[0];
    str = str.split("=")[1];
    console.log("To find: " + str + " of type: " + type);
    let book;
    function request() {
        var data = onSearch(function (data) {
            if (data != null) {
                console.log(data);
                book = data;
            }
            else {
                alert("Something Wrong!");
                window.location.href = "/";
            }
        });
    }
    function addBook(id) {
        var data = addLib(id, function (data) {
            if (data != null) {
                console.log(data);
                console.log("added to lib!!");
            }
            else {
                alert("Something Wrong!");
                window.location.href = "/";
            }
        });
    }
    function addLib(id, callback) {
        console.log(id);
        $.ajax({
            async: false,
            url: "http://localhost:8000/api/collections/add_to_library",
            data: {
                auth: token,
                id: str,
            },
            method: "POST",
            success: function (data) {
                console.log(data);
                if (data.message == "Book added to library") {
                    callback(data);
                }
                else {
                    callback(null);
                }
            },
            error: function () {
                console.log("server error!");
                callback(null);
            },
        });
    }
    function onSearch(callback) {
        let str = window.location.href.split("?")[1];
        str = str.split("=")[1];
        console.log(str);
        $.ajax({
            async: false,
            url: "http://localhost:8000/api/books/data",
            data: {
                id: str,
            },
            method: "GET",
            success: function (data) {
                console.log(data.message);
                if (data.message == "Got book data") {
                    callback(data);
                }
                else {
                    callback(null);
                }
            },
            error: function () {
                console.log("server error!");
                callback(null);
            },
        });
    }
    request();
    console.log("hello " + book);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(CssBaseline_1.default, null),
        react_1.default.createElement("main", null,
            react_1.default.createElement(Container_1.default, { maxWidth: "xl" },
                react_1.default.createElement(Grid_1.default, { container: true, spacing: 3, className: classes.container },
                    react_1.default.createElement(Grid_1.default, { item: true, xs: false, md: 5, lg: 6, className: classes.image }),
                    react_1.default.createElement(Grid_1.default, { item: true, xs: 12, md: 6, lg: 3 },
                        react_1.default.createElement(Paper_1.default, { className: fixedHeightPaper },
                            react_1.default.createElement(Grid_1.default, null,
                                react_1.default.createElement(Typography_1.default, { variant: "h4", align: "center", color: "textPrimary" }, book.book_title),
                                react_1.default.createElement(Typography_1.default, { component: "p", align: "center" },
                                    "By Author: ",
                                    book.book_author),
                                react_1.default.createElement(Typography_1.default, { component: "p", align: "center", className: classes.blockSpacing },
                                    "Published by ",
                                    book.book_pub_date),
                                react_1.default.createElement(Grid_1.default, { container: true, justify: "center" },
                                    react_1.default.createElement(Button_1.default, { onClick: () => addBook(book.book_id), type: "submit", variant: "contained", color: "primary" }, "Add to Library")))),
                        react_1.default.createElement(Grid_1.default, { item: true, className: classes.heroButtons },
                            react_1.default.createElement(Button_1.default, { component: Router.Link, to: "/auth/signup", type: "submit", variant: "contained", color: "primary" }, "Report False Book Details"))))),
            react_1.default.createElement(Container_1.default, { maxWidth: "xl" },
                react_1.default.createElement(Grid_1.default, { container: true, spacing: 3, className: classes.container },
                    react_1.default.createElement(Grid_1.default, { item: true, xs: 12, md: 8, lg: 9 },
                        react_1.default.createElement(Paper_1.default, { className: classes.paper },
                            react_1.default.createElement(Reviews_1.default, { book: book }))),
                    " ",
                    react_1.default.createElement(Grid_1.default, { item: true, xs: 12, md: 8, lg: 9 },
                        react_1.default.createElement(Typography_1.default, { component: "h4", variant: "h4", align: "left", color: "textSecondary", gutterBottom: true }, "More Books like this:")))))));
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