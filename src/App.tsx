import { useState } from "react";

const codeLines = [
  { section: "IMPORTS", color: "#7c3aed", lines: [
    "import tensorflow as tf",
    "from tensorflow.keras.models import Sequential",
    "from tensorflow.keras.layers import (",
    "    Conv2D, MaxPooling2D, Flatten, Dense,",
    "    Dropout, BatchNormalization",
    ")",
    "from tensorflow.keras.preprocessing.image import ImageDataGenerator",
    "from tensorflow.keras.callbacks import (",
    "    EarlyStopping, ModelCheckpoint, ReduceLROnPlateau",
    ")",
    "from sklearn.model_selection import train_test_split",
    "from sklearn.metrics import classification_report, confusion_matrix",
    "import numpy as np",
    "import pandas as pd",
    "import os, json",
  ]},
  { section: "CONFIG", color: "#0891b2", lines: [
    'DATA_DIR = "/data/labeled_documents/"',
    'CATEGORIES = ["referral", "lab_result", "insurance_card",',
    '              "clinical_notes", "prior_auth_form"]',
    "IMG_SIZE = (224, 224)",
    "BATCH_SIZE = 32",
    "EPOCHS = 50",
    "LEARNING_RATE = 0.001",
  ]},
  { section: "DATA PIPELINE", color: "#059669", lines: [
    "train_datagen = ImageDataGenerator(",
    "    rescale=1./255,",
    "    rotation_range=15,",
    "    width_shift_range=0.1,",
    "    height_shift_range=0.1,",
    "    shear_range=0.1,",
    "    zoom_range=0.1,",
    "    fill_mode='nearest',",
    "    validation_split=0.2",
    ")",
    "train_gen = train_datagen.flow_from_directory(",
    "    DATA_DIR, target_size=IMG_SIZE,",
    "    batch_size=BATCH_SIZE,",
    "    class_mode='categorical', subset='training'",
    ")",
    "val_gen = train_datagen.flow_from_directory(",
    "    DATA_DIR, target_size=IMG_SIZE,",
    "    batch_size=BATCH_SIZE,",
    "    class_mode='categorical', subset='validation'",
    ")",
  ]},
  { section: "NEURAL NETWORK", color: "#dc2626", lines: [
    "model = Sequential([",
    "    Conv2D(32, (3,3), activation='relu',",
    "           input_shape=(*IMG_SIZE, 3)),",
    "    BatchNormalization(),",
    "    MaxPooling2D((2, 2)),",
    "    Dropout(0.25),",
    "    Conv2D(64, (3,3), activation='relu'),",
    "    BatchNormalization(),",
    "    MaxPooling2D((2, 2)),",
    "    Dropout(0.25),",
    "    Conv2D(128, (3,3), activation='relu'),",
    "    BatchNormalization(),",
    "    MaxPooling2D((2, 2)),",
    "    Dropout(0.25),",
    "    Flatten(),",
    "    Dense(256, activation='relu'),",
    "    BatchNormalization(),",
    "    Dropout(0.5),",
    "    Dense(5, activation='softmax')",
    "])",
  ]},
  { section: "TRAINING", color: "#d97706", lines: [
    "model.compile(",
    "    optimizer=tf.keras.optimizers.Adam(lr=0.001),",
    "    loss='categorical_crossentropy',",
    "    metrics=['accuracy', tf.keras.metrics.Precision()]",
    ")",
    "callbacks = [",
    "    EarlyStopping(monitor='val_loss', patience=5),",
    "    ModelCheckpoint('best.keras', save_best_only=True),",
    "    ReduceLROnPlateau(factor=0.5, patience=3)",
    "]",
    "history = model.fit(",
    "    train_gen, validation_data=val_gen,",
    "    epochs=50, callbacks=callbacks",
    ")",
  ]},
  { section: "EVALUATE & DEPLOY", color: "#6b7280", lines: [
    "preds = model.predict(val_gen)",
    "print(classification_report(val_gen.classes,",
    "      np.argmax(preds, axis=1),",
    "      target_names=CATEGORIES))",
    "model.save('doc_classifier_v1.keras')",
    "# + deployment, API, monitoring, retraining...",
  ]},
];


const promptText = `You are a document classification specialist 
for a home infusion pharmacy. 

When I provide a document, classify it as:
• Referral
• Lab Result  
• Insurance Card
• Clinical Notes
• Prior Authorization Form

For each document, provide:
1. The classification
2. Confidence level (high/medium/low)
3. Key data extracted (patient name, date, 
   provider, diagnosis if visible)

If unclear or low quality, flag for human 
review rather than guessing.`;

const sectionLabels = {
  IMPORTS: "15 specialized libraries",
  CONFIG: "Hyperparameters & paths",
  "DATA PIPELINE": "Preprocessing & augmentation",
  "NEURAL NETWORK": "Architecture design (layer by layer)",
  TRAINING: "Compile, configure, train (hours-days)",
  "EVALUATE & DEPLOY": "Test, save, deploy, monitor...",
};

const requirements = [
  { icon: "🏷️", label: "2,500+ documents labeled BY HAND (40-160 hrs)" },
  { icon: "🧹", label: "Data cleaning, preprocessing, augmentation" },
  { icon: "👨‍💻", label: "Python developer + ML engineer" },
  { icon: "⚡", label: "GPU hardware ($1-4/hr)" },
  { icon: "📅", label: "Weeks to months of development" },
  { icon: "🔄", label: "Ongoing retraining as data evolves" },
  { icon: "💰", label: "$50,000 - $100,000+" },
  { icon: "🎯", label: "Does ONE thing" },
];

