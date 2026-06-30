// WRITE YOUR JS CODE 

let sidebars = document.getElementById("#sidebar");
const navLinks = document.querySelectorAll('.nav-link'); 
const sections = document.querySelectorAll('.content-section');
const apodImage = document.getElementById('apod-image');
const apodTitle = document.getElementById('apod-title');
const apodExplanation = document.getElementById('apod-explanation');
const apodDate = document.getElementById('apod-date');
const launchesCount = document.getElementById('launches-count'); 
const featuredLaunchName = document.getElementById('featured-launch-name');
const featuredLaunchProvider = document.getElementById('featured-launch-provider');
const featuredLaunchLocation = document.getElementById('featured-launch-location');
const featuredLaunchImage = document.getElementById('featured-launch-image');
const launchesGrid = document.getElementById('launches-grid');
const planetCards = document.querySelectorAll('.planet-card');
const planetDetailImage = document.getElementById('planet-detail-image');
const planetDetailName = document.getElementById('planet-detail-name');
const planetDetailDescription = document.getElementById('planet-detail-description');
const planetDistance = document.getElementById('planet-distance');
const planetRadius = document.getElementById('planet-radius');
const planetMass = document.getElementById('planet-mass');
const planetDensity = document.getElementById('planet-density');
const planetOrbitalPeriod = document.getElementById('planet-orbital-period');
const planetRotation = document.getElementById('planet-rotation');
const planetMoons = document.getElementById('planet-moons');
const planetGravity = document.getElementById('planet-gravity');
const planetDiscoverer = document.getElementById('planet-discoverer');
const planetDiscoveryDate = document.getElementById('planet-discovery-date');
const planetBodyType = document.getElementById('planet-body-type');
const planetVolume = document.getElementById('planet-volume');
const planetPerihelion = document.getElementById('planet-perihelion');
const planetAphelion = document.getElementById('planet-aphelion');
const planetEccentricity = document.getElementById('planet-eccentricity');
const planetInclination = document.getElementById('planet-inclination');
const planetAxialTilt = document.getElementById('planet-axial-tilt');
const planetTemp = document.getElementById('planet-temp');
const planetEscape = document.getElementById('planet-escape');
// active link when click 
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        sections.forEach(section => {
            section.classList.add('hidden');
        });
        const targetSectionId = link.getAttribute('data-section'); 
        const targetSection = document.getElementById(targetSectionId);

        if (targetSection) {
            targetSection.classList.remove('hidden');
        }

        navLinks.forEach(btn => {
            btn.classList.remove('bg-blue-500/10', 'text-blue-400');
            btn.classList.add('text-slate-300', 'hover:bg-slate-800');
        }); 
        
        link.classList.remove('text-slate-300', 'hover:bg-slate-800');
        link.classList.add('bg-blue-500/10', 'text-blue-400'); 
    });
});


async function fetchApodData() {
    try {
        const apiKey = 'Camc5qf5LcqqXlNYdbS6CXYySgshDOqbBga6PFHc';
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const data = await response.json();
        console.log("NASA APOD Data:", data);

        if (apodImage) {
            apodImage.src = data.url;
            apodImage.alt = data.title;
        }
        if (apodTitle) {
            apodTitle.innerText = data.title;
        }
        if (apodExplanation) {
            apodExplanation.innerText = data.explanation;
        }
        if (apodDate) {
            apodDate.innerText = data.date;
        }

    } catch (error) {
        console.error("An error occurred while fetching the APOD data:", error);
    }
}

async function fetchUpcomingLaunches() {
    try {
        const response = await fetch('https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10');
        
        if (!response.ok) {
            throw new Error(`Failed to fetch launches: ${response.status}`);
        }

        const data = await response.json();
        const launches = data.results; 
        console.log("Launches Data:", launches);


        if (launchesCount) {
            launchesCount.innerText = launches.length;
        }

        if (launches.length > 0) {
            const featured = launches[0];
            
            if (featuredLaunchName) featuredLaunchName.innerText = featured.name || 'No Name';
            if (featuredLaunchProvider) featuredLaunchProvider.innerText = featured.launch_service_provider?.name || 'Unknown';
            if (featuredLaunchLocation) featuredLaunchLocation.innerText = featured.pad?.location?.name || 'Unknown';
            
            if (featuredLaunchImage) {
                featuredLaunchImage.src = featured.image?.image_url || 'https://via.placeholder.com/600x400';
                featuredLaunchImage.alt = featured.name || 'Featured Launch';
            }

            if (launchesGrid) {
                launchesGrid.innerHTML = ''; 

                const remainingLaunches = launches.slice(1); 

                remainingLaunches.forEach(launch => {
                    const card = document.createElement('div');
                    card.className = "bg-slate-900/50 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all";

                  
                    const cardImageUrl = launch.image?.image_url || 'https://via.placeholder.com/300x150';

                    card.innerHTML = `
                        <img src="${cardImageUrl}" class="w-full h-42 object-cover rounded-lg mb-4" alt="${launch.name || ''}">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
                                ${launch.launch_service_provider?.name || 'Private'}
                            </span>
                        </div>
                        <h3 class="text-base font-bold text-white mt-2 line-clamp-1" title="${launch.name}">${launch.name || 'No Title'}</h3>
                        <p class="text-xs text-slate-400 mt-1 flex items-center gap-1">
                            <i class="fas fa-map-marker-alt text-slate-500"></i> 
                            <span class="line-clamp-1">${launch.pad?.location?.name || 'Unknown'}</span>
                        </p>
                    `;
                    launchesGrid.appendChild(card);
                });
            }
        }

    } catch (error) {
        console.error("An error occurred while fetching upcoming launches:", error);
    }
}



