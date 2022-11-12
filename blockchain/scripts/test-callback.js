import { io } from "socket.io-client";

// const socket = io("ws://143.198.88.232:3000");
const socket = io("ws://localhost:3000");

socket.onAny((event, ...args) => {
  console.log(event, args);
});

const privateKeyString = `-----BEGIN PRIVATE KEY-----\n
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCQZhKbiMbR1WsA\
zwt9T79mBzJB4NBGeIA9BmE2g8xNgX79OwsKwD1rtKPfjd7B0JnhZ8659Y3gD+BR\
OQ+uIw0Wa4FveCxIt7xqOyqRB0vKjdcpXqLDg+Arup9Wz1cJTeJLD2PTvjGJMlQ9\
hzoHrivNwkx1W3HG2qNFmQM1EFO7n8+bbSn5E5yY0UqEG1MFmCLUb+Zc/YuRi0MW\
O91A/CsPXZlYCaPDsPffXKZKZ+hmdblFMhQnzhRXUrbirQEW4xTL77SP3MlusWHy\
JlcgLHvdWL0501xU7DBTeLPGgZnB37aFH9QjZzT9xFH25eRBMsmS3LFVG58giGzO\
xFfx+9xlAgMBAAECggEACRDfijRZh0McUhNYZ/23Hp4aYa3OZcjwWY8qUKnlty1c\
3mPz8DDcVQQlEHFv0utYk0uuhwO2bKLn39xH8mmboL9kg63KhKZEhhxA3T+ABVpH\
xVPTvu1rXajR6DlhquE2RqV+DFqcnD3fXB2UCcy9o1As92ajthXJZSKTjk6qyH91\
T4qv3btcSdWPuYAev+NroiP+BQaHdxM+uSvbKpLJCt3n6F+BUhZITtRyuxGR65w6\
PEyBxooQ7+s323SgLaSjv/fjkMFvZPw1g496ActXyd2pi7SpKNZotjz7Afdd299v\
MzjNjLc0+REWN89m7OviSaBr9Y5d04HAi6DLLjyyAQKBgQC6uIJlDjGH/LRoIoss\
bBUT+X2qty41TxEsms/V5CSs98a0xo+h/c3396XelsNHx+uPcVikMrdC4AgHpkMB\
Pt/nvS7TH/W3Ru427MiWWIIpY8lx2lWDmtInRaCW2qrPr4xX1xSJ82ZKYO91wynt\
I5ddFLjyHzkNJbYTXP3627vjlQKBgQDF+aWfEFgVSDaA4lHAuuQQAKGXKsDKDGMp\
yOhbk7g+B+SyvHvkeUK/Nrkr8RgfYm3tPMh35cCTyieGgSdouVncTeemVTYzb4sZ\
x9WxGvOOYFWC3jFkFOGx/mRlUuM+VtlmenIbOSofhWSVTW66yXtJTwS0t9BxA08x\
n3ucsOLhkQKBgF5vlzN5HEAE5VGNtwn+mCKEGrTO9MXteWgv3FH3kz0QDCW+D0ME\
1LlHPVL4uUeCq3bfAs/4/osKN8V2p4jnveK84gPRtDq/2xdYZpLzrNE2MNoubPWk\
xgkqw+/IJH/p73c1xqOGwQN5R2MuE/Rl/dYL9wYuGHK30gC1FZdcrwiJAoGANvIT\
qnLxz25MWjb186SrGVnjfz4JZcpMV1OAUbJM50Jvkb/ILuAMy18Xw39Vb5h04+wD\
w2sLqLjpgWYlFuaibwdcLIjn0xy5IX2Z7F6LjE9mTDz4vkshXLI7EPgRQ8L88Xk4\
ZB/YdgkiomFsQwEaa3031CRUAJmniCE4QIPDZFECgYEAqUB4gq3DSR0/HZjeetZ4\
38pwoLYYscDHxURkQ0kIUBR79KrtdxEc74KEiobZMkzGbNXlDm3nq9nPR5iKChsP\
xRAuMorUfcT3e0FLn+M0iuSl853b7gJyldNQ+KZ8jNr3GT9FLx7W4gT3cwyCwat7\
AxGm3vJ6LbHwm7nHSHHmK30=\n
-----END PRIVATE KEY-----`;

const txNo = 0

socket.emit("keys", {field:"Name",privateKey:privateKeyString, txNo:txNo});