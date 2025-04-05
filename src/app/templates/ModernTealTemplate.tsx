// Define layout configuration for Modern Teal Template
export const ModernTealLayoutConfig = {
  zones: [
    { id: 'side-column', name: 'Side Column', width: '25%', height: '100%' },
    { id: 'main-content', name: 'Main Content', width: '75%', height: '100%' },
  ],
};

export default function ModernTealTemplate({ sections }: { sections: any[] }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-1 bg-gray-100 p-4 overflow-hidden">
        {sections
          .filter((section) => section.zone === 'side-column')
          .map((section) => (
            <div key={section.id} className="mb-4">
              {section.content}
            </div>
          ))}
      </div>
      <div className="col-span-3 bg-white p-4 overflow-hidden">
        {sections
          .filter((section) => section.zone === 'main-content')
          .map((section) => (
            <div key={section.id} className="mb-4">
              {section.content}
            </div>
          ))}
      </div>
    </div>
  );
}