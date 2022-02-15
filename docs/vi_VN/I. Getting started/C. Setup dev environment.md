# C. Setup dev environment

## 1. Dev server
Cài đặt node.js: version 16.

Cài đặt yarn:
```bash
$ npm install -g yarn
```

Cài đặt package(mỗi lần update/install package **từ dev khác** thì cũng cần sử dụng câu lệnh này):
```bash
$ yarn bootstrap
```

hoặc:

```bash
$ yarn --frozen-lockfile
```
```
Lưu ý: file yarn.lock RẤT QUAN TRỌNG, không được xóa nó. Mỗi khi update/install package thì cần add yarn.lock vào git, các dev khác khi pull code về thì chỉ cần cài đặt package với câu lệnh "yarn bootstrap" hoặc "yarn --fronzen-lockfile" thì sẽ dùng chính xác được package version.
```

Khởi động dev server:
```bash
$ yarn dev
```

## 2. Biến môi trường
File `.env` chỉ là file template env, dev muốn config biến môi trường của riêng mình thì cần copy `.env` ra file `.env.local`(file này đã được add vào gitignore).  

*Lưu ý 1:* khi cập nhập file env thì cần khởi động lại server(vd: `yarn dev`).  
*Lưu ý 2:* biến môi trường được định nghĩa trong file env sẽ **CHỈ DÙNG ĐƯỢC** cho server node, muốn frontend cũng dùng được biến môi trường này thì cần map lại tại prop `env` trong file `next.config.js`.
