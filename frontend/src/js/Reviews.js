"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Link_1 = __importDefault(require("@material-ui/core/Link"));
const styles_1 = require("@material-ui/core/styles");
const Table_1 = __importDefault(require("@material-ui/core/Table"));
const TableBody_1 = __importDefault(require("@material-ui/core/TableBody"));
const TableCell_1 = __importDefault(require("@material-ui/core/TableCell"));
const TableHead_1 = __importDefault(require("@material-ui/core/TableHead"));
const TableRow_1 = __importDefault(require("@material-ui/core/TableRow"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
// Generate Order Data
function createData(id, date, name, country, comment, rating) {
    return { id, date, name, country, comment, rating };
}
const rows = [
    createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'Very Good', 5),
    createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'Thrilling!', 4),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'Best suspense plot!', 5),
    createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'Dissapointing!', 1),
    createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'Improvements needed!', 2),
];
function preventDefault(event) {
    event.preventDefault();
}
const useStyles = styles_1.makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));
function Reviews() {
    const classes = useStyles();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Typography_1.default, { component: "h2", variant: "h6", color: "primary", gutterBottom: true }, "Reviews"),
        react_1.default.createElement(Table_1.default, { size: "small" },
            react_1.default.createElement(TableHead_1.default, null,
                react_1.default.createElement(TableRow_1.default, null,
                    react_1.default.createElement(TableCell_1.default, null, "Date"),
                    react_1.default.createElement(TableCell_1.default, null, "Name"),
                    react_1.default.createElement(TableCell_1.default, null, "Country"),
                    react_1.default.createElement(TableCell_1.default, null, "Comment"),
                    react_1.default.createElement(TableCell_1.default, { align: "right" }, "Rating"))),
            react_1.default.createElement(TableBody_1.default, null, rows.map((row) => (react_1.default.createElement(TableRow_1.default, { key: row.id },
                react_1.default.createElement(TableCell_1.default, null, row.date),
                react_1.default.createElement(TableCell_1.default, null, row.name),
                react_1.default.createElement(TableCell_1.default, null, row.country),
                react_1.default.createElement(TableCell_1.default, null, row.comment),
                react_1.default.createElement(TableCell_1.default, { align: "right" }, row.rating)))))),
        react_1.default.createElement("div", { className: classes.seeMore },
            react_1.default.createElement(Link_1.default, { color: "primary", href: "#", onClick: preventDefault }, "More reviews..."))));
}
exports.default = Reviews;
//# sourceMappingURL=Reviews.js.map