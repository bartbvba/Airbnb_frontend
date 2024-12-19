<template>
  <div class="airbnb-page">
    <h2>Available Camping Spots</h2>
    
    <!-- Location Filter -->
    <div class="filter-container">
      <label for="location">Filter by Location:</label>
      <select v-model="selectedLocation" @change="fetchCampingSpots" class="location-select">
        <option value="">All Locations</option>
        <option value="West-Vlaanderen, Flanders">West-Vlaanderen</option>
        <option value="Oost-Vlaanderen, Flanders">Oost-Vlaanderen</option>
        <option value="Antwerp, Flanders">Antwerp</option>
        <option value="Brussels-Capital Region, Brussels">Brussels</option>
        <option value="Liège, Wallonia">Liège</option>
        <option value="Luxembourg, Wallonia">Luxembourg</option>
        <option value="Namur, Wallonia">Namur</option>
      </select>
    </div>
    
    <!-- Display Camping Spots -->
    <div v-if="campingSpots.length === 0" class="no-camping">No camping spots available.</div>
    <div v-else class="camping-list">
      <div v-for="spot in campingSpots" :key="spot.camping_id" class="camping-card">
        <div class="camping-info">
          <h3>{{ spot.name }}</h3>
          <p class="location"><strong>Location:</strong> {{ spot.location }}</p>
          <p><strong>Price per night:</strong> ${{ spot.price_per_night }}</p>
        </div>
        <button @click="viewDetails(spot.camping_id)" class="details-button">View Details</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      campingSpots: [],
      selectedLocation: '',  // Store the selected location
    };
  },
  methods: {
    async fetchCampingSpots() {
      try {
        const locationQuery = this.selectedLocation ? `&location=${this.selectedLocation}` : '';
        const response = await this.$axios.get(`http://localhost:3000/api/campings?${locationQuery}`);
        this.campingSpots = response.data;
      } catch (error) {
        console.error('Error fetching campsites:', error);
      }
    },
    viewDetails(campingId) {
      // Redirect to the camping details page (implement the page if needed)
      this.$router.push(`/camping/${campingId}`);
    },
  },
  mounted() {
    this.fetchCampingSpots();  // Fetch camping spots when the page loads
  },
};
</script>

<style scoped>
/* Main page container */
.airbnb-page {
  font-family: 'Arial', sans-serif;
  padding: 30px;
  background-color: #f8f9fa;
}

h2 {
  font-size: 2.5em;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
  font-weight: bold;
}

/* Filter section */
.filter-container {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.filter-container label {
  font-size: 1.2em;
  margin-right: 10px;
  align-self: center;
}

.location-select {
  padding: 10px;
  font-size: 1.1em;
  border: 1px solid #ddd;
  border-radius: 6px;
  width: 250px;
  background-color: #fff;
  cursor: pointer;
}

.location-select:focus {
  outline: none;
  border-color: #4CAF50;
}

/* No camping message */
.no-camping {
  font-size: 1.5em;
  text-align: center;
  color: #888;
}

/* Camping spots list */
.camping-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

/* Camping card styling */
.camping-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: box-shadow 0.3s ease;
}

.camping-card:hover {
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.2);
}

/* Camping card content */
.camping-info {
  flex-grow: 1;
}

.camping-info h3 {
  font-size: 1.8em;
  color: #333;
  margin-bottom: 10px;
}

.camping-info .location {
  color: #555;
  font-size: 1.1em;
  margin-bottom: 15px;
}

/* Details button */
.details-button {
  background-color: #4CAF50;
  color: #fff;
  font-size: 1.1em;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  transition: background-color 0.3s ease;
}

.details-button:hover {
  background-color: #45a049;
}
</style>
