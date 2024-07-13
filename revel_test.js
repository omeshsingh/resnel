"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = (6, e); y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio = require("cheerio");
var axios = require("axios").default;
var https = require("https");
var Path = require("path");
var csv = require("csvtojson");
//const __dirname="./"
var readLine = require("readline");
var fs = require("fs");

var post_payload = {
    Token: "",
    captchacode: "",
    lns: "",
};

var post_headers = {
    Host: "results.vtu.ac.in",
    Connection: "keep-alive",
    "Content-Length": "80",
    "Cache-Control": "max-age=0",
    "Upgrade-Insecure-Requests": "1",
    Origin: "https://results.vtu.ac.in",
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-User": "?1",
    "Sec-Fetch-Dest": "document",
    Referer: "https://results.vtu.ac.in/DJcbcs24/index.php",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9",
    Cookie: "",
};

var httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});

function saveSession() {
    const sessionData = {
        post_payload,
        post_headers
    };
    fs.writeFileSync("session.json", JSON.stringify(sessionData));
}

function loadSession() {
    if (fs.existsSync("session.json")) {
        const sessionData = JSON.parse(fs.readFileSync("session.json"));
        post_payload = sessionData.post_payload;
        post_headers = sessionData.post_headers;
        return true;
    }
    return false;
}

function getNewSession() {
    return __awaiter(this, void 0, void 0, function () {
        var url, headers, response, $, token, img_url, img_headers, path, writer, input, temp_cap;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://results.vtu.ac.in/DJcbcs24/index.php";
                    headers = {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.365",
                        Accept: "*/*",
                        "Cache-Control": "no-cache",
                        "Postman-Token": "b222b1f1-1fed-4490-965a-805f53a28e97",
                        Host: "results.vtu.ac.in",
                        "Accept-Encoding": "gzip, deflate, br",
                        Connection: "keep-alive",
                    };
                    return [4 /*yield*/, axios.get(url, { headers: headers, httpsAgent: httpsAgent })];
                case 1:
                    response = _a.sent();
                    $ = cheerio.load(response.data);
                    token = $("input[name=Token]").attr("value");
                    img_url = "https://results.vtu.ac.in" + $("img[alt='CAPTCHA code']").attr("src");
                    post_payload.Token = token || "";
                    img_headers = {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
                        Accept: "*/*",
                        "Cache-Control": "no-cache",
                        "Postman-Token": "063fdb07-fe60-466a-be5e-fe08dec56a21",
                        Host: "results.vtu.ac.in",
                        "Accept-Encoding": "gzip, deflate, br",
                        Connection: "keep-alive",
                    };
                    img_headers["Cookie"] = response.headers["set-cookie"][0].replace("; path=/; secure; HttpOnly", "");
                    post_headers["Cookie"] = img_headers["Cookie"];
                    console.log(img_url);
                    return [4 /*yield*/, axios.get(img_url, {
                            headers: img_headers,
                            httpsAgent: httpsAgent,
                            responseType: "stream",
                        })];
                case 2:
                    response = _a.sent();
                    path = Path.resolve(__dirname, "cap.png");
                    writer = fs.createWriteStream(path);
                    response.data.pipe(writer);
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            writer.on("finish", resolve);
                            writer.on("error", reject);
                        })];
                case 3:
                    _a.sent();
                    input = readLine.createInterface({
                        input: process.stdin,
                        output: process.stdout,
                    });
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            input.question("Enter CAPTCHA code: ", function (code) {
                                input.close();
                                resolve(code);
                            });
                        })];
                case 4:
                    temp_cap = _a.sent();
                    post_payload.captchacode = temp_cap;
                    saveSession();
                    return [2 /*return*/];
            }
        });
    });
}

function getCGPA(usn) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, $, sgpa, cgpa;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post_payload.lns = usn;
                    url = "https://results.vtu.ac.in/DJcbcs24/resultpage.php";
                    return [4 /*yield*/, axios.post(url, post_payload, {
                            headers: post_headers,
                            httpsAgent: httpsAgent,
                        })];
                case 1:
                    response = _a.sent();
                    $ = cheerio.load(response.data);
                    sgpa = $("#sgpa").text();
                    cgpa = $("#cgpa").text();
                    return [2 /*return*/, { sgpa: sgpa, cgpa: cgpa }];
            }
        });
    });
}

function main() {
    return __awaiter(this, void 0, void 0, function () {
        var filePath, csvData, usnArray, cgpaResults, _i, usnArray_1, usn, cgpa;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filePath = Path.resolve(__dirname, "usn.csv");
                    return [4 /*yield*/, csv().fromFile(filePath)];
                case 1:
                    csvData = _a.sent();
                    usnArray = csvData.map(function (row) { return row.usn; });
                    cgpaResults = [];
                    if (!!loadSession()) return [3 /*break*/, 3];
                    return [4 /*yield*/, getNewSession()];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i = 0, usnArray_1 = usnArray;
                    _a.label = 4;
                case 4:
                    if (!(_i < usnArray_1.length)) return [3 /*break*/, 9];
                    usn = usnArray_1[_i];
                    return [4 /*yield*/, getCGPA(usn)];
                case 5:
                    cgpa = _a.sent();
                    console.log("USN: " + usn + ", SGPA: " + cgpa.sgpa + ", CGPA: " + cgpa.cgpa);
                    cgpaResults.push({ usn: usn, sgpa: cgpa.sgpa, cgpa: cgpa.cgpa });
                    if (!(cgpa.sgpa === undefined || cgpa.cgpa === undefined)) return [3 /*break*/, 8];
                    console.log("Invalid session or CAPTCHA. Getting a new session...");
                    return [4 /*yield*/, getNewSession()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, getCGPA(usn)];
                case 7:
                    cgpa = _a.sent();
                    console.log("USN: " + usn + ", SGPA: " + cgpa.sgpa + ", CGPA: " + cgpa.cgpa);
                    cgpaResults.push({ usn: usn, sgpa: cgpa.sgpa, cgpa: cgpa.cgpa });
                    _a.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 4];
                case 9:
                    fs.writeFileSync("cgpa_results.json", JSON.stringify(cgpaResults, null, 2));
                    return [2 /*return*/];
            }
        });
    });
}

main().catch(console.error);
