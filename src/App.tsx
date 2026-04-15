import { useState, type ReactNode } from "react";

const COLORS = {
  bg: "#F7F8FA",
  card: "#FFFFFF",
  primary: "#1B6B93",
  primaryLight: "#E8F4F8",
  saline: "#3B82F6",
  salineLight: "#EFF6FF",
  med: "#F59E0B",
  medLight: "#FFFBEB",
  heparin: "#10B981",
  heparinLight: "#ECFDF5",
  emergency: "#DC2626",
  emergencyLight: "#FEF2F2",
  emergencyBorder: "#FECACA",
  textDark: "#1E293B",
  textMed: "#475569",
  textLight: "#94A3B8",
  border: "#E2E8F0",
  check: "#10B981",
};

// --- Types & Interfaces ---

interface ChecklistItem {
  t: string;
  s?: string;
}

interface DetailData {
  label: string;
  text: string;
}

interface Card {
  id: string;
  type: "welcome" | "checklist" | "info" | "step" | "complete";
  title: string;
  body?: string;
  reassure?: string;
  note?: string;
  intro?: string;
  items?: ChecklistItem[];
  warning?: string;
  sash?: boolean;
  phase?: "saline" | "med" | "heparin";
  phaseLabel?: string;
  stepNum?: number;
  steps?: string[];
  watch?: string;
  watchSeverity?: "critical" | "warning";
  detail?: DetailData;
  normalFeel?: string;
  conditional?: string;
  reminders?: string[];
}

// --- Sub-Components ---

const EmergencyBanner = () => (
  <div style={{
    background: COLORS.emergencyLight,
    border: `1.5px solid ${COLORS.emergencyBorder}`,
    borderRadius: 10,
    padding: "10px 16px",
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
  }}>
    <span style={{ fontSize: 20 }}>🚨</span>
    <div>
      <div style={{ fontWeight: 700, color: COLORS.emergency, fontSize: 13, lineHeight: 1.3 }}>
        Stop & Call 911 if you experience:
      </div>
      <div style={{ color: COLORS.emergency, fontSize: 12, lineHeight: 1.4, marginTop: 2 }}>
        Trouble breathing · Swelling of lips, tongue, or throat · Chest tightness or wheezing · Itching, flushing, or dizziness
      </div>
    </div>
  </div>
);

interface CheckItemProps {
  text: string;
  checked: boolean;
  onToggle: () => void;
  sub?: string;
}

const CheckItem = ({ text, checked, onToggle, sub }: CheckItemProps) => (
  <div
    onClick={onToggle}
    style={{
      display: "flex",
      gap: 12,
      padding: "12px 0",
      borderBottom: `1px solid ${COLORS.border}`,
      cursor: "pointer",
      userSelect: "none",
    }}
  >
    <div style={{
      width: 24, height: 24, borderRadius: 6, flexShrink: 0, marginTop: 1,
      border: checked ? "none" : `2px solid ${COLORS.textLight}`,
      background: checked ? COLORS.check : "transparent",
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "all 0.2s",
    }}>
      {checked && <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>✓</span>}
    </div>
    <div>
      <div style={{
        fontSize: 15, color: COLORS.textDark, lineHeight: 1.45,
        textDecoration: checked ? "line-through" : "none",
        opacity: checked ? 0.5 : 1, transition: "all 0.2s",
      }}>{text}</div>
      {sub && <div style={{ fontSize: 12.5, color: COLORS.textLight, marginTop: 3, lineHeight: 1.4 }}>{sub}</div>}
    </div>
  </div>
);

interface DetailToggleProps {
  label: string;
  children: ReactNode;
}

const DetailToggle = ({ label, children }: DetailToggleProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginTop: 10 }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          fontSize: 12.5, color: COLORS.primary, cursor: "pointer",
          fontWeight: 600, userSelect: "none", display: "flex", alignItems: "center", gap: 4,
        }}
      >
        <span style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", display: "inline-block" }}>▸</span>
        {label}
      </div>
      {open && (
        <div style={{
          fontSize: 13, color: COLORS.textMed, marginTop: 6,
          padding: "10px 14px", background: COLORS.primaryLight, borderRadius: 8, lineHeight: 1.5,
        }}>
          {children}
        </div>
      )}
    </div>
  );
};

