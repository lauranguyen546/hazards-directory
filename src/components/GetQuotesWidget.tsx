'use client'

import { useState } from 'react'
import QuoteRequestForm from './QuoteRequestForm'

interface GetQuotesWidgetProps {
  sourceState?: string
  sourceCategory?: string
}

export default function GetQuotesWidget({ sourceState, sourceCategory }: GetQuotesWidgetProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-primary-700 rounded-xl p-6 text-white">
      <div className="flex items-start gap-4">
        <div className="text-3xl">📋</div>
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-1">Get 3 Free Quotes</h3>
          <p className="text-primary-100 text-sm mb-4">
            Tell us your situation and we'll connect you with qualified local providers.
            No commitment required.
          </p>
          {!open ? (
            <button
              onClick={() => setOpen(true)}
              className="bg-white text-primary-700 font-semibold px-5 py-2 rounded-lg hover:bg-primary-50 transition-colors text-sm"
            >
              Get Free Quotes →
            </button>
          ) : (
            <div className="bg-white rounded-lg p-4">
              <QuoteRequestForm
                sourceType={sourceState ? (sourceCategory ? 'category_page' : 'state_page') : 'state_page'}
                sourceState={sourceState}
                sourceCategory={sourceCategory}
                compact
              />
              <button
                onClick={() => setOpen(false)}
                className="mt-2 text-xs text-gray-400 hover:text-gray-600"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
