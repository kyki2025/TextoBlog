/**
 * 生成网站预览组件 - 简化版
 */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { DollarSign, AlertTriangle, Edit, TrendingUp, Download } from 'lucide-react';

interface GeneratedSitePreviewProps {
  data: {
    title: string;
    description: string;
    categories: Array<{
      id: string;
      title: string;
      description: string;
      count: number;
    }>;
    content: Array<{
      id: number;
      category: string;
      content: string;
    }>;
    generatedAt: string;
  };
}

const GeneratedSitePreview: React.FC<GeneratedSitePreviewProps> = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'money':
        return <DollarSign className="h-8 w-8 text-green-500" />;
      case 'pitfalls':
        return <AlertTriangle className="h-8 w-8 text-red-500" />;
      case 'writing':
        return <Edit className="h-8 w-8 text-blue-500" />;
      case 'growth':
        return <TrendingUp className="h-8 w-8 text-purple-500" />;
      default:
        return <Edit className="h-8 w-8 text-gray-500" />;
    }
  };

  const getCategoryColor = (categoryId: string) => {
    switch (categoryId) {
      case 'money':
        return 'bg-green-50 hover:bg-green-100 border-green-200';
      case 'pitfalls':
        return 'bg-red-50 hover:bg-red-100 border-red-200';
      case 'writing':
        return 'bg-blue-50 hover:bg-blue-100 border-blue-200';
      case 'growth':
        return 'bg-purple-50 hover:bg-purple-100 border-purple-200';
      default:
        return 'bg-gray-50 hover:bg-gray-100 border-gray-200';
    }
  };

  const filteredContent = selectedCategory
    ? data.content.filter(item => item.category === selectedCategory)
    : data.content;

  const selectedCategoryData = selectedCategory
    ? data.categories.find(cat => cat.id === selectedCategory)
    : null;

  const downloadHTML = () => {
    const htmlContent = generateHTMLContent();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.title}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateHTMLContent = () => {
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.title}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; background: #f8fafc; }
        .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 3rem; }
        .title { font-size: 2.5rem; font-weight: bold; margin-bottom: 1rem; color: #1a202c; }
        .subtitle { font-size: 1.25rem; color: #718096; margin-bottom: 2rem; }
        .stats { text-align: center; margin-bottom: 2rem; color: #718096; }
        .categories { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin-bottom: 3rem; }
        .category { background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
        .category h2 { font-size: 1.5rem; margin-bottom: 1rem; }
        .category p { color: #718096; margin-bottom: 1.5rem; }
        .content-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
        .content-item { background: white; border-radius: 8px; padding: 1.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
        .content-number { font-weight: bold; color: #3182ce; margin-bottom: 0.5rem; }
        .content-text { line-height: 1.6; }
        .money { border-left: 4px solid #38a169; }
        .pitfalls { border-left: 4px solid #e53e3e; }
        .writing { border-left: 4px solid #3182ce; }
        .growth { border-left: 4px solid #805ad5; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="title">${data.title}</h1>
            <p class="subtitle">${data.description}</p>
            <div class="stats">
                总共生成了 ${data.content.length} 条内容 | 生成时间: ${new Date(data.generatedAt).toLocaleString('zh-CN')}
            </div>
        </div>
        
        <div class="categories">
            ${data.categories.map(category => `
                <div class="category">
                    <h2>${category.title}</h2>
                    <p>${category.description}</p>
                </div>
            `).join('')}
        </div>
        
        <div class="content-grid">
            ${data.content.map(item => `
                <div class="content-item ${item.category}">
                    <div class="content-number">${item.id.toString().padStart(3, '0')}</div>
                    <div class="content-text">${item.content}</div>
                </div>
            `).join('')}
        </div>
    </div>
</body>
</html>`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {!selectedCategory ? (
        <>
          {/* 网站头部 */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{data.description}</p>
            <div className="mb-6">
              <Button onClick={downloadHTML} className="bg-green-600 hover:bg-green-700">
                <Download className="h-4 w-4 mr-2" />
                下载HTML文件
              </Button>
            </div>
            <div className="text-sm text-gray-500">
              总共生成了 {data.content.length} 条内容 | 生成时间: {new Date(data.generatedAt).toLocaleString('zh-CN')}
            </div>
          </div>

          {/* 分类卡片 */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {data.categories.map((category) => (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all duration-300 ${getCategoryColor(category.id)}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardHeader>
                  <div className="mb-2">{getCategoryIcon(category.id)}</div>
                  <CardTitle>{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700 mb-4">
                    {category.description}
                  </CardDescription>
                  <Button className="w-full">
                    查看内容 ({category.count}条)
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 所有内容列表 */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.content.map((item) => (
              <Card
                key={item.id}
                className={`border transition-transform duration-300 hover:shadow-md ${getCategoryColor(item.category)}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-blue-600">
                      {item.id.toString().padStart(3, '0')}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-600">
                      {data.categories.find(cat => cat.id === item.category)?.title}
                    </span>
                  </div>
                  <p className="text-sm font-medium leading-relaxed">
                    {item.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* 分类详情页面 */}
          <div className={`mb-8 rounded-lg p-6 ${getCategoryColor(selectedCategory)}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {getCategoryIcon(selectedCategory)}
                <div>
                  <h1 className="text-3xl font-bold">{selectedCategoryData?.title}</h1>
                  <p className="mt-2 text-gray-600">{selectedCategoryData?.description}</p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => setSelectedCategory(null)}
              >
                返回全部
              </Button>
            </div>
          </div>

          {/* 分类内容 */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredContent.map((item) => (
              <Card
                key={item.id}
                className={`border transition-transform duration-300 hover:shadow-md ${getCategoryColor(selectedCategory)}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-blue-600">
                      {item.id.toString().padStart(3, '0')}
                    </span>
                  </div>
                  <p className="text-sm font-medium leading-relaxed">
                    {item.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GeneratedSitePreview;