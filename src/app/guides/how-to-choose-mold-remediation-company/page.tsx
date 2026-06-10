import { Metadata } from 'next'
import Link from 'next/link'
import AffiliateProductCard from '@/components/AffiliateProductCard'
import LeadCaptureForm from '@/components/LeadCaptureForm'
import { generateBreadcrumbSchema, generateFAQSchema, generateArticleSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'How to Choose a Mold Remediation Company: 7 Things to Check',
  description: 'Licensing requirements, red flags to avoid, questions to ask, and tips for comparing mold remediation quotes.',
  openGraph: {
    title: 'How to Choose a Mold Remediation Company: 7 Things to Check',
    description: 'What to look for when hiring a mold remediation company — licensing, certifications, red flags, and questions to ask.',
    type: 'article',
  },
}

const FAQS = [
  {
    question: 'What certifications should a mold remediation company have?',
    answer: 'Look for IICRC certification (Institute of Inspection, Cleaning and Restoration Certification) — specifically the Applied Microbial Remediation Technician (AMRT) credential. Some states require a separate mold remediation contractor license. Check your state\'s contractor licensing board.',
  },
  {
    question: 'Should the same company do mold testing and remediation?',
    answer: 'Generally no. There\'s a conflict of interest when the testing company also does the remediation — they may find more mold than exists. Use an independent industrial hygienist or environmental testing company for the assessment, then hire a separate remediation company.',
  },
  {
    question: 'What questions should I ask a mold remediation company?',
    answer: 'Key questions: Are you IICRC certified? Do you carry liability insurance? What\'s your containment protocol? Will you do post-remediation testing? Can I see a detailed written scope of work before signing? How do you handle structural damage or drywall removal?',
  },
  {
    question: 'How do I get multiple mold remediation quotes?',
    answer: 'Get at least 3 quotes. Make sure each contractor is quoting the same scope of work. Ask each company to provide a written scope before quoting — vague verbal estimates are meaningless. Be wary of quotes dramatically lower than others, as corners may be cut on containment.',
  },
]

export default function HowToChooseMoldRemediationPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hazardpros.com'
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Guides', url: `${baseUrl}/guides` },
    { name: 'How to Choose a Mold Remediation Company' },
  ])
  const faqSchema = generateFAQSchema(FAQS)
  const articleSchema = generateArticleSchema({
    title: 'How to Choose a Mold Remediation Company: 7 Things to Check',
    description: 'Licensing requirements, red flags to avoid, questions to ask, and tips for comparing mold remediation quotes.',
    slug: 'how-to-choose-mold-remediation-company',
    datePublished: '2026-02-05',
    dateModified: '2026-03-15',
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-3 text-sm text-gray-500 flex gap-2">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span>›</span>
            <Link href="/guides" className="hover:text-primary-600">Guides</Link>
            <span>›</span>
            <span className="text-gray-900">How to Choose a Mold Remediation Company</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="lg:grid lg:grid-cols-3 lg:gap-10">
            <article className="lg:col-span-2">
              <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">Mold · 6 min read</span>
              <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">How to Choose a Mold Remediation Company: 7 Things to Check</h1>
              <p className="text-gray-500 text-sm mb-6">Updated March 2026</p>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-amber-800">
                  <strong>Warning:</strong> Mold remediation is an unregulated industry in many states. Not every company that claims to remove mold follows proper containment protocols. Here's how to vet them properly.
                </p>
              </div>

              <p className="text-lg text-gray-700 mb-6">
                Choosing the wrong mold remediation company can leave you with recurring mold problems, unnecessary costs, or health hazards. These 7 checks will help you hire a company that actually solves the problem.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mb-4">The 7-Point Checklist</h2>

              <div className="space-y-5 mb-8">
                <div className="border border-gray-200 rounded-xl p-5">
                  <h3 className="font-bold text-gray-900 mb-2">1. Verify IICRC Certification</h3>
                  <p className="text-gray-700 text-sm">The gold standard is IICRC AMRT (Applied Microbial Remediation Technician) certification. Ask for the technician's name and look them up at iicrc.org. Some states also require a state mold remediation contractor license — check your state's contractor licensing board.</p>
                </div>

                <div className="border border-gray-200 rounded-xl p-5">
                  <h3 className="font-bold text-gray-900 mb-2">2. Confirm Liability Insurance</h3>
                  <p className="text-gray-700 text-sm">The company should carry general liability insurance ($1M+ minimum) and workers' compensation. Ask for a certificate of insurance naming you as an additional insured. Walk away from any company that can't provide this.</p>
                </div>

                <div className="border border-gray-200 rounded-xl p-5">
                  <h3 className="font-bold text-gray-900 mb-2">3. Require a Written Scope of Work</h3>
                  <p className="text-gray-700 text-sm">Before any work begins, get a written document specifying: which areas will be remediated, what materials will be removed, containment methods, disposal procedures, and whether post-remediation testing is included. Never approve verbal estimates.</p>
                </div>

                <div className="border border-gray-200 rounded-xl p-5">
                  <h3 className="font-bold text-gray-900 mb-2">4. Ask About Containment Protocol</h3>
                  <p className="text-gray-700 text-sm">Proper mold remediation requires negative air pressure containment to prevent spores from spreading during removal. Ask specifically: "What containment barriers will you set up?" and "Will you use an air scrubber with HEPA filtration?" Companies that skip this step can make the problem worse.</p>
                </div>

                <div className="border border-gray-200 rounded-xl p-5">
                  <h3 className="font-bold text-gray-900 mb-2">5. Separate Testing from Remediation</h3>
                  <p className="text-gray-700 text-sm">Use an independent industrial hygienist or environmental consultant to assess the mold and write a remediation protocol. Then hire a separate company to execute the remediation. This eliminates the conflict of interest where remediators "find" more mold to increase their quote.</p>
                </div>

                <div className="border border-gray-200 rounded-xl p-5">
                  <h3 className="font-bold text-gray-900 mb-2">6. Get Post-Remediation Clearance Testing</h3>
                  <p className="text-gray-700 text-sm">After remediation, an independent air quality test should confirm mold levels are within normal outdoor background levels. Some companies offer this themselves — but having the independent hygienist from step 5 do it is better. Clearance testing adds $200–$500 and is worth every dollar.</p>
                </div>

                <div className="border border-gray-200 rounded-xl p-5">
                  <h3 className="font-bold text-gray-900 mb-2">7. Watch for These Red Flags</h3>
                  <ul className="space-y-2 text-gray-700 text-sm list-disc pl-5">
                    <li>Offers to skip or delay testing ("we can just clean it")</li>
                    <li>Quotes significantly lower than competitors without explanation</li>
                    <li>Can't show current certificate of insurance on request</li>
                    <li>Refuses to provide a written scope before starting</li>
                    <li>Uses high-pressure sales tactics ("we need to start today")</li>
                    <li>Can't name the specific certifications their technicians hold</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Confirming the Scope Before You Call</h2>
              <p className="text-gray-700 mb-4">
                Before inviting companies to quote, do a basic DIY test to understand the type and rough extent of mold in your home. This helps you evaluate whether contractor scopes are reasonable.
              </p>

              <div className="my-6">
                <AffiliateProductCard program="amazon_mold_kit" sourcePage="/guides/how-to-choose-mold-remediation-company" sourceCategory="Mold" />
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">Questions to Ask Every Company</h2>
              <ol className="space-y-2 text-gray-700 mb-6 list-decimal pl-5">
                <li>Are your technicians IICRC AMRT certified? Can I verify this?</li>
                <li>Do you carry $1M+ liability insurance? Can I get a certificate?</li>
                <li>Will you provide a written scope of work before I authorize any work?</li>
                <li>What containment methods will you use?</li>
                <li>Do you use HEPA air scrubbers during remediation?</li>
                <li>Do you offer post-remediation clearance testing?</li>
                <li>Will you fix or help identify the moisture source that caused the mold?</li>
              </ol>

              <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4 mb-8">
                {FAQS.map((faq) => (
                  <details key={faq.question} className="border border-gray-200 rounded-lg">
                    <summary className="px-4 py-3 font-medium text-gray-900 cursor-pointer">{faq.question}</summary>
                    <p className="px-4 pb-4 text-gray-600 text-sm">{faq.answer}</p>
                  </details>
                ))}
              </div>

              <div className="bg-blue-50 rounded-xl p-5">
                <h3 className="font-bold text-gray-900 mb-3">Related Guides</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/guides/mold-remediation-cost" className="text-primary-600 hover:underline">Mold Removal Cost Guide 2026 →</Link></li>
                  <li><Link href="/guides/how-to-detect-mold" className="text-primary-600 hover:underline">How to Tell If You Have Mold →</Link></li>
                  <li><Link href="/providers?category=Mold" className="text-primary-600 hover:underline">Find Mold Remediation Pros Near You →</Link></li>
                </ul>
              </div>
            </article>

            <aside className="mt-10 lg:mt-0 space-y-6">
              <LeadCaptureForm prefilledCategory="Mold" sourcePage="/guides/how-to-choose-mold-remediation-company" compact />
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h4 className="font-bold text-gray-900 mb-3">Find Mold Pros Near You</h4>
                <p className="text-sm text-gray-600 mb-3">Browse verified mold remediation professionals in your area.</p>
                <Link href="/providers?category=Mold" className="block text-center bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors">
                  Browse Mold Pros →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
