import { useEffect, useState } from 'react'
import Editor from './Editor'

function App() {
  const initialJsonContent = "{\n\t\n}"
  const [ jsonContent, setJsonContent ] = useState(initialJsonContent);

  useEffect(() => {
    console.log(jsonContent.toString())
  }, [ jsonContent ])

  function downloadJSON() {
    try {
        JSON.parse(jsonContent.toString())
        const jsonData = jsonContent.toString();

        const blob = new Blob([jsonData], { type: "application/json" });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "data.json";
        a.click();

        URL.revokeObjectURL(url);
    } catch (arr) {
        alert('Something wrong with json format !!')
    }
}

  return (
    <div className='py-10 lg:px-24 md:px-10 px-5'>
      <Editor panelValue={initialJsonContent} setPanelValue={setJsonContent} />
      <button type='button' className='rounded-lg font-medium text-white text-sm focus:ring-1 focus:outline-none focus:ring-blue-300 border border-white/5 bg-white/5 hover:bg-gray-100/10 px-6 py-2.5' onClick={downloadJSON}>Download Json</button>
    </div>
  )
}

export default App
