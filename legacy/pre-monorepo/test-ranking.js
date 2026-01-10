const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');

const binaryPath = path.join(__dirname, 'bin', 'roost_bin');
const integrationRepo = path.join(__dirname, 'rust_core', 'tests', 'integration_repo');

console.log('--- INTEGRATION TEST: Ranking Accuracy ---');
console.log(`Repo: ${integrationRepo}`);

const runScan = (focus) => {
    return new Promise((resolve, reject) => {
        const args = ['--path', integrationRepo, '--json', '--limit', '100'];
        if (focus) {
            args.push('--focus', focus);
        }
        
        execFile(binaryPath, args, { timeout: 30000 }, (error, stdout, stderr) => {
            if (error) return reject(error);
            try {
                resolve(JSON.parse(stdout));
            } catch (e) {
                console.log('Raw output:', stdout);
                reject(e);
            }
        });
    });
};

async function test() {
    try {
        console.log('\n[Case 1] No focus (Standard PageRank)');
        const result1 = await runScan();
        // Edge detection check
        if (result1.edges.length === 0) {
            console.error('❌ CRITICAL: No edges detected in integration repo! Linker might be broken.');
        } else {
            console.log(`✅ Detected ${result1.edges.length} edges.`);
            console.log('Edges:', JSON.stringify(result1.edges, null, 2));
        }
        console.log('Files:', result1.files.map(f => `${f.path.split('/').pop()} (${f.score.toFixed(4)})`));
        // main.rs references User (models.rs) and helper (utils.rs)
        // models.rs and utils.rs should have higher scores than main.rs if they are "central"
        // actually in this tiny repo, main.rs is the only one with out-edges.
        // So standard PageRank should favor models/utils.
        
        console.log('\n[Case 2] Focus on models.rs');
        const result2 = await runScan('src/models.rs');
        console.log('Files:', result2.files.map(f => `${f.path.split('/').pop()} (${f.score.toFixed(4)})`));
        if (result2.files[0].path.endsWith('models.rs')) {
            console.log('✅ models.rs is top ranked');
        } else {
            console.warn('❌ models.rs is NOT top ranked');
        }

        console.log('\n[Case 3] Focus on main.rs (should boost its neighbors)');
        const result3 = await runScan('src/main.rs');
        console.log('Files:', result3.files.map(f => `${f.path.split('/').pop()} (${f.score.toFixed(4)})`));
        
        console.log('\n[Case 4] Deep Chain: main.rs -> models.rs -> db.rs');
        console.log('Focus on main.rs should give db.rs some score too');
        if (result3.files.find(f => f.path.endsWith('db.rs'))?.score > 0) {
            console.log('✅ db.rs reached via transitive closure');
        } else {
            console.warn('❌ db.rs NOT reached');
        }

        console.log('\nIntegration Test Completed.');
    } catch (e) {
        console.error('Test failed:', e);
    }
}

test();
