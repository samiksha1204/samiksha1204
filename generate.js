const fs   = require("fs");
const data = require("./data.js");

const {
  name, headline, headerDesc, about, currentlyExploring,
  typingLines, theme, sections, skills, certifications, education, social,
} = data;

const { accentColor, neutralColor, headerColorList, typingColor } = theme;

const enc = (s) => encodeURIComponent(s);

// ─── Blocks ───────────────────────────────────────────────────────────────────

function header() {
  return [
    `<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=${headerColorList}&height=200&section=header&text=${enc(name)}&fontSize=62&fontColor=fff&animation=twinkling&fontAlignY=42&desc=${enc(headerDesc)}&descAlignY=65&descSize=16"/>`,
    ``,
    `<p align="center">`,
    `  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=18&duration=2800&pause=900&color=${typingColor}&center=true&vCenter=true&width=680&lines=${typingLines.map(enc).join(";")}"/>`,
    `</p>`,
    ``,
    `<h3 align="center">${headline}</h3>`,
    ``,
    `---`,
  ].join("\n");
}

function aboutSection() {
  if (!sections.about) return "";
  return [
    `## ⚡ About`,
    ``,
    about,
    ``,
    `🔭 Currently exploring: ${currentlyExploring}`,
    ``,
    `---`,
  ].join("\n");
}

function skillsSection() {
  if (!sections.skills) return "";
  const lines = skills.map(
    (g) => `**${g.category}** &nbsp;·&nbsp; ${g.items.join(" &nbsp;·&nbsp; ")}`
  );
  return [`## 🛠️ Skills`, ``, ...lines, ``, `---`].join("\n");
}

function certificationsSection() {
  if (!sections.certifications) return "";
  const rows = certifications.map(
    (c) => `  <tr>
    <td width="50" align="center">
      <img src="https://img.shields.io/badge/SAP-${accentColor}?style=flat-square&logo=sap&logoColor=white" height="22"/>
    </td>
    <td>
      <a href="${c.credlyUrl}" target="_blank"><strong>${c.name}</strong></a> &nbsp; <code>${c.code}</code><br/>
      <sub>Issued ${c.year} &nbsp;·&nbsp; ${c.issuer} &nbsp;·&nbsp; Verify on Credly ↗</sub>
    </td>
  </tr>`
  );
  return [
    `## 🏆 Certifications`,
    ``,
    `<table>`,
    ...rows,
    `</table>`,
    ``,
    `---`,
  ].join("\n");
}

function educationSection() {
  if (!sections.education) return "";
  const rows = education.map(
    (e) => `| ${e.degree} | ${e.institution} | ${e.year} |`
  );
  return [
    `## 🎓 Education`,
    ``,
    `| Degree | Institution | Year |`,
    `|--------|-------------|------|`,
    ...rows,
    ``,
    `---`,
  ].join("\n");
}

function connectSection() {
  if (!sections.connect) return "";
  const badges = [];
  if (social.email)
    badges.push(
      `  <a href="mailto:${social.email}" target="_blank">\n    <img src="https://img.shields.io/badge/Gmail-${neutralColor}?style=for-the-badge&logo=gmail&logoColor=white"/>\n  </a>`
    );
  if (social.linkedin)
    badges.push(
      `  <a href="https://www.linkedin.com/in/${social.linkedin}" target="_blank">\n    <img src="https://img.shields.io/badge/LinkedIn-${neutralColor}?style=for-the-badge&logo=linkedin&logoColor=white"/>\n  </a>`
    );
  if (social.github)
    badges.push(
      `  <a href="https://github.com/${social.github}" target="_blank">\n    <img src="https://img.shields.io/badge/GitHub-${neutralColor}?style=for-the-badge&logo=github&logoColor=white"/>\n  </a>`
    );
  if (social.portfolio)
    badges.push(
      `  <a href="${social.portfolio}" target="_blank">\n    <img src="https://img.shields.io/badge/Portfolio-${accentColor}?style=for-the-badge&logo=vercel&logoColor=white"/>\n  </a>`
    );
  return [`## ✉️ Connect`, ``, `<p>`, ...badges, `</p>`].join("\n");
}

function footer() {
  return `<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=${headerColorList}&height=120&section=footer"/>`;
}

// ─── Assemble ─────────────────────────────────────────────────────────────────

const parts = [
  header(),
  aboutSection(),
  skillsSection(),
  certificationsSection(),
  educationSection(),
  connectSection(),
  footer(),
].filter(Boolean);

const readme = parts.join("\n\n") + "\n";

fs.writeFileSync("README.md", readme, "utf8");
console.log("✓ README.md generated successfully");
