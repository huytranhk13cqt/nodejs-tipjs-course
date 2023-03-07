# Lesson 2

### **1. Install các packages cần thiết cho dự án**

- `express.js` : framework của node.js
- `morgan` : log thông tin request

```js
morgan('dev');
morgan('combined');
morgan('common');
morgan('short');
morgan('tiny');
```

- `helmet` : thực hiện security trên các request
- `compression` : giảm khối lượng dữ liệu payload của request

### **2. Tạo repository**

```js
echo "# lesson2-tipjs" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/huytranhk13cqt/lesson2-tipjs.git
git push -u origin main
```

# Lesson 3

### **1. Cách connect database cũ - nhược điểm**

```js
const mongoose = require('mongoose');

const localAdress = `mongodb://127.0.0.1:27017/iotShopDev`;

mongoose
	.connect(localAdress)
	.then((_) => {
		console.log(`Connected MongoDB Success COMMON`);
	})
	.catch((err) => {
		console.log(`Error Connect: ${err}`);
	});
```

- ⚠️⚠️⚠️ nhược điểm :
  - trong `java`, `php`
    - cách làm này sẽ vô tình tạo ra nhiều `connection` đến `database`
  - trong `javascript`
    - nhờ có cơ chế cache của `require` nên nó khó tạo ra thêm `connection` mới đến `database` . Tuy nhiên cách này không mang tính `reusable`
