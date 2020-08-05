"use strict";
// BookReadStatus.tsx
// Switch component for tracking a user's reading status for a book in their library/collection.
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
const react_1 = __importStar(require("react"));
const $ = __importStar(require("jquery"));
const CookieService_1 = __importDefault(require("../services/CookieService"));
// Material UI
const FormGroup_1 = __importDefault(require("@material-ui/core/FormGroup"));
const FormControlLabel_1 = __importDefault(require("@material-ui/core/FormControlLabel"));
const Switch_1 = __importDefault(require("@material-ui/core/Switch"));
const BookReadStatus = ({ bookId }) => {
    const token = CookieService_1.default.get("access_token");
    const [statusChanged, setStatusChanged] = react_1.useState(false);
    function initialiseReadStatus(bookId) {
        let status = false;
        var data = getReadStatus(bookId, function (data) {
            status = data.is_read;
        });
        return status;
    }
    function getReadStatus(bookId, callback) {
        $.ajax({
            async: false,
            url: API_URL + "/api/books/is_read",
            data: {
                auth: token,
                book_id: bookId
            },
            method: "GET",
            success: function (data) {
                if (data != null) {
                    console.log(data.is_read);
                    callback(data);
                }
                else {
                    callback(null);
                }
            },
            error: function () {
                console.log("server error!");
                callback(null);
            }
        });
    }
    // Toggles the read status of a book in a user's library between read and unread.
    function toggleRead(bookId) {
        var data = setReadStatus(bookId, function (data) {
            setStatusChanged(!statusChanged);
        });
    }
    function setReadStatus(bookId, callback) {
        $.ajax({
            async: false,
            url: API_URL + "/api/books/set_read",
            data: {
                auth: token,
                book_id: bookId,
            },
            method: "POST",
            success: function (data) {
                if (data != null) {
                    console.log(data.message);
                    callback(data);
                }
                else {
                    callback(null);
                }
            },
            error: function () {
                console.log("server error!");
                callback(null);
            }
        });
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(FormGroup_1.default, { row: true },
            react_1.default.createElement(FormControlLabel_1.default, { control: react_1.default.createElement(Switch_1.default, { checked: initialiseReadStatus(bookId), onChange: () => toggleRead(bookId), color: "primary" }), label: "Read Status" }))));
};
exports.default = BookReadStatus;
//# sourceMappingURL=BookReadStatus.js.map