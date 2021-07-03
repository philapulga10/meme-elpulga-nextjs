# Các bước setup project

# Cài đặt Next App
- npx create-next-app

## Cài đặt Typescript

### Tạo file tsconfig.json và run code
- tsconfig.json
- npm install --save-dev typescript @types/react @types/node
- npm run dev

=> file next-env.d.ts sẽ được sinh tự động
=> nội dung trong tsconfig.json sẽ được cấu hình tự động

## Tạo thêm config cho images, sass, css
- tạo file: next.config.js
- npm install --save next-images
- npm install --save @zeit/next-css
- npm install --save @zeit/next-sass node-sass
- https://github.com/vercel/next-plugins
- https://github.com/vercel/next-plugins/tree/master/packages/next-sass
- https://github.com/vercel/next-plugins/tree/master/packages/next-css
- https://github.com/twopluszero/next-images

## Master Layout
- trong ./pages/_app.js chỉ sử dụng được getInitialProps


*** NOTE

- 5. Project thực tế (NextJs + React + Typescrpit)
  ++ 3. Tạo Master Layout cho ứng dụng
    +++ 2. Master Layout 02
      ++++ chú ý về đường dẫn tương đối và tuyệt đối: background-image: url('/images/menu-bg.jpg'); => nếu trước là đường dẫn là ../ => đường dẫn tương đối, nếu trước là đường dẫn là / => đường dẫn tuyệt đối => sẽ đi vào thư mục public => sẽ tự lấy đường dẫn phía trước
      ++++ chú ý thứ tự import bootstrap và css trong những project đã được cung cấp trước HTML