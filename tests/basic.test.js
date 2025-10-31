const { greet } = require("../src/index.js");

function testGreet() {
  const result = greet("Monde");
  if (!result.includes("Bonjour Monde !")) {
    console.error(`❌ Test échoué: résultat = "${result}"`);
    process.exit(1);
  } else {
    console.log("✅ Test réussi!");
  }
}

testGreet();
