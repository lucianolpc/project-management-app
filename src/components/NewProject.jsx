export default function NewProject({ onSubmit, onCancel }) {
  return (
    <div className="w-[35rem] mt-16">
      <form className="mt-4 text-left" onSubmit={onSubmit}>
        <div className="flex items-center justify-end gap-4 my-4">
          <button
            type="button"
            className="text-stone-800 hover:text-stone-950"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
          >
            Save
          </button>
        </div>
        <div className="flex-col">
          <Input label={"Title"} type="text" />
          <Input label={"Description"} type="description" />
          <Input label={"Due Date"} type="date" />
        </div>
      </form>
    </div>
  );
}

function Input({ label, type }) {
  return (
    <>
      <label className="text-sm font-bold uppercase text-stone-500">
        {label}
      </label>
      {type === "description" ? (
        <textarea className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600" />
      ) : (
        <input
          type={type}
          className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
        />
      )}
    </>
  );
}
