const { execFile } = require('child_process');
const path = require('path');

const binaryPath = path.join(__dirname, 'bin', 'roost_bin');
const repoPath = '/Users/jinyangren/z code/z-code';

console.log(`Testing binary at: ${binaryPath}`);
console.log(`Scanning repo at: ${repoPath}`);

execFile(binaryPath, ['--path', repoPath, '--json', '--limit', '1000'], (error, stdout, stderr) => {
    if (error) {
        console.error('Error:', error);
        return;
    }
    console.log('--- STDOUT ---');
    console.log(stdout);
    try {
        const json = JSON.parse(stdout);
        console.log('\n--- Analysis ---');
        console.log(`Files count: ${json.files.length}`);
        console.log(`Edges count: ${json.edges.length}`);
        console.log('Files list:', json.files.map(f => f.path));
    } catch (e) {
        console.error('Failed to parse JSON');
    }
});
