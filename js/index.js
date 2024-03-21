const ipAddress = document.getElementById('ip-address')
const ipLocation = document.getElementById('location')
const timeOffset = document.getElementById('time-offset')
const isp = document.getElementById('isp')
const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')

const updateIpInfo = ({ ip, company, location: { city, state, local_time } }) => {
  ipAddress.textContent = ip
  ipLocation.textContent = `${city}, ${state}`
  timeOffset.textContent = local_time.match(/[+-]\d{2}:\d{2}$/)
  isp.textContent = company.name
}

const updateMap = (lat, long) => {
  const map = L.map('map').setView([lat, long], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  L.marker([lat, long]).addTo(map)
}

const updateUI = async (ip = '') => {
  const apiKey = "80d3389b5f23e283"
  const url = `https://api.ipapi.is?q=${ip}&key=${apiKey}`
  try {
    const response = await fetch(url)
    const ipDetails = await response.json()
    const { location: { latitude, longitude } } = ipDetails
    updateIpInfo(ipDetails)
    updateMap(latitude,longitude)
  } catch (err) {
    console.error(err)
  }
}
searchForm.addEventListener('submit',(e) => {
  e.preventDefault()
  updateUI(searchInput.textContent)
})
updateUI()