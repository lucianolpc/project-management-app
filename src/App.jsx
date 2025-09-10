import { useState } from "react";

import SideBar from "./components/SideBar";
import ManageProject from "./components/ManageProject";

import Project from "./classes/Project.js";

function App() {
  const [projects, setProjects] = useState([]);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [isEditingProject, setIsEditingProject] = useState(false);

  // Pega os dados do formulário, cria um projeto e adiciona na lista de projetos
  function createNewProject(event) {
    //Evita que o comportamento padrão do submit aconteça
    event.preventDefault();
    const title = event.target[2].value;
    const description = event.target[3].value;
    const dueDate = event.target[4].value;
    const newProject = new Project(title, description, dueDate);
    setProjects(prevProjects => [...prevProjects, newProject]);
    setIsCreatingProject(false);
    console.log(projects);
  }
  // Abre a "tela" de criação de projeto
  function createProject() {
    setIsCreatingProject(true);
  }

  function cancelCreateProject() {
    setIsCreatingProject(false);
  }

  function editProject() {
    setIsEditingProject(true);
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar createProject={createProject} projects={projects} />
      <ManageProject
        isCreating={isCreatingProject}
        isEditing={isEditingProject}
        createProject={createProject}
        cancelCreateProject={cancelCreateProject}
        addProject={createNewProject}
      />
    </main>
  );
}

export default App;
