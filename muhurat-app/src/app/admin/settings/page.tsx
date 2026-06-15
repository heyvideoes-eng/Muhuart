export default function AdminSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-light mb-8">Store Options & Settings</h1>
      
      <div className="space-y-8">
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-medium mb-4">General Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
              <input type="text" defaultValue="MUHURAT ESSENTIALS" className="w-full border border-gray-300 rounded p-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
              <input type="email" defaultValue="contact@muhurat.com" className="w-full border border-gray-300 rounded p-2 text-sm" />
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-medium mb-4">Global Product Options</h2>
          <p className="text-sm text-gray-500 mb-4">Define default variant options available across your catalog.</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-100 rounded bg-gray-50">
              <div>
                <p className="font-medium">Ring Sizes</p>
                <p className="text-xs text-gray-500">Values: 5, 6, 7, 8, 9, 10</p>
              </div>
              <button className="text-sm border border-gray-300 px-3 py-1 rounded bg-white hover:bg-gray-50">Edit Options</button>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-100 rounded bg-gray-50">
              <div>
                <p className="font-medium">Materials</p>
                <p className="text-xs text-gray-500">Values: Antique Gold, Rose Gold, Silver</p>
              </div>
              <button className="text-sm border border-gray-300 px-3 py-1 rounded bg-white hover:bg-gray-50">Edit Options</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
