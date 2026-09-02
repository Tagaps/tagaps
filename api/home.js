const fs = require('fs');
const path = require('path');

const PROOF_HEADING_PATTERN = /<h2[^>]*>Our work spans 25 years,[\s\S]*?mission-driven organizations\.<\/h2>/;
const PROOF_HEADING_FIXED = '<h2 class="proof-heading-title">Our work spans 25 years,<br>more than 15 industries, and<br>for-profit companies and mission-driven organizations.</h2>';

const PROOF_HEADING_CSS = `
<style id="tag-proof-heading-three-line-fix">
.proof-elements{padding:clamp(4.25rem,7vw,7rem) 0!important}
.proof-heading{width:100%!important;max-width:1500px!important;margin:0 auto clamp(2rem,4vw,3.25rem)!important;text-align:center!important}
.proof-heading h2{max-width:1500px!important;margin-left:auto!important;margin-right:auto!important;font-size:clamp(2.4rem,4.1vw,4.15rem)!important;line-height:1.16!important;letter-spacing:0!important;text-wrap:balance!important;color:#c4d6d1!important}
.proof-heading h2 br{display:block!important}
.proof-heading p{max-width:42rem!important;margin-left:auto!important;margin-right:auto!important;font-size:clamp(1.05rem,1.45vw,1.3rem)!important;line-height:1.45!important}
@media (max-width:1180px){.proof-heading{max-width:1080px!important}.proof-heading h2{max-width:1080px!important;font-size:clamp(2rem,4.15vw,3.25rem)!important;line-height:1.14!important}}
@media (max-width:1024px){.proof-heading{max-width:940px!important}.proof-heading h2{max-width:940px!important;font-size:clamp(1.9rem,4vw,2.85rem)!important;line-height:1.14!important}}
@media (max-width:900px){.proof-heading{max-width:820px!important}.proof-heading h2{max-width:820px!important;font-size:clamp(1.75rem,3.9vw,2.45rem)!important;line-height:1.14!important}}
@media (max-width:760px){.proof-elements{padding:3.5rem 0!important}.proof-heading{max-width:680px!important;text-align:center!important}.proof-heading h2{max-width:680px!important;font-size:clamp(1.55rem,3.85vw,2.1rem)!important;line-height:1.16!important;text-align:center!important}.proof-heading h2 br{display:block!important}.proof-heading p{font-size:1rem!important}}
@media (max-width:640px){.proof-heading{text-align:left!important}.proof-heading h2{max-width:100%!important;margin-left:0!important;margin-right:0!important;text-align:left!important;font-size:clamp(2.05rem,9.6vw,3.05rem)!important;line-height:1.08!important;text-wrap:balance!important}.proof-heading h2 br{display:none!important}.proof-heading p{margin-left:0!important;margin-right:0!important;text-align:left!important}}
@media (max-width:420px){.proof-heading h2{font-size:clamp(2rem,11vw,3rem)!important;max-width:11ch!important}}
</style>`;

module.exports = function handler(req, res) {
  const htmlPath = path.join(process.cwd(), 'home.html');
  let html = fs.readFileSync(htmlPath, 'utf8');

  html = html.replace(PROOF_HEADING_PATTERN, PROOF_HEADING_FIXED);
  html = html.includes('tag-proof-heading-three-line-fix')
    ? html
    : html.replace('</head>', `${PROOF_HEADING_CSS}</head>`);

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
  res.status(200).send(html);
};
