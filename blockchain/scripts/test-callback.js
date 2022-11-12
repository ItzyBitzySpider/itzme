import { io } from "socket.io-client";

const socket = io("ws://143.198.88.232:3000");
// const socket = io("ws://localhost:3000");

socket.onAny((event, ...args) => {
  console.log(event, args);
});

const privateKeyString = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDAGvgsL3ALJ51Y\n+ujLpKBzvV2YRGxhx+uJRudsKJg/e/jd+HNQIY5pBb+BHVKjsbGkmh5IlZ5jraq0\nTkmKAxrxF00T5JWXiSP+o0hBQeJNVdbE4NStIwsut/3gDEMNN5YpojY7uCKhtpH7\n/0UAcv5nlPZwKBU4Q1c831GOxmCAjSp+rO2OClT+KYJWpn+n8tyiwDuvkkSuRhOg\ngVXToAAKxae7h2a+MKbNTBdwBO7/cQKN9zTysYP8FS6anQTRJooSLF16Vctt1Jl3\nrhDE4wGGgK8KvLUGOGN7HLDGrYZ4Q6DXOW4SvFW+M2EzIyvcM57HO6oXYs44xsYa\nYIHbx28DAgMBAAECggEAEnZ4SlhwzngLNLinB2z8b5ADXvv/sp7lMZ3Bf73TDBId\nIMnQQ1ZGR1+vDRJFYmG6+5SriAXt+0R/A7JprO/DEIK3Yxin+LCZTgLHxSw3OxmF\nEtaAE8SRCyqejE1OMG00OGIhQwVEBs8mIdYul1SpKklak5YdAmBIEeigmc+eoxwQ\nATudfFk0OgTdB2xM1udZyhrSxTly9yubZdfMe4vHBNVuqLjteTrC5Lpy5W3QzAHk\nKzi617t0LSwwyMXcsfD/9EytLKA6PEJLVDVMZ9FRZzY+0H8Cc9OOz31sYXHF6aQO\nQKX8L+j9H9E7zS8l5gSBrVzHeqfIHX7hghB9vo6daQKBgQDFOAnxOB1b6ETjrX0k\nqKpoiAxFLd3gFPgF5zCD8IHWQVPJJwNgMFt/FpgkEFp4r7Za+B+BfHpawq1ZYkL8\nEm0gdHCAMe1os5B19PAv/ddbsSpnL0Fkl5UVv5JFNhlSO0TRumlEEN1EV8JPs1pN\np4e+5uxpRIJBhnZne8vxnHezbQKBgQD5XMMt00Bwv55YLCsC3Vyqgg9ePHiQwwPM\nZAllLMt0R1doDlvUMqq1r//AKtL9wrL7ZY21zOOLO2PuzYuums6yror9uH7eDdlo\nft8NEyA+y6+p7v95YjE7F2De/aclWIM5Jf0wIe6qbKVJdP/yADETwFhKbjlXcRKK\nuGnlJHa2LwKBgFn2WRqu1T2icyJEdkxtn+Y1ARvhc0+PYSAYOJpG8IMSo6yjXjfX\ndzU+0kHJL+vTg2R1wLFpXcre+QJH/3RK13qxgswHeluDZYdZJuNNcJqD82rENJk1\nSC12iLuHlP9cx+S/mtsQsk5Flf6TOsMng5WCcx8FwEExm/tSjlJ1ZGj1AoGAUI67\nLy6z/riouutp6b8BlMP3mwYGHR4jOACJWHokMChsAF3DJMZJh/CXuska6Ifhsn2Y\nTkcmq3BAVIFqwrmYVPk2Rck4kxv+RFfYTy0CmcbLtSZUui4SoXhn/yIKwXHa0reH\nF+meZMg8jYKSvOd681qMK194fts0lkQFUdV51FkCgYEAs5n2PUIvuKYpH4Ub+f1O\nnUCRaygtEIJ13dGtCm1/9ni3wcIT/INrHmkM+0s08hp7zPOClB/WdyL+BtbnLm8b\ntIUPAYarX79QEJAuCX4Zh5z6M5GLWNZjXib6RgLKM+SmW3Bciox9e9PZYrNpdwE4\nVH58AK3dD0uiwGDD+FrzeHY=\n-----END PRIVATE KEY-----\n";

const txNo = 25;

console.log(privateKeyString)

socket.emit("keys", {field:"Name",privateKey:privateKeyString, txNo:txNo});