const StepBadge = ({ color, label }: { color: string; label: string }) => (
  <span style={{
    display: "inline-block", fontSize: 10.5, fontWeight: 700,
    color: color, background: color + "18", padding: "3px 10px",
    borderRadius: 20, letterSpacing: 0.5, textTransform: "uppercase",
  }}>{label}</span>
);

// --- Data ---

const cards: Card[] = [
  {
    id: "welcome",
    type: "welcome",
    title: "Administering Your IV Push Antibiotic",
    body: "This guide walks you through each step of giving your IV antibiotic at home. The whole process typically takes about 10–15 minutes.",
    reassure: "Take your time. Read one card, complete the step, then move to the next. You've got this.",
    note: "Estimated time is approximate — your care team may give you a specific push time for your medication.",
  },
  {
    id: "supplies",
    type: "checklist",
    title: "Gather Your Supplies",
    intro: "Collect everything before you start. Lay them out left to right on a clean, flat surface — you'll use them in this order.",
    items: [
      { t: "Alcohol pads (4)", s: "You'll use one before each syringe connection" },
      { t: "Normal saline flush syringe #1" },
      { t: "Medication syringe (prepared by pharmacy)" },
      { t: "Normal saline flush syringe #2" },
      { t: "Heparin flush syringe", s: "Only if ordered for your type of line" },
      { t: "Disinfecting cap" },
    ],
  },
  {
    id: "before",
    type: "checklist",
    title: "Before You Begin",
    intro: "A quick safety check. Don't skip these — they protect you.",
    items: [
      { t: "Wash your hands with soap and water for 20 seconds. Dry with a paper towel.", s: "This is your single most important infection-prevention step." },
      { t: "Check the medication label: your name, medication name, dose, and expiration date are all correct." },
      { t: "Inspect the medication: no cloudiness, particles, or leaks." },
      { t: "Assess your IV site: no redness, swelling, pain, leaking, or warmth." },
      { t: "Confirm you have your emergency contact numbers within reach." },
    ],
    warning: "If anything looks wrong with the label, medication, or your IV site — DO NOT proceed. Call your pharmacy and speak to the pharmacist.",
  },
  {
    id: "sash-intro",
    type: "info",
    title: "Understanding the SASH Sequence",
    body: "Your infusion follows a pattern called SASH. It's a simple rhythm used by infusion professionals everywhere:",
    sash: true,
  },
  {
    id: "s1",
    type: "step",
    phase: "saline",
    phaseLabel: "S — Saline Flush",
    stepNum: 1,
    title: "Flush Your Line with Saline",
    steps: [
      "Scrub the IV luer lock cap with an alcohol pad for 15 seconds. Let it air dry.",
      "Remove the air bubble from your first saline syringe by gently pushing the plunger until a drop appears at the tip.",
      "Attach the saline syringe to the IV luer lock cap.",
      "Gently flush using the push-pause method until the syringe is empty.",
      "Disconnect the saline syringe.",
    ],
    watch: "Stop if you feel pain or resistance, or if you see swelling near your IV site.",
    detail: {
      label: "What is the push-pause method?",
      text: "Push a small amount of fluid, pause briefly, then push again. This pulsing motion creates turbulence inside the line that helps clear it more effectively than a single continuous push.",
    },
    normalFeel: "You may feel a cool sensation or slight pressure — that's normal.",
  },
  {
    id: "a",
    type: "step",
    phase: "med",
    phaseLabel: "A — Administer Medication",
    stepNum: 2,
    title: "Give Your Antibiotic",
    steps: [
      "Scrub the IV luer lock cap with an alcohol pad for 15 seconds. Let it air dry.",
      "Attach the medication syringe to the IV luer lock cap.",
      "Push the medication slowly, over the time indicated in your orders.",
      "Disconnect the medication syringe.",
    ],
    watch: "This is the highest-risk moment. Be alert for shortness of breath, itching, flushing, dizziness, or chest tightness. If any occur — stop immediately and call 911.",
    watchSeverity: "critical",
    detail: {
      label: "How slow is 'slowly'?",
      text: "Your care team will tell you the exact push time (e.g., 'over 3 to 5 minutes'). When in doubt, slower is safer.",
    },
  },
  {
    id: "s2",
    type: "step",
    phase: "saline",
    phaseLabel: "S — Saline Flush",
    stepNum: 3,
    title: "Flush Your Line Again with Saline",
    steps: [
      "Scrub the IV luer lock cap with an alcohol pad for 15 seconds. Let it air dry.",
      "Remove the air bubble from your second saline syringe.",
      "Attach the second saline syringe to the IV luer lock cap.",
      "Gently flush using the push-pause method until the syringe is empty.",
      "Disconnect the saline syringe.",
    ],
  },
  {
    id: "h",
    type: "step",
    phase: "heparin",
    phaseLabel: "H — Heparin Lock",
    stepNum: 4,
    title: "Heparin Flush (If Ordered)",
    conditional: "Only complete this step if your care team has ordered a heparin flush.",
    steps: [
      "Scrub the IV luer lock cap with an alcohol pad for 15 seconds. Let it air dry.",
      "Remove the air bubble from the heparin syringe.",
      "Attach the heparin syringe to the IV luer lock cap.",
      "Gently flush using the push-pause method until the syringe is empty.",
    ],
  },
  {
    id: "cap",
    type: "step",
    phase: "saline",
    phaseLabel: "Final Step",
    stepNum: 5,
    title: "Attach the Disinfecting Cap",
    steps: ["Place a new disinfecting cap on the IV luer lock cap."],
  },
  {
    id: "done",
    type: "complete",
    title: "You're Done!",
    body: "Great work. Dispose of used syringes and alcohol pads according to instructions.",
    reminders: [
      "Store unused medication as directed by your pharmacy.",
      "Note the date and time you gave your dose.",
      "If you notice any delayed reactions, call your care team.",
    ],
  },
];

