# Các bước setup project

# Cài đặt Next App
- npx create-next-app

## Cài đặt Typescript

### Tạo file tsconfig.json và run code
- tsconfig.json
- npm install -save-dev typescript @types/react @types/node
- npm run dev

=> file next-env.d.ts sẽ được sinh tự động
=> nội dung trong tsconfig.json sẽ được cấu hình tự động

## Tạo thêm config cho images, sass, css
- tạo file: next.config.js
- npm install -save next-images
- npm install -save @zeit/next-css
- npm install -save @zeit/next-sass node-sass
- https://github.com/vercel/next-plugins
- https://github.com/vercel/next-plugins/tree/master/packages/next-sass
- https://github.com/vercel/next-plugins/tree/master/packages/next-css
- https://github.com/twopluszero/next-images

## Master Layout
- trong ./pages/_app.js chỉ sử dụng được getInitialProps


*** NOTE

- 5. Project thực tế (NextJs + React + Typescrpit)
  - 3. Tạo Master Layout cho ứng dụng
    - 2. Master Layout 02
      - chú ý về đường dẫn tương đối và tuyệt đối: background-image: url('/images/menu-bg.jpg'); => nếu trước là đường dẫn là ../ => đường dẫn tương đối, nếu trước là đường dẫn là / => đường dẫn tuyệt đối => sẽ đi vào thư mục public => sẽ tự lấy đường dẫn phía trước
      - chú ý thứ tự import bootstrap và css trong những project đã được cung cấp trước HTML
  - 7. Xây dựng trang liên quan tới User
    - xử lý trang đổi password k cần truyền lên url (id sẽ lấy ngầm trong cookie, nếu cookie không tồn tại sẽ đẩy qua home), sau này id sẽ lưu trong token
