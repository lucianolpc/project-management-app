import { useState, useRef } from "react";

import SideBar from "./components/SideBar";
import ManageProject from "./components/ManageProject";

import Project from "./classes/Project.js";

function App() {
  // Estado responsável pela lista de projetos criados
  const [projects, setProjects] = useState([]);
  // Estado responsável por sinalizar se um projeto está sendo criado
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  // Estado responsável por sinalizar se um projeto está sendo editado/visualizado e qual.
  const [edit, setEdit] = useState(null);
  // Ref responsável por pegar o texto do input de task
  const taskInput = useRef();

  // Pega os dados do formulário, cria um projeto e adiciona na lista de projetos
  function createNewProject(event) {
    // Evita que o comportamento padrão do submit aconteça
    event.preventDefault();
    // Define as propriedades do projeto e o cria
    const id = crypto.randomUUID();
    const title = event.target[2].value;
    const description = event.target[3].value;
    const dueDate = event.target[4].value;
    const newProject = new Project(id, title, description, dueDate);
    // Adiciona o projeto no final da lista de projetos
    setProjects((prevProjects) => [...prevProjects, newProject]);
    // Sinaliza o fim da criação do projeto
    setIsCreatingProject(false);
  }
  // Sinaliza que um projeto está sendo criado (para abrir a tela de criação)
  function createProject() {
    setIsCreatingProject(true);
  }

  // Sinaliza que um projeto não está mais sendo criado (para sair da tela de criação)
  function cancelCreateProject() {
    setIsCreatingProject(false);
  }

  // Sinaliza que um projeto está sendo editado/visualizado (para abrir a tela de edição/visualização)
  function editProject(project) {
    // Também diz qual projeto deve ser editado/visualizado
    setEdit(project);
  }

  // Adiciona uma task na lista de tasks do projeto e recarrega a tela
  function addTask() {
    const newEdit = new Project(
      edit.id,
      edit.title,
      edit.description,
      edit.dueDate,
      edit.tasks
    );
    newEdit.addTask(taskInput.current.value);
    taskInput.current.value = "";
    setEdit(newEdit);
    setProjects((prevProjects) => {
      const newProjects = prevProjects.map((project) => {
        if (project.id === newEdit.id) {
          project.tasks = [...newEdit.tasks];
        }
        return project;
      });
      return newProjects;
    });
  }

  // Remove uma task na lista de tasks do projeto e recarrega a tela
  function clearTask(taskId) {
    setEdit((prevEdit) => {
      const newEdit = new Project(
        prevEdit.id,
        prevEdit.title,
        prevEdit.description,
        prevEdit.dueDate,
        prevEdit.tasks
      );
      newEdit.removeTask(taskId);
      return newEdit;
    });
  }

  // Deleta o projeto que estava sendo editado/visualizado e sinaliza que nenhum projeto está sendo editado/visualizado
  function deleteProject() {
    setProjects((prevProjects) => {
      const newProjects = prevProjects.filter(
        (project) => project.id != edit.id
      );
      return [...newProjects];
    });
    setEdit(null);
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar
        createProject={createProject}
        projects={projects}
        editProjects={editProject}
      />
      <ManageProject
        isCreating={isCreatingProject}
        projectToEdit={edit}
        createProject={createProject}
        cancelCreateProject={cancelCreateProject}
        addProjectHandler={createNewProject}
        deleteProjectHandler={deleteProject}
        taskRef={taskInput}
        taskHandler={addTask}
        clearTaskHandler={clearTask}
      />
    </main>
  );
}

export default App;
