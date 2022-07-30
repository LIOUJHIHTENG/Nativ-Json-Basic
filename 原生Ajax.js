let photo = document.querySelector(".photo")

const xhr = new XMLHttpRequest()

// 格式、得取網址、同步&非同步 格式:get(讀取)、post(傳送資料到server)
// true非同步:不會資料傳回來，讓程式繼續往下跑，等到回傳才會自動回傳 false同步:會等資料傳回來，才讓程式繼續往下跑 CROS 是否可跨網域撈取資料
xhr.open("get", "https://randomuser.me/api/", true)

//空資料，沒打算要傳資料到server
xhr.send(null)
xhr.addEventListener("load", function (e) {
    //readyState
    //0-產生一個 XMLHttpRequest ，但尚未連結要撈的資料
    //1-用了open()，但未把資料傳送過去
    //2-偵測到有用send
    //3-loading中
    //4-撈到資料，數據已完全接收
    console.log(xhr)
    //status:200 資料有正確回傳，有撈到 status:404 資料讀取錯誤，沒有撈到
    if (xhr.status === 200) {
        let arr = JSON
            .parse(xhr.responseText)
            .results[0]
        console.log(arr)
        photo.setAttribute("src", arr.picture.large)
        return
    }
    console.log("資料錯誤")
}, false)
//1.建立一ㄍ XMLHttpRequest
//2.傳送到對方server要資料
//3.回傳資料到自己的 browser
//4.拿到資料再看要如何處理
console.log("比load函式還早執行")

//原生AJAX登入註冊範例 註冊
const registerBtn = document.getElementById("registerBtn")
registerBtn.addEventListener("click", function () {
    let registerAccount = document.getElementById("registerAccount")
    let registerPassword = document.getElementById("registerPassword")
    if (registerAccount.value.trim() === "" || registerPassword.value.trim() === "") {
        alert("請輸入註冊帳號或密碼")
        registerAccount.value = ""
        registerPassword.value = ""
        return
    }
    let xhr = new XMLHttpRequest()
    xhr.open("post", "https://hexschool-tutorial.herokuapp.com/api/signup", true)
    let account = {
        email: `${registerAccount.value}@gmail.com`,
        password: registerPassword.value
    }
    xhr.setRequestHeader("Content-type", "application/json")
    xhr.send(JSON.stringify(account))
    xhr.addEventListener("load", function () {
        console.log(xhr)
        if (xhr.status === 200) {
            let dataArr = JSON.parse(xhr.responseText)
            alert(dataArr.message)
            return
        }
        alert("網頁錯誤")
    }, false)
}, false)

//登入
const loginBtn = document.getElementById("loginBtn")
loginBtn.addEventListener("click", function () {
    let loginAccount = document.getElementById("loginAccount")
    let loginPassword = document.getElementById("loginPassword")
    let xhr = new XMLHttpRequest()
    xhr.open("post", "https://hexschool-tutorial.herokuapp.com/api/signin", true)
    xhr.setRequestHeader("Content-type", "application/json")
    if (loginAccount.value.trim() === "" || loginPassword.value.trim() === "") {
        alert("請輸入登入帳號與密碼")
        loginAccount.value=""
        loginPassword.value=""
        return
    }
    let account = {
        email: `${loginAccount.value}@gmail.com`,
        password: loginPassword.value
    }
    xhr.send(JSON.stringify(account))
    xhr.addEventListener("load", function () {
        console.log(xhr)
        if (xhr.status === 200) {
            let dataArr = JSON.parse(xhr.responseText)
            if (dataArr.success) {
                alert(dataArr.message)
                return
            }
            alert(dataArr.message)
        }
    }, false)
}, false)