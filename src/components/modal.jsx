export default function Modal({ message, onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div
                className="bg-white rounded-[20px] shadow-md flex flex-col justify-center items-center text-center p-6"
                style={{ width: "514px", height: "198px" }}
            >
                <p className="font-inter font-bold text-[20px] leading-[100%] mb-6">
                    {message}
                </p>
                <button
                    className="bg-[#34AC40] text-white rounded font-bold"
                    style={{ width: "154px", height: "40px" }}
                    onClick={onClose}
                >
                    OK
                </button>
            </div>
        </div>
    );
}
