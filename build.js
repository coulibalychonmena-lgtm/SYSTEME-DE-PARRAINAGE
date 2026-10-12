// Build Render (Static Site) : injecte l'empreinte du code secret dans la page.
// Le code en clair n'est jamais écrit dans le fichier publié.
const fs = require('fs'), crypto = require('crypto');

const code = process.env.ACCESS_CODE;
if (!code || code.length < 4) {
  console.error('ERREUR : définir la variable d\'environnement ACCESS_CODE (4 caractères minimum).');
  process.exit(1);
}
const SALT = 'srit1a-parrainage', ITER = 150000;
const hash = crypto.pbkdf2Sync(code, SALT, ITER, 32, 'sha256').toString('hex');

const html = fs.readFileSync('index.src.html', 'utf8')
  .replace('__CODE_HASH__', hash)
  .replace('__CODE_SALT__', SALT)
  .replace('__CODE_ITER__', String(ITER));

fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/index.html', html);
console.log('OK : dist/index.html généré.');
