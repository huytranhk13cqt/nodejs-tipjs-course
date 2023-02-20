# Lesson 2

### nội dung

1. Install các packages cần thiết cho dự án

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

2. Tạo repository

```js
echo "# lesson2-tipjs" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/huytranhk13cqt/lesson2-tipjs.git
git push -u origin main
```
