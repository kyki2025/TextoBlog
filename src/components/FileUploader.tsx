/**
 * 文件上传组件 - 支持多种文本文件格式
 */
import React, { useState, useCallback } from 'react';
import { Upload, FileText, Link, Book, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';

interface FileUploaderProps {
  onContentGenerated: (content: any) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onContentGenerated }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState('');
  const [textContent, setTextContent] = useState('');
  const [websiteTitle, setWebsiteTitle] = useState('');
  const [websiteDescription, setWebsiteDescription] = useState('');

  // 处理文件上传
  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      let content = '';
      
      if (file.type === 'text/plain') {
        // 处理TXT文件
        content = await file.text();
      } else if (file.type === 'application/pdf') {
        // 处理PDF文件（需要PDF.js库）
        content = await extractPDFText(file);
      } else {
        throw new Error('不支持的文件格式。请上传TXT或PDF文件。');
      }

      await processContent(content, file.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : '文件处理失败');
    } finally {
      setLoading(false);
    }
  }, []);

  // 处理网页链接
  const handleUrlSubmit = useCallback(async () => {
    if (!url.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // 这里需要实现网页内容抓取
      // 由于浏览器CORS限制，实际项目中需要后端API支持
      const content = await fetchWebContent(url);
      await processContent(content, url);
    } catch (err) {
      setError(err instanceof Error ? err.message : '网页内容获取失败');
    } finally {
      setLoading(false);
    }
  }, [url]);

  // 处理直接文本输入
  const handleTextSubmit = useCallback(async () => {
    if (!textContent.trim()) return;

    setLoading(true);
    setError(null);

    try {
      await processContent(textContent, '直接输入的文本');
    } catch (err) {
      setError(err instanceof Error ? err.message : '文本处理失败');
    } finally {
      setLoading(false);
    }
  }, [textContent]);

  // 处理内容并生成网站数据
  const processContent = async (content: string, source: string) => {
    try {
      // 使用AI或规则来分析和分类内容
      const processedData = await analyzeAndCategorizeContent(content);
      
      const websiteData = {
        title: websiteTitle || extractTitleFromContent(content),
        description: websiteDescription || extractDescriptionFromContent(content),
        source: source,
        categories: processedData.categories,
        content: processedData.items,
        generatedAt: new Date().toISOString()
      };

      onContentGenerated(websiteData);
    } catch (err) {
      throw new Error('内容分析失败：' + (err instanceof Error ? err.message : '未知错误'));
    }
  };

  // 提取PDF文本（简化版本，实际需要PDF.js）
  const extractPDFText = async (file: File): Promise<string> => {
    // 这里需要集成PDF.js库来提取PDF文本
    // 为了演示，返回占位符
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        // 实际实现需要使用PDF.js
        resolve('PDF内容提取需要PDF.js库支持');
      };
      reader.onerror = () => reject(new Error('PDF文件读取失败'));
      reader.readAsArrayBuffer(file);
    });
  };

  // 获取网页内容（需要后端支持）
  const fetchWebContent = async (url: string): Promise<string> => {
    // 由于CORS限制，这里需要后端API支持
    // 为了演示，返回占位符
    throw new Error('网页内容抓取需要后端API支持，请使用文件上传或直接输入文本');
  };

  // 分析和分类内容
  const analyzeAndCategorizeContent = async (content: string) => {
    // 简单的内容分析逻辑
    const lines = content.split('\n').filter(line => line.trim());
    const items = [];
    let id = 1;

    // 将内容按段落分割并分类
    for (const line of lines) {
      if (line.trim().length > 10) { // 过滤太短的行
        const category = categorizeText(line);
        items.push({
          id: id++,
          category,
          content: line.trim()
        });
      }
    }

    // 生成类别配置
    const categories = generateCategories(items);

    return { categories, items };
  };

  // 简单的文本分类逻辑
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
      // 随机分配到四个类别之一
      const categories = ['money', 'pitfalls', 'writing', 'growth'];
      return categories[Math.floor(Math.random() * categories.length)];
    }
  };

  // 生成类别配置
  const generateCategories = (items: any[]) => {
    const categoryCount = items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return [
      {
        id: 'money',
        title: '赚钱篇',
        description: `探索商业化的方法与路径 (${categoryCount.money || 0}条内容)`,
        count: categoryCount.money || 0
      },
      {
        id: 'pitfalls',
        title: '避坑篇',
        description: `识别常见陷阱和风险 (${categoryCount.pitfalls || 0}条内容)`,
        count: categoryCount.pitfalls || 0
      },
      {
        id: 'writing',
        title: '写作篇',
        description: `掌握内容创作方法 (${categoryCount.writing || 0}条内容)`,
        count: categoryCount.writing || 0
      },
      {
        id: 'growth',
        title: '成长篇',
        description: `持续精进和发展 (${categoryCount.growth || 0}条内容)`,
        count: categoryCount.growth || 0
      }
    ];
  };

  // 从内容中提取标题
  const extractTitleFromContent = (content: string): string => {
    const lines = content.split('\n').filter(line => line.trim());
    return lines[0]?.trim().substring(0, 50) || '生成的网站';
  };

  // 从内容中提取描述
  const extractDescriptionFromContent = (content: string): string => {
    const lines = content.split('\n').filter(line => line.trim());
    return lines.slice(1, 3).join(' ').substring(0, 200) || '基于上传内容生成的知识网站';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">文本转网站生成器</h1>
        <p className="text-gray-600">上传文本文件、输入网页链接或直接输入内容，自动生成知识网站</p>
      </div>

      {error && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="file" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="file">文件上传</TabsTrigger>
          <TabsTrigger value="url">网页链接</TabsTrigger>
          <TabsTrigger value="text">直接输入</TabsTrigger>
        </TabsList>

        <TabsContent value="file">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                上传文件
              </CardTitle>
              <CardDescription>
                支持TXT、PDF等文本文件格式
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="website-title">网站标题（可选）</Label>
                <Input
                  id="website-title"
                  value={websiteTitle}
                  onChange={(e) => setWebsiteTitle(e.target.value)}
                  placeholder="如不填写将自动从内容中提取"
                />
              </div>
              <div>
                <Label htmlFor="website-description">网站描述（可选）</Label>
                <Input
                  id="website-description"
                  value={websiteDescription}
                  onChange={(e) => setWebsiteDescription(e.target.value)}
                  placeholder="如不填写将自动从内容中提取"
                />
              </div>
              <div>
                <Label htmlFor="file-upload">选择文件</Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".txt,.pdf"
                  onChange={handleFileUpload}
                  disabled={loading}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="url">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="h-5 w-5" />
                网页链接
              </CardTitle>
              <CardDescription>
                输入网页URL，自动提取内容（需要后端支持）
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="url-input">网页URL</Label>
                <Input
                  id="url-input"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/article"
                  disabled={loading}
                />
              </div>
              <Button onClick={handleUrlSubmit} disabled={loading || !url.trim()}>
                {loading ? '处理中...' : '提取内容'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="text">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5" />
                直接输入
              </CardTitle>
              <CardDescription>
                直接粘贴或输入文本内容
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="text-title">网站标题</Label>
                <Input
                  id="text-title"
                  value={websiteTitle}
                  onChange={(e) => setWebsiteTitle(e.target.value)}
                  placeholder="输入网站标题"
                />
              </div>
              <div>
                <Label htmlFor="text-description">网站描述</Label>
                <Input
                  id="text-description"
                  value={websiteDescription}
                  onChange={(e) => setWebsiteDescription(e.target.value)}
                  placeholder="输入网站描述"
                />
              </div>
              <div>
                <Label htmlFor="text-content">文本内容</Label>
                <Textarea
                  id="text-content"
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder="粘贴或输入您的文本内容..."
                  rows={10}
                  disabled={loading}
                />
              </div>
              <Button onClick={handleTextSubmit} disabled={loading || !textContent.trim()}>
                {loading ? '处理中...' : '生成网站'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FileUploader;