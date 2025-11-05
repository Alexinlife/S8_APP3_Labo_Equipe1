const { greet } = require("../src/index.js");

function testGreet() {
  const result = greet("Alex");
  if (!result.includes("Bonjour Alex !")) {
    console.error(`❌ Test échoué: résultat = "${result}"`);
    process.exit(1);
  } else {
    console.log("✅ Test réussi!");
  }
}

testGreet();
