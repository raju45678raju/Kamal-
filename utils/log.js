const chalk = require("chalk");

function styledLog({ prefix = "🔷", label = "SaNaN", suffix = "🔷", color = "#33ffc9", msg }) {
  console.log(chalk.bold.hex(color)(`${prefix} [ ${label} ] » ${msg} ${suffix}`));
}

module.exports = (msg, type = "info") => {
  switch (type.toLowerCase()) {
    case "warn":
      styledLog({ prefix: "⚠️", label: "Sanan", suffix: "⚠️", color: "#FFD700", msg });
      break;
    case "error":
      styledLog({ prefix: "❌", label: "Sanan", suffix: "❌", color: "#FF3333", msg });
      break;
    case "success":
      styledLog({ prefix: "✅", label: "Sanan", suffix: "✅", color: "#00FF7F", msg });
      break;
    case "load":
      styledLog({ prefix: "🔄", label: "Sanan", suffix: "🔄", color: "#00CED1", msg });
      break;
    default:
      styledLog({ prefix: "ℹ️", label: "Sanan", suffix: "ℹ️", color: "#00BFFF", msg });
      break;
  }
};

module.exports.loader = (msg, type = "info") => {
  switch (type.toLowerCase()) {
    case "warn":
      styledLog({ prefix: "⚠️", label: "SaNaN", suffix: "⚠️", color: "#FFD700", msg });
      break;
    case "error":
      styledLog({ prefix: "❗", label: "SaNaN LoaDer", suffix: "❗", color: "#FF334B", msg });
      break;
    case "success":
      styledLog({ prefix: "🚀", label: "SaNaN LoaDer", suffix: "🚀", color: "#32CD32", msg });
      break;
    default:
      styledLog({ prefix: "🔷", label: "SaNaN LoaDer", suffix: "🔷", color: "#33ffc9", msg });
      break;
  }
};
