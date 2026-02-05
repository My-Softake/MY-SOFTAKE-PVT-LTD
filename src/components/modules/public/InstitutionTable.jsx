 
const institutions = [
  {
    id: 1,
    name: "Viqarunnisa school and College",
    type: "college",
    students: 2,
    staff: 1,
    revenue: 1600000,
    status: "Active",
  },
  {
    id: 2,
    name: "Police Line High School",
    type: "school",
    students: 1,
    staff: 1,
    revenue: 300000,
    status: "Active",
  },
  {
    id: 3,
    name: "Pilot High School",
    type: "school",
    students: 2,
    staff: 2,
    revenue: 1000000,
    status: "Active",
  },
  {
    id: 4,
    name: "University of Dhaka",
    type: "university",
    students: 2,
    staff: 1,
    revenue: 9000000,
    status: "Active",
  },
  {
    id: 5,
    name: "Tech Land Institute",
    type: "college",
    students: 1,
    staff: 1,
    revenue: 600000,
    status: "Active",
  },
];

 
const getTypeStyle = (type) => {
  switch (type.toLowerCase()) {
    case 'college':
      return 'bg-green-100 text-green-700';
    case 'school':
      return 'bg-blue-100 text-blue-700';
    case 'university':
      return 'bg-purple-100 text-purple-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

 
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
  }).format(amount).replace('BDT', '৳'); 
};

export default function InstitutionTable() {
  return (
    <div className="w-200 bg-gray-50 p-6 ">
      
      <div className="w-full   bg-white rounded-3xl shadow-lg p-8">
        
       
        <h2 className="text-xl font-bold text-gray-900 mb-8">
          Institution Overview
        </h2>
 
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="pb-4 text-base font-medium text-black">Institution</th>
                <th className="pb-4 text-base font-medium text-black">Type</th>
                <th className="pb-4 text-base font-medium text-black">Students</th>
                <th className="pb-4 text-base font-medium text-black">Staff</th>
                <th className="pb-4 text-base font-medium text-black">Revenue</th>
                <th className="pb-4 text-base font-medium text-black text-right">Status</th>
             </tr>
            </thead>
            <tbody className="text-gray-700">
              {institutions.map((item, index) => (
                <tr key={item.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                  
               
                  <td className="py-5 font-medium text-gray-900 pr-4">
                    {item.name}
                  </td>
 
                  <td className="py-5 pr-4">
                    <span className={`px-3 py-1 rounded-md text-sm font-medium ${getTypeStyle(item.type)}`}>
                      {item.type}
                    </span>
                  </td>
 
                  <td className="py-5 pr-4 text-gray-600">
                    {item.students}
                  </td>

               
                  <td className="py-5 pr-4 text-gray-600">
                    {item.staff}
                  </td>

            
                  <td className="py-5 pr-4 text-gray-800 font-medium">
                    {formatCurrency(item.revenue)}
                  </td>

             
                  <td className="py-5 text-right">
                    <span className="inline-block px-4 py-1 rounded-full border border-green-500 text-green-600 text-sm font-medium">
                      {item.status}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}