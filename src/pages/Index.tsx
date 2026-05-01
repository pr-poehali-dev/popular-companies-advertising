import { useState } from "react";

const COMPANIES = [
  { id: 1, name: "Яндекс", sector: "IT", color: "#FF0000", abbr: "Я", bg: "#FFCC00" },
  { id: 2, name: "Mail.ru", sector: "IT", color: "#fff", abbr: "M@", bg: "#005FF9" },
  { id: 3, name: "VK", sector: "IT", color: "#fff", abbr: "VK", bg: "#0077FF" },
  { id: 4, name: "1С-Битрикс", sector: "IT", color: "#fff", abbr: "1С", bg: "#E31E24" },
  { id: 5, name: "Газпром", sector: "Энергетика", color: "#fff", abbr: "ГП", bg: "#003087" },
  { id: 6, name: "Лукойл", sector: "Энергетика", color: "#fff", abbr: "ЛК", bg: "#E30613" },
  { id: 7, name: "МРСК", sector: "Энергетика", color: "#fff", abbr: "МР", bg: "#0050A0" },
  { id: 8, name: "РусГидро", sector: "Энергетика", color: "#fff", abbr: "РГ", bg: "#005BAC" },
  { id: 9, name: "Лента", sector: "Ретейл", color: "#fff", abbr: "ЛН", bg: "#D72027" },
  { id: 10, name: "METRO", sector: "Ретейл", color: "#fff", abbr: "ME", bg: "#CC0000" },
  { id: 11, name: "Пятёрочка", sector: "Ретейл", color: "#fff", abbr: "5", bg: "#E30000" },
  { id: 12, name: "Магнит", sector: "Ретейл", color: "#fff", abbr: "МГ", bg: "#D9001B" },
  { id: 13, name: "МТС", sector: "Телеком", color: "#fff", abbr: "МТС", bg: "#CC0000" },
  { id: 14, name: "Ростелеком", sector: "Телеком", color: "#fff", abbr: "РТ", bg: "#005BBB" },
  { id: 15, name: "Билайн", sector: "Телеком", color: "#1a1a1a", abbr: "БЛ", bg: "#FFD200" },
  { id: 16, name: "Мегафон", sector: "Телеком", color: "#fff", abbr: "МГФ", bg: "#00B140" },
  { id: 17, name: "Сбербанк", sector: "Банки", color: "#fff", abbr: "СБ", bg: "#21A038" },
  { id: 18, name: "Альфа-Банк", sector: "Банки", color: "#fff", abbr: "АБ", bg: "#EF3124" },
  { id: 19, name: "Тинькофф", sector: "Банки", color: "#1a1a1a", abbr: "Т", bg: "#FFDD2D" },
  { id: 20, name: "ВТБ", sector: "Банки", color: "#fff", abbr: "ВТБ", bg: "#003791" },
];

const SECTORS = ["Все", "IT", "Энергетика", "Ретейл", "Телеком", "Банки"];

const FORMATS = [
  { id: "leaderboard", label: "Лидерборд", w: 728, h: 90, desc: "728×90" },
  { id: "horizontal", label: "Горизонтальный", w: 970, h: 250, desc: "970×250" },
  { id: "square", label: "Квадрат", w: 600, h: 600, desc: "600×600" },
  { id: "vertical", label: "Вертикальный", w: 300, h: 600, desc: "300×600" },
  { id: "story", label: "Сторис", w: 1080, h: 1920, desc: "1080×1920" },
  { id: "vk_post", label: "VK пост", w: 1200, h: 628, desc: "1200×628" },
];

const HEADLINE_VARIANTS = [
  "Ваше решение выбирают лидеры рынка",
  "Нам доверяют крупнейшие компании России",
  "Партнёры, которые вам доверяют",
  "Проверено ведущими брендами",
];

const CTA_VARIANTS = [
  "Получить предложение",
  "Узнать подробнее",
  "Оставить заявку",
  "Связаться с нами",
];

