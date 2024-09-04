// Henter referanser til HTML-elementer
const form = document.getElementById("projectForm");
const projectsList = document.getElementById("projectsList");
const projects = []; // Intern liste med vaner

//  --Submitting from projects form--
form.addEventListener("click", () => {
  event.preventDefault()
  const projectName = document.getElementById('projectName').value;
  const projectDescription = document.getElementById('projectDescription').value;
  const projectVersion = document.getElementById('projectVersion').value;
  if (!projectName || !projectDescription || !projectVersion) return;

  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <h3>${projectName}</h3>
    <p>${projectDescription}</p>
    <p>${projectVersion}</p>
    `;

  projectsList.appendChild(listItem)
  form.reset();
})


//  --Fetching from JSON file--
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    populateProjectsList(data)
  })
  .catch(error => console.error('Error fetching the JSON data:', error))

function populateProjectsList(projects) {

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