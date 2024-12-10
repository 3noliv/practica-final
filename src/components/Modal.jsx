export default function Modal({ isOpen, title, content, buttons, icon }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        {icon && (
          <div className="flex justify-center items-center mb-4">
            <div className="bg-blue-100 text-blue-500 rounded-full w-16 h-16 flex items-center justify-center">
              <i className={`fas fa-${icon} text-3xl`}></i>
            </div>
          </div>
        )}
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{content}</p>
        <div className="flex justify-center gap-4">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={`${
                button.className ||
                "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              }`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
