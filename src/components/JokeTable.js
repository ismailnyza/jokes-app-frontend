// components/JokeTable.js
const JokeTable = ({ jokes }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Content</th>
            <th className="py-2 px-4 border-b">Type</th>
          </tr>
        </thead>
        <tbody>
          {jokes.map((joke) => (
            <tr key={joke.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{joke.content}</td>
              <td className="py-2 px-4 border-b">
                {joke.type ? joke.type.name : "no type"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JokeTable;
