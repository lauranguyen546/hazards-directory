import { CategorySlug } from './slugs'

export interface CategoryContent {
  whatIs: string
  warningSigns: string[]
  whatToExpect: Array<{ step: string; description: string }>
  howToChoose: Array<{ factor: string; description: string }>
  faqs: Array<{ question: string; answer: string }>
  relatedGuides?: Array<{ title: string; slug: string }>
}

export const CATEGORY_CONTENT: Record<CategorySlug, CategoryContent> = {
  'mold-remediation': {
    whatIs:
      'Mold remediation is the process of identifying, containing, and safely removing mold growth from a home or building. Unlike simple mold cleaning, professional remediation addresses the underlying moisture source, removes contaminated materials, and treats affected surfaces to prevent regrowth. It is essential for protecting both the structural integrity of your home and the health of its occupants.',

    warningSigns: [
      'Visible dark spots or fuzzy growth on walls, ceilings, or around windows',
      'A persistent musty or earthy odor, even when rooms appear clean',
      'Residents experiencing unexplained allergy symptoms, coughing, or headaches indoors',
      'Recent water damage, flooding, or a leaking pipe that was not quickly dried',
      'Discoloration or peeling of drywall, wallpaper, or paint',
      'Condensation regularly forming on windows, walls, or pipes',
    ],

    whatToExpect: [
      {
        step: '1. Inspection & Assessment',
        description:
          'A certified technician inspects your property, identifies the mold species, measures the extent of contamination, and locates the moisture source causing growth.',
      },
      {
        step: '2. Containment & Removal',
        description:
          'The affected area is sealed off with plastic sheeting and negative air pressure to prevent spores from spreading. Contaminated materials are safely removed and disposed of per EPA guidelines.',
      },
      {
        step: '3. Treatment & Prevention',
        description:
          'Remaining surfaces are cleaned with antimicrobial agents, HEPA vacuumed, and dried. The moisture source is addressed, and a clearance test confirms the remediation was successful.',
      },
    ],

    howToChoose: [
      {
        factor: 'IICRC Certification',
        description:
          'Look for technicians certified by the Institute of Inspection, Cleaning and Restoration Certification (IICRC) in Water Damage Restoration (WRT) or Applied Microbial Remediation (AMRT).',
      },
      {
        factor: 'Proper Licensing & Insurance',
        description:
          'Verify the company holds a valid contractor license in your state and carries general liability insurance plus workers\' compensation to protect you from liability.',
      },
      {
        factor: 'Independent Post-Remediation Testing',
        description:
          'Reputable companies offer or recommend third-party air quality testing after remediation — not just their own clearance report — to verify the job is complete.',
      },
      {
        factor: 'Written Remediation Plan',
        description:
          'Insist on a detailed written scope of work before any work begins, including which materials will be removed, containment procedures, and what warranty is offered.',
      },
    ],

    faqs: [
      {
        question: 'How long does mold remediation take?',
        answer:
          'Most residential mold remediation projects take 1–5 days depending on the extent of contamination. Small, contained areas may be completed in a single day, while widespread infestations affecting multiple rooms or HVAC systems can take a week or more.',
      },
      {
        question: 'Do I need to leave my home during mold remediation?',
        answer:
          'For minor remediation in a single isolated area, you may be able to stay if the work zone is properly sealed. However, for large-scale projects or if any household members have respiratory conditions or allergies, temporary relocation is strongly recommended.',
      },
      {
        question: 'Will mold come back after remediation?',
        answer:
          'Mold will not return if the underlying moisture source is fully resolved. If the root cause — a roof leak, plumbing issue, or condensation problem — is fixed during remediation, recurrence is unlikely. Without addressing moisture, new mold growth will return within weeks.',
      },
      {
        question: 'Does homeowners insurance cover mold remediation?',
        answer:
          'Coverage depends on the cause. Most policies cover mold if it resulted from a sudden, accidental event like a burst pipe. They typically exclude mold caused by long-term neglect, flooding (which requires separate flood insurance), or lack of maintenance.',
      },
      {
        question: 'How much does mold remediation cost?',
        answer:
          'Costs vary widely based on the affected area. Small bathroom mold jobs may run $500–$1,500, while whole-house or attic remediation can range from $3,000 to $10,000+. Get at least three quotes and be wary of unusually low bids that may skip critical steps.',
      },
    ],

    relatedGuides: [
      { title: 'How to Tell If You Have Mold', slug: 'how-to-tell-if-you-have-mold' },
      { title: 'Mold Remediation Cost Guide', slug: 'mold-remediation-cost' },
    ],
  },

  'water-damage-restoration': {
    whatIs:
      'Water damage restoration is the process of mitigating water intrusion, drying out a structure, and restoring it to its pre-damage condition. It covers everything from extracting standing water after a flood to drying wall cavities, replacing damaged drywall, and preventing secondary mold growth. Fast action — ideally within 24–48 hours — is critical to limiting structural damage and health risks.',

    warningSigns: [
      'Visible water stains, rings, or discoloration on ceilings, walls, or floors',
      'Warped, buckled, or soft wood floors or subflooring',
      'Peeling or bubbling paint and wallpaper',
      'Musty smell indicating moisture trapped in walls or under flooring',
      'Unexplained increase in your water bill suggesting a hidden leak',
      'Cracks in the foundation or basement walls with signs of moisture seepage',
    ],

    whatToExpect: [
      {
        step: '1. Emergency Extraction & Assessment',
        description:
          'Technicians arrive quickly to extract standing water with truck-mounted pumps, assess structural damage using moisture meters and thermal imaging, and document everything for insurance.',
      },
      {
        step: '2. Drying & Dehumidification',
        description:
          'Industrial air movers and dehumidifiers are placed strategically to dry the structure from the inside out. This phase typically takes 3–5 days and is monitored with daily moisture readings.',
      },
      {
        step: '3. Restoration & Rebuild',
        description:
          'Once fully dry, damaged materials are removed and rebuilt: drywall replaced, flooring reinstalled, painting completed. Many full-service companies handle both mitigation and reconstruction under one contract.',
      },
    ],

    howToChoose: [
      {
        factor: 'IICRC Water Damage Certification',
        description:
          'Look for the Water Damage Restoration Technician (WRT) or Applied Structural Drying (ASD) certification from the IICRC, the industry\'s primary standards body.',
      },
      {
        factor: '24/7 Emergency Availability',
        description:
          'Water damage is time-sensitive. Choose a company that offers genuine 24-hour emergency response and can deploy within 1–2 hours, not just answer a phone after hours.',
      },
      {
        factor: 'Insurance Billing Experience',
        description:
          'Select a company experienced in working directly with insurance adjusters. They should provide complete documentation, photos, and moisture logs that support your claim.',
      },
      {
        factor: 'Mold Prevention Protocols',
        description:
          'Ask whether the company applies antimicrobial treatment as part of drying to prevent mold growth, especially in humid climates where mold can begin forming within 24–48 hours.',
      },
    ],

    faqs: [
      {
        question: 'How quickly should water damage be addressed?',
        answer:
          'Immediately. Mold can begin growing within 24–48 hours of water exposure. Structural materials like wood and drywall absorb moisture rapidly, increasing damage and cost with each hour of delay. Call a restoration company the moment you discover significant water damage.',
      },
      {
        question: 'How long does water damage restoration take?',
        answer:
          'The drying phase alone typically takes 3–5 days. Complete restoration — including repairs and rebuild — can range from one week for minor damage to several months for major flood events involving structural work.',
      },
      {
        question: 'Will my homeowners insurance cover water damage?',
        answer:
          'Most policies cover sudden, accidental water damage like burst pipes or appliance failures. They typically do not cover gradual leaks, flooding (separate flood insurance required), or damage from deferred maintenance. Document everything and contact your insurer immediately.',
      },
      {
        question: 'Can I dry out water damage myself?',
        answer:
          'For very minor surface moisture (a small spill on hard flooring), DIY drying with fans and dehumidifiers may suffice. However, any water that has penetrated walls, subfloors, or ceilings requires professional equipment and moisture monitoring to ensure complete drying and prevent hidden mold.',
      },
      {
        question: 'What is the difference between water mitigation and water restoration?',
        answer:
          'Water mitigation refers to stopping damage from worsening — extracting water and drying the structure. Water restoration is the rebuild phase: replacing materials and returning the property to its pre-loss condition. Many companies offer both services, but they may be billed separately for insurance purposes.',
      },
    ],

    relatedGuides: [
      {
        title: 'Water Damage Restoration: What to Expect',
        slug: 'water-damage-restoration-what-to-expect',
      },
    ],
  },

  'pest-control': {
    whatIs:
      'Pest control is the management and elimination of insects, rodents, and other organisms that damage property or pose health risks. Professional pest control goes beyond over-the-counter sprays: technicians identify the specific pest species, locate entry points and nesting sites, apply targeted treatments, and implement prevention strategies to stop re-infestation. Regular professional service is often the most cost-effective long-term solution.',

    warningSigns: [
      'Visible insects or rodents, especially during daylight hours (often indicates a large infestation)',
      'Droppings, urine stains, or gnaw marks on food packaging, wiring, or structural wood',
      'Unusual scratching, rustling, or squeaking noises inside walls or ceilings at night',
      'Nests made from shredded paper, insulation, or plant material in hidden areas',
      'Unexplained bites on skin or waking up with itchy welts',
      'Sawdust-like frass near wooden structures (a sign of termites or carpenter ants)',
    ],

    whatToExpect: [
      {
        step: '1. Inspection & Identification',
        description:
          'A licensed technician conducts a thorough inspection of interior and exterior areas, identifies the pest species, assesses severity, and locates entry points and harboring areas.',
      },
      {
        step: '2. Targeted Treatment',
        description:
          'Using the Integrated Pest Management (IPM) approach, the technician applies the most appropriate treatment: baits, non-repellent residual sprays, traps, exclusion materials, or fumigation depending on the pest and severity.',
      },
      {
        step: '3. Prevention & Follow-Up',
        description:
          'Entry points are sealed, harborage areas are identified and addressed, and a follow-up schedule is set. Many services include a guarantee — if pests return between treatments, the company retreats at no extra charge.',
      },
    ],

    howToChoose: [
      {
        factor: 'State Licensing',
        description:
          'Every state requires pest control technicians to be licensed. Verify the company\'s license number through your state\'s Department of Agriculture or Structural Pest Control Board before hiring.',
      },
      {
        factor: 'IPM Approach',
        description:
          'Integrated Pest Management (IPM) prioritizes targeted, least-toxic treatments over blanket pesticide applications. Ask if the company uses IPM principles — it\'s better for your family, pets, and the environment.',
      },
      {
        factor: 'Written Guarantee',
        description:
          'Reputable companies stand behind their work with a service guarantee. Confirm the terms: how long the treatment is warranted, what pests are covered, and how re-treatment is handled.',
      },
      {
        factor: 'Transparent Chemical Disclosure',
        description:
          'Any licensed applicator must provide a list of chemicals being used upon request. Be cautious of companies that are evasive about treatment products, especially if you have children or pets.',
      },
    ],

    faqs: [
      {
        question: 'How long does pest control treatment last?',
        answer:
          'Effectiveness varies by treatment type and pest. General perimeter treatments typically last 30–90 days. Termite soil treatments can last 5–10 years. For ongoing issues, most companies offer quarterly or bi-monthly service plans that maintain protection year-round.',
      },
      {
        question: 'Is pest control safe for children and pets?',
        answer:
          'When applied correctly by a licensed professional, modern pest control treatments are low-toxicity and safe after the required re-entry period (typically a few hours). Always inform the technician about children and pets so they can select appropriate products and application methods.',
      },
      {
        question: 'Do I need to leave my home during pest control treatment?',
        answer:
          'For most standard treatments, you only need to vacate for 2–4 hours while products dry. Whole-structure fumigation (used for severe termite or bed bug infestations) requires leaving your home for 2–3 days. Your technician will provide specific instructions.',
      },
      {
        question: 'What is the difference between pest control and extermination?',
        answer:
          'Extermination focuses on killing existing pests, while pest control is a broader approach that includes prevention, exclusion, and ongoing monitoring. Modern pest control companies use Integrated Pest Management (IPM) to address root causes, not just symptoms.',
      },
      {
        question: 'How can I prevent pests from returning after treatment?',
        answer:
          'Seal cracks and gaps in your foundation, walls, and around pipes. Store food in airtight containers, maintain proper drainage, reduce clutter in attics and basements, and trim vegetation away from your home\'s foundation. Your technician can provide a site-specific prevention checklist.',
      },
    ],
  },

  'radon-testing': {
    whatIs:
      'Radon testing is the measurement of radon gas levels inside a home or building. Radon is a naturally occurring radioactive gas that forms from the decay of uranium in soil and rock. It seeps into homes through foundation cracks and openings, and is the second leading cause of lung cancer in the United States after smoking. The EPA recommends testing every home, as radon has no odor, color, or taste — the only way to know your risk level is to test.',

    warningSigns: [
      'Your home has never been tested for radon (testing is the only way to detect it)',
      'You live in a high-radon geographic area (check EPA\'s radon zone map)',
      'Your home has a basement, slab foundation, or crawl space',
      'You\'ve recently added living space in a basement or lower level',
      'A neighbor\'s home tested at elevated radon levels (levels vary house-to-house)',
      'You are buying or selling a home — radon testing is increasingly standard in real estate',
    ],

    whatToExpect: [
      {
        step: '1. Test Placement',
        description:
          'A certified professional places an approved radon detector (short-term or long-term) in the lowest livable area of your home. Closed-house conditions must be maintained for 12 hours before and during testing for accurate results.',
      },
      {
        step: '2. Lab Analysis',
        description:
          'After the exposure period (48 hours for short-term; 90+ days for long-term), the test device is sent to an accredited lab for analysis. Results are reported in picocuries per liter (pCi/L).',
      },
      {
        step: '3. Results & Next Steps',
        description:
          'If results are at or above 4.0 pCi/L (the EPA action level), radon mitigation is recommended. Levels between 2–4 pCi/L warrant follow-up testing. A mitigation system can reduce levels by up to 99% in most homes.',
      },
    ],

    howToChoose: [
      {
        factor: 'State Certification or NRPP/NRSB Credentials',
        description:
          'Many states require radon testers and mitigators to be licensed. Look for certification from the National Radon Proficiency Program (NRPP) or National Radon Safety Board (NRSB), the two nationally recognized credentialing bodies.',
      },
      {
        factor: 'Use of Approved Test Devices',
        description:
          'Ensure the contractor uses EPA-approved test devices and follows EPA\'s measurement protocols (either EPA 402-R-92-004 or ASTM standard E2121). Improper testing can yield unreliable results.',
      },
      {
        factor: 'Independence of Testing from Mitigation',
        description:
          'For maximum objectivity, consider having testing and mitigation performed by separate companies. If using one company for both, confirm they use EPA-recognized protocols and third-party lab analysis.',
      },
      {
        factor: 'Written Warranty on Mitigation Systems',
        description:
          'A quality mitigation contractor should provide a written guarantee that post-mitigation levels will fall below 4.0 pCi/L, and ideally below 2.0 pCi/L. Ask about the system warranty, typically covering 5–25 years.',
      },
    ],

    faqs: [
      {
        question: 'What is a safe radon level?',
        answer:
          'The EPA recommends taking action if indoor radon levels are at or above 4 pCi/L. Levels between 2–4 pCi/L are considered elevated and warrant follow-up testing or mitigation. No level of radon exposure is completely risk-free, but mitigation can reduce levels to below 2 pCi/L in most homes.',
      },
      {
        question: 'How much does radon testing cost?',
        answer:
          'Professional radon testing typically costs $100–$300 for a short-term test. Long-term testing (90+ days) may cost $150–$350. DIY test kits are available for $15–$30, but professional testing with certified equipment and lab analysis provides more reliable results, especially for real estate transactions.',
      },
      {
        question: 'How long does radon mitigation take?',
        answer:
          'Sub-slab depressurization — the most common mitigation method — is typically installed in 3–5 hours. The system consists of a PVC pipe running from beneath the slab to the exterior, with a fan creating negative pressure to vent radon before it enters the home.',
      },
      {
        question: 'Does radon affect only basements?',
        answer:
          'Radon enters through the lowest level of a home in contact with soil — basement, slab, or crawl space. However, it can migrate to upper floors. Testing should always be conducted in the lowest livable area, but levels should be considered for the whole home.',
      },
      {
        question: 'Will a radon mitigation system increase my electric bill?',
        answer:
          'A standard radon fan uses 20–90 watts — comparable to a light bulb. The annual electricity cost is typically $30–$100. Given the lung cancer risk reduction, this is one of the most cost-effective home health investments available.',
      },
    ],
  },
}
