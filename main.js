// Henter referanser til HTML-elementer
const form = document.getElementById("projectForm");
const projectsList = document.getElementById("projectsList");
const projects = []; // Intern liste med vaner

function loadFromJson() {
  fetch("http://localhost:3999/json")
  .then((response) => response.json())
  .then((data) => {
    projects.push(...data);
    updateProjectsList()
  })
}


//  --Submitting from projects form--
// form.addEventListener("click", () => {
//   event.preventDefault()
//   const projectName = document.getElementById('projectName').value;
//   const projectDescription = document.getElementById('projectDescription').value;
//   const projectVersion = document.getElementById('projectVersion').value;
//   if (!projectName || !projectDescription || !projectVersion) return;

//   const newProject = {
//     UUID: crypto.randomUUID(),
//     name: projectName,
//     description: projectDescription,
//     version: projectVersion,
//     createdAt: new Date()
//   }

//   projects.push(newProject)
//   updateProjectsList()
//   form.reset();
// })

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  const projectName = document.getElementById('projectName').value;
  const projectDescription = document.getElementById('projectDescription').value;
  const projectVersion = document.getElementById('projectVersion').value;
  if (!projectName || !projectDescription || !projectVersion) return;

  const newProject = {
    UUID: crypto.randomUUID(),
    name: projectName,
    description: projectDescription,
    version: projectVersion,
    createdAt: new Date()
  }  

  projects.push(newProject)
  updateProjectsList();
  form.reset();

  try {
    const response = await fetch("http://localhost:3999/submit-project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    });

    if (response.status === 201) {
      console.log("Project saved to server");
    } else {
      console.error("Error saving project to server");
    }
  } catch (error) {
    console.error("Error sending project to server", error);
  }
});



//  --Fetching from JSON file--
// fetch('data.json')
//   .then(response => response.json())
//   .then(data => {
//     data.forEach(item => {
//       const newProject = {
//         UUID: item.UUID,
//         name: item.name,
//         description: item.description,
//         version: item.version,
//         createdAt: new Date(item.createdAt)
//       };

//       projects.push(newProject);
//     })

//     updateProjectsList()
//   })
//   .catch(error => console.error('Error fetching the JSON data:', error))

function updateProjectsList() {
  console.log(projects)
  projectsList.innerHTML = ""; //empty list

  projects.forEach(project => {
    const listItem = document.createElement('li');

    listItem.innerHTML = `
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <p>${project.version}</p>
    `;

    projectsList.appendChild(listItem);
  });
}

function loadFromAPI() {
  fetch("http://localhost:3999")
    .then(response => response.json())
    .then((data) => {
      projects.push(...data);
      updateProjectsList();
    })
    .catch(error => {
      console.error("Error fetching data from server", error);
    });
}

loadFromJson();
loadFromAPI();