function LogoBadge({ company, size = "md" }: { company: typeof COMPANIES[0]; size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "w-10 h-10 text-xs",
    md: "w-14 h-14 text-sm",
    lg: "w-20 h-20 text-base",
  };
  return (
    <div
      className={`${sizes[size]} rounded-lg flex items-center justify-center font-bold font-montserrat shadow-md`}
      style={{ backgroundColor: company.bg, color: company.color, flexShrink: 0 }}
      title={company.name}
    >
      {company.abbr}
    </div>
  );
}

function BannerPreview({
  format,
  companies,
  headline,
  cta,
  subtext,
  theme,
}: {
  format: typeof FORMATS[0];
  companies: typeof COMPANIES;
  headline: string;
  cta: string;
  subtext: string;
  theme: "dark" | "light" | "gold";
}) {
  const scale = format.id === "story" ? 0.18 : format.id === "leaderboard" ? 0.75 : 0.45;

  const themes = {
    dark: { bg: "#0D1117", text: "#FFFFFF", accent: "#C9A84C", sub: "#8B9099", ctaBg: "#C9A84C", ctaText: "#0D1117", border: "#2D333B" },
    light: { bg: "#F8F9FB", text: "#0D1117", accent: "#1A3A6B", sub: "#556070", ctaBg: "#1A3A6B", ctaText: "#FFFFFF", border: "#DDE2EA" },
    gold: { bg: "#1A1200", text: "#F5E6A3", accent: "#C9A84C", sub: "#9A8654", ctaBg: "#C9A84C", ctaText: "#1A1200", border: "#4A3A10" },
  };

  const t = themes[theme];
  const displayCompanies = companies.slice(0, format.id === "leaderboard" ? 8 : format.id === "vertical" ? 6 : format.id === "story" ? 12 : 10);

  const isLeaderboard = format.id === "leaderboard";
  const isStory = format.id === "story";
  const isVertical = format.id === "vertical";

  return (
    <div style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: format.w, height: format.h, position: "relative", flexShrink: 0 }}>
      <div
        style={{
          width: format.w,
          height: format.h,
          backgroundColor: t.bg,
          border: `1px solid ${t.border}`,
          display: "flex",
          flexDirection: isLeaderboard ? "row" : isStory || isVertical ? "column" : "column",
          alignItems: "center",
          justifyContent: isLeaderboard ? "space-between" : "center",
          padding: isLeaderboard ? "0 32px" : isStory ? "80px 60px" : "40px",
          gap: isLeaderboard ? 24 : isStory ? 48 : 24,
          fontFamily: "Montserrat, sans-serif",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Декоративная линия */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)`,
        }} />

        {/* Фоновый паттерн */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: `repeating-linear-gradient(45deg, ${t.text} 0px, ${t.text} 1px, transparent 1px, transparent 20px)`,
        }} />

        {/* Текстовый блок */}
        {!isLeaderboard && (
          <div style={{ textAlign: isStory || isVertical ? "center" : "left", zIndex: 1, maxWidth: isStory ? 900 : "100%" }}>
            <div style={{
              fontSize: isStory ? 72 : isVertical ? 22 : format.id === "square" ? 32 : 36,
              fontWeight: 800,
              color: t.text,
              lineHeight: 1.15,
              marginBottom: 12,
              letterSpacing: "-0.02em",
            }}>
              {headline}
            </div>
            <div style={{ fontSize: isStory ? 36 : isVertical ? 14 : 16, color: t.sub, marginBottom: isStory ? 48 : 20, fontWeight: 400, lineHeight: 1.5 }}>
              {subtext}
            </div>
            <div style={{
              display: "inline-block",
              backgroundColor: t.ctaBg,
              color: t.ctaText,
              padding: isStory ? "28px 80px" : "12px 28px",
              borderRadius: 4,
              fontWeight: 700,
              fontSize: isStory ? 40 : 14,
              letterSpacing: "0.03em",
              textTransform: "uppercase",
            }}>
              {cta}
            </div>
          </div>
        )}

        {/* Логотипы */}
        <div style={{
          display: "flex",
          flexDirection: isLeaderboard ? "row" : isStory || isVertical ? "row" : "row",
          flexWrap: isLeaderboard ? "nowrap" : "wrap",
          gap: isStory ? 24 : 10,
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}>
          {displayCompanies.map((c) => (
            <div
              key={c.id}
              style={{
                width: isStory ? 100 : isLeaderboard ? 52 : isVertical ? 44 : 52,
                height: isStory ? 100 : isLeaderboard ? 52 : isVertical ? 44 : 52,
                borderRadius: 8,
                backgroundColor: c.bg,
                color: c.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: isStory ? 28 : isLeaderboard ? 12 : 14,
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}
            >
              {c.abbr}
            </div>
          ))}
        </div>

        {/* Для лидерборда — текст справа */}
        {isLeaderboard && (
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.text, whiteSpace: "nowrap" }}>{headline}</div>
            </div>
            <div style={{
              backgroundColor: t.ctaBg, color: t.ctaText,
              padding: "10px 20px", borderRadius: 4, fontWeight: 700,
              fontSize: 12, whiteSpace: "nowrap", textTransform: "uppercase", letterSpacing: "0.05em",
            }}>
              {cta}
            </div>
          </div>
        )}

        {/* Нижняя линия */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)`,
        }} />
      </div>
    </div>
  );
}

