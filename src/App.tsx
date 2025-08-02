import React, { useState } from 'react';
import PDFAnalyzer from './components/PDFAnalyzer';
import GeneratedSitePreview from './components/GeneratedSitePreview';

function App() {
  const [generatedSite, setGeneratedSite] = useState<any>(null);

  const handleAnalysisComplete = (siteData: any) => {
    setGeneratedSite(siteData);
  };

  const handleReset = () => {
    setGeneratedSite(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {!generatedSite ? (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">PDF转网站生成器</h1>
              <p className="text-xl text-gray-600">上传PDF文件，自动生成知识分享网站</p>
            </div>
            <PDFAnalyzer onAnalysisComplete={handleAnalysisComplete} />
          </div>
        ) : (
          <div>
            <div className="mb-6 text-center">
              <button
                onClick={handleReset}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                重新上传PDF
              </button>
            </div>
            <GeneratedSitePreview data={generatedSite} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;