
/**
 * 内容页面组件 - 根据类别展示相应的内容
 */
import React from 'react';
import { useParams } from 'react-router';
import { Card, CardContent } from '../components/ui/card';
import { DollarSign, AlertTriangle, Edit, TrendingUp } from 'lucide-react';
import { contentData } from '../data/content';

const ContentPage = () => {
  const { category } = useParams<{ category: string }>();

  // 根据类别获取对应的内容和配置
  const getCategoryConfig = () => {
    switch (category) {
      case 'money':
        return {
          title: '一人企业·赚钱篇',
          description: '探索复利商业化的方法与路径，从赚小钱开始',
          icon: <DollarSign className="h-8 w-8 text-green-500" />,
          color: 'bg-green-50',
          borderColor: 'border-green-200',
          data: contentData.filter(item => item.category === 'money')
        };
      case 'pitfalls':
        return {
          title: '一人企业·避坑篇',
          description: '识别常见陷阱，避免在商业化路上的弯路',
          icon: <AlertTriangle className="h-8 w-8 text-red-500" />,
          color: 'bg-red-50',
          borderColor: 'border-red-200',
          data: contentData.filter(item => item.category === 'pitfalls')
        };
      case 'writing':
        return {
          title: '一人企业·写作篇',
          description: '掌握内容创作，建立个人IP的核心方法',
          icon: <Edit className="h-8 w-8 text-blue-500" />,
          color: 'bg-blue-50',
          borderColor: 'border-blue-200',
          data: contentData.filter(item => item.category === 'writing')
        };
      case 'growth':
        return {
          title: '一人企业·成长篇',
          description: '持续精进自我，实现长期稳定的商业价值',
          icon: <TrendingUp className="h-8 w-8 text-purple-500" />,
          color: 'bg-purple-50',
          borderColor: 'border-purple-200',
          data: contentData.filter(item => item.category === 'growth')
        };
      default:
        return {
          title: '内容',
          description: '探索一人企业复利商业化的思考',
          icon: null,
          color: 'bg-gray-50',
          borderColor: 'border-gray-200',
          data: []
        };
    }
  };

  const categoryConfig = getCategoryConfig();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className={`mb-10 rounded-lg ${categoryConfig.color} p-8 shadow-sm`}>
        <div className="flex items-center gap-4">
          {categoryConfig.icon}
          <div>
            <h1 className="text-3xl font-bold">{categoryConfig.title}</h1>
            <p className="mt-2 text-gray-600">{categoryConfig.description}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categoryConfig.data.map((item) => (
          <Card key={item.id} className={`border ${categoryConfig.borderColor} transition-transform duration-300 hover:shadow-md hover:scale-[1.02]`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-blue-600">{item.id.toString().padStart(3, '0')}</span>
                <div className="h-px flex-grow bg-gray-200"></div>
              </div>
              <p className="text-lg font-medium leading-relaxed whitespace-pre-line">{item.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContentPage;
