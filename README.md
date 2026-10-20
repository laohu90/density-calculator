# Density Calculator (ρ = m/V) · 密度计算器与常用物质密度表

> 🔬 **Interactive Physics Calculator & Material Density Database** · Solve for density $\rho$, mass $m$, or volume $V$ ($\rho = m/V$) · Built-in 30+ scientifically verified substance densities (Iron, Aluminum, Copper, Water, Alcohol, Gold, etc.) · Automatic SI unit conversion · Archimedes buoyancy & equilibrium simulation · Multi-component alloy density · Classic physics problem solvers · Fully bilingual (English / 中文).

![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-7.0-blue)
![Vite](https://img.shields.io/badge/Vite-8.3-646CFF)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🌟 Key Features (核心特色与功能)

In STEM education and engineering practice, **$\rho = m/V$ is the fundamental bridge connecting an object's mass with its geometric volume**. 

This web application delivers a clean, resilient, and professional calculation platform designed for students, teachers, researchers, and engineers:

### 1. Three-Way Variable Solving ($\rho = m/V, m = \rho \cdot V, V = m/\rho$)
- **Solve for Density**: $\rho = m / V$
- **Solve for Mass**: $m = \rho \times V$
- **Solve for Volume**: $V = m / \rho$
- **Full Physics Derivation Output**: Formats steps (Given $\to$ Unit Normalization $\to$ Formula $\to$ Substitution $\to$ SI Results) with **One-Click Copy**.
- **Adjustable Significant Figures**: Choose between 2, 3, 4, or 6 decimal places.
- **Division-by-Zero Protection**: Input validation prevents zero or negative volume errors.

### 2. Automatic SI & Engineering Unit Conversions
- **Density Units**: $\text{g/cm}^3$, $\text{kg/m}^3$ (SI Base), $\text{g/mL}$, $\text{kg/L}$, $\text{lb/ft}^3$, $\text{lb/in}^3$.
  - Conversion rule: $1\text{ g/cm}^3 = 1,000\text{ kg/m}^3 = 1\text{ g/mL} = 1\text{ kg/L} \approx 62.428\text{ lb/ft}^3$.
- **Mass Units**: $\text{g}$, $\text{kg}$ (SI Base), $\text{mg}$, $\text{t}$ (metric ton), $\text{lb}$, $\text{oz}$.
- **Volume Units**: $\text{cm}^3$, $\text{m}^3$ (SI Base), $\text{dm}^3$, $\text{L}$, $\text{mL}$, $\text{mm}^3$, $\text{ft}^3$, $\text{in}^3$, $\text{gal}$ (US).

### 3. Scientific Material Density Database (30+ Substances)
- **Metals & Alloys**: Gold ($19.32\text{ g/cm}^3$), Platinum ($21.45$), Lead ($11.34$), Silver ($10.49$), Copper ($8.96$), Brass ($8.50$), Iron/Steel ($7.87$), Stainless Steel 304 ($7.93$), Cast Iron ($7.20$), Titanium ($4.51$), Aluminum ($2.70$), Magnesium ($1.74$).
- **Non-metals & Daily Materials**: Diamond ($3.51$), Granite ($2.70$), Glass ($2.50$), Concrete ($2.40$), Ice ($0.917$ at 0°C), Paraffin ($0.90$), PE Plastic ($0.95$), PTFE ($2.20$), Oak Wood ($0.75$), Cork ($0.24$), Silica Aerogel ($0.003$).
- **Liquids**: Mercury ($13.60$), Honey ($1.42$), Glycerin ($1.26$), Milk ($1.03$), Seawater ($1.025$), Pure Water ($1.000$ at 4°C), Vegetable Oil ($0.92$), Diesel ($0.83$), Alcohol/Ethanol ($0.789$), Gasoline ($0.74$).
- **Gases (0°C, 101.3 kPa)**: $\text{CO}_2$ ($1.977\text{ kg/m}^3$), Oxygen ($1.429$), Nitrogen ($1.251$), Air ($1.293$), Methane ($0.717$), Helium ($0.179$), Hydrogen ($0.0899$).
- **Search & Custom Data**: Bilingual search by chemical formula (Fe, Al, Au, H2O) or name. Custom materials persist safely in `localStorage`.

### 4. Archimedes Buoyancy Simulation
- **Forces**:
  - Downward gravity $G = m g = \rho_{obj} V_{obj} g$
  - Upward buoyancy $F_b = \rho_{fluid} g V_{disp}$
- **Equilibrium States**:
  - **Floating** ($\rho_{obj} < \rho_{fluid}$): $F_b = G$, submersion fraction $V_{disp}/V = \rho_{obj}/\rho_{fluid}$.
  - **Suspended** ($\rho_{obj} = \rho_{fluid}$): Neutral buoyancy at any depth.
  - **Sunk** ($\rho_{obj} > \rho_{fluid}$): Container bottom provides normal support force $F_n = G - F_b$.
- **Interactive SVG Visualizer**: Real-time water displacement and force vector arrows.

### 5. Multi-Component Mixture & Alloy Calculator
- Formula: $\rho_{mix} = \frac{m_1 + m_2 + \dots + m_n}{V_1 + V_2 + \dots + V_n}$.
- Prevents the common student trap of taking the arithmetic average $(\rho_1 + \rho_2)/2$.
- Pre-sets: 18K Gold Purity, Alcohol-Water solution, Saline seed selection.

### 6. Classic Physics Problem Solvers
- **Archimedes Crown**: Checks gold purity and calculates adulterated silver mass.
- **Hollow vs Solid Casting**: Computes hollow cavity volume and water-filled weight.
- **Displacement Method**: Graduated cylinder $\Delta V = V_2 - V_1$ density measurement.
- **Ice Melting Water Level**: Rigorous mathematical proof for water and dense brine.

### 7. Google SEO & Structured Data (Schema.org)
- Integrated `WebApplication` and `FAQPage` JSON-LD schemas.
- Rich search engine snippets for Google Search "People Also Ask" queries.
- Clean semantic HTML structure.

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Production build
npm run build
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
