/**
 * 网站生成器页面 - 主要的文件上传和网站生成界面
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import FileUploader from '../components/FileUploader';
import GeneratedSitePreview from '../components/GeneratedSitePreview';
import { Button } from '../components/ui/button';
import { ArrowLeft, Download, Eye } from 'lucide-react';

const Generator = () => {
  const [generatedData, setGeneratedData] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();

  const handleContentGenerated = (data: any) => {
    setGeneratedData(data);
    setShowPreview(true);
  };

  const handleDownload = () => {
    if (!generatedData) return;

    // 生成完整的网站文件
    const websiteFiles = generateWebsiteFiles(generatedData);
    
    // 创建ZIP文件并下载（需要JSZip库）
    downloadWebsiteFiles(websiteFiles);
  };

  const generateWebsiteFiles = (data: any) => {
    // 生成基于模板的完整网站文件
    const files = {
      'index.html': generateIndexHTML(data),
      'style.css': generateCSS(),
      'script.js': generateJS(data),
      'data.json': JSON.stringify(data, null, 2)
    };
    
    return files;
  };

  const generateIndexHTML = (data: any) => {
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.title}</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body>
    <div id="app">
        <header class="bg-white shadow-sm border-b">
            <div class="container mx-auto px-4 py-4">
                <h1 class="text-2xl font-bold text-blue-600">${data.title}</h1>
                <p class="text-gray-600 mt-2">${data.description}</p>
            </div>
        </header>
        
        <main class="container mx-auto px-4 py-8">
            <div class="mb-8">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="categories">
                    <!-- 类别卡片将通过JavaScript生成 -->
                </div>
            </div>
            
            <div id="content-area" class="hidden">
                <div class="mb-6">
                    <button id="back-btn" class="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                        返回首页
                    </button>
                </div>
                <div id="content-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- 内容卡片将通过JavaScript生成 -->
                </div>
            </div>
        </main>
        
        <footer class="bg-gray-50 border-t py-8 mt-16">
            <div class="container mx-auto px-4 text-center">
                <p class="text-gray-600">生成时间: ${new Date(data.generatedAt).toLocaleString('zh-CN')}</p>
                <p class="text-sm text-gray-500 mt-2">来源: ${data.source}</p>
            </div>
        </footer>
    </div>
    
    <script src="script.js"></script>
</body>
</html>`;
  };

  const generateCSS = () => {
    return `
/* 自定义样式 */
.category-card {
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.category-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.content-card {
    transition: transform 0.2s ease-in-out;
}

.content-card:hover {
    transform: scale(1.02);
}

.fade-in {
    animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
`;
  };

  const generateJS = (data: any) => {
    return `
// 网站数据
const websiteData = ${JSON.stringify(data, null, 2)};

// DOM元素
const categoriesContainer = document.getElementById('categories');
const contentArea = document.getElementById('content-area');
const contentList = document.getElementById('content-list');
const backBtn = document.getElementById('back-btn');

// 初始化页面
function init() {
    renderCategories();
    setupEventListeners();
}

// 渲染类别卡片
function renderCategories() {
    const categoryIcons = {
        money: '💰',
        pitfalls: '⚠️',
        writing: '✍️',
        growth: '📈'
    };
    
    const categoryColors = {
        money: 'bg-green-50 border-green-200 hover:bg-green-100',
        pitfalls: 'bg-red-50 border-red-200 hover:bg-red-100',
        writing: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
        growth: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
    };

    categoriesContainer.innerHTML = websiteData.categories.map(category => \`
        <div class="category-card border rounded-lg p-6 cursor-pointer \${categoryColors[category.id] || 'bg-gray-50 border-gray-200'}" 
             onclick="showCategoryContent('\${category.id}')">
            <div class="text-4xl mb-4">\${categoryIcons[category.id] || '📄'}</div>
            <h3 class="text-xl font-bold mb-2">\${category.title}</h3>
            <p class="text-gray-600 text-sm">\${category.description}</p>
        </div>
    \`).join('');
}

// 显示类别内容
function showCategoryContent(categoryId) {
    const categoryData = websiteData.categories.find(c => c.id === categoryId);
    const categoryContent = websiteData.content.filter(item => item.category === categoryId);
    
    document.getElementById('categories').parentElement.classList.add('hidden');
    contentArea.classList.remove('hidden');
    contentArea.classList.add('fade-in');
    
    contentList.innerHTML = categoryContent.map(item => \`
        <div class="content-card bg-white border rounded-lg p-6 shadow-sm">
            <div class="flex items-center gap-2 mb-3">
                <span class="font-bold text-blue-600">\${String(item.id).padStart(3, '0')}</span>
                <div class="flex-grow h-px bg-gray-200"></div>
            </div>
            <p class="text-gray-800 leading-relaxed whitespace-pre-line">\${item.content}</p>
        </div>
    \`).join('');
}

// 返回首页
function goBack() {
    contentArea.classList.add('hidden');
    document.getElementById('categories').parentElement.classList.remove('hidden');
}

// 设置事件监听器
function setupEventListeners() {
    backBtn.addEventListener('click', goBack);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
`;
  };

  const downloadWebsiteFiles = (files: Record<string, string>) => {
    // 简单的文件下载实现
    // 实际项目中建议使用JSZip库创建ZIP文件
    Object.entries(files).forEach(([filename, content]) => {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!showPreview ? (
        <div>
          <div className="bg-white shadow-sm border-b">
            <div className="container mx-auto px-4 py-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回首页
              </Button>
            </div>
          </div>
          <FileUploader onContentGenerated={handleContentGenerated} />
        </div>
      ) : (
        <div>
          <div className="bg-white shadow-sm border-b">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  onClick={() => setShowPreview(false)}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  重新生成
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                >
                  返回首页
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  预览
                </Button>
                <Button onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  下载网站
                </Button>
              </div>
            </div>
          </div>
          <GeneratedSitePreview data={generatedData} />
        </div>
      )}
    </div>
  );
};

export default Generator;