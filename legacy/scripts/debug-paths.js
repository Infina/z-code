import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('--- Path Debug Information ---');
console.log('Process CWD:', process.cwd());
console.log('__dirname:', __dirname);

const workspaceRoot = '/Users/jinyangren/z code/z-code';
const parentDir = '/Users/jinyangren/z code';

function inspectDir(dirPath) {
    console.log(`\nInspecting: ${dirPath}`);
    try {
        if (fs.existsSync(dirPath)) {
            const stats = fs.statSync(dirPath);
            console.log(`Exists: Yes, isDirectory: ${stats.isDirectory()}`);
            const files = fs.readdirSync(dirPath);
            console.log(`File Count: ${files.length}`);
            console.log(`Sample Files (up to 5):`, files.slice(0, 5));
            
            const gitignorePath = path.join(dirPath, '.gitignore');
            if (fs.existsSync(gitignorePath)) {
                console.log(`.gitignore found at: ${gitignorePath}`);
            } else {
                console.log(`.gitignore NOT found at: ${gitignorePath}`);
            }
            
            const packageJsonPath = path.join(dirPath, 'package.json');
            if (fs.existsSync(packageJsonPath)) {
                console.log(`package.json found at: ${packageJsonPath}`);
            } else {
                console.log(`package.json NOT found at: ${packageJsonPath}`);
            }
        } else {
            console.log('Exists: No');
        }
    } catch (err) {
        console.error(`Error inspecting ${dirPath}:`, err.message);
    }
}

inspectDir(parentDir);
inspectDir(workspaceRoot);

console.log('\n--- Environment Variables ---');
console.log('PATH contains "z code":', process.env.PATH.includes('z code'));
