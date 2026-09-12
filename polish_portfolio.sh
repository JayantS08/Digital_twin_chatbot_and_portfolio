#!/bin/bash

set -e

FILE="app/globals.css"
BACKUP="app/globals.css.before_polish_$(date +%Y%m%d_%H%M%S)"

cp "$FILE" "$BACKUP"

echo "Backup created:"
echo "  $BACKUP"

python3 - <<'PY'
from pathlib import Path

path = Path("app/globals.css")
text = path.read_text()

START = "/* ===== PORTFOLIO POLISH PASS START ===== */"
END = "/* ===== PORTFOLIO POLISH PASS END ===== */"

# Remove an older polish block if this script was run before.
if START in text and END in text:
    before = text.split(START, 1)[0].rstrip()
    after = text.split(END, 1)[1].lstrip()
    text = before + "\n\n" + after

polish = r'''
/* ===== PORTFOLIO POLISH PASS START ===== */

/* =========================================================
   GLOBAL REFINEMENT
   ========================================================= */

body {
  overflow-x: hidden;
}

.section {
  position: relative;
}

.section h2,
.hero h1,
.project h3,
.structured-body h3,
.research-card h3,
.skill-group h3 {
  text-wrap: balance;
}

.section-intro,
.project p,
.structured-detail,
.research-card p,
.about-long {
  text-wrap: pretty;
}


/* =========================================================
   NAV — QUIETER, MORE PREMIUM
   ========================================================= */

.nav {
  background: rgba(247, 247, 244, 0.82);
}

.nav-inner {
  height: 72px;
}

.logo-mark {
  transition:
    transform 0.25s ease,
    background 0.25s ease;
}

.logo:hover .logo-mark {
  transform: rotate(-5deg);
  background: var(--accent);
}

.nav-cta {
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.nav-cta:hover {
  background: #fff;
  border-color: var(--line-dark);
  transform: translateY(-1px);
}


/* =========================================================
   HERO — TIGHTER & MORE DELIBERATE
   ========================================================= */

.hero {
  min-height: 94vh;
  padding-top: 135px;
  padding-bottom: 65px;
}

.hero-name-wrap {
  padding-top: 36px;
  padding-bottom: 28px;
}

.hero h1 {
  max-width: 1100px;
  font-size: clamp(78px, 12.4vw, 164px);
  line-height: 0.75;
}

.hero h1 em {
  margin-left: 6.5vw;
}

.hero-side-note {
  width: 255px;
  bottom: 48px;
}

.hero-side-note p {
  font-size: 12px;
  line-height: 1.7;
}

.hero-bottom {
  grid-template-columns: minmax(0, 1fr) 430px;
  gap: 70px;
  padding-top: 27px;
}

.hero-copy {
  max-width: 720px;
  font-size: 17px;
}

.hero-stats {
  border-top-color: var(--text);
}

.hero-stat strong {
  font-size: 11px;
}

.actions {
  margin-top: 25px;
}

.btn {
  transition:
    transform 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease;
}

.btn:hover svg {
  transform: translate(2px, 2px);
}

.btn svg {
  transition: transform 0.2s ease;
}


/* =========================================================
   SECTION RHYTHM
   ========================================================= */

.section {
  padding-top: 115px;
  padding-bottom: 115px;
}

.section-head,
.skills-header,
.research-header {
  margin-bottom: 62px;
}

.section-number {
  margin-bottom: 18px;
}

.section-intro {
  max-width: 390px;
}

.work-section::before,
.research-section::before,
.skills-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: max(32px, calc((100vw - var(--max)) / 2));
  width: 38px;
  height: 3px;
  background: var(--accent);
}


/* =========================================================
   PROJECTS — STRONGER CASE-STUDY HIERARCHY
   ========================================================= */

.projects {
  border-top-width: 1px;
}

.project {
  grid-template-columns: 64px minmax(0, 1fr) 210px;
  gap: 28px;
  padding-top: 31px;
  padding-bottom: 31px;
}

.project::before {
  background:
    linear-gradient(
      90deg,
      rgba(240, 240, 235, 0.96),
      rgba(246, 246, 242, 0.92)
    );
}

.project-index span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 1px solid var(--line);
  border-radius: 50%;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    color 0.2s ease;
}

.project:hover .project-index span {
  background: var(--text);
  border-color: var(--text);
  color: #fff;
}

.project h3 {
  max-width: 790px;
  font-size: clamp(24px, 2.6vw, 35px);
}

.project p {
  max-width: 760px;
  font-size: 13.5px;
  line-height: 1.72;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-meta {
  padding-left: 14px;
  border-left: 1px solid var(--line);
}

.project-meta strong {
  font-size: 11px;
  line-height: 1.5;
}

.project-link {
  margin-top: 20px;
}

.tag {
  background: transparent;
  padding: 5px 8px;
}

/* Slightly emphasize the ML / research-led projects */
.project:nth-child(-n+4) .project-index span {
  border-color: #c7c7be;
}

.project:nth-child(-n+4):hover .project-index span {
  background: var(--accent);
  border-color: var(--accent);
}


/* =========================================================
   ABOUT — CLEANER DARK BREAK
   ========================================================= */

.about-section {
  padding-top: 125px;
  padding-bottom: 125px;
}

.about-grid {
  grid-template-columns: 0.78fr 1.22fr;
}

.about-heading h2 {
  max-width: 580px;
}

.about-content {
  padding-top: 25px;
}

.big-text {
  max-width: 750px;
  font-size: clamp(27px, 2.8vw, 40px);
}

.about-rule {
  margin-top: 34px;
  margin-bottom: 34px;
}

.about-long {
  max-width: 760px;
}


/* =========================================================
   EDUCATION + EXPERIENCE
   ========================================================= */

.structured-grid {
  grid-template-columns: 0.68fr 1.32fr;
}

.structured-list {
  border-top-width: 1px;
}

.structured-item {
  grid-template-columns: 46px 1fr;
  gap: 22px;
  padding-top: 30px;
  padding-bottom: 32px;
}

.structured-index {
  padding-top: 3px;
}

.structured-body h3 {
  margin-top: 9px;
  font-size: 23px;
}

.structured-org {
  margin-bottom: 13px;
  color: #33332f;
}

.structured-detail {
  max-width: 730px;
  font-size: 13.5px;
  line-height: 1.78;
}

.experience-item {
  transition: padding-left 0.2s ease;
}

.experience-item:hover {
  padding-left: 10px;
}


/* =========================================================
   RESEARCH — LESS BOXY, MORE EDITORIAL
   ========================================================= */

.research-section {
  background: #eeeeE8;
}

.research-grid {
  gap: 1px;
  border: 0;
  background: var(--line-dark);
}

.research-card {
  min-height: 355px;
  padding: 30px;
  border: 0;
  background: #eeeeE8;
}

.research-card:hover {
  background: #fff;
  transform: translateY(-5px);
}

.research-card-top {
  margin-bottom: 48px;
}

.research-index {
  color: var(--accent);
}

.research-card h3 {
  max-width: 310px;
  font-size: 22px;
}

.research-card p {
  max-width: 330px;
  font-size: 13px;
}

.research-org {
  border-top: 1px solid var(--line);
  padding-top: 18px;
}


/* =========================================================
   SKILLS — CLEANER CAPABILITY GROUPS
   ========================================================= */

.skill-groups {
  gap: 1px;
  border: 0;
  background: var(--line);
}

.skill-group {
  min-height: 420px;
  display: flex;
  flex-direction: column;
  border: 0;
  background: var(--surface);
}

.skill-group-index {
  margin-bottom: 56px;
  color: var(--accent);
}

.skill-group h3 {
  font-size: 22px;
}

.skill-group > p {
  min-height: 44px;
}

.skill-group .skills {
  margin-top: auto;
  padding-top: 32px;
}

.skill {
  background: #f7f7f3;
  transition:
    color 0.18s ease,
    background 0.18s ease,
    border-color 0.18s ease;
}

.skill:hover {
  color: #fff;
  background: var(--text);
  border-color: var(--text);
}


/* =========================================================
   DIGITAL TWIN — FLAGSHIP FEATURE
   ========================================================= */

.twin-section {
  padding-top: 105px;
  padding-bottom: 105px;
}

.twin-shell {
  position: relative;
  overflow: hidden;
  padding: 46px;
  border-radius: 26px;
}

.twin-shell::before {
  content: "";
  position: absolute;
  width: 360px;
  height: 360px;
  right: -120px;
  top: -170px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 50%;
}

.twin-shell::after {
  content: "";
  position: absolute;
  width: 210px;
  height: 210px;
  right: -70px;
  top: -95px;
  border: 1px solid rgba(255, 90, 54, 0.2);
  border-radius: 50%;
}

.twin-header,
.chat {
  position: relative;
  z-index: 1;
}

.twin-header {
  margin-bottom: 45px;
}

.twin-copy {
  max-width: 330px;
}

.chat {
  border-color: #44443f;
}

.chat-head {
  background: rgba(255, 255, 255, 0.015);
}

.chat-messages {
  min-height: 360px;
}

.bubble {
  font-size: 14px;
}

.chat-form {
  padding: 12px;
}


/* =========================================================
   FOOTER
   ========================================================= */

.footer {
  padding-top: 48px;
  padding-bottom: 48px;
}

.footer-inner {
  align-items: center;
}


/* =========================================================
   TABLET
   ========================================================= */

@media (max-width: 1000px) {
  .hero {
    min-height: auto;
  }

  .hero h1 {
    font-size: clamp(78px, 13vw, 130px);
  }

  .hero-bottom {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .hero-stats {
    max-width: 650px;
  }

  .project {
    grid-template-columns: 54px 1fr 175px;
  }

  .structured-grid {
    grid-template-columns: 0.78fr 1.22fr;
    gap: 55px;
  }

  .research-card {
    min-height: 330px;
  }
}


/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 800px) {
  .nav-inner {
    height: 66px;
  }

  .hero {
    padding-top: 105px;
    padding-bottom: 58px;
  }

  .hero-name-wrap {
    padding-top: 28px;
    padding-bottom: 20px;
  }

  .hero h1 {
    font-size: 19vw;
    line-height: 0.8;
    letter-spacing: -0.075em;
  }

  .hero h1 em {
    margin-left: 0;
  }

  .hero-side-note {
    margin-top: 30px;
    padding-top: 13px;
  }

  .hero-bottom {
    padding-top: 24px;
  }

  .hero-copy {
    font-size: 16px;
  }

  .hero-stats {
    margin-top: 6px;
  }

  .section {
    padding-top: 78px;
    padding-bottom: 78px;
  }

  .section-head,
  .skills-header,
  .research-header {
    margin-bottom: 45px;
  }

  .section h2 {
    font-size: clamp(48px, 13vw, 72px);
  }

  .work-section::before,
  .research-section::before,
  .skills-section::before {
    left: 15px;
    width: 28px;
  }

  .project {
    grid-template-columns: 38px 1fr;
    padding-top: 26px;
    padding-bottom: 26px;
  }

  .project:hover {
    padding-left: 0;
    padding-right: 0;
  }

  .project-index span {
    width: 29px;
    height: 29px;
    font-size: 9px;
  }

  .project h3 {
    font-size: 25px;
  }

  .project p {
    -webkit-line-clamp: 3;
  }

  .project-meta {
    grid-column: 2;
    padding-left: 0;
    padding-top: 16px;
    border-left: 0;
  }

  .about-section {
    padding-top: 82px;
    padding-bottom: 82px;
  }

  .structured-grid {
    grid-template-columns: 1fr;
  }

  .structured-heading {
    margin-bottom: 5px;
  }

  .structured-item {
    grid-template-columns: 34px 1fr;
  }

  .experience-item:hover {
    padding-left: 0;
  }

  .research-grid,
  .skill-groups {
    grid-template-columns: 1fr;
  }

  .research-card {
    min-height: auto;
    padding: 26px;
  }

  .research-card-top {
    margin-bottom: 35px;
  }

  .research-org {
    margin-top: 35px;
  }

  .skill-group {
    min-height: auto;
    padding: 27px;
  }

  .skill-group-index {
    margin-bottom: 38px;
  }

  .skill-group .skills {
    margin-top: 8px;
    padding-top: 22px;
  }

  .twin-section {
    padding-top: 70px;
    padding-bottom: 70px;
  }

  .twin-shell {
    padding: 26px 18px 18px;
    border-radius: 18px;
  }

  .chat-messages {
    min-height: 330px;
    padding: 18px;
  }
}


/* =========================================================
   SMALL PHONES
   ========================================================= */

@media (max-width: 520px) {
  .container {
    width: calc(100% - 26px);
  }

  .hero {
    padding-top: 98px;
  }

  .hero-topline {
    padding-bottom: 18px;
  }

  .hero h1 {
    font-size: 21vw;
  }

  .hero-side-note {
    max-width: 100%;
  }

  .hero-stat strong {
    font-size: 11px;
  }

  .section h2 {
    font-size: 14vw;
  }

  .project {
    grid-template-columns: 1fr;
    gap: 11px;
  }

  .project-index,
  .project-meta {
    grid-column: 1;
  }

  .project-index span {
    width: 30px;
    height: 30px;
  }

  .project h3 {
    font-size: 25px;
  }

  .project-meta {
    display: block;
  }

  .project-meta strong {
    margin-top: 6px;
  }

  .project-link {
    margin-top: 15px;
  }

  .structured-item {
    grid-template-columns: 28px 1fr;
    gap: 9px;
  }

  .structured-body h3 {
    font-size: 21px;
  }

  .big-text {
    font-size: 26px;
  }

  .twin-header {
    gap: 28px;
  }
}


/* =========================================================
   ACCESSIBILITY / MOTION
   ========================================================= */

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}

/* ===== PORTFOLIO POLISH PASS END ===== */
'''

text = text.rstrip() + "\n\n" + polish.strip() + "\n"
path.write_text(text)

print("Portfolio polish CSS applied.")
PY

echo ""
echo "Done."
echo ""
echo "Now run:"
echo "  npm run build"
echo "  npm run dev"
