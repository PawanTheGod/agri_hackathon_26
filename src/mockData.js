// src/mockData.js
// Fake sensor & advisory data for Indian farming assistant app

export const sensorNodes = [
  {
    id: 'node_1',
    label: 'Node 1',
    labelLine1: 'Node 1',
    labelLine2: '(उत्तर - North)',
    moisture: 68,
    ec: 1.4,
    temperature: 28,
    status: 'green',
    latitude: 18.5204, // Near Pune
    longitude: 73.8567,
  },
  {
    id: 'node_2',
    label: 'Node 2',
    labelLine1: 'Node 2',
    labelLine2: '(दक्षिण - South)',
    moisture: 42,
    ec: 2.1,
    temperature: 31,
    status: 'amber',
    latitude: 18.5194,
    longitude: 73.8567,
  },
  {
    id: 'node_3',
    label: 'Node 3',
    labelLine1: 'Node 3',
    labelLine2: '(पूर्व - East)',
    moisture: 81,
    ec: 0.9,
    temperature: 27,
    status: 'green',
    latitude: 18.5199,
    longitude: 73.8577,
  },
  {
    id: 'node_4',
    label: 'Node 4',
    labelLine1: 'Node 4',
    labelLine2: '(पश्चिम - West)',
    moisture: 23,
    ec: 3.2,
    temperature: 34,
    status: 'red',
    latitude: 18.5199,
    longitude: 73.8557,
  },
];

export const npkValues = {
  N: 42,
  P: 18,
  K: 65,
  pH: 6.8,
  // Thresholds for color coding
  thresholds: {
    N: { min: 50, unit: 'kg/ha' },
    P: { min: 25, unit: 'kg/ha' },
    K: { min: 50, unit: 'kg/ha' },
    pH: { min: 6.0, max: 7.5, unit: '' },
  },
};

export const advisory = {
  irrigation: {
    title: 'सिंचाई सलाह',
    titleEn: 'Irrigation Advisory',
    text: 'Node 4 में नमी का स्तर 23% तक गिर गया है। अगले 24 घंटों में 35mm सिंचाई करें। Node 2 में EC 2.1 है, जो सामान्य सीमा से थोड़ा अधिक है — अगले 3 दिनों तक सिंचाई न करें।',
    textEn:
      'Node 4 moisture has dropped to 23%. Apply 35mm irrigation in the next 24 hours. Node 2 EC is 2.1, slightly above normal — avoid irrigation for the next 3 days.',
    audioUrl: '',
  },
  nutrients: {
    title: 'पोषक तत्व सलाह',
    titleEn: 'Nutrient Advisory',
    text: 'नाइट्रोजन (N: 42) और फॉस्फोरस (P: 18) की मात्रा कम है। प्रति हेक्टेयर 50kg DAP और 25kg Urea डालें। पोटाश (K: 65) सामान्य है, अभी कोई कार्रवाई आवश्यक नहीं।',
    textEn:
      'Nitrogen (N: 42) and Phosphorus (P: 18) are below optimal levels. Apply 50kg DAP and 25kg Urea per hectare. Potassium (K: 65) is normal — no action needed.',
    audioUrl: '',
  },
  nextCrop: {
    title: 'अगली फसल सिफारिश',
    titleEn: 'Next Crop Recommendation',
    text: 'मिट्टी के pH (6.8) और पोषक तत्वों के आधार पर सोयाबीन या तुअर दाल की खेती करना उचित रहेगा। बुआई से पहले 2 टन/हेक्टेयर जैविक खाद मिलाएं।',
    textEn:
      'Based on soil pH (6.8) and nutrient profile, Soybean or Tur Dal cultivation is recommended. Mix 2 tonnes/hectare organic compost before sowing.',
    audioUrl: '',
  },
};
