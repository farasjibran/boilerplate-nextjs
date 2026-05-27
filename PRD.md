# PRD — Boilerplate Next.js untuk AI Coding Agent

## 1. Ringkasan

Dokumen ini mendefinisikan Product Requirements Document (PRD) untuk pembuatan **boilerplate Next.js** yang secara khusus dirancang agar **ramah, konsisten, dan efektif untuk AI coding agent** seperti Claude, GPT, Codex, Cursor Agent, Cline, Aider, dan agent sejenis.

Tujuan utama boilerplate ini bukan hanya mempercepat development manusia, tetapi juga:
- memudahkan AI memahami struktur proyek,
- mengurangi ambiguitas saat AI membaca/mengedit kode,
- meningkatkan keberhasilan autonomous code generation,
- mempermudah validasi hasil kerja AI,
- menjaga kualitas, keamanan, dan maintainability.

Fase awal fokus pada **Next.js** sebagai framework pertama. Boilerplate ini nantinya dapat menjadi fondasi untuk ekspansi ke stack lain.

---

## 2. Latar Belakang

AI coding agent bekerja lebih baik pada codebase yang:
- terstruktur rapi,
- memiliki aturan eksplisit,
- naming konsisten,
- dependency minimal tapi jelas,
- boundary antar-layer tegas,
- test/lint/build dapat dijalankan otomatis,
- dokumentasi operasional tersedia.

Sebaliknya, AI sering gagal pada proyek yang:
- terlalu bebas struktur,
- banyak implicit convention,
- file placement inkonsisten,
- setup lokal rumit,
- environment tidak tervalidasi,
- tidak ada guardrail untuk edit otomatis.

Karena itu, diperlukan boilerplate yang secara sengaja dioptimalkan untuk kolaborasi **human + AI agent**.

---

## 3. Visi Produk

Menyediakan boilerplate Next.js production-grade yang:
1. cepat dipakai developer manusia,
2. mudah dipahami AI agent,
3. aman dimodifikasi otomatis,
4. siap diskalakan untuk aplikasi nyata,
5. memiliki standar operasional yang eksplisit bagi agent.

---

## 4. Tujuan Produk

### 4.1 Tujuan Utama
- Menyediakan starter kit Next.js yang **AI-agent-friendly**.
- Menstandarkan struktur proyek agar perubahan oleh agent lebih prediktif.
- Mengurangi error akibat hallucination struktur/path/API.
- Menyediakan dokumentasi, template, dan rules yang bisa dikonsumsi agent.
- Mempercepat setup project baru untuk tim yang ingin memanfaatkan AI coding agent.

### 4.2 Tujuan Bisnis/Organisasi
- Mengurangi waktu bootstrap proyek baru.
- Meningkatkan konsistensi antar proyek.
- Mengurangi review overhead akibat output agent yang tidak seragam.
- Menjadi baseline internal untuk pengembangan aplikasi modern berbasis Next.js.

### 4.3 Non-Goals
- Bukan low-code/no-code platform.
- Bukan full SaaS generator dengan dashboard UI.
- Bukan boilerplate untuk semua framework pada fase awal.
- Tidak menargetkan semua use case enterprise kompleks di v1.
- Tidak membangun AI agent itu sendiri; fokus pada codebase yang optimal untuk agent.

---

## 5. Persona Pengguna

### 5.1 Primary Persona — AI-Augmented Developer
Developer yang rutin memakai AI coding agent untuk membuat fitur, refactor, testing, docs, dan debugging.

**Kebutuhan:**
- proyek mudah dipahami agent,
- ada perintah baku untuk lint/test/build,
- ada dokumentasi struktur,
- ada aturan coding yang eksplisit.

### 5.2 Secondary Persona — Tech Lead / Engineering Manager
Ingin tim memakai AI agent tanpa codebase menjadi berantakan.

**Kebutuhan:**
- standardization,
- governance,
- reviewability,
- maintainability,
- onboarding cepat.

### 5.3 Tertiary Persona — Solo Founder / Indie Hacker
Butuh starter project yang cepat, modern, dan compatible dengan AI untuk iterasi produk.

**Kebutuhan:**
- setup cepat,
- opini yang masuk akal,
- friction minim,
- dokumentasi jelas.

---

## 6. Problem Statement

"Tim/developer yang menggunakan AI coding agent sering mengalami output yang inkonsisten, struktur file berantakan, edit lintas layer yang salah, konfigurasi tidak sinkron, dan sulit memvalidasi perubahan karena codebase tidak didesain untuk dibaca/dimodifikasi AI." 

Boilerplate ini harus menyelesaikan problem tersebut dengan menyediakan:
- struktur proyek yang deterministic,
- rules operasional untuk agent,
- validasi otomatis,
- boundary coding yang eksplisit,
- dokumentasi machine-readable dan human-readable.

---

## 7. Scope Produk

## 7.1 In Scope — v1 (Next.js Boilerplate)
- Next.js App Router
- TypeScript
- ESLint + Prettier
- Testing setup dasar
- Struktur folder opinionated
- Konvensi server/client component yang jelas
- Env management
- API layer conventions
- Data fetching conventions
- UI/component architecture
- Form handling convention
- Error/loading/empty state convention
- Documentation for AI agents
- AI-specific repository instructions
- Scripts untuk verify project health
- Example feature/module
- CI validation baseline
- Optional database-ready abstraction (minimal)

## 7.2 Out of Scope — v1
- Multi-framework monorepo
- Native mobile boilerplate
- Full auth provider integration untuk semua vendor
- Multi-tenant enterprise architecture lengkap
- Complex event-driven microservices
- Full visual builder

---

## 8. Prinsip Produk

1. **Explicit over implicit**
   - Semua convention utama harus tertulis.
2. **Boring over clever**
   - Pilih pendekatan umum, mudah dipahami AI.
3. **Deterministic structure**
   - Penempatan file harus mudah ditebak.
4. **Low-ambiguity naming**
   - Nama folder/file/fungsi harus deskriptif.
5. **Fast verification**
   - Perubahan harus mudah diverifikasi lewat script.
6. **Minimal but extensible**
   - Boilerplate ringan tapi siap dikembangkan.
7. **Agent-operable**
   - AI bisa menjalankan task umum tanpa banyak bertanya.
8. **Safe defaults**
   - Konfigurasi awal aman untuk production-minded development.

---

## 9. Requirement Fungsional

## 9.1 Project Initialization
Boilerplate harus menyediakan cara inisialisasi yang sederhana.

**Requirement:**
- User dapat clone/copy/generate proyek dan langsung menjalankan instalasi.
- Tersedia `README.md` dengan langkah setup lokal.
- Tersedia `.env.example` yang lengkap.
- Tersedia script validasi environment.

**Acceptance Criteria:**
- Developer baru dapat menjalankan proyek < 15 menit.
- Tidak ada secret hardcoded.
- Environment wajib terdokumentasi.

---

## 9.2 Framework & Language Baseline

**Requirement:**
- Menggunakan Next.js versi stabil terbaru yang relevan saat implementasi.
- Menggunakan TypeScript strict mode.
- App Router sebagai default.
- Server Components sebagai default, Client Components hanya bila perlu.

**Acceptance Criteria:**
- `npm run typecheck` lolos pada fresh install.
- Tidak ada penggunaan `any` tanpa justifikasi.
- Boundary server/client terdokumentasi.

---

## 9.3 Struktur Folder yang AI-Friendly

**Requirement:**
Struktur direktori harus konsisten dan mudah diprediksi.

**Contoh target structure:**
```text
src/
  app/
    (marketing)/
    (dashboard)/
    api/
  components/
    ui/
    shared/
    feature/
  features/
    <feature-name>/
      components/
      actions/
      queries/
      schemas/
      types/
      utils/
      __tests__/
  lib/
    env/
    fetchers/
    utils/
    constants/
    errors/
  services/
  hooks/
  styles/
  types/
  tests/
  docs/
```

**Acceptance Criteria:**
- Feature placement bisa ditebak tanpa browsing banyak file.
- AI agent dapat menambah feature baru mengikuti pola yang sama.
- Shared vs feature-local code dibedakan jelas.

---

## 9.4 Konvensi Modul/Fitur

**Requirement:**
Setiap feature harus punya template struktur internal.

**Isi minimal feature:**
- `components/`
- `queries/` untuk read operations
- `actions/` untuk mutations/server actions
- `schemas/` untuk validation
- `types/` untuk type lokal feature
- `utils/` bila perlu
- `__tests__/`

**Acceptance Criteria:**
- 1 feature contoh tersedia.
- Dokumentasi menjelaskan kapan menaruh kode di `features/` vs `components/shared/` vs `lib/`.

---

## 9.5 Routing Convention

**Requirement:**
- Menggunakan App Router.
- Route groups boleh dipakai untuk domain separation.
- Setiap route penting memiliki `loading.tsx`, `error.tsx`, `not-found.tsx` bila relevan.
- Metadata convention terdokumentasi.

**Acceptance Criteria:**
- Pattern route server-rendered vs interactive jelas.
- Contoh route publik dan route internal tersedia.

---

## 9.6 Data Fetching Convention

**Requirement:**
- Menetapkan kapan memakai server-side fetching, client-side fetching, dan server actions.
- Fetch wrapper standar tersedia.
- Error normalization tersedia.
- Caching/revalidation pattern dasar tersedia.

**Acceptance Criteria:**
- Ada util fetch standar.
- Ada guideline `fetch in Server Component by default`.
- Ada contoh `revalidatePath`/`revalidateTag` bila dipakai.

---

## 9.7 API Layer / Backend Interaction Convention

**Requirement:**
- Menyediakan pola untuk integrasi API internal/eksternal.
- Request/response typing jelas.
- Validation schema wajib untuk input penting.
- Error shape standar.

**Acceptance Criteria:**
- Ada contoh endpoint `src/app/api/...`.
- Ada schema validation dengan Zod atau setara.
- Error message aman, tidak membocorkan detail sensitif.

---

## 9.8 Form Handling Convention

**Requirement:**
- Menentukan library form default.
- Menentukan validation default.
- Menentukan pattern submit state, error state, success state.

**Recommended baseline:**
- React Hook Form
- Zod

**Acceptance Criteria:**
- Ada form contoh.
- Error mapping dari schema ke UI konsisten.
- Field component reusable tersedia.

---

## 9.9 UI Component System

**Requirement:**
- Menyediakan baseline design system ringan.
- Komponen dibagi ke `ui`, `shared`, dan `feature`.
- Accessibility baseline diterapkan.
- Styling strategy tunggal ditetapkan.

**Recommended baseline:**
- Tailwind CSS
- Utility helper `cn()`
- Optional shadcn/ui-compatible pattern

**Acceptance Criteria:**
- Button, Input, Card, EmptyState, ErrorState tersedia.
- Class naming/helper konsisten.
- Komponen reusable mudah dipahami agent.

---

## 9.10 State Management Convention

**Requirement:**
- Menentukan state strategy default.
- Prioritaskan local state/server state sebelum global state.
- Global state library hanya bila justified.

**Recommended baseline:**
- React state/context default
- TanStack Query optional jika use case perlu
- Zustand optional, bukan default wajib

**Acceptance Criteria:**
- Decision tree penggunaan state terdokumentasi.
- Tidak ada global state berlebihan pada boilerplate dasar.

---

## 9.11 Authentication Readiness

**Requirement:**
- Belum perlu full auth implementation multi-provider.
- Namun struktur harus siap diintegrasikan.
- Protected route convention terdokumentasi.

