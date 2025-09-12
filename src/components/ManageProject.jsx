import noProjectsImage from "../assets/no-projects.png";

import NewProject from "./NewProject";

export default function ManageProject({
  isCreating,
  projectToEdit,
  createProject,
  cancelCreateProject,
  addProjectHandler,
  deleteProjectHandler,
  taskRef,
  taskHandler,
  clearTaskHandler,
}) {
  return (
    <>
      {isCreating && (
        <NewProject
          onSubmit={addProjectHandler}
          onCancel={cancelCreateProject}
        />
      )}
      {!isCreating && projectToEdit == null && (
        <div className="mt-24 text-center w-2/3">
          <img
            src={noProjectsImage}
            alt="no projects image"
            className="w-16 h-16 object-contain mx-auto"
          />
          <h2 className="text-xl font-bold text-stone-500 my-4">
            No Project Selected
          </h2>
          <p className="text-stone-400 mb-4">
            Select a project or get started with a new one
          </p>
          <button
            className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
            onClick={createProject}
          >
            Create new project
          </button>
        </div>
      )}
      {!isCreating && projectToEdit != null && (
        <div className="mt-24 text-center w-2/3">
          <header className="pb-4 mb-4 border-b-2 border-stone-300 flex">
            <div className="w-full text-left">
              <h1 className="text-3xl font-bold text-stone-600 mb-2">
                {projectToEdit.title}
              </h1>
              <p className="mb-4 text-stone-400">
                {projectToEdit.formatedDate()}
              </p>
              <p className="text-stone-600 whitespace-pre-wrap">
                {projectToEdit.description}
              </p>
            </div>
            <div>
              <button
                className="text-stone-700 hover:text-stone-950"
                onClick={deleteProjectHandler}
              >
                Delete
              </button>
            </div>
          </header>
          <section className="text-left">
            <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
            <div className="flex gap-4">
              <input
                type="text"
                className="w-64 px-2 py-1 rounded-sm bg-stone-200"
                ref={taskRef}
              />
              <button
                type="button"
                className="text-stone-700 hover:text-stone-950"
                onClick={taskHandler}
              >
                Add task
              </button>
            </div>
            <div>
              {projectToEdit.tasks.length > 0 ? (
                <ul className="p-4 mt-8 rounded-md bg-stone-100">
                  {projectToEdit.tasks.map((task) => {
                    return (
                      <li className="flex justify-between my-4" key={task.id}>
                        <p>{task.name}</p>
                        <button
                          className="text-stone-700 hover:text-red-500"
                          onClick={() => clearTaskHandler(task.id)}
                        >
                          Clear
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-stone-800 my-4">
                  This project does not have any tasks yet.
                </p>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
