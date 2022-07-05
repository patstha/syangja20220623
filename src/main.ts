import './style.css'

type Coordinates = {
  latitude: number,
  longitude: number,
  altitude: number
}

type Geometry = {
  type: string,
  coordinates: Coordinates
}

type Meta = {
  updatedAt: Date
}

type Properties = {
  meta: Meta,
}

type WeatherResponse = {
  geometry: Geometry,
  properties: Properties
}

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello Syangja!</h1>
  <p class="text-success">my name is pratikchhya</p>
`
const hero = kushal("/biruwa.jpeg", "biruwa,syangja");
app.appendChild(hero);
getWeatherData(33.039631, -97.028935);

function kushal(address: string, alt: string): HTMLImageElement {
  const el = new Image();
  el.src = address;
  el.alt = alt;
  el.classList.add("img");
  el.classList.add("img-responsive");
  el.classList.add("img-thumbnail");
  return el;
}

// https://api.met.no/weatherapi/locationforecast/2.0/complete.json?lat=33.039631&lon=-97.028935

function getWeatherData(latitude: number, longitude: number) {
  fetch(`https://api.met.no/weatherapi/locationforecast/2.0/complete.json?lat=${latitude}&lon=${longitude}`)
    .then(response => response.json())
    .then((data) => {
      console.info({ data });
      if (data?.geometry?.coordinates?.length === 3) {
        const myCoordinates: Coordinates = {
          longitude: data.geometry.coordinates[0],
          latitude: data.geometry.coordinates[1],
          altitude: data.geometry.coordinates[2],
        };
        const myGeometry: Geometry = {
          coordinates: myCoordinates,
          type: data?.geometry?.type
        };
        const myMeta: Meta = {
          updatedAt: new Date(data?.properties?.meta?.updated_at)
        }
        const myProperties: Properties = {
          meta: myMeta,
        }
        const myWeatherResponse: WeatherResponse = {
          geometry: myGeometry,
          properties: myProperties
        }
        console.info({ myWeatherResponse });
        const coordinatesText = document.createElement("p");
        coordinatesText.innerHTML = `Here is the current weather, updated at ${myWeatherResponse.properties.meta.updatedAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}. `;
        app.appendChild(coordinatesText);
        const preText = document.createElement("pre");
        preText.innerHTML = JSON.stringify(data, null, 2);
        preText.style.whiteSpace = "pre-wrap";
        preText.style.textAlign = "left";
        app.appendChild(preText);
      }
    })
};