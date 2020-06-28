"use strict";
// SignUp.tsx
// Signup page
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
const CookieService_1 = __importDefault(require("../services/CookieService"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Container_1 = __importDefault(require("@material-ui/core/Container"));
const CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const Link_1 = __importDefault(require("@material-ui/core/Link"));
const TextField_1 = __importDefault(require("@material-ui/core/TextField"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const styles_1 = require("@material-ui/core/styles");
const Style = styles_1.makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
}));
const SignUp = ({}) => {
    const [signUpForm, setSignUpForm] = react_1.useState({
        signUpError: '',
        signUpFirstName: '',
        signUpLastName: '',
        signUpEmail: '',
        signUpPassword: ''
    });
    // Detects value typed into input and loads it on the screen
    const onTextboxChange = (e) => {
        const { name, value } = e.target;
        setSignUpForm(prevSignUpForm => {
            return Object.assign(Object.assign({}, prevSignUpForm), { [name]: value });
        });
    };
    function onSignUp() {
        $.ajax({
            url: "http://localhost:8000/api/auth/signup",
            method: "POST",
            data: {
                email: signUpForm.signUpEmail,
                password: signUpForm.signUpPassword,
                first_name: signUpForm.signUpFirstName,
                last_name: signUpForm.signUpLastName
            },
            success: function (data) {
                // Handle sign up success.
                // The cookie will be available on all URLs.
                const options = { path: "/" };
                // Create a cookie with the token from response.
                CookieService_1.default.set("access_token", data.token, options);
                window.location.reload();
                react_1.default.createElement(Router.Redirect, { to: "/" });
            },
            error: function () {
                console.log("Error!");
            }
        });
    }
    const classes = Style();
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Container_1.default, { component: "main", maxWidth: "xs" },
            react_1.default.createElement(CssBaseline_1.default, null),
            react_1.default.createElement("div", { className: classes.paper },
                react_1.default.createElement(Typography_1.default, { component: "h1", variant: "h5" }, "Sign Up"),
                react_1.default.createElement("form", { className: classes.form, noValidate: true },
                    react_1.default.createElement(Grid_1.default, { container: true, spacing: 2 },
                        react_1.default.createElement(Grid_1.default, { item: true, xs: 12, sm: 6 },
                            react_1.default.createElement(TextField_1.default, { name: "signUpFirstName", variant: "outlined", required: true, fullWidth: true, label: "First Name", value: signUpForm.signUpFirstName, onChange: onTextboxChange, autoFocus: true })),
                        react_1.default.createElement(Grid_1.default, { item: true, xs: 12, sm: 6 },
                            react_1.default.createElement(TextField_1.default, { name: "signUpLastName", variant: "outlined", required: true, fullWidth: true, label: "Last Name", value: signUpForm.signUpLastName, onChange: onTextboxChange })),
                        react_1.default.createElement(Grid_1.default, { item: true, xs: 12 },
                            react_1.default.createElement(TextField_1.default, { name: "signUpEmail", variant: "outlined", required: true, fullWidth: true, label: "Email", value: signUpForm.signUpEmail, onChange: onTextboxChange })),
                        react_1.default.createElement(Grid_1.default, { item: true, xs: 12 },
                            react_1.default.createElement(TextField_1.default, { name: "signUpPassword", variant: "outlined", required: true, fullWidth: true, type: "password", label: "Password", value: signUpForm.signUpPassword, onChange: onTextboxChange }))),
                    react_1.default.createElement(Button_1.default, { component: Router.Link, to: "/", type: "submit", fullWidth: true, variant: "contained", color: "primary", className: classes.submit, onClick: onSignUp }, "Sign Up"),
                    react_1.default.createElement(Grid_1.default, { container: true, justify: "flex-end" },
                        react_1.default.createElement(Grid_1.default, { item: true },
                            react_1.default.createElement(Link_1.default, { href: "/signin", variant: "body2" }, "Already have an account? Sign in."))))))));
};
exports.default = SignUp;
//# sourceMappingURL=SignUp.js.map