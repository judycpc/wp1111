# BeBetter. 心理諮商媒合平台 (Group 15)

## I. 專題說明

### FB 貼文連結

### Demo 影片連結

https://www.youtube.com/watch?v=5Eb0ZSbqGLQ

### Deployed 連結

https://bebetter.csie.org/

### 專題簡介與服務內容

現今許多人有心理諮商方面的需求，卻不知如何或不易取得相關資源，BeBetter 則提供了使用者與心理師一個十分便捷的媒合管道。在 BeBetter 中包含以下服務功能：

#### 使用者端

- 註冊、登入
- 首頁：可以查看根據症狀分類標籤查看相關推薦的心理師與影片
- 查詢及預約：點擊查詢框並勾選症狀分類，可查詢符合條件的心理師。點擊「預約晤談」可跳轉至心理師的詳細資訊，詳細資訊頁中包含簡歷、晤談時段、晤談評價等，顯示為深色晤談時段為可預約時段，點擊進入預約提示框，「確認預約後」則預約完成
- 帳戶資訊：右上方選單「帳戶資訊」中，可查看姓名、帳號，並可變更密碼及電子信箱
- 預約紀錄：右上方選單「預約紀錄」中，「預約中」為尚未開始晤談的預約，內容包含心理師姓名、晤談時間、晤談室連結。每十分鐘會檢查一次有沒有即將開始的預約，如果有在一小時內即將開始的預約，該筆預約會歸入「歷史預約」中，並寄信通知心理師與用戶。用戶可以針對「歷史預約」進行星等和文字評論，送出評論後該筆預約會顯示「已填寫評論」。
- 登出

#### 心理師端

- 註冊、登入
- 帳戶資訊：右上方選單「帳戶資訊」中，可查看姓名、帳號，並可變更密碼及電子信箱
- 預約紀錄：右上方選單「預約紀錄」中，「預約中」為尚未開始晤談的預約，內容包含晤談者姓名、晤談時間、晤談室連結。每十分鐘會檢查一次有沒有即將開始的預約，如果有在一小時內即將開始的預約，該筆預約會歸入「歷史預約」中，並寄信通知心理師與晤談者。晤談者填寫評論後，重新進入預約紀錄頁面則可查看該筆歷史預約的文字評論，否則該筆預約會顯示「未填寫評論」。
- 個人主頁：右上方選單「個人主頁」中，可編輯相片、專業領域標籤、簡介、簡歷、可晤談時段等內容。
- 登出

#### 後端API測試

* 請依照[API文件](https://hackmd.io/@judycpc/rk5wzFbdj)進行各類測試，或參考[repo](https://github.com/hc-psy/wp-final-api)中的 `README.md`進行各類測試。

### 使用與參考之框架 / 模組 / 原始碼

- Frontend：React, React Router, Ant Design, styled components, ReactPlayer, Axios
- Backend：Flask, Flask-PyMongo, Flask-Bcrypt, Flask-Cors, Flask-APScheduler, Flask-Mail
- DataPreprocessing：pytorch, numpy, pandas, transformers
- Database：MongoDB Atlas
- Deployment
  - Frontend：Vercel, NTU CSIE Domain Name
  - Backend：Heroku

## II. 本地端安裝與測試步驟

### 前端

請在 `final/frontend` 資料夾下執行以下指令：

```
yarn        // 安裝所需套件
yarn start  // 啟動伺服器
```

注意：本專案所串接的 Imgur API 有阻擋 `localhost` 與 `127.0.0.1` 之情形，建議在瀏覽器開啟 `http://<YOUR_IP_ADDRESS>:3000` 以正常操作與顯示介面。

### 後端

如果 `final/backend`中有檔案，請忽略下列信息，並按照 `final/backend/README.md`指示執行 `backend`程序。如果資料夾中沒有檔案或沒有 `final/backend`，請按照以下指示安裝。

有鑒於後端建置在另外一個[repo](https://github.com/hc-psy/wp-final-api)，因此有兩個方式搭建後端：

##### 方法一：簡易法，在他處CLONE

請於final資料夾以外的地方執行：

```bash
git clone https://github.com/hc-psy/wp-final-api.git backend
```

接著按照 `final/backend/README.md`指示執行 `backend`程序。

##### 方法二：Submodule法

請確保在 `final`底下執行：

```bash
rm -rf backend # if there is an empty folder named backend
git submodule add https://github.com/hc-psy/wp-final-api.git backend
cd backend
git submodule init
git submodule update
git pull
```

接著按照 `final/backend/README.md`指示執行 `backend`程序。

## III. 各組員負責項目與心得

### 資管四 B08705031 陳沛竹

- 建立前端程式架構
- 前端畫面建構
- 串接後端 API
- 串接 Imgur API
- 部屬前端服務
- 簡報之前端相關內容
- 錄製 demo 影片
<br>
本次專案的實作，我主要負責的是前端畫面的建構與 API 的串接。雖然畫面的複雜程度不高，但為了讓使用者體驗更流暢，前前後後修改了非常多次不同 Ant Design components 的種類，也嚴格遵照框架規範，包括畫面 Layout、其他 components API 等等，自己也對這個 UI 框架更瞭解了。另外本次專案也是我第一次串接第三方的 API，雖然在處理 Authorization token 時遇到了一些困難，但這也是相當寶貴的經驗。感謝這次的專案機會，讓自己除了複習課堂所學內容，在實作過程中更學到了許多新的技能。

### 心理博四 D08227104 駱皓正

- Flask 後端 API 與各後端服務建置
- API 規格制定
- AI資料生成
- 資料庫設計
- Logo Favicon PPT 製作
- 前端 manifest 與功能協助
- 後端部署
- 前端域名
- 其餘影音錄製、剪輯、發佈
- 議題發想
- 後端相關 readme 文件

### 資管四 B08705005 杜沛慈

- UI 設計
- 前端畫面建構
- 串接後端 API
- 撰寫 FB 發文內容
- 撰寫前端 readme 文件
<br>
在本次期末專案中，從零開始進行網頁的發想、設計、實作等，過程中需要與組員頻繁的溝通討論，充分的運用了課堂所學並透過網路資源自主學習，讓我對網頁全端開發有更深入的了解，也非常感謝兩位夥伴，在一起製作專題的過程中讓我從他們身上收獲許多。在專題中我主要負責UI設計、前端與API串接，一步步地解決問題、逐漸建構出一個完整的網頁，雖然有些辛苦但真的讓人充滿了成就感，總體而言著實是一次十分寶貴的學習經驗！