**Acceptance Criteria:**
- Ada folder/pattern untuk auth integration.
- Ada docs cara menambahkan NextAuth/Auth.js/Clerk/Supabase Auth nanti.

---

## 9.12 Environment & Config Management

**Requirement:**
- `.env.example` wajib.
- Env parsing/validation wajib.
- Server-only env vs public env dipisah jelas.
- Config constants dipusatkan.

**Acceptance Criteria:**
- Invalid env fail fast saat startup/build.
- Naming env konsisten.
- Ada helper `env` terpusat.

---

## 9.13 Error Handling Convention

**Requirement:**
- Error domain harus konsisten.
- User-facing errors aman.
- Internal errors dapat dilog dengan aman.
- Boundary error Next.js dipakai sesuai kebutuhan.

**Acceptance Criteria:**
- Ada util/custom error baseline.
- Ada komponen UI error state.
- Ada docs “throw vs return error object”.

---

## 9.14 Loading, Empty, Success States

**Requirement:**
- Semua flow utama punya state conventions.
- Skeleton/loading UI tersedia.
- Empty state dan success feedback memiliki pola konsisten.

**Acceptance Criteria:**
- Ada komponen reusable untuk loading/empty/error.
- AI agent punya guideline kapan menggunakan masing-masing.

---

## 9.15 Logging & Observability Readiness

**Requirement:**
- Menyediakan logger abstraction ringan.
- Console usage liar diminimalkan.
- Readiness untuk integrasi Sentry/log provider.

**Acceptance Criteria:**
- Logger wrapper tersedia.
- Environment-based logging behavior terdokumentasi.

---

## 9.16 Testing Baseline

**Requirement:**
- Unit/integration test baseline tersedia.
- E2E optional pada v1, tapi sebaiknya ada placeholder/guideline.
- Test naming dan placement konsisten.

**Recommended baseline:**
- Vitest
- Testing Library
- Playwright optional

**Acceptance Criteria:**
- Ada minimal 1 test unit.
- Ada minimal 1 test component/integration.
- `npm run test` berjalan pada project baru.

---

## 9.17 Code Quality Guardrails

**Requirement:**
- Linting wajib.
- Formatting wajib.
- Type checking wajib.
- Import ordering/unused detection bila relevan.
- CI menjalankan validasi inti.

**Acceptance Criteria:**
- Script minimal:
  - `npm run dev`
  - `npm run build`
  - `npm run lint`
  - `npm run typecheck`
  - `npm run test`
  - `npm run check` (aggregate)
- Fresh repo lolos `npm run check`.

---

## 9.18 AI Agent Documentation

**Requirement:**
Boilerplate harus memiliki file khusus yang membantu AI agent bekerja.

**Dokumen minimum:**
- `README.md`
- `docs/architecture.md`
- `docs/conventions.md`
- `docs/testing.md`
- `docs/feature-template.md`
- `AGENTS.md` atau `CLAUDE.md`/`CURSOR_RULES.md` style equivalent

**Isi AI instructions minimal:**
- struktur repo,
- aturan placement file,
- kapan membuat server/client component,
- aturan validasi,
- aturan testing,
- daftar command verifikasi,
- hal yang tidak boleh dilakukan,
- checklist sebelum membuat PR.

**Acceptance Criteria:**
- AI agent dapat memahami repo tanpa banyak context tambahan.
- Developer dapat copy instruction file untuk agent populer.

---

## 9.19 Example Feature End-to-End

**Requirement:**
Boilerplate harus menyertakan 1 feature contoh yang lengkap namun sederhana.

**Contoh use case:**
- tasks/todo
- feedback form
- bookmarks
- notes

**Feature contoh harus mencakup:**
- route/page
- form
- validation schema
- server action atau API route
- list display
- loading/error/empty states
- tests

**Acceptance Criteria:**
- Feature contoh menjadi referensi canonical untuk AI dan developer.

