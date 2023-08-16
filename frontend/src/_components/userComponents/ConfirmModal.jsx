import { AiOutlineClose } from 'react-icons/ai'

function ConfirmModal({ setShowModal }) {
  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-end p-2 border-slate-200 rounded-t">
            <button onClick={() => setShowModal(false)}>
              <span className="text-red-500">
                <AiOutlineClose />
              </span>
            </button>
          </div>
          {/*body*/}
          <div className="bg-white rounded p-4 w-64">
            <p className="mb-4">Do you want to cancel the appointment?</p>
            <div className="flex justify-end">
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 mr-2 rounded"
                onClick={() => setShowModal(false)}
              >
                No
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}

export default ConfirmModal;