- 6. Nhóm chức năng Authentication
  - 1. Thuật ngữ Authentication và Authorization
    - So sánh Authentication và Authorization
      - Authentication: quá trình xác minh người dùng thông qua đặc điểm nhận dạng như username, password, thông qua google, facebook, theo dạng token, thông qua mã OTP. hiện tại trong project này thực hiện cơ chế xác thực người dùng thông qua email, password, token
      - Authorization: được thực hiện sau khi authentication hoàn tất => cấp quyền truy cập 1 số tài nguyên nhất định (database, url nào)
    - hình thành theo server side không nên dùng fetch (chỉ tốt ở phía trình duyệt), còn môi trường nodejs không có trình duyệt => fetch không tối ưu => isomophic fetch cả 2 phía client và server luôn
    - es6-promise giúp có polyfill
    - bản chất _app là 1 custom app (chỉ sử dụng được getInitialProps) chứ không phải 1 page thông thường, nhận vào appContext chứ không phải 1 context bình thường => context theo dạng page sẽ khác
  - 2. TÌm hiểu cơ chế Token Based Authentication
    - ui thu thập thông tin người dùng (email, password) => nhấn nút login => gửi dữ liệu (object, json) lên server thông qua API => khi server nhận được thông tin => thực hiện logic phía server => mã hóa mật khẩu => so sánh với mật khẩu mã hóa trong database => xem có khớp không => nếu khớp => trả về người dùng token (có thể hiểu là chìa khóa) => bước authentication => sau đó authorization => cấp cho user đã xác thực quyền truy cập vào 1 số tài nguyên nhất định (dựa vào token)
    - khi có token => chỉ xác thực phía client thôi => lưu vào local storage (hoặc trong cookie) => vì js có thể truy xuất vào 2 đối tượng này => còn muốn xử lý phía server của nextjs => bắt buộc lưu vào cookie vì local storage chỉ xử lý ở phía trình duyệt => còn cookie có thể gửi đến server => server có thể lấy và sử dụng
    - khi xác thực người dùng thành công => gọi API => gửi token (không lẽ mỗi lần gọi API lại truyền password lên, token có 1 cơ chế mã hóa ở phía server) => server => yêu cầu server trả về những tài nguyên khác
    - server trả cho mình cái gì => phải gửi lên y chang vậy
    - API public (ai cũng có thể gọi được), API private (phải gửi kèm theo token)
    - json web token: Header(type jwt, hashing algorithm).payload(chứa id, email => để nhận diện, thời gian hết hạn).signature(được mã hóa thông qua 3 thông tin: Header, Payload, secret key => chỉ backend biết) => là cơ chế mã hóa 1 chiều => không mã hóa lại được => tránh được việc user cố tình thay đổi 1 trong 3 thành phần vì nếu thay đổi sẽ không khớp với server. có thể giải mã header, payload để lấy thông tin không nhạy cảm, phần thứ 3 không giải mã được => có thể dùng javascript giải mã token này => lấy phần thứ 2 (id, email)
    - header là phần bìa thư gửi lên server (gửi từ đâu, tới đâu). bearer do backend quy định
  - 3. Thu thập dữ liệu từ Form Login
    - sự khác nhau giữa sự kiện click và submit: submit có thêm sự kiện enter
    - interface:
      - để định nghĩa ra 1 kiểu dữ liệu chung cho tất cả các hàm hoặc class, tạo ra 1 bản thiết kế của kiểu dữ liệu => để cho các hàm hoặc các class sau dùng => có thể dùng chung => khi thay đổi sẽ thuận tiện
      - là phần thể hiện bên ngoài chức năng
      - Giao diện cho biết chức năng hoạt động thế nào nhưng chưa triển khai được, nhưng không cho biết chi tiết bên trong nó.
      - khi làm việc nhóm, thì người leader vần vẽ ra chức năng chi tiết cho các class cách hàm, đảm bảo tính hệ thống của chương trình
      - onChange() => JS sẽ hiểu đây là lời gọi hàm tường minh => khi thực thi sẽ gọi làm => chỉ được phép truyền tham chiếu => JS sẽ ngầm gọi
  - 4. Gọi API Login phía Client
    - onSubmit: có 1 sự kiện mặc định của form là gửi request data lên action hiện tại là # => reload lại trang => có thể không cho nó gửi
  - 5. Custom API phía Server bằng NextJs
    - giấu đi endpoint (/member/login.php): tạo custom server ở phía NextJS => NextJS sẽ gọi lên Heroku
    - set cookie phía server k cần dùng JS
    - redirect phía server (không dùng Router.push) sẽ dùng status code header request
  - 6. Gọi API Login phía Server
    - khi call api không cần truyền URL của BASE_URL nữa => mặc định NextJS sẽ nối cho mình => k cần cấu hình thêm những phần kết nối với server
    - mã nguồn của client và server chung 1 source
  - 7. Các kỹ thuật với Cookie phía Client và Server
    - cookies có thể được lưu ở cookies và local storage
    - sự khác nhau giữa cookies và local storage:
      - local storage (chỉ trình duyệt truy xuất được)
      - cookies (trình duyệt có thể truy xuất, có thể gửi nó lên request phía server tức là mỗi lần request lên server luôn luôn nhận được cookies này)
      - nếu không định nghĩa thời gian hết hạn => hiểu cookies lúc này là 1 phiên làm việc => tắt trình duyệt sẽ mất giá trị này
  - 8. Kỹ thuật Redirect phía Client và Server
    - kiến thức về form:
      - action: đường dẫn server
      - method: phương thức gửi lên server
    - để redirect người dùng ở phía server => cần kiến thức về backend => http request status code 302 (kèm theo header location)
  - 9. Xử lí Error cho chức năng Login phía Server
    - login => /api/login
      - thành công
        => redirect sang trang home page
        => lấy được token trong _app.tsx (server side render get thông tin user trong app)
      - thất bại: redirect lại /login?error=abcd
        - lỗi nhập liệu từ form (nên xử lý phía client) => xử lý trước khi submit
        - đăng nhập thất bại (email sai, password sai): email hoặc password không hợp lệ
  - 10. Lấy Token từ Custom App và Master Layout
    - try catch: khi lỗi sẽ đi vào catch và không bị crash app
    - utils, helpers: chứa những hàm hỗ trợ riêng bên ngoài được sử dụng kèm trong project mà không phụ thuộc vào component
  - 11. Gọi API Get User Info dựa vào token
    - lưu ý khi dùng những thư viện có dùng trong typescript => có dấu ... => tức là hiện tại nó không dùng typescript => không khai báo kiểu dữ liệu => không tìm thấy file định nghĩa dữ liệu cho module cookie => do 1 số thư viện đã code sẵn cho mình kiểu dữ liệu => 1 số thì không => npm install để cài => cài theo devDependences
    - nên cài kiểu dữ liệu cho thư viện: là kiểu dữ liệu trong quá trình lập trình giúp nhắc lệnh tốt hơn
    - *** chú ý: tại sao trong userSirvice: lại không có await???
  - 15. Chức năng Logout và Optional Chaining
    - khi truy xuất vào nhiều cấp nên dùng ?. => cho mã nguồn được gọn gàng