---

## 9.20 CI/CD Baseline

**Requirement:**
- Menyediakan GitHub Actions atau setara untuk lint/typecheck/test/build.
- Harus sederhana dan mudah dijalankan di repo baru.

**Acceptance Criteria:**
- Workflow CI berjalan tanpa konfigurasi kompleks.
- Failure output cukup jelas untuk AI agent memperbaiki issue.

---

## 9.21 Dependency Policy

**Requirement:**
- Dependency harus seminimal mungkin.
- Setiap dependency inti punya alasan tertulis.
- Hindari dependency overlap.

**Acceptance Criteria:**
- Ada section “Why these libraries”.
- Tidak ada 2 library yang menyelesaikan problem sama tanpa alasan kuat.

---

## 9.22 Template & Scaffolding Readiness

**Requirement:**
- Tersedia template feature/module yang bisa dicopy.
- Bila memungkinkan ada generator script sederhana.

**Acceptance Criteria:**
- `docs/feature-template.md` atau folder template tersedia.
- AI agent dapat membuat feature baru mengikuti template.

---

## 10. Requirement Non-Fungsional

## 10.1 Maintainability
- Kode mudah dibaca.
- Struktur stabil.
- Refactor aman.

## 10.2 Performance
- Tidak menambah dependency berat tanpa alasan.
- Default rendering mengikuti praktik Next.js yang efisien.

## 10.3 Security
- Secret tidak pernah di-commit.
- Input validation wajib.
- Error handling tidak membocorkan detail internal.
- Public vs server env dibedakan ketat.

## 10.4 Developer Experience
- Setup cepat.
- Docs jelas.
- Commands sedikit dan intuitif.

## 10.5 AI Operability
- AI dapat menavigasi repo cepat.
- AI dapat memverifikasi perubahan secara lokal.
- AI dapat menentukan lokasi file baru tanpa ambiguity besar.

## 10.6 Extensibility
- Mudah menambah auth, db, queue, analytics, dsb.

---

## 11. Spesifikasi Teknis yang Direkomendasikan

> Catatan: Ini rekomendasi baseline v1, final stack dapat diputuskan saat implementasi.

### Core
- Next.js
- React
- TypeScript

### Styling
- Tailwind CSS
- `clsx` + `tailwind-merge` atau helper setara

### Validation
- Zod

### Forms
- React Hook Form

### Testing
- Vitest
- Testing Library
- Playwright (optional-ready)

### Lint/Format
- ESLint
- Prettier
- `eslint-config-next`

### Utilities
- `tsx` atau tooling script runner sesuai kebutuhan

### Optional-ready Integrations
- Auth.js / Clerk / Supabase Auth
- Prisma / Drizzle
- TanStack Query
- Sentry

---

## 12. Struktur Dokumen yang Wajib Ada di Repo

### 12.1 README.md
Harus mencakup:
- overview
- tech stack
- getting started
- scripts
- project structure
- how to work with AI agents
- deployment notes

### 12.2 AGENTS.md
Harus mencakup:
- repository rules
- file placement rules
- edit safety rules
- test/lint/typecheck flow
- coding conventions
- forbidden patterns

### 12.3 docs/architecture.md
Harus mencakup:
- app layers
- request flow
- data flow
- feature boundaries

### 12.4 docs/conventions.md
Harus mencakup:
- naming
- imports
- server/client boundaries
- error patterns
- state rules

### 12.5 docs/testing.md
Harus mencakup:
- test strategy
- what to test
- test naming
- commands

### 12.6 docs/feature-template.md
Harus mencakup:
- template folder
- required files
- example implementation steps

---

## 13. User Stories

### 13.1 Untuk Developer
- Sebagai developer, saya ingin membuat project baru dengan setup modern agar bisa langsung fokus ke fitur.
- Sebagai developer, saya ingin AI agent memahami struktur repo agar tidak salah menaruh file.
- Sebagai developer, saya ingin punya command verifikasi standar agar perubahan AI mudah dicek.

