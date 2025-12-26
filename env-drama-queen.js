#!/usr/bin/env node

// ENV Var Drama Queen - Because silent failures are so last season
// Detects empty/null env vars and throws a theatrical tantrum EARLY

const requiredVars = process.argv.slice(2);

if (requiredVars.length === 0) {
    console.log('\n🎭 ENV Var Drama Queen 🎭');
    console.log('Usage: node env-drama-queen.js VAR1 VAR2 VAR3');
    console.log('Example: node env-drama-queen.js DATABASE_URL API_KEY SECRET');
    process.exit(0);
}

console.log('\n🎭 ENVIRONMENT VARIABLE DRAMA CHECK 🎭');
console.log('Director: You (the developer)');
console.log('Starring: Your fragile production app\n');

let dramaLevel = 0;
const missingVars = [];

requiredVars.forEach(varName => {
    const value = process.env[varName];
    
    if (!value || value.trim() === '') {
        dramaLevel++;
        missingVars.push(varName);
        console.log(`❌ ${varName}: MISSING! (Cue dramatic music)`);
        console.log(`   This variable is either undefined or empty like my social calendar.\n`);
    } else {
        console.log(`✅ ${varName}: Present and accounted for!`);
        console.log(`   Value: "${value.length > 30 ? value.substring(0, 30) + '...' : value}"\n`);
    }
});

if (dramaLevel > 0) {
    console.log(`\n🎬 FINAL SCENE: ${dramaLevel} CRITICAL ROLE${dramaLevel > 1 ? 'S' : ''} MISSING!`);
    console.log(`The following environment variables are required but empty/null:`);
    missingVars.forEach(v => console.log(`  - ${v}`));
    console.log(`\n💀 SHOW CANNOT GO ON. Exiting with drama...`);
    process.exit(1);
} else {
    console.log(`\n🎉 ALL STARS PRESENT! No drama today.`);
    console.log(`The show will go on (probably).`);
    process.exit(0);
}
