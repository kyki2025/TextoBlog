/**
 * 生成网站预览组件
 */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { DollarSign, AlertTriangle, Edit, TrendingUp, FileText } from 'lucide-react';

interface GeneratedSitePreviewProps {
  data: {
    title: string;
    description: string;
    source: string;
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
        return <FileText className="h-8 w-8 text-gray-500" />;
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
    : [];

  const selectedCategoryData = selectedCategory
    ? data.categories.find(cat => cat.id === selectedCategory)
    : null;

  return (
    <div className="container mx-auto px-4 py-8">
      {!selectedCategory ? (
        <>
          {/* 网站头部 */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{data.description}</p>
            <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
              <span>来源: {data.source}</span>
              <span>•</span>
              <span>生成时间: {new Date(data.generatedAt).toLocaleString('zh-CN')}</span>
            </div>
          </div>

          {/* 统计信息 */}
          <div className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-600">{data.content.length}</div>
              <div className="text-sm text-gray-600">总内容数</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-600">{data.categories.length}</div>
              <div className="text-sm text-gray-600">分类数量</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-purple-600">
                {Math.max(...data.categories.map(c => c.count))}
              </div>
              <div className="text-sm text-gray-600">最大分类</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(data.content.reduce((sum, item) => sum + item.content.length, 0) / data.content.length)}
              </div>
              <div className="text-sm text-gray-600">平均字数</div>
            </div>
          </div>

          {/* 分类卡片 */}
          <h2 className="text-3xl font-bold text-center mb-8">内容分类</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                    浏览内容 ({category.count}条)
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* 分类内容页面 */}
          <div className={`mb-10 rounded-lg p-8 shadow-sm ${getCategoryColor(selectedCategory)}`}>
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
                返回分类
              </Button>
            </div>
          </div>

          {/* 内容列表 */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredContent.map((item) => (
              <Card
                key={item.id}
                className={`border transition-transform duration-300 hover:shadow-md hover:scale-[1.02] ${getCategoryColor(selectedCategory)}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-blue-600">
                      {item.id.toString().padStart(3, '0')}
                    </span>
                    <div className="h-px flex-grow bg-gray-200"></div>
                  </div>
                  <p className="text-lg font-medium leading-relaxed whitespace-pre-line">
                    {item.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredContent.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">该分类暂无内容</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GeneratedSitePreview;