### 13.2 Untuk Tech Lead
- Sebagai tech lead, saya ingin tim memakai struktur yang konsisten agar review lebih cepat.
- Sebagai tech lead, saya ingin AI output mengikuti rule repo agar kualitas tetap terjaga.

### 13.3 Untuk AI Agent
- Sebagai AI agent, saya ingin aturan placement file eksplisit agar saya dapat membuat/edit file dengan minim ambiguity.
- Sebagai AI agent, saya ingin command check tunggal agar saya dapat memvalidasi perubahan sebelum menyelesaikan task.

---

## 14. Acceptance Criteria Produk v1

Produk dianggap memenuhi v1 bila:
1. Proyek dapat dijalankan lokal dari clone baru dengan langkah sederhana.
2. Struktur repo jelas, documented, dan konsisten.
3. Ada file instruksi khusus untuk AI agent.
4. Ada minimal 1 feature contoh end-to-end.
5. Ada lint, typecheck, test, build scripts.
6. Ada CI baseline.
7. Ada env validation.
8. Ada docs arsitektur dan conventions.
9. Server/client/component/data-fetching boundaries terdokumentasi.
10. Boilerplate cukup ringan namun realistis untuk dipakai sebagai fondasi aplikasi nyata.

---

## 15. Success Metrics

### 15.1 Product Metrics
- Time-to-first-run < 15 menit.
- Time-to-first-feature berkurang signifikan dibanding setup manual.
- Fresh repo pass rate untuk `npm run check` = 100%.

### 15.2 AI Collaboration Metrics
- AI-generated PR placement accuracy tinggi (file ditempatkan benar).
- Jumlah koreksi manual karena salah struktur turun.
- Jumlah iterasi karena lint/type error dasar turun.

### 15.3 Documentation Metrics
- Developer baru dapat memahami struktur tanpa onboarding verbal panjang.
- Agent dapat menyelesaikan task sederhana hanya dari repo docs.

---

## 16. Risiko & Mitigasi

### Risiko 1 — Terlalu Opinionated
**Dampak:** adopsi turun.
**Mitigasi:** fokus pada opini yang umum, dokumentasikan alasan, sediakan titik extension.

### Risiko 2 — Terlalu Minimal sehingga Tidak Realistis
**Dampak:** boilerplate tidak dipakai pada proyek nyata.
**Mitigasi:** sertakan example feature dan readiness untuk integrasi umum.

### Risiko 3 — Terlalu Banyak Dependency
**Dampak:** maintenance berat, AI bingung memilih path.
**Mitigasi:** dependency policy ketat, 1 problem → 1 default approach.

### Risiko 4 — Instruksi Agent Tidak Cukup Jelas
**Dampak:** AI tetap menghasilkan edit kacau.
**Mitigasi:** buat `AGENTS.md` eksplisit, sertakan do/don’t, checklist verifikasi.

### Risiko 5 — Konvensi Tidak Dipatuhi Seiring Waktu
**Dampak:** repo drift.
**Mitigasi:** lint rules, CI, PR checklist, template docs.

---

## 17. Roadmap Bertahap

## Phase 1 — Core Boilerplate
- Next.js + TypeScript + Tailwind
- Struktur folder
- Lint/format/typecheck/test
- Env validation
- Example feature
- AI docs

## Phase 2 — Production Readiness
- Auth integration template
- Database integration option
- Logging/observability improvements
- Better CI templates

## Phase 3 — Generator/Scaffolding
- CLI generator feature/module
- Preset options (auth/db/query)
- Multi-template variants

## Phase 4 — Framework Expansion
- React Vite variant
- Remix/Nuxt/SvelteKit variant
- Monorepo/Turborepo variant

---

## 18. Keputusan Arsitektur Awal yang Direkomendasikan

