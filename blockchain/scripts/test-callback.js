import { io } from "socket.io-client";

// const socket = io("ws://143.198.88.232:3000");
const socket = io("ws://localhost:3000");

socket.onAny((event, ...args) => {
  console.log(event, args);
});

const privateKeyString = `-----BEGIN PRIVATE KEY-----\n\
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDLT9IwbUAJz/hP\
TFceYoK7WJJXAnHsapN4ZW4fbATJdHo7DQnw6oMtGPMfwlz4Rip/iK98KiFzLMO+\
n57t0Q0zsIicwRM8nlGTu+qAiTp3y/duWzpjfD56RzuH5exkeeGsnvTxbPwXmCer\
39j45ujuw5GlrkgiZMaokqaeuni18D2bCBf9yjgyhD45Q87VlbprCWUhBz2NAKsY\
CDqcHr3N3HwmMd6rRz2rKT1LEJ0wxFjmnJ0bvvo5YZ92DjmUp4DwP9Rj62wApNwB\
zbIFwlH2rP7OeU6jLlSYxckYvBcWMaJDjL1pyBG0Ax2sC/f0rG9DRMky6jZKHsuu\
e0ljCE+1AgMBAAECggEAH++hZi77FK+A4z/sHV8/BtuyXQ2KxKa3FH3mTvRCSjzM
KHNzYM8NnOti4VXAEdW/vjnDyv65M2TQOKTNK7EfYEO2Kd1gPrDlwo2Nl/Q2ZXP6\
IXEeGlt9WurOjJnOyLemfd2YP0Yt0Sz66lImvG5VH5BD1CEsvo5S8E7c8mj7JiTX\
ETVFDNbztz4DnBG8oiiqHa72fz+SUMkCeqiFA4Xbm/1R1msUO9QxpixqXrbM5A/6\
Cr3H6k4V9TNMig5UONbuevOyDmauHG/jwsJfeGJ9gGTVTCObtCd6IS0VaTOQ2NzU\
qgaC/N1O9BFgJSvT+nTpQuiIW+61YWLFc6T6DZqQwQKBgQD9GMbeFaQM6BqX9eqb\
yo5SeJL9Ulm+7hcOf+6TfiMK9RLz6kPz02TTn/fZEfVT7DzPSnlaWJoAfqAdFHuR\
z56Oj1mkNDNPkCvZGQx47sVIJexG4GnKtumKtL16OALOGSSsOaCK9Vt1ZmEetjoq
wQO2anJCgUChtltSEg55VuLaYQKBgQDNpNmIvAvYZufByhwrTKWxuITZX2SuOJL3\
W1xrDFrwPIVMtRyKWMAY8PGK8FPCDaMs4q3hsHTU1/s++yJFg24mcRvHHkGXcbp+\
0ivv0sPYd+3/aaSJ4ndjIkIpGMappps0D++toJgiKzuPkH85jjR126ZkULoFxbs5\
GBGbDW+91QKBgQCcBjcqV2rvbfJe9YGwkrkUDDKJKcgblMjv7lvT3vGZYqVRanyD\
hjDk6PuwfIqhNsPyAfY3hOFDJsxrwOHAbJ5RQfu/51IuXTE6v19Z+c/yfzZeJx/w
kLv9/xfDjV3lUciyxz+6CjFceUWr2iiXjK9ON+bCKs3+It2/BVSY5sAoYQKBgEK1\
Been8EO7ZdRkBm05SMp0q4uDuToWmf3pQfproJgrWaY/Xcm27mFoz0Gdod3h5Jur\
0HHUdqGQiiys9DoOX03TBQq7UtWYi8GV1bDO8r6mcKqYj0o3Dzk2JLYGFnNz2wax\
YLM21ALJeWGhotN9wKC2pqwFz8INmST1HMjqO+QdAoGAbXYhYOmsUqXXPG9whdJQ\
sMO7puV8t4gkc82Eo7D0XdZbzT+pmqvti5fb+npBt7vs7075VUbKGbl3fpZqjNy0\
7axKzys9GM4qS+PbMJQBvxx8G8HxEdoeYmexjqR70GgJnCjL9OB2wTIBC+T3gbHc\
ozUay5nM+DbTZt4mylHQviw=\n\
-----END PRIVATE KEY-----`;

const txNo = 1;

console.log(privateKeyString)

socket.emit("keys", {field:"Name",privateKey:privateKeyString, txNo:txNo});