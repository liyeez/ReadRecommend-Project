import * as $ from "jquery";
import "bootstrap";

$().ready(function () {
    $.ajax({
        url: "http://localhost:8000/api/hello_world",
        method: "GET",
        success: function (data) {
            console.log(data);
            console.log(data.name);
        },
        error: function () {
            console.log("Error!");
        }
    });
    $.ajax({
        url: "http://localhost:8000/api/hello_name_post",
        method: "POST",
        data: {
            name: "test name"
        },
        success: function (data) {
            console.log(data);
        },
        error: function () {
            console.log("Error!");
        }
    });
});