1. **Server-first rendering** sebagai default.
2. **Type-safe validation** via Zod.
3. **Feature-based architecture** di atas shared primitives.
4. **Minimal global state**.
5. **Single source of truth** untuk env/config.
6. **Docs-first repo operations** untuk AI compatibility.
7. **Check script tunggal** untuk validasi agent.

---

## 19. Checklist Deliverables Implementasi

### Repo Setup
- [ ] Next.js project initialized
- [ ] TypeScript strict enabled
- [ ] Tailwind configured
- [ ] ESLint + Prettier configured
- [ ] Vitest + Testing Library configured
- [ ] `.env.example` added
- [ ] env validation helper added

### Source Structure
- [ ] `src/app` structured
- [ ] `src/components/ui` added
- [ ] `src/components/shared` added
- [ ] `src/features` added
- [ ] `src/lib` added
- [ ] `src/services` added
- [ ] `src/tests` added

### Documentation
- [ ] `README.md`
- [ ] `AGENTS.md`
- [ ] `docs/architecture.md`
- [ ] `docs/conventions.md`
- [ ] `docs/testing.md`
- [ ] `docs/feature-template.md`

### Example Implementation
- [ ] 1 canonical feature complete
- [ ] loading/error/empty states included
- [ ] tests included

### Scripts & CI
- [ ] `dev`
- [ ] `build`
- [ ] `lint`
- [ ] `typecheck`
- [ ] `test`
- [ ] `check`
- [ ] CI workflow added

---

## 20. Open Questions

1. Apakah boilerplate v1 perlu menyertakan database adapter default?
2. Apakah auth template masuk v1 atau v1.1?
3. Apakah shadcn/ui dijadikan default atau optional-compatible?
4. Apakah TanStack Query perlu included atau documented as optional?
5. Apakah target utama repositori publik, internal starter, atau commercial starter kit?
6. Apakah generator CLI diperlukan sejak awal atau cukup template docs dulu?

---

## 21. Rekomendasi Scope Final v1

Agar v1 kuat namun tetap fokus, berikut rekomendasi baseline implementasi:
- Next.js App Router
- TypeScript strict
- Tailwind CSS
- ESLint + Prettier
- Zod
- React Hook Form
- Vitest + Testing Library
- Env validation
- AI docs lengkap (`AGENTS.md` + docs)
- 1 feature contoh lengkap
- CI baseline

**Tidak wajib di v1:**
- auth penuh,
- ORM/database bawaan,
- TanStack Query default,
- Playwright penuh,
- generator CLI.

---

## 22. Definisi Sukses Akhir

Boilerplate ini sukses jika seorang developer dan AI coding agent dapat:
1. menjalankan repo baru dengan cepat,
2. memahami struktur tanpa kebingungan besar,
3. menambah feature baru mengikuti pola yang sama,
4. memvalidasi perubahan dengan command standar,
5. menjaga kualitas codebase tetap konsisten seiring pertumbuhan proyek.

---

## 23. Lampiran — Rekomendasi Naming & Rules Singkat

### Naming
- file util: `kebab-case.ts`
- component: `PascalCase.tsx`
- hooks: `use-*.ts`
- schema: `*.schema.ts`
- types: `*.types.ts`
- server action: `*.action.ts`
- queries: `*.query.ts`

### Rules
- Default ke Server Component.
- Tambahkan `"use client"` hanya jika perlu interaktivitas/browser API.
- Validation schema dekat dengan feature.
- Shared UI generic di `components/ui`.
- Feature-specific component jangan naik ke shared terlalu cepat.
- Semua perubahan penting harus lolos `npm run check`.

---

## 24. Penutup

PRD ini menjadi baseline untuk implementasi boilerplate Next.js yang dioptimalkan untuk AI coding agent. Fokus utamanya adalah **clarity, consistency, verifiability, dan extensibility**. Setelah v1 stabil, arsitektur dan pola yang sama dapat diperluas ke boilerplate framework lain.