const phaseColors: Record<string, { color: string; bg: string }> = {
  saline: { color: COLORS.saline, bg: COLORS.salineLight },
  med: { color: COLORS.med, bg: COLORS.medLight },
  heparin: { color: COLORS.heparin, bg: COLORS.heparinLight },
};

// --- Main Component ---

export default function App() {
  const [currentCard, setCurrentCard] = useState(0);
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [heparinNeeded, setHeparinNeeded] = useState<boolean | null>(null);

  const toggleCheck = (cardId: string, idx: number) => {
    const k = `${cardId}-${idx}`;
    setChecks(p => ({ ...p, [k]: !p[k] }));
  };

  const card = cards[currentCard];
  const totalCards = cards.length;

  const next = () => {
    if (currentCard < totalCards - 1) {
      let nextIdx = currentCard + 1;
      if (cards[nextIdx].id === "h" && heparinNeeded === false) nextIdx++;
      setCurrentCard(Math.min(nextIdx, totalCards - 1));
    }
  };
  const prev = () => {
    if (currentCard > 0) {
      let prevIdx = currentCard - 1;
      if (cards[prevIdx].id === "h" && heparinNeeded === false) prevIdx--;
      setCurrentCard(Math.max(prevIdx, 0));
    }
  };

  const progress = (currentCard / (totalCards - 1)) * 100;

  const renderCard = () => {
    switch (card.type) {
      case "welcome":
        return (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: COLORS.textDark, margin: "0 0 14px" }}>{card.title}</h1>
            <p style={{ fontSize: 16, color: COLORS.textMed, lineHeight: 1.6 }}>{card.body}</p>
            <div style={{ background: COLORS.primaryLight, borderRadius: 10, padding: "14px 16px" }}>
              <p style={{ fontSize: 15, color: COLORS.primary, fontWeight: 500, margin: 0 }}>{card.reassure}</p>
            </div>
            <EmergencyBanner />
          </div>
        );

      case "checklist":
        return (
          <div>
            <h2 style={{ fontSize: 21, fontWeight: 700 }}>{card.title}</h2>
            <p style={{ fontSize: 14, color: COLORS.textMed }}>{card.intro}</p>
            {card.items?.map((item, i) => (
              <CheckItem
                key={i}
                text={item.t}
                sub={item.s}
                checked={!!checks[`${card.id}-${i}`]}
                onToggle={() => toggleCheck(card.id, i)}
              />
            ))}
            {card.warning && (
              <div style={{ background: COLORS.emergencyLight, border: `1px solid ${COLORS.emergencyBorder}`, padding: 12, borderRadius: 10, marginTop: 15 }}>
                <p style={{ color: COLORS.emergency, margin: 0, fontSize: 13 }}>{card.warning}</p>
              </div>
            )}
          </div>
        );

      case "info":
        return (
          <div>
            <h2 style={{ fontSize: 21, fontWeight: 700 }}>{card.title}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 15 }}>
              {[
                { l: "S", t: "Saline", c: COLORS.saline },
                { l: "A", t: "Administer", c: COLORS.med },
                { l: "S", t: "Saline", c: COLORS.saline },
                { l: "H", t: "Heparin", c: COLORS.heparin },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: 10, background: s.c + "10", borderRadius: 8 }}>
                  <b style={{ color: s.c, fontSize: 20 }}>{s.l}</b>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{s.t}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20 }}>
              <p style={{ fontSize: 14, fontWeight: 600 }}>Does your plan include heparin?</p>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setHeparinNeeded(true)} style={{ flex: 1, padding: 10, borderRadius: 8, background: heparinNeeded === true ? COLORS.primaryLight : "#fff" }}>Yes</button>
                <button onClick={() => setHeparinNeeded(false)} style={{ flex: 1, padding: 10, borderRadius: 8, background: heparinNeeded === false ? COLORS.primaryLight : "#fff" }}>No</button>
              </div>
            </div>
          </div>
        );

      case "step":
        const pc = phaseColors[card.phase || "saline"];
        return (
          <div>
            <StepBadge color={pc.color} label={card.phaseLabel || ""} />
            <h2 style={{ fontSize: 21, fontWeight: 700, marginTop: 10 }}>{card.title}</h2>
            <ol style={{ paddingLeft: 20 }}>
              {card.steps?.map((s, i) => (
                <li key={i} style={{ marginBottom: 8, fontSize: 15 }}>{s}</li>
              ))}
            </ol>
            
            {/* Using the DetailToggle here fixes the TS6133 error */}
            {card.detail && (
              <DetailToggle label={card.detail.label}>
                {card.detail.text}
              </DetailToggle>
            )}

            {card.watch && (
              <div style={{ 
                background: card.watchSeverity === 'critical' ? COLORS.emergencyLight : '#fffbe6', 
                padding: 10, 
                borderRadius: 8,
                marginTop: 15 
              }}>
                <small style={{ color: card.watchSeverity === 'critical' ? COLORS.emergency : '#856404', fontWeight: 600 }}>
                   {card.watchSeverity === 'critical' ? "🚨 " : "⚠️ "}{card.watch}
                </small>
              </div>
            )}
          </div>
        );

      case "complete":
        return (
          <div style={{ textAlign: "center" }}>
            <h2>{card.title}</h2>
            <p>{card.body}</p>
            <ul style={{ textAlign: "left" }}>
              {card.reminders?.map((r, i) => <li key={i} style={{ fontSize: 14, marginBottom: 5 }}>{r}</li>)}
            </ul>
            <button onClick={() => { setCurrentCard(0); setChecks({}); }} style={{ padding: "10px 20px", marginTop: 20 }}>Start Over</button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 480 }}>
        <div style={{ height: 4, background: COLORS.border, borderRadius: 4 }}>
          <div style={{ height: "100%", width: `${progress}%`, background: COLORS.primary, transition: "0.4s" }} />
        </div>
        <div style={{ textAlign: "center", fontSize: 12, marginTop: 8 }}>{currentCard + 1} of {totalCards}</div>
      </div>

      <div style={{ background: "#fff", borderRadius: 16, padding: 24, maxWidth: 480, width: "100%", marginTop: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
        {renderCard()}
      </div>

      <div style={{ display: "flex", gap: 12, width: "100%", maxWidth: 480, marginTop: 20 }}>
        <button onClick={prev} disabled={currentCard === 0} style={{ flex: 1, padding: 14, borderRadius: 10 }}>Back</button>
        <button onClick={next} disabled={currentCard === totalCards - 1} style={{ flex: 2, padding: 14, borderRadius: 10, background: COLORS.primary, color: "#fff" }}>Continue</button>
      </div>
    </div>
  );
}