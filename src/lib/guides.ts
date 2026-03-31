export interface GuideSection {
  heading: string
  body: string
}

export interface Guide {
  slug: string
  title: string
  metaDescription: string
  targetKeyword: string
  categorySlug: string
  categoryLabel: string
  datePublished: string
  dateModified: string
  sections: GuideSection[]
  ctaText: string
  ctaHref: string
}

export const GUIDES: Guide[] = [
  {
    slug: 'how-to-tell-if-you-have-mold',
    title: 'How to Tell If You Have Mold in Your Home',
    metaDescription:
      'Learn the most common signs of mold in your home — from visible growth and musty odors to health symptoms — and what to do if you find it.',
    targetKeyword: 'signs of mold in home',
    categorySlug: 'mold-remediation',
    categoryLabel: 'Mold Remediation',
    datePublished: '2025-01-15',
    dateModified: '2025-01-15',
    ctaText: 'Find a Mold Remediation Professional Near You',
    ctaHref: '/mold-remediation',
    sections: [
      {
        heading: 'Why Mold Is Harder to Detect Than You Think',
        body: `Mold is often described as a visible problem, but the reality is that most significant mold infestations begin hidden — inside wall cavities, beneath flooring, behind drywall, or in attic insulation. By the time you can see mold on a surface, it has often been growing for weeks or months in places you cannot easily inspect.

Mold needs three things to grow: moisture, an organic food source (wood, drywall, fabric), and warmth. Homes provide all three in abundance after any water intrusion event — a leaking roof, a slow pipe drip, or even persistent condensation from poor ventilation. Understanding the full range of warning signs — not just visual ones — is the key to catching mold early.`,
      },
      {
        heading: 'Visual Signs: What Mold Looks Like',
        body: `Visible mold can appear in many forms, and not all of it looks like the black patches most people picture. Common visual presentations include:

**Dark spots or clusters** on ceilings, walls, grout lines, or around windows. Mold color ranges from black and green to white, gray, orange, or even pink depending on the species.

**Fuzzy or powdery textures** on surfaces. This is active mold growth. If the growth appears fuzzy or has a raised texture, it is actively sporulating and should not be disturbed without proper protection.

**Discoloration of drywall or wood** that appears as spreading stains. New stains that cannot be explained by water marks from a known event deserve investigation.

**Efflorescence vs. mold in basements**: White, chalky deposits on basement walls are usually efflorescence — mineral deposits from water seeping through concrete. This is not mold, but it indicates moisture intrusion that can lead to mold. True mold in basements tends to appear on organic surfaces like wooden beams, stored cardboard, and drywall.`,
      },
      {
        heading: 'The Smell Test: Musty Odors as an Early Warning',
        body: `A persistent musty or earthy smell is often the first indication of hidden mold growth. This odor comes from microbial volatile organic compounds (MVOCs) — chemical byproducts released as mold digests organic material. The smell is frequently described as "old books," "wet earth," or "dirty socks."

Key things to note about the odor:

- **It intensifies when HVAC runs** — if mold is in your ductwork or near air vents, the smell will spread throughout the home when heating or cooling activates.
- **Rooms with consistent odor** even after cleaning and airing out suggest mold behind a surface, not just surface dirt.
- **Crawl spaces and basements** are the most common odor sources, as moisture accumulates easily in these areas and often goes unnoticed.

If you can smell mold but cannot find a source, a professional inspection with moisture meters and sometimes air sampling is the appropriate next step.`,
      },
      {
        heading: 'Health Symptoms That May Indicate Mold Exposure',
        body: `Mold produces allergens, irritants, and in some cases mycotoxins. While not everyone reacts the same way, certain health patterns can point toward an indoor mold problem:

**Respiratory symptoms** that improve when you leave the home and return when you come back — congestion, coughing, wheezing, or shortness of breath.

**Unexplained allergy symptoms** year-round, especially in seasons when outdoor pollen counts are low.

**Eye, nose, and throat irritation** that no over-the-counter treatment relieves for long.

**Headaches or fatigue** with no clear cause that correlate with time spent at home.

Children, the elderly, and individuals with asthma, compromised immune systems, or existing respiratory conditions are significantly more sensitive to mold exposure. If household members have unusual, persistent symptoms and no medical explanation has been found, an indoor air quality test is worth considering.`,
      },
      {
        heading: 'High-Risk Locations in Your Home',
        body: `Some areas of a home are structurally more prone to mold growth. If you are doing an informal inspection, prioritize these locations:

**Bathrooms**: Around the tub, shower, toilet base, under the sink, and on the ceiling — anywhere steam and moisture accumulate without adequate ventilation.

**Kitchen**: Under the sink (especially if there has ever been a slow leak), around the refrigerator drip pan, and near the dishwasher.

**Basement and crawl space**: On wooden floor joists, concrete block walls, stored paper and cardboard, and any area near the sump pump or HVAC equipment.

**Attic**: Along the underside of roof sheathing, particularly near exhaust vents that have been improperly routed into the attic space instead of through the roof.

**Window frames and sills**: In climates with cold winters, condensation forms on windows and drips onto the sill, creating persistent moisture that promotes mold.

**Around HVAC equipment**: Drip pans, air handlers, and duct insulation can harbor mold that then distributes spores throughout the entire home.`,
      },
      {
        heading: 'What to Do If You Find Mold',
        body: `Once you identify suspected mold, the appropriate response depends on the scale:

**Small, surface mold (less than 10 square feet)** on non-porous surfaces like tile can often be cleaned with appropriate products and personal protective equipment. The EPA guidelines permit homeowner cleaning for contained areas.

**Any mold affecting drywall, wood, or porous materials** should be handled by a certified mold remediation professional. These materials cannot simply be cleaned — they must be removed and replaced, and the work requires containment to avoid spreading spores.

**Any uncertainty about scope** — if you can smell mold but cannot find all of the source — warrants a professional inspection. Certified industrial hygienists can perform air sampling and moisture mapping to locate hidden growth.

**Always address the moisture source first.** Removing mold without fixing the underlying cause — a roof leak, plumbing drip, or inadequate ventilation — will result in regrowth within weeks.`,
      },
    ],
  },

  {
    slug: 'mold-remediation-cost',
    title: 'Mold Remediation Cost Guide: What to Expect in 2025',
    metaDescription:
      'Understand mold remediation costs by project type, room, and severity. Learn what drives pricing, what to watch out for, and how to get the best value.',
    targetKeyword: 'mold remediation cost',
    categorySlug: 'mold-remediation',
    categoryLabel: 'Mold Remediation',
    datePublished: '2025-01-15',
    dateModified: '2025-01-15',
    ctaText: 'Get Mold Remediation Quotes From Local Providers',
    ctaHref: '/mold-remediation',
    sections: [
      {
        heading: 'Mold Remediation Cost Overview',
        body: `Mold remediation costs in the United States range from approximately **$500 for a minor bathroom mold issue** to over **$30,000 for a whole-house infestation** requiring extensive structural removal. The national average for a mid-range residential project is $2,500 to $6,000.

Unlike many home services with relatively predictable pricing, mold remediation costs are highly variable because price is driven by factors that are often not visible until inspection: the affected area in square footage, the type of material contaminated, the mold species present, and whether the moisture source has been resolved.

This guide breaks down costs by project type so you can set realistic expectations before requesting quotes.`,
      },
      {
        heading: 'Cost by Location and Project Type',
        body: `**Bathroom mold remediation: $500–$1,500**
Small, contained bathroom mold affecting tile grout, caulk, or the ceiling in a single bathroom. Typically involves surface treatment and replacement of caulk or grout. If mold has penetrated the drywall behind tile, costs rise to the $1,500–$3,500 range.

**Crawl space mold remediation: $1,500–$5,000**
Crawl spaces require additional protective equipment and specialized drying. Costs depend heavily on whether the crawl space has a vapor barrier, the extent of wood rot, and whether encapsulation is part of the scope.

**Basement mold remediation: $2,000–$6,000**
Basements often have larger affected areas and may involve structural wood framing, concrete block, and stored belongings. HVAC equipment in basements can complicate containment.

**Attic mold remediation: $1,500–$7,000**
Attic mold (typically from inadequate ventilation or a roof leak) affects roof sheathing and framing. Costs vary by attic size and accessibility. Soda blasting or dry ice blasting is sometimes used on wood framing instead of removal.

**Whole-house or multi-room: $10,000–$30,000+**
Extensive infestations involving multiple rooms, HVAC systems, or structural elements are among the most expensive residential projects. Full-house projects may require temporary relocation.`,
      },
      {
        heading: 'What Drives the Cost of Mold Remediation',
        body: `Understanding the primary cost factors helps you evaluate quotes more objectively:

**Affected square footage** is the single largest driver. Most contractors price by square foot for the contaminated area, typically $15–$30/sq ft for contained surface remediation, higher for structural work.

**Material type** matters significantly. Mold on tile or concrete can often be treated in place. Mold on drywall, wood framing, or insulation requires physical removal and replacement — adding both labor and material costs.

**Mold species** affects the scope of containment and required PPE. While any mold should be addressed, certain species require more rigorous protocols.

**Accessibility** affects labor hours. Attics with low clearance, crawl spaces requiring extensive equipment, and areas behind finished walls all add to labor time.

**Post-remediation testing** (also called clearance testing) is a necessary cost for any project — budget $300–$500 for air sampling by an independent hygienist after work is complete.

**Moisture source repairs** are often needed alongside remediation. A roof repair, plumbing fix, or bathroom ventilation upgrade adds cost but is essential — without it, mold will return.`,
      },
      {
        heading: 'Does Homeowners Insurance Cover Mold Remediation?',
        body: `Coverage depends on the underlying cause of the mold:

**Typically covered**: Mold resulting from a sudden, accidental event — a burst pipe, an appliance failure causing a flood, wind-driven rain through a damaged roof. Your insurer may cover both the water damage remediation and resulting mold treatment.

**Typically not covered**: Mold from long-term neglect, gradual leaks that were not reported, flooding (which requires a separate NFIP or private flood insurance policy), and humidity-related mold in basements or crawl spaces with no acute event.

**Practical steps**: Document everything immediately with photos and video. Contact your insurer before hiring a remediation company — many insurers want to send an adjuster or use a preferred vendor. Keep all receipts and reports, as you may need to appeal a denied claim.

If you believe insurance should cover the work and your claim is denied, a public adjuster can evaluate your policy and advocate on your behalf — typically for a percentage of the settlement.`,
      },
      {
        heading: 'How to Evaluate Mold Remediation Quotes',
        body: `Getting multiple quotes is essential for any project over $1,000. Here is what a legitimate quote should include:

**Scope of work in writing**: Which rooms and materials are included, containment procedures (negative air pressure, plastic barriers), disposal methods, and what is specifically excluded.

**Post-remediation testing**: Whether the contractor includes a clearance test or whether you need to hire a separate industrial hygienist. For objectivity, independent testing is preferable.

**Warranty terms**: What happens if mold returns? Reputable companies offer at minimum a 1-year warranty against recurrence in the treated area, contingent on the moisture source being resolved.

**License and insurance verification**: Ask for the contractor's state license number (in states that require one) and request a certificate of insurance showing general liability and workers' compensation.

**Red flags to avoid**: Unusually low bids (under $500 for anything beyond minor surface mold), contractors who refuse to provide written scopes, high-pressure tactics like "we need to start today before it spreads," and lack of any post-remediation verification process.`,
      },
      {
        heading: 'DIY vs. Professional Mold Remediation',
        body: `The EPA guidelines permit homeowners to clean mold affecting less than 10 square feet on non-porous surfaces using appropriate cleaning products and personal protective equipment (N95 or P100 respirator, gloves, goggles). For minor surface mold on tile or concrete, this is a reasonable approach.

Professional remediation is necessary when:

- The affected area exceeds 10 square feet
- Mold has penetrated porous materials (drywall, wood, insulation, carpet)
- The moisture source has not been identified or resolved
- Household members have respiratory conditions, compromised immune systems, or allergies
- HVAC systems may be involved, which can distribute spores throughout the home

Attempting DIY remediation on large or structural mold problems typically makes the situation worse by disturbing mold and spreading spores to previously unaffected areas without proper containment.`,
      },
    ],
  },

  {
    slug: 'water-damage-restoration-what-to-expect',
    title: 'Water Damage Restoration: What to Expect From Start to Finish',
    metaDescription:
      'A complete guide to the water damage restoration process — from emergency extraction through drying, repairs, and working with insurance.',
    targetKeyword: 'water damage restoration process',
    categorySlug: 'water-damage-restoration',
    categoryLabel: 'Water Damage Restoration',
    datePublished: '2025-01-15',
    dateModified: '2025-01-15',
    ctaText: 'Find Water Damage Restoration Providers Near You',
    ctaHref: '/water-damage-restoration',
    sections: [
      {
        heading: 'The First 24 Hours Are Critical',
        body: `When water enters a home — from a burst pipe, appliance failure, roof leak, or flooding — the clock starts immediately. Water damage compounds rapidly in the first 24–48 hours: materials absorb moisture, structural wood begins to swell and warp, and conditions become optimal for mold growth.

The first priority is to stop the water source if possible. Shut off the main water supply if a pipe has burst, and contact your insurance company to report the damage. Then call a professional water damage restoration company. Most reputable companies offer 24/7 emergency response and can have a crew on-site within 1–2 hours.

Do not wait to see if things dry out on their own. What appears to be a surface-level wet floor is often moisture that has wicked into subfloors, wall cavities, and insulation — invisible problems that cause far greater damage if not addressed immediately.`,
      },
      {
        heading: 'Phase 1: Emergency Water Extraction',
        body: `The first thing restoration technicians do is extract standing water as quickly as possible. This is done with truck-mounted or portable extraction units capable of removing hundreds of gallons per hour from flooring, carpets, and other surfaces.

**What happens during extraction:**

Technicians document the damage with photos and video — essential for your insurance claim. Moisture meters and thermal imaging cameras are used to map the extent of water migration, including hidden moisture in walls and subfloors that is not visually apparent.

Flooring materials are evaluated for salvageability. Hardwood floors may be candidates for drying in place if addressed quickly enough; heavily saturated carpet and pad are typically removed and discarded.

Structural materials that are beyond drying — heavily saturated drywall, insulation — are identified for removal. Removing wet materials ("tear-out") is often necessary to allow complete drying of the structure behind them.

After extraction, the space is prepared for the drying phase: furniture and contents are moved, flooring materials that need to be removed are pulled, and air movement equipment is positioned.`,
      },
      {
        heading: 'Phase 2: Structural Drying',
        body: `After extraction, drying is the most time-consuming phase — typically 3–5 days but sometimes longer for severe damage or humid climates. Industrial drying equipment used by professionals is far more effective than household fans and dehumidifiers.

**Key equipment:**

**Air movers** (high-velocity axial or centrifugal fans) are placed to create airflow patterns across wet surfaces, accelerating evaporation. The number and placement is calculated based on the affected square footage per industry standards (IICRC S500).

**Commercial dehumidifiers** remove the evaporated moisture from the air, preventing it from re-absorbing into materials or migrating to unaffected areas.

**Drying systems for walls and floors**: When moisture has penetrated wall cavities, technicians may use injectidry systems — hoses inserted into wall cavities — to dry behind surfaces without additional demolition.

**Daily monitoring**: Technicians should visit daily (or at minimum every other day) to check moisture readings and adjust equipment placement. Drying logs documenting these readings are provided to your insurance company as proof the work was performed correctly.

A proper drying job is not complete until all affected materials — including structural wood, subfloors, and framing — reach acceptable moisture content levels, not just until surfaces feel dry to the touch.`,
      },
      {
        heading: 'Phase 3: Mold Prevention and Treatment',
        body: `Even with prompt water extraction and drying, the risk of mold growth is real — particularly in warm, humid climates where mold can begin forming within 24–48 hours of water exposure. Reputable restoration companies incorporate antimicrobial treatment as a standard part of the drying phase.

Antimicrobial agents are applied to affected structural materials during and after drying to inhibit mold growth. This is not a substitute for proper drying — moisture levels must still reach acceptable levels — but it provides an additional layer of protection during the drying window.

After drying is complete, a post-drying inspection checks for any signs of mold development. If mold is found, remediation is addressed before the rebuild phase begins — attempting to cover mold with new drywall traps the problem and will result in larger issues later.

For extended water events (flooding that took days to address, for example), air sampling by an industrial hygienist may be recommended before reconstruction to confirm the space is clear for enclosed construction.`,
      },
      {
        heading: 'Phase 4: Restoration and Rebuild',
        body: `Once the structure is confirmed dry and mold-free, restoration — the rebuild phase — begins. The scope depends on what was removed during mitigation:

**Drywall replacement**: New drywall is hung, taped, mudded, and textured to match the existing finish. In rooms with wallpaper or custom finishes, matching the original appearance may require additional effort.

**Flooring reinstallation**: New underlayment and flooring are installed. If hardwood floors were successfully dried in place, sanding and refinishing may be needed for surface restoration.

**Paint and trim**: Painted surfaces are reprimed (with a stain-blocking primer if any water staining remains) and repainted. Trim and baseboards removed during mitigation are replaced.

**Cabinetry and fixtures**: In kitchen and bathroom water losses, cabinets and vanities that were removed are either reinstalled (if undamaged) or replaced.

Many full-service water damage companies handle both mitigation and reconstruction under one contract, which simplifies project management and insurance billing. Others work only on mitigation and refer you to a separate general contractor for rebuild — both models are common.`,
      },
      {
        heading: 'Working With Your Insurance Company',
        body: `Water damage is one of the most common homeowners insurance claims, and the process can be straightforward or contentious depending on the cause and your documentation.

**Immediate steps:**
1. Call your insurer as soon as possible to open a claim. Most have 24/7 claim lines.
2. Document everything before and after emergency mitigation — photos and video from every angle.
3. Do not throw away damaged materials until your adjuster has seen them.
4. Keep all receipts for emergency expenses, hotel stays, and meals if displacement is necessary.

**What adjusters review**: Your adjuster will assess the cause of loss (is it covered?), review the restoration company's documentation (moisture logs, scope of work, daily drying reports), and determine the replacement cost value of damaged materials.

**Common coverage issues**: Most policies cover sudden, accidental water damage from internal sources. They generally exclude flooding (separate flood policy required), gradual leaks, and damage from deferred maintenance. If your claim involves a gray area, a public adjuster — who works on your behalf for a percentage of the settlement — can be worth the cost for large losses.

**Working with a preferred vendor**: Many insurers have preferred restoration company networks. You have the right to choose your own contractor, but using a preferred vendor can simplify the billing process. If you choose your own contractor, ensure they are experienced in direct insurance billing.`,
      },
    ],
  },
]

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug)
}