const Index = () => {
  const [selectedSector, setSelectedSector] = useState("Все");
  const [selectedFormat, setSelectedFormat] = useState("horizontal");
  const [headline, setHeadline] = useState(HEADLINE_VARIANTS[0]);
  const [cta, setCta] = useState(CTA_VARIANTS[0]);
  const [subtext, setSubtext] = useState("Более 20 ведущих компаний России уже с нами");
  const [theme, setTheme] = useState<"dark" | "light" | "gold">("dark");

  const filteredCompanies = selectedSector === "Все"
    ? COMPANIES
    : COMPANIES.filter((c) => c.sector === selectedSector);

  const format = FORMATS.find((f) => f.id === selectedFormat)!;
  const previewScale = format.id === "story" ? 0.18 : format.id === "leaderboard" ? 0.75 : 0.45;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0C10", fontFamily: "IBM Plex Sans, sans-serif" }}>

      {/* Header */}
      <header style={{ borderBottom: "1px solid #1E2329", backgroundColor: "#0D1117" }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <div className="font-montserrat font-black text-white text-xl tracking-tight">
              BANNER<span style={{ color: "#C9A84C" }}>STUDIO</span>
            </div>
            <div className="text-xs mt-0.5" style={{ color: "#556070" }}>Рекламные баннеры с логотипами партнёров</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs font-medium px-3 py-1.5 rounded" style={{ backgroundColor: "#1A2035", color: "#C9A84C", border: "1px solid #2D3748" }}>
              {COMPANIES.length} компаний
            </div>
            <div className="text-xs font-medium px-3 py-1.5 rounded" style={{ backgroundColor: "#1A2035", color: "#8B9099", border: "1px solid #2D3748" }}>
              {FORMATS.length} форматов
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">

          {/* Левая панель — настройки */}
          <div className="col-span-12 lg:col-span-4 space-y-6">

            {/* Тема */}
            <div style={{ backgroundColor: "#0D1117", border: "1px solid #1E2329", borderRadius: 8 }} className="p-5">
              <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#556070" }}>Тема оформления</div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "dark", label: "Тёмная", preview: "#0D1117" },
                  { id: "light", label: "Светлая", preview: "#F8F9FB" },
                  { id: "gold", label: "Золото", preview: "#1A1200" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id as "dark" | "light" | "gold")}
                    className="relative p-3 rounded-md text-xs font-semibold transition-all"
                    style={{
                      backgroundColor: t.preview,
                      border: `2px solid ${theme === t.id ? "#C9A84C" : "#2D333B"}`,
                      color: t.id === "light" ? "#0D1117" : "#E8D5A3",
                    }}
                  >
                    {t.label}
                    {theme === t.id && (
                      <div style={{
                        position: "absolute", top: 4, right: 4,
                        width: 6, height: 6, borderRadius: "50%", backgroundColor: "#C9A84C"
                      }} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Формат */}
            <div style={{ backgroundColor: "#0D1117", border: "1px solid #1E2329", borderRadius: 8 }} className="p-5">
              <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#556070" }}>Формат баннера</div>
              <div className="space-y-1.5">
                {FORMATS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFormat(f.id)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm transition-all"
                    style={{
                      backgroundColor: selectedFormat === f.id ? "#1A2035" : "transparent",
                      border: `1px solid ${selectedFormat === f.id ? "#C9A84C" : "#1E2329"}`,
                      color: selectedFormat === f.id ? "#C9A84C" : "#8B9099",
                    }}
                  >
                    <span className="font-medium">{f.label}</span>
                    <span className="text-xs" style={{ color: "#445060" }}>{f.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Заголовок */}
            <div style={{ backgroundColor: "#0D1117", border: "1px solid #1E2329", borderRadius: 8 }} className="p-5">
              <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#556070" }}>Заголовок баннера</div>
              <div className="space-y-1.5 mb-3">
                {HEADLINE_VARIANTS.map((h) => (
                  <button
                    key={h}
                    onClick={() => setHeadline(h)}
                    className="w-full text-left px-3 py-2 rounded-md text-sm transition-all"
                    style={{
                      backgroundColor: headline === h ? "#1A2035" : "transparent",
                      border: `1px solid ${headline === h ? "#C9A84C" : "#1E2329"}`,
                      color: headline === h ? "#FFFFFF" : "#8B9099",
                    }}
                  >
                    {h}
                  </button>
                ))}
              </div>
              <input
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full px-3 py-2 rounded-md text-sm outline-none"
                style={{ backgroundColor: "#1A1F2B", border: "1px solid #2D333B", color: "#FFFFFF" }}
                placeholder="Свой заголовок..."
              />
            </div>

            {/* Подзаголовок */}
            <div style={{ backgroundColor: "#0D1117", border: "1px solid #1E2329", borderRadius: 8 }} className="p-5">
              <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#556070" }}>Подзаголовок</div>
              <input
                value={subtext}
                onChange={(e) => setSubtext(e.target.value)}
                className="w-full px-3 py-2 rounded-md text-sm outline-none"
                style={{ backgroundColor: "#1A1F2B", border: "1px solid #2D333B", color: "#FFFFFF" }}
              />
            </div>

            {/* CTA */}
            <div style={{ backgroundColor: "#0D1117", border: "1px solid #1E2329", borderRadius: 8 }} className="p-5">
              <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#556070" }}>Кнопка призыва к действию</div>
              <div className="grid grid-cols-2 gap-1.5 mb-3">
                {CTA_VARIANTS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCta(c)}
                    className="px-2 py-2 rounded-md text-xs font-medium transition-all"
                    style={{
                      backgroundColor: cta === c ? "#1A2035" : "transparent",
                      border: `1px solid ${cta === c ? "#C9A84C" : "#1E2329"}`,
                      color: cta === c ? "#C9A84C" : "#8B9099",
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <input
                value={cta}
                onChange={(e) => setCta(e.target.value)}
                className="w-full px-3 py-2 rounded-md text-sm outline-none"
                style={{ backgroundColor: "#1A1F2B", border: "1px solid #2D333B", color: "#FFFFFF" }}
                placeholder="Свой текст кнопки..."
              />
            </div>
          </div>

          {/* Правая панель — превью */}
          <div className="col-span-12 lg:col-span-8 space-y-6">

            {/* Превью баннера */}
            <div style={{ backgroundColor: "#0D1117", border: "1px solid #1E2329", borderRadius: 8 }} className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-sm font-semibold text-white font-montserrat">{format.label}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#556070" }}>{format.desc} пикселей</div>
                </div>
                <div className="text-xs px-3 py-1.5 rounded font-medium" style={{ backgroundColor: "#1A2035", color: "#C9A84C", border: "1px solid #2D3748" }}>
                  Масштаб {Math.round(previewScale * 100)}%
                </div>
              </div>

              <div style={{
                backgroundColor: "#060810",
                border: "1px solid #1E2329",
                borderRadius: 6,
                padding: 24,
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                minHeight: 200,
                overflow: "hidden",
              }}>
                <div style={{
                  width: format.w * previewScale,
                  height: format.h * previewScale,
                  position: "relative",
                  flexShrink: 0,
                }}>
                  <BannerPreview
                    format={format}
                    companies={filteredCompanies}
                    headline={headline}
                    cta={cta}
                    subtext={subtext}
                    theme={theme}
                  />
                </div>
              </div>
            </div>

            {/* Фильтр и компании */}
            <div style={{ backgroundColor: "#0D1117", border: "1px solid #1E2329", borderRadius: 8 }} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold text-white font-montserrat">Компании в баннере</div>
                <div className="text-xs" style={{ color: "#556070" }}>{filteredCompanies.length} из {COMPANIES.length}</div>
              </div>

              {/* Фильтр по сектору */}
              <div className="flex flex-wrap gap-2 mb-5">
                {SECTORS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSector(s)}
                    className="px-3 py-1.5 rounded text-xs font-medium transition-all"
                    style={{
                      backgroundColor: selectedSector === s ? "#C9A84C" : "#1A1F2B",
                      color: selectedSector === s ? "#0D1117" : "#8B9099",
                      border: `1px solid ${selectedSector === s ? "#C9A84C" : "#2D333B"}`,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Сетка компаний */}
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-3">
                {filteredCompanies.map((c) => (
                  <div key={c.id} className="flex flex-col items-center gap-2">
                    <div
                      style={{
                        width: 52, height: 52, borderRadius: 10,
                        backgroundColor: c.bg, color: c.color,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 800, fontSize: 13,
                        fontFamily: "Montserrat, sans-serif",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
                      }}
                    >
                      {c.abbr}
                    </div>
                    <div className="text-center" style={{ color: "#8B9099", fontSize: 10, lineHeight: 1.2 }}>{c.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Все форматы — мини-превью */}
            <div style={{ backgroundColor: "#0D1117", border: "1px solid #1E2329", borderRadius: 8 }} className="p-6">
              <div className="text-sm font-semibold text-white font-montserrat mb-5">Все форматы</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {FORMATS.map((f) => {
                  const sc = f.id === "story" ? 0.09 : f.id === "leaderboard" ? 0.35 : f.id === "vk_post" ? 0.22 : f.id === "vertical" ? 0.2 : 0.22;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFormat(f.id)}
                      className="flex flex-col items-center gap-3 p-4 rounded-lg transition-all"
                      style={{
                        border: `1px solid ${selectedFormat === f.id ? "#C9A84C" : "#1E2329"}`,
                        backgroundColor: selectedFormat === f.id ? "#1A2035" : "transparent",
                      }}
                    >
                      <div style={{ width: f.w * sc, height: f.h * sc, position: "relative", flexShrink: 0, maxWidth: 220 }}>
                        <BannerPreview
                          format={f}
                          companies={filteredCompanies}
                          headline={headline}
                          cta={cta}
                          subtext={subtext}
                          theme={theme}
                        />
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-semibold" style={{ color: selectedFormat === f.id ? "#C9A84C" : "#FFFFFF" }}>{f.label}</div>
                        <div className="text-xs mt-0.5" style={{ color: "#445060" }}>{f.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;