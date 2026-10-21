// All 28 states and 8 union territories of India, alphabetical, each with its
// major cities (alphabetical). Forms offer "Other" under every state for cities
// not listed, so this list only needs the well-known ones.

export const INDIA_LOCATIONS = {
  "Andaman & Nicobar Islands": ["Port Blair"],
  "Andhra Pradesh": ["Amaravati", "Anantapur", "Eluru", "Guntur", "Kadapa", "Kakinada", "Kurnool", "Nellore", "Ongole", "Rajahmundry", "Tirupati", "Vijayawada", "Visakhapatnam", "Vizianagaram"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tawang"],
  "Assam": ["Bongaigaon", "Dibrugarh", "Guwahati", "Jorhat", "Nagaon", "Silchar", "Tezpur", "Tinsukia"],
  "Bihar": ["Ara", "Begusarai", "Bhagalpur", "Bihar Sharif", "Darbhanga", "Gaya", "Muzaffarpur", "Patna", "Purnia", "Saharsa"],
  "Chandigarh": ["Chandigarh"],
  "Chhattisgarh": ["Bhilai", "Bilaspur", "Durg", "Jagdalpur", "Korba", "Raigarh", "Raipur", "Rajnandgaon"],
  "Dadra & Nagar Haveli and Daman & Diu": ["Daman", "Diu", "Silvassa"],
  "Delhi": ["New Delhi"],
  "Goa": ["Margao", "Mapusa", "Panaji", "Ponda", "Vasco da Gama"],
  "Gujarat": ["Ahmedabad", "Anand", "Bharuch", "Bhavnagar", "Gandhinagar", "Jamnagar", "Junagadh", "Mehsana", "Nadiad", "Navsari", "Rajkot", "Surat", "Vadodara", "Vapi"],
  "Haryana": ["Ambala", "Bhiwani", "Faridabad", "Gurugram", "Hisar", "Karnal", "Kurukshetra", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
  "Himachal Pradesh": ["Dharamshala", "Hamirpur", "Kullu", "Mandi", "Shimla", "Solan", "Una"],
  "Jammu & Kashmir": ["Anantnag", "Baramulla", "Jammu", "Kathua", "Srinagar", "Udhampur"],
  "Jharkhand": ["Bokaro", "Deoghar", "Dhanbad", "Giridih", "Hazaribagh", "Jamshedpur", "Ramgarh", "Ranchi"],
  "Karnataka": ["Belagavi", "Bellary", "Bengaluru", "Bidar", "Davanagere", "Hubballi-Dharwad", "Kalaburagi", "Mangaluru", "Mysuru", "Shivamogga", "Tumakuru", "Udupi", "Vijayapura"],
  "Kerala": ["Alappuzha", "Kannur", "Kochi", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Thiruvananthapuram", "Thrissur"],
  "Ladakh": ["Kargil", "Leh"],
  "Lakshadweep": ["Kavaratti"],
  "Madhya Pradesh": ["Bhopal", "Chhindwara", "Dewas", "Gwalior", "Indore", "Jabalpur", "Katni", "Ratlam", "Rewa", "Sagar", "Satna", "Ujjain"],
  "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Chandrapur", "Dhule", "Jalgaon", "Kolhapur", "Latur", "Mumbai", "Nagpur", "Nanded", "Nashik", "Navi Mumbai", "Pune", "Sangli", "Satara", "Solapur", "Thane"],
  "Manipur": ["Churachandpur", "Imphal", "Thoubal"],
  "Meghalaya": ["Shillong", "Tura"],
  "Mizoram": ["Aizawl", "Lunglei"],
  "Nagaland": ["Dimapur", "Kohima", "Mokokchung"],
  "Odisha": ["Balasore", "Berhampur", "Bhubaneswar", "Cuttack", "Puri", "Rourkela", "Sambalpur"],
  "Puducherry": ["Karaikal", "Mahe", "Puducherry", "Yanam"],
  "Punjab": ["Amritsar", "Bathinda", "Hoshiarpur", "Jalandhar", "Ludhiana", "Mohali", "Moga", "Pathankot", "Patiala"],
  "Rajasthan": ["Ajmer", "Alwar", "Bharatpur", "Bhilwara", "Bikaner", "Jaipur", "Jodhpur", "Kota", "Sikar", "Sri Ganganagar", "Udaipur"],
  "Sikkim": ["Gangtok", "Namchi"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Dindigul", "Erode", "Hosur", "Kanchipuram", "Madurai", "Salem", "Thanjavur", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tiruppur", "Vellore"],
  "Telangana": ["Hyderabad", "Karimnagar", "Khammam", "Mahbubnagar", "Nalgonda", "Nizamabad", "Secunderabad", "Warangal"],
  "Tripura": ["Agartala", "Dharmanagar", "Udaipur"],
  "Uttar Pradesh": ["Agra", "Aligarh", "Ayodhya", "Bareilly", "Firozabad", "Ghaziabad", "Gorakhpur", "Greater Noida", "Jhansi", "Kanpur", "Lucknow", "Mathura", "Meerut", "Moradabad", "Muzaffarnagar", "Noida", "Prayagraj", "Saharanpur", "Varanasi"],
  "Uttarakhand": ["Dehradun", "Haldwani", "Haridwar", "Nainital", "Rishikesh", "Roorkee", "Rudrapur"],
  "West Bengal": ["Asansol", "Bardhaman", "Darjeeling", "Durgapur", "Haldia", "Howrah", "Kharagpur", "Kolkata", "Malda", "Siliguri"],
};

export const INDIA_STATES = Object.keys(INDIA_LOCATIONS);

export const OTHER_CITY = "Other";

export const citiesFor = (state) => INDIA_LOCATIONS[state] || [];
