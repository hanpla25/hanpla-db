export default function Form() {
  return (
    <form
      action=""
      className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-md flex items-center gap-2"
    >
      <label htmlFor="text" className="sr-only">
        내용
      </label>

      <div className="relative flex-1">
        <input
          id="text"
          type="text"
          placeholder="내용"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          className="absolute top-1/2 right-2 -translate-y-1/2 text-sm text-blue-500 hover:underline"
        >
          첨부
        </button>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        저장
      </button>
    </form>
  );
}
