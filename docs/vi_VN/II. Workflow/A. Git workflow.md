# A. Git workflow
TBD
## 1. Đặc điểm của project tại thời điểm hiện tại
- đang trong quá trình phát triển, chưa release cho end user.  
=> cần tốc độ phát triển nhanh, chưa cần quản lý chặt git.

## 2. Worflow
_(Workflow này được viết dựa trên các đặc điểm ở trên, nó sẽ cần được update nếu một trong những đặc điểm này thay đổi.)_

### 2.1. Working branch
Working branch sẽ tương tự [trunk-based development](https://github.com/stakater/tbd-cd-workflow) - chỉ sử dụng 1 branch duy nhất để phát triển là `develop`.

Project có 2 nhánh là `master` và `develop`; nhánh `master` hiện tại chỉ để lưu trữ và build code; nhánh `develop` là nhánh chính mà các dev sẽ tích hợp code thường xuyên.

```
Chú ý: dev cần chia nhỏ task và tích hợp code thường xuyên. Project này có hỗ trợ tool để thuận tiện cho quá trình CI/CD nhưng nếu dev không tích hợp code thường xuyên thì có tool cũng chẳng để làm gì cả.
```

### 2.2. Code review & integration
#### 2.2.1. Code review
Việc áp dụng code review sẽ phụ thuộc vào số lượng và chất lượng dev. Tại thời điểm này code sẽ do các dev tự tích hợp vào nhánh `develop`.

#### 2.2.2. Code integration
Project này sử dụng git rebase cho việc tích hợp code. **Để có thể rebase dễ dàng thì dev cần tích hợp code thường xuyên**.

```bash
# Ví dụ: chuỗi câu lệnh mà dev sẽ thường thực hiện khi tích hợp code.
git status
git add .
git commit -m'feat(scope): work description'
git pull --rebase origin develop
git push origin develop
```

```
Lưu ý: nhánh `develop`, `master` là nhánh public nên HẠN CHẾ push force. Nếu push force, để tránh mất code, thì TUYỆT ĐỐI không được sử dụng `git push -f origin xxx`, thay vào đó *miễn cưỡng chấp nhận* push force với `git push --force-with-lease origin xxx`
```
### 2.3. Quality assurance
Với tốc độ tích hợp code của CI/CD mà thiếu automation test thì nó tương đương với "deploy bug liên tục". Project này có sử dụng `cypress` cho automation test để giảm thiểu thời gian thực hiện regession test(mới có khung, chưa áp dụng).

### 2.4. Release
TBD

## 3. Commit convention
```
<type>(<scope - sub scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

Ví dụ: `feat(auth - login): add social login button`

Dưới đây là một số type được định nghĩa sẵn:
- build: Changes that affect the build system or external dependencies.
- ci: Changes to our CI configuration files and scripts.
- docs: Documentation only changes.
- feat: A new feature.
- fix: A bug fix.
- perf: A code change that improves performance.
- refactor: A code change that neither fixes a bug nor adds a feature.
- test: Adding missing tests or correcting existing tests.

Tham khảo: https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format