"use strict";
// SignIn.tsx
// Signin page
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
const Router = __importStar(require("react-router-dom"));
const $ = __importStar(require("jquery"));
// Material UI
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Container_1 = __importDefault(require("@material-ui/core/Container"));
const CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const Link_1 = __importDefault(require("@material-ui/core/Link"));
const TextField_1 = __importDefault(require("@material-ui/core/TextField"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
require("react-multi-carousel/lib/styles.css");
const styles_1 = require("@material-ui/core/styles");
const Style = styles_1.makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        margin: theme.spacing(3, 0, 2),
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
const SignIn = () => {
    //HI
    let flag = true;
    const [signInForm, setSignInForm] = react_1.useState({
        token: '',
        signInError: '',
        signInEmail: '',
        signInPassword: ''
    });
    // Detects value typed into input and loads it on the screen
    const onTextboxChange = (e) => {
        const { name, value } = e.target;
        setSignInForm(prevSignInForm => {
            return Object.assign(Object.assign({}, prevSignInForm), { [name]: value //
             });
        });
    };
    function preventDefault(event) {
        event.preventDefault();
        var data;
        data = onSignIn(function (id, token) {
            alert("hello" + token);
            setSignInForm(prevSignInForm => {
                return Object.assign(Object.assign({}, prevSignInForm), { signInEmail: token });
            });
        });
    }
    function onSignIn(callback) {
        $.ajax({
            async: false,
            url: "http://localhost:8000/api/auth/signin",
            method: "POST",
            data: {
                email: signInForm.signInEmail,
                password: signInForm.signInPassword
            },
            success: function (data) {
                console.log(data.status);
                console.log(data.message);
                if (data.status == 'ok') {
                    // Handle sign in success.
                    callback(data.user_id, data.token);
                    //window.location.href = "/";
                    // The cookie will be available on all URLs.
                    //const options = { path: "/" };
                    // Create a cookie with the token from response.
                    //CookieService.set("access_token", data.token, options);
                    //window.location.href="/";
                    //window.location.reload();
                }
            },
            error: function (xhr, error) {
                flag = false;
                callback(error);
                console.log("server error!" + error);
                //window.location.href="/auth/signin";
            }
        });
        // $.ajax({
        //     url: "http://localhost:8000/api/auth/signin",
        //     method: "POST",
        //     data: {
        //         email: signInForm.signInEmail,
        //         password: signInForm.signInPassword
        //     },
        //     success: function (data) {
        //         console.log(data.status);
        //         console.log(data.message);
        //         var data = data.token;
        //         if(data.status == 'ok') {
        //             const options = { path: "/" };
        //             CookieService.set("access_token", data.token, options);
        //             window.location.reload();
        //         }
        //     },
        //     error: function () {
        //         console.log("server error!");
        //     }  
        // });
    }
    const classes = Style();
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Container_1.default, { component: "main", maxWidth: "xs" },
            react_1.default.createElement(CssBaseline_1.default, null),
            react_1.default.createElement("div", { className: classes.paper },
                react_1.default.createElement(Typography_1.default, { component: "h1", variant: "h2" }, " Sign In"),
                react_1.default.createElement("div", null, { flag }
                    ? react_1.default.createElement(Typography_1.default, { component: "h1", variant: "h5" }, " Welcome!")
                    : react_1.default.createElement(Typography_1.default, { component: "h1", variant: "h5", color: "secondary" }, " Try Again...")),
                react_1.default.createElement("form", { className: classes.form, noValidate: true },
                    react_1.default.createElement(TextField_1.default, { variant: "outlined", margin: "normal", required: true, fullWidth: true, name: "signInEmail", type: "email", label: "Email", value: signInForm.signInEmail, onChange: onTextboxChange, autoFocus: true }),
                    react_1.default.createElement(TextField_1.default, { variant: "outlined", margin: "normal", required: true, fullWidth: true, name: "signInPassword", type: "password", label: "Password", value: signInForm.signInPassword, onChange: onTextboxChange }),
                    react_1.default.createElement(Button_1.default, { component: Router.Link, to: "/", type: "submit", fullWidth: true, variant: "contained", color: "primary", className: classes.submit, onClick: preventDefault }, "Sign In"),
                    react_1.default.createElement(Grid_1.default, { container: true, justify: "flex-end" },
                        react_1.default.createElement(Grid_1.default, { item: true },
                            react_1.default.createElement(Link_1.default, { href: "/auth/signup", variant: "body2" }, "Don't have an account? Sign Up"))))))));
};
exports.default = SignIn;
//# sourceMappingURL=backup.js.map