const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');

const binaryPath = path.join(__dirname, 'bin', 'roost_bin');
const repoPath = __dirname;

// Allow overriding path via CLI
const targetPath = process.argv[2] ? path.resolve(__dirname, process.argv[2]) : repoPath;

console.log(`Testing binary at: ${binaryPath}`);
if (!fs.existsSync(binaryPath)) {
    console.error(`ERROR: Binary NOT found at ${binaryPath}`);
    process.exit(1);
}
console.log(`Scanning path: ${targetPath}`);

// Note: Removed --token-budget as the current binary in bin/ doesn't seem to support it yet
// even though PLAN.md says it's implemented. This indicates bin/roost_bin is stale.
const args = ['--path', targetPath, '--json', '--limit', '100'];
console.log(`Command: ${binaryPath} ${args.join(' ')}`);

const child = execFile(binaryPath, args, { timeout: 60000 }, (error, stdout, stderr) => {
    if (error) {
        if (error.killed) {
            console.error('Error: Process timed out after 60s');
        } else {
            console.error('Error:', error);
        }
        return;
    }
    if (stderr) {
        console.error('Stderr:', stderr);
    }
    
    if (!stdout) {
        console.error('Error: No output from binary');
        return;
    }

    console.log(`--- STDOUT Length: ${stdout.length} bytes ---`);
    console.log('--- STDOUT (First 200 chars) ---');
    console.log(stdout.substring(0, 200) + '...');
    
    try {
        const json = JSON.parse(stdout);
        console.log('\n--- Analysis ---');
        console.log(`Files count: ${json.files.length}`);
        console.log(`Edges count: ${json.edges.length}`);
        if (json.files.length > 0) {
            console.log('Sample files:', json.files.slice(0, 5).map(f => f.path));
            console.log('Top ranked file:', json.files[0].path, 'Score:', json.files[0].score);
        }
    } catch (e) {
        console.error('Failed to parse JSON:', e.message);
        fs.writeFileSync('test-output.log', stdout);
        console.log('STDOUT written to test-output.log');
    }
});



