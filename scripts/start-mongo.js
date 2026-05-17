const { spawn } = require('child_process');
const fs = require('fs');
const net = require('net');
const path = require('path');

const DB_PATH = path.resolve(__dirname, '../mongodb-data');
const LOG_PATH = path.resolve(__dirname, '../mongodb-logs/mongod.log');
const PORT = 27017;
const HOST = '127.0.0.1';

const mongodCandidates = [
  'C:/Program Files/MongoDB/Server/8.2/bin/mongod.exe',
  'C:/Program Files/MongoDB/Server/8.0/bin/mongod.exe',
  'mongod',
];

const ensurePath = (filePath) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const isPortOpen = (port, host) =>
  new Promise((resolve) => {
    const socket = net.createConnection(port, host);
    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.on('error', () => resolve(false));
  });

(async () => {
  const running = await isPortOpen(PORT, HOST);
  if (running) {
    console.log(`MongoDB đã chạy trên ${HOST}:${PORT}`);
    process.exit(0);
  }

  ensurePath(DB_PATH);
  ensurePath(LOG_PATH);

  const mongodPath = mongodCandidates.find((candidate) => {
    try {
      return candidate === 'mongod' || fs.existsSync(candidate);
    } catch {
      return false;
    }
  });

  if (!mongodPath) {
    console.error('Không tìm thấy mongod. Hãy cài MongoDB hoặc thêm mongod vào PATH.');
    process.exit(1);
  }

  const child = spawn(mongodPath, [
    '--dbpath', DB_PATH,
    '--bind_ip', HOST,
    '--port', String(PORT),
    '--logpath', LOG_PATH,
    '--logappend',
  ], {
    detached: true,
    stdio: 'ignore',
  });

  child.unref();
  console.log(`MongoDB được khởi động bằng: ${mongodPath}`);
  console.log(`DB path: ${DB_PATH}`);
  console.log(`Log path: ${LOG_PATH}`);
  process.exit(0);
})();
