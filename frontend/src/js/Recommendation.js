"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const $ = require("jquery");
const Chip_1 = __importDefault(require("@material-ui/core/Chip"));
const CookieService_1 = __importDefault(require("../services/CookieService"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
const styles_1 = require("@material-ui/core/styles");
const SentimentDissatisfied_1 = __importDefault(require("@material-ui/icons/SentimentDissatisfied"));
const Card_1 = __importDefault(require("@material-ui/core/Card"));
const Whatshot_1 = __importDefault(require("@material-ui/icons/Whatshot"));
const CardActions_1 = __importDefault(require("@material-ui/core/CardActions"));
const CardContent_1 = __importDefault(require("@material-ui/core/CardContent"));
const CardMedia_1 = __importDefault(require("@material-ui/core/CardMedia"));
const CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
const Container_1 = __importDefault(require("@material-ui/core/Container"));
const ArrowForward_1 = __importDefault(require("@material-ui/icons/ArrowForward"));
const ArrowBack_1 = __importDefault(require("@material-ui/icons/ArrowBack"));
const styles = styles_1.makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        alignContent: 'left',
        justifyContent: 'center',
        width: '1000px',
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
    App: {
        margin: '0px 0px',
        width: '270px',
        justifyContent: 'center',
    },
    carousel: {
        justifyContent: 'center',
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    padding: {
        paddingTop: '20%',
        paddingBottom: '20%',
    },
}));
const slides = [
    { backgroundColor: '#ff7c7c', title: 'Slide 1' },
    { backgroundColor: '#ffb6b9', title: 'Slide 2' },
];
function viewBook(id) {
    window.location.href = "/bookdata/metadata?id=" + id;
}
function viewCollection(data) {
    let s = (`?collectionid=${encodeURIComponent(data)}`);
    window.location.href = "/user/viewcollection" + s;
}
function CardStyle(props) {
    const { books, index } = props;
    const classes = styles();
    console.log("displaying book index: " + index);
    console.log(books[index]);
    return (react_1.default.createElement(Grid_1.default, { item: true, className: classes.App },
        react_1.default.createElement(Card_1.default, { className: classes.card },
            react_1.default.createElement(CardMedia_1.default, { className: classes.cardMedia, image: "https://source.unsplash.com/random?book", title: "Image title" }),
            react_1.default.createElement(CardContent_1.default, { className: classes.cardContent },
                react_1.default.createElement(Typography_1.default, { gutterBottom: true, variant: "h5", component: "h2" }, books[index].book_title),
                react_1.default.createElement(Typography_1.default, null,
                    "By Author: ",
                    books[index].book_author),
                react_1.default.createElement(Typography_1.default, null,
                    "Published on: ",
                    books[index].book_pub_date)),
            react_1.default.createElement(CardActions_1.default, null,
                react_1.default.createElement(Button_1.default, { size: "small", color: "primary", onClick: () => viewBook(books[index].id) }, "View")))));
}
function CollectionStyle(props) {
    const { collection, index } = props;
    console.log(collection);
    const classes = styles();
    console.log("displaying collection index: " + index);
    console.log(collection[index]);
    return (react_1.default.createElement(Grid_1.default, { item: true, className: classes.App },
        react_1.default.createElement(Card_1.default, { className: classes.card },
            react_1.default.createElement(CardMedia_1.default, { className: classes.cardMedia, image: "https://source.unsplash.com/random?book", title: "Image title" }),
            react_1.default.createElement(CardContent_1.default, { className: classes.cardContent },
                react_1.default.createElement(Typography_1.default, { gutterBottom: true, variant: "h5", component: "h2" }, collection[index].collection_name),
                collection[index].tag_list.map((tag) => react_1.default.createElement(Chip_1.default, { label: tag, className: classes.chip }))),
            react_1.default.createElement(CardActions_1.default, null,
                react_1.default.createElement(Button_1.default, { size: "small", color: "primary", onClick: () => viewCollection(collection[index].collection_id) }, "View")))));
}
function Arrow(props) {
    const { direction, clickFunction } = props;
    const icon = direction === 'left' ? react_1.default.createElement(IconButton_1.default, null,
        react_1.default.createElement(ArrowBack_1.default, null)) : react_1.default.createElement(IconButton_1.default, null,
        react_1.default.createElement(ArrowForward_1.default, null));
    return react_1.default.createElement("div", { onClick: clickFunction }, icon);
}
// export interface ContentProps extends WithStyles<typeof styles> {}
const FindUser = ({}) => {
    let books = [];
    let genre = [];
    // const [index, setIndex] = useState(0);
    // const [index2, setIndex2] = useState(1);
    // const [index3, setIndex3] = useState(2);
    //for your fav genre suggestions
    let index = 0;
    let index2 = 1;
    let index3 = 2;
    let numSlides = 0;
    //for readers who read the same genre suggestions
    let read = 0;
    let read2 = 1;
    let read3 = 2;
    let numRead = 0;
    //for suggestions based on reading history
    let hist = 0;
    let hist2 = 1;
    let hist3 = 2;
    let numHist = 0;
    //for collections that share same tags as the user 
    let tagCol = 0;
    let tagCol2 = 1;
    let tagCol3 = 2;
    let numTagCol = 0;
    const onArrowGenre = (direction) => {
        const increment = direction === 'left' ? -1 : 1;
        index = (index + increment + numSlides) % numSlides;
        index2 = (index2 + increment + numSlides) % numSlides;
        index3 = (index3 + increment + numSlides) % numSlides;
    };
    const onArrowRead = (direction) => {
        const increment = direction === 'left' ? -1 : 1;
        read = (read + increment + numRead) % numRead;
        read2 = (read2 + increment + numRead) % numRead;
        read3 = (read3 + increment + numRead) % numRead;
    };
    const onArrowHist = (direction) => {
        const increment = direction === 'left' ? -1 : 1;
        hist = (hist + increment + numHist) % numHist;
        hist2 = (hist2 + increment + numHist) % numHist;
        hist3 = (hist3 + increment + numHist) % numHist;
    };
    const onArrowTag = (direction) => {
        const increment = direction === 'left' ? -1 : 1;
        tagCol = (tagCol + increment + numTagCol) % numTagCol;
        tagCol2 = (tagCol2 + increment + numTagCol) % numTagCol;
        tagCol3 = (tagCol3 + increment + numTagCol) % numTagCol;
    };
    const classes = styles();
    //it checks what other readers read same book as you, then check 
    let histRec;
    function getHistory() {
        const token = CookieService_1.default.get('access_token');
        $.ajax({
            async: false,
            url: "http://localhost:8000/api/books/history",
            data: {
                auth: token,
            },
            method: "GET",
            success: function (data) {
                if (data != null && data.message == 'recommendations found') {
                    console.log(data);
                    histRec = data.book_list;
                    numHist = histRec.length;
                }
                else {
                    histRec = [];
                }
            },
            error: function () {
                console.log("history server error!");
            }
        });
    }
    let readerBooks;
    let basedOn;
    function getRead() {
        const token = CookieService_1.default.get('access_token');
        $.ajax({
            async: false,
            url: "http://localhost:8000/api/books/readers",
            data: {
                auth: token,
            },
            method: "GET",
            success: function (data) {
                console.log(data);
                if (data != null && data.message == "Books retrieved") {
                    console.log('storing readerBooks');
                    readerBooks = data.book_list;
                    basedOn = data.based_on;
                    numRead = readerBooks.length;
                }
                else {
                    readerBooks = [];
                }
            },
            error: function () {
                console.log("reader book server error!");
            }
        });
    }
    function getPopularGenre() {
        const token = CookieService_1.default.get('access_token');
        $.ajax({
            async: false,
            url: "http://localhost:8000/api/books/recommendations",
            data: {
                auth: token,
            },
            method: "GET",
            success: function (data) {
                if (data != null && data.message == 'Genre found') {
                    console.log(data);
                    books = data.book_list;
                    genre = data.Most_genre;
                    numSlides = books.length;
                }
            },
            error: function () {
                console.log("server error!");
            }
        });
    }
    let TagCollections = [];
    function getTagCol() {
        const token = CookieService_1.default.get('access_token');
        $.ajax({
            async: false,
            url: "http://localhost:8000/api/collections/get_similar_collections",
            data: {
                auth: token,
            },
            method: "GET",
            success: function (data) {
                if (data != null && data.message == 'Got collections') {
                    console.log('Storing TagCollections');
                    TagCollections = data.collection_list;
                    numTagCol = TagCollections.length;
                    console.log(TagCollections);
                }
                else {
                    TagCollections = [];
                }
            },
            error: function () {
                console.log("tag col server error!");
            }
        });
    }
    getTagCol();
    getPopularGenre();
    getHistory();
    getRead();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(CssBaseline_1.default, null),
        react_1.default.createElement(Container_1.default, { className: classes.cardGrid },
            react_1.default.createElement(Grid_1.default, { container: true, spacing: 5, className: classes.carousel },
                react_1.default.createElement(Grid_1.default, { item: true },
                    react_1.default.createElement(Typography_1.default, { gutterBottom: true, variant: "h5" },
                        react_1.default.createElement(Whatshot_1.default, null),
                        " Your favourite genre ",
                        genre,
                        " ",
                        react_1.default.createElement(Whatshot_1.default, null)))),
            numSlides > 0
                ? (null)
                : (react_1.default.createElement(Typography_1.default, { align: 'center', component: "h5", color: "textSecondary" },
                    react_1.default.createElement(SentimentDissatisfied_1.default, null),
                    '    ',
                    " No books of your favourite genre!")),
            numSlides == 1
                ? (react_1.default.createElement(Grid_1.default, { container: true, spacing: 2, className: classes.cardGrid },
                    react_1.default.createElement(Grid_1.default, { item: true },
                        react_1.default.createElement(Arrow, { direction: 'left', clickFunction: () => onArrowGenre('left') })),
                    react_1.default.createElement(CardStyle, { books: books, index: index }),
                    react_1.default.createElement(Grid_1.default, { item: true },
                        react_1.default.createElement(Arrow, { direction: 'right', clickFunction: () => onArrowGenre('right') }))))
                : (null),
            numSlides == 2
                ? (react_1.default.createElement(Grid_1.default, { container: true, spacing: 2, className: classes.cardGrid },
                    react_1.default.createElement(Grid_1.default, { item: true },
                        react_1.default.createElement(Arrow, { direction: 'left', clickFunction: () => onArrowGenre('left') })),
                    react_1.default.createElement(CardStyle, { books: books, index: index }),
                    react_1.default.createElement(CardStyle, { books: books, index: index2 }),
                    react_1.default.createElement(Grid_1.default, { item: true },
                        react_1.default.createElement(Arrow, { direction: 'right', clickFunction: () => onArrowGenre('right') }))))
                : (null),
            numSlides > 2
                ? (react_1.default.createElement(Grid_1.default, { container: true, spacing: 2, className: classes.cardGrid },
                    react_1.default.createElement(Grid_1.default, { item: true },
                        react_1.default.createElement(Arrow, { direction: 'left', clickFunction: () => onArrowGenre('left') })),
                    react_1.default.createElement(CardStyle, { books: books, index: index }),
                    react_1.default.createElement(CardStyle, { books: books, index: index2 }),
                    react_1.default.createElement(CardStyle, { books: books, index: index3 }),
                    react_1.default.createElement(Grid_1.default, { item: true },
                        react_1.default.createElement(Arrow, { direction: 'right', clickFunction: () => onArrowGenre('right') }))))
                : (null),
            react_1.default.createElement(Grid_1.default, { container: true, spacing: 5, className: classes.carousel },
                react_1.default.createElement(Grid_1.default, { item: true },
                    react_1.default.createElement(Typography_1.default, { gutterBottom: true, variant: "h5" },
                        react_1.default.createElement(Whatshot_1.default, null),
                        " Reader who likes \"",
                        basedOn,
                        "\" also read: ",
                        react_1.default.createElement(Whatshot_1.default, null)))),
            numRead > 0
                ? (null)
                : (react_1.default.createElement(Typography_1.default, { align: 'center', component: "h5", color: "textSecondary" },
                    react_1.default.createElement(SentimentDissatisfied_1.default, null),
                    '    ',
                    " No one read \"",
                    basedOn,
                    "\"")),
            numRead == 1
                ? (react_1.default.createElement(Grid_1.default, { container: true, spacing: 2, className: classes.cardGrid },
                    react_1.default.createElement(Grid_1.default, { item: true },
                        react_1.default.createElement(Arrow, { direction: 'left', clickFunction: () => onArrowRead('left') })),
                    react_1.default.createElement(CardStyle, { books: readerBooks, index: read }),
                    react_1.default.createElement(Grid_1.default, { item: true },
                        react_1.default.createElement(Arrow, { direction: 'right', clickFunction: () => onArrowRead('right') }))))
                : (null),
            numRead == 2
                ? (react_1.default.createElement(Grid_1.default, { container: true, spacing: 2, className: classes.cardGrid },
                    react_1.default.createElement(Grid_1.default, { item: true },
                        react_1.default.createElement(Arrow, { direction: 'left', clickFunction: () => onArrowRead('left') })),
                    react_1.default.createElement(CardStyle, { books: readerBooks, index: read }),
                    react_1.default.createElement(CardStyle, { books: readerBooks, index: read2 }),
                    react_1.default.createElement(Grid_1.default, { item: true },
                        react_1.default.createElement(Arrow, { direction: 'right', clickFunction: () => onArrowRead('right') }))))
                : (null),
            numRead > 2
                ? (react_1.default.createElement(Grid_1.default, { container: true, spacing: 2, className: classes.cardGrid },
                    react_1.default.createElement(Grid_1.default, { item: true },
                        react_1.default.createElement(Arrow, { direction: 'left', clickFunction: () => onArrowRead('left') })),
                    react_1.default.createElement(CardStyle, { books: readerBooks, index: read }),
                    react_1.default.createElement(CardStyle, { books: readerBooks, index: read2 }),
                    react_1.default.createElement(CardStyle, { books: readerBooks, index: read3 }),
                    react_1.default.createElement(Grid_1.default, { item: true },
                        react_1.default.createElement(Arrow, { direction: 'right', clickFunction: () => onArrowRead('right') }))))
                : (null),
            react_1.default.createElement(Grid_1.default, { container: true, spacing: 5, className: classes.carousel },
                react_1.default.createElement(Grid_1.default, { item: true },
                    react_1.default.createElement(Typography_1.default, { gutterBottom: true, variant: "h5" },
                        react_1.default.createElement(Whatshot_1.default, null),
                        " Collections that share the same tags as you: ",
                        react_1.default.createElement(Whatshot_1.default, null)))),
            numTagCol > 0
                ? (null)
                : (react_1.default.createElement(Typography_1.default, { align: 'center', component: "h5", color: "textSecondary" },
                    react_1.default.createElement(SentimentDissatisfied_1.default, null),
                    '    ',
                    " No collections tagged like yours!")),
            numTagCol == 1
                ? (react_1.default.createElement(Grid_1.default, { container: true, spacing: 2, className: classes.cardGrid },
                    react_1.default.createElement(Grid_1.default, { item: true },
                        react_1.default.createElement(Arrow, { direction: 'left', clickFunction: () => onArrowTag('left') })),
                    react_1.default.createElement(CollectionStyle, { collection: TagCollections, index: tagCol }),
                    react_1.default.createElement(Grid_1.default, { item: true },
                        react_1.default.createElement(Arrow, { direction: 'right', clickFunction: () => onArrowTag('right') }))))
                : (null),
            numTagCol == 2
                ? (react_1.default.createElement(Grid_1.default, { container: true, spacing: 2, className: classes.cardGrid },
                    react_1.default.createElement(Grid_1.default, { item: true },
                        react_1.default.createElement(Arrow, { direction: 'left', clickFunction: () => onArrowTag('left') })),
                    react_1.default.createElement(CollectionStyle, { collection: TagCollections, index: tagCol }),
                    react_1.default.createElement(CollectionStyle, { collection: TagCollections, index: tagCol2 }),
                    react_1.default.createElement(Grid_1.default, { item: true },
                        react_1.default.createElement(Arrow, { direction: 'right', clickFunction: () => onArrowTag('right') }))))
                : (null),
            numTagCol > 2
                ? (react_1.default.createElement(Grid_1.default, { container: true, spacing: 2, className: classes.cardGrid },
                    react_1.default.createElement(Grid_1.default, { item: true },
                        react_1.default.createElement(Arrow, { direction: 'left', clickFunction: () => onArrowTag('left') })),
                    react_1.default.createElement(CollectionStyle, { collection: TagCollections, index: tagCol }),
                    react_1.default.createElement(CollectionStyle, { collection: TagCollections, index: tagCol2 }),
                    react_1.default.createElement(CollectionStyle, { collection: TagCollections, index: tagCol3 }),
                    react_1.default.createElement(Grid_1.default, { item: true },
                        react_1.default.createElement(Arrow, { direction: 'right', clickFunction: () => onArrowTag('right') }))))
                : (null),
            react_1.default.createElement(Grid_1.default, { container: true, spacing: 5, className: classes.carousel },
                react_1.default.createElement(Grid_1.default, { item: true },
                    react_1.default.createElement(Typography_1.default, { gutterBottom: true, variant: "h5" },
                        react_1.default.createElement(Whatshot_1.default, null),
                        " Recommendations based on your history: ",
                        react_1.default.createElement(Whatshot_1.default, null)))),
            numHist > 0
                ? (null)
                : (react_1.default.createElement(Typography_1.default, { align: 'center', component: "h5", color: "textSecondary" },
                    react_1.default.createElement(SentimentDissatisfied_1.default, null),
                    '    ',
                    " No books!")),
            numHist == 1
                ? (react_1.default.createElement(Grid_1.default, { container: true, spacing: 2, className: classes.cardGrid },
                    react_1.default.createElement(Grid_1.default, { item: true },
                        react_1.default.createElement(Arrow, { direction: 'left', clickFunction: () => onArrowHist('left') })),
                    react_1.default.createElement(CardStyle, { books: histRec, index: hist }),
                    react_1.default.createElement(Grid_1.default, { item: true },
                        react_1.default.createElement(Arrow, { direction: 'right', clickFunction: () => onArrowHist('right') }))))
                : (null),
            numHist == 2
                ? (react_1.default.createElement(Grid_1.default, { container: true, spacing: 2, className: classes.cardGrid },
                    react_1.default.createElement(Grid_1.default, { item: true },
                        react_1.default.createElement(Arrow, { direction: 'left', clickFunction: () => onArrowHist('left') })),
                    react_1.default.createElement(CardStyle, { books: histRec, index: hist }),
                    react_1.default.createElement(CardStyle, { books: histRec, index: hist2 }),
                    react_1.default.createElement(Grid_1.default, { item: true },
                        react_1.default.createElement(Arrow, { direction: 'right', clickFunction: () => onArrowHist('right') }))))
                : (null),
            numHist > 2
                ? (react_1.default.createElement(Grid_1.default, { container: true, spacing: 2, className: classes.cardGrid },
                    react_1.default.createElement(Grid_1.default, { item: true },
                        react_1.default.createElement(Arrow, { direction: 'left', clickFunction: () => onArrowHist('left') })),
                    react_1.default.createElement(CardStyle, { books: histRec, index: hist }),
                    react_1.default.createElement(CardStyle, { books: histRec, index: hist2 }),
                    react_1.default.createElement(CardStyle, { books: histRec, index: hist3 }),
                    react_1.default.createElement(Grid_1.default, { item: true },
                        react_1.default.createElement(Arrow, { direction: 'right', clickFunction: () => onArrowHist('right') }))))
                : (null)),
        react_1.default.createElement(Container_1.default, { className: classes.cardGrid, maxWidth: "md" })));
};
exports.default = FindUser;
//# sourceMappingURL=Recommendation.js.map