const llmCapabilities = [
  { icon: "✅", label: "Classifies documents" },
  { icon: "✅", label: "Extracts key data" },
  { icon: "✅", label: "Assesses own confidence" },
  { icon: "✅", label: "Escalates to humans when unsure" },
  { icon: "✅", label: "Handles new categories instantly" },
  { icon: "✅", label: "Works in multiple languages" },
];

export default function App() {
  const [view, setView] = useState("side-by-side");

  return (
    <div style={{ fontFamily: "-apple-system, 'Segoe UI', sans-serif", background: "#0a0e1a", minHeight: "100vh", padding: "24px 16px", color: "#e0e0e0" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>Same Task. Different Era.</h1>
        <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>Classifying home infusion pharmacy documents into 5 categories</p>
      </div>

      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 20 }}>
        {[
          { key: "traditional", label: "Traditional ML" },
          { key: "llm", label: "LLM Approach" },
          { key: "side-by-side", label: "Side by Side" },
        ].map(v => (
          <button key={v.key} onClick={() => setView(v.key)} style={{
            padding: "5px 14px", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer",
            border: `1px solid ${view === v.key ? "#10b981" : "#2a3050"}`,
            background: view === v.key ? "#064e3b" : "#111827",
            color: view === v.key ? "#6ee7b7" : "#8892a4",
          }}>{v.label}</button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
        
        {(view === "traditional" || view === "side-by-side") && (
          <div style={{ flex: view === "side-by-side" ? "1 1 48%" : "1 1 90%", maxWidth: 560, minWidth: 300 }}>
            <div style={{ background: "#1a1a2e", borderRadius: 10, border: "1px solid #dc2626", overflow: "hidden" }}>
              <div style={{ background: "#dc262620", padding: "10px 16px", borderBottom: "1px solid #dc262640", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#fca5a5" }}>Traditional ML / Deep Learning</span>
                <span style={{ fontSize: 10, color: "#6b7280", background: "#111", padding: "2px 8px", borderRadius: 4 }}>Python + TensorFlow</span>
              </div>
              <div style={{ padding: "8px 12px", maxHeight: view === "side-by-side" ? 420 : 500, overflowY: "auto", fontSize: 10, lineHeight: 1.5 }}>
                {codeLines.map((section, si) => (
                  <div key={si} style={{ marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: section.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 9, fontWeight: 700, color: section.color, textTransform: "uppercase", letterSpacing: 0.8 }}>
                        {section.section}: {sectionLabels[section.section as keyof typeof sectionLabels]}
                      </span>
                    </div>
                    {section.lines.map((line, li) => (
                      <div key={li} style={{ fontFamily: "'SF Mono', 'Fira Code', monospace", fontSize: 9.5, color: "#94a3b8", paddingLeft: 14, lineHeight: 1.6 }}>
                        {line}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "1px solid #2a2a45", padding: "10px 16px", background: "#12121f" }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#fca5a5", marginBottom: 6 }}>REQUIREMENTS</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {requirements.map((r, i) => (
                    <span key={i} style={{ fontSize: 9, background: "#dc262615", border: "1px solid #dc262630", color: "#fca5a5", padding: "3px 8px", borderRadius: 4 }}>
                      {r.icon} {r.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {(view === "llm" || view === "side-by-side") && (
          <div style={{ flex: view === "side-by-side" ? "1 1 48%" : "1 1 90%", maxWidth: 560, minWidth: 300 }}>
            <div style={{ background: "#1a2e1a", borderRadius: 10, border: "1px solid #10b981", overflow: "hidden" }}>
              <div style={{ background: "#10b98120", padding: "10px 16px", borderBottom: "1px solid #10b98140", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#6ee7b7" }}>LLM Approach</span>
                <span style={{ fontSize: 10, color: "#6b7280", background: "#111", padding: "2px 8px", borderRadius: 4 }}>Natural Language</span>
              </div>
              <div style={{ padding: "16px", minHeight: view === "side-by-side" ? 420 : 300, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ background: "#0a1a0a", borderRadius: 8, padding: "16px", border: "1px solid #10b98130", fontFamily: "-apple-system, sans-serif", fontSize: 12.5, lineHeight: 1.7, color: "#d1fae5", whiteSpace: "pre-wrap" }}>
                  {promptText}
                </div>
                <div style={{ textAlign: "center", marginTop: 16 }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#10b981" }}>15 lines of English</div>
                  <div style={{ fontSize: 11, color: "#6b7280", marginTop: 4 }}>No code. No training data. No GPU. No data scientist.</div>
                </div>
              </div>
              <div style={{ borderTop: "1px solid #1e3a2a", padding: "10px 16px", background: "#0f1f0f" }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#6ee7b7", marginBottom: 6 }}>CAPABILITIES (beyond classification)</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {llmCapabilities.map((c, i) => (
                    <span key={i} style={{ fontSize: 9, background: "#10b98115", border: "1px solid #10b98130", color: "#6ee7b7", padding: "3px 8px", borderRadius: 4 }}>
                      {c.icon} {c.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ textAlign: "center", marginTop: 20 }}>
        <div style={{ display: "inline-flex", gap: 24, background: "#111827", borderRadius: 8, padding: "12px 24px", border: "1px solid #2a3050" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#dc2626" }}>~100</div>
            <div style={{ fontSize: 9, color: "#6b7280" }}>Lines of Python</div>
          </div>
          <div style={{ width: 1, background: "#2a3050" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#6b7280" }}>vs.</div>
          </div>
          <div style={{ width: 1, background: "#2a3050" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#10b981" }}>15</div>
            <div style={{ fontSize: 9, color: "#6b7280" }}>Lines of English</div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 12, fontSize: 10, color: "#374151" }}>
        NHIA 2026 Executive Preconference — "Ready or Not: AI Is Rewriting the Rules of Home Infusion"
      </div>
    </div>
  );
}
