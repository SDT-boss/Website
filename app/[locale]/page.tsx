import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LandingNav } from "@/components/landing/LandingNav";
import "../sdt-landing.css";

export const metadata: Metadata = {
  title: { absolute: "SDT Technology — Infrastructure for intelligent operations." },
  description:
    "SDT Technology is a holding company building intelligent operations ventures — starting with EVEcosys fleet mobility and expanding into IoT, AI and logistics.",
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "id" }, { locale: "zh" }];
}

export const dynamicParams = false;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("landing");
  const b = { b: (chunks: React.ReactNode) => <b>{chunks}</b> };

  return (
    <>
      {/* Fonts + icon set for the marketing page only */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&family=Geist:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,400..700,1,0&display=swap"
      />

      <div className="sdt-landing">
        <LandingNav />

        {/* ── HERO ── */}
        <header className="hero" id="platform">
          <div className="glow g1" />
          <div className="glow g2" />
          <div className="wrap hero-in">
            <div>
              <span className="hero-badge">
                <span className="dot" />
                {t("hero.badge")}
              </span>
              <h1>
                {t("hero.h1a")}
                <br />
                <span className="grad-text">{t("hero.h1b")}</span>
              </h1>
              <p className="lede">{t("hero.lede")}</p>
              <div className="hero-cta">
                <a href="#cta" className="btn btn-primary">
                  <span className="msym">rocket_launch</span>
                  {t("hero.cta1")}
                </a>
                <a href="#evecosys" className="btn btn-ghost">
                  <span className="msym">play_circle</span>
                  {t("hero.cta2")}
                </a>
              </div>
              <div className="hero-meta">
                <div className="m">
                  <div className="n grad-text">1</div>
                  <div className="l">{t("hero.m1")}</div>
                </div>
                <div className="m">
                  <div className="n grad-text">∞</div>
                  <div className="l">{t("hero.m2")}</div>
                </div>
                <div className="m">
                  <div className="n grad-text">24/7</div>
                  <div className="l">{t("hero.m3")}</div>
                </div>
              </div>
            </div>
            <div className="product">
              <div className="pcard">
                <div className="pbar">
                  <span className="d" />
                  <span className="d" />
                  <span className="d" />
                  <span className="url">app.evecosys.io</span>
                </div>
                <div className="pbody">
                  <div className="phd">
                    <span className="av">
                      <span className="msym">bolt</span>
                    </span>
                    <b>EVEcosys · Fleet Overview</b>
                    <span className="live">
                      <span className="dot" />
                      LIVE
                    </span>
                  </div>
                  <div className="kpis">
                    <div className="kpi">
                      <div className="l">Fleet avg SOC</div>
                      <div className="v">84<small>%</small></div>
                    </div>
                    <div className="kpi">
                      <div className="l">On patrol</div>
                      <div className="v">14<small>/20</small></div>
                    </div>
                    <div className="kpi">
                      <div className="l">Readiness</div>
                      <div className="v">88</div>
                    </div>
                  </div>
                  <div className="rrow">
                    <span className="ring" style={{ background: "#d62f2f" }}>58</span>
                    <div>
                      <div className="nm">Wuling Air EV</div>
                      <div className="sub">B 5510 EVT · DTC fault</div>
                    </div>
                    <span className="pill-s" style={{ background: "#fce4e4", color: "#a31919" }}>UNAVAILABLE</span>
                  </div>
                  <div className="rrow">
                    <span className="ring" style={{ background: "#d6890c" }}>72</span>
                    <div>
                      <div className="nm">BYD Atto 3</div>
                      <div className="sub">B 4420 EVT · battery 52%</div>
                    </div>
                    <span className="pill-s" style={{ background: "#fcefd6", color: "#8a5300" }}>LIMITED</span>
                  </div>
                  <div className="rrow">
                    <span className="ring" style={{ background: "#4e9a1f" }}>94</span>
                    <div>
                      <div className="nm">Hyundai Ioniq 5</div>
                      <div className="sub">B 1234 EVT · all nominal</div>
                    </div>
                    <span className="pill-s" style={{ background: "#e7f3d6", color: "#2f6a0e" }}>READY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ── TRUST ── */}
        <div className="trust">
          <div className="wrap trust-in">
            <span className="lbl">{t("trust.label")}</span>
            <div className="logos">
              <span><span className="msym">electric_car</span><span>{t("trust.l1")}</span></span>
              <span><span className="msym">sensors</span><span>{t("trust.l2")}</span></span>
              <span><span className="msym">local_shipping</span><span>{t("trust.l3")}</span></span>
              <span><span className="msym">smart_toy</span><span>{t("trust.l4")}</span></span>
            </div>
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section className="pad" id="services">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">{t("services.eyebrow")}</span>
              <h2>{t("services.heading")}</h2>
              <p>{t("services.body")}</p>
            </div>
            <div className="svc-grid">
              <div className="svc">
                <span className="tagn" style={{ color: "#2f6a0e" }}>
                  <span className="msym" style={{ fontSize: "13px", verticalAlign: "-2px" }}>check_circle</span> {t("services.tagLive")}
                </span>
                <div className="ic" style={{ background: "linear-gradient(135deg,#1a7080,#2aa06a)" }}>
                  <span className="msym">electric_car</span>
                </div>
                <h3>{t("services.s1Title")}</h3>
                <p>{t("services.s1Body")}</p>
                <div className="feat">
                  <div><span className="msym">check_circle</span>Mission readiness scoring</div>
                  <div><span className="msym">check_circle</span>Charging &amp; energy monitoring</div>
                  <div><span className="msym">check_circle</span>Driver &amp; compliance ops</div>
                </div>
              </div>
              <div className="svc">
                <span className="tagn" style={{ color: "#8a5300" }}>
                  <span className="msym" style={{ fontSize: "13px", verticalAlign: "-2px" }}>construction</span> {t("services.tagBuild")}
                </span>
                <div className="ic" style={{ background: "linear-gradient(135deg,#7c3aed,#2aa06a)" }}>
                  <span className="msym">smart_toy</span>
                </div>
                <h3>{t("services.s2Title")}</h3>
                <p>{t("services.s2Body")}</p>
                <div className="feat">
                  <div><span className="msym">check_circle</span>Agentic operations copilots</div>
                  <div><span className="msym">check_circle</span>Predictive &amp; anomaly models</div>
                  <div><span className="msym">check_circle</span>Decision automation</div>
                </div>
              </div>
              <div className="svc">
                <span className="tagn" style={{ color: "#8a5300" }}>
                  <span className="msym" style={{ fontSize: "13px", verticalAlign: "-2px" }}>construction</span> {t("services.tagBuild")}
                </span>
                <div className="ic" style={{ background: "linear-gradient(135deg,#2a6fdb,#1a7080)" }}>
                  <span className="msym">sensors</span>
                </div>
                <h3>{t("services.s3Title")}</h3>
                <p>{t("services.s3Body")}</p>
                <div className="feat">
                  <div><span className="msym">check_circle</span>Edge device integration</div>
                  <div><span className="msym">check_circle</span>Streaming telemetry pipeline</div>
                  <div><span className="msym">check_circle</span>Fault &amp; anomaly detection</div>
                </div>
              </div>
              <div className="svc" style={{ background: "linear-gradient(150deg,#0e2a30,#0a2024)", color: "#fff", borderColor: "rgba(124,194,66,.25)" }}>
                <span className="tagn" style={{ color: "#b6e06a" }}>
                  <span className="msym" style={{ fontSize: "13px", verticalAlign: "-2px" }}>explore</span> {t("services.tagExplore")}
                </span>
                <div className="ic" style={{ background: "rgba(124,194,66,.15)" }}>
                  <span className="msym" style={{ color: "#b6e06a" }}>add</span>
                </div>
                <h3>{t("services.s4Title")}</h3>
                <p style={{ color: "rgba(255,255,255,.66)" }}>{t("services.s4Body")}</p>
                <div className="feat">
                  <div style={{ color: "rgba(255,255,255,.78)" }}><span className="msym" style={{ color: "#7cc242" }}>bolt</span>Energy &amp; grid systems</div>
                  <div style={{ color: "rgba(255,255,255,.78)" }}><span className="msym" style={{ color: "#7cc242" }}>local_shipping</span>Logistics &amp; supply chain</div>
                  <div style={{ color: "rgba(255,255,255,.78)" }}><span className="msym" style={{ color: "#7cc242" }}>handshake</span>Co-build a venture with us</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FLAGSHIP: EVECOSYS ── */}
        <section className="flag pad" id="evecosys">
          <div className="wrap flag-in">
            <div>
              <span className="eyebrow">{t("flagship.eyebrow")}</span>
              <h2>{t("flagship.heading")}</h2>
              <p className="desc">{t.rich("flagship.desc", b)}</p>
              <div className="blist">
                <div className="b"><span className="ic"><span className="msym">monitor_heart</span></span><div className="tx"><b>{t("flagship.b1Title")}</b><span>{t("flagship.b1Sub")}</span></div></div>
                <div className="b"><span className="ic"><span className="msym">build</span></span><div className="tx"><b>{t("flagship.b2Title")}</b><span>{t("flagship.b2Sub")}</span></div></div>
                <div className="b"><span className="ic"><span className="msym">map</span></span><div className="tx"><b>{t("flagship.b3Title")}</b><span>{t("flagship.b3Sub")}</span></div></div>
                <div className="b"><span className="ic"><span className="msym">groups</span></span><div className="tx"><b>{t("flagship.b4Title")}</b><span>{t("flagship.b4Sub")}</span></div></div>
              </div>
              <div className="hero-cta">
                <a href="#cta" className="btn btn-dark">
                  <span className="msym">arrow_forward</span>
                  <span>{t("flagship.cta")}</span>
                </a>
              </div>
            </div>
            <div className="flag-visual">
              <div className="vh">
                <span className="av"><span className="msym">verified_user</span></span>
                <b>Predictive Maintenance</b>
                <span style={{ marginLeft: "auto", fontSize: "11px", color: "rgba(255,255,255,.5)" }}>live · 2m ago</span>
              </div>
              <div className="pm-top">
                <div className="pm-ring">
                  <svg width="70" height="70" viewBox="0 0 70 70" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="35" cy="35" r="31" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="6" />
                    <circle cx="35" cy="35" r="31" fill="none" stroke="#d6890c" strokeWidth="6" strokeLinecap="round" strokeDasharray="194.8" strokeDashoffset="54.5" />
                  </svg>
                  <div className="num"><b style={{ color: "#f4bd5b" }}>72</b><span>/ 100</span></div>
                </div>
                <div className="veh">
                  <b>BYD Atto 3</b>
                  <span className="pl">B 4420 EVT</span>
                  <span className="pm-tag" style={{ background: "rgba(244,189,91,.15)", color: "#f4bd5b" }}>
                    <span className="msym" style={{ fontSize: "12px" }}>warning</span>LIMITED · dispatch with caution
                  </span>
                </div>
              </div>
              <div className="pm-bars">
                <div className="pm-bar"><div className="lbl"><span className="msym">build</span>Mechanical <span className="w">·30%</span><span className="val" style={{ color: "#9fe06a" }}>90</span></div><div className="track"><div className="fill" style={{ width: "90%", background: "#6cc23f" }} /></div></div>
                <div className="pm-bar"><div className="lbl"><span className="msym">battery_charging_full</span>Battery <span className="w">·25%</span><span className="val" style={{ color: "#f4bd5b" }}>52</span></div><div className="track"><div className="fill" style={{ width: "52%", background: "#e3a52a" }} /></div></div>
                <div className="pm-bar"><div className="lbl"><span className="msym">ev_station</span>Charging <span className="w">·10%</span><span className="val" style={{ color: "#f4bd5b" }}>58</span></div><div className="track"><div className="fill" style={{ width: "58%", background: "#e3a52a" }} /></div></div>
              </div>
              <div className="pm-alert">
                <span className="ai"><span className="msym">auto_awesome</span></span>
                <div className="tx">
                  <b>EVE predicts a fault before it grounds the vehicle</b>
                  <span>Battery degradation is trending below the dispatch floor — likely cell imbalance within ~2 weeks.</span>
                  <span className="ticket"><span className="msym" style={{ fontSize: "13px" }}>confirmation_number</span>Maintenance ticket auto-raised · Priority</span>
                </div>
              </div>
              <div className="vstats">
                <div className="s"><div className="v">−38%</div><div className="l">{t("showcase.s4")}</div></div>
                <div className="s"><div className="v">5</div><div className="l">{t("showcase.s3")}</div></div>
                <div className="s"><div className="v">14d</div><div className="l">Avg fault lead time</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SHOWCASE ── */}
        <section className="showcase pad" id="interfaces">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">{t("showcase.eyebrow")}</span>
              <h2>{t("showcase.heading")}</h2>
              <p>{t.rich("showcase.body", b)}</p>
            </div>

            {/* Highlight 1: Trip Planner */}
            <div className="show-grid" style={{ marginBottom: "34px" }}>
              <div className="show-feat" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <span className="feat-tag"><span className="msym" style={{ fontSize: "15px" }}>map</span>Trip Planner · Driver app</span>
                <h3>{t("showcase.h1")}</h3>
                <p>{t("showcase.p1")}</p>
                <div className="hero-meta" style={{ marginTop: "26px" }}>
                  <div className="m"><div className="n grad-text">7</div><div className="l">{t("showcase.s1")}</div></div>
                  <div className="m"><div className="n grad-text">2</div><div className="l">{t("showcase.s2")}</div></div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div className="dev-phone">
                  <div className="pn" />
                  <div className="scr">
                    <div className="tp-map">
                      <svg className="streets" viewBox="0 0 290 540" preserveAspectRatio="none">
                        <g stroke="#7cc242" strokeWidth="1" fill="none" opacity=".18">
                          <path d="M-10 120 H300 M-10 250 H300 M-10 380 H300 M60 -10 V550 M150 -10 V550 M230 -10 V550" />
                        </g>
                        <g stroke="#3a6b5a" strokeWidth="8" fill="none" opacity=".3"><path d="M30 470 L70 360 L150 300 L150 180 L235 110" /></g>
                      </svg>
                      <svg className="tp-route" viewBox="0 0 290 540" preserveAspectRatio="none">
                        <path d="M30 470 L70 360 L150 300 L150 180 L235 110" stroke="#ffffff" strokeWidth="6" fill="none" strokeLinejoin="round" opacity=".9" />
                        <path d="M30 470 L70 360 L150 300 L150 180 L235 110" stroke="#1a7080" strokeWidth="3.5" fill="none" strokeLinejoin="round" />
                      </svg>
                      <div className="tp-pin" style={{ background: "#36433b", left: "18px", bottom: "58px" }}><span className="msym">my_location</span></div>
                      <div className="tp-pin req" style={{ background: "#4e9a1f", color: "#4e9a1f", left: "54px", top: "340px" }}><span className="msym">bolt</span></div>
                      <div className="tp-pin req" style={{ background: "#d6890c", color: "#d6890c", left: "134px", top: "282px" }}><span className="msym">build</span></div>
                      <div className="tp-pin" style={{ background: "#a31919", left: "134px", top: "162px" }}><span className="msym">sync_alt</span></div>
                      <div className="tp-pin" style={{ background: "#1a7080", right: "42px", top: "92px" }}><span className="msym">flag</span></div>

                      <div className="tp-topbar">
                        <span className="msym">route</span>
                        <div style={{ flex: 1, minWidth: 0 }}><b>South Jakarta Patrol</b><small>Afternoon · 47.5 km · 7 stops</small></div>
                      </div>

                      <div className="tp-sheet">
                        <div className="handle" />
                        <div className="nxt"><span className="msym">turn_right</span>Next stop · 14:25</div>
                        <div className="tp-stop">
                          <span className="ic" style={{ background: "#e7f3d6" }}><span className="msym" style={{ color: "#2f6a0e" }}>bolt</span></span>
                          <div style={{ flex: 1, minWidth: 0 }}><b>Senayan City · DC Fast</b><span>Charge · 60 kW · 25 min → 80%</span></div>
                        </div>
                        <div className="tp-stop" style={{ marginTop: "8px" }}>
                          <span className="ic" style={{ background: "#fcefd6" }}><span className="msym" style={{ color: "#8a5300" }}>build</span></span>
                          <div style={{ flex: 1, minWidth: 0 }}><b>Pondok Indah Workshop <span className="tp-req">Required</span></b><span>Maintenance pit-stop · tyre check</span></div>
                        </div>
                        <button className="tp-go"><span className="msym">navigation</span>Start navigation</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Highlight 2: Predictive Maintenance board */}
            <div className="show-grid" style={{ gridTemplateColumns: "1fr 360px" }}>
              <div>
                <div className="dev-browser">
                  <div className="br-bar"><span className="d" /><span className="d" /><span className="d" /><span className="url">app.evecosys.io/predictive-maintenance</span></div>
                  <div className="pm-body">
                    <div className="pm-h"><span className="av"><span className="msym">verified_user</span></span><b>Predictive Maintenance</b><span className="live"><span className="dot" />LIVE</span></div>
                    <div className="pm-tiles">
                      <div className="pm-tile"><span className="bar" style={{ background: "#d62f2f" }} /><div className="lh" style={{ color: "#a31919" }}><span className="msym">block</span>Unavailable</div><div className="num">1<small> /6</small></div></div>
                      <div className="pm-tile"><span className="bar" style={{ background: "#d6890c" }} /><div className="lh" style={{ color: "#8a5300" }}><span className="msym">warning</span>Limited</div><div className="num">2<small> /6</small></div></div>
                      <div className="pm-tile"><span className="bar" style={{ background: "#4e9a1f" }} /><div className="lh" style={{ color: "#2f6a0e" }}><span className="msym">check_circle</span>Ready</div><div className="num">3<small> /6</small></div></div>
                    </div>
                    <div className="pm-list">
                      <div className="pm-row">
                        <div className="r"><svg width="40" height="40" viewBox="0 0 40 40" style={{ transform: "rotate(-90deg)" }}><circle cx="20" cy="20" r="17" fill="none" stroke="#eef2ee" strokeWidth="4" /><circle cx="20" cy="20" r="17" fill="none" stroke="#d62f2f" strokeWidth="4" strokeLinecap="round" strokeDasharray="106.8" strokeDashoffset="44.9" /></svg><span className="n" style={{ color: "#a31919" }}>58</span></div>
                        <div className="info"><b>Wuling Air EV</b><div className="sub" style={{ color: "#a31919" }}><span className="msym">error</span>DTC: active fault code</div></div>
                        <span className="st" style={{ background: "#fce4e4", color: "#a31919" }}>UNAVAILABLE</span>
                        <span className="chev"><span className="msym">chevron_right</span></span>
                      </div>
                      <div className="pm-row">
                        <div className="r"><svg width="40" height="40" viewBox="0 0 40 40" style={{ transform: "rotate(-90deg)" }}><circle cx="20" cy="20" r="17" fill="none" stroke="#eef2ee" strokeWidth="4" /><circle cx="20" cy="20" r="17" fill="none" stroke="#d6890c" strokeWidth="4" strokeLinecap="round" strokeDasharray="106.8" strokeDashoffset="29.9" /></svg><span className="n" style={{ color: "#8a5300" }}>72</span></div>
                        <div className="info"><b>BYD Atto 3</b><div className="sub" style={{ color: "#8a5300" }}><span className="msym">battery_alert</span>Battery 52% — below floor</div></div>
                        <span className="st" style={{ background: "#fcefd6", color: "#8a5300" }}>LIMITED</span>
                        <span className="chev"><span className="msym">chevron_right</span></span>
                      </div>
                      <div className="pm-row">
                        <div className="r"><svg width="40" height="40" viewBox="0 0 40 40" style={{ transform: "rotate(-90deg)" }}><circle cx="20" cy="20" r="17" fill="none" stroke="#eef2ee" strokeWidth="4" /><circle cx="20" cy="20" r="17" fill="none" stroke="#4e9a1f" strokeWidth="4" strokeLinecap="round" strokeDasharray="106.8" strokeDashoffset="6.4" /></svg><span className="n" style={{ color: "#2f6a0e" }}>94</span></div>
                        <div className="info"><b>Hyundai Ioniq 5</b><div className="sub" style={{ color: "#5a6a5a" }}><span className="msym" style={{ color: "#4e9a1f" }}>check_circle</span>All systems nominal</div></div>
                        <span className="st" style={{ background: "#e7f3d6", color: "#2f6a0e" }}>READY</span>
                        <span className="chev"><span className="msym">chevron_right</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="show-feat" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <span className="feat-tag"><span className="msym" style={{ fontSize: "15px" }}>monitor_heart</span>Predictive Maintenance · Manager</span>
                <h3>{t("showcase.h2")}</h3>
                <p>{t("showcase.p2")}</p>
                <div className="hero-meta" style={{ marginTop: "26px" }}>
                  <div className="m"><div className="n grad-text">5</div><div className="l">{t("showcase.s3")}</div></div>
                  <div className="m"><div className="n grad-text">−38%</div><div className="l">{t("showcase.s4")}</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── APPROACH ── */}
        <section className="approach pad" id="approach">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">{t("approach.eyebrow")}</span>
              <h2>{t("approach.heading")}</h2>
              <p>{t("approach.body")}</p>
            </div>
            <div className="pillars">
              <div className="pillar">
                <div className="n">01</div>
                <div className="ic"><span className="msym">memory</span></div>
                <h3>{t("approach.p1Title")}</h3>
                <p>{t("approach.p1Body")}</p>
              </div>
              <div className="pillar">
                <div className="n">02</div>
                <div className="ic"><span className="msym">lan</span></div>
                <h3>{t("approach.p2Title")}</h3>
                <p>{t("approach.p2Body")}</p>
              </div>
              <div className="pillar">
                <div className="n">03</div>
                <div className="ic"><span className="msym">auto_awesome</span></div>
                <h3>{t("approach.p3Title")}</h3>
                <p>{t("approach.p3Body")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── METRICS ── */}
        <section className="metrics">
          <div className="wrap pad metrics-in">
            <div className="m"><div className="v">99.9%</div><div className="l">{t("metrics.m1")}</div></div>
            <div className="m"><div className="v">5</div><div className="l">{t("metrics.m2")}</div></div>
            <div className="m"><div className="v">&lt;30s</div><div className="l">{t("metrics.m3")}</div></div>
            <div className="m"><div className="v">3G</div><div className="l">{t("metrics.m4")}</div></div>
          </div>
        </section>

        {/* ── TEAM ── */}
        <section className="team pad" id="team">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">{t("team.eyebrow")}</span>
              <h2>{t("team.heading")}</h2>
              <p>{t("team.body")}</p>
            </div>
            <div className="team-grid">
              <div className="tcard">
                <div className="tav" style={{ background: "linear-gradient(135deg,#1a7080,#2aa06a)" }}>
                  {/* Swap initials for a photo: <img src="/team/suarmin.jpg" alt="Suarmin Tioniwar" /> */}
                  <span className="ini">ST</span>
                </div>
                <div className="role">{t("team.m1Role")}</div>
                <h3>Suarmin Tioniwar</h3>
                <p className="bio">{t("team.m1Bio")}</p>
                <div className="tags">
                  <span className="tag">Infrastructure</span>
                  <span className="tag">Freight &amp; Logistics</span>
                  <span className="tag">Policy &amp; Operations</span>
                  <span className="tag">Jakarta</span>
                </div>
              </div>
              <div className="tcard">
                <div className="tav" style={{ background: "linear-gradient(135deg,#7c3aed,#1a7080)" }}>
                  {/* Swap initials for a photo: <img src="/team/shannen.jpg" alt="Shannen Tioniwar" /> */}
                  <span className="ini">SH</span>
                </div>
                <div className="role">{t("team.m2Role")}</div>
                <h3>Shannen Tioniwar</h3>
                <p className="bio">{t("team.m2Bio")}</p>
                <div className="tags">
                  <span className="tag">IoT &amp; Connected Systems</span>
                  <span className="tag">Data Applications</span>
                  <span className="tag">Product Strategy</span>
                  <span className="tag">University of Edinburgh</span>
                </div>
              </div>
              <div className="tcard">
                <div className="tav" style={{ background: "linear-gradient(135deg,#5a9e2f,#1a7080)" }}>
                  {/* Swap initials for a photo: <img src="/team/samuel.jpg" alt="Samuel Tioniwar" /> */}
                  <span className="ini">SD</span>
                </div>
                <div className="role">{t("team.m3Role")}</div>
                <h3>Samuel Tioniwar</h3>
                <p className="bio">{t("team.m3Bio")}</p>
                <div className="tags">
                  <span className="tag">EV Infrastructure</span>
                  <span className="tag">Green Mobility</span>
                  <span className="tag">Mechanical Engineering</span>
                  <span className="tag">Southeast Asia</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta" id="cta">
          <div className="glow g1" style={{ top: "-180px", right: "10%" }} />
          <div className="wrap">
            <h2>{t("cta.heading")}</h2>
            <p>{t("cta.body")}</p>
            <div className="hero-cta">
              <a href="mailto:sdttech.co@gmail.com" className="btn btn-primary"><span className="msym">handshake</span><span>{t("cta.b1")}</span></a>
              <a href="mailto:sdttech.co@gmail.com" className="btn btn-ghost"><span className="msym">mail</span><span>{t("cta.b2")}</span></a>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer>
          <div className="wrap">
            <div className="foot-grid">
              <div className="about">
                <a href="#platform" className="logo" aria-label="SDT tech — home">
                  <Image src="/logo-light.png" alt="SDT tech" width={146} height={67} draggable={false} className="logo-img" />
                </a>
                <p>{t("footer.about")}</p>
              </div>
              <div>
                <h4>{t("footer.col1")}</h4>
                <a href="#evecosys">EVEcosys · Fleet</a>
                <a href="#services">IoT &amp; Telemetry</a>
                <a href="#services">Logistics</a>
                <a href="#services">AI Operations</a>
              </div>
              <div>
                <h4>{t("footer.col2")}</h4>
                <a href="#approach">Our approach</a>
                <a href="#team">{t("nav.team")}</a>
                <a href="#cta">Contact</a>
              </div>
              <div>
                <h4>{t("footer.col3")}</h4>
                <a href="#cta">Book a demo</a>
                <a href="#evecosys">See EVEcosys</a>
              </div>
            </div>
            <div className="foot-bottom">
              <span>© 2026 SDT Technology · Jakarta, Indonesia</span>
              <span style={{ display: "flex", gap: "18px" }}>
                <a href="#cta" style={{ display: "inline" }}>Privacy</a>
                <a href="#cta" style={{ display: "inline" }}>Terms</a>
                <a href="#cta" style={{ display: "inline" }}>Security</a>
              </span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
