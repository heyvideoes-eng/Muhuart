export default function CustomJewelryRequest() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side Image */}
      <div className="w-full md:w-1/2 bg-[#F8F8F8] h-[40vh] md:h-screen sticky top-0">
        <div className="absolute inset-0 flex flex-col justify-center px-12 md:px-24">
          <h1 className="text-4xl md:text-6xl font-light leading-tight mb-6">Bespoke<br />Creations</h1>
          <p className="text-gray-600 max-w-md">
            Collaborate with our master artisans to create a one-of-a-kind piece that tells your unique story. From ethically sourced diamonds to rare antique restorations.
          </p>
        </div>
      </div>

      {/* Right side Form */}
      <div className="w-full md:w-1/2 px-[5vw] py-16 md:py-24 bg-white overflow-y-auto">
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-2xl font-medium mb-2">Start your commission</h2>
          <p className="text-sm text-gray-500 mb-10">Please share a few details about your vision, and our concierge team will be in touch within 24 hours.</p>
          
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">First Name *</label>
                <input type="text" className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black transition-colors" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Last Name *</label>
                <input type="text" className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black transition-colors" required />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email Address *</label>
              <input type="email" className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black transition-colors" required />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
              <input type="tel" className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black transition-colors" />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-3">What type of piece are you interested in?</label>
              <div className="grid grid-cols-2 gap-3">
                {["Engagement Ring", "Wedding Band", "Necklace", "Earrings", "Bracelet", "Antique Restoration"].map((type) => (
                  <label key={type} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="accent-black" /> {type}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Estimated Budget Range</label>
              <select className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black bg-transparent">
                <option>Under $1,000</option>
                <option>$1,000 - $3,000</option>
                <option>$3,000 - $10,000</option>
                <option>Over $10,000</option>
                <option>I'm not sure yet</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Tell us about your vision</label>
              <textarea 
                rows={4} 
                className="w-full border border-gray-300 rounded-sm p-3 text-sm outline-none focus:border-black transition-colors resize-none mt-2" 
                placeholder="Include details about stones, metals, timeline, or any specific inspiration..."
              ></textarea>
            </div>

            <button type="submit" className="w-full bg-black text-white py-4 text-sm font-medium hover:bg-gray-800 transition-colors mt-8">
              Submit Request
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">By submitting, you agree to our Privacy Policy.</p>
          </form>
        </div>
      </div>
    </div>
  );
}
