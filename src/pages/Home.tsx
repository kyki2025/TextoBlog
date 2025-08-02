
/**
 * 首页组件 - 展示书籍概述和四大板块入口
 */
import React from 'react';
import { Link } from 'react-router';
import { BookOpen, DollarSign, AlertTriangle, Edit, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';

const Home = () => {
  const categories = [
    {
      id: 'money',
      title: '一人企业·赚钱篇',
      description: '从赚小钱开始，探索复利商业化的方法与路径',
      icon: <DollarSign className="h-8 w-8 text-green-500" />,
      color: 'bg-green-50 hover:bg-green-100',
      textColor: 'text-green-700'
    },
    {
      id: 'pitfalls',
      title: '一人企业·避坑篇',
      description: '识别常见陷阱，避免在商业化路上的弯路',
      icon: <AlertTriangle className="h-8 w-8 text-red-500" />,
      color: 'bg-red-50 hover:bg-red-100',
      textColor: 'text-red-700'
    },
    {
      id: 'writing',
      title: '一人企业·写作篇',
      description: '掌握内容创作，建立个人IP的核心方法',
      icon: <Edit className="h-8 w-8 text-blue-500" />,
      color: 'bg-blue-50 hover:bg-blue-100',
      textColor: 'text-blue-700'
    },
    {
      id: 'growth',
      title: '一人企业·成长篇',
      description: '持续精进自我，实现长期稳定的商业价值',
      icon: <TrendingUp className="h-8 w-8 text-purple-500" />,
      color: 'bg-purple-50 hover:bg-purple-100',
      textColor: 'text-purple-700'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 顶部横幅 */}
      <div className="relative mb-12 overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl">
        <div className="relative z-10 px-6 py-12 md:px-12 md:py-20">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">一人企业复利商业化</h1>
          <p className="mb-6 text-xl md:w-3/4">尽可能的把公司规模做小，标准化玩法，提高效率，探索商业化的最大可能性。</p>
          <div className="flex flex-wrap gap-4">
            <Button asChild className="bg-white text-blue-700 hover:bg-blue-50">
              <Link to="/generator">文本转网站</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/content/money">开始阅读</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/about">了解更多</Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 opacity-20">
          <BookOpen className="h-64 w-64" />
        </div>
      </div>

      {/* 简介部分 */}
      <div className="mb-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold">IDO老徐著</h2>
          <p className="mb-8 text-lg text-gray-600">
            《一人企业复利商业化》精选了IDO老徐关于「一人企业」模式的四大核心板块：赚钱，避坑，写作，成长。
            每一页都可随时打开，随时查阅，随时思考。常看常新，值得看100遍，并输出每条内容的阅读思考，实战思考。
          </p>
          <div className="flex justify-center">
            <div className="flex items-center gap-2 rounded-full bg-amber-100 px-6 py-2 text-amber-800">
              <span className="text-sm font-medium">365条精选内容，每天一条，每天进步</span>
            </div>
          </div>
        </div>
      </div>

      {/* 四大板块 */}
      <h2 className="mb-8 text-center text-3xl font-bold">四大核心板块</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Card key={category.id} className={`transition-all duration-300 ${category.color}`}>
            <CardHeader>
              <div className="mb-2">{category.icon}</div>
              <CardTitle className={category.textColor}>{category.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-700">{category.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to={`/content/${category.id}`}>浏览内容</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* 序言引用 */}
      <div className="my-16 rounded-lg bg-gray-50 p-8">
        <h2 className="mb-6 text-center text-3xl font-bold">序言</h2>
        <blockquote className="mb-6 border-l-4 border-blue-500 pl-4 italic text-gray-700">
          <p className="mb-4">一人企业的核心理念，尽可能的把公司规模做小，标准化玩法，提高效率，探索商业化的最大可能性。</p>
          <p className="mb-4">《老徐合伙人》模式，是典型的「一人企业复利商业化」玩法。聚集1000位IP，互利共赢，放大商业化。产生「亿级商业化」规模。</p>
          <p className="mb-4">无员工，无办公场地。几乎无成本，赚的每一分收入，都是利润。</p>
          <p>这是一家永不倒闭的公司。</p>
        </blockquote>
        <p className="text-right text-sm text-gray-500">— IDO老徐，2025.01 深圳</p>
      </div>

      {/* CTA部分 */}
      <div className="mb-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-center text-white shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">开始您的一人企业之旅</h2>
        <p className="mb-6">浏览365条精选内容，找到适合自己的复利商业化路径</p>
        <Button asChild className="bg-white text-indigo-700 hover:bg-blue-50">
          <Link to="/content/money">立即开始</Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;
