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
const LibraryBooks_1 = __importDefault(require("@material-ui/icons/LibraryBooks"));
const Paper_1 = __importDefault(require("@material-ui/core/Paper"));
const Person_1 = __importDefault(require("@material-ui/icons/Person"));
const Star_1 = __importDefault(require("@material-ui/icons/Star"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const clsx_1 = __importDefault(require("clsx"));
const styles_1 = require("@material-ui/core/styles");
const useStyles = styles_1.makeStyles((theme) => ({
    image: {
        backgroundImage: "url(https://source.unsplash.com/random)",
        backgroundRepeat: "no-repeat",
        // backgroundColor:
        //   theme.palette.type === "light"
        //     ? theme.palette.grey[50]
        //     : theme.palette.grey[900],
        // backgroundSize: "cover",
        height: 500,
        width: 700,
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
        align: 'center',
        height: 500,
    },
    blockSpacing: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
}));
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
    let inLibFlag = -1;
    function request() {
        var data = onSearch(function (data) {
            if (data != null) {
                console.log(data);
                book = data;
            }
            else {
                alert("Failed to get book data!");
                window.location.href = "/";
            }
        });
    }
    function addBook(id) {
        var data = addLib(id, function (data) {
            if (data != null) {
                console.log(data);
                if (data.message == "Book added to library") {
                    window.location.href = '/bookdata/metadata?id=' + id;
                }
            }
            else {
                alert(data.message);
            }
        });
    }
    function addLib(id, callback) {
        console.log(id);
        $.ajax({
            async: false,
            url: API_URL + "/api/collections/add_to_library",
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
            },
            error: function () {
                console.log("server error!");
                callback(null);
            },
        });
    }
    function removeBook(id) {
        $.ajax({
            async: false,
            url: API_URL + "/api/collections/delete_from_library",
            data: {
                auth: token,
                id: id,
            },
            method: "POST",
            success: function (data) {
                console.log(data);
                if (data.message == "Book removed from library") {
                    window.location.href = '/bookdata/metadata?id=' + id;
                }
                else {
                    alert(data.message);
                }
            },
            error: function () {
                console.log("server error!");
            },
        });
    }
    function inLib() {
        let str = window.location.href.split("?")[1];
        str = str.split("=")[1];
        $.ajax({
            async: false,
            url: API_URL + "/api/user/in_library",
            data: {
                auth: token,
                book_id: str,
            },
            method: "GET",
            success: function (data) {
                console.log(data);
                if (data.in_library) {
                    inLibFlag += 1;
                }
                console.log(inLibFlag);
            },
            error: function () {
                console.log("server error!");
            },
        });
    }
    function onSearch(callback) {
        let str = window.location.href.split("?")[1];
        str = str.split("=")[1];
        console.log("getting data for bookID: " + str);
        $.ajax({
            async: false,
            url: API_URL + "/api/books/data",
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
    if (token) {
        inLibFlag = 0;
        inLib();
    }
    request();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(CssBaseline_1.default, null),
        react_1.default.createElement("main", null,
            react_1.default.createElement(Container_1.default, { maxWidth: "xl" },
                react_1.default.createElement(Grid_1.default, { container: true, spacing: 3, className: classes.container },
                    react_1.default.createElement(Grid_1.default, { item: true, xs: 12, md: 8, lg: 9, className: classes.image }),
                    react_1.default.createElement(Grid_1.default, { item: true, xs: 12, md: 8, lg: 9 },
                        react_1.default.createElement(Paper_1.default, { className: classes.paper },
                            react_1.default.createElement(Grid_1.default, null,
                                react_1.default.createElement(Typography_1.default, { variant: "h4", align: "center", color: "textPrimary" }, book.book_title),
                                react_1.default.createElement(Typography_1.default, { component: "p", align: "center" },
                                    "By Author: ",
                                    book.book_author),
                                react_1.default.createElement(Typography_1.default, { component: "p", align: "center" },
                                    "Published by: ",
                                    book.book_pub_date),
                                react_1.default.createElement(Typography_1.default, { component: "p", align: "center" },
                                    "Genre: ",
                                    book.book_genre),
                                react_1.default.createElement(Typography_1.default, { component: "p", align: "center" },
                                    "Publisher: ",
                                    book.book_publisher),
                                react_1.default.createElement(Typography_1.default, { component: "p", align: "center", className: classes.blockSpacing }, book.book_description),
                                react_1.default.createElement(Typography_1.default, { component: "p", align: "center" },
                                    "Average User Rating: ",
                                    book.average_rating,
                                    " ",
                                    react_1.default.createElement(Star_1.default, null)),
                                react_1.default.createElement(Typography_1.default, { component: "p", align: "center" },
                                    "Number of Readers: ",
                                    book.n_readers,
                                    " ",
                                    react_1.default.createElement(Person_1.default, null)),
                                react_1.default.createElement(Typography_1.default, { component: "p", align: "center" },
                                    "Times Added to Collection: ",
                                    book.n_collections,
                                    " ",
                                    react_1.default.createElement(LibraryBooks_1.default, null)),
                                react_1.default.createElement(Grid_1.default, { container: true, justify: "center", className: classes.blockSpacing },
                                    inLibFlag == 0
                                        ? (react_1.default.createElement(Button_1.default, { onClick: () => addBook(book.book_id), type: "submit", variant: "contained", color: "primary" }, "Add to Library"))
                                        : (null),
                                    inLibFlag == 1
                                        ? (react_1.default.createElement(Button_1.default, { onClick: () => removeBook(book.book_id), type: "submit", variant: "contained", color: "primary" }, "Remove from Library"))
                                        : (null))))))),
            react_1.default.createElement(Container_1.default, { maxWidth: "xl" },
                react_1.default.createElement(Grid_1.default, { container: true, spacing: 3, className: classes.container },
                    react_1.default.createElement(Grid_1.default, { item: true, xs: 12, md: 8, lg: 9 },
                        react_1.default.createElement(Paper_1.default, { className: classes.paper },
                            react_1.default.createElement(Reviews_1.default, { book: book }))),
                    " ",
                    react_1.default.createElement(Grid_1.default, { item: true, xs: 12, md: 8, lg: 9 }))))));
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