const planetImages = {
    mercury: './assets/images/mercury.png',
    venus: './assets/images/venus.png',
    earth: './assets/images/earth.png',
    mars: './assets/images/mars.png',
    jupiter: './assets/images/jupiter.png',
    saturn: './assets/images/saturn.png',
    uranus: './assets/images/uranus.png',
    neptune: './assets/images/neptune.png',
};


async function fetchPlanetsData() {
    try {
        const response = await fetch('https://solar-system-opendata-proxy.vercel.app/api/planets');

        if (!response.ok) {
            throw new Error(`Failed to fetch planets: ${response.status}`);
        }

        const data = await response.json();
        const planets = data.bodies || data;
        console.log("Planets Data:", planets);

        function renderPlanet(selectedPlanet, planetId) {
            if (planetDetailImage) {
                planetDetailImage.src = planetImages[planetId] || './assets/images/earth.png';
                planetDetailImage.alt = selectedPlanet.englishName;
            }

            if (planetDetailName) planetDetailName.innerText = selectedPlanet.englishName;
            if (planetDetailDescription) {
                planetDetailDescription.innerText =
                    `${selectedPlanet.englishName} is a ${selectedPlanet.isPlanet ? 'planet' : 'celestial body'} in our Solar System, ` +
                    `located around ${selectedPlanet.aroundPlanet ? selectedPlanet.aroundPlanet.planet : 'the Sun'} with a mean radius of ${selectedPlanet.meanRadius} km.`;
            }

            if (planetDistance) planetDistance.innerText = selectedPlanet.semimajorAxis ? `${selectedPlanet.semimajorAxis.toLocaleString()} km` : 'N/A';
            if (planetRadius) planetRadius.innerText = selectedPlanet.meanRadius ? `${selectedPlanet.meanRadius.toLocaleString()} km` : 'N/A';
            if (planetDensity) planetDensity.innerText = selectedPlanet.density ? `${selectedPlanet.density} g/cm³` : 'N/A';
            if (planetOrbitalPeriod) planetOrbitalPeriod.innerText = selectedPlanet.sideralOrbit ? `${Math.round(selectedPlanet.sideralOrbit)} days` : 'N/A';
            if (planetRotation) planetRotation.innerText = selectedPlanet.sideralRotation ? `${Math.round(selectedPlanet.sideralRotation)} hours` : 'N/A';
            if (planetGravity) planetGravity.innerText = selectedPlanet.gravity ? `${selectedPlanet.gravity} m/s²` : 'N/A';

            if (planetMoons) {
                planetMoons.innerText = selectedPlanet.moons ? selectedPlanet.moons.length : 0;
            }

            if (planetMass) {
                planetMass.innerText = selectedPlanet.mass
                    ? `${selectedPlanet.mass.massValue} × 10^${selectedPlanet.mass.massExponent} kg`
                    : 'N/A';
            }

            if (planetVolume) {
                planetVolume.innerText = selectedPlanet.vol
                    ? `${selectedPlanet.vol.volValue} × 10^${selectedPlanet.vol.volExponent} km³`
                    : 'N/A';
            }

            if (planetDiscoverer) planetDiscoverer.innerText = selectedPlanet.discoveredBy || 'Known since antiquity';
            if (planetDiscoveryDate) planetDiscoveryDate.innerText = selectedPlanet.discoveryDate || 'Ancient';
            if (planetBodyType) planetBodyType.innerText = selectedPlanet.bodyType || 'Planet';

            if (planetPerihelion) planetPerihelion.innerText = selectedPlanet.perihelion ? `${selectedPlanet.perihelion.toLocaleString()} km` : 'N/A';
            if (planetAphelion) planetAphelion.innerText = selectedPlanet.aphelion ? `${selectedPlanet.aphelion.toLocaleString()} km` : 'N/A';
            if (planetEccentricity) planetEccentricity.innerText = selectedPlanet.eccentricity ?? 'N/A';
            if (planetInclination) planetInclination.innerText = selectedPlanet.inclination !== undefined ? `${selectedPlanet.inclination}°` : 'N/A';
            if (planetAxialTilt) planetAxialTilt.innerText = selectedPlanet.axialTilt !== undefined ? `${selectedPlanet.axialTilt}°` : 'N/A';
            if (planetTemp) planetTemp.innerText = selectedPlanet.avgTemp ? `${selectedPlanet.avgTemp - 273.15 | 0}°C` : 'N/A';
            if (planetEscape) planetEscape.innerText = selectedPlanet.escape ? `${(selectedPlanet.escape / 1000).toFixed(2)} km/s` : 'N/A';
        }

        planetCards.forEach(card => {
            card.addEventListener('click', () => {
                const planetId = card.getAttribute('data-planet-id').toLowerCase();

                planetCards.forEach(c => c.classList.remove('ring-2', 'ring-red-500'));
                card.classList.add('ring-2', 'ring-red-500');

                const selectedPlanet = planets.find(p =>
                    p.id.toLowerCase() === planetId ||
                    p.englishName.toLowerCase() === planetId
                );

                if (selectedPlanet) {
                    renderPlanet(selectedPlanet, planetId);
                } else {
                    console.warn(`Planet not found for id: ${planetId}`);
                }
            });
        });

        if (planetCards.length > 0) {
            planetCards[0].click();
        }

    } catch (error) {
        console.error("An error occurred while fetching planets data:", error);
    }
}

fetchPlanetsData();
fetchApodData();
fetchUpcomingLaunches();