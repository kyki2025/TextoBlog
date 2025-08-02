/**
 * 简化版文本转网站生成器
 */
import React, { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ArrowLeft, Wand2, FileText, Type } from 'lucide-react';
import PDFAnalyzer from '../components/PDFAnalyzer';

const SimpleGenerator = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [generatedSite, setGeneratedSite] = useState<any>(null);

  const handleGenerate = () => {
    if (!content.trim()) return;

    // 简单的内容处理逻辑
    const lines = content.split('\n').filter(line => line.trim().length > 10);
    const items = lines.map((line, index) => ({
      id: index + 1,
      category: categorizeText(line),
      content: line.trim()
    }));

    // 生成类别统计
    const categoryCount = items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const categories = [
      {
        id: 'money',
        title: '赚钱篇',
        description: `商业化相关内容 (${categoryCount.money || 0}条)`,
        count: categoryCount.money || 0
      },
      {
        id: 'pitfalls',
        title: '避坑篇',
        description: `风险和陷阱相关 (${categoryCount.pitfalls || 0}条)`,
        count: categoryCount.pitfalls || 0
      },
      {
        id: 'writing',
        title: '写作篇',
        description: `内容创作相关 (${categoryCount.writing || 0}条)`,
        count: categoryCount.writing || 0
      },
      {
        id: 'growth',
        title: '成长篇',
        description: `学习成长相关 (${categoryCount.growth || 0}条)`,
        count: categoryCount.growth || 0
      }
    ];

    const siteData = {
      title: title || '生成的知识网站',
      description: description || '基于文本内容自动生成的知识分享网站',
      categories,
      content: items,
      generatedAt: new Date().toISOString()
    };

    setGeneratedSite(siteData);
  };

  const categorizeText = (text: string): string => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('赚钱') || lowerText.includes('收入') || lowerText.includes('盈利') || lowerText.includes('商业')) {
      return 'money';
    } else if (lowerText.includes('避免') || lowerText.includes('陷阱') || lowerText.includes('错误') || lowerText.includes('风险')) {
      return 'pitfalls';
    } else if (lowerText.includes('写作') || lowerText.includes('内容') || lowerText.includes('文章') || lowerText.includes('创作')) {
      return 'writing';
    } else if (lowerText.includes('成长') || lowerText.includes('学习') || lowerText.includes('提升') || lowerText.includes('发展')) {
      return 'growth';
    } else {
      const categories = ['money', 'pitfalls', 'writing', 'growth'];
      return categories[Math.floor(Math.random() * categories.length)];
    }
  };

  const downloadHTML = () => {
    if (!generatedSite) return;

    const htmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${generatedSite.title}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 40px; padding: 40px; background: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .categories { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 40px; }
        .category-card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); cursor: pointer; transition: transform 0.2s; }
        .category-card:hover { transform: translateY(-2px); }
        .content-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .content-card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .content-id { color: #3b82f6; font-weight: bold; margin-bottom: 10px; }
        .hidden { display: none; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${generatedSite.title}</h1>
            <p>${generatedSite.description}</p>
        </div>
        
        <div id="categories-view">
            <div class="categories">
                ${generatedSite.categories.map(cat => `
                    <div class="category-card" onclick="showCategory('${cat.id}')">
                        <h3>${cat.title}</h3>
                        <p>${cat.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div id="content-view" class="hidden">
            <button onclick="showCategories()" style="margin-bottom: 20px; padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 5px; cursor: pointer;">返回分类</button>
            <div id="content-list" class="content-grid"></div>
        </div>
    </div>
    
    <script>
        const siteData = ${JSON.stringify(generatedSite)};
        
        function showCategory(categoryId) {
            const categoryContent = siteData.content.filter(item => item.category === categoryId);
            const contentList = document.getElementById('content-list');
            
            contentList.innerHTML = categoryContent.map(item => \`
                <div class="content-card">
                    <div class="content-id">\${String(item.id).padStart(3, '0')}</div>
                    <p>\${item.content}</p>
                </div>
            \`).join('');
            
            document.getElementById('categories-view').classList.add('hidden');
            document.getElementById('content-view').classList.remove('hidden');
        }
        
        function showCategories() {
            document.getElementById('categories-view').classList.remove('hidden');
            document.getElementById('content-view').classList.add('hidden');
        }
    </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedSite.title}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </Link>
        </div>

        {!generatedSite ? (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">文本转网站生成器</h1>
              <p className="text-gray-600">上传PDF文件或输入文本内容，自动生成知识分享网站</p>
            </div>

            <Tabs defaultValue="pdf" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="pdf" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  PDF智能分析
                </TabsTrigger>
                <TabsTrigger value="text" className="flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  手动输入
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pdf" className="mt-6">
                <PDFAnalyzer onAnalysisComplete={setGeneratedSite} />
              </TabsContent>

              <TabsContent value="text" className="mt-6">
                <div className="max-w-2xl mx-auto">
                  <Card>
                    <CardHeader>
                      <CardTitle>手动输入内容</CardTitle>
                      <CardDescription>
                        填写网站信息并输入要转换的文本内容
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="site-title">网站标题</Label>
                        <Input
                          id="site-title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="输入网站标题"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="site-description">网站描述</Label>
                        <Input
                          id="site-description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="输入网站描述"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="content-text">文本内容</Label>
                        <Textarea
                          id="content-text"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          placeholder="在这里输入或粘贴您的文本内容，每行一条内容..."
                          rows={12}
                        />
                      </div>
                      
                      <Button 
                        onClick={handleGenerate} 
                        disabled={!content.trim()}
                        className="w-full"
                      >
                        <Wand2 className="h-4 w-4 mr-2" />
                        生成网站
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">生成结果</h1>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setGeneratedSite(null)}>
                  重新生成
                </Button>
                <Button onClick={downloadHTML}>
                  下载HTML文件
                </Button>
              </div>
            </div>

            {/* 预览生成的网站 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">{generatedSite.title}</h2>
                <p className="text-xl text-gray-600">{generatedSite.description}</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                {generatedSite.categories.map((category: any) => (
                  <Card key={category.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle>{category.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{category.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center text-sm text-gray-500">
                <p>总共生成了 {generatedSite.content?.length || 0} 条内容</p>
                <p>生成时间: {new Date(generatedSite.generatedAt).toLocaleString('zh-CN')}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleGenerator;