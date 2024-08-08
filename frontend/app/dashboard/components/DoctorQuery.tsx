import { useState, useEffect } from 'react';

const DoctorQuery: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([
    {
      id: 1,
      name: 'John Doe',
      disease: 'Rare Genetic Disorder',
    },
    {
      id: 2,
      name: 'Jane Smith',
      disease: 'Rare Autoimmune Condition',
    },
    {
      id: 3,
      name: 'Michael Johnson',
      disease: 'Rare Neurological Disorder',
    },
  ]);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const handleSearch = () => {
    const filtered = searchResults.filter((result) =>
      result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.disease.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredResults(filtered);
  };

  const handleRequestAccess = (patientId: number) => {
    console.log(`Requested access for patient with ID: ${patientId}`);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Decentralized Rare Disease Registry</h1>
      <form className="mb-4">
        <input
          type="text"
          placeholder="Search for patients or diseases"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
      </form>
      <div className="space-y-4">
        {filteredResults.map((result) => (
          <div
            key={result.id}
            className="bg-white shadow-md rounded-md p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-bold text-gray-900">{result.name}</h3>
              <p className="text-gray-500 text-gray-900">{result.disease}</p>
            </div>
            <button
              onClick={() => handleRequestAccess(result.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
            >
              Request Access
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorQuery;